const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/userModel");
const { jwToken, verifyToken } = require("../helpers/token");
const sendEmail = require("../helpers/sendEmail");
const sendResetCode = require("../helpers/sendResetCode");
const generateCode = require("../helpers/generateCode");
const Code = require("../models/Code");
const PostModel = require("../models/PostModel");

// ****************** Registration Controller ***********************
exports.newUser = async (req, res) => {
  try {
    const {
      fName,
      lName,
      //   username,
      email,
      password,
      profilePicture,
      cover,
      bDay,
      bMonth,
      bYear,
      gender,
      verified,
      friends,
      followers,
      following,
      request,
      search,
      details,
      instagram,
      savePost,
    } = req.body;

    // Email Validation
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address",
      });
    }

    // Find email address in user Database
    const checkMail = await User.findOne({ email });

    if (checkMail) {
      return res.status(400).json({
        message: ` "${checkMail.email}" This Email Address already Exists.`,
      });
    }

    // First Name Length Validation
    if (!validateLength(fName, 3, 45)) {
      return res.status(400).json({
        message: `First Name should be minimum 3 and maximum 15 characters.`,
      });
    }

    // Last Name Length Validation
    if (!validateLength(lName, 3, 45)) {
      return res.status(400).json({
        message: `Last Name should be minimum 3 and maximum 15 characters.`,
      });
    }

    // Password Length Validation
    if (!validateLength(password, 8, 50)) {
      return res.status(400).json({
        message: `Password should be minimum 8 and maximum 50 characters.`,
      });
    }

    // bcrypt Password
    const crypted = await bcrypt.hash(password, 10);

    // Username Validation
    let tempUserName = fName + lName;
    let finalUsername = await validateUsername(tempUserName);

    const user = await new User({
      fName,
      lName,
      username: finalUsername,
      email,
      password: crypted,
      passwordHistory: crypted,
      profilePicture,
      cover,
      bDay,
      bMonth,
      bYear,
      gender,
      verified,
      friends,
      followers,
      following,
      request,
      search,
      details,
      instagram,
      savePost,
    });
    user.save();
    const emailVerificationToken = jwToken(
      { id: user._id.toHexString() },
      "30m"
    );
    const emailVerificationLink = `${process.env.CLIENT_URL}/verify/${emailVerificationToken}`;
    const loginRefreshToken = jwToken({ id: user._id.toHexString() }, "7d"); // Need Expiation

    sendEmail({
      to: user.email,
      subject: `Email Verification code for "SOCIAL MEDIA APP". Please verify your email.`,
      text: `hello`,
      html: `<div style=" padding: 10px; border: 1px solid #ddd; border-radius: 5px; text-align: center; " > <h1 style="font-family: 'Segoe UI', Tahoma Verdana, sans-serif; text-transform: capitalize"> Hello ${fName} </h1> <p style=" font-family: 'Segoe UI', Tahoma Verdana, sans-serif; color: #333; font-size: 16px; " > Helow ${fName} hope you are doing well. Please confirm your verification email to start journey wit use </p> <a href=${emailVerificationLink} style=" display: inline-block; border: 1px solid #ddd; padding: 8px 15px; border-radius: 5px; text-decoration: none; margin-top: 20px; text-transform: capitalize; " onMouseOver="this.style.background='#ddd'" onMouseleave="this.style.background='transparent'" >very email</a > </div>`,
    });

    res.send({
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      cover: user.cover,
      fName: user.fName,
      lName: user.lName,
      friends: user.friends,
      followers: user.followers,
      loginRefreshToken: loginRefreshToken,
      isVerified: user.isVerified,
      message: `Registration is Successfully Done.`,
      emailVerificationToken: emailVerificationToken,
    });
  } catch (error) {
    res.status(404).json({
      message: `Can not Create user`,
    });
  }
};

// ****************** Email Verification Controller ***********************
exports.emailVerify = async (req, res) => {
  let { emailVerificationToken } = req.body;

  try {
    let decoded = verifyToken(emailVerificationToken, process.env.SECRET_TOKEN);
    let registerUserId = decoded.id;
    const userExist = await User.findOne({ _id: registerUserId });
    if (!userExist) {
      return res.send({ error: `Invalid Token` });
    } else {
      if (userExist.isVerified === true) {
        return res.send({
          message: `This mail Email is already verified.`,
        });
      } else {
        // userExist.isVerified = true; // set isVerified = true
        // await userExist.save(); // save to database
        await User.findByIdAndUpdate(userExist._id, { isVerified: true }); // Update database
        res.send({
          message: `Congratulations! Your Email verification is Successfully Done.`,
        });
      }
    }
  } catch (error) {
    res.status(404).json({ error: `Invalid Token or Expired.` });
  }
};

// ****************** Login Controller ***********************
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        message: `This mail address are not registered yet..!`,
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: `Login failed. Invalid Credential.` });
    }
    if (existingUser.isVerified === false) {
      return res.status(400).json({
        message: `This mail is not Verified. Please verify your email first. Thanks.`,
        isVerified: existingUser.isVerified,
      });
    }

    const loginRefreshToken = await jwToken(
      { id: existingUser._id.toHexString() },
      "7d"
    );

    res.send({
      id: existingUser._id,
      username: existingUser.username,
      profilePicture: existingUser.profilePicture,
      cover: existingUser.cover,
      fName: existingUser.fName,
      lName: existingUser.lName,
      email: existingUser.email,
      friends: existingUser.friends,
      followers: existingUser.followers,
      loginRefreshToken: `Bearer ${loginRefreshToken}`,
      isVerified: existingUser.isVerified,
      message: `Login success`,
    });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

// ****************** Re-Verification Controller ***********************
exports.reVerification = async (req, res) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user === null) {
      return res.status(404).json({
        message: "This Email is not registered.",
      });
    }

    if (user.isVerified === true) {
      return res.send({
        message: `This Account is Successfully verify.`,
      });
    }
    const emailVerificationToken = jwToken(
      { id: user._id.toHexString() },
      "30m"
    );
    const emailVerificationLink = `${process.env.CLIENT_URL}/verify/${emailVerificationToken}`;

    sendEmail({
      to: user.email,
      subject: `Email Verification code for "SOCIAL MEDIA APP". Please verify your email.`,
      text: `hello`,
      html: `<div style=" padding: 10px; border: 1px solid #ddd; border-radius: 5px; text-align: center; " > <h1 style="font-family: 'Segoe UI', Tahoma Verdana, sans-serif; text-transform: capitalize"> Hello ${user.fName} </h1> <p style=" font-family: 'Segoe UI', Tahoma Verdana, sans-serif; color: #333; font-size: 16px; text-transform: capitalize" > Helow ${user.fName} hope you are doing well. Please confirm your verification email to start journey wit use </p> <a href=${emailVerificationLink} style=" display: inline-block; border: 1px solid #ddd; padding: 8px 15px; border-radius: 5px; text-decoration: none; margin-top: 20px; text-transform: capitalize; " onMouseOver="this.style.background='#ddd'" onMouseleave="this.style.background='transparent'" >very email</a > </div>`,
    });
    return res.status(200).json({
      message:
        "Email Verification Link has been sent to your register email address. Please check your email to verify.",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** Find User Controller ***********************
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const matchEmail = await User.findOne({ email: email }).select(
      "-password -passwordHistory"
    );
    if (!matchEmail) {
      return res.status(404).json({
        message: "Email doesn't exist.",
      });
    }
    return res.status(200).json({
      email: matchEmail.email,
      profilePicture: matchEmail.profilePicture,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** Reset Code Controller ***********************
exports.resetCode = async (req, res) => {
  try {
    const { email } = req.body;
    const userDetails = await User.findOne({ email: email }).select(
      "-password -passwordHistory"
    );
    await Code.findOneAndDelete({ user: userDetails._id });
    let verificationCode = generateCode(6);

    const saveCode = new Code({
      user: userDetails._id,
      code: verificationCode,
    });
    await saveCode.save();

    await sendResetCode({
      to: userDetails.email,
      subject: `Email Verification code for "SOCIAL MEDIA APP". Please verify your email.`,
      text: `hello`,
      // html: `${verificationCode}`,
      //   html: `<div style=" padding: 10px; border: 1px solid #ddd; border-radius: 5px; text-align: center; " > <h1 style="font-family: 'Segoe UI', Tahoma Verdana, sans-serif; text-transform: capitalize"> Hello ${userDetails.fName} </h1> <p style=" font-family: 'Segoe UI', Tahoma Verdana, sans-serif; color: #333; font-size: 16px; text-transform: capitalize" > Helow ${userDetails.fName} hope you are doing well. Please confirm your verification email to start journey wit use </p> <a href="E" style=" display: inline-block; border: 1px solid #ddd; padding: 8px 15px; border-radius: 5px; text-decoration: none; margin-top: 20px; text-transform: capitalize; " onMouseOver="this.style.background='#ddd'" onMouseleave="this.style.background='transparent'" >${verificationCode}</a > </div>`,
      // });
      html: `<div style=" padding: 10px; border: 1px solid #ddd; border-radius: 5px; text-align: center; " > <h1 style=" font-family: 'Segoe UI', Tahoma Verdana, sans-serif; text-transform: capitalize; " > Hello ${userDetails.fName} </h1> <p style=" font-family: 'Segoe UI', Tahoma Verdana, sans-serif; color: #333; font-size: 16px; text-transform: capitalize; " > Helow ${userDetails.fName} hope you are doing well. Please confirm your verification email to start journey wit use </p> <h2 onMouseOver="this.style.background='#ddd'" onMouseleave="this.style.background='transparent'" onclick="navigator.clipboard.writeText('${verificationCode}')" style=" display: inline-block; border: 1px solid #ddd; padding: 15px 20px; border-radius: 5px; text-decoration: none; margin-top: 20px; text-transform: capitalize; letter-spacing: 5px; " > ${verificationCode} </h2> </div>`,
    });
    return res.status(200).json({
      message: "Reset code has been sent to your email.",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** Reset Code Verification Controller ***********************
exports.resetCodeVerify = async (req, res) => {
  try {
    const { email, code } = req.body;
    const userDetails = await User.findOne({ email: email }).select(
      "-password -passwordHistory"
    );
    const codeDetails = await Code.findOne({ user: userDetails._id });

    if (codeDetails.code !== code) {
      return res.status(404).json({
        message: "Code doesn't matched.",
      });
    }
    await Code.findOneAndDelete({ user: userDetails._id });
    return res.status(200).json({
      message: "Code has been matched successfully..",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** Change Password Controller ***********************
exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const bcryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { email: email },
      {
        $set: { password: bcryptedPassword },
        $push: { passwordHistory: bcryptedPassword },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Password has been changed successfully.",
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** Get User Profile Controller ***********************
exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user.id);
    const getProfile = await User.findOne({ username }).select(
      "-password -passwordHistory"
    );
    const friendShip = {
      friend: false,
      following: false,
      request: false,
      requestReceived: false,
    };
    if (!getProfile) {
      return res.json({
        Ok: false,
      });
    }

    // Friend
    // if (
    //   user.friends.includes(getProfile._id) &&
    //   getProfile.friends.includes(user._id)
    // ) {
    //   friendShip.friend = true;
    // }

    // Following
    // if (user.following.includes(getProfile._id)) {
    //   friendShip.following = true;
    // }

    // Request
    // if (getProfile.request.includes(user._id)) {
    //   friendShip.request = true;
    // }

    // Request Received
    // if (user.request.includes(getProfile._id)) {
    //   friendShip.requestReceived = true;
    // }

    // friend
    if (
      user.friends.some((id) => id.toString() === getProfile._id.toString()) &&
      getProfile.friends.some((id) => id.toString() === user._id.toString())
    ) {
      friendShip.friend = true;
    }

    // following
    if (
      user.following.some((id) => id.toString() === getProfile._id.toString())
    ) {
      friendShip.following = true;
    }

    // request
    if (
      getProfile.request.some((id) => id.toString() === user._id.toString())
    ) {
      friendShip.request = true;
    }

    // request received
    if (
      user.request.some((id) => id.toString() === getProfile._id.toString())
    ) {
      friendShip.requestReceived = true;
    }

    const posts = await PostModel.find({ userId: getProfile._id })
      .populate("userId")
      .populate("comments.commentedBy", "fName lName username profilePicture")
      .sort({ createdAt: -1 });

    await getProfile.populate("friends", "fName lName username profilePicture");

    return res.json({ ...getProfile.toObject(), posts, friendShip });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** User Profile Photo Update Controller ***********************
exports.updateProfilePhoto = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      profilePicture: url,
    });
    return res.json(url);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ****************** User Cover Photo Update Controller ***********************
exports.updateCoverPhoto = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    return res.json(url);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ******************  Update User Profile Info Details Controller ***********************
exports.updateUserProfileInfoDetails = async (req, res) => {
  try {
    const { userProfileInfos } = req.body;
    const update = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: userProfileInfos,
      },
      {
        new: true,
      }
    );
    return res.send(update.details);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

// ******************  Add Friend Controller ***********************
exports.addFriendController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let sender = await User.findById(req?.user?.id);
      let receiver = await User.findById(req?.params?.id);

      if (
        !receiver.friends.includes(sender._id) &&
        !receiver.request.includes(sender._id)
      ) {
        await receiver.updateOne({
          $push: { request: sender._id },
        });
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: receiver._id },
        });
        // await sender.updateOne({
        //   $push: { requestReceived: receiver._id },
        // });
        return res.json({ message: "Friend request has been sent." });
      } else {
        return res.json({
          message: "Already Added.",
        });
      }
    } else {
      return res.json({
        message: "You can't sent friend request to yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Cancel Friend Request Controller ***********************
exports.cancelFriendRequestController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let sender = await User.findById(req?.user?.id);
      let receiver = await User.findById(req?.params?.id);

      if (
        !receiver.friends.includes(sender._id) &&
        receiver.request.includes(sender._id)
      ) {
        await receiver.updateOne({
          $pull: { request: sender._id },
        });
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          $pull: { following: receiver._id },
        });
        return res.json({ message: "Friend request has been canceled." });
      } else {
        return res.json({
          message: "Already canceled.",
        });
      }
    } else {
      return res.json({
        message: "You can't sent friend request to yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Follow Request Controller ***********************
exports.followRequestController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let sender = await User.findById(req?.user?.id);
      let receiver = await User.findById(req?.params?.id);

      if (
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: sender._id },
        });
        return res.json({ message: "Follow successfully done." });
      } else {
        return res.json({
          message: "Already canceled.",
        });
      }
    } else {
      return res.json({
        message: "You can't follow yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Unfollow Request Controller ***********************
exports.unfollowRequestController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let sender = await User.findById(req?.user?.id);
      let receiver = await User.findById(req?.params?.id);

      if (
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          $pull: { following: sender._id },
        });
        return res.json({ message: "Un-Follow successfully done." });
      } else {
        return res.json({
          message: "Already Un-Followed.",
        });
      }
    } else {
      return res.json({
        message: "You can't follow yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Accept Friend Request Controller ***********************
exports.AcceptFriendRequestController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let receiver = await User.findById(req?.user?.id);
      let sender = await User.findById(req?.params?.id);

      if (receiver.request.includes(sender._id)) {
        await User.findByIdAndUpdate(
          receiver._id,
          {
            $push: { friends: sender._id, following: sender._id },
          },
          { new: true }
        );

        await User.findByIdAndUpdate(
          sender._id,
          {
            $push: { friends: receiver._id, followers: receiver._id },
          },
          { new: true }
        );

        await receiver.updateOne({
          $pull: { request: sender._id },
        });

        return res.json({ message: "Friend request has been Accepted." });
      } else {
        return res.json({
          message: "Already Friend.",
        });
      }
    } else {
      return res.json({
        message: "You can't accept friend request to yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Unfriend Controller ***********************
exports.unFriendController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let sender = await User.findById(req?.user?.id);
      let receiver = await User.findById(req?.params?.id);

      if (
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        await User.findByIdAndUpdate(
          receiver._id,
          {
            $pull: {
              friends: sender._id,
              following: sender._id,
              followers: sender._id,
            },
          },
          { new: true }
        );
        await User.findByIdAndUpdate(
          sender._id,
          {
            $pull: {
              friends: receiver._id,
              following: receiver._id,
              followers: receiver._id,
            },
          },
          { new: true }
        );

        return res.json({ message: "Unfriend." });
      } else {
        return res.json({
          message: "Already Unfriend.",
        });
      }
    } else {
      return res.json({
        message: "You can't unfriend yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Delete Request Controller ***********************
exports.deleteFriendRequestController = async (req, res) => {
  try {
    if (req?.user?.id !== req?.params?.id) {
      let receiver = await User.findById(req?.user?.id);
      let sender = await User.findById(req?.params?.id);

      if (receiver.request.includes(sender._id)) {
        await User.findByIdAndUpdate(
          receiver._id,
          {
            $pull: {
              request: sender._id,
              followers: sender._id,
            },
          },
          { new: true }
        );

        await sender.updateOne({
          $pull: { following: receiver._id },
        });

        return res.json({ message: "Request Delete." });
      } else {
        return res.json({
          message: "Already Deleted.",
        });
      }
    } else {
      return res.json({
        message: "You can't delete yourself.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Search Term Controller ***********************
exports.searchTermController = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const search = await User.find({
      $text: { $search: searchTerm },
    }).select("fName lName username profilePicture");
    res.json(search);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

// ******************  Search History Controller ***********************
exports.searchHistoryController = async (req, res) => {
  try {
    const { searchUser } = req.body;
    const user = await User.findById(req.user.id);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    if (check) {
      await User.updateOne(
        {
          _id: req.user.id,
          "search._id": check._id,
        },
        {
          $set: {
            "search.$.createdAt": new Date(),
          },
        }
      );
    } else {
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            search: {
              user: searchUser,
              createdAt: new Date(),
            },
          },
        },
        { new: true }
      );
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ******************  Get Search History Controller ***********************
exports.getSearchHistoryController = async (req, res) => {
  try {
    const TempSearchHistoryData = await User.findById(req.user.id)
      .select("search")
      .populate("search.user", "fName lName username profilePicture");

    if (!TempSearchHistoryData) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 sort search history by createdAt
    const searchHistoryData = TempSearchHistoryData.search.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(searchHistoryData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ******************  Remove Search History Controller ***********************
exports.removeSearchHistoryController = async (req, res) => {
  try {
    const { searchUser } = req.body;
    const user = await User.updateOne(
      { _id: req.user.id },
      {
        $pull: {
          search: {
            user: searchUser,
          },
        },
      }
    );
    if (user.acknowledged && user.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Search history removed",
        user,
      });
    } else {
      res.json({
        message: "User not Found.!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ******************  Get All Friends Controller ***********************
exports.getAllFriendsController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends request")
      .populate("friends", "fName lName username profilePicture")
      .populate("request", "fName lName username profilePicture");

    // User send Request part
    const sentRequest = await User.find({
      request: req.user.id,
    }).select("fName lName username profilePicture");

    res.json({
      friend: user.friends,
      request: user.request,
      sentRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const express = require("express");
const {
  newUser,
  login,
  emailVerify,
  reVerification,
  findUser,
  resetCode,
  resetCodeVerify,
  changePassword,
  getUserProfile,
  updateProfilePhoto,
  updateCoverPhoto,
  updateUserProfileInfoDetails,
  addFriendController,
  cancelFriendRequestController,
  followRequestController,
  unfollowRequestController,
  AcceptFriendRequestController,
  unFriendController,
  deleteFriendRequestController,
  searchTermController,
  searchHistoryController,
  getSearchHistoryController,
  removeSearchHistoryController,
  getAllFriendsController,
} = require("../../controllers/userController");
const { authUser } = require("../../middlewares/authorizationMiddleware");
const router = express.Router();

router.post("/registration", newUser);
router.post("/verify", emailVerify);
router.post("/reverification", reVerification);
router.post("/reset-password", findUser);
router.post("/reset-code", resetCode);
router.post("/reset-code-verify", resetCodeVerify);
router.post("/change-Password", changePassword);
router.post("/login", login);
router.get("/get-user-profile/:username", authUser, getUserProfile);
router.put("/update-profile-photo", authUser, updateProfilePhoto);
router.put("/update-cover-photo", authUser, updateCoverPhoto);
router.put(
  "/update-profile-info-details",
  authUser,
  updateUserProfileInfoDetails
);
// Add, Remove, Follow and Following Friend
router.put("/add-friend/:id", authUser, addFriendController);
router.put(
  "/cancel-friend-request/:id",
  authUser,
  cancelFriendRequestController
);
router.put("/follow-request/:id", authUser, followRequestController);
router.put("/unfollow-request/:id", authUser, unfollowRequestController);
router.put(
  "/accept-friend-request/:id",
  authUser,
  AcceptFriendRequestController
);
router.put("/unfriend/:id", authUser, unFriendController);
router.put(
  "/delete-friend-request/:id",
  authUser,
  deleteFriendRequestController
);
router.post("/search/:searchTerm", authUser, searchTermController);
router.put("/search-history", authUser, searchHistoryController);
router.get("/getSearch-history", authUser, getSearchHistoryController);
router.put("/remove-search-history", authUser, removeSearchHistoryController);
router.get("/getAllFriends", authUser, getAllFriendsController);

module.exports = router;

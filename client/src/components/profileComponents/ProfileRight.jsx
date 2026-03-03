import React, { useState } from "react";
import PostHome from "../homeComponents/middlePart/PostHome";
import ProfilePostView from "./ProfilePostView";
import PostGridView from "../homeComponents/middlePart/showPost/PostGridView";
import ShowPost from "../homeComponents/middlePart/showPost/ShowPost";

const ProfileRight = ({
  visible,
  setVisible,
  posts,
  profile,
  userInfo,
  visitor,
}) => {
  const [postView, setPostView] = useState("list");
  return (
    <>
      {!visitor && (
        <div>
          <PostHome visible={visible} setVisible={setVisible} posts={posts} />
        </div>
      )}
      <div className="mt-5">
        <ProfilePostView postView={postView} setPostView={setPostView} />
      </div>
      <div>
        {profile?.posts && profile?.posts?.length ? (
          <div className="py-3">
            {postView === "list" ? (
              profile?.posts?.map((item) => (
                <ShowPost key={item._id} item={item} userInfo={userInfo} />
              ))
            ) : (
              <div className="grid grid-cols-2 justify-center items-center gap-2 bg-white-color">
                {profile?.posts?.map((item) => (
                  <PostGridView
                    key={item._id}
                    item={item}
                    userInfo={userInfo}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full bg-white-color mt-5 p-3 text-center rounded-md shadow-md">
            <h4 className="font-Gilroy-Medium text-xl text-black-color capitalize">
              You have No Post.
            </h4>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileRight;

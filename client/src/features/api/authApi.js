import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.loginRefreshToken) {
        headers.set("Authorization", `${user.loginRefreshToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/registration",
        method: "POST",
        body,
      }),
    }),
    loggedInUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    verifiedUser: builder.mutation({
      query: ({ emailVerificationToken }) => ({
        url: "/api/v1/auth/verify",
        method: "POST",
        body: { emailVerificationToken },
      }),
    }),
    reVerification: builder.mutation({
      query: ({ email }) => ({
        url: "/api/v1/auth/reverification",
        method: "POST",
        body: { email },
      }),
    }),
    matchUser: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: { email },
      }),
    }),
    sendCode: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/reset-code",
        method: "POST",
        body: { email },
      }),
    }),
    sendCodeVerification: builder.mutation({
      query: ({ email, code }) => ({
        url: "/api/v1/auth/reset-code-verify",
        method: "POST",
        body: { email, code },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/change-Password",
        method: "POST",
        body: { email, password },
      }),
    }),
    createPost: builder.mutation({
      query: ({ type, images, text, background, userId }) => ({
        url: "/api/v1/post/create-post",
        method: "POST",
        body: { type, images, text, background, userId },
      }),
      transformResponse: (response) => ({
        status: "done",
        data: response,
      }),
      // =====================================================
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     authApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
      //       draft.unshift({
      //         userId: arg.userId,
      //         text: arg.text,
      //         images: arg.images,
      //         comments: [],
      //         reacts: [],
      //         createdAt: new Date().toISOString(),
      //       });
      //     })
      //   );
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(
      //       authApi.util.updateQueryData("getAllPosts", undefined, (draft) => {
      //         const index = draft.findIndex((p) => p._id === "temp-id");
      //         if (index !== -1) {
      //           draft[index] = data.post;
      //         }
      //       })
      //     );
      //   } catch {
      //     patchResult.undo();
      //   }
      // },

      // =====================================================
    }),
    uploadImage: builder.mutation({
      query: ({ formData }) => ({
        url: "/api/v1/upload/upload-image",
        method: "POST",
        body: formData,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: "/api/v1/post/get-all-post",
        method: "GET",
      }),
    }),
    getUserProfile: builder.query({
      query: (userName) => ({
        url: `/api/v1/auth/get-user-profile/${userName}`,
        method: "GET",
      }),
    }),
    imageList: builder.mutation({
      query: ({ path, sort, max }) => ({
        url: "/api/v1/upload/image-list",
        method: "POST",
        body: { path, sort, max },
      }),
    }),
    uploadProfilePhoto: builder.mutation({
      query: ({ url }) => ({
        url: "/api/v1/auth/update-profile-photo",
        method: "PUT",
        body: { url },
      }),
      transformResponse: (response) => ({
        status: "done",
        data: response,
      }),
    }),
    uploadCoverPhoto: builder.mutation({
      query: ({ url }) => ({
        url: "/api/v1/auth/update-cover-photo",
        method: "PUT",
        body: { url },
      }),
      transformResponse: (response) => ({
        status: "done",
        data: response,
      }),
    }),
    updateUserProfileInfoDetails: builder.mutation({
      query: ({ userProfileInfos }) => ({
        url: "/api/v1/auth/update-profile-info-details",
        method: "PUT",
        body: { userProfileInfos },
      }),
    }),
    addFriend: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/add-friend/${id}`,
        method: "PUT",
      }),
    }),
    cancelFriendRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/cancel-friend-request/${id}`,
        method: "PUT",
      }),
    }),
    followRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/follow-request/${id}`,
        method: "PUT",
      }),
    }),
    unfollowRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/unfollow-request/${id}`,
        method: "PUT",
      }),
    }),
    acceptFriendRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/accept-friend-request/${id}`,
        method: "PUT",
      }),
    }),
    unfriend: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/unfriend/${id}`,
        method: "PUT",
      }),
    }),
    deleteFriendRequest: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/delete-friend-request/${id}`,
        method: "PUT",
      }),
    }),
    // reactPost: builder.mutation({
    //   query: ({ postId, react }) => ({
    //     url: `/api/v1/reacts/react-post`,
    //     method: "PUT",
    //     body: { postId, react },
    //   }),
    // }),
    // ==============================================================================================
    reactPost: builder.mutation({
      query: ({ postId, react }) => ({
        url: `/api/v1/reacts/react-post`,
        method: "put",
        body: { postId, react },
      }),

      async onQueryStarted({ postId, react }, { dispatch, queryFulfilled }) {
        // instant UI update
        const patchResult = dispatch(
          authApi.util.updateQueryData("getAllReacts", { postId }, (draft) => {
            // previous react remove
            if (draft.check) {
              const prev = draft.reactsTotalCount.find(
                (r) => r.react === draft.check
              );
              if (prev) prev.count -= 1;
              draft.total -= 1;
            }

            // new react add
            const current = draft.reactsTotalCount.find(
              (r) => r.react === react
            );
            if (current) current.count += 1;
            else draft.reactsTotalCount.push({ react, count: 1 });

            draft.check = react;
            draft.total += 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // server fail → rollback
          patchResult.undo();
        }
      },
    }),
    // ==============================================================================================
    getAllReacts: builder.query({
      query: ({ postId }) => ({
        url: `/api/v1/reacts/get-all-react/${postId}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation({
      query: ({ comment, image, postId }) => ({
        url: `/api/v1/post/create-comment`,
        method: "PUT",
        body: { comment, image, postId },
      }),
    }),
    savePost: builder.mutation({
      query: (postId) => ({
        url: `/api/v1/post/save-post/${postId}`,
        method: "PUT",
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/api/v1/post/delete-post/${postId}`,
        method: "DELETE",
      }),
    }),
    searchQuery: builder.mutation({
      query: (searchTerm) => ({
        url: `/api/v1/auth/search/${searchTerm}`,
        method: "POST",
      }),
    }),
    addSearchHistory: builder.mutation({
      query: ({ searchUser }) => ({
        url: `/api/v1/auth/search-history`,
        method: "PUT",
        body: { searchUser },
      }),
    }),
    getSearchHistory: builder.query({
      query: (userName) => ({
        url: `/api/v1/auth/getSearch-history`,
        method: "GET",
      }),
    }),
    removeSearchHistory: builder.mutation({
      query: ({ searchUser }) => ({
        url: `/api/v1/auth/remove-search-history`,
        method: "PUT",
        body: { searchUser },
      }),
      invalidatesTags: ["SearchHistory"],
    }),
    getAllFriends: builder.query({
      query: () => ({
        url: `/api/v1/auth/getAllFriends`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoggedInUserMutation,
  useVerifiedUserMutation,
  useReVerificationMutation,
  useMatchUserMutation,
  useSendCodeMutation,
  useSendCodeVerificationMutation,
  useChangePasswordMutation,
  useCreatePostMutation,
  useUploadImageMutation,
  useGetAllPostsQuery,
  useGetUserProfileQuery,
  useImageListMutation,
  useUploadProfilePhotoMutation,
  useUploadCoverPhotoMutation,
  useUpdateUserProfileInfoDetailsMutation,
  useAddFriendMutation,
  useCancelFriendRequestMutation,
  useFollowRequestMutation,
  useUnfollowRequestMutation,
  useAcceptFriendRequestMutation,
  useUnfriendMutation,
  useDeleteFriendRequestMutation,
  useReactPostMutation,
  useGetAllReactsQuery,
  useCreateCommentMutation,
  useSavePostMutation,
  useDeletePostMutation,
  useSearchQueryMutation,
  useAddSearchHistoryMutation,
  useGetSearchHistoryQuery,
  useRemoveSearchHistoryMutation,
  useGetAllFriendsQuery,
} = authApi;

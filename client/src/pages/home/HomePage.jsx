import { Helmet } from "react-helmet";
import PostHome from "../../components/homeComponents/middlePart/PostHome";
import { useSelector } from "react-redux";
import ShowPost from "../../components/homeComponents/middlePart/showPost/ShowPost";
import { useGetAllPostsQuery } from "../../features/api/authApi";

const HomePage = ({ visible, setVisible }) => {
  const { userInfo } = useSelector((stat) => stat.userInformation);
  const { data: posts } = useGetAllPostsQuery();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <PostHome visible={visible} setVisible={setVisible} posts={posts} />
      <div className="p-3">
        {posts?.map((item) => (
          <ShowPost key={item._id} item={item} userInfo={userInfo} />
        ))}
      </div>
    </>
  );
};

export default HomePage;

import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";
import PropTypes from "prop-types";

const Post = ({ id }) => {
  const postQuery = useQuery({
      queryKey: ["posts", id],
      queryFn: () => getPost(id),
    }),
    userQuery = useQuery({
      queryKey: ["users", postQuery?.data?.userId],
      enabled: postQuery?.data?.userId != null,
      queryFn: () => getUser(postQuery.data.userId),
    });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
};
Post.propTypes = {
  id: PropTypes.number,
};
export default Post;

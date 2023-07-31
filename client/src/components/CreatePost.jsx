import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "../api/posts";
import Post from "./Post";

const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef(),
    bodyRef = useRef(),
    queryClient = useQueryClient(),
    createPostMutation = useMutation({
      mutationFn: createPost,
      onSuccess: (data) => {
        queryClient.setQueryData(["posts", data.id], data);
        queryClient.invalidateQueries(["posts"], { exact: true });
        setCurrentPage(<Post id={data.id} />);
      },
    }),
    handleSubmit = (e) => {
      e.preventDefault();
      createPostMutation.mutate({
        title: titleRef.current.value,
        body: bodyRef.current.value,
      });
    };

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button type="submit" disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}

CreatePost.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default CreatePost;

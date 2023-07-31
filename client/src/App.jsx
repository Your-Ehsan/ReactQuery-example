import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import PostsList1 from "./components/PostsList1";
import { getPost } from "./api/posts";
import PostsList2 from "./components/PostsList2";
import Post from "./components/Post";
import { PostListPaginated } from "./components/PostListPaginated";
import { PostListInfinite } from "./components/PostListInfinite";
import CreatePost from "./components/CreatePost";

const App = () => {
    const [currentPage, setCurrentPage] = useState(<PostsList1 />),
      queryClient = useQueryClient(),
      onHoverPostOneLink = () => {
        queryClient.prefetchQuery({
          queryKey: ["posts", 1],
          queryFn: () => wait(2000).then(async () => await getPost(1)),
        });
      };

    return (
      <div>
        <button onClick={() => setCurrentPage(<PostsList1 />)}>
          Posts List 1
        </button>
        <button onClick={() => setCurrentPage(<PostsList2 />)}>
          Posts List 2
        </button>
        <button
          onMouseEnter={onHoverPostOneLink}
          onClick={() => setCurrentPage(<Post id={1} />)}
        >
          First Post
        </button>
        <button
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          New Post
        </button>
        <button onClick={() => setCurrentPage(<PostListPaginated />)}>
          Post List Paginated
        </button>
        <button onClick={() => setCurrentPage(<PostListInfinite />)}>
          Post List Infinite
        </button>
        <br />
        {currentPage}
      </div>
    );
  },
  wait = (duration) => {
    return new Promise((resolve) => setInterval(resolve, duration));
  };
export default App;

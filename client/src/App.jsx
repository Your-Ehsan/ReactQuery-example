import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const wait = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
  },
 
  App = () => {
    const PostsQuery = useQuery({
      queryKey: ["posts"],
      queryFn: () =>
        wait(3000).then(async () => {
          const { data } = await axios.get("http://localhost:3000/posts");
          return data;
        }),
    });

    if (PostsQuery.isLoading) {
      return <h1>Loading ...</h1>
    }

    return (
      <div>
        <ol type="1">
          {PostsQuery.data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ol>
      </div>
    );
  };

export default App;

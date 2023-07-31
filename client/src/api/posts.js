import axios from "axios";

const getPosts = async () => {
    const AllPosts = await axios
      .get("http://localhost:3000/posts", { params: { _sort: "title" } })
      .then((res) => res.data);
    return AllPosts;
  },

  getPostsPaginated = async (page) => {
    const PaginatedPosts = await axios
      .get("http://localhost:3000/posts", {
        params: { _page: page, _sort: "title", _limit: 2 },
      })
      .then((res) => {
        const hasNext = page * 2 <= parseInt(res.headers["x-total-count"]);
        return {
          nextPage: hasNext ? page + 1 : undefined,
          previousPage: page > 1 ? page - 1 : undefined,
          posts: res.data,
        };
      });
    return PaginatedPosts;
  },

  getPost = async (id) => {
    const post = await axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => res.data);
    return post;
  },

  createPost = async ({ title, body }) => {
    const _CreatePost = await axios
      .post("http://localhost:3000/posts", {
        title,
        body,
        userId: 1,
        id: Date.now(),
      })
      .then((res) => res.data);
    return _CreatePost;
  };

export { getPost, getPostsPaginated, getPosts, createPost };

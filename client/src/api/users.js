import axios from "axios";

const getUser = async (id) => {
  const user = await axios
    .get(`http://localhost:3000/users/${id}`)
    .then((res) => res.data);
  return user;
};

export { getUser };

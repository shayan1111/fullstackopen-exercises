import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updatedLikes = async (newObject) => {
  const { user, ...objectToUpdate } = newObject
  const updatedBlog = {
    ...objectToUpdate,
    likes: newObject.likes + 1,
  };

  const response = await axios.put(`${baseUrl}/${newObject.id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (idToDelete) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${idToDelete}`, config);
  return;
};

const addComment = async (blogId, commentValue) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`,
    {
      comment: commentValue
    }
  )
  return response.data
}

export default { getAll, create, setToken, updatedLikes, deleteBlog, addComment };

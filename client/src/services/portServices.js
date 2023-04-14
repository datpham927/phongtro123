import httpRequest from "../utils/httpRequets";

const apiPost = async ({ page, ...query }) => {
  try {
    const response = await httpRequest.get(`post/all?limit=10&page=${page}`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiNewPost = async () => {
  try {
    const response = await httpRequest.get(`post/new-post `);
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiCreatePost = async (content) => {
  try {
    const response = await httpRequest.post(`/post/create-post`, content);
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiGetPostAdmin = async () => {
  try {
    const response = await httpRequest.get(`/post/admin-post`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiUpdatePost = async (data) => {
  try {
    const response = await httpRequest.put(`/post/update-post`,data);
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiDeletePost = async (postId) => {
  try {
    const response = await httpRequest.delete(`/post/delete-post`,{
      params:{postId}
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiDetailPost = async (postId) => {
  try {
    const response = await httpRequest.get(`/post/detail-post`,{
      params:{postId}
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export { apiPost, apiNewPost, apiCreatePost, apiGetPostAdmin ,apiUpdatePost,apiDeletePost,apiDetailPost};

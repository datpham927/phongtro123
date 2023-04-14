import httpRequest from "../utils/httpRequets";

const getDetailUser = async () => {
  try {
    const response = await httpRequest.get(`/user/detail`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const apiUpdateUser = async (data) => {
  try {
    const response = await httpRequest.put(`/user/update`,data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getDetailUser ,apiUpdateUser};

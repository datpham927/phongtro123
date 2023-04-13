import httpRequest from "../utils/httpRequets";

const getDetailUser = async () => {
  try {
    const response = await httpRequest.get(
      `http://localhost:4000/api/user/detail`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getDetailUser };

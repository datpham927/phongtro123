import httpRequest from "../utils/httpRequets";

const apiRegister = async (data) => {
  try {
    const response = await httpRequest.post("/auth/register", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const apiLogin = async (data) => {
  try {
    const response = await httpRequest.post("/auth/login", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export { apiRegister, apiLogin };

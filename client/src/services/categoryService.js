import httpRequest from "../utils/httpRequets";

const apiCategory = async () => {
  try {
    const response = await httpRequest.get("/category");
    return response.data;
  } catch (error) {
    return error;
  }
};

export { apiCategory };

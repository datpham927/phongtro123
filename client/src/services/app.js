import axios from "axios";
import httpRequest from "../utils/httpRequets";

const apiArea = async () => {
  try {
    const response = await httpRequest.get("/area");
    return response.data;
  } catch (error) {
    return error;
  }
};

const apiPrice = async () => {
  try {
    const response = await httpRequest.get("/price");
    return response.data;
  } catch (error) {
    return error;
  }
};

const apiProvince = async () => {
  try {
    const response = await httpRequest.get("/province");
    return response.data;
  } catch (error) {
    return error;
  }
};
const getApiPublicProvince = async () => {
  try {
    const response = await axios.get(" https://vapi.vnappmob.com/api/province");
    return response.data;
  } catch (error) {
    return error;
  }
};

const getApiPublicDistrict = async (district) => {
  try {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${district}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
const getApiUploadImage = async (formData) => {
  console.log("formData", formData);
  try {
    const response = await await axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
      data: formData,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export {
  apiPrice,
  apiArea,
  apiProvince,
  getApiPublicProvince,
  getApiPublicDistrict,
  getApiUploadImage,
};

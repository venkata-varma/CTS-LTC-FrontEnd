import axiosInstance from "../../../api/axiosInstance";

export const registerUserApi = async (userData) => {
  const response = await axiosInstance.post(
    "/user/register-user",
    userData,
  );

  return response.data;
};

export const loginUserApi = async (userData) => {
  const response = await axiosInstance.post(
    "/user/login-user",
    userData,
  );

  return response.data;
};
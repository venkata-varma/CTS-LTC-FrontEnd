import axiosInstance from "../api/axiosInstance";

export const getAllCheques = async () => {
  const response = await axiosInstance.get("/cheque/get-all-cheques");

  return response.data;
};
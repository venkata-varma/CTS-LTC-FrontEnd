import axiosInstance from "../../../api/axiosInstance";

export const calculateStuffingApi = async (
  calculationSessionId,
) => {
  const response = await axiosInstance.post(
    `/stuffing-calculation/calculate-stuffing/${calculationSessionId}`,
  );

  return response.data;
};
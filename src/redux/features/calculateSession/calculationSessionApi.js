import axiosInstance from "../../../api/axiosInstance";

export const startNewSessionApi = async () => {
  const response = await axiosInstance.get(
    "/calculation-session/start-new-session",
  );

  return response.data;
};

export const saveAndStartNewSessionApi = async (
  calculationSessionId,
) => {
  const response = await axiosInstance.patch(
    `/calculation-session/save-and-start-new-session/${calculationSessionId}`,
  );

  return response.data;
};

export const getAllSessionsOfUserApi = async () => {
  const response = await axiosInstance.get(
    "/calculation-session/get-all-sessions-of-user",
  );

  return response.data;
};

export const reactivateSessionApi = async ({
  currentOpenId,
  reactivateId,
}) => {
  const response = await axiosInstance.patch(
    "/calculation-session/reactivate-session",
    {
      currentOpenId,
      reactivateId,
    },
  );

  return response.data;
};
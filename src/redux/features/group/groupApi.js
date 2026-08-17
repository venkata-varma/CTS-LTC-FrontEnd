import axiosInstance from "../../../api/axiosInstance";

export const createGroupApi = async (payload) => {
  const response = await axiosInstance.post(
    "/groups/create-group",
    payload,
  );

  return response.data;
};

export const getAllGroupsOfSessionApi = async (
  calculationSessionId,
) => {
  const response = await axiosInstance.get(
    `/groups/get-all-groups-of-session/${calculationSessionId}`,
  );

  return response.data;
};

export const updateGroupApi = async (
  groupId,
  payload,
) => {
  const response = await axiosInstance.patch(
    `/groups/update-group/${groupId}`,
    payload,
  );

  return response.data;
};

export const deleteGroupApi = async (
  groupId,
) => {
  const response = await axiosInstance.patch(
    `/groups/delete-group/${groupId}`,
  );

  return response.data;
};
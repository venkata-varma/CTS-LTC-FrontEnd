import axiosInstance from "../../../api/axiosInstance";

export const createVehicleApi = async (payload) => {
  const response = await axiosInstance.post(
    "/vehicle/create-vehicle",
    payload,
  );

  return response.data;
};

export const getAllVehiclesOfSessionApi = async (
  calculationSessionId,
) => {
  const response = await axiosInstance.get(
    `/vehicle/get-all-vehicles-of-session/${calculationSessionId}`,
  );

  return response.data;
};

export const updateVehicleApi = async (
  vehicleId,
  payload,
) => {
  const response = await axiosInstance.patch(
    `/vehicle/update-vehicle/${vehicleId}`,
    payload,
  );

  return response.data;
};

export const deleteVehicleApi = async (
  vehicleId,
) => {
  const response = await axiosInstance.patch(
    `/vehicle/delete-vehicle/${vehicleId}`,
  );

  return response.data;
};
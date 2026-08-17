import axiosInstance from "../../../api/axiosInstance";

export const createProductApi = async (payload) => {
  const response = await axiosInstance.post(
    "/products/create-product",
    payload,
  );

  return response.data;
};

export const getProductsOfGroupApi = async (
  groupId,
) => {
  const response = await axiosInstance.get(
    `/products/get-products-of-group/${groupId}`,
  );

  return response.data;
};

export const updateProductApi = async (
  productId,
  payload,
) => {
  const response = await axiosInstance.patch(
    `/products/update-product/${productId}`,
    payload,
  );

  return response.data;
};

export const deleteProductApi = async (
  productId,
) => {
  const response = await axiosInstance.patch(
    `/products/delete-product/${productId}`,
  );

  return response.data;
};


export const getProductsOfSessionApi = async (
  calculationSessionId,
) => {
  const response = await axiosInstance.get(
    `/products/get-products-of-session/${calculationSessionId}`,
  );

  return response.data;
};
import axiosInstance from "../../../api/axiosInstance";

// ========================================
// GET INDIVIDUAL CHEQUE
// ========================================

export const getIndividualChequeApi = async (chequeId) => {
  const response = await axiosInstance.get(
    `/cheque/get-individual-cheque/${chequeId}`,
  );

  return response.data;
};

// ========================================
// GET CHEQUE WORKFLOW ACTIVITIES
// ========================================

export const getChequeWorkflowActivitiesApi = async (chequeId) => {
  const response = await axiosInstance.get(
    `/cheque/get-cheque-workflow-activities/${chequeId}`,
  );

  return response.data;
};
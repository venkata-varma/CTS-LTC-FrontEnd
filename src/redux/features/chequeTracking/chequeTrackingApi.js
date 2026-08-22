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


// ========================================
// RESCHEDULE CHEQUE
// ========================================

export const rescheduleChequeApi = async (
  chequeId,
  rescheduleData
) => {
  const response = await axiosInstance.patch(
    `/cheque/reschedule-cheque/${chequeId}`,
    rescheduleData
  );

  return response.data;
};


// ========================================
// SUBMIT CHEQUE FOR FIRST TIME
// ========================================

export const submitChequeApi = async (
  chequeId,
  submissionData
) => {
  const response = await axiosInstance.patch(
    `/cheque/submit-cheque/${chequeId}`,
    submissionData
  );

  return response.data;
};
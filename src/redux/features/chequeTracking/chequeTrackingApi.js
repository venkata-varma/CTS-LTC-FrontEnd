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

// ========================================
// UPDATE CHEQUE PRESENT PLACE
// ========================================

export const updatePresentPlaceApi = async (
  chequeId,
  presentPlaceData
) => {
  const response = await axiosInstance.patch(
    `/cheque/update-present-place/${chequeId}`,
    presentPlaceData
  );

  return response.data;
};

// ========================================
// RECORD CHEQUE BOUNCE
// ========================================

export const recordChequeBounceApi = async (
  chequeId,
  bounceData
) => {
  const response = await axiosInstance.post(
    `/cheque/record-bounce/${chequeId}`,
    bounceData
  );

  return response.data;
};


// ========================================
// GET CHEQUE BOUNCE CYCLES
// ========================================

export const getChequeBounceCyclesApi = async (
  chequeId
) => {
  const response = await axiosInstance.get(
    `/cheque/get-bounce-cycles/${chequeId}`
  );

  return response.data;
};


// ========================================
// RECORD RETURNED CHEQUE RECEIPT
// ========================================

export const recordReturnedChequeReceiptApi = async (
  bounceCycleId,
  receiptData
) => {
  const response = await axiosInstance.patch(
    `/cheque/record-returned-cheque-receipt/${bounceCycleId}`,
    receiptData
  );

  return response.data;
};



// ========================================
// RECORD CHEQUE REDEPOSIT
// ========================================

export const recordChequeRedepositApi = async (
  bounceCycleId,
  redepositData
) => {
  const response = await axiosInstance.patch(
    `/cheque/record-redeposit/${bounceCycleId}`,
    redepositData
  );

  return response.data;
};




// ========================================
// ADD CHEQUE NOTE
// ========================================

export const addChequeNoteApi = async (
  chequeId,
  noteData
) => {
  const response = await axiosInstance.post(
    `/cheque/add-note/${chequeId}`,
    noteData
  );

  return response.data;
};

// ========================================
// RECORD CHEQUE CLEARANCE
// ========================================

export const recordChequeClearanceApi = async (
  chequeId,
  clearanceData
) => {
  const response = await axiosInstance.patch(
    `/cheque/record-clearance/${chequeId}`,
    clearanceData
  );

  return response.data;
};
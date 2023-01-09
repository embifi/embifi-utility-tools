export const stageList = Object.freeze({
  PRE_CREDIT: {
    STATUS: {
      APPLIED: "APPLIED",
      NOT_APPLIED: "NOT_APPLIED",
    },
  },
  CUSTOMER_KYC: {
    STATUS: {
      SUBMITTED: "SUBMITTED",
      // NOT_SUBMITTED: "NOT_SUBMITTED",
      // ADDITIONAL_DOCS: "ADDITIONAL_DOCS",
    },
    SUB_STATUS: {
      // AUTO_APPROVED: "AUTO_APPROVED",
      MANUALLY_APPROVED: "MANUALLY_APPROVED",
      MANUALLY_REJECTED: "MANUALLY_REJECTED",
      UNDER_REVIEW: "UNDER_REVIEW",
    },
  },
  CREDIT_CHECK_1: {
    STATUS: {
      ELIGIBLE: "ELIGIBLE",
      REJECTED: "REJECTED",
      UNDER_REVIEW: "UNDER_REVIEW",
    },
    SUB_STATUS: {
      AUTO_APPROVED: "AUTO_APPROVED",
      CO_APPLICANT_REQUIRED: "CO_APPLICANT_REQUIRED",
      BAD_BUREAU: "BAD_BUREAU",
      CREDIT_POLICY_NOT_FULFILLED: "CREDIT_POLICY_NOT_FULFILLED",
      NEGATIVE_PINCODE: "NEGATIVE_PINCODE",
      OUTSIDE_GEO_LIMIT: "OUTSIDE_GEO_LIMIT",
    },
  },
  CREDIT_CHECK_2: {
    STATUS: {
      ELIGIBLE: "ELIGIBLE",
      REJECTED: "REJECTED",
      UNDER_REVIEW: "UNDER_REVIEW",
    },
    SUB_STATUS: {
      AUTO_APPROVED: "AUTO_APPROVED",
      CO_APPLICANT_REQUIRED: "CO_APPLICANT_REQUIRED",
      BAD_BUREAU: "BAD_BUREAU",
      CREDIT_POLICY_NOT_FULFILLED: "CREDIT_POLICY_NOT_FULFILLED",
      NEGATIVE_PINCODE: "NEGATIVE_PINCODE",
      OUTSIDE_GEO_LIMIT: "OUTSIDE_GEO_LIMIT",
    },
  },
  CO_CUSTOMER_KYC: {
    STATUS: {
      SUBMITTED: "SUBMITTED",
      // NOT_SUBMITTED: "NOT_SUBMITTED",
      // ADDITIONAL_DOCS: "ADDITIONAL_DOCS",
    },
    SUB_STATUS: {
      // AUTO_APPROVED: "AUTO_APPROVED",
      MANUALLY_APPROVED: "MANUALLY_APPROVED",
      MANUALLY_REJECTED: "MANUALLY_REJECTED",
      UNDER_REVIEW: "UNDER_REVIEW",
    },
  },
  LOAN_OFFER: {
    STATUS: {
      ACCEPTED: "ACCEPTED",
      REJECTED: "REJECTED",
    },
  },
  PRE_DISBURSEMENT: {
    STATUS: {
      PENDING: "PENDING",
      COMPLETED: "COMPLETED",
    },
    SUB_STATUS: {
      CPV_COMPLETED: "COMPLETED",
      CPV_PENDING: "PENDING",
      // LOAN_DOCS_PENDING: "LOAN_DOCS_PENDING",
      // BANK_VERIFICATION_FAILED: "FAILED",
      ENACH_SUCCESSFUL: "SUCCESSFUL",
      ENACH_UNSUCCESSFUL: "UNSUCCESSFUL",
      UPI_AUTOPAY_SUCCESSFUL: "SUCCESSFUL",
      UPI_AUTOPAY_UNSUCCESSFUL: "UNSUCCESSFUL",
      // LOAN_DOCS_COMPLETED: "LOAN_DOCS_COMPLETED",
      // CUSTOMER_DOC_COMPLETED: "COMPLETED",
      // CUSTOMER_DOC_PENDING: "PENDING",
      // CO_CUSTOMER_DOC_COMPLETED: "COMPLETED",
      // CO_CUSTOMER_DOC_PENDING: "PENDING",
      // COMPLETED_BANK_VERIFICATION: "COMPLETED",
      DOCUMENT_UPLOAD_PENDING: "DOCUMENT_UPLOAD_PENDING",
      DOCUMENT_UPLOAD_COMPLETED: "DOCUMENT_UPLOAD_COMPLETED",
    },
  },
  POST_DISBURSEMENT: {
    STATUS: {
      RC_UPLOAD: "RC_UPLOAD",
    },
    SUB_STATUS: {
      PENDING: "PENDING",
      CLOSED: "CLOSED",
    },
  },
  DISBURSAL: {
    STATUS: {
      DISBURSED: "DISBURSED",
      DISBURSAL_PENDING: "DISBURSAL_PENDING",
      EMBIFI_APPROVAL: "EMBIFI_APPROVAL",
      NBFC_APPROVAL: "NBFC_APPROVAL",
    },
    SUB_STATUS: {
      PENDING: "PENDING",
      REJECTED: "REJECTED",
      APPROVED: "APPROVED",
    },
  },
});

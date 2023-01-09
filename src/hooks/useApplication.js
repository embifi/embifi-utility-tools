import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchApplicationDetails } from "../api";
import { useContext } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import moment from "moment";

export default function useApplication() {
  const { updateDetailState, customersList, panData } =
    useContext(GlobalContext);
  const [updateDetails, setUpdateDetails] = updateDetailState;

  const getValue = (field, defaultValue) => {
    if (field) {
      return field;
    } else return defaultValue;
  };

  const getApplicationDetails = async (application_id, setLoading) => {
    console.log("loading");

    if (setLoading) setLoading(true);
    try {
      let { data: response } = await fetchApplicationDetails(application_id);

      const { customerData, bank_details, coCustomerData } = response?.data;
      const loanData = response?.data;

      // console.log(loanData);

      //   console.log(coCustomerData? true : false);

      // console.log(bank_details);

      let status = getCurrentStatus(loanData);

      setUpdateDetails((st) => ({
        ...st,
        application_id,
        loan_id: loanData?.loan_id,
        current_status: status,
        application_status: status,
        embifi_approval: loanData?.embifi_approval_details?.status,
        rejected_reason: getValue(
          loanData?.embifi_approval_details?.remark,
          null
        ),
        customer_id: customerData?.customer_id,
        nbfc_id: loanData?.nbfc_id,
        pan_number: customerData?.is_corporate
          ? customerData?.corporate_pan_details?.number
          : customerData?.pan_details?.number,
        pan_type: customerData?.is_corporate ? "corporate" : "individual",
        customer_name: customerData?.is_corporate
          ? customerData?.corporate_pan_details?.name
          : customerData?.pan_details?.name,
        is_corporate: customerData?.is_corporate,
        dob: customerData?.dob,
        mobile_number: customerData?.mobile_number,
        email: customerData?.email_id,
        gender: customerData?.gender,

        residential_address: customerData?.residential_address?.address,
        residential_address_pincode: customerData?.residential_address?.pincode,
        residential_address_city: customerData?.residential_address?.city,
        residential_address_district:
          customerData?.residential_address?.district,
        residential_address_state: customerData?.residential_address?.state,
        is_property_owned: customerData?.residential_address?.property_owned,

        aadhaar_address: customerData?.aadhaar_details?.address,
        aadhaar_name: customerData?.aadhaar_details?.name,
        aadhaar_number: customerData?.aadhaar_details?.id_number,
        aadhaar_gender: customerData?.aadhaar_details?.gender,

        income: customerData?.other_details?.income,
        education: customerData?.other_details?.education,

        // Credit Data

        credit_eligible: loanData?.credit_engine?.eligible,
        credit_isCocustomer: loanData?.credit_engine?.isCoAppReq,
        credit_response: loanData?.credit_engine?.message,

        // Loan Details

        start_date: loanData?.application_start_date
          ? moment(loanData?.application_start_date).format("DD/MM/YYYY")
          : null,
        last_updated: loanData?.updatedAt
          ? moment(loanData?.updatedAt).format("DD/MM/YYYY")
          : null,
        anchor_id: loanData?.anchor_id,
        origin: loanData?.origin,
        agent_id: loanData?.agent_id,
        disbursal_date: loanData?.disbursed_date
          ? moment(loanData?.disbursed_date).format("DD/MM/YYYY")
          : null,
        is_disbursed: loanData?.is_disbursed,
        nbfc_loan_id: loanData?.nbfc_loan_id,
        oem_id: loanData?.oem_id ? loanData?.oem_id : null,
        loan_type: loanData?.loan_type,
        product_type: "",
        loan_amount: loanData?.loan_amount,
        interest: loanData?.interest_amount,
        processing_fee: loanData?.processing_charge,
        processing_rate: loanData?.processing_charge_rate,
        crif_score: getValue(
          loanData?.credit_pull?.credit_data?.crif_score,
          null
        ),
        gst: loanData?.gst_amount,
        installment: loanData?.installment_amount,
        disbursal_amount: loanData?.disbursed_amount,
        repayment_amount: loanData?.total_repayment,
        tenure_type: loanData?.tenure_type,
        tenure_value: loanData?.tenure_value,
        payment_basis: loanData?.payment_basis,
        no_of_installments: loanData?.no_installments,
        interest_rate: loanData?.annual_interest_rate,
        interest_collected: loanData?.interest_collection_type,
        pf_collected: loanData?.processing_fee_mode,
        other_charges: loanData?.other_charges,
        subvention_amount:loanData?.subvention_amount,
        hold_back_amount:loanData?.hold_back_amount,
        utr:loanData?.utr,
        principal_amount:loanData?.principal_amount,
        
        // Bank details
        bank_id: getValue(bank_details?.bank_id, null),
        account_number: getValue(bank_details?.account_number, null),
        ifsc_code: getValue(bank_details?.ifsc_code, null),
        bank_name: getValue(bank_details?.bank_name, null),
        account_type: getValue(bank_details?.account_type, null),
        benificiary_name: getValue(
          bank_details?.penny_drop_data?.beneficiary_name_with_bank,
          null
        ),

        // co-applicant details
        coApplicantExist: coCustomerData ? true : false,
        co_app_pan_number: coCustomerData?.pan_details?.number,
        co_app_pan_type: coCustomerData?.pan_details?.pan_type,
        co_app_dob: coCustomerData?.dob,
        co_app_type: coCustomerData?.customer_type,
        co_app_relation_borrower: coCustomerData?.relation_with_borrower,
        co_app_customer_name: coCustomerData?.pan_details?.name,
        co_app_mobile_number: coCustomerData?.mobile_number,
        co_app_email: coCustomerData?.email_id,
        co_app_gender: coCustomerData?.gender,
        // co_app_address: coCustomerData?.residential_address?.address,
        co_app_city: coCustomerData?.residential_address?.city,
        co_app_district: coCustomerData?.residential_address?.district,
        co_app_state: coCustomerData?.residential_address?.state,
        co_app_pincode: coCustomerData?.residential_address?.pincode,
        co_app_income: coCustomerData?.income,
        co_app_education: coCustomerData?.education,
        co_app_current_residential_owned:
          coCustomerData?.residential_address?.property_owned,
        co_app_current_residential_address:
          coCustomerData?.residential_address?.address,
        co_app_aadhaar_name: coCustomerData?.aadhaar_details?.name,
        co_app_aadhaar_number: coCustomerData?.aadhaar_details?.id_number,
        co_app_aadhaar_gender: coCustomerData?.aadhaar_details?.gender,
        co_app_aadhaar_address: coCustomerData?.aadhaar_details?.address,
        co_app_aadhaar_name: coCustomerData?.aadhaar_details?.name,
        co_app_crif_score: getValue(
          coCustomerData?.credit_pull?.credit_data?.crif_score,
          null
        ),

        // Co Credit Data

        co_credit_eligible: coCustomerData?.credit_engine?.eligible,
        co_credit_isCocustomer: coCustomerData?.credit_engine?.isCoAppReq,
        co_credit_response: coCustomerData?.credit_engine?.message,

        // Vehicle Details

        vehicle_model: loanData?.other_details?.vehicle_model,
        vehicle_price_onroad: loanData?.other_details?.vehicle_price_on_road,
        vehicle_price_ex: loanData?.other_details?.vehicle_price_ex_showroom,

        current_stage_data : loanData?.current_stage_and_status
      }));

      //   getCurrentStatus(loanData)
    } catch (err) {
      console.log(err);
      return false;
    }
    if (setLoading) setLoading(false);
  };

  const getCurrentStatus = (loanData) => {
    let status;

    if (loanData?.embifi_approval_details?.status) {
      if (loanData?.is_disbursed) {
        if (loanData?.is_closed) {
          status = "closed";
        } else {
          status = "disbursed";
        }
      } else {
        status = "approved";
      }
    } else if (loanData?.embifi_approval_details?.status === null) {
      status = "pending";
    } else {
      status = "rejected";
    }

    return status;
  };

  const getNbfc = (id) => {
    switch (id) {
      case "NY00002":
        return "NY Leasing";
        break;
      case "VA00001":
        return "Vani Commercials";
        break;
      case "PL00003":
        return "Prestloans";
        break;
    }
  };

  return {
    getApplicationDetails,
    getNbfc,
  };
}

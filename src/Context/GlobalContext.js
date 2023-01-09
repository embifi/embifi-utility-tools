import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import {
  getAnchor,
  getAnchors,
  getBanks,
  getCustomers,
  getFetchPan,
  createApplication,
} from "../api";

export const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [schedules, setSchedules] = useState({
    status: false,
    emi: [],
    edi: [],
  });

  // useEffect(() => {
  //   if (schedules?.status) {
  //     console.log(schedules);
  //   }
  // }, [schedules]);

  let updateInitialState = {
    application_id: "",
    applicant_name: "",
    customer_id: "",
    nbfc_id: "",
    pan_number: "",
    pan_type: "",
    customer_name: "",
    dob: "",
    mobile_number: "",
    email: "",
    gender: "",

    residential_address: "",
    residential_address_pincode: "",
    residential_address_city: "",
    residential_address_state: "",
    is_property_owned: "",

    aadhaar_address: "",
    aadhaar_name: "",

    income: "",
    education: "",

    // Loan Details

    start_date: null,
    anchor_id: "",
    disbursal_date: null,
    nbfc_loan_id: "",
    oem_id: null,
    loan_type: "",
    product_type: "",
    loan_amount: "",
    interest: "",
    processing_fee: "",
    processing_rate: "",
    crif_score: "",
    gst: "",
    installment: "",
    disbursal_amount: "",
    repayment_amount: "",
    tenure_type: "",
    tenure_value: "",
    payment_basis: "",
    no_of_installments: "",
    interest_rate: "",

    application_status: "",
    current_status: "",
    rejected_reason: "",

    // Bank details
    bank_id: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    account_type: "",
    benificiary_name: "",

    // co-applicant details
    coApplicantExist: false,
    co_app_pan_number: "",
    co_app_pan_type: "",
    co_app_dob: "",
    co_app_relation_borrower: "",
    co_app_customer_name: "",
    co_app_mobile_number: "",
    co_app_email: "",
    co_app_gender: "",
    co_app_address: "",
    co_app_city: "",
    co_app_state: "",
    co_app_pincode: "",
    co_app_income: "",
    co_app_education: "",
    co_app_current_residential_owned: "",
    co_app_crif_score: "",
    co_app_type: "",
    co_app_aadhaar_name: "",
    co_app_aadhaar_address: "",

    // /////////////////////////////////
  };

  const [applicationDetails, setApplicationDetails] = useState({
    application_id: "",
    is_existing: false,
    origin: "internal",
    customer_id: "",
    nbfc_id: "",
    nbfc_name: "",
    pan_number: "",
    pan_type: "",
    customer_name: "",
    is_corporate: false,
    email: "",
    gender: "",
    onboarding_date: "",
    mobile_number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    income: "",
    education: "",
    is_aadhaar_property_owned: false,
    dob: "",

    // Loan Details
    anchor_id: "",
    is_disbursed: false,
    disbursal_date: "",
    start_date: "",
    nbfc_loan_id: "",
    oem_id: "",
    loan_type: "",
    product_type: "",
    loan_amount: "",
    interest: "",
    processing_fee: "",
    is_property_owned: true,
    gst: "",
    crif_score: "",
    installment: "",
    disbursal_amount: "",
    repayment_amount: "",
    tenure_type: "",
    tenure_value: "",
    payment_basis: "",
    no_of_installments: "",
    interest_rate: "",

    // Bank details
    add_new: true,
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    account_type: "",
    benificiary_name: "",
    bank_id: "",

    // co applicant
    // co_app_is_existing: false,
    coApplicantExist: false,
    co_app_origin: "internal",
    co_app_customer_id: "",
    co_app_pan_number: "",
    co_app_pan_type: "",
    co_app_dob: "",
    co_app_relation_borrower: "",
    co_app_customer_name: "",
    co_app_mobile_number: "",
    co_app_email: "",
    co_app_gender: "",
    co_app_onboarding_date: "",
    co_app_address: "",
    co_app_city: "",
    co_app_state: "",
    co_app_pincode: "",
    co_app_income: "",
    co_app_education: "",
    co_app_current_residential_address: "",
    co_app_current_residential_owned: false,
    co_app_crif_score: "",
    co_app_secondary_app_type: "",
  });

  const [anchorDetails, setAnchorDetails] = useState({
    // Basic Details
    anchor_role: "",
    anchor_name: "",
    email: "",
    anchor_gstin: "",
    processing_fees_type: "",
    processing_fees: "",
    interest_rate_type: "",
    interest_rate: "",
    penalty_fees_type: "",
    penalty_fees: "",
    penalty_rate_type: "",
    penalty_rate: "",
    manager_name: "",
    manager_mail_id: "",
    manager_mobile_number: "",

    // Bank details
    account_number: "",
    ifsc_code: "",
    beneficiary_name: "",
    bank_name: "",
    account_type: "",

    // Contact details
    mobile: [],
    address: [],

    email_type: false,
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [oemDetails, setOemDetails] = useState({
    // Basic Details
    brand_name: "",
    company_name: "",
    email: "",
    website_link: "",
    firm_type: "",
    gstin: "",
    addresses: [],

    // Documents
    gstin_certificate: "",
    icat_certificate: "",
    financial_statement: "",
    brand_logo_picture: "",
    bank_statement: "",
    cheque: "",
    another_document: [],

    // Contact
    contact: [],

    // processing_fees_type: "",
    // processing_fees: "",
    // interest_rate_type: "",
    // interest_rate: "",
    // penalty_fees_type: "",
    // penalty_fees: "",
    // penalty_rate_type: "",
    // penalty_rate: "",
    // manager_name: "",
    // manager_mail_id: "",
    // manager_mobile_number: "",

    // // Bank details
    // account_number: "",
    // ifsc_code: "",
    // beneficiary_name: "",
    // bank_name: "",
    // account_type: "",

    // // Contact details
    // mobile: [],
    // address: [],

    // email_type: false,
  });

  const [updateDetails, setUpdateDetails] = useState(updateInitialState);

  const [customersList, setList] = useState([]);
  const [anchorList, setAnchorList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [panData, setPanData] = useState({});

  const fetchCustomer = async (nbfc) => {
    try {
      let { data } = await getCustomers(nbfc);
      setList(data?.customers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnchors = async (nbfc) => {
    try {
      let { data } = await getAnchors(nbfc);
      console.log(data);
      setAnchorList(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBanks = async (customer_id) => {
    try {
      let { data } = await getBanks(customer_id);
      setBankList(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPanData = async (pan, nbfc_id) => {
    try {
      let { data } = await getFetchPan(pan, nbfc_id);
      console.log(data);
      setPanData({
        isExist: data?.customer?.isExist,
        name: !data?.customer?.is_corporate
          ? data?.customer?.pan_details?.name
          : data?.customer?.corporate_pan_details?.name,
        customer_id: data?.customer?.customer_id,
      });
    } catch (error) {
      setPanData({ status: false });
    }
  };

  const clearState = () => {
    setApplicationDetails({
      ...applicationDetails,
      is_existing: false,
      origin: "internal",
      customer_id: "",
      pan_number: "",
      pan_type: "",
      customer_name: "",
      is_corporate: false,
      mobile_number: "",
      dob: "",
      email: "",
      gender: "",
      onboarding_date: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      income: "",
      education: "",

      // Loan Details
      start_date: "",
      anchor_id: "",
      disbursal_date: "",
      nbfc_loan_id: "",
      oem_id: "",
      loan_type: "",
      product_type: "",
      loan_amount: "",
      interest: "",
      processing_fee: "",
      is_property_owned: true,
      crif_score: "",
      gst: "",
      installment: "",
      disbursal_amount: "",
      repayment_amount: "",
      tenure_type: "",
      tenure_value: "",
      payment_basis: "",
      no_of_installments: "",
      interest_rate: "",

      // Bank details
      add_new: true,
      account_number: "",
      ifsc_code: "",
      bank_name: "",
      account_type: "",
      benificiary_name: "",
      bank_id: "",

      // co-applicant details
      coApplicantExist: false,
      co_app_origin: "internal",
      co_app_customer_id: "",
      co_app_pan_number: "",
      co_app_pan_type: "",
      co_app_dob: "",
      co_app_relation_borrower: "",
      co_app_customer_name: "",
      co_app_mobile_number: "",
      co_app_email: "",
      co_app_gender: "",
      co_app_onboarding_date: "",
      co_app_address: "",
      co_app_city: "",
      co_app_state: "",
      co_app_pincode: "",
      co_app_income: "",
      co_app_education: "",
      co_app_current_residential_address: "",
      co_app_current_residential_owned: false,
      co_app_crif_score: "",
      co_app_type: "",
    });

    setPanData({});
  };

  const clearUpdateState = () => {
    setUpdateDetails(updateInitialState);
  };

  useEffect(() => {
    if (applicationDetails?.nbfc_id !== "") {
      clearState();
      fetchCustomer(applicationDetails?.nbfc_id);
      fetchAnchors(applicationDetails?.nbfc_id);
    }
  }, [applicationDetails?.nbfc_id]);

  useEffect(() => {
    if (updateDetails?.nbfc_id !== "") {
      fetchAnchors(updateDetails?.nbfc_id);
    }
  }, [updateDetails?.nbfc_id]);

  useEffect(() => {
    if (applicationDetails?.customer_id) {
      fetchBanks(applicationDetails?.customer_id);
    }
  }, [applicationDetails?.customer_id]);

  useEffect(() => {
    if (
      !applicationDetails?.is_existing &&
      applicationDetails?.pan_number?.length === 10
    ) {
      fetchPanData(applicationDetails?.pan_number, applicationDetails?.nbfc_id);
    }
  }, [applicationDetails?.pan_number]);

  useEffect(() => {
    if (!panData?.isExist) {
      setApplicationDetails({
        ...applicationDetails,
        customer_name: panData?.name,
      });
    }
  }, [panData]);

  return (
    <GlobalContext.Provider
      value={{
        scheduleState: [schedules, setSchedules],
        applicationState: [applicationDetails, setApplicationDetails],
        anchorState: [anchorDetails, setAnchorDetails],
        oemState: [oemDetails, setOemDetails],
        emailState: [isEmailVerified, setIsEmailVerified],
        updateDetailState: [updateDetails, setUpdateDetails],
        customersList,
        anchorList,
        bankList,
        panData,
        clearUpdateState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

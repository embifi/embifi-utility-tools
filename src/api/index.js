import axios from "axios";
// export const baseURL = `https://prod.api.lms.embifi.in/api/v1/`;
export const baseURL = `https://api.lms.embifi.in/api/v1/`;

const API = axios.create({ baseURL, withCredentials: true });
API.interceptors.request.use(
  (config) => {
    config.headers["application"] = "EMBEDDED-TOOLS";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// export const createUser = (payload: any) => { return postData({ completeUrl: ApiEndpoints.UPDATE_PASSWORD_USER, payload }) }

export const createUser = (payload) =>
  API.post(`/common/create-user`, payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
export const createAgent = (payload) => API.post(``, payload);
export const createAnchor = (payload) =>
  API.post(`/common/create-anchor`, payload);
export const createOem = (payload) =>{ 
  
  API.post(`/lms/user/login`, payload)};

export const login = (payload) => API.post(`/lms/user/login`, payload);
export const logout = () => API.post(`/lms/user/logout`);
export const verifyAuth = () => API.get(`/lms/user/verify-user`);

export const getCustomers = (nbfc) => API.get(`/common/customers/${nbfc}`);
export const getAnchors = (nbfc) => API.get(`/common/anchors/${nbfc}`);
export const getBanks = (nbfc) => API.get(`/common/banks/${nbfc}`);
export const getFetchPan = (pan_number, nbfc_id) =>
  API.post(`/common/checkPanAndNbfc`, { nbfc_id, pan_number });
export const createApplication = (data) =>
  API.post(`/common/createLoanApplication`, data);

export const fetchAllApplications = () => API.get(`/common/get-loans`);
export const fetchApplicationDetails = (id) => API.get(`/common/loan/${id}`);
export const updateApplication = (payload, id) =>
  API.put(`/common/loan/${id}`, payload);
export const findCocustomer = (id) =>
  API.get(`/common/co-customer-exist/${id}`);
export const fetchDocuments = (id) => API.get(`/common/getAllDocuments/${id}`);
export const deleteDocument = (payload) =>
  API.delete(`/common/delete-doc`, { data: payload });

export const fetchCollections = () => API.get(`/common/get-loans`);
export const fetchCollectionData = (id) =>
  API.get(`/collection/${id}/loan-details`);
export const updateCollection = (payload, id) =>
  API.put(`/collection/${id}/update-schedule`, payload);

export const getFile = (key) => API.get(`/common/view?key=${key}`);
export const uploadDocuments = (payload, setProgress) =>
  API.put(`/common/upload-docs`, payload, {
    onUploadProgress: (data) => {
      setProgress(Math.round((100 * data.loaded) / data.total));
    },
  });

export const updateStage = (payload, id) =>
  API.put(`/common/update-stage/${id}`, payload);

// export const getAllAnchors = () => API.get(`/common/get-anchors`);
export const getAllAnchors = () => API.get(`/common/get-all-data-anchors`);
export const updateAnchorData = (id, payload) =>
  API.put(`/common/update-anchor/${id}`, payload);

export const aadhaarOcr = (payload) =>
  axios.post(
    "https://api.common-wrapper.embifi.in/v1/kyc/aadhaar-parser",
    payload
  );
export const validateCrifB2C = (payload) =>
  axios.post(
    "https://api.engine.embifi.in/engine/v1/crif-b2c-validation",
    payload
  );
//

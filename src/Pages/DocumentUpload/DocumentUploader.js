import React from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

// import "./Scheduler.css";
import { useState } from "react";
import { useEffect } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DragDrop from "../../Components/DocumentUploader";
import "./DocumentUploader.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { setDocumentsArray, documentList } from "../../utility/documentList";
import {
  fetchAllApplications,
  findCocustomer,
  uploadDocuments,
} from "../../api";
import { ProgressBar } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import uploadIco from "../../assets/upload.jpg";
import uploadAnimation from "../../assets/cloud-upload.gif";

const DocumentUploader = () => {
  // const [values, setValues] = useState({
  //   loanAmt: "100000",
  //   interest: "18",
  //   tenure: "12",
  //   tenureType: "month",
  //   date: "10/07/2022",
  // });

  const navigate = useNavigate();
  const { app_id } = useParams();

  const [documentsList, setDocList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [application_id, setApplicationId] = useState(app_id || "");
  const [progress, setProgress] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isCocustomer, setCocustomer] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (isValid()) {
      let result = documents.reduce(function (r, a) {
        r[a.name] = r[a.name] || [];
        r[a.name].push({
          name: a?.name,
          file: a?.file,
          collection: documentList[a.name]?.collection,
          category: documentList[a.name]?.category,
        });
        return r;
      }, Object.create(null));

      // console.log(result);

      let payload = {
        application_id,
        document_included_g:true,
        documents: result,
      };

      try {
        let { data } = await uploadDocuments(payload, setProgress);
        if (data?.status) {
          toast.success(data?.message);
          navigate(`/view-documents/${application_id}`);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }

      // console.log(payload);
    } else {
      toast.error("Empty Document Found");
    }
    setProgress(0);
    setLoading(false);
  };

  const fetchCoCustomer = async () => {
    try {
      let { data } = await findCocustomer(application_id);
      // console.log(data);
      if (data?.status) {
        setCocustomer(data?.coCustomerExist);
      }
    } catch (error) {
      setCocustomer(false);
      console.log("Fetch Cocustomer Error");
    }
  };

  const isValid = () => {
    let valid = true;
    if (documents.length === 0) return false;
    documents.map((val) => {
      if (
        val?.name === null ||
        val?.name === "" ||
        val?.file === "" ||
        val?.file === null
      ) {
        valid = false;
      }
    });
    return valid;
  };

  const getApplications = async () => {
    let { data } = await fetchAllApplications();
    let list = data?.data?.map((val) => {
      return {
        application_id: val?.application_id,
        name: !val?.customerData?.is_corporate
          ? val?.customerData?.pan_details?.name
          : val?.customerData?.corporate_pan_details?.name,
      };
    });
    setApplications(list);
  };

  useEffect(() => {
    console.log(documents);
  }, [documents]);

  useEffect(() => {
    if (!app_id) {
      getApplications();
    }
  }, []);

  useEffect(() => {
    setCocustomer(false);
    if (application_id !== "") {
      fetchCoCustomer();
    }
  }, [application_id]);

  useEffect(() => {
    setDocList(setDocumentsArray(isCocustomer));
  }, [isCocustomer]);

  return (
    <>
      <p className="go-back-btn-fixed" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <div className="wrapper-center">
        <div className="calculate-form max-height-document bg-white">
          <Grid item xs={12} sm={12}>
            {!app_id ? (
              <Autocomplete
                options={applications}
                getOptionLabel={(option) =>
                  `${option?.name} - ${option?.application_id}`
                }
                id="ApplicationId"
                clearOnBlur
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Application Id"
                    variant="standard"
                  />
                )}
                onChange={(event, value) => {
                  setApplicationId(value?.application_id || "");
                }}
              />
            ) : (
              <div>
                <p className="mb-0">
                  <span style={{ color: "gray" }}>Application ID : </span>
                  {application_id}
                  <CloseIcon
                    className="ms-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/upload-documents");
                      setApplicationId("");
                      getApplications();
                    }}
                  />
                </p>
              </div>
            )}
            {application_id !== "" && !isCocustomer && (
              <span
                style={{
                  fontSize: "11px",
                  color: "#adacaa",
                }}
              >
                Note there is no co-applicant/guarantor for this application
              </span>
            )}
          </Grid>

          {application_id !== "" && !isLoading && (
            <Grid item xs={12} sm={12} className={"document-wrapper mt-4"}>
              {documents?.map((doc, i) => {
                return (
                  <Grid item xs={12} sm={6} style={{ marginBottom: "10px" }}>
                    <div className="d-flex">
                      <FormControl
                        variant="standard"
                        sx={{ width: "70%", marginBottom: "20px" }}
                      >
                        {/* <InputLabel id="demo-simple-select-standard-label">
                        Document type
                      </InputLabel> */}
                        {/* <Select
                        className="me-4"
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={documents[i].name}
                        onChange={(e) => {
                          documents[i].name = e.target.value;
                          setDocuments([...documents]);
                        }}
                        label="Age"
                      >
                        {documentsList?.map((val) => {
                          return (
                            <MenuItem value={val}>
                              {val?.replaceAll("_", " ")?.toUpperCase()}
                            </MenuItem>
                          );
                        })}
                      </Select> */}

                        <Autocomplete
                          sx={{ width: "95%" }}
                          options={documentsList}
                          getOptionLabel={(option) => option?.replaceAll("_"," ")?.toUpperCase()}
                          id="DocumentType"
                          clearOnBlur
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Document type"
                              variant="standard"
                            />
                          )}
                          onChange={(event, value) => {
                            documents[i].name = value;
                            setDocuments([...documents]);
                          }}
                        />
                      </FormControl>

                      {documents[i].file === "" ||
                      documents[i].file === null ? (
                        <DragDrop
                          setFile={(val, name) => {
                            documents[i].file = val;
                            documents[i].file_name = name;
                            setDocuments([...documents]);
                          }}
                        />
                      ) : (
                        <>
                          <div className="mt-2" style={{ width: "300px" }}>
                            <span>
                              <InsertDriveFileIcon />{" "}
                              {documents[i].file_name?.slice(0, 20)}
                            </span>{" "}
                          </div>

                          <div
                            className="mt-2"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              window.open(documents[i].file);
                            }}
                          >
                            <RemoveRedEyeIcon />
                          </div>
                        </>
                      )}

                      <div
                        className="mt-2 ms-2"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          let index = documents.indexOf(doc);
                          let newArray = documents.filter((val, docIndex) => {
                            if (docIndex !== index) {
                              // console.log("reached" + docIndex);
                              return doc;
                            }
                          });

                          setDocuments(newArray);
                        }}
                      >
                        <DeleteOutlineIcon sx={{color:"#cc2323"}}/>
                      </div>
                    </div>
                  </Grid>
                );
              })}

              <Button
                onClick={() => {
                  setDocuments([
                    ...documents,
                    {
                      name: "",
                      file: "",
                    },
                  ]);
                }}
                disabled={
                  documents.length > 0 && documents.slice(-1)[0].file === ""
                }
              >
                {documents.length > 0 ? (
                  <span>
                    <AddIcon />
                    Add more
                  </span>
                ) : (
                  <span>
                    <AddIcon />
                    Add document
                  </span>
                )}
              </Button>
            </Grid>
          )}

          {application_id === "" && !isLoading && (
            <div className="mt-4">
              <p className="text-center">
                <img src={uploadIco} alt="upload" width={200} />
              </p>
              <p
                className="text-center mb-2"
                style={{ color: "purple", fontSize: 20 }}
              >
                Document Uploader
              </p>
              <p
                className="text-center mb-5"
                style={{ color: "gray", fontSize: 12 }}
              >
                Select an application ID
              </p>
            </div>
          )}

          {isLoading && (
            <div>
              <p className="text-center">
                <img
                  className="mt-5"
                  src={uploadAnimation}
                  width={200}
                  alt="uploading..."
                />
              </p>
            </div>
          )}

          {!isLoading ? (
            <>
              {application_id !== "" && (
                <Button
                  // variant="contained"
                  className={"mt-3"}
                  onClick={() => {
                    navigate(`/view-documents/${application_id}`);
                  }}
                  style={{
                    color: "purple",
                  }}
                >
                  <FolderOpenIcon className="me-2 mb-1" /> Uploaded Documents
                </Button>
              )}
              {application_id !== "" && (
                <Button
                  variant="contained"
                  className={"mt-3 calculate-btn"}
                  disabled={application_id === ""}
                  onClick={handleSubmit}
                >
                  Upload Documents
                </Button>
              )}
            </>
          ) : (
            <ProgressBar
              className="mt-4"
              striped
              variant="success"
              label={`${progress.toFixed(2)}%`}
              now={progress}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentUploader;

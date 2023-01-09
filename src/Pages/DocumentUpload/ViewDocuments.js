import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
  Typography,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setDocumentsArray, documentList } from "../../utility/documentList";
import {
  baseURL,
  deleteDocument,
  fetchAllApplications,
  fetchDocuments,
  findCocustomer,
  uploadDocuments,
} from "../../api";
import { ProgressBar } from "react-bootstrap";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LoadingOver from "../../Components/Loading";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import axios from "axios";
import { saveAs } from "file-saver";

import pdfIco from "../../assets/pdf.png";
import pngIco from "../../assets/png.png";
import jpgIco from "../../assets/jpg.png";

const AllDocumentsInital = {
  customer: [],
  co_customer: [],
  field_investigation: [],
  pre_disbursement: [],
  post_disbursement: [],
  other_documents: [],
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewDocuments = () => {
  // const [values, setValues] = useState({
  //   loanAmt: "100000",
  //   interest: "18",
  //   tenure: "12",
  //   tenureType: "month",
  //   date: "10/07/2022",
  // });

  const navigate = useNavigate();
  const { app_id } = useParams();

  const [documents, setDocuments] = useState(["", "", ""]);
  const [AllDocuments, setAllDocuments] = useState(AllDocumentsInital);
  const [applications, setApplications] = useState([]);
  const [application_id, setApplicationId] = useState(app_id || "");
  const [isLoading, setLoading] = useState(false);
  const [isCocustomer, setCocustomer] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

  const getAllDocuments = async () => {
    setLoading(true);
    try {
      let { data } = await fetchDocuments(application_id);
      if (data?.status) {
        let docList = {
          customer: [],
          co_customer: [],
          field_investigation: [],
          pre_disbursement: [],
          post_disbursement: [],
          other_documents: [],
        };

        let docs = data?.data;
        for (let key in docs) {
          if (docs[key]?.category === "customer") {
            docList.customer.push(docs[key]);
          } else if (
            docs[key]?.category === "co-customer" ||
            docs[key]?.category === "co_customer"
          ) {
            docList.co_customer.push(docs[key]);
          } else if (
            docs[key]?.category === "pre_disbursement" ||
            docs[key]?.category === "pre-disbursement"
          ) {
            docList.pre_disbursement.push(docs[key]);
          } else if (
            docs[key]?.category === "post_disbursement" ||
            docs[key]?.category === "post-disbursement"
          ) {
            docList.post_disbursement.push(docs[key]);
          } else if (
            docs[key]?.category === "field_investigation" ||
            docs[key]?.category === "field-investigation"
          ) {
            docList.field_investigation.push(docs[key]);
          } else {
            docList.other_documents.push(docs[key]);
          }
        }
        setAllDocuments(docList);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (!app_id) {
      getApplications();
    }
  }, []);

  // useEffect(()=>{
  //   console.log(AllDocuments);
  // },[AllDocuments])

  useEffect(() => {
    setCocustomer(false);
    if (application_id !== "") {
      fetchCoCustomer();
      getAllDocuments();
    }
  }, [application_id]);

  const docCount = (count) => {
    return (
      <span
        style={{
          backgroundColor: count > 0 ? "green" : "#bab9b6",
          color: "white",
          padding: "2px 10px",
          fontSize: "12px",
          borderRadius: "30px",
        }}
      >
        {count}
      </span>
    );
  };

  function capitalizeFirstLetter(string) {
    if (string?.length > 0) {
      if (["form_22", "form_21", "form_20"].includes(string?.substring(0, 7))) {
        let key = string?.substring(0, 7);
        return (
          (key?.charAt(0)?.toUpperCase() + key?.slice(1))?.replaceAll(
            "_",
            " "
          ) + `(${string?.substring(7)})`
        );
      }
      return (string?.charAt(0)?.toUpperCase() + string?.slice(1))?.replaceAll(
        "_",
        " "
      );
    }
  }

  const [isDownloading, setIsDownloading] = useState(null);
  const [openElem, setOpenElem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenu = (elem) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenElem(elem);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenElem(null);
  };

  const documentCard = (doc) => {
    return doc.length > 0 ? (
      doc?.map((val, i) => {
        return (
          <>
            <Grid
              item
              xs={3}
              style={{ cursor: "pointer" }}
              onClick={handleClickMenu(val)}
            >
              <p className="text-center">
                <img
                  src={(() => {
                    if (["jpeg", "jpg", "JPG", "JPEG"]?.includes(val?.dataType))
                      return jpgIco;
                    if (["png", "PNG"]?.includes(val?.dataType)) return pngIco;
                    if (["pdf", "PDF"]?.includes(val?.dataType)) return pdfIco;
                  })()}
                  width={50}
                />
              </p>
              <p className="text-center" style={{ fontSize: "13px" }}>
                {capitalizeFirstLetter(val?.name)}
              </p>
            </Grid>
            <Menu
              id={"menu" + val?.name}
              anchorEl={anchorEl}
              open={openElem === val}
              disableAutoFocusItem
              PaperProps={{
                style: {
                  left: "50%",
                  transform: "translateX(77%) translateY(-50%)",
                },
              }}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  window.open(
                    `${baseURL}common/view?key=${val?.key}`,
                    "_blank"
                  );
                }}
              >
                Open
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDownload(
                    `${baseURL}common/view?key=${val?.key}`,
                    `${application_id}-${val?.name}.${val?.dataType}`,
                    val
                  );
                }}
              >
                {isDownloading === val ? (
                  <span>
                    <CircularProgress
                      color="success"
                      size={15}
                      className="mt-2 me-2"
                    />
                    Downloading{" "}
                  </span>
                ) : (
                  "Download"
                )}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedDoc({ ...val, array: doc, index: i });
                  handleClickOpen();
                  handleCloseMenu();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        );
      })
    ) : (
      <div className="w-100">
        <p className="text-center mb-0" style={{ color: "#a7a8a7" }}>
          <DoNotDisturbAltIcon className="me-1 mb-1" /> No documents
        </p>
      </div>
    );
  };

  const handleDelete = async () => {
    handleClose();
    let fieldName;

    if (
      ["form_22", "form_21", "form_20"].includes(
        selectedDoc?.name?.substring(0, 7)
      )
    ) {
      fieldName = selectedDoc?.name?.substring(0, 7)?.trim();
    } else {
      fieldName = selectedDoc?.name
        ?.replaceAll(/[0-9]/g, "")
        ?.replaceAll("_", " ")
        ?.trim()
        ?.replaceAll(" ", "_");
    }

    let payload = {
      applicationId: application_id,
      fieldName,
      fileLink: selectedDoc?.fileLink,
      collection: selectedDoc?.collection,
    };

    // console.log(payload);
    try {
      toast.loading("Deleting");
      let { data } = await deleteDocument(payload);
      selectedDoc?.array?.splice(selectedDoc?.index, 1);
      setSelectedDoc({});
      toast.dismiss();
      toast.success("Deleted successfully");
    } catch (error) {}
  };

  const handleDownload = (url, fileName, elem = null) => {
    setIsDownloading(elem);
    fetch(url, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        application: "EMBEDDED-TOOLS",
      },
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement("a");
        aElement.setAttribute("download", fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        // aElement.setAttribute('href', href);
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
        setIsDownloading(null);
        handleCloseMenu();
      });
  };

  const zip = new JSZip();

  // Download as Zip

  const download = (item) => {
    return axios
      .get(`${baseURL}common/view?key=${item?.key}`, {
        responseType: "blob",
        headers: { application: "EMBEDDED-TOOLS" },
        withCredentials: true,
      })
      .then((resp) => {
        zip.file(`${item?.name}.${item?.dataType}`, resp.data);
      })
      .catch((err) => {
        toast.warn(`Error with file ${item?.name}, will be skipped`);
      });
  };

  const downloadAll = (documents, filename) => {
    setLoading(true);
    const arrOfFiles = documents.map((item) => download(item)); //create array of promises
    Promise.all(arrOfFiles)
      .then(() => {
        zip.generateAsync({ type: "blob" }).then(function (blob) {
          saveAs(blob, `${filename}.zip`);
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <p className="go-back-btn-fixed" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <div className="wrapper-center">
        <div className="calculate-form max-height-document">
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
                      navigate("/view-documents");
                      setApplicationId("");
                      setAllDocuments(AllDocumentsInital);
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

          {application_id !== "" && (
            <Grid item xs={12} sm={12} className={"document-wrapper mt-2"}>
              <p className="text-end">
                <div
                  className="doc-btns mb-3 ms-0"
                  style={{ justifyContent: "left" }}
                  onClick={async () => {
                    let combined = (() => {
                      let docs = [];
                      for (let key in AllDocuments) {
                        docs = [...docs, ...AllDocuments[key]];
                      }
                      return docs;
                    })();

                    downloadAll(combined, `${application_id}`);
                  }}
                >
                  <DownloadIcon /> Download all
                </div>
              </p>
              <div>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Customer {docCount(AllDocuments?.customer?.length)}
                    </Typography>
                    {/* <span
                      onClick={() => {
                        downloadAll(AllDocuments?.customer);
                      }}
                    >
                      Download
                    </span> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} className="mb-3">
                      {documentCard(AllDocuments?.customer)}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {isCocustomer && (
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Co-customer{" "}
                        {docCount(AllDocuments?.co_customer?.length)}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2} className="mb-3">
                        {documentCard(AllDocuments?.co_customer)}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Field Investigation{" "}
                      {docCount(AllDocuments?.field_investigation?.length)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} className="mb-3">
                      {documentCard(AllDocuments?.field_investigation)}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Pre-disbursement{" "}
                      {docCount(AllDocuments?.pre_disbursement?.length)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} className="mb-3">
                      {documentCard(AllDocuments?.pre_disbursement)}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Post-disbursement{" "}
                      {docCount(AllDocuments?.post_disbursement?.length)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} className="mb-3">
                      {documentCard(AllDocuments?.post_disbursement)}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel6"}
                  onChange={handleChange("panel6")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Other Documents{" "}
                      {docCount(AllDocuments?.other_documents?.length)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} className="mb-3">
                      {documentCard(AllDocuments?.other_documents)}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Grid>
          )}

          <Button
            // variant="contained"
            className={"mt-3"}
            onClick={() => {
              navigate(`/upload-documents/${application_id}`);
            }}
          >
            <AddIcon /> Add Documents
          </Button>
        </div>
      </div>
      {isLoading && <LoadingOver />}

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirm Action"}</DialogTitle>
          <DialogContent>
            <p>
              You are about to delete the file{" "}
              <b>{capitalizeFirstLetter(selectedDoc?.name)}</b>. Are you sure to
              continue ?
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSelectedDoc({});
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button sx={{ color: "red" }} onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ViewDocuments;

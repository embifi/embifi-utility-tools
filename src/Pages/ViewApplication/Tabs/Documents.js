import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { baseURL, fetchDocuments } from "../../../api";
import { GlobalContext } from "../../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

import pdfIco from "../../../assets/pdf.png";
import pngIco from "../../../assets/png.png";
import jpgIco from "../../../assets/jpg.png";
import { toast } from "react-toastify";

import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import axios from "axios";
import { saveAs } from "file-saver";

const Documents = ({ AllDocuments, application_id, setLoading }) => {
  const [isCocustomer, setCocustomer] = useState(false);
  const { updateDetailState } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [updateDetails, setUpdateDetails] = updateDetailState;

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
      return (string?.charAt(0)?.toUpperCase() + string?.slice(1))?.replaceAll(
        "_",
        " "
      );
    }
  }

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
              xs={2}
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

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12}>
          <div style={{ float: "right", display: "flex" }}>
            <div
              className="doc-btns ms-0"
              style={{ justifyContent: "left" }}
              onClick={async () => {
                let combined = (() => {
                  let docs = [];
                  for (let key in AllDocuments) {
                    if (key !== "total_count") {
                      docs = [...docs, ...AllDocuments[key]];
                    }
                  }
                  return docs;
                })();

                downloadAll(combined, `${application_id}`);
              }}
            >
              <DownloadIcon /> Download all
            </div>

            <div
              className="doc-btns"
              onClick={() =>
                navigate(`/view-documents/${updateDetails?.application_id}`)
              }
            >
              <EditIcon sx={{ fontSize: "18px", mr: "5px" }} />
              Edit Documents
            </div>
            <div
              className="doc-btns"
              onClick={() =>
                navigate(`/upload-documents/${updateDetails?.application_id}`)
              }
            >
              <AddIcon sx={{ fontSize: "20px", mr: "5px" }} />
              Add Documents
            </div>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className={"mt-3"}>
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
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2} className="mb-3">
                      {documentCard(AllDocuments?.customer)}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {updateDetails?.coApplicantExist && (
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Documents;

const ListItemComp = ({ icon, heading, text }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon className="list-key">
        {
          <span>
            {icon && icon}
            {heading}
          </span>
        }
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontSize: "15px" }}
        className="list-value"
        primary={text}
      />
    </ListItem>
  );
};

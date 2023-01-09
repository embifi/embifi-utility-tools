import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Slide,
} from "@mui/material";
import { UserContext } from "../Context/UserContext";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./HomeScreen.css";
import DatePickerComponent from "../Components/DatePicker";
import { useState } from "react";
import useCalculate from "../utility/Calculate";
import { useContext, useEffect } from "react";
import ScheduleViewer from "./Scheduler/ScheduleViewer";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DateRangeIcon from "@mui/icons-material/DateRange";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import Navbar from "../Components/Navbar/Navbar";
import { backgroundColor } from "../Constants/colors";
import AddIco from "../assets/add.svg";
import EditIco from "../assets/edit.svg";
import documentIco from "../assets/documents.svg";
import aadhaarOcrIco from "../assets/aadhaar.svg";
import scheduleIco from "../assets/schedule.svg";
import parserIco from "../assets/parser.svg";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import RuleIcon from "@mui/icons-material/Rule";
import ListIcon from "@mui/icons-material/List";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const styles = {
  moreBtn: {
    float: "right",
    cursor: "pointer",
    color: "gray",
    "&:hover": {
      color: "red",
    },
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [admin, setAdmin] = useState(false);

  const [isLoading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    // console.log(user);
    if (user.name === "Admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  return (
    <>
      {/* <style>{backgroundColor}</style> */}
      <Navbar />
      <div className="wrapper-center-home">
        <div className="icon-holder">
          <p className="home-heading"> Quick Tools</p>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div
                className="home-card"
                onClick={() => {
                  navigate("/create-app");
                }}
              >
                <div>
                  <p className="text-center">
                    <img src={AddIco} className="button-ico" />
                  </p>
                  <p className="ico-tag">Create Application</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                className="home-card"
                // style={{opacity:0.3}}
                onClick={() => {
                  navigate("/update-stage");
                }}
              >
                <div>
                  <p className="text-center">
                    <img src={EditIco} className="button-ico" />
                  </p>
                  <p className="ico-tag mb-0">Edit Application</p>
                  {/* <p className="ico-tag mb-0">[updation]</p> */}
                </div>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div
                className="home-card"
                onClick={() => {
                  // window.open("https://www.parser.embifi.in/upload-docs");
                  navigate("/upload-documents");
                }}
              >
                <div>
                  <p className="text-center">
                    <img src={documentIco} className="button-ico" />
                  </p>
                  <p className="ico-tag">Upload Documents</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div
                className="home-card"
                onClick={() => {
                  navigate("/generate-schedule");
                }}
              >
                <div>
                  <p className="text-center">
                    <img src={scheduleIco} className="button-ico" />
                  </p>
                  <p className="ico-tag">Generate Schedule</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div
                className="home-card"
                onClick={() => {
                  navigate("/aadhaar-ocr");
                }}
              >
                <div>
                  <p className="text-center">
                    <img src={aadhaarOcrIco} className="button-ico" />
                  </p>
                  <p className="ico-tag">Aadhaar OCR</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={4}>
              <div
                className="home-card"
                onClick={() => {
                  navigate("/view-application");
                }}
              >
                <div>
                  <p className="text-center">
                    <img src={parserIco} className="button-ico" />
                  </p>
                  <p className={"ico-tag"}>View Application</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={styles?.moreBtn} onClick={handleClickOpen}>
                <ListIcon /> more tools
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <ScheduleViewer />

      <>
        <Drawer anchor={"right"} open={open} onClose={handleClose}>
          <div
            style={{
              width: "500px",
            }}
          >
            <p className="more-tools-heading">More Tools</p>
            <div
              className="more-list-item"
              onClick={() => {
                navigate("/update-collection");
              }}
            >
              <LocalAtmIcon className="me-2" /> Collection Update
            </div>

            <div
              className="more-list-item"
              onClick={() => {
                window.open("https://lendermissingdatadb.flutterflow.app/");
              }}
            >
              <PlagiarismIcon className="me-2" /> Missing Data
            </div>

            <div
              className="more-list-item"
              onClick={() => {
                navigate("/update-anchor");
              }}
            >
              <UpgradeIcon className="me-2" /> Update Anchor
            </div>

            <div
              className="more-list-item"
              onClick={() => {
                navigate("/b2c-validations");
              }}
            >
              <RuleIcon className="me-2" /> B2C Validations
            </div>

            <div
              className="more-list-item"
              onClick={() => {
                window.open("https://www.parser.embifi.in/parser");
              }}
            >
              <IntegrationInstructionsIcon className="me-2" /> Document Parser
            </div>

            {admin && (
              <Accordion className="accord-user">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ color: "gray" }}>
                    <AccountCircleIcon className="me-2" /> Create New Accounts
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    <ListItem
                      style={{ borderBottom: "1px solid lightgrey" }}
                      button
                      onClick={() => {
                        navigate("/create-user");
                      }}
                      key={1}
                    >
                      <Typography style={{ color: "grey" }}>
                        <AccountBoxIcon className="me-2" /> Create User
                      </Typography>
                    </ListItem>
                    <ListItem
                      style={{ borderBottom: "1px solid lightgrey" }}
                      button
                      onClick={() => {
                        navigate("/create-agent");
                      }}
                      key={2}
                    >
                      <Typography style={{ color: "grey" }}>
                        <PersonIcon className="me-2" /> Create Agent
                      </Typography>
                    </ListItem>
                    <ListItem
                      button
                      style={{ borderBottom: "1px solid lightgrey" }}
                      onClick={() => {
                        navigate("/create-anchor");
                      }}
                      key={3}
                    >
                      <Typography style={{ color: "grey" }}>
                        <AccountCircleIcon className="me-2" /> Create Anchor
                      </Typography>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        navigate("/create-oem");
                      }}
                      key={4}
                    >
                      <Typography style={{ color: "grey" }}>
                        <AccountCircleIcon className="me-2" /> Create Oem
                      </Typography>
                    </ListItem>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
          </div>
        </Drawer>
      </>
    </>
  );
};

export default HomeScreen;

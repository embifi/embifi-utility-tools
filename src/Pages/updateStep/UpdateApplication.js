import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomerDetails from "./CustomerDetails";
import LoanDetails from "./LoanDetails";
import BankDetails from "./BankDetails";
import CoApplicant from "./CoApplicant";
import { createApplication, updateApplication } from "../../api";
import { GlobalContext } from "../../Context/GlobalContext";
import { toast } from "react-toastify";
import useApplication from "../../hooks/useApplication";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { statusColors } from "../../Constants/colors";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import EditIco from "../../assets/edit.svg";

const steps = [
  "Customer Details",
  "Loan Details",
  "Bank Details",
  "Co-Applicants",
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getStepContent(step, setActiveStep) {
  switch (step) {
    case 0:
      return <CustomerDetails setActiveStep={setActiveStep} />;
    case 1:
      return <LoanDetails />;
    case 2:
      return <BankDetails />;
    case 3:
      return <CoApplicant />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function UpdateApplication() {
  const { updateDetailState, customersList, panData, clearUpdateState } =
    React.useContext(GlobalContext);

  const navigate = useNavigate();
  const { app_id } = useParams();
  const [updateDetails, setUpdateDetails] = updateDetailState;

  const [activeStep, setActiveStep] = React.useState(0);
  const [doneUpdate, setDoneUpdate] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    if (activeStep === 3) {
      // handleCreateApplication();
      handleClickOpen();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateApplication = async () => {
    // alert("huii");
    handleClose();
    setLoading(true);

    try {
      let payload = {
        ...updateDetails,
      };

      let { data } = await updateApplication(
        payload,
        updateDetails?.application_id
      );
      if (data?.status) {
        // setCreatedAppId(data?.application_id);
        // setActiveStep(activeStep + 1);
        toast.success("Updated");
        setDoneUpdate(true);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      toast.error("Some Error");
    }

    setLoading(false);
  };

  const { getApplicationDetails, getNbfc } = useApplication();

  React.useEffect(() => {
    return () => {
      setActiveStep(0);
      clearUpdateState();
      setDoneUpdate(false);
    };
  }, []);

  React.useEffect(() => {
    if (app_id) {
      setUpdateDetails({
        ...updateDetails,
        application_id: app_id,
      });
    }
  }, [app_id]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
        <p className="go-back-btn" onClick={() => navigate("/")}>
          <ArrowBackIcon /> Go back Home
        </p>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <div className="page-head">
            <img src={EditIco} width={"30px"} />
            <span style={{ marginLeft: "10px", color: "gray" }}>
              Edit Application
            </span>
          </div>

          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
          >
            {updateDetails?.application_id === "" ||
              (doneUpdate && (
                <Typography component="h1" variant="h4" align="center">
                  Update Application
                </Typography>
              ))}

            {updateDetails?.application_id !== "" && !doneUpdate && (
              <div className="application-details">
                <p>
                  <span className="head">Application ID:</span>{" "}
                  {updateDetails?.application_id}
                </p>
                <p>
                  <span className="head">Customer ID:</span>{" "}
                  {updateDetails?.customer_id}
                </p>
                <p className="mt-2">
                  <span className="head">Status:</span>{" "}
                  <span
                    style={{
                      color: statusColors?.[updateDetails?.current_status],
                      border: `1px solid ${
                        statusColors?.[updateDetails?.current_status]
                      }`,
                      padding: "2px 20px",
                      borderRadius: "10px",
                    }}
                  >
                    {updateDetails?.current_status?.toUpperCase()}
                  </span>
                </p>
                <div className="align-right">
                  <Button
                    className="w-100"
                    variant="outlined"
                    onClick={() => {
                      setActiveStep(0);
                      clearUpdateState();
                    }}
                  >
                    Select Another Application
                  </Button>

                  <p
                    className="mt-2 mb-0"
                    style={{ cursor: "pointer", color: "purple" }}
                    onClick={() => {
                      navigate(
                        `/view-documents/${updateDetails?.application_id}`
                      );
                    }}
                  >
                    <span>
                      <FolderOpenIcon className="me-2 mb-1" />
                      View Documents
                    </span>
                  </p>

                  <p className="mb-5 mt-1 ">
                    <span className="head">NBFC:</span>{" "}
                    <b>{getNbfc(updateDetails?.nbfc_id)}</b>
                  </p>
                </div>
              </div>
            )}
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, mt: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Application Updated Successfully.
                </Typography>
                <Typography variant="subtitle1">
                  Your Application ID : <b>{updateDetails?.application_id}</b>{" "}
                  updated Successfully.
                </Typography>
                <Button
                  className="mt-3 px-5"
                  variant="outlined"
                  onClick={() => {
                    clearUpdateState();
                    setDoneUpdate(false);
                    setActiveStep(0);
                  }}
                >
                  DONE
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="p-5">
                  {getStepContent(activeStep, setActiveStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    {updateDetails?.application_id !== "" && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                        disabled={isLoading}
                      >
                        {activeStep === steps.length - 1 ? (
                          isLoading ? (
                            <>Loading</>
                          ) : (
                            "Update Application"
                          )
                        ) : (
                          "Next"
                        )}
                      </Button>
                    )}
                  </Box>
                </div>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>

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
              You are about to edit the details of application :{" "}
              <b>{updateDetails?.application_id}</b>. Are you sure to continue ?
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateApplication}>Continue</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

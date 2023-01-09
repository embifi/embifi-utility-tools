import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomerDetails from "../CreateSteps/CustomerDetails";
import LoanDetails from "../CreateSteps/LoanDetails";
import BankDetails from "../CreateSteps/BankDetails";
import CoApplicant from "../CreateSteps/CoApplicant";
import { createApplication } from "../../api";
import { GlobalContext } from "../../Context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIco from "../../assets/add.svg";

const steps = [
  "Customer Details",
  "Loan Details",
  "Bank Details",
  "Co-Applicants",
];

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

export default function Checkout() {
  const { applicationState, customersList, panData } =
    React.useContext(GlobalContext);
  const [applicationDetails, setApplicationDetails] = applicationState;

  const [activeStep, setActiveStep] = React.useState(0);
  const [createdAppId, setCreatedAppId] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === 3) {
      handleCreateApplication();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateApplication = async () => {
    setLoading(true);

    try {
      let payload = {
        ...applicationDetails,
      };

      let { data } = await createApplication(payload);
      if (data?.status) {
        setCreatedAppId(data?.application_id);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      toast.error("Some Error");
    }

    setLoading(false);
  };

  return (
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
          <img src={AddIco} width={"30px"}/>
          <span style={{marginLeft:"10px", color:"gray"}}>Create Application</span>
        </div>

        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Application Created Successfully.
              </Typography>
              <Typography variant="subtitle1">
                Your Application ID : <b>{createdAppId}</b> is created
                Successfully.
              </Typography>
              <Button
                className="mt-3 px-5"
                variant="outlined"
                onClick={() => {
                  window.location.reload();
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

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={isLoading}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? isLoading
                        ? "Loading"
                        : "Create Application"
                      : "Next"}
                  </Button>
                </Box>
              </div>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  MenuItem,
  Grid,
  Box,
  Container,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useAuth from "../hooks/useAuth";
import Paper from "@mui/material/Paper";
import AddIco from "../assets/add.svg";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { createAnchor } from "../api";

import { GlobalContext } from "../Context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BasicDetails from "./CreateAnchorSteps/BasicDetails";
import BankDetails from "./CreateAnchorSteps/BankDetails";
import ContactDetails from "./CreateAnchorSteps/ContactDetails";

const theme = createTheme();
const steps = ["Basic Details", "Bank Details", "Contact Details"];
function getStepContent(step, setActiveStep) {
  switch (step) {
    case 0:
      return <BasicDetails setActiveStep={setActiveStep} />;
    case 1:
      return <BankDetails />;
    case 2:
      return <ContactDetails />;
    default:
      throw new Error("Unknown step");
  }
}
function CreateAnchor() {
  const navigate = useNavigate();
  // const { createAnchor } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const { anchorState, customersList, panData } =
    React.useContext(GlobalContext);

  const [anchorDetails, setAnchorDetails] = anchorState;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 2) {
      handleCreateAnchor();
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  //   useEffect(()=>{
  // console.log("email")
  //   },anchorDetails.email)

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateAnchor = async (e) => {
    // e.preventDefault();
    setLoading(true);
    try {
      let payload = {
        ...anchorDetails,
      };
      let { data } = await createAnchor(payload);
      if (data?.status) {
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
      <p className="go-back-btn" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <div className="page-head">
          <img src={AddIco} width={"30px"} />
          <span style={{ marginLeft: "10px", color: "gray" }}>
            Create Anchor
          </span>
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
                Anchor Created Successfully.
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
                    disabled={
                      anchorDetails?.email_type &&
                      anchorDetails?.anchor_name !== ""
                        ? false
                        : true
                      // !anchorDetails?.email_type && anchorDetails?.anchor_name
                    }
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? isLoading
                        ? "Loading"
                        : "Create Anchor"
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

export default CreateAnchor;

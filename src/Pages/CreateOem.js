// import moment from "moment/moment";
// import { toast } from "react-toastify";
import { createOem } from "../api";

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
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import useAuth from "../hooks/useAuth";
import Paper from "@mui/material/Paper";
import AddIco from "../assets/add.svg";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { GlobalContext } from "../Context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BasicDetails from "./CreateOemSteps/BasicDetails";
import Documents from "./CreateOemSteps/Document";
import ContactDetails from "./CreateOemSteps/Contact";

// const theme = createTheme();
const theme = createTheme();
const steps = ["Basic Details", "Documents", "Contact Details"];
function getStepContent(step, setActiveStep) {
  switch (step) {
    case 0:
      return <BasicDetails setActiveStep={setActiveStep} />;
    case 1:
      return <Documents />;
    case 2:
      return <ContactDetails />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CreateOem() {
  const navigate = useNavigate();
  // const { createAnchor } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const { oemState, emailState, panData } = React.useContext(GlobalContext);

  const [oemDetails, setOemDetails] = oemState;
  const [isEmailVerified, setIsEmailVerified] = emailState;

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 2) {
      handleCreateOem();
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  //   useEffect(()=>{
  // console.log("email")
  //   },oemDetails.email)

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateOem = async (e) => {
    // e.preventDefault();
    console.log(oemDetails);
    let payload = {
      ...oemDetails,
    };
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "") {
        delete payload[key];
      }
    });
    console.log(payload);
    let { data } = await createOem(payload);
    setActiveStep(activeStep + 1);

    // setLoading(true);
    // try {
    //   let payload = {
    //     ...oemDetails,
    //   };
    //   let { data } = await createOem(payload);
    //   if (data?.status) {
    //     setActiveStep(activeStep + 1);
    //   }
    // } catch (error) {
    //   toast.error("Some Error");
    // }

    // setLoading(false);
  };

  // const navigate = useNavigate();
  // const [falseEmail, setFalseEmail] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  // const [isLoading, setLoading] = useState(false);

  // const handleChange = (prop) => (event) => {
  //   setOemDetails({
  //     ...oemDetails,
  //     [prop]: event.target.value,
  //   });
  // };

  // const handleCreateOem = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     let payload = {
  //       ...oemDetails,
  //     };

  //     let { data } = await createOem(payload);
  //     if (data?.status) {
  //       setAccountCreated(true);
  //     }
  //   } catch (error) {
  //     toast.error("Some Error");
  //   }
  //   setLoading(false);
  // };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <p className="go-back-btn" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <div className="page-head">
          <img src={AddIco} width={"30px"} />
          <span style={{ marginLeft: "10px", color: "gray" }}>Create Oem</span>
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
                Oem Created Successfully.
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
              <div
                sx={{ mt: 7, ml: 1 }}
                // sx={{
                //   position: "relative",
                //   bottom: "0px",
                //   right: "0px",
                // }}
                className="p-5"
              >
                {getStepContent(activeStep, setActiveStep)}
                <Box
                  sx={{
                    mt: 7,
                    ml: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      oemDetails?.brand_name !== "" &&
                      oemDetails?.company_name !== "" &&
                      (oemDetails?.firm_type !== "" || undefined) &&
                      oemDetails?.addresses[0]?.address_type !== "" &&
                      oemDetails?.addresses[0]?.address !== "" &&
                      oemDetails?.addresses[0]?.pincode !== ""
                        ? false
                        : true
                    }
                    // disabled={
                    // (activeStep === 0 &&
                    // oemDetails?.firm_type !== "" &&
                    // oemDetails?.brand_name !== "" &&
                    // oemDetails?.company_name !== "" &&
                    // oemDetails?.email !== "" &&
                    // isEmailVerified === true &&
                    // oemDetails?.website_link !== "" &&
                    // oemDetails?.address[0]?.address_type !== "" &&
                    // oemDetails?.address[0]?.address !== "" &&
                    // oemDetails?.address[0]?.pincode !== ""
                    // ? // (activeStep === 1 &&
                    //   oemDetails?.another_document[0]?.document_name !== "" &&
                    //   oemDetails?.another_document[0]?.document !== "") ||
                    // (activeStep === 2 &&
                    //   oemDetails?.contact[0]?.name !== "" &&
                    //   oemDetails?.contact[0]?.mobile_number !== "" &&
                    //   oemDetails?.contact[0]?.email !== "" &&
                    //   oemDetails?.contact[0]?.position !== "")
                    //   false
                    // : true
                    // }
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

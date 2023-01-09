import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  Typography,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { createAgent } from "../api";
import { toast } from "react-toastify";

function CreateAgent() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [falseEmail, setFalseEmail] = useState(false);
  const [agentCreated, setAgentCreated] = useState(false);

  const [agentDetails, setAgentDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    bankAccountNo: "",
    beneficiaryName: "",
    ifsc: "",
  });

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(agentDetails.email) === false) {
      setFalseEmail(true);
      return false;
    } else {
      // setEmailValidated(true);
      setFalseEmail(false);
      return true;
    }
  };

  useEffect(() => {
    if (agentDetails?.email !== "") {
      emailValidation();
    }
  }, [agentDetails?.email]);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(agentDetails);

    try {
      let payload = {
        ...agentDetails,
      };

      let { data } = await createAgent(payload);
      if (data?.status) {
        setAgentCreated(true);
      }
    } catch (error) {
      toast.error("Some Error");
    }

    setLoading(false);
  };

  return (
    <>
      <p className="go-back-btn-fixed" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <Container
        sx={{
          padding: "43px",
        }}
        component="main"
        maxWidth="sm"
      >
        <CssBaseline />
        {agentCreated ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Agent Created Successfully.
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
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {falseEmail && (
              <InputLabel
                sx={{
                  color: "red",
                }}
                required
                id="demo-simple-select-label"
              >
                Email is not valid
              </InputLabel>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleCreateAgent}
              sx={{
                mt: 5,
                pb: 3,
                padding: "40px",
                pt: 2,
                //   px: 3,
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                      sm: "row",
                      xs: "column",
                    },
                    gap: {
                      sm: "35px",
                      xs: "0px",
                    },
                  }}
                >
                  <TextField
                    size="small"
                    required
                    id="text"
                    label="Name"
                    name="name"
                    value={agentDetails.name}
                    onChange={(e) => {
                      setAgentDetails({
                        ...agentDetails,
                        name: e.target.value,
                      });
                    }}
                    sx={{
                      mt: 2,
                    }}
                  />

                  <TextField
                    size="small"
                    required
                    sx={{ mt: 2 }}
                    id="email"
                    label="Email Id"
                    name="email"
                    autoComplete="email"
                    value={agentDetails.email}
                    onChange={(e) => {
                      setAgentDetails({
                        ...agentDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // key={index}
                    required
                    fullWidth
                    sx={{ mt: 2 }}
                    size="small"
                    id="phone"
                    label="Mobile no."
                    type="input"
                    value={agentDetails.mobile}
                    onChange={(e) => {
                      setAgentDetails({
                        ...agentDetails,
                        mobile: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                      sm: "row",
                      xs: "column",
                    },
                    gap: {
                      sm: "35px",
                      xs: "0px",
                    },
                  }}
                >
                  <TextField
                    size="small"
                    required
                    id="aadhaar"
                    label="Aadhar number"
                    name="aadhaar"
                    value={agentDetails.aadhaar}
                    onChange={(e) => {
                      setAgentDetails({
                        ...agentDetails,
                        aadhaar: e.target.value,
                      });
                    }}
                    sx={{
                      mt: 2,
                    }}
                  />

                  <TextField
                    size="small"
                    required
                    sx={{ mt: 2 }}
                    id="pan"
                    label="Pan Number"
                    name="pan"
                    value={agentDetails.pan}
                    onChange={(e) => {
                      setAgentDetails({
                        ...agentDetails,
                        pan: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                      sm: "column",
                      xs: "column",
                    },
                    gap: {
                      // sm: "35px",
                      xs: "0px",
                    },
                    marginTop: "10px",
                  }}
                >
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                    <InputLabel required id="demo-simple-select-label">
                      Bank Details
                    </InputLabel>
                  </Grid>
                  <Grid>
                    <TextField
                      size="small"
                      fullWidth
                      required
                      sx={{ mt: 1 }}
                      id="account"
                      label="Account No."
                      name="account"
                      value={agentDetails.bankAccountNo}
                      onChange={(e) => {
                        setAgentDetails({
                          ...agentDetails,
                          bankAccountNo: e.target.value,
                        });
                      }}
                    />
                    <TextField
                      size="small"
                      fullWidth
                      required
                      sx={{ mt: 2 }}
                      id="beneficiaryName"
                      label="Beneficiary Name"
                      name="beneficiaryName"
                      value={agentDetails.beneficiaryName}
                      onChange={(e) => {
                        setAgentDetails({
                          ...agentDetails,
                          beneficiaryName: e.target.value,
                        });
                      }}
                    />
                    <TextField
                      size="small"
                      fullWidth
                      required
                      sx={{ mt: 2 }}
                      id="ifsc"
                      label="IFSC Code"
                      name="ifsc"
                      value={agentDetails.ifsc}
                      onChange={(e) => {
                        setAgentDetails({
                          ...agentDetails,
                          ifsc: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {!isLoading ? (
                <Button
                  type="submit"
                  disabled={
                    agentDetails.email &&
                    agentDetails.name &&
                    agentDetails.mobile &&
                    agentDetails.aadhaar &&
                    agentDetails.pan &&
                    agentDetails.bankAccountNo &&
                    agentDetails.beneficiaryName &&
                    agentDetails.ifsc
                      ? false
                      : true
                  }
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 5,
                    mb: 2,
                    py: 2,

                    borderRadius: "10px",
                    backgroundColor: "#6C757D",
                    ":hover": {
                      bgcolor: "#6F32BE",
                      color: "white",
                    },
                  }}
                  // onClick={handleCreateAgent}
                >
                  Create Agent
                  {/* {user?.loading ? "Loading" : "Create user"} */}
                </Button>
              ) : (
                <p className="w-100 text-center" style={{ color: "purple" }}>
                  Creating agent....
                </p>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default CreateAgent;

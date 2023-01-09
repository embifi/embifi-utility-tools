import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  MenuItem,
  Typography,
  Select,
  Grid,
  InputLabel,
  Box,
  Container,
} from "@mui/material";
import { createUser } from "../api";
import { toast } from "react-toastify";

function CreateUser() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [cred, setCred] = useState({
    user_type: "",
    email: "",
    name: "",
    dob: "",
  });
  const [falseEmail, setFalseEmail] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(cred.email) === false) {
      setFalseEmail(true);
      return false;
    } else {
      setFalseEmail(false);
      return true;
    }
  };

  useEffect(() => {
    if (cred?.email !== "") {
      emailValidation();
    }
  }, [cred?.email]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let payload = {
      ...cred,
    };
    let response = await createUser(payload);
    if (!response.status) {
      toast.error(response?.response?.data?.message || "Something went wrong");
      return setLoading(false);
    }
    toast.success(response?.data?.message || "Updated Password Successfully");
    return setLoading(false);
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
          {userCreated ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                User Created Successfully.
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
              component="form"
              noValidate
              // onSubmit={handleSubmit}
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
                <Grid item xs={12} sm={12}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // defaultValue={`${anchorDetails?.anchor_role}`}
                      onChange={(e) => {
                        setCred({
                          ...cred,
                          user_type: e.target?.value,
                        });
                      }}
                    >
                      <MenuItem value={"EMBIFI"}>EMBIFI</MenuItem>
                      <MenuItem value={"NBFC"}>NBFC</MenuItem>
                    </Select>
                  </FormControl>
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
                    id="text"
                    label="Name"
                    name="name"
                    value={cred.name}
                    onChange={(e) => {
                      setCred({ ...cred, name: e.target.value });
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
                    value={cred.email}
                    onChange={(e) => {
                      setCred({ ...cred, email: e.target.value });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    id="date"
                    label="Birthday"
                    type="date"
                    value={cred.dob}
                    onChange={(e) => {
                      setCred({ ...cred, dob: e.target.value });
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              {!isLoading ? (
                <Button
                  type="submit"
                  disabled={
                    cred.email && cred.name && cred.dob && cred.user_type
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
                  onClick={handleCreateUser}
                >
                  Create user
                  {/* {user?.loading ? "Loading" : "Create user"} */}
                </Button>
              ) : (
                <p className="w-100 text-center" style={{ color: "purple" }}>
                  Creating user....
                </p>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}

export default CreateUser;

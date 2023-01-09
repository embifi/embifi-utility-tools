import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import DatePickerComponent from "../../Components/DatePicker";
import { FormLabel } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import style from "../CreateAnchorSteps/AnchorDetails.css";
import moment from "moment/moment";
import { toast } from "react-toastify";

export default function BasicDetails({ setActiveStep }) {
  const { anchorState, customersList, panData } =
    React.useContext(GlobalContext);

  const [anchorDetails, setAnchorDetails] = anchorState;
  const [falseEmail, setFalseEmail] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);

  const handleNumberChange = (prop) => (event) => {
    if (event.target.value !== "" && !/^\d+$/.test(event.target.value)) {
      return false;
    }
    setAnchorDetails({
      ...anchorDetails,
      [prop]: event.target.value,
    });
  };
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(anchorDetails?.email) === false) {
      setFalseEmail(true);
      setAnchorDetails({
        ...anchorDetails,
        email_type: false,
      });
      // return false;
    } else {
      setEmailValidated(true);
      setFalseEmail(false);
      setAnchorDetails({
        ...anchorDetails,
        email_type: true,
      });
      // return true;
    }
  };

  const handleEmailChange = (event) => {
    // const value = event.target.value;
    const { value } = event.target;

    setAnchorDetails({ ...anchorDetails, email: value });
    // emailValidation(value);
  };

  useEffect(() => {
    if (anchorDetails?.email !== "") {
      emailValidation();
    }
  }, [anchorDetails?.email]);

  const handleChange = (prop) => (event) => {
    if (prop === "pan_number") {
      setAnchorDetails({
        ...anchorDetails,
        [prop]: event.target.value?.toUpperCase(),
        customer_name: "",
      });
    } else {
      setAnchorDetails({
        ...anchorDetails,
        [prop]: event.target.value,
      });
    }
  };
  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      {falseEmail ? (
        <InputLabel
          sx={{
            color: "red",
          }}
          required
          id="demo-simple-select-label"
        >
          Email is not valid
        </InputLabel>
      ) : (
        ""
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Anchor Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={`${anchorDetails?.anchor_role}`}
              onChange={(e) => {
                setAnchorDetails({
                  ...anchorDetails,
                  anchor_role: e.target?.value,
                });
              }}
            >
              <MenuItem value={"Manager"}>Manager</MenuItem>
              <MenuItem value={"Offline Anchor"}>Offline Anchor</MenuItem>
              <MenuItem value={"Brand"}>Brand</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Anchor Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={anchorDetails?.anchor_name}
              onChange={handleChange("anchor_name")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="standard"
              value={anchorDetails?.email}
              onChange={handleEmailChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              // required
              id="gstin"
              name="gstin"
              // type={"number"}
              label="Anchor GSTIN"
              fullWidth
              // autoComplete="email"
              variant="standard"
              value={anchorDetails?.anchor_gstin}
              onChange={handleChange("anchor_gstin")}
            />
          </Grid>
          <Grid sx={{ display: "flex" }} item xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Anchor Fee Share as (% / number) of processing Fees
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  // defaultValue={anchorDetails?.processing_fees_type}
                  onChange={(e) => {
                    let value = e.target.value;

                    setAnchorDetails({
                      ...anchorDetails,
                      processing_fees_type: value,
                    });
                  }}
                >
                  <FormControlLabel value="%" control={<Radio />} label="%" />
                  <FormControlLabel
                    value="number"
                    control={<Radio />}
                    label="Number"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {anchorDetails?.processing_fees_type !== "" && (
              <Grid
                sx={{
                  marginTop: "40px",
                }}
                item
                xs={12}
                sm={6}
              >
                <TextField
                  // required
                  id="processing_fees"
                  name="processing_fees"
                  type="number"
                  label={anchorDetails?.processing_fees_type}
                  fullWidth
                  // autoComplete="email"
                  variant="standard"
                  value={anchorDetails?.processing_fees}
                  onChange={(e) => {
                    if (
                      anchorDetails?.processing_fees_type === "%" &&
                      e.target.value.length >= 3
                    ) {
                      return;
                    } else if (
                      anchorDetails?.processing_fees_type === "number" &&
                      e.target.value.length >= 10
                    ) {
                      return;
                    } else {
                      setAnchorDetails({
                        ...anchorDetails,
                        processing_fees: e.target.value?.toUpperCase(),
                      });
                      // handleChange("processing_fees");
                    }
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid sx={{ display: "flex" }} item xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Anchor Fee Share as (% / number) of Interest Rate
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  // defaultValue={anchorDetails?.processing_fees_type}
                  onChange={(e) => {
                    let value = e.target.value;
                    // console.log(anchorDetails.processing_fees_type);
                    setAnchorDetails({
                      ...anchorDetails,
                      interest_rate_type: value,
                    });
                  }}
                >
                  <FormControlLabel value="%" control={<Radio />} label="%" />
                  <FormControlLabel
                    value="number"
                    control={<Radio />}
                    label="Number"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {anchorDetails?.interest_rate_type !== "" && (
              <Grid
                sx={{
                  marginTop: "40px",
                }}
                item
                xs={12}
                sm={6}
              >
                <TextField
                  // required
                  id="interest_rate"
                  name="interest_rate"
                  type="number"
                  label={anchorDetails?.interest_rate_type}
                  fullWidth
                  // autoComplete="email"
                  variant="standard"
                  value={anchorDetails?.interest_rate}
                  onChange={(e) => {
                    if (
                      anchorDetails?.interest_rate_type === "%" &&
                      e.target.value.length >= 3
                    ) {
                      return;
                    } else if (
                      anchorDetails?.interest_rate_type === "number" &&
                      e.target.value.length >= 10
                    ) {
                      return;
                    } else {
                      setAnchorDetails({
                        ...anchorDetails,
                        interest_rate: e.target.value?.toUpperCase(),
                      });
                      // handleChange("processing_fees");
                    }
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid sx={{ display: "flex" }} item xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Anchor Fee Share as (% / number) of Penalty Fees
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  // defaultValue={anchorDetails?.processing_fees_type}
                  onChange={(e) => {
                    let value = e.target.value;
                    // console.log(anchorDetails.processing_fees_type);
                    setAnchorDetails({
                      ...anchorDetails,
                      penalty_fees_type: value,
                    });
                  }}
                >
                  <FormControlLabel value="%" control={<Radio />} label="%" />
                  <FormControlLabel
                    value="number"
                    control={<Radio />}
                    label="Number"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {anchorDetails?.penalty_fees_type !== "" && (
              <Grid
                sx={{
                  marginTop: "40px",
                }}
                item
                xs={12}
                sm={6}
              >
                <TextField
                  // required
                  id="penalty_fees"
                  name="penalty_fees"
                  type="number"
                  label={anchorDetails?.penalty_fees_type}
                  fullWidth
                  // autoComplete="email"
                  variant="standard"
                  value={anchorDetails?.penalty_fees}
                  onChange={(e) => {
                    if (
                      anchorDetails?.penalty_fees_type === "%" &&
                      e.target.value.length >= 3
                    ) {
                      return;
                    } else if (
                      anchorDetails?.penalty_fees_type === "number" &&
                      e.target.value.length >= 10
                    ) {
                      return;
                    } else {
                      setAnchorDetails({
                        ...anchorDetails,
                        penalty_fees: e.target.value?.toUpperCase(),
                      });
                      // handleChange("processing_fees");
                    }
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid sx={{ display: "flex" }} item xs={12} sm={12}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Anchor Fee Share as (% / number) of Penalty rate
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  // defaultValue={anchorDetails?.processing_fees_type}
                  onChange={(e) => {
                    let value = e.target.value;
                    // console.log(anchorDetails.processing_fees_type);
                    setAnchorDetails({
                      ...anchorDetails,
                      penalty_rate_type: value,
                    });
                  }}
                >
                  <FormControlLabel value="%" control={<Radio />} label="%" />
                  <FormControlLabel
                    value="number"
                    control={<Radio />}
                    label="Number"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {anchorDetails?.penalty_rate_type !== "" && (
              <Grid
                sx={{
                  marginTop: "40px",
                }}
                item
                xs={12}
                sm={6}
              >
                <TextField
                  // required
                  id="penalty_rate"
                  name="penalty_rate"
                  type="number"
                  label={anchorDetails?.penalty_rate_type}
                  fullWidth
                  // autoComplete="email"
                  variant="standard"
                  value={anchorDetails?.penalty_rate}
                  onChange={(e) => {
                    if (
                      anchorDetails?.penalty_rate_type === "%" &&
                      e.target.value.length >= 3
                    ) {
                      return;
                    } else if (
                      anchorDetails?.penalty_rate_type === "number" &&
                      e.target.value.length >= 10
                    ) {
                      return;
                    } else {
                      setAnchorDetails({
                        ...anchorDetails,
                        penalty_rate: e.target.value?.toUpperCase(),
                      });
                      // handleChange("processing_fees");
                    }
                  }}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel id="demo-simple-select-standard-label">
              Manager Details
            </InputLabel>
            <TextField
              // required
              sx={{
                marginTop: "12px",
              }}
              id="manager_name"
              name="manager_name"
              label="Anchor Relationship Manager Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={anchorDetails?.manager_name}
              onChange={handleChange("manager_name")}
            />
            <TextField
              sx={{
                marginTop: "12px",
              }}
              // required
              id="manager_mail_id"
              name="manager_mail_id"
              label="Anchor Relationship Manager EMail_ID
              "
              fullWidth
              autoComplete="email"
              variant="standard"
              value={anchorDetails?.manager_mail_id}
              onChange={handleChange("manager_mail_id")}
            />
            <TextField
              sx={{
                marginTop: "12px",
              }}
              // required
              id="manager_mobile_number"
              name="manager_mobile_number"
              type="number"
              label="Anchor Relationship Manager Mobile Number
              "
              fullWidth
              // autoComplete="email"
              variant="standard"
              value={anchorDetails?.manager_mobile_number}
              onChange={(e) => {
                if (e.target.value.length >= 10) {
                  return;
                } else {
                  setAnchorDetails({
                    ...anchorDetails,
                    manager_mobile_number: e.target.value?.toUpperCase(),
                  });
                }
              }}
              // onChange={handleChange("manager_mobile_number")}
            />
          </Grid>
        </>
      </Grid>
    </React.Fragment>
  );
}

import * as React from "react";
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
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import DatePickerComponent from "../../Components/DatePicker";
import { FormLabel } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import moment from "moment/moment";
import { toast } from "react-toastify";

export default function CoApplicant({ setActiveStep }) {
  const { applicationState, customersList, panData } =
    React.useContext(GlobalContext);

  const [applicationDetails, setApplicationDetails] = applicationState;

  // React.useEffect(() => {
  //   alert(applicationDetails?.is_existing)
  // }, [applicationDetails?.is_existing]);

  const handleNumberChange = (prop) => (event) => {
    if (event.target.value !== "" && !/^\d+$/.test(event.target.value)) {
      return false;
    }
    setApplicationDetails({
      ...applicationDetails,
      [prop]: event.target.value,
    });
  };

  const handleChange = (prop) => (event) => {
    if (prop === "pan_number") {
      setApplicationDetails({
        ...applicationDetails,
        [prop]: event.target.value?.toUpperCase(),
        customer_name: "",
      });
    } else {
      setApplicationDetails({
        ...applicationDetails,
        [prop]: event.target.value,
      });
    }
  };

  const handleCoApplicantToggle = (e) => {
    setApplicationDetails({
      ...applicationDetails,
      coApplicantExist: e.target.checked,
    });
  }

  // React.useEffect(() => {
  //   if (applicationDetails?.pan_number.length === 10 && !panData?.status) {
  //     toast.error("Invalid Pan number");
  //   }
  // }, [panData]);

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes"
                checked={applicationDetails?.coApplicantExist}
                onChange={handleCoApplicantToggle}
              />
            }
            label="Co-Applicant Needed"
          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">NBFC</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={`${applicationDetails?.nbfc_id}%${applicationDetails?.nbfc_name}`}
              onChange={(e) => {
                setApplicationDetails({
                  ...applicationDetails,
                  nbfc_id: e.target?.value.split("%")[0],
                  nbfc_name: e.target?.value.split("%")[1],
                });
              }}
            >
              <MenuItem value={"VA00001%Vaani Commercials"}>
                Vaani Commercials
              </MenuItem>
              <MenuItem value={"NY00002%NY Leasing"}>NY Leasing</MenuItem>
              <MenuItem value={"PL00003%Prest Loans"}>Prest Loans</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {/* {applicationDetails?.nbfc_id !== "" && (
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Existing Customer
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={applicationDetails?.is_existing + ""}
                onChange={(e) => {
                  let value = e.target.value;
                  setApplicationDetails((st) => ({
                    ...st,
                    is_existing: value === "true" ? true : false,
                    add_new: value === "true" ? false : true,
                  }));
                }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        )} */}


        <>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">Secondary Applicant Type</InputLabel>
              <Select
                disabled={applicationDetails?.coApplicantExist ? false : true}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={applicationDetails?.co_app_secondary_app_type}
                onChange={(e) => {
                  setApplicationDetails({
                    ...applicationDetails,
                    co_app_secondary_app_type: e.target?.value
                  });
                }}
              >
                <MenuItem value={"GUARANTOR"}>Guarantor</MenuItem>
                <MenuItem value={"CO-APPLICANT"}>Co-Applicant</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              // require
              id="pan"
              name="pan"
              label="PAN"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              inputProps={{ maxLength: 10 }}
              value={applicationDetails?.co_app_pan_number}
              onChange={handleChange("co_app_pan_number")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                PAN Type
              </InputLabel>
              <Select
                disabled={applicationDetails?.coApplicantExist ? false : true}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationDetails?.co_app_pan_type}
                onChange={handleChange("co_app_pan_type")}
                label="Pan Type"
              >
                <MenuItem value={"individual"}>Individual</MenuItem>
                <MenuItem value={"corporate"}>Corporate</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {applicationDetails?.coApplicantExist ?
            <Grid item xs={12} sm={6}>
              <DatePickerComponent
                text={"D.O.B"}
                defaultValue={applicationDetails?.co_app_dob}
                onChange={(date) => {
                  setApplicationDetails({
                    ...applicationDetails,
                    co_app_dob: moment(date).format("DD/MM/YYYY"),
                  });
                }}
              />
            </Grid> : null}

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="relationBorrower"
              name="relationBorrower"
              label="Relation Borrower"
              fullWidth
              variant="standard"
              value={applicationDetails?.co_app_relation_borrower}
              onChange={handleChange("co_app_relation_borrower")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="currentResidentialAddress"
              name="currentResidentialAddress"
              label="Current Residential Address"
              fullWidth
              variant="standard"
              value={applicationDetails?.co_app_current_residential_address}
              onChange={handleChange("co_app_current_residential_address")}
            />
          </Grid>

          {applicationDetails?.coApplicantExist ?
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Current Address Property Owned ?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={applicationDetails?.co_app_current_residential_owned + ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    setApplicationDetails((st) => ({
                      ...st,
                      co_app_current_residential_owned: value === "true" ? true : false,
                    }));
                  }}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </Grid> : null}

          {/* <Grid item xs={12} sm={6}>
                <TextField
                  id="aadhaarAddress"
                  name="aadhaarAddress"
                  label="Aadhaar Address"
                  fullWidth
                  variant="standard"
                  value={applicationDetails?.co_app_relation_borrower}
                  onChange={handleChange("co_app_relation_borrower")}
                />
              </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="CrifScore"
              name="crifScore"
              label="Crif Score"
              fullWidth
              variant="standard"
              value={applicationDetails?.co_app_crif_score}
              onChange={handleNumberChange("co_app_crif_score")}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              // required
              id="name"
              name="name"
              label="Customer Name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_customer_name}
              onChange={handleChange("co_app_customer_name")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              // required
              id="mob"
              name="mob"
              label="Mobile Number"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_mobile_number}
              onChange={handleNumberChange("co_app_mobile_number")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_email}
              onChange={handleChange("co_app_email")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                disabled={applicationDetails?.coApplicantExist ? false : true}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={applicationDetails?.co_app_gender}
                onChange={handleChange("co_app_gender")}
                label="Gender"
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {applicationDetails?.coApplicantExist ?
            <Grid item xs={12} sm={6}>
              <DatePickerComponent
                defaultValue={applicationDetails?.co_app_onboarding_date}
                text={"Onboard Date"}
                onChange={(date) => {
                  setApplicationDetails({
                    ...applicationDetails,
                    co_app_onboarding_date: moment(date).format("DD/MM/YYYY"),
                  });
                }}
              />
            </Grid> : null}

          {/* <Grid item xs={12} sm={12}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_address}
              onChange={handleChange("co_app_address")}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_city}
              onChange={handleChange("co_app_city")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="state"
              name="state"
              label="State"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_state}
              onChange={handleChange("co_app_state")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="pincode"
              name="pincode"
              label="Pincode"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_pincode}
              onChange={handleNumberChange("co_app_pincode")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="income"
              name="income"
              label="Income"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_income}
              onChange={handleChange("co_app_income")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              disabled={applicationDetails?.coApplicantExist ? false : true}
              id="education"
              name="education"
              label="Education"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={applicationDetails?.co_app_education}
              onChange={handleChange("co_app_education")}
            />
          </Grid>
        </>

      </Grid>
    </React.Fragment>
  );
}

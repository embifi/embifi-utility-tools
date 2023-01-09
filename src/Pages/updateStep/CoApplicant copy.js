import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import DatePickerComponent from "../../Components/DatePicker";
import { GlobalContext } from "../../Context/GlobalContext";
import moment from 'moment';
// import { createApplication } from '../../api'

export default function CoApplicant() {
  const { applicationState, bankList } = React.useContext(GlobalContext);

  const [applicationDetails, setApplicationDetails] = applicationState;
  // const [checked, setChecked] = React.useState(false);

  React.useEffect(() => { }, [applicationDetails]);

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
    setApplicationDetails({
      ...applicationDetails,
      [prop]: event.target.value,
    });
  };

  const handleCoApplicantToggle = (e) => {
    setApplicationDetails({
      ...applicationDetails,
      coApplicantExist: e.target.checked,
    });
  }

  React.useEffect(()=>{
    console.log(applicationDetails?.coApplicantExist)
  },[applicationDetails?.coApplicantExist])


  // const createApp = async () => {
  //   try {
  //     let { data } = await createApplication(applicationDetails);
  //     // setAnchorList(data?.data);
  //     console.log('create application:-', data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <React.Fragment>
      <Grid container spacing={3}>

        {applicationDetails?.add_new && (
          <>
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

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="panNumber"
                name="panNumber"
                label="Pan Number"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_pan_number}
                onChange={handleChange("co_app_pan_number")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="panName"
                name="panName"
                label="Pan Name"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_pan_name}
                onChange={handleChange("co_app_pan_name")}
              />
            </Grid>

            {applicationDetails?.coApplicantExist ?
              <Grid item xs={12} sm={6}>
                <DatePickerComponent
                  text={"D.O.B"}
                  onChange={(date) => {
                    setApplicationDetails({
                      ...applicationDetails,
                      co_app_dob: moment(date).format("DD/MM/YYYY"),
                    });
                  }}
                />
              </Grid>
              : null}

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_mobile_number}
                onChange={handleChange("co_app_mobile_number")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="email"
                name="email"
                label="Email"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_email}
                onChange={handleChange("co_app_email")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="customerType"
                name="cutomerType"
                label="Customer Type"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_customer_type}
                onChange={handleChange("co_app_customer_type")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="residentialAddress"
                name="residentialAddress"
                label="Residential Address"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_residential_address}
                onChange={handleChange("co_app_residential_address")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled={applicationDetails?.coApplicantExist ? false : true}
                id="pincode"
                name="pincode"
                label="Pincode"
                fullWidth
                variant="standard"
                value={applicationDetails?.co_app_pincode}
                onChange={handleChange("co_app_pincode")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }} disabled={applicationDetails?.coApplicantExist ? false : true}>
                <InputLabel id="demo-simple-select-standard-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={applicationDetails?.co_app_gender}
                  onChange={handleChange("co_app_gender")}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

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
                id="income"
                name="income"
                label="Income"
                fullWidth
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
                variant="standard"
                value={applicationDetails?.co_app_education}
                onChange={handleChange("co_app_education")}
              />
            </Grid>


          </>
        )}

      </Grid>
    </React.Fragment>
  );
}

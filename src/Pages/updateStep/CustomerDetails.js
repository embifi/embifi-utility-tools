import { useState, useContext, useEffect, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Autocomplete,
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
import { fetchAllApplications } from "../../api";
import useApplication from "../../hooks/useApplication";

export default function CustomerDetails({ setActiveStep }) {
  const { updateDetailState, customersList, panData } =
    useContext(GlobalContext);

  const [updateDetails, setUpdateDetails] = updateDetailState;

  const [applications, setApplications] = useState([]);

  // React.useEffect(() => {
  //   alert(updateDetails?.is_existing)
  // }, [updateDetails?.is_existing]);

  const handleNumberChange = (prop) => (event) => {
    if (event.target.value !== "" && !/^\d+$/.test(event.target.value)) {
      return false;
    }
    setUpdateDetails({
      ...updateDetails,
      [prop]: event.target.value,
    });
  };

  const handleChange = (prop) => (event) => {
    if (prop === "pan_number") {
      setUpdateDetails({
        ...updateDetails,
        [prop]: event.target.value?.toUpperCase(),
        // customer_name: "",
      });
    } else {
      setUpdateDetails({
        ...updateDetails,
        [prop]: event.target.value,
      });
    }
  };

  // React.useEffect(() => {
  //   if (updateDetails?.pan_number.length === 10 && !panData?.status) {
  //     toast.error("Invalid Pan number");
  //   }
  // }, [panData]);

  const getApplications = async () => {
    let { data } = await fetchAllApplications();
    let list = data?.data?.map((val) => {
      return {
        application_id: val?.application_id,
        name: !val?.customerData?.is_corporate
          ? val?.customerData?.pan_details?.name
          : val?.customerData?.corporate_pan_details?.name,
      };
    });
    setApplications(list);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const { getApplicationDetails } = useApplication();
  useEffect(() => {
    if (updateDetails.application_id !== "") {
      getApplicationDetails(updateDetails.application_id);
    }
  }, [updateDetails.application_id]);

  return (
    <Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      <Grid container spacing={3}>
        {updateDetails?.application_id === "" && (
          <Grid item xs={12} sm={12}>
            <Autocomplete
              options={applications}
              getOptionLabel={(option) =>
                `${option?.name} - ${option?.application_id}`
              }
              id="ApplicationId"
              clearOnBlur
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select an Application to Edit"
                  variant="standard"
                />
              )}
              onChange={(event, value) => {
                setUpdateDetails({
                  ...updateDetails,
                  application_id: value?.application_id,
                  applicant_name: value?.name,
                });
                console.log(value?.application_id);
              }}
            />
          </Grid>
        )}

        {/* <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">NBFC</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={updateDetails?.nbfc_id}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  nbfc_id: e.target?.value
                });
              }}
            >
              <MenuItem value={"VA00001"}>
                Vani Commercials
              </MenuItem>
              <MenuItem value={"NY00002"}>NY Leasing</MenuItem>
              <MenuItem value={"PL00003"}>Prest Loans</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {updateDetails?.application_id !== "" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                require
                id="pan"
                name="pan"
                label="PAN"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                inputProps={{ maxLength: 10 }}
                value={updateDetails?.pan_number}
                onChange={handleChange("pan_number")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  PAN Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={updateDetails?.pan_type}
                  onChange={handleChange("pan_type")}
                  label="Pan Type"
                >
                  <MenuItem value={"individual"}>Individual</MenuItem>
                  <MenuItem value={"corporate"}>Corporate</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Customer Name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.customer_name}
                onChange={handleChange("customer_name")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePickerComponent
                text={"D.O.B"}
                defaultValue={updateDetails?.dob}
                onChange={(date) => {
                  setUpdateDetails({
                    ...updateDetails,
                    dob: moment(date).format("DD/MM/YYYY"),
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="mob"
                name="mob"
                label="Mobile Number"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.mobile_number}
                onChange={handleNumberChange("mobile_number")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.email}
                onChange={handleChange("email")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={updateDetails?.gender}
                  onChange={handleChange("gender")}
                  label="Age"
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
            <DatePickerComponent
              text={"Onboard Date"}
              onChange={(date) => {
                setUpdateDetails({
                  ...updateDetails,
                  onboarding_date: moment(date).format("DD/MM/YYYY"),
                });
              }}
            />
          </Grid> */}

            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                name="address"
                label="Residential Address"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.residential_address}
                onChange={handleChange("residential_address")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="Residential City"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.residential_address_city}
                onChange={handleChange("residential_address_city")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="Residential State"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.residential_address_state}
                onChange={handleChange("residential_address_state")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="pincode"
                name="pincode"
                label="Residential Pincode"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.residential_address_pincode}
                onChange={handleNumberChange("residential_address_pincode")}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="address"
                name="address"
                label="Aadhaar Address"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.aadhaar_address}
                onChange={handleChange("aadhaar_address")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="aadhaar_name"
                name="aadhaar_name"
                label="Name on Aadhaar"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.aadhaar_name}
                onChange={handleChange("aadhaar_name")}
              />
            </Grid>

            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="income"
                name="income"
                label="Income"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.income}
                onChange={handleChange("income")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="education"
                name="education"
                label="Education"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={updateDetails?.education}
                onChange={handleChange("education")}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Property Owned ?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={updateDetails?.is_property_owned + ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    setUpdateDetails((st) => ({
                      ...st,
                      is_property_owned: value === "true" ? true : false,
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
          </>
        )}

        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </Fragment>
  );
}

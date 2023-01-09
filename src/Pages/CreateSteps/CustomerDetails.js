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

export default function CustomerDetails({ setActiveStep }) {
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
        <Grid item xs={12} sm={6}>
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
                Vani Commercials
              </MenuItem>
              <MenuItem value={"NY00002%NY Leasing"}>NY Leasing</MenuItem>
              <MenuItem value={"PL00003%Prest Loans"}>Prest Loans</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {applicationDetails?.nbfc_id !== "" && (
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
        )}

        {applicationDetails?.nbfc_id !== "" &&
          !applicationDetails?.is_existing && (
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
                  value={applicationDetails?.pan_number}
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
                    value={applicationDetails?.pan_type}
                    onChange={handleChange("pan_type")}
                    label="Pan Type"
                  >
                    <MenuItem value={"individual"}>Individual</MenuItem>
                    <MenuItem value={"corporate"}>Corporate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              

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



              {/* {panData?.customer?.is_exist && <>Exist</>} */}
              {panData?.isExist && (
                <>
                  <Grid item xs={12} sm={12}>
                    <div
                      style={{
                        backgroundColor: "#e7e6e8",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <p>Already a Customer with this PAN exist:</p>
                      <p>{panData?.name}</p>
                      <p>{panData?.customer_id}</p>
                      <p>
                        Continue with this customer?
                        <Button
                          className="ms-3"
                          variant="outlined"
                          onClick={() => {
                            setApplicationDetails({
                              ...applicationDetails,
                              is_existing: true,
                              customer_id: panData?.customer_id,
                            });
                            setActiveStep(1);
                          }}
                        >
                          Continue
                        </Button>
                      </p>
                    </div>
                  </Grid>
                </>
              )}

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Customer Name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={applicationDetails?.customer_name}
                  onChange={handleChange("customer_name")}
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <DatePickerComponent
                  text={"D.O.B"}
                  defaultValue={applicationDetails?.dob}
                  onChange={(date) => {
                    setApplicationDetails({
                      ...applicationDetails,
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
                  value={applicationDetails?.mobile_number}
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
                  value={applicationDetails?.email}
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
                    value={applicationDetails?.gender}
                    onChange={handleChange("gender")}
                    label="Age"
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePickerComponent
                  text={"Onboard Date"}
                  defaultValue={applicationDetails?.onboarding_date}
                  onChange={(date) => {
                    setApplicationDetails({
                      ...applicationDetails,
                      onboarding_date: moment(date).format("DD/MM/YYYY"),
                    });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={applicationDetails?.address}
                  onChange={handleChange("address")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={applicationDetails?.city}
                  onChange={handleChange("city")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={applicationDetails?.state}
                  onChange={handleChange("state")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="pincode"
                  name="pincode"
                  label="Pincode"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={handleNumberChange("pincode")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="income"
                  name="income"
                  label="Income"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={applicationDetails?.income}
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
                  value={applicationDetails?.education}
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
                    defaultValue={applicationDetails?.is_property_owned + ""}
                    onChange={(e) => {
                      let value = e.target.value;
                      setApplicationDetails((st) => ({
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

              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Is Aadhaar Property Owned ?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    defaultValue={applicationDetails?.is_aadhaar_property_owned + ""}
                    onChange={(e) => {
                      let value = e.target.value;
                      setApplicationDetails((st) => ({
                        ...st,
                        is_aadhaar_property_owned: value === "true" ? true : false,
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

        {applicationDetails?.is_existing && (
          <>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Select Customer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  //   value={age}

                  defaultValue={applicationDetails?.customer_id}
                  label="Age"
                >
                  {customersList?.map((val) => {
                    return (
                      <MenuItem
                        value={val?.customer_id}
                        onClick={() => {
                          setApplicationDetails({
                            ...applicationDetails,
                            customer_id: val?.customer_id,
                          });
                        }}
                      >
                        {val?.customer_id} -{" "}
                        {val?.is_corporate
                          ? val?.corporate_pan_details?.name
                          : val?.pan_details?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
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
    </React.Fragment>
  );
}

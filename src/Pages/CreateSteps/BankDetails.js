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

export default function BankDetails() {
  const { applicationState, bankList } = React.useContext(GlobalContext);

  const [applicationDetails, setApplicationDetails] = applicationState;

  React.useEffect(() => {}, [applicationDetails]);

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

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {applicationDetails?.is_existing && (
          <Grid item xs={12} sm={12}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={applicationDetails?.add_new+""}
                onChange={(e) => {
                  let value = e.target.value;
                  setApplicationDetails({
                    ...applicationDetails,
                    add_new: value === "true" ? true : false,
                  });
                }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Add New Bank"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Choose Existing Bank"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        )}

        {applicationDetails?.add_new && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                id="accNumber"
                name="accNumber"
                label="Account Number"
                fullWidth
                variant="standard"
                value={applicationDetails?.account_number}
                onChange={handleChange("account_number")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="ifscCode"
                name="ifscCode"
                label="IFSC Code"
                fullWidth
                variant="standard"
                value={applicationDetails?.ifsc_code}
                onChange={handleChange("ifsc_code")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="bankName"
                name="bankName"
                label="Bank Name"
                fullWidth
                variant="standard"
                value={applicationDetails?.bank_name}
                onChange={handleChange("bank_name")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Account Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={applicationDetails?.account_type}
                  onChange={handleChange("account_type")}
                  label="Account Type"
                >
                  <MenuItem value={"Current"}>Current</MenuItem>
                  <MenuItem value={"Savings"}>Savings</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="BeneficiaryName"
                name="BeneficiaryName"
                label="Beneficiary Name"
                fullWidth
                variant="standard"
                value={applicationDetails?.benificiary_name}
                onChange={handleChange("benificiary_name")}
              />
            </Grid>
          </>
        )}

        {!applicationDetails?.add_new && (
          <>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Select Bank Detail
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={applicationDetails?.bank_id}
                    onChange={handleChange('bank_id')}
                  label="Select Bank Detail"
                >
                  {
                    bankList?.map((val)=>{
                      return <MenuItem value={val?.bank_id}>{val?.bank_id}{val?.bank_name && ` - ${val?.bank_name}`}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}

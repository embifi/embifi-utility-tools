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
  const { updateDetailState, bankList } = React.useContext(GlobalContext);

  const [updateDetails, setUpdateDetails] = updateDetailState;

  React.useEffect(() => {}, [updateDetails]);

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
    setUpdateDetails({
      ...updateDetails,
      [prop]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
       
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                id="accNumber"
                name="accNumber"
                label="Account Number"
                fullWidth
                variant="standard"
                value={updateDetails?.account_number}
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
                value={updateDetails?.ifsc_code}
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
                value={updateDetails?.bank_name}
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
                  value={updateDetails?.account_type}
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
                value={updateDetails?.benificiary_name}
                onChange={handleChange("benificiary_name")}
              />
            </Grid>
          </>
      

       
      </Grid>
    </React.Fragment>
  );
}

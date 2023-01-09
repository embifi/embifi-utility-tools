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
  const { anchorState, bankList } = React.useContext(GlobalContext);

  const [anchorDetails, setAnchorDetails] = anchorState;

  const handleChange = (prop) => (event) => {
    setAnchorDetails({
      ...anchorDetails,
      [prop]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
       
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                id="account_number"
                name="account_number"
                label="Account Number"
                fullWidth
                variant="standard"
                value={anchorDetails?.account_number}
                onChange={handleChange("account_number")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="ifsc_code"
                name="ifsc_code"
                label="IFSC Code"
                fullWidth
                variant="standard"
                value={anchorDetails?.ifsc_code}
                onChange={handleChange("ifsc_code")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="bank_name"
                name="bank_name"
                label="Bank Name"
                fullWidth
                variant="standard"
                value={anchorDetails?.bank_name}
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
                  value={anchorDetails?.account_type}
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
                id="beneficiary_name"
                name="beneficiary_name"
                label="Beneficiary Name"
                fullWidth
                variant="standard"
                value={anchorDetails?.beneficiary_name}
                onChange={handleChange("beneficiary_name")}
              />
            </Grid>
          </>
      </Grid>
    </React.Fragment>
  );
}

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
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
import moment from "moment";

export default function LoanDetails() {
  const { applicationState, anchorList } = React.useContext(GlobalContext);

  const [applicationDetails, setApplicationDetails] = applicationState;

  // const [checked, setChecked] = React.useState(false);

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
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Anchor ID
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={}
              onChange={handleChange("anchor_id")}
              label="Anchor ID"
            >
              {anchorList?.map((val) => {
                return <MenuItem value={val?.anchor_id}>{val?.name}</MenuItem>;
              })}
              {/* <MenuItem value={30}>
                <Button className="w-100">ADD NEW ANCHOR</Button>
              </MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
          <DatePickerComponent
            text={"Start Date"}
            defaultValue={applicationDetails?.start_date}
            onChange={(date) => {
              setApplicationDetails({
                ...applicationDetails,
                start_date: moment(date).format("DD/MM/YYYY"),
              });
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="nbfcloanid"
            name="nbfcloanid"
            label="NBFC Loan ID"
            fullWidth
            variant="standard"
            value={applicationDetails?.nbfc_loan_id}
            onChange={handleChange("nbfc_loan_id")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              OEM Id
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              //   value={age}
              //   onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Loan Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={applicationDetails?.loan_type}
              onChange={handleChange("loan_type")}
              //   label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"ERICKLN"}>Erickshaw Loan</MenuItem>
              <MenuItem value={"MERCHLN"}>Merchant Loan</MenuItem>
              <MenuItem value={"GROUPLN"}>Group Loan</MenuItem>
              <MenuItem value={"NLBSNLN"}>NL Business Loan</MenuItem>
              <MenuItem value={"NLINDLN"}>NLInvoice Discounting</MenuItem>
              <MenuItem value={"PERSNLN"}>Personal Loan</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Product Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={applicationDetails?.product_type}
              onChange={handleChange("product_type")}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="loanAmount"
            name="loanAmount"
            label="Loan Amount"
            fullWidth
            variant="standard"
            value={applicationDetails?.loan_amount}
            onChange={handleNumberChange("loan_amount")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="interest_rate"
            name="interest_rate"
            label="Interest Rate (P.A)"
            fullWidth
            variant="standard"
            value={applicationDetails?.interest_rate}
            onChange={handleNumberChange("interest_rate")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="interest"
            name="interest"
            label="Interest Amount"
            fullWidth
            variant="standard"
            value={applicationDetails?.interest}
            onChange={handleNumberChange("interest")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="processingFee"
            name="processingFee"
            label="Processing Fee"
            fullWidth
            variant="standard"
            value={applicationDetails?.processing_fee}
            onChange={handleNumberChange("processing_fee")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="gst"
            name="gst"
            label="GST"
            fullWidth
            variant="standard"
            value={applicationDetails?.gst}
            onChange={handleChange("gst")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="installment"
            name="installment"
            label="Installment Amount"
            fullWidth
            variant="standard"
            value={applicationDetails?.installment}
            onChange={handleNumberChange("installment")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="disbursalAmount"
            name="disbursalAmount"
            label="Disbursal Amount"
            fullWidth
            variant="standard"
            value={applicationDetails?.disbursal_amount}
            onChange={handleNumberChange("disbursal_amount")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="repayAmount"
            name="repayAmount"
            label="Repayment Amount"
            fullWidth
            variant="standard"
            value={applicationDetails?.repayment_amount}
            onChange={handleNumberChange("repayment_amount")}
          />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Is disbursed ?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={applicationDetails?.is_disbursed + ""}
              onChange={(e) => {
                let value = e.target.value;
                setApplicationDetails((st) => ({
                  ...st,
                  is_disbursed: value === "true" ? true : false,
                }));
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePickerComponent
            defaultValue={applicationDetails?.disbursal_date}
            text={"Disbursal Date"}
            onChange={(date) => {
              setApplicationDetails({
                ...applicationDetails,
                disbursal_date: moment(date).format("DD/MM/YYYY"),
              });
            }}
          />
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Tenure Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={applicationDetails?.tenure_type}
              onChange={handleChange("tenure_type")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"months"}>months</MenuItem>
              <MenuItem value={"weeks"}>weeks</MenuItem>
              <MenuItem value={"days"}>days</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="tenureValue"
            name="tenureValue"
            label="Tenure Value"
            fullWidth
            variant="standard"
            value={applicationDetails?.tenure_value}
            onChange={handleNumberChange("tenure_value")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Payment Basic
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={applicationDetails?.payment_basis}
              onChange={handleChange("payment_basis")}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
              <MenuItem value={"weekly"}>Weekly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="noInstallment"
            name="noInstallment"
            label="No of Installments"
            fullWidth
            variant="standard"
            value={applicationDetails?.no_of_installments}
            onChange={handleNumberChange("no_of_installments")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="CrifScore"
            name="crifScore"
            label="Crif Score"
            fullWidth
            variant="standard"
            value={applicationDetails?.crif_score}
            onChange={handleNumberChange("crif_score")}
          />
        </Grid>

        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" 
              checked={checked}
              onChange={(e)=>setChecked(e.target.checked)}
         />
            }
            label="Co-Applicant"
          />
        </Grid> */}

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

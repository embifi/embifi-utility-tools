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
import "./updateApplication.css";
import { statusColors } from "../../Constants/colors";

export default function LoanDetails() {
  const { updateDetailState, anchorList } = React.useContext(GlobalContext);

  const [updateDetails, setUpdateDetails] = updateDetailState;

  // const [checked, setChecked] = React.useState(false);

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
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Anchor ID
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updateDetails?.anchor_id}
              onChange={handleChange("anchor_id")}
              label="Anchor ID"
            >
              {anchorList?.map((val) => {
                return <MenuItem value={val?.anchor_id}>{val?.name}</MenuItem>;
              })}
              <MenuItem value={30}>
                <Button className="w-100">ADD NEW ANCHOR</Button>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
          <DatePickerComponent
            defaultValue={updateDetails?.start_date}
            text={"Start Date"}
            onChange={(date) => {
              setUpdateDetails({
                ...updateDetails,
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
            value={updateDetails?.nbfc_loan_id}
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
              value={updateDetails?.loan_type}
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
              value={updateDetails?.product_type}
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
            type={"number"}
            onWheel={(e) => e.target.blur()}
            variant="standard"
            value={updateDetails?.loan_amount}
            onChange={handleChange("loan_amount")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="interest_rate"
            name="interest_rate"
            label="Interest Rate (P.A)"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            fullWidth
            variant="standard"
            value={updateDetails?.interest_rate}
            onChange={handleChange("interest_rate")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="interest"
            name="interest"
            label="Interest Amount"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.interest}
            onChange={handleChange("interest")}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Interest Collected
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updateDetails?.interest_collected}
              onChange={handleChange("interest_collected")}
              //   label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"UPFRONT_DEDUCTED"}>Upfront Deducted</MenuItem>
              <MenuItem value={"PAY_LATER"}>End</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="processingRate"
            name="processingRate"
            label="Processing Rate"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.processing_rate}
            onChange={handleChange("processing_rate")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="processingFee"
            name="processingFee"
            label="Processing Fee"
            fullWidth
            variant="standard"
            type={"number"}
            value={updateDetails?.processing_fee}
            onWheel={(e) => e.target.blur()}
            onChange={handleChange("processing_fee")}
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              PF Collected
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updateDetails?.pf_collected}
              onChange={handleChange("pf_collected")}
              //   label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"UPFRONT_COLLECTED"}>Upfront Collected</MenuItem>
              <MenuItem value={"UPFRONT_DEDUCTED"}>Upfront Deducted</MenuItem>
              <MenuItem value={"PAY_LATER"}>End of tenure</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        
        <Grid item xs={12} sm={6}>
          <TextField
            id="gst"
            name="gst"
            label="GST"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.gst}
            onChange={handleChange("gst")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="otherCharges"
            name="otherCharges"
            label="Other Charges"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.other_charges}
            onChange={handleChange("other_charges")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="installment"
            name="installment"
            label="Installment Amount"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.installment}
            onChange={handleChange("installment")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="disbursalAmount"
            name="disbursalAmount"
            label="Disbursal Amount"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.disbursal_amount}
            onChange={handleChange("disbursal_amount")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="repayAmount"
            name="repayAmount"
            label="Repayment Amount"
            fullWidth
            variant="standard"
            type={"number"}
            onWheel={(e) => e.target.blur()}
            value={updateDetails?.repayment_amount}
            onChange={handleChange("repayment_amount")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePickerComponent
            defaultValue={updateDetails?.disbursal_date}
            text={"Disbursal Date"}
            onChange={(date) => {
              setUpdateDetails({
                ...updateDetails,
                disbursal_date: moment(date).format("DD/MM/YYYY"),
              });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Tenure Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updateDetails?.tenure_type}
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
            value={updateDetails?.tenure_value}
            type={"number"}
            onWheel={(e) => e.target.blur()}
            onChange={handleChange("tenure_value")}
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
              value={updateDetails?.payment_basis}
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
            // type={"number"}
            // onWheel={(e) => e.target.blur()}
            value={updateDetails?.no_of_installments}
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
            type={"text"}
            value={updateDetails?.crif_score}
            onChange={handleChange("crif_score")}
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        className={"status-card mt-4"}
        sx={{
          boxShadow: `${
            statusColors?.[updateDetails?.application_status]
          } 0px 3px 8px`,
        }}
      >
        <Grid item xs={12} sm={6}>
          <p className="">Application status</p>
        </Grid>
        <Grid item xs={12} sm={6} className={"pt-3"}>
          <FormControl variant="standard" sx={{ minWidth: "100% " }}>
            {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updateDetails?.application_status}
              onChange={(e) => {
                setUpdateDetails({
                  ...updateDetails,
                  application_status: e.target.value,
                });
              }}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"approved"}>Approved</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
              <MenuItem value={"disbursed"}>Disbursed</MenuItem>
              <MenuItem value={"closed"}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {updateDetails?.application_status === "rejected" && (
          <Grid item xs={12} sm={12}>
            <TextField
              id="rejected_reason"
              name="rejected_reason"
              label="Reason"
              fullWidth
              variant="standard"
              value={updateDetails?.rejected_reason}
              onChange={handleChange("rejected_reason")}
            />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

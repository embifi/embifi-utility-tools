import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createApplication,
  fetchAllApplications,
  updateApplication,
  updateStage,
} from "../../api";
import { GlobalContext } from "../../Context/GlobalContext";
import { toast } from "react-toastify";
import useApplication from "../../hooks/useApplication";
import {
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { statusColors } from "../../Constants/colors";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import EditIco from "../../assets/edit.svg";
import { f } from "../../utility/Formater";
import { useState } from "react";
import { stageList } from "../../utility/Stages";
import uploadIco from "../../assets/edit-stage.png";
import { useEffect } from "react";
import moment from "moment";
import DatePickerComponent from "../../Components/DatePicker";

const theme = createTheme();
const intialStageData = {
  stage: "",
  status: "",
  sub_status: "",
  remarks: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateStage() {
  const { updateDetailState, customersList, panData, clearUpdateState } =
    React.useContext(GlobalContext);

  const navigate = useNavigate();
  const { app_id } = useParams();
  const [updateDetails, setUpdateDetails] = updateDetailState;

  const [doneUpdate, setDoneUpdate] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [application_id, setApplicationId] = React.useState("");
  const [applications, setApplications] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [stageData, setStageData] = useState(intialStageData);

  const handleClickOpen = () => {
    if (
      stageData?.stage === "DISBURSAL" &&
      stageData?.status === "DISBURSED" &&
      stageData?.sub_status === "APPROVED"
    ) {
      setOpenDisbursal(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Disbursal Modal States

  const [openDisbursal, setOpenDisbursal] = React.useState(false);

  const handleOpenDisbursal = () => {
    setOpenDisbursal(true);
  };

  const handleCloseDisbursal = () => {
    setOpenDisbursal(false);
  };

  const validateDisbursalData = async () => {
    let {
      loan_amount,
      interest,
      interest_rate,
      interest_collected,
      processing_rate,
      processing_fee,
      pf_collected,
      other_charges,
      // installment,
      principal_amount,
      hold_back_amount,
      subvention_amount,
      disbursal_amount,
      repayment_amount,
      utr,
      tenure_type,
      payment_basis,
      tenure_value,
      disbursal_date,
    } = updateDetails;

    console.log(updateDetails);

    let payload = {
      loan_amount,
      interest_rate,
      interest_amount: interest,
      interest_collection_type: interest_collected,
      processing_rate,
      processing_charge: processing_fee,
      processing_fee_mode: pf_collected,
      other_charges,
      // installment_amount: installment,
      principal_amount,
      hold_back_amount,
      subvention_amount,
      disbursed_amount: disbursal_amount,
      repayment_amount,
      disbursed_date: disbursal_date,
      utr,
      tenure_type,
      tenure_value,
      payment_basis,
    };

    // console.log(payload);

    let errors = {};
    let valid = true;

    for (let key in payload) {
      if (
        !["subvention_amount", "hold_back_amount", "utr"].includes(key) &&
        [undefined, null, ""].includes(payload[key])
      ) {
        errors = { ...errors, [key]: "Cannot be blank" };
        valid = false;
      }
    }

    if (valid) {
      handleUpdate(payload);
    } else {
      console.log(errors);
      toast.error(
        "All fields are required (except UTR, HOLD BACK and SUBVENTION AMOUNT)"
      );
    }
  };

  const handleUpdate = async (loan_details) => {
    //   // alert("huii");
    handleClose();
    setLoading(true);
    try {
      let payload = {
        stage: stageData?.stage,
        status: stageData?.status,
        sub_status: stageData?.sub_status,
        remarks: stageData?.remarks,
      };

      console.log(loan_details);
      if (loan_details) {
        payload = { ...payload, loan_details };
        handleCloseDisbursal();
      }

      let { data } = await updateStage(payload, application_id);
      if (data?.status) {
        // setCreatedAppId(data?.application_id);
        // setActiveStep(activeStep + 1);
        setStageData(intialStageData);
        toast.success("Updated");
        clearUpdateState();
        getApplicationDetails(application_id);
      }
    } catch (error) {
      toast.error("Some Error");
    }
    setLoading(false);
  };

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

  React.useEffect(() => {
    if (!app_id) {
      getApplications();
    } else {
      setApplicationId(app_id);
    }

    return () => {
      clearUpdateState();
    };
  }, []);

  const { getApplicationDetails, getNbfc } = useApplication();

  React.useEffect(() => {
    if (application_id !== "") {
      getApplicationDetails(application_id, setLoading);
    }
  }, [application_id]);

  // useEffect(() => {
  //   console.log(stageData);
  // }, [stageData]);

  const handleChange = (prop) => (event) => {
    setUpdateDetails({
      ...updateDetails,
      [prop]: event.target.value,
    });
  };

  useEffect(() => {
    if (updateDetails?.current_stage_data?.stage) {
      console.log(updateDetails?.current_stage_data);
      setStageData({
        ...intialStageData,
        stage: updateDetails?.current_stage_data?.stage,
        status: updateDetails?.current_stage_data?.status,
        sub_status: updateDetails?.current_stage_data?.sub_status,
        remarks: updateDetails?.current_stage_data?.remark,
      });
    }
  }, [updateDetails?.application_id]);

  useEffect(() => {
    console.log(stageData);
  }, [stageData]);

  const updateDisbursalData = () => {
    return (
      <div>
        <Dialog
          open={openDisbursal}
          TransitionComponent={Transition}
          keepMounted
          fullWidth={true}
          maxWidth={"md"}
          onClose={handleCloseDisbursal}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Edit Application</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <>
                <Grid item xs={12} sm={12}>
                  <p style={{ color: "gray" }}>Disbursal Details</p>
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
                      <MenuItem value={"UPFRONT_DEDUCTED"}>
                        Upfront Deducted
                      </MenuItem>
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
                      <MenuItem value={"UPFRONT_COLLECTED"}>
                        Upfront Collected
                      </MenuItem>
                      <MenuItem value={"UPFRONT_DEDUCTED"}>
                        Upfront Deducted
                      </MenuItem>
                      <MenuItem value={"PAY_LATER"}>End of tenure</MenuItem>
                    </Select>
                  </FormControl>
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

                {/* <Grid item xs={12} sm={6}>
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
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="principalAmount"
                    name="principalAmount"
                    label="Principal Amount"
                    fullWidth
                    variant="standard"
                    type={"number"}
                    onWheel={(e) => e.target.blur()}
                    value={updateDetails?.principal_amount}
                    onChange={handleChange("principal_amount")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="holdBack"
                    name="holdBack"
                    label="Hold Back Amount"
                    fullWidth
                    variant="standard"
                    type={"number"}
                    onWheel={(e) => e.target.blur()}
                    value={updateDetails?.hold_back_amount}
                    onChange={handleChange("hold_back_amount")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="subAmount"
                    name="subAmount"
                    label="Subvention Amount"
                    fullWidth
                    variant="standard"
                    type={"number"}
                    onWheel={(e) => e.target.blur()}
                    value={updateDetails?.subvention_amount}
                    onChange={handleChange("subvention_amount")}
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
                  <TextField
                    id="utr"
                    name="utr"
                    label="Disbursal UTR"
                    fullWidth
                    variant="standard"
                    type={"text"}
                    value={updateDetails?.utr}
                    onChange={handleChange("utr")}
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
                    id="tenureValue"
                    name="tenureValue"
                    label="Tenure value"
                    fullWidth
                    variant="standard"
                    value={updateDetails?.tenure_value}
                    type={"number"}
                    onWheel={(e) => e.target.blur()}
                    onChange={handleChange("tenure_value")}
                  />
                </Grid>
              </>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDisbursal}>Cancel</Button>
            <Button onClick={validateDisbursalData}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <p className="go-back-btn" onClick={() => navigate("/")}>
          <ArrowBackIcon /> Go back Home
        </p>
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
          >
            {application_id === "" && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} className="p-5 pb-0">
                  <p className="sub-heading">Edit Application</p>
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
                        label="Application Id"
                        variant="standard"
                      />
                    )}
                    onChange={(event, value) => {
                      setApplicationId(value?.application_id || "");
                    }}
                  />
                </Grid>
                <p className="text-center w-100">
                  <img
                    className="mt-5"
                    src={uploadIco}
                    width={200}
                    alt="uploading..."
                  />
                </p>
              </Grid>
            )}

            {isLoading && (
              <>
                <p className="text-center">
                  <CircularProgress />
                </p>
                <p className="text-center">Loading</p>
              </>
            )}

            {updateDetails?.application_id !== "" && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className="p-5 pb-0">
                  <p className="sub-heading">Edit Application</p>
                  <ListItemComp
                    heading={"Application Id:"}
                    text={f(updateDetails?.application_id)}
                  />
                  <ListItemComp
                    heading={"Customer Id:"}
                    text={f(updateDetails?.customer_id)}
                  />
                  <ListItemComp
                    heading={"Customer Name:"}
                    text={f(updateDetails?.customer_name)}
                  />

                  <p className="sub-heading mt-5">Change Status</p>

                  {/* <Grid item xs={12} sm={12} className="mb-3">
                    <Autocomplete
                      options={Object.keys(stageList).map((key) => key)}
                      getOptionLabel={(option) => option?.replaceAll("_", " ")}
                      id="ApplicationId"
                      clearOnBlur
                      value={stageData?.stage}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Stage"
                          variant="standard"
                        />
                      )}
                      onChange={(event, value) => {
                        setStageData({
                          ...stageData,
                          stage: value === null ? "" : value,
                          status: "",
                          sub_status: "",
                        });
                      }}
                    />
                  </Grid> */}

                  {stageData?.stage !== "" && (
                    <>
                      <Grid item xs={12} sm={12} className="mb-3">
                        <Autocomplete
                          options={Object.keys(
                            stageList[stageData.stage]?.STATUS
                          ).map((key) => key)}
                          getOptionLabel={(option) =>
                            option?.replaceAll("_", " ")
                          }
                          value={stageData?.status}
                          id="ApplicationId"
                          clearOnBlur
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Status"
                              variant="standard"
                            />
                          )}
                          onChange={(event, value) => {
                            setStageData({
                              ...stageData,
                              status: value === null ? "" : value,
                            });
                          }}
                        />
                      </Grid>
                      {stageList[stageData.stage]?.SUB_STATUS && (
                        <Grid item xs={12} sm={12} className="mb-3">
                          <Autocomplete
                            options={Object.keys(
                              stageList[stageData.stage]?.SUB_STATUS
                            ).map((key) => key)}
                            getOptionLabel={(option) => option}
                            value={stageData?.sub_status}
                            id="ApplicationId"
                            clearOnBlur
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Sub-status"
                                variant="standard"
                              />
                            )}
                            onChange={(event, value) => {
                              setStageData({
                                ...stageData,
                                sub_status: value === null ? "" : value,
                              });
                            }}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12} sm={12} className="mt-4">
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="Remarks"
                          multiline
                          rows={4}
                          value={stageData?.remarks}
                          onChange={(e) => {
                            setStageData({
                              ...stageData,
                              remarks: e.target.value,
                            });
                          }}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} className="p-5">
                  <p className="text-end mb-5">
                    <Button
                      className="w-75"
                      variant="outlined"
                      onClick={() => {
                        clearUpdateState();
                        setStageData(intialStageData);
                        setApplicationId("");
                      }}
                    >
                      Select Another Application
                    </Button>
                  </p>

                  <ListItemComp
                    heading={"Current Stage:"}
                    text={f(updateDetails?.current_stage_data?.stage)}
                  />
                  <ListItemComp
                    heading={"Current Status:"}
                    text={f(updateDetails?.current_stage_data?.status)}
                  />
                  <ListItemComp
                    heading={"Sub-status:"}
                    text={f(updateDetails?.current_stage_data?.sub_status)}
                  />
                  <ListItemComp
                    heading={"Remarks:"}
                    text={f(updateDetails?.current_stage_data?.remark)}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} className="me-2" />
                        Updating
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          className="me-2"
                          onClick={handleClickOpen}
                          disabled={
                            stageData?.status === "" ||
                            stageData?.sub_status === "" ||
                            stageData?.stage === ""
                          }
                        >
                          Save Changes
                        </Button>
                        <Button
                          onClick={() => {
                            setStageData(intialStageData);
                            clearUpdateState();
                            setApplicationId("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Container>
      </ThemeProvider>

      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirm Action"}</DialogTitle>
          <DialogContent>
            <p>
              You are about to edit the details of application :{" "}
              <b>{updateDetails?.application_id}</b>. Are you sure to continue ?
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleUpdate()}>Continue</Button>
          </DialogActions>
        </Dialog>
      </div>

      {updateDisbursalData()}
    </>
  );
}

const ListItemComp = ({ icon, heading, text }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon className="list-key">
        {
          <span>
            {icon && icon}
            {heading}
          </span>
        }
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontSize: "15px" }}
        className="list-value"
        primary={text}
      />
    </ListItem>
  );
};

import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import "./Scheduler.css";
import DatePickerComponent from "../../Components/DatePicker";
import { useState } from "react";
import useCalculate from "../../utility/Calculate";
import { useEffect } from "react";
import ScheduleViewer from "./ScheduleViewer";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Scheduler = () => {
  const [values, setValues] = useState({
    loanAmt: "",
    interest: "",
    tenure: "",
    tenureType: "month",
    date: "",
  });
  // const [values, setValues] = useState({
  //   loanAmt: "100000",
  //   interest: "18",
  //   tenure: "12",
  //   tenureType: "month",
  //   date: "10/07/2022",
  // });

  const navigate = useNavigate();
  const { generateSchedule } = useCalculate();

  const handleChange = (prop) => (event) => {
    if (event.target.value !== "" && !/^\d+$/.test(event.target.value)) {
      return false;
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCalculate = () => {
    if (isValid()) {
      generateSchedule(values);
    } else {
      toast.error("All fields are Mandatory");
    }
  };

  const isValid = () => {
    for (let key in values) {
      if (values[key].length <= 0) return false;
    }

    return true;
  };

  return (
    <>
      <div className="wrapper-center">
        <div className="calculate-form">
          <p
            className="go-back-btn"
            onClick={() => navigate("/")}
            style={{ marginTop: 0, marginLeft: 0 }}
          >
            <ArrowBackIcon /> Go back Home
          </p>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="loan-amount">
              Loan Amount <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Input
              id="loan-amount"
              value={values.loanAmt}
              onChange={handleChange("loanAmt")}
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="interest-rate">
              Interest Rate <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Input
              id="interest-rate"
              value={values.interest}
              onChange={(e) => {
                setValues({
                  ...values,
                  interest: e.target.value,
                });
              }}
              startAdornment={
                <InputAdornment position="start">%</InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Tenure <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <div className="d-flex">
              <Input
                id="tenure"
                value={values.tenure}
                onChange={handleChange("tenure")}
                startAdornment={
                  <InputAdornment position="start">
                    <QueryBuilderIcon sx={{ fontSize: 16 }} />
                  </InputAdornment>
                }
              />

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                className="ms-3"
                onChange={(e) => {
                  setValues({ ...values, tenureType: e.target.value });
                }}
                defaultValue="month"
              >
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  label="Months"
                />
                <FormControlLabel
                  value="day"
                  // disabled
                  control={<Radio />}
                  label="Days"
                />
              </RadioGroup>
            </div>
          </FormControl>

          <DatePickerComponent
            text={"Disbursal Date"}
            defaultValue={
              values?.date !== "" && moment(values?.date).format("DD/MM/YYYY")
            }
            onChange={(date) => {
              setValues({ ...values, date });
            }}
          />

          <Button
            variant="contained"
            className={"mt-3 calculate-btn"}
            onClick={handleCalculate}
          >
            Generate Schedule
          </Button>
        </div>
      </div>
      <ScheduleViewer />
    </>
  );
};

export default Scheduler;

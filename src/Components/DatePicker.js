import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import moment from "moment/moment";
import React, { useState } from "react";
import { DatePicker } from "react-responsive-datepicker";
import "react-responsive-datepicker/dist/index.css";
import DateRangeIcon from "@mui/icons-material/DateRange";

const DatePickerComponent = ({
  onChange,
  text,
  defaultValue,
  required,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <>
      <FormControl fullWidth variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">
          {text}
          {required && <span style={{ color: "red" }}>*</span>}
        </InputLabel>
        <Input
          autoComplete="off"
          id="standard-adornment-amount"
          value={defaultValue ? defaultValue : ""}
          // onChange={handleChange("amount")}
          onClick={() => {
            setIsOpen(true);
          }}
          startAdornment={
            <InputAdornment position="start">
              <DateRangeIcon sx={{ fontSize: 16 }} />
            </InputAdornment>
          }
        />
        {/* <span style={{ color: "red", fontSize:"10px" }}>{error}</span> */}
      </FormControl>

      <div className={`date-picker-${isOpen && "show"}`}>
        <DatePicker
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValue={new Date()}
          minDate={new Date(1940, 10, 10)}
          //   maxDate={new Date(2023, 0, 10)}
          headerFormat="DD, MM dd"
          onChange={(date) => {
            setSelected(date);
            onChange && onChange(date);
          }}
        />
      </div>
    </>
  );
};

export default DatePickerComponent;

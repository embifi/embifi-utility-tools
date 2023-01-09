// import * as React from "react";
import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
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

export default function CoApplicant({ setActiveStep }) {
  const { anchorState, customersList, panData } =
    React.useContext(GlobalContext);

  const [anchorDetails, setAnchorDetails] = anchorState;

  const [mobile, setMobile] = useState([{ mobileNo: "" }]);
  const [address, setAddress] = useState([{ addressInp: "" }]);

  useEffect(() => {
    let mobileArray = [];
    mobile.forEach((x) => {
      mobileArray.push(x.mobileNo);
    });
    setAnchorDetails({
      ...anchorDetails,
      mobile: mobileArray,
    });
  }, [mobile]);

  useEffect(() => {
    let addressArray = [];
    address.forEach((x) => {
      addressArray.push(x.addressInp);
    });
    setAnchorDetails({
      ...anchorDetails,
      address: addressArray,
    });
  }, [address]);

  const handleMobileNumber = (event, index) => {
    let { value } = event.target;
    let temp = [...mobile];
    temp[index].mobileNo = value;
    setMobile(temp);
  };

  const handleAddress = (event, index) => {
    let { value } = event.target;
    let temp = [...address];
    temp[index].addressInp = value;
    setAddress(temp);
  };

  const handleAddrAddClick = (e) => {
    e.preventDefault();
    setAddress([...address, { addressInp: "" }]);
  };

  const handleMobAddClick = (e) => {
    e.preventDefault();
    setMobile([...mobile, { mobileNo: "" }]);
  };

  const handleMobDelClick = (event, index) => {
    // e.preventDefault();
    if (mobile.length === 1) {
      return;
    }
    const value = mobile[index];
    setMobile((current) => current.filter((item) => item !== value));
  };

  const handleAddrDelClick = (event, index) => {
    // e.preventDefault();
    if (address.length === 1) {
      return;
    }
    const value = address[index];
    setAddress((current) => current.filter((item) => item !== value));
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <>
          {/* <Grid item xs={12} sm={6}> */}
          {mobile.map((c, index) => {
            return (
              <Grid item xs={12} sm={6}>
                <TextField
                  key={index}
                  // required
                  fullWidth
                  variant="standard"
                  sx={{ mt: 2 }}
                  size="small"
                  id="phone"
                  label="Mobile no."
                  type="number"
                  value={c.mobileNo}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={(event) => {
                          handleMobDelClick(event, index);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                  onChange={(event) => {
                    if (event.target.value.length > 10) {
                      return;
                    } else {
                      handleMobileNumber(event, index);
                    }
                  }}
                />
              </Grid>
            );
          })}
          {/* </Grid> */}

          <Grid
            style={{
              marginTop: "36px",
            }}
            item
            xs={12}
            sm={6}
          >
            <Button
              style={{
                borderRadius: "10px",
                backgroundColor: "#6C757D",
                color: "white",
                ":hover": {
                  bgcolor: "#6F32BE",
                  color: "white",
                },
              }}
              onClick={handleMobAddClick}
            >
              + add
            </Button>
          </Grid>
          <Grid item xs={12}>
            {address.map((c, index) => {
              return (
                <TextField
                  key={index}
                  size="small"
                  fullWidth
                  // required
                  id="address"
                  label="Address"
                  name="address"
                  value={c.addressInp}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={(event) => {
                          handleAddrDelClick(event, index);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  }}
                  onChange={(event) => handleAddress(event, index)}
                  sx={{
                    mt: 2,
                  }}
                />
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                borderRadius: "10px",
                backgroundColor: "#6C757D",
                color: "white",
                ":hover": {
                  bgcolor: "#6F32BE",
                  color: "white",
                },
              }}
              onClick={handleAddrAddClick}
            >
              + add
            </Button>
          </Grid>
        </>
      </Grid>
    </React.Fragment>
  );
}

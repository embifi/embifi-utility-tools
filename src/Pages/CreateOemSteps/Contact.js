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
  const { oemState, customersList, panData } = React.useContext(GlobalContext);

  const [oemDetails, setOemDetails] = oemState;
  // const [mobile, setMobile] = useState([{ mobileNo: "" }]);
  const [contact, setContact] = useState([
    { name: "", mobile_number: "", email: "", position: "" },
  ]);

  useEffect(() => {
    // let mobileArray = [];
    // mobile.forEach((x) => {
    //   mobileArray.push(x.mobileNo);
    // });
    contact.forEach((contacts) => {
      contacts.mobile_number = +contacts.mobile_number;
    });
    // console.log(contact);
    setOemDetails({
      ...oemDetails,
      contact: contact,
    });
  }, [contact]);

  const handleContactAddClick = (e) => {
    e.preventDefault();
    setContact([
      ...contact,
      { name: "", mobile_number: "", email: "", position: "" },
    ]);
  };

  // useEffect(() => {
  //   let addressArray = [];
  //   address.forEach((x) => {
  //     addressArray.push(x.addressInp);
  //   });
  //   setAnchorDetails({
  //     ...anchorDetails,
  //     address: addressArray,
  //   });
  // }, [address]);

  // const handleMobileNumber = (event, index) => {
  //   let { value } = event.target;
  //   let temp = [...mobile];
  //   temp[index].mobileNo = value;
  //   setMobile(temp);
  // };

  // const handleAddress = (event, index) => {
  //   let { value } = event.target;
  //   let temp = [...address];
  //   temp[index].addressInp = value;
  //   setAddress(temp);
  // };

  // const handleMobAddClick = (e) => {
  //   e.preventDefault();
  //   setMobile([...mobile, { mobileNo: "" }]);
  // };

  // const handleMobDelClick = (event, index) => {
  //   // e.preventDefault();
  //   if (mobile.length === 1) {
  //     return;
  //   }
  //   const value = mobile[index];
  //   setMobile((current) => current.filter((item) => item !== value));
  // };

  // const handleAddrDelClick = (event, index) => {
  //   // e.preventDefault();
  //   if (address.length === 1) {
  //     return;
  //   }
  //   const value = address[index];
  //   setAddress((current) => current.filter((item) => item !== value));
  // };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <>
          <Grid item xs={12} sm={12}>
            <InputLabel id="demo-simple-select-standard-label">
              Contact
            </InputLabel>
          </Grid>
          {/* <Grid item xs={12} sm={12}> */}
          {contact.map((c, index) => {
            return (
              <>
                {/* <Grid
                  sx={{
                    mt: 2,
                  }}
                  item
                  xs={12}
                  sm={12}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Address {index + 1}
                  </InputLabel>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    // autoComplete="email"
                    variant="standard"
                    value={c?.name}
                    onChange={(event) => {
                      let { value } = event.target;
                      let temp = [...contact];
                      temp[index].name = value;
                      setContact(temp);
                    }}
                    // onChange={handleChange("brand_name")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    key={index}
                    // required
                    fullWidth
                    variant="standard"
                    // sx={{ mt: 2 }}
                    size="small"
                    id="phone"
                    label="Mobile no."
                    type="number"
                    value={c.mobile_number === 0 ? "" : c.mobile_number}
                    // InputProps={{
                    //   endAdornment: (
                    //     <IconButton
                    //       onClick={(event) => {
                    //         handleMobDelClick(event, index);
                    //       }}
                    //     >
                    //       <ClearIcon />
                    //     </IconButton>
                    //   ),
                    // }}
                    onChange={
                      (event) => {
                        if (event.target.value.length > 10) {
                          // console.log("extra");
                          return;
                        }
                        // else if (event.target.value === "e") {
                        //   return;
                        // }
                        else {
                          let { value } = event.target;
                          // console.log(value);
                          let temp = [...contact];
                          temp[index].mobile_number = value;
                          // console.log(contact);
                          setContact(temp);
                        }
                      }
                      // const {value}=event.target;
                      // if(value.length===10){
                      //   console.log('value ',event.target.value)
                      // }
                    }
                    // }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                    value={c?.email}
                    onChange={(event) => {
                      let { value } = event.target;
                      let temp = [...contact];
                      temp[index].email = value;
                      setContact(temp);
                    }}
                  />
                </Grid>

                <Grid
                  sx={{
                    mb: 3,
                  }}
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    // required
                    id="position"
                    name="position"
                    // type={"number"}
                    label="Position"
                    fullWidth
                    // autoComplete="email"
                    variant="standard"
                    value={c?.position}
                    onChange={(event) => {
                      let { value } = event.target;
                      let temp = [...contact];
                      temp[index].position = value;
                      setContact(temp);
                    }}
                  />
                </Grid>
              </>
            );
          })}
          <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={handleContactAddClick}
              // disabled={address.length <= 1 ? true : false}
              sx={{ mt: 3, ml: 1 }}
            >
              ADD CONTACT
            </Button>
          </Grid>
        </>
      </Grid>
    </React.Fragment>
  );
}

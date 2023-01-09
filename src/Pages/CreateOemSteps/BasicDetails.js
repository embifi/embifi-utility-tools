import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import DatePickerComponent from "../../Components/DatePicker";
import { FormLabel } from "react-bootstrap";
import { GlobalContext } from "../../Context/GlobalContext";
import style from "../CreateAnchorSteps/AnchorDetails.css";
import moment from "moment/moment";
import { toast } from "react-toastify";

export default function BasicDetails({ setActiveStep }) {
  const { oemState, emailState, panData } = React.useContext(GlobalContext);

  const [oemDetails, setOemDetails] = oemState;
  const [isEmailVerified, setIsEmailVerified] = emailState;

  const [falseEmail, setFalseEmail] = useState(false);
  // const [emailValidated, setEmailValidated] = useState(false);
  const [address, setAddress] = useState([
    { address_type: "", pincode: "", address: "" },
  ]);

  const [firmType, setFirmType] = useState("");

  // const handleNumberChange = (prop) => (event) => {
  //   if (event.target.value !== "" && !/^\d+$/.test(event.target.value)) {
  //     return false;
  //   }
  //   setOemDetails({
  //     ...oemDetails,
  //     [prop]: event.target.value,
  //   });
  // };

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(oemDetails?.email) === false) {
      setFalseEmail(true);
      setIsEmailVerified(false);
      // return false;
    } else {
      // setEmailValidated(true);
      setFalseEmail(false);
      setIsEmailVerified(true);

      // return true;
    }
  };

  useEffect(() => {
    setOemDetails({
      ...oemDetails,
      addresses: address,
    });
  }, [address]);

  // useEffect(() => {
  //   console.log(oemDetails);
  // }, [oemDetails]);

  const handleAddrAddClick = (e) => {
    e.preventDefault();
    setAddress([...address, { address_type: "", pincode: "", address: "" }]);
  };

  const handleEmailChange = (event) => {
    // const value = event.target.value;
    const { value } = event.target;

    setOemDetails({ ...oemDetails, email: value });
    // emailValidation(value);
  };

  useEffect(() => {
    if (oemDetails?.email !== "") {
      emailValidation();
    }
  }, [oemDetails?.email]);

  const handleChange = (prop) => (event) => {
    setOemDetails({
      ...oemDetails,
      [prop]: event?.target?.value,
    });
  };

  // const handleChange2 = (event) => {
  //   const { name, value } = event.target;
  //   setOemDetails({
  //     ...oemDetails,
  //     [name]: value,
  //   });
  // };

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
      {/* {falseEmail ? (
        <InputLabel
          sx={{
            color: "red",
          }}
          required
          id="demo-simple-select-label"
        >
          Email is not valid
        </InputLabel>
      ) : (
        ""
      )} */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="brand_name"
            name="brand_name"
            label="Brand Name"
            fullWidth
            // autoComplete="email"
            variant="standard"
            value={oemDetails?.brand_name}
            onChange={handleChange("brand_name")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="company_name"
            name="company_name"
            // type={"number"}
            label="Company Name"
            fullWidth
            // autoComplete="email"
            variant="standard"
            value={oemDetails?.company_name}
            onChange={handleChange("company_name")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            //  falseEmail &&
            //     sx={{
            //       color: falseEmail ? "red" : "green",
            //     }}
            //     }
            // required
            id="email"
            name="email"
            label={
              falseEmail
                ? // <InputLabel
                  //   sx={{
                  //     color: "red",
                  //   }}
                  //   required
                  //   id="demo-simple-select-label"
                  // >
                  "Email is not valid"
                : // </InputLabel>
                  "Email"
            }
            error={falseEmail ? true : false}
            // helperText="email is not valid"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={oemDetails?.email}
            onChange={handleChange("email")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="website_link"
            name="website_link"
            // type={"number"}
            label="Website Link"
            fullWidth
            // autoComplete="email"
            variant="standard"
            value={oemDetails?.website_link}
            onChange={handleChange("website_link")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel required id="demo-simple-select-standard-label">
              Firm Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={oemDetails?.firm_type}
              // onChange={(event) => {
              //   let { value } = event.target;
              //   let temp = [...address];
              //   temp[index].address_type = value;
              //   setAddress(temp);
              // }}
              onChange={(event) => {
                let { value } = event?.target;
                // let temp = [...address];
                // temp[index].address_type = value;
                // setAddress(temp);
                setOemDetails({
                  ...oemDetails,
                  firm_type: value,
                });
              }}
              // onChange={(e) => {
              //   setOemDetails({
              //     ...oemDetails,
              //     firm_type: e?.target?.value,
              //   });
              // setFirmType(e.target.value);
              // }}
              // onChange={handleChange("firm_type")}
            >
              <MenuItem value={"PROPRIETORSHIP"}>Proprietorship</MenuItem>
              <MenuItem value={"PARTNERSHIP"}>Partnership</MenuItem>
              <MenuItem value={"LIMITED LIABILITY PARTNERSHIP"}>
                Limited Liability Partnership (LLP)
              </MenuItem>
              <MenuItem value={"PRIVATE LIMITED"}>
                Private Limited (Pvt Ltd)
              </MenuItem>
              <MenuItem value={"HUF"}>HUF</MenuItem>
              <MenuItem value={"PUBLIC LIMITED"}>Public Limited</MenuItem>
            </Select>
          </FormControl>

          {/* <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={firmType}
                label="Age"
                onChange={(e) => {
                  setFirmType(e.target.value);
                  // console.log('checking firm type: ', e.target.value)
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="gstin"
            name="gstin"
            // type={"number"}
            label="GSTIN"
            fullWidth
            // autoComplete="email"
            variant="standard"
            value={oemDetails?.gstin}
            onChange={handleChange("gstin")}
          />
        </Grid>

        <>
          <Grid item xs={12} sm={12}>
            <InputLabel required id="demo-simple-select-standard-label">
              Addresses
            </InputLabel>
          </Grid>
          {/* <Grid item xs={12} sm={12}> */}
          {address.map((c, index) => {
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
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Address Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      defaultValue={`${c?.address_type}`}
                      onChange={(event) => {
                        let { value } = event.target;
                        let temp = [...address];
                        temp[index].address_type = value;
                        setAddress(temp);
                      }}
                      // onChange={(event) => handleAddress(event, index)}

                      // onChange={(e) => {
                      //   setOemDetails({
                      //     ...oemDetails,
                      //     firm_type: e.target?.value,
                      //   });
                      // }}
                    >
                      <MenuItem value={"FACTORY"}>Factory Address</MenuItem>
                      <MenuItem value={"OFFICE"}>Office Address</MenuItem>
                      <MenuItem value={"WAREHOUSE"}>Warehouse Address</MenuItem>
                      <MenuItem value={"OTHER"}>Other Address</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    // required
                    id="pincode"
                    name="pincode"
                    // type={"number"}
                    label="Pincode"
                    fullWidth
                    // autoComplete="email"
                    variant="standard"
                    value={c?.pincode}
                    onChange={(event) => {
                      let { value } = event.target;
                      let temp = [...address];
                      temp[index].pincode = value;
                      setAddress(temp);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    // required
                    id="address"
                    name="address"
                    // type={"number"}
                    label="Address"
                    fullWidth
                    // autoComplete="email"
                    variant="standard"
                    value={c?.address}
                    onChange={(event) => {
                      let { value } = event.target;
                      let temp = [...address];
                      temp[index].address = value;
                      setAddress(temp);
                    }}
                  />
                </Grid>
              </>
              // <Grid item xs={12} sm={6}>
              //   <TextField
              //     key={index}
              //     // required
              //     fullWidth
              //     variant="standard"
              //     sx={{ mt: 2 }}
              //     size="small"
              //     id="phone"
              //     label="Mobile no."
              //     type="number"
              //     value={c.address_type}
              //     // InputProps={{
              //     //   endAdornment: (
              //     //     <IconButton
              //     //       onClick={(event) => {
              //     //         handleMobDelClick(event, index);
              //     //       }}
              //     //     >
              //     //       <ClearIcon />
              //     //     </IconButton>
              //     //   ),
              //     // }}
              //     onChange={(event) => {
              //       if (event.target.value.length > 10) {
              //         return;
              //       } else {
              //         // handleMobileNumber(event, index);
              //       }
              //     }}
              //   />
              // </Grid>
            );
          })}

          <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={handleAddrAddClick}
              // disabled={address.length <= 1 ? true : false}
              sx={{ mt: 3, ml: 1 }}
            >
              ADD ADDRESS
            </Button>
          </Grid>
          {/* </div> */}
        </>
      </Grid>
    </React.Fragment>
  );
}

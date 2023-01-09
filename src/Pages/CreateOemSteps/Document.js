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

// import Re  act from 'react';
// import Button from "@material-ui/core/Button";
// import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import IconButton from "@material-ui/core/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function CoApplicant({ setActiveStep }) {
  const { oemState, emailState, panData } = React.useContext(GlobalContext);

  const [oemDetails, setOemDetails] = oemState;

  const [mobile, setMobile] = useState([{ mobileNo: "" }]);
  const [address, setAddress] = useState([{ addressInp: "" }]);

  const [anotherDocument, setAnotherDocument] = useState([
    { document_name: "", document: "" },
  ]);

  useEffect(() => {
    let obj = {};
    anotherDocument.forEach((x) => {
      if (x.document_name !== "" && x.document !== "") {
        obj[x.document_name] = x.document;
      }
    });
    // let mobileArray = [];
    // mobile.forEach((x) => {
    //   mobileArray.push(x.mobileNo);
    // });
    setOemDetails({
      ...oemDetails,
      another_document: obj,
    });
  }, [anotherDocument]);

  const handleDocumentAddClick = (e) => {
    e.preventDefault();
    setAnotherDocument([
      ...anotherDocument,
      { document_name: "", document: "" },
    ]);
  };

  const handleFileChange = (prop) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const fileSize = file.size;
    if (fileSize > 90000000) {
      event.target.value = "";
      alert("file size is more then" + 90 + " MB");
      return false;
    }
    reader.onloadend = () => {
      const base64String = reader.result;
      // .replace("data:", "")
      // .replace(/^.+,/, "");

      setOemDetails({
        ...oemDetails,
        [prop]: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6}>
          <Grid
            sx={{
              mb: 1,
            }}
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-standard-label">
              GSTIN
            </InputLabel>
          </Grid>
          <Grid
            sx={{
              mb: 4,
            }}
            item
            xs={12}
            sm={6}
          >
            <input
              data-max-size="2048"
              onChange={handleFileChange("gstin_certificate")}
              type="file"
              accept=".jpg,.pdf,.doc,.png,.jpeg"
              id="gstin_certificate"
              name="gstin_certificate"
            />
          </Grid>
        </Grid>
        <Grid xs={12} sm={6}>
          <Grid
            sx={{
              mb: 1,
            }}
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-standard-label">
              ICAT CERTIFICATE
            </InputLabel>
          </Grid>
          <Grid
            sx={{
              mb: 4,
            }}
            item
            xs={12}
            sm={6}
          >
            <input
              data-max-size="2048"
              onChange={handleFileChange("icat_certificate")}
              type="file"
              accept=".jpg,.pdf,.doc,.png,.jpeg"
              // accept="image/png, image/jpeg"
              id="icat_certificate"
              name="icat_certificate"
            />
          </Grid>
        </Grid>

        <Grid xs={12} sm={6}>
          <Grid
            sx={{
              mb: 1,
            }}
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-standard-label">
              FINANCIAL STATEMENT
            </InputLabel>
          </Grid>
          <Grid
            sx={{
              mb: 4,
            }}
            item
            xs={12}
            sm={6}
          >
            <input
              data-max-size="2048"
              onChange={handleFileChange("financial_statement")}
              type="file"
              accept=".jpg,.pdf,.doc,.png,.jpeg"
              id="financial_statement"
              name="financial_statement"
            />
          </Grid>
        </Grid>

        <Grid xs={12} sm={6}>
          <Grid
            sx={{
              mb: 1,
            }}
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-standard-label">
              BRAND LOGO PICTURE
            </InputLabel>
          </Grid>
          <Grid
            sx={{
              mb: 4,
            }}
            item
            xs={12}
            sm={6}
          >
            <input
              data-max-size="2048"
              onChange={handleFileChange("brand_logo_picture")}
              type="file"
              accept=".jpg,.pdf,.doc,.png,.jpeg"
              id="brand_logo_picture"
              name="brand_logo_picture"
            />
          </Grid>
        </Grid>

        <Grid xs={12} sm={6}>
          <Grid
            sx={{
              mb: 1,
            }}
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-standard-label">
              BANK STATEMENT
            </InputLabel>
          </Grid>
          <Grid
            sx={{
              mb: 4,
            }}
            item
            xs={12}
            sm={6}
          >
            <input
              data-max-size="2048"
              onChange={handleFileChange("bank_statement")}
              type="file"
              accept=".jpg,.pdf,.doc,.png,.jpeg"
              id="bank_statement"
              name="bank_statement"
            />
          </Grid>
        </Grid>

        <Grid xs={12} sm={6}>
          <Grid
            sx={{
              mb: 1,
            }}
            item
            xs={12}
            sm={6}
          >
            <InputLabel id="demo-simple-select-standard-label">
              CHEQUE
            </InputLabel>
          </Grid>
          <Grid
            sx={{
              mb: 4,
            }}
            item
            xs={12}
            sm={6}
          >
            <input
              data-max-size="2048"
              onChange={handleFileChange("cheque")}
              type="file"
              accept=".jpg,.pdf,.doc,.png,.jpeg"
              id="cheque"
              name="cheque"
            />
          </Grid>
        </Grid>

        <Grid
          sx={{
            mt: 7,
          }}
          xs={12}
        >
          Add Another Documents
        </Grid>
        <Grid container xs={12}>
          {anotherDocument.map((c, index) => {
            return (
              <>
                <Grid
                  sx={{
                    marginBottom: {
                      xs: "10px",
                      sm: "22px",
                    },
                    marginRight: {
                      xs: 0,
                      sm: "60px",
                    },
                  }}
                  item
                  xs={12}
                  sm={5}
                >
                  <TextField
                    id="document_name"
                    name="document_name"
                    // type={"number"}
                    label="Document Name"
                    fullWidth
                    // autoComplete="email"
                    variant="standard"
                    value={oemDetails?.another_document?.[index]?.document_name}
                    onChange={(event) => {
                      let { value } = event.target;
                      let temp = [...anotherDocument];
                      temp[index].document_name = value;
                      setAnotherDocument(temp);
                    }}
                    // onChange={handleFileChange("document")}
                  />
                </Grid>

                {oemDetails?.another_document?.[index]?.document_name !==
                  "" && (
                  <Grid
                    sx={{
                      mt: {
                        xs: 0,
                        sm: 2,
                      },
                      // 2,
                    }}
                    item
                    xs={12}
                    sm={6}
                  >
                    <input
                      data-max-size="2048"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        const fileSize = file.size;
                        if (fileSize > 90000000) {
                          event.target.value = "";
                          alert("file size is more then" + 90 + " MB");
                          return false;
                        }
                        reader.onloadend = () => {
                          const base64String = reader.result;
                          // .replace("data:", "")
                          // .replace(/^.+,/, "");
                          let temp = [...anotherDocument];
                          temp[index].document = base64String;
                          setAnotherDocument(temp);
                        };
                        reader.readAsDataURL(file);
                      }}
                      type="file" 
                      accept=".jpg,.pdf,.doc,.png,.jpeg"
                      id="document"
                      name="document"
                    />
                  </Grid>
                )}
              </>
            );
          })}
        </Grid>
        {/* </Grid> */}

        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            disabled={anotherDocument?.[0].document !== "" ? false : true}
            onClick={handleDocumentAddClick}
            // disabled={address.length <= 1 ? true : false}
            sx={{ mt: 3, ml: 1 }}
          >
            ADD DOCUMENT
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

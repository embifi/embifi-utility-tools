import { Button, Grid, Skeleton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { aadhaarOcr } from "../../api";
import CatureUpload from "../../Components/Capture";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AadhaarOcr.css";

const AadhaarOcr = () => {
  const navigate = useNavigate();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [parseData, setParseData] = useState({
    name: "",
    dob: "",
    gender: "",
    uid: "",
    address: "",
    pincode: "",
  });


  const [response, setResponse] = useState(
    "Start Performing OCR by inputing your Aadhaar front and back"
  );

  const handleOcr = async () => {
    try {
      setLoading(true);
      setResponse("Loading.....");
      setStatus("");
      let { data } = await aadhaarOcr({
        front,
        back,
      });

      console.log(data?.status);

      if (data?.status) {
        setResponse(data);
        setParseData({
          ...parseData,
          name: data?.data?.["Name"],
          dob: data?.data?.["DOB"],
          gender: data?.data?.["Gender"],
          uid: data?.data?.["UID"],
          address: data?.data?.["address"],
          pincode: data?.data?.["pincode"],
        });
        setStatus("success");
      }
    } catch (error) {
      setResponse(error?.response?.data);
      setStatus("error");
    }
    setLoading(false);
  };

  // let response = {
  //   status: true,
  //   data: {
  //     Name: "Buddhsen",
  //     DOB: "15/07/1994",
  //     Gender: "Male",
  //     UID: "4235 5769 0783",
  //     address:
  //       "S/O-Nihal Chandra, Gopaipur, Ashokpur,Gonda,Uttar Pradesh-271303",
  //     pincode: "271303",
  //   },
  //   message: "Parsing Successfull",
  // };

  return (
    <Grid container spacing={2} className={"fixed-wrapper"}>
      <Grid item xs={5} className="left-panel">
        <p className="go-back-btn" onClick={() => navigate("/")}>
          <ArrowBackIcon /> Go back Home
        </p>
        <div className="addhaar-wrapper mt-3 p-5">
          <div className="w-100">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <label className="form-label">Aadhaar Front</label>

                <CatureUpload
                  tempState={front}
                  setFile={(val) => {
                    setFront(val);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <label className="form-label">Aadhaar Back</label>

                <CatureUpload
                  tempState={back}
                  setFile={(val) => {
                    setBack(val);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  className="parse-btn"
                  variant="contained"
                  onClick={handleOcr}
                  disabled={isLoading}
                >
                  {isLoading ? "Parsing Data...." : "Parse Aadhaar"}
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={7} className="right-panel">
        <div className="p-5">
          {(status === "success" || isLoading) && (
            <>
              <p className="heading">Parsed Data</p>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  {!isLoading ? (
                    <TextField
                      id="name"
                      name="number"
                      label="Aadhaar Number"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={parseData?.uid}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"100% "}
                      height={50}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={6}>
                  {!isLoading ? (
                    <TextField
                      id="name"
                      name="name"
                      label="Name on Aadhaar"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={parseData?.name}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"100% "}
                      height={50}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={6}>
                  {!isLoading ? (
                    <TextField
                      id="dob"
                      name="name"
                      label="Date of birth"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={parseData?.dob}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"100% "}
                      height={50}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={6}>
                  {!isLoading ? (
                    <TextField
                      id="name"
                      name="gender"
                      label="Gender"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={parseData?.gender}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"100% "}
                      height={50}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  {!isLoading ? (
                    <TextField
                      required
                      id="address"
                      name="address"
                      label="Address"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={parseData?.address}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"100% "}
                      height={50}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={6}>
                  {!isLoading ? (
                    <TextField
                      required
                      id="pincode"
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={parseData?.pincode}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={"100% "}
                      height={50}
                    />
                  )}
                </Grid>
              </Grid>
            </>
          )}
          <p className="heading mt-5">API Response</p>
          <div
            className={`response-table mt-2 ${
              status === "error" && "error-border"
            } ${status === "success" && "success-border"}`}
          >
            <pre>{JSON.stringify(response, undefined, 2)}</pre>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default AadhaarOcr;

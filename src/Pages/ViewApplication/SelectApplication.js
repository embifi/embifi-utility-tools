import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllApplications } from "../../api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import viewIcon from "../../assets/view-application.jpg";

const SelectApplication = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

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

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <p className="go-back-btn-fixed" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <div className="wrapper-center">
        <div className="calculate-form max-height-document bg-white">
          <Grid item xs={12} sm={12}>
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
                // setApplicationId(value?.application_id || "");
                navigate(`/view-application/${value?.application_id}`);
              }}
            />
          </Grid>

          <div className="mt-4">
            <p className="text-center">
              <img src={viewIcon} alt="upload" width={200} />
            </p>
            <p
              className="text-center mb-2"
              style={{ color: "purple", fontSize: 20 }}
            >
              View Application
            </p>
            <p
              className="text-center mb-5"
              style={{ color: "gray", fontSize: 12 }}
            >
              Select an application ID to view details
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectApplication;

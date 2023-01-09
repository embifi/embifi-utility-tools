import React from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

// import "./Scheduler.css";
import { useState } from "react";
import { useEffect } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import DragDrop from "../../Components/DocumentUploader";
import "./Collection.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { setDocumentsArray, documentList } from "../../utility/documentList";
import {
  fetchAllApplications,
  fetchCollectionData,
  findCocustomer,
  updateCollection,
  uploadDocuments,
} from "../../api";
import { ProgressBar } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import uploadIco from "../../assets/upload.jpg";
import uploadAnimation from "../../assets/cloud-upload.gif";
import DatePickerComponent from "../../Components/DatePicker";
import { f } from "../../utility/Formater";
import LoadingOver from "../../Components/Loading";

const Collection = () => {
  const initalState = {
    is_colletion: false,
    payment_amount: "",
    transaction_date: moment().format("DD/MM/YYYY"),
    payment_mode: "Cash",
  };

  const errorsIntial = {
    amount: "",
    date: "",
  };

  const navigate = useNavigate();
  const { app_id } = useParams();

  const [applications, setApplications] = useState([]);
  const [application_id, setApplicationId] = useState(app_id || "");
  const [isLoading, setLoading] = useState(false);
  const [isOverLoading, setOverLoading] = useState(false);

  const [collectionData, setCollectionData] = useState(initalState);
  const [errors, setError] = useState(errorsIntial);

  const handleSubmit = async () => {
    setLoading(true);
    if (isValid()) {
      try {
        let payload = {
          dateMS: dateConvertor(collectionData?.transaction_date),
          edi_amount: Number(collectionData?.installmentAmount),
          txn_amount: Number(collectionData?.payment_amount),
          txn_number: collectionData?.transaction_id,
          payment_mode: collectionData?.payment_mode,
        };

        console.log(payload);

        let { data } = await updateCollection(payload, application_id);
        toast.success("Updated");
        getCollectionData(application_id);
      } catch (error) {
        toast.error("Server error");
      }
    } else {
      // toast.error("Empty Document Found");
    }
    setLoading(false);
  };

  const isValid = () => {
    let valid = true;
    let errorObj = {
      amount: collectionData?.payment_amount === "" ? "Required field" : "",
      date: isNaN(dateConvertor(collectionData?.transaction_date))
        ? "Required field"
        : "",
    };

    console.log(errorObj);

    setError(errorObj);

    for (let key in errorObj) {
      if (errorObj[key].length > 0) {
        return false;
      }
    }

    return valid;
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

  useEffect(() => {
    if (!app_id) {
      getApplications();
    }
  }, []);

  useEffect(() => {
    setCollectionData(initalState);
  }, [application_id]);

  const dateConvertor = (date) => {
    let splitDate = date.split("/");
    let formatted = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    return Number(new Date(formatted));
  };

  const handleChange = (prop) => (event) => {
    setCollectionData({
      ...collectionData,
      [prop]: event.target.value,
    });
  };

  const getCollectionData = async (id) => {
    try {
      setOverLoading(true);
      let { data } = await fetchCollectionData(id);
      const { customerData, loanData } = data;
      setCollectionData({
        ...collectionData,
        is_colletion: true,
        customer_name:
          customerData?.is_corporate !== null && customerData?.is_corporate
            ? customerData?.corporate_pan_details?.name
            : customerData?.pan_details?.name,
        installmentAmount: data?.loanData?.installment_amount,
        nextDueAmount: data?.nextDueAmount,
        nextDueDate: data?.nextDueMS
          ? moment(new Date(data?.nextDueMS)).format("DD/MM/YYYY")
          : "NA",
      });
    } catch (error) {
      setCollectionData({
        ...initalState,
        is_colletion: false,
      });
    }
    setOverLoading(false);
  };

  useEffect(() => {
    if (application_id !== "") {
      setCollectionData(initalState);
      getCollectionData(application_id);
    }
  }, [application_id]);

  useEffect(() => {
    let amount;
    if (collectionData?.nextDueAmount > 0) {
      amount = collectionData?.nextDueAmount;
    } else {
      amount = 0;
    }
    setCollectionData((st) => ({
      ...st,
      payment_amount: amount,
    }));
  }, [collectionData?.nextDueAmount]);

  return (
    <>
      <p className="go-back-btn-fixed" onClick={() => navigate("/")}>
        <ArrowBackIcon /> Go back Home
      </p>
      <div className="wrapper-center">
        <div className="payment-form">
          <Grid item xs={12} sm={12}>
            {!app_id ? (
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
            ) : (
              <div>
                <p className="mb-0">
                  <span style={{ color: "gray" }}>Application ID : </span>
                  {application_id}
                  <CloseIcon
                    className="ms-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/update-collection");
                      setApplicationId("");
                      getApplications();
                    }}
                  />
                </p>
              </div>
            )}
          </Grid>

          {application_id !== "" && collectionData?.is_colletion && (
            <Grid item xs={12} sm={12} className={"mt-4"}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <p>
                    <span className="list-key">Customer name:</span>{" "}
                    {f(collectionData?.customer_name)}
                  </p>
                  <p>
                    <span className="list-key">Installment amount:</span>{" "}
                    {f(collectionData?.installmentAmount, "cur")}
                  </p>
                  <p>
                    <span className="list-key">Due amount:</span>{" "}
                    {f(collectionData?.nextDueAmount, "cur")}
                  </p>
                  <p>
                    <span className="list-key">Due Date:</span>{" "}
                    {f(collectionData?.nextDueDate)}
                  </p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="paycard">
                    <TextField
                      required
                      id="amount"
                      name="amount"
                      label="Payment Amount"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      // inputProps={{ maxLength: 10 }}
                      value={collectionData?.payment_amount || ""}
                      onChange={handleChange("payment_amount")}
                      error={errors?.amount}
                    />
                  </div>
                  <FormControl
                    variant="standard"
                    sx={{ width: "100%", marginTop: "15px" }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Payment mode
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      defaultValue={collectionData?.payment_mode}
                      onChange={handleChange("payment_mode")}
                    >
                      <MenuItem value={"Cash"}>Cash</MenuItem>
                      <MenuItem value={"UPI"}>UPI</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className="mt-2"
                    id="id_ref"
                    name="id_ref"
                    label="Transaction ID/ Ref Number"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={collectionData?.transaction_id || ""}
                    onChange={handleChange("transaction_id")}
                  />
                  <TextField
                    // require
                    className="mt-2"
                    id="utr"
                    name="utr"
                    label="Transaction UTR"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={collectionData?.transaction_utr || ""}
                    onChange={handleChange("transaction_utr")}
                  />
                  <div className="mt-2">
                    <DatePickerComponent
                      text={"Transaction date"}
                      required={true}
                      defaultValue={collectionData?.transaction_date}
                      onChange={(date) => {
                        setCollectionData({
                          ...collectionData,
                          transaction_date: moment(date).format("DD/MM/YYYY"),
                        });
                      }}
                      error={errors?.date}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}

          {application_id !== "" && !collectionData?.is_colletion && (
            <p className="text-center mt-5">No collection Data</p>
          )}

          {application_id !== "" && collectionData?.is_colletion && (
            <Button
              sx={{ color: "white" }}
              className="calculate-btn mt-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : `Pay ${
                    collectionData?.payment_amount == 0
                      ? ""
                      : "  ₹" + collectionData?.payment_amount
                  }`}
            </Button>
          )}
        </div>
      </div>
      {isOverLoading && <LoadingOver />}
    </>
  );
};

export default Collection;

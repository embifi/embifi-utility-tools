import {
  Avatar,
  Button,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import "./ViewApplication.css";

import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import Overview from "./Tabs/Overview";
import zIndex from "@mui/material/styles/zIndex";
import LoanDetails from "./Tabs/LoanDetails";
import Documents from "./Tabs/Documents";
import useApplication from "../../hooks/useApplication";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import { f } from "../../utility/Formater";
import { baseURL, fetchDocuments, getFile } from "../../api";
import CoCustomerDetails from "./Tabs/CoCustomer";
import BankDetails from "./Tabs/BankDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingOver from "../../Components/Loading";

const AllDocumentsInital = {
  customer: [],
  co_customer: [],
  field_investigation: [],
  pre_disbursement: [],
  post_disbursement: [],
  other_documents: [],
  total_count: 0,
};

const ViewApplication = () => {
  const { getApplicationDetails, getNbfc } = useApplication();
  const [value, setValue] = useState(0);
  const { app_id } = useParams();
  const navigate = useNavigate();

  const [customerPhoto, setPhoto] = useState({});
  const [AllDocuments, setAllDocuments] = useState(AllDocumentsInital);
  const [isLoading, setLoading] = useState(false);

  const { updateDetailState, customersList, panData } =
    useContext(GlobalContext);

  const [updateDetails, setUpdateDetails] = updateDetailState;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const getProPic = async (key) => {
  //   let {data} = await getFile(key)
  //   console.log(data);
  // }

  const ListItemComp = ({ icon, text }) => {
    return (
      <ListItem disablePadding>
        <ListItemIcon className="list-icon">{icon}</ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "15px" }}
          className="list-value"
          primary={text}
        />
      </ListItem>
    );
  };

  const getAllDocuments = async () => {
    setLoading(true);
    try {
      let { data } = await fetchDocuments(app_id);
      if (data?.status) {
        let docList = {
          customer: [],
          co_customer: [],
          field_investigation: [],
          pre_disbursement: [],
          post_disbursement: [],
          other_documents: [],
          total_count: 0,
        };

        let docs = data?.data;
        let count = 0;
        for (let key in docs) {
          if (
            [
              "customer_photo",
              "applicant_photo",
              "customer-photo",
              "applicant-photo",
            ].includes(
              key
                ?.replaceAll(/[0-9]/g, "")
                ?.replaceAll("_", " ")
                ?.trim()
                ?.replaceAll(" ", "_")
            )
          ) {
            setPhoto(docs[key]);
          }
          count++;
          if (docs[key]?.category === "customer") {
            docList.customer.push(docs[key]);
          } else if (
            docs[key]?.category === "co-customer" ||
            docs[key]?.category === "co_customer"
          ) {
            docList.co_customer.push(docs[key]);
          } else if (
            docs[key]?.category === "pre_disbursement" ||
            docs[key]?.category === "pre-disbursement"
          ) {
            docList.pre_disbursement.push(docs[key]);
          } else if (
            docs[key]?.category === "post_disbursement" ||
            docs[key]?.category === "post-disbursement"
          ) {
            docList.post_disbursement.push(docs[key]);
          } else if (
            docs[key]?.category === "field_investigation" ||
            docs[key]?.category === "field-investigation"
          ) {
            docList.field_investigation.push(docs[key]);
          } else {
            docList.other_documents.push(docs[key]);
          }
        }

        docList.total_count = count;
        setAllDocuments(docList);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getApplicationDetails(app_id, setLoading);
    getAllDocuments(app_id);
  }, [app_id]);

  return (
    <>
      {/* <style>{``}</style> */}
      <div class="sidebar">
        <p
          className="go-back-btn"
          onClick={() => navigate("/")}
          style={{ marginTop: 0, marginLeft: 0 }}
        >
          <ArrowBackIcon /> Go back Home
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="content-center mt-5">
              <Avatar
                alt={updateDetails?.customer_name}
                src={
                  customerPhoto?.key
                    ? `${baseURL}common/view?key=${customerPhoto?.key}`
                    : ""
                }
                sx={{ width: 120, height: 120 }}
              />
            </div>
            <p className="customer-name">{f(updateDetails?.customer_name)}</p>
            <p className="customer-id">{f(updateDetails?.pan_number)}</p>
          </Grid>
        </Grid>

        <Divider />

        <Grid item xs={12}>
          <p className="customer-info-list mt-2">
            <ListItemComp
              icon={<CallIcon />}
              text={f(updateDetails?.mobile_number)}
            />
            <ListItemComp
              icon={<MailOutlineIcon />}
              text={f(updateDetails?.email)}
            />
            <ListItemComp
              icon={<CalendarMonthIcon />}
              text={f(updateDetails?.dob)}
            />
            <ListItemComp icon={<WcIcon />} text={f(updateDetails?.gender)} />
            <ListItemComp
              icon={<LocationOnIcon />}
              text={f(updateDetails?.residential_address)}
            />

            <Button
              className="edit-btn"
              onClick={() => navigate(`/update-app/${app_id}`)}
            >
              <EditIcon className="edit-icon" /> Edit Application
            </Button>
          </p>
        </Grid>
      </div>

      <div class="content">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "#cccccc",
              position: "fixed",
              width: "100%",
              bgcolor: "white",
              zIndex: 1200,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                style: {
                  color: "purple",
                  backgroundColor: "purple",
                },
              }}
            >
              <Tab
                label="Overview"
                style={{ color: "purple" }}
                {...a11yProps(0)}
                className={"profile-tab"}
              />
              <Tab
                label="Loan Details"
                style={{ color: "purple" }}
                {...a11yProps(1)}
                className={"profile-tab"}
              />
              <Tab
                label={`Documents (${AllDocuments?.total_count})`}
                style={{ color: "purple" }}
                {...a11yProps(2)}
                className={"profile-tab"}
              />
              {updateDetails?.coApplicantExist && (
                <Tab
                  label="Co-Customer Details"
                  style={{ color: "purple" }}
                  {...a11yProps(3)}
                  className={"profile-tab"}
                />
              )}
              <Tab
                label="Bank Details"
                style={{ color: "purple" }}
                {...a11yProps(updateDetails?.coApplicantExist ? 4 : 3)}
                className={"profile-tab"}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Overview />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LoanDetails />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Documents
              AllDocuments={AllDocuments}
              application_id={app_id}
              setLoading={setLoading}
            />
          </TabPanel>
          {updateDetails?.coApplicantExist && (
            <TabPanel value={value} index={3}>
              <CoCustomerDetails />
            </TabPanel>
          )}
          <TabPanel
            value={value}
            index={updateDetails?.coApplicantExist ? 4 : 3}
          >
            <BankDetails />
          </TabPanel>
        </Box>
      </div>

      {isLoading && <LoadingOver extraBlur={true} />}
    </>
  );
};

////////////////////////////////////////////////

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="pt-5"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default ViewApplication;

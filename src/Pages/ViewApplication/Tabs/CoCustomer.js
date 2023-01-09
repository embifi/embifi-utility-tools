import {
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import CreditRiskCard from "../../../Components/CrifCard/CreditCard";
import {
  Exceptional,
  Fair,
  Good,
  NewToCredit,
  Poor,
  VeryGood,
} from "../../../Components/StatusChip";
import { GlobalContext } from "../../../Context/GlobalContext";
import { f, responseFormat, scoreCheckText } from "../../../utility/Formater";

const CoCustomerDetails = () => {
  const { updateDetailState } = useContext(GlobalContext);
  const [updateDetails, setUpdateDetails] = updateDetailState;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="overview-card">
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <p className="sub-heading">Basic Details</p>
                  <ListItemComp
                    heading={"Name:"}
                    text={f(updateDetails?.co_app_customer_name)}
                  />
                  <ListItemComp
                    heading={"Mobile:"}
                    text={f(updateDetails?.co_app_mobile_number)}
                  />
                  <ListItemComp
                    heading={"Email:"}
                    text={f(updateDetails?.co_app_email)}
                  />
                  <ListItemComp
                    heading={"Gender:"}
                    text={f(updateDetails?.co_app_gender)}
                  />
                  <ListItemComp
                    heading={"Income:"}
                    text={f(updateDetails?.co_app_income)}
                  />
                  <ListItemComp
                    heading={"Education:"}
                    text={f(updateDetails?.co_app_education)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <p className="sub-heading">Pan Details</p>
                  <ListItemComp
                    heading={"Name:"}
                    text={f(updateDetails?.co_app_customer_name)}
                  />
                  <ListItemComp
                    heading={"Number:"}
                    text={f(updateDetails?.co_app_pan_number)}
                  />

                  <div className="pe-4">
                    <hr />
                  </div>

                  <p className="sub-heading">Aadhaar Details</p>
                  <ListItemComp
                    heading={"Name:"}
                    text={f(updateDetails?.co_app_aadhaar_name)}
                  />
                  <ListItemComp
                    heading={"UID:"}
                    text={f(updateDetails?.co_app_aadhaar_number)}
                  />
                  <ListItemComp
                    heading={"Gender:"}
                    text={f(updateDetails?.co_app_aadhaar_gender)}
                  />
                  <ListItemComp
                    heading={"Address:"}
                    text={f(updateDetails?.co_app_aadhaar_address)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <p className="sub-heading">Residential Address</p>
                  <ListItemComp
                    heading={"Is Protperty Owned:"}
                    text={f(
                      updateDetails?.co_app_current_residential_owned,
                      "bool"
                    )}
                  />
                  <ListItemComp
                    heading={"City:"}
                    text={f(updateDetails?.co_app_city)}
                  />
                  <ListItemComp
                    heading={"District:"}
                    text={f(updateDetails?.co_app_district)}
                  />
                  <ListItemComp
                    heading={"State:"}
                    text={f(updateDetails?.co_app_state)}
                  />
                  <ListItemComp
                    heading={"Pincode:"}
                    text={f(updateDetails?.co_app_pincode)}
                  />
                  <ListItemComp
                    heading={"Address:"}
                    text={f(updateDetails?.co_app_current_residential_address)}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="overview-card">
            <p className="card-heading">Credit Engine Data</p>
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* <ListItemComp
                    heading={"Eligibility:"}
                    text={f(updateDetails?.co_credit_eligible, "bool")}
                  /> */}
                  <ListItemComp
                    heading={"Score Remark:"}
                    text={scoreCheckText(updateDetails?.co_app_crif_score)}
                  />
                  <ListItemComp
                    heading={"Response:"}
                    text={responseFormat(
                      updateDetails?.co_credit_response,
                      updateDetails?.co_credit_eligible 
                    )}
                  />
                </Grid>

                <Grid item xs={6} className="pb-2">
                  <CreditRiskCard
                    application={{
                      credit_pull: {
                        credit_data: { crif_score: updateDetails?.crif_score },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CoCustomerDetails;

const ListItemComp = ({ icon, heading, text }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon className="list-key">
        {
          <span>
            {icon && icon}
            {heading}
          </span>
        }
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontSize: "15px" }}
        className="list-value"
        primary={text}
      />
    </ListItem>
  );
};

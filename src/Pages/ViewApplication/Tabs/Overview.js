import {
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import CreditRiskCard from "../../../Components/CrifCard/CreditCard";
import { statusColors } from "../../../Constants/colors";
import { GlobalContext } from "../../../Context/GlobalContext";
import { f, responseFormat, scoreCheckText } from "../../../utility/Formater";

const Overview = () => {
  const { updateDetailState, customersList, panData } =
    useContext(GlobalContext);

  const [updateDetails, setUpdateDetails] = updateDetailState;

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={6}>
          <div className="overview-card">
            <p className="card-heading">Application Details</p>
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <ListItemComp
                    heading={"Application ID:"}
                    text={f(updateDetails?.application_id)}
                  />
                  <ListItemComp
                    heading={"Customer ID:"}
                    text={f(updateDetails?.customer_id)}
                  />

                  <ListItemComp
                    heading={"NBFC:"}
                    text={f(updateDetails?.nbfc_id)}
                  />
                  <ListItemComp
                    heading={"Anchor:"}
                    text={f(updateDetails?.anchor_id)}
                  />
                  <ListItemComp
                    heading={"Origin:"}
                    text={f(updateDetails?.origin)}
                  />
                  <ListItemComp
                    heading={"Agent:"}
                    text={f(updateDetails?.agent_id)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <ListItemComp
                    heading={"Creation Date:"}
                    text={f(updateDetails?.start_date)}
                  />
                  <ListItemComp
                    heading={"Last Updated:"}
                    text={f(updateDetails?.last_updated)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <hr />
                  <ListItemComp
                    heading={"Status"}
                    text={
                      <>
                        <span
                          style={{
                            color:
                              statusColors?.[updateDetails?.current_status],
                            border: `1px solid ${
                              statusColors?.[updateDetails?.current_status]
                            }`,
                            padding: "2px 8px",
                            fontSize: "12px",
                            borderRadius: "10px",
                          }}
                        >
                          {updateDetails?.current_status?.toUpperCase()}
                        </span>
                      </>
                    }
                  />
                  <ListItemComp
                    heading={"Remark"}
                    text={responseFormat(updateDetails?.rejected_reason, updateDetails?.embifi_approval)}
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
                  <ListItemComp
                    heading={"Eligibility:"}
                    text={f(updateDetails?.credit_eligible, "bool")}
                  />
                  <ListItemComp
                    heading={"Co-customer Required:"}
                    text={f(updateDetails?.credit_isCocustomer, "bool")}
                  />
                  <ListItemComp
                    heading={"Score Remark:"}
                    text={scoreCheckText(updateDetails?.crif_score)}
                  />
                  <ListItemComp
                    heading={"Response:"}
                    text={responseFormat(
                      updateDetails?.credit_response,
                      updateDetails?.credit_eligible
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

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="overview-card">
            <p className="card-heading">Customer Details</p>
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <p className="sub-heading">Pan Details</p>
                  <ListItemComp
                    heading={"Name:"}
                    text={f(updateDetails?.customer_name)}
                  />
                  <ListItemComp
                    heading={"Number:"}
                    text={f(updateDetails?.pan_number)}
                  />

                  <div className="pe-4">
                    <hr />
                  </div>

                  <p className="sub-heading">Other Details</p>
                  <ListItemComp
                    heading={"Income:"}
                    text={f(updateDetails?.income)}
                  />
                  <ListItemComp
                    heading={"Education:"}
                    text={f(updateDetails?.education)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <p className="sub-heading">Aadhaar Details</p>
                  <ListItemComp
                    heading={"Name:"}
                    text={f(updateDetails?.aadhaar_name)}
                  />
                  <ListItemComp
                    heading={"UID:"}
                    text={f(updateDetails?.aadhaar_number)}
                  />
                  <ListItemComp
                    heading={"Gender:"}
                    text={f(updateDetails?.aadhaar_gender)}
                  />
                  <ListItemComp
                    heading={"Address:"}
                    text={f(updateDetails?.aadhaar_address)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <p className="sub-heading">Residential Address</p>
                  <ListItemComp
                    heading={"Is Protperty Owned:"}
                    text={f(updateDetails?.is_property_owned, "bool")}
                  />
                  <ListItemComp
                    heading={"City:"}
                    text={f(updateDetails?.residential_address_city)}
                  />
                  <ListItemComp
                    heading={"District:"}
                    text={f(updateDetails?.residential_address_district)}
                  />
                  <ListItemComp
                    heading={"State:"}
                    text={f(updateDetails?.residential_address_state)}
                  />
                  <ListItemComp
                    heading={"Pincode:"}
                    text={f(updateDetails?.residential_address_pincode)}
                  />
                  <ListItemComp
                    heading={"Address:"}
                    text={f(updateDetails?.residential_address)}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>


        <Grid item xs={6}>
          <div className="overview-card">
            <p className="card-heading">Basic Loan Details</p>
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <ListItemComp
                    heading={"Loan ID:"}
                    text={f(updateDetails?.loan_id)}
                  />
                  <ListItemComp
                    heading={"Loan Type:"}
                    text={f(updateDetails?.loan_type)}
                  />
                  <ListItemComp
                    heading={"Loan Amount:"}
                    text={f(updateDetails?.loan_amount, "cur")}
                  />
                  <ListItemComp
                    heading={"Tenure:"}
                    text={`${updateDetails?.tenure_value} ${updateDetails?.tenure_type}`}
                  />
                  <ListItemComp
                    heading={"Interest Rate:"}
                    text={f(updateDetails?.interest_rate, "rate")}
                  />
                </Grid>
                <Grid item xs={5}>
                  <ListItemComp
                    heading={"Disbursement Status:"}
                    text={updateDetails?.is_disbursed ? "Disbursed" : "Not Yet"}
                  />
                  <ListItemComp
                    heading={"Disbursed Date:"}
                    text={f(updateDetails?.disbursal_date)}
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

export default Overview;

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

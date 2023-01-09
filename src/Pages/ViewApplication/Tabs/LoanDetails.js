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
import { f } from "../../../utility/Formater";

const LoanDetails = () => {
  const { updateDetailState } = useContext(GlobalContext);
  const [updateDetails, setUpdateDetails] = updateDetailState;

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12}>
          <div className="overview-card">
            {/* <p className="card-heading">Loan Details</p> */}
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ListItemComp
                    heading={"Application ID:"}
                    text={f(updateDetails?.application_id)}
                  />
                  <ListItemComp
                    heading={"Loan ID:"}
                    text={f(updateDetails?.loan_id)}
                  />
                  <hr />
                </Grid>

                <Grid item xs={6}>
                  <ListItemComp
                    heading={"Loan Amount:"}
                    text={f(updateDetails?.loan_amount, "cur")}
                  />
                  <ListItemComp
                    heading={"Principal Amount:"}
                    text={f(updateDetails?.loan_amount, "cur")}
                  />

                  <ListItemComp
                    heading={"Annual Interest Rate:"}
                    text={f(updateDetails?.interest_rate, "rate")}
                  />
                  <ListItemComp
                    heading={"Interest Amount:"}
                    text={f(updateDetails?.interest, "cur")}
                  />
                  <ListItemComp
                    heading={"Interest Collection Type:"}
                    text={f(updateDetails?.interest_collected)}
                  />
                  <ListItemComp
                    heading={"Tenure:"}
                    text={f(
                      updateDetails?.tenure_value &&
                        updateDetails?.tenure_type &&
                        `${updateDetails?.tenure_value} ${updateDetails?.tenure_type}`
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemComp
                    heading={"Disbursal Amount:"}
                    text={f(updateDetails?.disbursal_amount, "cur")}
                  />
                  <ListItemComp
                    heading={"Disbursal Date:"}
                    text={f(updateDetails?.disbursal_date)}
                  />
                  <ListItemComp
                    heading={"Installment Amount:"}
                    text={f(updateDetails?.installment, "cur")}
                  />
                  <ListItemComp
                    heading={"Payment Basis"}
                    text={f(updateDetails?.payment_basis)}
                  />
                  <ListItemComp
                    heading={"Processing Fee Rate"}
                    text={f(updateDetails?.processing_rate, "rate")}
                  />
                  <ListItemComp
                    heading={"Processing Fee"}
                    text={f(updateDetails?.processing_fee, "cur")}
                  />
                  <ListItemComp
                    heading={"PF Collection Type"}
                    text={f(updateDetails?.pf_collected)}
                  />
                  <ListItemComp
                    heading={"Other Charges"}
                    text={f(updateDetails?.other_charges, "cur")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <hr />
                  <ListItemComp
                    heading={"Loan Type:"}
                    text={f(updateDetails?.loan_type)}
                  />
                  {updateDetails?.loan_type === "ERICKLN" && (
                    <>
                      <ListItemComp
                        heading={"Vehicle Model:"}
                        text={f(updateDetails?.vehicle_model)}
                      />
                      <ListItemComp
                        heading={"OEM:"}
                        text={f(updateDetails?.oem_id)}
                      />
                      <ListItemComp
                        heading={"Onroad Price:"}
                        text={f(updateDetails?.vehicle_price_onroad, "cur")}
                      />
                      <ListItemComp
                        heading={"Ex Showroom Price:"}
                        text={f(updateDetails?.vehicle_price_ex, "cur")}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LoanDetails;

const ListItemComp = ({ icon, heading, text }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon className="list-key loan">
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

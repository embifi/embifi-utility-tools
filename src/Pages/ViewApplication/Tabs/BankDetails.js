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

const BankDetails = () => {

  const { updateDetailState } = useContext(GlobalContext);
  const [updateDetails, setUpdateDetails] = updateDetailState;
  
  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12}>
          <div className="overview-card">
            <p className="card-heading">Bank Details</p>
            <div className="card-content">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ListItemComp
                    heading={"ID:"}
                    text={f(updateDetails?.bank_id)}
                  />
                  <ListItemComp
                    heading={"Name:"}
                    text={f(updateDetails?.benificiary_name)}
                  />
                  <ListItemComp
                    heading={"Account No:"}
                    text={f(updateDetails?.account_number)}
                  />

                  <ListItemComp heading={"Bank:"} text={f(updateDetails?.bank_name)} />
                  <ListItemComp heading={"Account Type:"} text={f(updateDetails?.account_type)} />
                  <ListItemComp heading={"IFSC Code:"} text={f(updateDetails?.ifsc_code)} />
                  
                </Grid>
                
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default BankDetails;

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

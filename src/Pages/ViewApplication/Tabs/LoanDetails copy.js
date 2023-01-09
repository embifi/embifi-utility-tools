import {
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import CreditRiskCard from "../../../Components/CrifCard/CreditCard";
import {
  Exceptional,
  Fair,
  Good,
  NewToCredit,
  Poor,
  VeryGood,
} from "../../../Components/StatusChip";

const LoanDetails = () => {
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
                    text={"EMPL000421546664"}
                  />
                  <ListItemComp
                    heading={"Customer ID:"}
                    text={"ECL0000021546664"}
                  />

                  <ListItemComp heading={"NBFC:"} text={"Vani Commercials"} />
                  <ListItemComp heading={"Anchor:"} text={"Vani Commercials"} />
                  <ListItemComp heading={"Origin:"} text={"Vani"} />
                  <ListItemComp heading={"Agent:"} text={"EMB-SOME"} />
                </Grid>
                <Grid item xs={5}>
                  <ListItemComp heading={"Status"} text={"Pending"} />
                  <ListItemComp heading={"Remark"} text={""} />
                  <ListItemComp
                    heading={"Creation Date:"}
                    text={"12/02/2023"}
                  />
                  <ListItemComp heading={"Last Updated:"} text={"12/02/2023"} />
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

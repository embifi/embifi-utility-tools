import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";
import { useEffect } from "react";
import {
  NewToCredit,
  Poor,
  Fair,
  Good,
  VeryGood,
  Exceptional,
  NoCreditData,
} from "../StatusChip";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function CreditRiskCard(props) {
  let navigate = useNavigate();
  // console.log('credit risk: ', props?.credit_risk)

  useEffect(() => {
    console.log(
      "crif score",
      props?.application?.credit_pull?.credit_data?.crif_score
    );
  }, [props]);

  const scoreCheck = (score) => {
    // poor
    if (score < 580)
      return {
        pathColor: "#e0e0e0",
        textColor: "#fff",
        trailColor: "#e0e0e0",
        backgroundColor: "#e0e0e0",
      };
    // fair
    else if (score >= 580 && score <= 669)
      return {
        pathColor: "#FFB200",
        textColor: "#FFB200",
        trailColor: "#FAFBD7",
        backgroundColor: "#FAFBD7",
      };
    // good
    else if (score >= 670 && score <= 739)
      return {
        pathColor: "#3399ff",
        textColor: "#FFF",
        trailColor: "#99ccff",
        backgroundColor: "#99ccff",
      };
    // very good
    else if (score >= 740 && score <= 799)
      return {
        pathColor: "#66cc00",
        textColor: "#66cc00",
        trailColor: "#BAEE87",
        backgroundColor: "#BAEE87",
      };
    // exceptional
    else if (score >= 800)
      return {
        pathColor: "#3b8e24",
        textColor: "#FFF",
        trailColor: "#8abd7d",
        backgroundColor: "#8abd7d",
      };
  };

  

  // useEffect(() => {
  //   console.log((Number(
  //     props?.application?.credit_pull?.credit_data
  //       ?.crif_score
  //   ) / 900) * 100)
  // }, []);

  return (
    <div style={{ minHeight: "100px" }}>
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: 150,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgressbar
          value={
            props?.application?.credit_pull?.credit_data?.crif_score
              ? (Number(
                  props?.application?.credit_pull?.credit_data?.crif_score
                ) /
                  900) *
                100
              : 0
          }
          text={
            props?.application?.credit_pull?.credit_data?.crif_score
              ? props?.application?.credit_pull?.credit_data?.crif_score
              : "NA"
          }
          background={true}
          styles={
            // buildStyles({
            //   pathColor: "#FFB200",
            //   textColor: "#FFB200",
            //   trailColor: "#FAFBD7",
            //   backgroundColor: "#FAFBD7",
            // })

            buildStyles(
              scoreCheck(
                props?.application?.credit_pull?.credit_data?.crif_score
              )
            )
          }
        />
      </div>
    </div>
  );
}

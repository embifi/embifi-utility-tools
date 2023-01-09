import { CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import "./Loading.css"

const LoadingOver = ({text,extraBlur}) => {

  return (
    <div className={`kyc-dialog ${extraBlur && 'extra-blur'}`}>
      <div className="dialog" style={{width:"auto"}}>
        <p className="welcome text-center"><CircularProgress /></p>
        <p className="welcome mt-2">{text? text : "Loading"}</p>
      </div>
    </div>
  );
};

export default LoadingOver;
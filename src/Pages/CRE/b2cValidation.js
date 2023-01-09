import React from "react";
import { useState } from "react";
import {
  // Autocomplete,
  Button,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // Grid,
  // Input,
  // InputAdornment,
  // InputLabel,
  // MenuItem,
  // Radio,
  // RadioGroup,
  // Select,
  TextField,
} from "@mui/material";
import { validateCrifB2C } from "../../api";

export default function B2CValidations() {
  const [isLoading, setIsLoading] = useState(false);
  const [crifResponse, setCrifResponse] = useState("");
  const [responseColor, setResponseColor] = useState("grey")
  const [response, setResponse] = useState("You will get your Output here!!");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let payload = JSON.parse(crifResponse);
      let { data } = await validateCrifB2C(payload);
      console.log(data);

      data?.statusCode === 200 ? setResponseColor("green") : setResponseColor("red");
      setResponse(data?.message)

    } catch (error) {
        setResponse("Check Payload!!!!");
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100vh",
        width: "100vw",
      }}
    >
      <TextField
        style={{ width: "35vw" }}
        placeholder="Enter Crif Response Here"
        value={crifResponse}
        onChange={(e) => setCrifResponse(e.target.value)}
        multiline
        rows={25}
      />
      <Button
        sx={{ color: "white" }}
        className="calculate-btn mt-4"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Run Validation"}
      </Button>

      <TextField
        style={{ width: "35vw", backgroundColor: responseColor, textAlign: "center" }}
        label="Output"
        value={response}
        multiline
      />
    </div>
  );
}

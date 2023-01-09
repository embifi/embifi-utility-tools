import { CreditRemark } from "../Components/StatusChip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";

export const f = (value, type = "text") => {
  if (!value) {
    return <NotAvailable />;
  }
  if (value !== "" || value !== null) {
    if (type === "cur") {
      return "₹ " + Number(value)?.toLocaleString("en-IN");
    } else if (type === "rate") return value + "%";
    else if (type === "bool") {
      if (value)
        return (
          <span>
            <CheckCircleOutlineIcon style={{ fontSize: "17px" }} /> Yes
          </span>
        );
      return (
        <span>
          <BlockIcon style={{ fontSize: "17px" }} /> No
        </span>
      );
    } else return value;
  } else {
    return <NotAvailable />;
  }
};

const NotAvailable = () => {
  return (
    <span
      style={{
        color: "white",
        backgroundColor: "#e8e8e8",
        fontSize: "10px",
        padding: "2px 10px",
        borderRadius: "5px",
      }}
    >
      NA
    </span>
  );
};

export const scoreCheckText = (score) => {
  // new to credit
  if (!score || score === null) return <NotAvailable />;
  if (score < 300)
    return <CreditRemark value={"New to Credit"} color="#e0e0e0" />;
  // poor
  else if (score >= 300 && score < 580)
    return <CreditRemark value={"Poor"} color="#FFB200" />;
  // fair
  else if (score >= 580 && score <= 669)
    return <CreditRemark value={"Fair"} color="#FFB200" />;
  // good
  else if (score >= 670 && score <= 739)
    return <CreditRemark value={"Good"} color="#3399ff" />;
  // very good
  else if (score >= 740 && score <= 799)
    return <CreditRemark value={"Very Good"} color="#66cc00" />;
  // exceptional
  else if (score > 800)
    return <CreditRemark value={"Exceptional"} color="#3b8e24" />;
};

export const responseFormat = (text, status) => {
  if (!text) return <NotAvailable />;
  if (text === "" || text === null) return <NotAvailable />;
  return <span style={{ color: status ? "blue" : "blue" }}>{text}</span>;
};

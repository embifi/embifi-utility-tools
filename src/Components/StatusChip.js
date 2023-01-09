const baseStyle = {
    padding: "5px 20px",
    borderRadius: "20px",
    fontSize: "10px",
}

const DisburseStyle = {
    border: "1px solid green",
    color: "green"
}


const PendingStyle = {
    border: "1px solid #573398",
    color: "#573398"
}

const ApproveStyle = {
    border: "1px solid purple",
    color: "purple"
}

const RejectStyle = {
    border: "1px solid red",
    color: "red"
}


export const Pending = () => {
    return (
        <span style={{ ...baseStyle, ...PendingStyle }}>Pending</span>
    )
}

export const Disbursed = () => {
    return (
        <span style={{ ...baseStyle, ...DisburseStyle }}>Disbursed</span>
    )
}

export const Approved = () => {
    return (
        <span style={{ ...baseStyle, ...ApproveStyle }}>Approved</span>
    )
}

export const Rejected = () => {
    return (
        <span style={{ ...baseStyle, ...RejectStyle }}>Rejected</span>
    )
}

export const Closed = () => {
    return (
        <span style={{ ...baseStyle, ...RejectStyle }}>Closed</span>
    )
}

export const NotAvailable = () => {
    return (
        <span
            style={{
                color: "white",
                // backgroundColor: "#e8e8e8",
                backgroundColor: "#cfcccc",
                fontSize: "10px",
                padding: "2px 10px",
                borderRadius: "5px",
            }}
        >
            NA
        </span>
    );
};

export const CreditRemark = ({value, color}) => {
    return (
        <span
            style={{
                color,
                fontSize: "15px",
                borderRadius: "5px",
            }}
        >
            {value}
        </span>
    );
};


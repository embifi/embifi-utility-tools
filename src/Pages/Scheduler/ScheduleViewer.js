import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DownloadIcon from "@mui/icons-material/Download";
import Slide from "@mui/material/Slide";
import { GlobalContext } from "../../Context/GlobalContext";
import ScheduleTable from "../../Components/Table";
import { Fab, Grid, useRadioGroup } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import "./ScheduleViewer.css";
import { useRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScheduleViewer() {
  const { scheduleState } = React.useContext(GlobalContext);
  const [schedules, setSchedules] = scheduleState;

  const [tableData, setTableData] = useState([]);
  const [active, setActive] = useState("EDI");
  const [scroll, setScroll] = useState("Bottom");

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setSchedules((st) => ({ ...st, status: false, edi: [], emi: [] }));
    setActive("EDI");
    // setScroll("Top");
  };

  useEffect(() => {
    setTableData(schedules[active.toLowerCase()]);
  }, [schedules]);

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const handleDownload = (e) => {
    e.preventDefault();

    // Headers for each column
    let headers = [`SL NO,Due Date,${active},Principal,Interest,O/s Principal`];

    // Convert users data to a csv
    let usersCsv = schedules[active.toLowerCase()].reduce((acc, row) => {
      acc.push(
        [
          row["SL NO"],
          row["Due Date"],
          row[active],
          row["Principal"],
          row["Interest"],
          row["O/s Principal"],
        ].join(",")
      );
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join("\n"),
      fileName: `Schedule(${active})-${
        schedules?.[active.toLowerCase()][0]?.["Due Date"]
      }`,
      fileType: "text/csv",
    });
  };

  const handleScroll = (event) => {
    // console.log("scrollTop: ", event.currentTarget.scrollTop);
    // console.log("offsetHeight: ", event.currentTarget.offsetHeight);
    if (
      event.currentTarget.scrollTop >
      event.currentTarget.offsetHeight - event.currentTarget.offsetHeight / 2
    ) {
      setScroll("Top");
    }

    if (event.currentTarget.scrollTop < event.currentTarget.scrollHeight / 2) {
      setScroll("Bottom");
    }
  };

  const scrollRef = useRef(null);

  return (
    <div>
      <Dialog
        fullScreen
        open={schedules?.status}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "fixed", backgroundColor: "white", color: "black" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Schedule ({active})
            </Typography>
            <Button color="inherit" onClick={handleDownload}>
              Download <DownloadIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <Grid container spacing={2} style={{ position: "fixed" }}>
            <Grid item xs={2}>
              <div style={{ marginTop: "80px", padding: "10px" }}>
                <p
                  className={`sidenav-btn ${active === "EDI" && "side-active"}`}
                  onClick={() => {
                    setTableData(schedules?.edi);
                    setActive("EDI");
                  }}
                >
                  Daily installment
                </p>
                {schedules?.emi?.length > 0 && (
                  <p
                    className={`sidenav-btn ${
                      active === "EMI" && "side-active"
                    }`}
                    onClick={() => {
                      setTableData(schedules?.emi);
                      setActive("EMI");
                    }}
                  >
                    Monthly installment
                  </p>
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={10}
              style={{ height: "100vh", overflowY: "scroll" }}
              onScroll={handleScroll}
              ref={scrollRef}
            >
              <ScheduleTable data={tableData} active={active} />
            </Grid>
          </Grid>
        </div>

        <Fab
          variant="extended"
          className="scroll-top-btn"
          onClick={() => {
            if (scroll === "Top") {
              scrollRef.current.scrollTop = 0;
            } else if (scroll === "Bottom") {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          }}
        >
          {scroll === "Top" && <ArrowUpwardIcon sx={{ mr: 1 }} />}
          {scroll === "Bottom" && <ArrowDownwardIcon sx={{ mr: 1 }} />}
          {scroll}
        </Fab>
      </Dialog>
    </div>
  );
}

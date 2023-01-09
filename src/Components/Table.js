import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ScheduleTable({ data, active }) {
  const handleScroll = (event) => {
    console.log("scrollTop: ", event.currentTarget.scrollTop);
    console.log("offsetHeight: ", event.currentTarget.offsetHeight);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ pt: "60px" }}
      onScroll={handleScroll}
    >
      <Table
        sx={{ minWidth: 700, height: "100%" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>SL No.</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">{active}</StyledTableCell>
            <StyledTableCell align="left">Principal</StyledTableCell>
            <StyledTableCell align="left">Interest</StyledTableCell>
            <StyledTableCell align="left">O/S principal</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row["SL NO"]}</StyledTableCell>
              <StyledTableCell align="left">{row["Due Date"]}</StyledTableCell>
              <StyledTableCell align="left">
                {row["EDI"] ? row["EDI"] : row["EMI"]}
              </StyledTableCell>
              <StyledTableCell align="left">{row.Principal}</StyledTableCell>
              <StyledTableCell align="left">{row.Interest}</StyledTableCell>
              <StyledTableCell align="left">
                {row["O/s Principal"]}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

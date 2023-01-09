import moment from "moment/moment";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { irr } from "node-irr";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import * as dateFns from 'date-fns'

export default function useCalculate() {
  const { scheduleState } = useContext(GlobalContext);
  const [schedules, setSchedules] = scheduleState;
  const [values, setValues] = useState({});

  let emiSheet = [];
  let ediSheet = [];
  let installments = { emi: 0, edi: 0 };
  let irrValues = { emi: 0, edi: 0 };
  let emiDates = { start: "", end: "" };
  let ediDates = { start: "", end: "" };
  let ediDays;
  let excessAmount = {
    edi: 0,
    emi: 0,
  };

  const generateSchedule = (prop) => {
    setValues({ ...prop });
  };

  useEffect(() => {
    if (Object.keys(values).length > 0) {
      findEndDate();
    }
  }, [values]);

  const [status, setStatus] = useState({ emi: false, edi: false });

  //   const [installments, setInstallments] = useState({ emi: 0, edi: 0 });
  //   const [irrValues, setIrr] = useState({ emi: 0, edi: 0 });
  //   const [emiDates, setEmiDates] = useState({ start: "", end: "" });
  //   const [ediDates, setEdiDates] = useState({ start: "", end: "" });

  useEffect(() => {
    if (status?.edi && status?.emi) {
      setSchedules((st) => ({ ...st, status: true }));
    }
  }, [status]);

  // Radio = Month
  const findEndDate = async () => {
    // EMI

    let startDate = moment(new Date(values?.date)).add(1, "months");
    let endDate;
    if (values?.tenureType === "month") {
      endDate = moment(new Date(values?.date)).add(
        Number(values?.tenure),
        "months"
      );
    } else if (values?.tenureType === "day") {
      endDate = moment(new Date(values?.date)).add(
        Number(values?.tenure),
        "days"
      );
    }

    // console.log(moment(startDate).format("DD/MM/YYYY"));
    // console.log(moment(endDate).format("DD/MM/YYYY"));

    emiDates.start = new Date(startDate);
    emiDates.end = new Date(endDate);

    let ediStartDate = moment(new Date(values?.date)).add(1, "days");

    ediDates.start = new Date(ediStartDate);
    ediDates.end = new Date(endDate);

    if (values?.tenureType === "month") {
      ediDays = moment(endDate).diff(moment(ediStartDate), "days") + 1;
    } else if (values?.tenureType === "day") {
      ediDays = values?.tenure;
    }

    calculateInstallment(ediDays);

    // EDI
  };

  const calculateInstallment = (days) => {
    let { loanAmt, interest, tenure, tenureType } = values;

    // let emi = Math.ceil(
    //   (Number(loanAmt) +
    //     loanAmt *
    //       (interest / 100) *
    //       (tenure / (values?.tenureType === "day" ? 365 : 12))) /
    //     tenure
    // );

    let emi = Math.ceil(
      (Number(loanAmt) +
        loanAmt *
          (interest / 100) *
          (tenure / (values?.tenureType === "day" ? 365 : 12))) /
        (values?.tenureType === "day"
          ? dateFns.differenceInCalendarMonths(
              dateFns.addDays(emiDates.start, tenure),
              emiDates.start
            )
          : tenure)
    );

    let edi = Math.ceil(
      (Number(loanAmt) +
        loanAmt *
          (interest / 100) *
          (tenure / (values?.tenureType === "day" ? 365 : 12))) /
        days
    );

    console.log("emisss => ", emi);

    installments.emi = Math.ceil(Number(emi));
    installments.edi = Math.ceil(Number(edi));

    // irrValues.emi = calculateIrr(loanAmt, emi, tenure);
    // irrValues.edi = calculateIrr(loanAmt, edi, days);

    // console.log("IRR FOR EDI", irrValues.edi * 365);
    excessCalculationEdi(
      Number(loanAmt),
      Math.ceil(edi),
      Math.ceil(emi),
      Number(values?.tenure),
      Number(values?.interest),
      days
    );

    let adjustedEmi;
    let adjusted;

    if (excessAmount.edi >= 0 && excessAmount.edi <= edi) {
      console.log("Case 1 EDI");

      adjusted = Math.ceil(edi - excessAmount.edi);
      let irrNew = calculateAdjustedIrr(loanAmt, edi, adjusted, days);
      // console.log(irrNew * days);
      irrValues.edi = irrNew;

      console.log(irrNew);

      if (values?.tenureType === "month") {
        console.log("Month");
        // generateEMIScheme(loanAmt, adjustedEmi, 1);
        generateEDIScheme(loanAmt, adjusted, 1);
      } else {
        console.log("Days");
        generateEDIScheme(loanAmt, adjusted, 1);
        setStatus((st) => ({ ...st, emi: true }));
      }
    } else {
      console.log("Case 2 EDI");

      adjusted = edi - excessAmount.edi;
      let secondLast = Math.ceil(edi + adjusted);
      let irrNew = calculateAdjustedIrr2(loanAmt, edi, secondLast, days);
      // calculateAdjustedIrr2
      irrValues.edi = irrNew;

      if (values?.tenureType === "month") {
        // generateEMIScheme(loanAmt, secondLast, 1);
        generateEDISchemeCase2(loanAmt, secondLast, 1);
      } else {
        generateEDISchemeCase2(loanAmt, secondLast, 1);
        setStatus((st) => ({ ...st, emi: true }));
      }
    }

    if (excessAmount.emi >= 0 && excessAmount.emi <= emi) {
      console.log("Case 1 EMI");

      adjustedEmi = Math.ceil(emi - excessAmount.emi);
      let irrNew = calculateAdjustedIrr(loanAmt, emi, adjustedEmi, tenure);
      // console.log(irrNew * days);
      irrValues.emi = irrNew;

      if (values?.tenureType === "month") {
        generateEMIScheme(loanAmt, adjustedEmi, 1);
        // generateEDIScheme(loanAmt, adjusted, 1);
      } else {
      }
    }

    // console.log(calculateIrr(loanAmt, edi, days)*100);
  };

  const generateEMIScheme = (OsAmt, adjusted, count) => {
    let lastPrinciple = OsAmt;
    let interest = OsAmt * irrValues.emi;
    let principle;

    // if (count == values?.tenure) {
    //   console.log(adjusted);
    //   principle = adjusted - interest;

    // } else {
    // }

    principle = installments?.emi - interest;

    let OsPrinciple = OsAmt - principle;

    if (OsPrinciple < 0) OsPrinciple = OsPrinciple * 0;

    if (emiSheet.length < Number(values?.tenure)) {
      let row = {
        "SL NO": emiSheet.length + 1,
        "Due Date": moment(new Date(emiDates?.start))
          .add(emiSheet.length, "months")
          .format("DD/MM/YYYY"),
        EMI:
          Number(count) !== Number(values?.tenure)
            ? installments.emi
            : adjusted,
        Principal:
          Number(count) !== Number(values?.tenure)
            ? principle.toFixed(2)
            : lastPrinciple.toFixed(2),
        Interest: interest.toFixed(2),
        "O/s Principal": OsPrinciple.toFixed(2),
      };
      emiSheet.push(row);
      generateEMIScheme(OsPrinciple, adjusted, count + 1);
    } else {
      setStatus((st) => ({ ...st, emi: true }));
      setSchedules((st) => ({ ...st, emi: emiSheet }));
    }
  };

  const generateEDIScheme = (OsAmt, adjusted, count) => {
    // console.log("Hereee");

    let interest = OsAmt * irrValues.edi;
    let principle;
    if (Number(count) === Number(ediDays)) {
      principle = adjusted - interest;
    } else {
      principle = installments?.edi - interest;
    }

    let OsPrinciple = OsAmt - principle;

    if (OsPrinciple < 0) OsPrinciple = OsPrinciple * 0;

    if (ediSheet.length < ediDays) {
      let row = {
        "SL NO": ediSheet.length + 1,
        "Due Date": moment(new Date(ediDates?.start))
          .add(ediSheet.length, "days")
          .format("DD/MM/YYYY"),
        EDI: Number(count) !== Number(ediDays) ? installments.edi : adjusted,
        Principal: principle.toFixed(2),
        Interest: interest.toFixed(2),
        "O/s Principal": OsPrinciple.toFixed(2),
      };
      ediSheet.push(row);
      generateEDIScheme(OsPrinciple, adjusted, count + 1);
    } else {
      setStatus((st) => ({ ...st, edi: true }));
      setSchedules((st) => ({ ...st, edi: ediSheet }));
    }
  };

  const generateEDISchemeCase2 = (OsAmt, secondLast) => {
    let edi;
    if (ediSheet.length === ediDays - 1) {
      edi = 0;
    } else if (ediSheet.length === ediDays - 2) {
      edi = secondLast;
    } else {
      edi = installments.edi;
    }

    let interest = OsAmt * irrValues.edi;
    let principle = edi - interest;
    let OsPrinciple = OsAmt - principle;

    if (OsPrinciple < 0) OsPrinciple = OsPrinciple * 0;

    if (ediSheet.length < ediDays) {
      let row = {
        "SL NO": ediSheet.length + 1,
        "Due Date": moment(new Date(ediDates?.start))
          .add(ediSheet.length, "days")
          .format("DD/MM/YYYY"),
        EDI: edi + "",
        Principal: principle.toFixed(2),
        Interest: interest.toFixed(2),
        "O/s Principal": OsPrinciple.toFixed(2),
      };
      ediSheet.push(row);
      generateEDISchemeCase2(OsPrinciple, secondLast);
    } else {
      setStatus((st) => ({ ...st, edi: true }));
      setSchedules((st) => ({ ...st, edi: ediSheet }));
    }
  };

  const calculateIrr = (amount, installment, n) => {
    const data = [Number(-amount)];

    for (let i = 0; i < n; i++) {
      data.push(installment);
    }
    return irr(data);
  };

  const calculateAdjustedIrr = (amount, installment, lastValue, n) => {
    const data = [Number(-amount)];

    for (let i = 0; i < n; i++) {
      if (i === n - 1) {
        data.push(lastValue);
      } else {
        data.push(installment);
      }
    }
    return irr(data);
  };

  const calculateAdjustedIrr2 = (amount, installment, secondLast, n) => {
    const data = [Number(-amount)];

    for (let i = 0; i < n; i++) {
      if (i === n - 1) {
        data.push(0);
      } else if (i === n - 2) {
        data.push(secondLast);
      } else {
        data.push(installment);
      }
    }
    return irr(data);
  };

  const excessCalculationEdi = (
    loanAmount,
    edi,
    emi,
    tenure,
    interest,
    days
  ) => {
    let ediExcess;
    let emiExcess;
    if (values?.tenureType === "day") {
      ediExcess =
        edi * tenure -
        (loanAmount * (interest / 100) * (tenure / 365) + loanAmount);
    } else {
      ediExcess =
        edi * days -
        (loanAmount * (interest / 100) * (tenure / 12) + loanAmount);
      emiExcess =
        emi * tenure -
        (loanAmount * (interest / 100) * (tenure / 12) + loanAmount);
    }

    excessAmount.edi = ediExcess;
    excessAmount.emi = emiExcess;
  };

  return {
    generateSchedule,
  };
}

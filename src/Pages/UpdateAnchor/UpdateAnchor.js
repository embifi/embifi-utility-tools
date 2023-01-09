import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomerDetails from "../CreateSteps/CustomerDetails";
import LoanDetails from "../CreateSteps/LoanDetails";
import BankDetails from "../CreateSteps/BankDetails";
import CoApplicant from "../CreateSteps/CoApplicant";
import { createApplication } from "../../api";
import { GlobalContext } from "../../Context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIco from "../../assets/add.svg";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { getAllAnchors, updateAnchorData } from '../../api';
import Autocomplete from '@mui/material/Autocomplete';


export default function UpdateAnchor() {
    let navigate = useNavigate();

    const theme = createTheme();

    const [anchorsList, setAnchorsList] = React.useState([]);
    const [anchorData, setAnchorData] = React.useState({});
    const [anchorId, setAnchorId] = React.useState('');
    const [snackMsg, setSnackMsg] = React.useState({ msg: "", show: false });

    const getAnchorList = async () => {
        let anchoridList = [];
        try {
            let { data } = await getAllAnchors();
            // console.log('==>', data?.data);
            data?.data?.forEach((edx, ind) => {
                let temp = { anchor_id: edx?.anchor_id, label: `${edx?.anchor_id}:${edx?.name}`, anchorData: edx }
                anchoridList = [...anchoridList, temp];
            })
            setAnchorsList(anchoridList);
            // setAnchorData()
            // console.log(data.data)
            console.log('==>', anchoridList)
        } catch (error) {
            console.log(error);
        }
    };

    const updateAnchorApi = async () => {
        let payload = { addresses: Object.values(anchorData) };

        try {
            let { data } = await updateAnchorData(anchorId, payload);
            console.log('update anchor success response: ', data);
            setSnackMsg({ msg: "Record updated successfully.", show: true });
            setTimeout(() => {
                setSnackMsg({ msg: "Record updated successfully.", show: false });
                window.location.reload(false);
            }, 3000);
        }
        catch (error) {
            console.log('update anchor api error ', error);
            setSnackMsg({ msg: "Error occured.", show: true });
            setTimeout(() => {
                setSnackMsg({ msg: "Error occured.", show: false });
                window.location.reload(false);
            }, 3000);
        }
    }

    React.useEffect(() => {
        getAnchorList();
    }, []);

    // React.useEffect(() => {
    //     console.log(anchorData)
    // }, [anchorId])

    // addresses : [
    // {
    //     address:"",
    //     pincode:number
    //     }
    // ]

    const handleChange = (event, ind) => {
        const { name, value } = event.target;
        // setDataChange(dataChange[ind] = { ...dataChange, [ind]: { ...dataChange[ind], [name]: value } });
        if (name === 'pincode') {
            setAnchorData(anchorData[ind] = { ...anchorData, [ind]: { ...anchorData[ind], [name]: Number(value) } });
        }
        else {
            setAnchorData(anchorData[ind] = { ...anchorData, [ind]: { ...anchorData[ind], [name]: value } });
        }
    }

    // React.useEffect(() => {
    //     console.log('data change=> ', dataChange)
    // }, [dataChange])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <p className="go-back-btn" onClick={() => navigate("/")}>
                <ArrowBackIcon /> Go back Home
            </p>

            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

                {
                    snackMsg?.show ?
                        <div className="d-flex justify-content-center align-items-center" style={{ background: 'grey', color: '#fff', padding: '1em 0.5em', borderRadius: '10px', marginBottom: '1em' }}>
                            <h3>{snackMsg.msg}</h3>
                        </div>
                        :
                        null
                }


                <div className="page-head">
                    <img src={AddIco} width={"30px"} />
                    <span style={{ marginLeft: "10px", color: "gray" }}>Update Anchor</span>
                </div>

                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={anchorsList}
                                onChange={(e, newVal) => { setAnchorId(newVal?.anchor_id); setAnchorData(newVal?.anchorData?.address); console.log('change ', newVal?.anchorData?.address) }}
                                renderInput={(params) => <TextField {...params} label="Anchor List" />}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        {
                            Object.keys(anchorData)?.map((val, ind) => {
                                // console.log(anchorData[val])
                                return (
                                    <>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="standard-search"
                                                label="Address"
                                                name="address"
                                                variant="standard"
                                                value={anchorData[val]?.address}
                                                defaultValue={anchorData[val]?.address}
                                                sx={{ marginTop: 2 }}
                                                onChange={(event) => handleChange(event, ind)}
                                            />

                                            <TextField
                                                id="standard-search"
                                                label="Pincode"
                                                name="pincode"
                                                variant="standard"
                                                value={anchorData[val]?.pincode}
                                                defaultValue={anchorData[val]?.pincode}
                                                sx={{ marginTop: 2 }}
                                                onChange={(event) => handleChange(event, ind)}
                                            />
                                        </Grid>
                                    </>
                                )
                            })
                        }

                    </Grid>


                    <Button variant="outlined" sx={{ marginTop: 3 }} onClick={updateAnchorApi}>Update Anchor</Button>

                </Paper>
            </Container>
        </ThemeProvider>
    );
}
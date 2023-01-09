import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Buffer } from "buffer";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraIcon from "@mui/icons-material/Camera";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { FiCamera, FiImage, FiX } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";

import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import Webcam from "react-webcam";
import { getBase64 } from "../utility/convertFileBase";
import { CircularProgress, Grid } from "@mui/material";
import ImageCropper from "./Crop";
import { useContext } from "react";
// import { GlobalContext } from "../Contexts/GlobalContext";
import "../Components/Capture.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CatureUpload({
  setFile,
  error,
  errorTxt,
  onSelect,
  text,
  tempState,
}) {
  const [open, setOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isSelfie, setSelfie] = useState(false);
  const [captureImage, setImage] = useState("");
  const [confirmFilename, setConfirmFilename] = useState("");
  const [isInput, setInput] = useState(false);
  const [pdfFile, setPdf] = useState("");
  const [loading, setLoading] = React.useState(true);

  const fileInput = useRef();
  const sliderBottom = useRef();
  const backdrop = useRef();

  const [cropImgTemp, setTempCrop] = useState("");
  const [croppedImg, setCropImg] = useState("");

  const handleClickOpen = () => {
    // setOpen(true);
    sliderBottom.current.classList.remove("close");
    backdrop.current.classList.remove("hide");
  };
  const handleClose = () => {
    // setOpen(false);
    setTimeout(() => {
      sliderBottom.current.classList.add("close");
      backdrop.current.classList.add("hide");
    }, 100);
  };

  const handleRecapture = () => {
    fileInput.current.value = "";
    setConfirmFilename("");
    setInput(false);
    setPdf("");
    setImage("");
    handleClickOpen();
    setFile && setFile("");
  };

  useEffect(() => {
    if (!open) {
      setIsCameraOpen(false);
      setImage("");
    }
  }, [open]);

  useEffect(() => {
    if (croppedImg !== "") {
      setFile && setFile(croppedImg);
    }
  }, [croppedImg]);

  useEffect(() => {
    if (pdfFile !== "") {
      setFile && setFile(pdfFile);
    }
  }, [pdfFile]);

  // const onSelectFile = async (e) => {
  //   onSelect && onSelect();
  //   if (e.target.files && e.target.files.length > 0) {
  //     if (!e.target.files[0].type.match("application/pdf")) {
  //       setError && setError("Please upload pdf file only");
  //       return false;
  //     } else if (e.target.files[0].size >= 5 * 1024 * 1024) {
  //       setError && setError("Select files below 5mb");
  //       return;
  //     }

  //     setFileName(e.target.files[0].name);
  //     setFile(await getBase64(e.target.files[0]));
  //   }
  // };

  const handleUserMedia = () => setTimeout(() => setLoading(false), 1_000);

  return (
    <>
      <>
        {tempState === "" ? (
          <div
            className={`capture-upload-div-v2 pointer ${
              error && "capture-error"
            }`}
            onClick={() => {
              // if (permissions.camera === "PROMPT") {
              //   setShowPermission((st) => ({
              //     ...st,
              //     state: true,
              //     action: handleClickOpen,
              //   }));
              // } else {
              fileInput.current.click();
              setInput(true);
              // }
            }}
          >
            <div className="upload-content-v2">
              <p className="text-center upload-cloud-icon">
                <CloudUploadIcon className="me-2" sx={{ fontSize: 40 }} />
              </p>
              <span className="input-placeholder">
                {text ? text : "Click here to Upload/Capture"}
              </span>
              {/* <p className="max-size-txt">Max File Size: 5 Mb</p> */}
            </div>
          </div>
        ) : (
          <>
            {!isInput && (
              <>
                <div
                  className={`w-100 bg-dark d-flex justify-content-center ${
                    error && "capture-error"
                  }`}
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <img
                    src={tempState}
                    alt=""
                    width={"100%"}
                    height={"200px"}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                {errorTxt && (
                  <span className="error mt-2 mb-3">
                    <ErrorOutlineIcon sx={{ fontSize: "15px", mr: 1 }} />
                    {errorTxt}
                  </span>
                )}
              </>
            )}

            {isInput && (
              <>
                <p className="text-center">
                  <DescriptionIcon style={{ fontSize: "50px" }} />
                </p>
                <p
                  className="text-center"
                  style={{
                    fontSize: "10px",
                    color: "gray",
                    padding: "0 50px",
                  }}
                >
                  {confirmFilename}
                </p>
              </>
            )}
            <p className="mb-0 text-center mt-2">
              <span className="recapture-btn" onClick={handleRecapture}>
                <CameraAltIcon className="me-2" /> Press to Re-capture/Upload
              </span>
            </p>
          </>
        )}
      </>

      <div
        className="slider-backdrop hide"
        ref={backdrop}
        onClick={() => {
          handleClose();
        }}
      ></div>
      <div ref={sliderBottom} class="slider close">
        <Grid container spacing={2}>
          <Grid className="content-center" item xs={6} sm={6}>
            <Button
              className="bottom-menu-button"
              onClick={() => {
                fileInput.current.click();
                setInput(true);
              }}
            >
              <div>
                <FiImage className="bottom-menu-ico" />
                <p className="w-100">Gallery</p>
              </div>
            </Button>
            <input
              ref={fileInput}
              type="file"
              class="custom-file-input"
              accept="application/pdf , image/png, image/jpg, image/jpeg"
              onChange={async (e) => {
                onSelect && onSelect();
                // if (!e.target.files[0].type.match("application/pdf")) {
                //   setError && setError("Please upload pdf file only");
                //   return false;
                // } else if (e.target.files[0].size >= 5 * 1024 * 1024) {
                //   setError && setError("Select files below 5mb");
                //   return;
                // }

                // if (e.target.files[0].size >= 5 * 1024 * 1024) {
                //   alert("Maximum 5mb");
                //   return false;
                // }
                if (e.target.files[0].type.match("application/pdf")) {
                  setInput(true);
                  setPdf(await getBase64(e.target.files[0]));
                  setConfirmFilename(e.target.files[0].name);
                } else if (e.target.files[0]["type"].split("/")[0] == "image") {
                  if (e.target.files[0].type.match("image/svg")) {
                    alert("Not supported file");
                    return false;
                  }
                  setInput(false);
                  setImage(await getBase64(e.target.files[0]));
                } else {
                  alert("Pdf/Image only");
                  handleRecapture();
                }

                handleClose();
              }}
              hidden
            />
          </Grid>
        </Grid>
      </div>

      {/* /////// CAMERA ///// */}

      {captureImage !== "" && !isInput && (
        <div className="crop-screen">
          <CloseIcon
            className="crop-close pointer"
            onClick={() => {
              setImage("");
            }}
          />
          <div className="content-center">
            <ImageCropper
              onImageCropped={(result) => {
                setTempCrop(result);
              }}
              imageToCrop={captureImage}
            />
          </div>
          <div className={`action-buttons-holder`}>
            <div className="responsive-div">
              <div className="action-buttons w-100">
                <button
                  className="capture-btn"
                  onClick={() => {
                    setCropImg(cropImgTemp);
                    setConfirmFilename("capture.jpg");
                    setImage("");
                  }}
                >
                  <CameraIcon className="me-2" />
                  Crop and Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

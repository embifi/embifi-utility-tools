import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "../utility/convertFileBase";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "PDF"];

function DragDrop({setFile}) {
  const handleChange = async (file) => {
    // getBase64(file)
    // console.log(await getBase64(file));
    setFile(await getBase64(file), file?.name);
  };
  return (
    <FileUploader label={"Upload Document"} handleChange={handleChange} name="file" types={fileTypes}/>
  );
}

export default DragDrop;

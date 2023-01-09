import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper(props) {
  const { imageToCrop, onImageCropped } = props;

  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "%",
      width: 90,
      height: 90,
      x: 5,
      y: 5,
      keepSelection: false,
    }
  );

  useEffect(() => {
    onImageCropped(imageToCrop);
  }, []);

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg" // destination filename
      );

      // calling the props function to expose
      // croppedImage to the parent component

      let reader = new FileReader();
      reader.readAsDataURL(croppedImage);
      reader.onloadend = function () {
        let base64String = reader.result;
        onImageCropped(base64String);
      };
    }
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = Math.ceil(cropConfig.width * scaleX);
    canvas.height = Math.ceil(cropConfig.height * scaleY);

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        // blob.name = fileName;
        // // creating a Object URL representing the Blob object given
        // const croppedImageUrl = window.URL.createObjectURL(blob);

        // resolve(croppedImageUrl);

        resolve(blob);
      }, "image/jpeg");
    });
  }

  return (
    <ReactCrop
      className="response-wrapper"
      src={imageToCrop}
      crop={cropConfig}
      keepSelection={true}
      ruleOfThirds
      onImageLoaded={(imageRef) => setImageRef(imageRef)}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(cropConfig) => setCropConfig(cropConfig)}
      crossorigin="anonymous" // to avoid CORS-related problems
    />
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {},
};

export default ImageCropper;

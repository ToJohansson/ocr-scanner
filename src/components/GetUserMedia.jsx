import React, { useState, useRef, useEffect } from "react";

/**
 * *************** GetUserMedia *****************
 *
 * PROPS:
 * - filterHandler: filter för att ändra kontrast mellan
 *                  ljusa och mörka pixlar. Ska göra det lättare för
 *                  imageHandler att läsa av bild.
 * - imageHandler:  läser ut text från en bild, använder sig utav Tesseract.
 * - onInputChange:  funktion som kan updatera ett state i App.
 *                   hämtad String från imageHandler. ändar useState i App.
 *
 *
 * @param {object} props
 * @returns
 */

function GetUserMedia(props) {
  const videoRef = useRef(null);
  const [isVideoRunning, setIsVideoRunning] = useState(true);
  let count = 1;

  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  }
  const handleLoadMetaData = () => {
    captureImage();
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    startVideo();

    videoElement.addEventListener("loadedmetadata", handleLoadMetaData);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", handleLoadMetaData);
        videoElement.srcObject = null;
      }
    };
  }, []);

  // Function to capture a image and improve accuracy before OCR.
  // after improvement, send forth to Tesseract OCR (props.imageHandler)
  async function captureImage() {
    try {
      if (!videoRef.current) {
        console.log("Video element is not available");
        return;
      }

      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      // Create an offscreen canvas to hold the captured image
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = false;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Capture the entire video frame
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Calculate the dimensions for the three sections
      const sectionWidth = videoWidth;
      const topSectionHeight = videoHeight / 3;
      const middleSectionHeight = (videoHeight - topSectionHeight) / 2;

      // Create two offscreen canvases for the original
      const originalCanvas = document.createElement("canvas");
      const originalContext = originalCanvas.getContext("2d");
      originalCanvas.width = videoWidth;
      originalCanvas.height = videoHeight;

      // manipulate context for better OCR ACCURACY
      // originalContext.filter = "grayscale(1)";
      // props.filterHandler(context, canvas);

      // Draw the original image onto the original canvas
      originalContext.drawImage(canvas, 0, 0, videoWidth, videoHeight);

      canvas.width = videoWidth;
      canvas.height = middleSectionHeight;

      context.drawImage(
        originalCanvas,
        0,
        topSectionHeight,
        sectionWidth,
        middleSectionHeight,
        0,
        0,
        sectionWidth,
        middleSectionHeight
      );

      // Convert the final canvas to a data URL
      const image = canvas.toDataURL("image/jpeg");
      if (count < 30) {
        if (image.length < 10) {
          console.log(" IMAGE IS BROKEN ", image);
          return;
        }

        const idNum = await props.imageHandler(image);
        if (idNum) {
          props.onInputChange(idNum);
          stopVideoStream();
          return;
        }
        count++;
        captureImage();
      } else {
        stopVideoStream();
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }

  function stopVideoStream() {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsVideoRunning(false);
    props.stopCamera();
  }
  return (
    <div onClick={() => stopVideoStream() && props.stopCamera}>
      {isVideoRunning && (
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            width="100%"
            height="100%"
          ></video>
          <div className="overlay-frame"></div>
        </div>
      )}
    </div>
  );
}

export default GetUserMedia;

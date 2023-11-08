import React, { useState, useRef, useEffect } from "react";

function GetUserMedia(props) {
  const videoRef = useRef();
  const [debugImage, setDebugImage] = useState("");
  const [isVideoRunning, setIsVideoRunning] = useState(true);

  let count = 1;

  useEffect(() => {
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    }

    startVideo();

    videoRef.current.addEventListener("loadedmetadata", () => {
      // Start capturing the image when video metadata is loaded
      captureImage();
    });
  }, []);

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

      // Create two offscreen canvases for the original and blurred sections
      const originalCanvas = document.createElement("canvas");
      const originalContext = originalCanvas.getContext("2d");
      originalCanvas.width = videoWidth;
      originalCanvas.height = videoHeight;

      const blurredCanvas = document.createElement("canvas");
      blurredCanvas.width = videoWidth;
      blurredCanvas.height = videoHeight;

      // Draw the original image onto the original canvas
      originalContext.drawImage(canvas, 0, 0, videoWidth, videoHeight);

      // Draw the original and blurred sections onto the final canvas
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
      contrastFilter(context, canvas);
      const image = canvas.toDataURL("image/jpeg");

      console.log(count, ": IMAGE");

      if (count < 20) {
        if (image.length < 10) {
          console.log(" IMAGE IS BROKEN ", image);
          return;
        }

        const extractedWTPNumber = await props.imageHandler(image);
        if (extractedWTPNumber) {
          props.setIsExtractedWTPNumber(extractedWTPNumber);
          setDebugImage(image);

          stopVideoStream();
          count = 1;
          return;
        }

        count++;
        captureImage();
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }

  // Function to apply a grayscale filter to the image
  function contrastFilter(context, canvas) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Calculate the brightness
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

      // Define a threshold to distinguish between black and other colors
      const threshold = 130;

      // If the pixel is black (below the threshold), make it even darker
      if (brightness < threshold) {
        data[i] = 0; // Red
        data[i + 1] = 0; // Green
        data[i + 2] = 0; // Blue
      } else {
        // If the pixel is not black, make it brighter (you can adjust the factor)
        const brightnessDiff = brightness - threshold;
        data[i] += brightnessDiff;
        data[i + 1] += brightnessDiff;
        data[i + 2] += brightnessDiff;
      }
    }

    context.putImageData(imageData, 0, 0);
  }

  // Function to stop the video stream
  function stopVideoStream() {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsVideoRunning(false);
  }

  return (
    <div onClick={props.stopCamera}>
      {isVideoRunning && (
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline muted></video>
          <div className="overlay-frame"></div>
        </div>
      )}
      <div>
        {debugImage && (
          <div>
            <img src={debugImage} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default GetUserMedia;

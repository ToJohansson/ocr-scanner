import { useState, useRef, useEffect } from "react";

/**
 * *************** GetUserMedia *****************
 *
 * PROPS:
 *
 * - imageHandler:  läser ut text från en bild, använder sig utav Tesseract.
 * - onInputChange:  funktion som kan updatera ett state i App.
 *                   hämtad String från imageHandler. ändar useState i App.
 *
 *
 * @param {void} props
 * @returns
 */

interface Props {
  imageHandler: (image: string) => Promise<string | null | undefined>;
  onInputChange: (prevCardNumber: string) => void;
  stopCamera: () => void;
}

const GetUserMedia = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoRunning, setIsVideoRunning] = useState(true);
  let count = 1;

  useEffect(() => {
    const videoElement = videoRef.current;

    startVideo();

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadMetaData);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", handleLoadMetaData);
        videoElement.srcObject = null;
      }
    };
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.srcObject = stream;

        await new Promise((resolve) => {
          videoRef.current?.addEventListener("loadedmetadata", resolve, {
            once: true,
          });
        });

        await videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };
  const handleLoadMetaData = () => {
    captureImage();
  };

  // after Image is captured, send to Tesseract OCR (props.imageHandler)
  const captureImage = async () => {
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

      if (!context) return;
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

      // Draw the original image onto the original canvas
      if (!originalContext) return;
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
  };

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsVideoRunning(false);
    props.stopCamera();
  };
  return (
    <div onClick={stopVideoStream}>
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
};

export default GetUserMedia;

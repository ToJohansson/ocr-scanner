import { performOCR } from "./tesseract-ocr";

export async function captureImage(videoRef, count = 0) {
  try {
    if (!videoRef.current) {
      console.log("Video element is not available");
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    // Set the canvas dimensions to match the video frame
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Capture the entire video frame
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Display the captured image
    const image = canvas.toDataURL("image/jpeg");

    console.log("IMAGE ", image);
    if (count !== 30) {
      if (image.length > 0) {
        if ((await performOCR(image)) == null) {
          console.log("is null");
          captureImage(videoRef, count + 1);
        } else {
          console.log("    MATCH    ");
        }
      } else {
        console.log("Image is Broken");
      }
    } else {
      return;
    }
  } catch (error) {
    console.error("Error capturing image:", error);
  }
}

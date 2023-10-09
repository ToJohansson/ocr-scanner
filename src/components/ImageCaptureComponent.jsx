import React, { useEffect, useRef } from "react";

function ImageCaptureComponent({ onCaptureImage }) {
  // Skapa refs för att hålla DOM-element
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const capturedImageRef = useRef(null);
  const downloadLinkRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    async function captureImage() {
      try {
        // Hämta DOM-elementen från refs
        const canvas = canvasRef.current;
        const videoElement = videoRef.current;
        const capturedImageElement = capturedImageRef.current;
        const downloadLink = downloadLinkRef.current;
        const frame = frameRef.current;

        console.log("CAPTURE IMAGE");

        const context = canvas.getContext("2d");

        context.imageSmoothingEnabled = false;

        // Hämta dimensioner och position av ramen
        const frameX = frame.getBoundingClientRect().left;
        const frameY = frame.getBoundingClientRect().top;
        const frameWidth = frame.offsetWidth;
        const frameHeight = frame.offsetHeight;

        // Ställ in canvas-dimensioner för att matcha ramen
        canvas.width = frameWidth;
        canvas.height = frameHeight;

        // Fånga endast innehållet inuti ramen
        context.drawImage(
          videoElement,
          frameX - videoElement.getBoundingClientRect().left, // Justera för videoposition
          frameY - videoElement.getBoundingClientRect().top, // Justera för videoposition
          frameWidth,
          frameHeight,
          0,
          0,
          frameWidth,
          frameHeight
        );

        // Visa den fångade bilden
        const image = canvas.toDataURL("image/jpeg");
        capturedImageElement.src = image;

        downloadLink.href = image;
        downloadLink.style.display = "block";

        // När bilden har fångats, anropa onCaptureImage(image) med den fångade bilden
        if (onCaptureImage) {
          onCaptureImage(image);
        }
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    }

    // Anropa captureImage här när det är dags att fånga bilden
    captureImage();
  }, [onCaptureImage]);

  // JSX för bildinsamlingskomponenten
  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <img ref={capturedImageRef} alt="Captured" />
      <a ref={downloadLinkRef} download="captured.jpg">
        Ladda ner bild
      </a>
      <div ref={frameRef} className="frame" />
    </div>
  );
}

export default ImageCaptureComponent;

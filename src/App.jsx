import "./styles.css";
import Tesseract from "tesseract.js";

function App() {
  const videoElement = document.getElementById("camera");
  const capturedImageElement = document.getElementById("capturedImage");
  const downloadLink = document.getElementById("downloadLink");
  const frame = document.querySelector(".frame");
  const canvas = document.createElement("canvas");
  const topContainer = document.querySelector(".top-container");
  const bottomContainer = document.querySelector(".bottom-container");
  const leftContainer = document.querySelector(".left-container");
  const rightContainer = document.querySelector(".right-container");
  const modal = document.getElementById("cameraModal");
  const wtpNumberInput = document.getElementById("wtpNumber");

  let indexI = 0;
  let isModalOpen = false;

  /*  test form output */
  const wtpFormSubmit = document.getElementById("wtpForm");
  wtpFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    const wtpNumberInput = document.getElementById("wtpNumber");
    const wtpNumberValue = wtpNumberInput.value;
    console.log("CONSOLE: " + wtpNumberValue);
  });
  // *************************************
  document
    .querySelector("#get-access")
    .addEventListener("click", async function init(e) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        document.querySelector("video").srcObject = stream;
        document.querySelector("#get-access").setAttribute("hidden", true);

        // Show the frame
        frame.style.display = "block";
        topContainer.style.display = "block";
        bottomContainer.style.display = "block";
        leftContainer.style.display = "block";
        rightContainer.style.display = "block";

        openModal();

        // Start the automatic capture process
        captureImage();
      } catch (error) {
        alert(`${error.name}`);
        console.error(error);
      }
    });

  // Close the modal if the user clicks anywhere outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Capture an image from the camera within the frame
  async function captureImage() {
    try {
      console.log("INDEX " + indexI + " CAPTURE IMAGE");

      const context = canvas.getContext("2d");

      context.imageSmoothingEnabled = false;

      // Get the dimensions and position of the frame
      const frameX = frame.getBoundingClientRect().left;
      const frameY = frame.getBoundingClientRect().top;
      const frameWidth = frame.offsetWidth;
      const frameHeight = frame.offsetHeight;

      // Set the canvas dimensions to match the frame
      canvas.width = frameWidth;
      canvas.height = frameHeight;

      // Capture only the content inside the frame
      context.drawImage(
        videoElement,
        frameX - videoElement.getBoundingClientRect().left, // Adjust for video position
        frameY - videoElement.getBoundingClientRect().top, // Adjust for video position
        frameWidth,
        frameHeight,
        0,
        0,
        frameWidth,
        frameHeight
      );

      // Display the captured image
      const image = canvas.toDataURL("image/jpeg");
      capturedImageElement.src = image;

      downloadLink.href = image;
      downloadLink.style.display = "block";

      await performOCR(image);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }

  async function performOCR(image) {
    try {
      if (!isModalOpen) {
        return; // Avbryt om OCR inte ska fortsätta
      }
      const {
        data: { text },
      } = await Tesseract.recognize(image, "eng");

      const extractId = extractIDNumber(text);

      if (extractId) {
        wtpNumberInput.value = extractIDNumber(text);
        console.log("INDEX " + indexI + " TESSERACT: " + wtpNumberInput.value);
        indexI++; // <------ increment index
        closeModal();
      } else {
        captureImage();
      }
    } catch (error) {
      console.error("Error during OCR:", error);
    }
  }
  // Function to open the modal
  function openModal() {
    isModalOpen = true;
    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";

    const videoTracks = videoElement.srcObject.getVideoTracks();

    videoTracks.forEach((track) => {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });
    // Stoppa OCR-processen när modalen stängs
    isModalOpen = false;
  }

  function extractIDNumber(inputString) {
    // SKIDATA card pattern
    const skidataPattern = /(\d{2}-\d{4} \d{4} \d{4} \d{4} \d{4}-\d)/;

    // Use the regular expression to find a match in the input string
    const match = inputString.match(skidataPattern);

    // Check if a match was found
    if (match) {
      // Extract the matched ID number from the regex match
      const idNumber = match[0];
      console.log("EXTRACT ID " + idNumber);

      closeModal();
      return idNumber;
    } else {
      return null;
    }
  }

  return <div className="App"></div>;
}

export default App;

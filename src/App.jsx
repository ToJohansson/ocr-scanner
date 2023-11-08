import React, { useState } from "react";
import Form from "./components/Form";
import { performOCR } from "./utilities/tesseract-ocr";
import ButtonToStartCamera from "./components/ButtonToStartCamera";
import GetUserMedia from "./components/GetUserMedia";
import "./styles.css";
import Popup from "./components/Popup";

function App() {
  const [isExtractedWTPNumber, setIsExtractedWTPNumber] = useState(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const handleInputChange = (newWTPNumber) => {
    setIsExtractedWTPNumber(newWTPNumber);
  };

  const startStopCamera = () => {
    setIsCameraStarted((prevIsCameraStarted) => !prevIsCameraStarted);
  };

  return (
    <div className="App">
      <main>
        <div>
          {!isCameraStarted ? (
            <ButtonToStartCamera startCamera={startStopCamera} />
          ) : (
            <Popup trigger={isCameraStarted} handlePopupBtn={startStopCamera}>
              {" "}
              <GetUserMedia
                imageHandler={performOCR}
                setIsExtractedWTPNumber={setIsExtractedWTPNumber}
                stopCamera={startStopCamera}
              ></GetUserMedia>
            </Popup>
          )}
        </div>

        <div>
          <Form
            wtpNum={isExtractedWTPNumber}
            onInputChange={handleInputChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

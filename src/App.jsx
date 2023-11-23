import React, { useState } from "react";
import Form from "./components/Form";
import { performOCR } from "./utilities/tesseract-ocr";
import ButtonToStartCamera from "./components/ButtonToStartCamera";
import GetUserMedia from "./components/GetUserMedia";
import "./styles.css";
import Popup from "./components/Popup";
import { contrastFilter } from "./utilities/imageEnhancer";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const handleInputChange = (prevCardNumber) => {
    setCardNumber(prevCardNumber);
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
              <GetUserMedia
                imageHandler={performOCR}
                onInputChange={handleInputChange}
                stopCamera={startStopCamera}
                filterHandler={contrastFilter}
              ></GetUserMedia>
            </Popup>
          )}
        </div>

        <div>
          <Form
            changeInputValue={cardNumber}
            onInputChange={handleInputChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

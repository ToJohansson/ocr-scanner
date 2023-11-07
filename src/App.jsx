import React, { useState } from "react";
import Form from "./htmlComponents/Form";
import { performOCR } from "./utilities/tesseract-ocr";
import ButtonToStartCamera from "./htmlComponents/ButtonToStartCamera";
import GetUserMedia from "./components/GetUserMedia";

function App() {
  const [isExtractedWTPNumber, setIsExtractedWTPNumber] = useState(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const handleInputChange = (newWTPNumber) => {
    setIsExtractedWTPNumber(newWTPNumber);
  };

  const startCamera = () => {
    setIsCameraStarted(true);
  };

  return (
    <div>
      <div>
        {!isCameraStarted ? (
          <ButtonToStartCamera onClick={startCamera} />
        ) : (
          <GetUserMedia
            imageHandler={performOCR}
            setIsExtractedWTPNumber={setIsExtractedWTPNumber}
          />
        )}
      </div>

      <div>
        <Form wtpNum={isExtractedWTPNumber} onInputChange={handleInputChange} />
      </div>
    </div>
  );
}

export default App;

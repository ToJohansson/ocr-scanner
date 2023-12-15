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

  const handleCamera = () => {
    setIsCameraStarted((prevIsCameraStarted) => !prevIsCameraStarted);
  };

  /** <Popup trigger={isCameraStarted} handlePopupBtn={handleCamera}>
               </Popup> */
  return (
    <div className="Main">
      <main>
        <div>
          Saker som kan påverka: <br />- <b>Ljus:</b> För starkt
          dagsljus/lampljus eller för mörkt. <br />- <b>Fokus:</b> Dåligt fokus
          ger suddiga bilder. <br />- <b>Still:</b> Kameran eller kortet är inte
          helt stilla när bilden tas. <br />- <b>Färger:</b> kan få bilden att
          smälta ihop med omgivningen. <br />
        </div>
        <div>
          {!isCameraStarted ? (
            <ButtonToStartCamera startCamera={handleCamera} />
          ) : (
            <div>
              {isCameraStarted && (
                <GetUserMedia
                  imageHandler={performOCR}
                  onInputChange={handleInputChange}
                  stopCamera={handleCamera}
                  filterHandler={contrastFilter}
                ></GetUserMedia>
              )}
            </div>
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

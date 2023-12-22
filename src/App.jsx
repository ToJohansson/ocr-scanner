import { useState } from "react";
import Form from "./components/Form";
import { performOCR } from "./utilities/tesseract-ocr";
import ButtonToStartCamera from "./components/ButtonToStartCamera";
import GetUserMedia from "./components/GetUserMedia";
import "./styles.css";

const App = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [toggleIsCamera, setToggleIsCamera] = useState(false);

  const handleInputChange = (prevCardNumber) => {
    setCardNumber(prevCardNumber);
  };

  const handleToggleCamera = () => {
    setToggleIsCamera((prevToggleIsCamera) => !prevToggleIsCamera);
  };

  return (
    <main>
      <h3>
        <b>Saker som kan påverka</b>
      </h3>
      <br />

      <ul>
        <ul>
          <li>
            <b>Ljus:</b> För starkt dagsljus/lampljus eller för mörkt.
          </li>
          <li>
            <b>Fokus:</b> Dåligt fokus ger suddiga bilder.
          </li>
          <li>
            <b>Still:</b> Kameran eller kortet är inte helt stilla när bilden
            tas.
          </li>
          <li>
            <b>Färger:</b> kan få bilden att smälta ihop med omgivningen.
          </li>
        </ul>
      </ul>

      {!toggleIsCamera ? (
        <ButtonToStartCamera startCamera={handleToggleCamera} />
      ) : (
        <GetUserMedia
          imageHandler={performOCR}
          onInputChange={handleInputChange}
          stopCamera={handleToggleCamera}
        ></GetUserMedia>
      )}

      <Form changeInputValue={cardNumber} onInputChange={handleInputChange} />
    </main>
  );
};

export default App;

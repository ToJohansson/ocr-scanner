import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import IDExtractionComponent from "./IDExtractionComponent"; // Importera IDExtractionComponent

function OCRComponent({ onOCRComplete, isModalOpen }) {
  // Skapa en lokal state för att lagra den extraherade texten
  const [extractedText, setExtractedText] = useState("");

  // Anropa performOCR när 'isModalOpen' ändras
  useEffect(() => {
    async function performOCR(image) {
      try {
        if (!isModalOpen) {
          return; // Avbryt om OCR inte ska fortsätta
        }
        const {
          data: { text },
        } = await Tesseract.recognize(image, "eng");

        // Uppdatera den lokala state med den extraherade texten
        setExtractedText(text);
      } catch (error) {
        console.error("Error during OCR:", error);
      }
    }

    // Anropa performOCR här när det är dags att utföra OCR
  }, [isModalOpen]);

  // Anropa 'onOCRComplete' när 'extractedText' ändras
  useEffect(() => {
    if (extractedText) {
      onOCRComplete(extractedText);
    }
  }, [extractedText, onOCRComplete]);

  return (
    <div>
      {/* Lägg till en giltig href i din anchor-tag */}
      <a href="#some-link">Länktext</a>

      {/* Lägg till IDExtractionComponent och skicka med den extraherade texten */}
      <IDExtractionComponent
        text={extractedText}
        onIDExtracted={setExtractedText}
      />

      {/* JSX för OCR-komponenten */}
    </div>
  );
}

export default OCRComponent;

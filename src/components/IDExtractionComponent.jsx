import React, { useEffect } from "react";

function IDExtractionComponent({ text, onIDExtracted }) {
  useEffect(() => {
    // SKIDATA card pattern
    const skidataPattern = /(\d{2}-\d{4} \d{4} \d{4} \d{4} \d{4}-\d)/;

    // Använd regex för att hitta en matchning i texten
    const match = text.match(skidataPattern);

    // Om en matchning hittades
    if (match) {
      // Extrahera ID-numret från regex-matchningen
      const idNumber = match[0];
      console.log("EXTRACT ID " + idNumber);

      // Anropa onIDExtracted med det extraherade ID-numret
      onIDExtracted(idNumber);
    }
  }, [text]);

  // JSX för komponenten för ID-extraktion
  return <div>{text && <p>Extraherat ID: {text}</p>}</div>;
}

export default IDExtractionComponent;

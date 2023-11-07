import extractIDNumber from "./extract-string-pattern";
import Tesseract from "tesseract.js";

export async function performOCR(image) {
  try {
    // TEST DATA
    //const testImage = "01-1614 7159 9231 0288 3409-5";

    const {
      data: { text },
    } = await Tesseract.recognize(image, "eng");

    console.log(text);

    const extractId = extractIDNumber(text);
    if (extractId) {
      console.log("MATCH ", extractId);

      return extractId;
    } else {
      console.log("NO MATCH");
      return null;
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  }
}

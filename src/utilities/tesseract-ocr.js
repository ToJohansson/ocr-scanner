import extractIDNumber from "./extract-string-pattern";
import Tesseract from "tesseract.js";

export async function performOCR(image) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(image, "eng");

    const extractId = extractIDNumber(text);
    if (extractId) {
      return extractId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  }
}

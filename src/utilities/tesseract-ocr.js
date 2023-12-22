import { skipassIdNumber } from "./extract-string-pattern";
import Tesseract from "tesseract.js";
/**
 * ************* PerformOCR *******************
 *
 *  props:
 *        - image är en base64url
 *
 *  components:
 *             - extractIDNumber: tar emot en String och kollar om
 *               ett visst mönster i skickad sträng matchar ett
 *               specifikt förutbestämt mönster.
 *
 * @param {object} image
 * @returns
 */
export const performOCR = async (image) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(image, "eng");
    const extractedId = skipassIdNumber(text);
    if (extractedId) {
      return extractedId;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error during OCR:", error);
  }
};

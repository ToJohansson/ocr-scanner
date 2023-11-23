/**
 * // Function to increase contrast between dark and black pixels
 * 
 * @param {CanvasRenderingContext2D} context 
 * - The 2D rendering context of the canvas.
 * 
 * @param {HTMLCanvasElement} canvas 
 * - The HTML canvas element to which the contrast adjustment will be applied.
 
 */
export function contrastFilter(context, canvas) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Calculate the brightness
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

    // Define a threshold to distinguish between black and other colors
    const threshold = 170;

    // If the pixel is black (below the threshold), make it even darker
    if (brightness < threshold) {
      data[i] = 0; // Red
      data[i + 1] = 0; // Green
      data[i + 2] = 0; // Blue
    } else {
      // If the pixel is not black, make it brighter (you can adjust the factor)
      const brightnessDiff = brightness - threshold;
      data[i] += brightnessDiff;
      data[i + 1] += brightnessDiff;
      data[i + 2] += brightnessDiff;
    }
  }

  context.putImageData(imageData, 0, 0);
}

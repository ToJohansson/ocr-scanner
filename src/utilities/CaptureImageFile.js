async function captureImage() {
  try {
    if (!videoRef.current) {
      console.log("Video element is not available");
      return;
    }
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    // Set the canvas dimensions to match the video frame
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Capture the entire video frame
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Display the captured image
    // contrastFilter(context, canvas);
    const image = canvas.toDataURL("image/jpeg");
    console.log(count, ": IMAGE ");
    console.log(image);

    if (count < 20) {
      if (image.length < 10) {
        console.log(" IMAGE IS BROKEN ", image);
        return;
      }

      const extractedWTPNumber = await props.imageHandler(image);
      if (extractedWTPNumber) {
        props.setIsExtractedWTPNumber(extractedWTPNumber);
        setDebugImage(image);

        stopVideoStream();
        count = 1;
        return;
      }

      count++;
      captureImage();
    }
  } catch (error) {
    console.error("Error capturing image:", error);
  }
}

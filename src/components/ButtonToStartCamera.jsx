import React from "react";

function ButtonToStartCamera(props) {
  return (
    <div>
      <button
        className="button-to-start-camera"
        role="button"
        onClick={props.startCamera}
      >
        Start Camera
      </button>
    </div>
  );
}

export default ButtonToStartCamera;

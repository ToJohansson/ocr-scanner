import React from "react";

function ButtonToStartCamera({ onClick }) {
  return (
    <div>
      <button
        className="button-to-start-camera"
        role="button"
        onClick={onClick}
      >
        Start Camera
      </button>
    </div>
  );
}

export default ButtonToStartCamera;

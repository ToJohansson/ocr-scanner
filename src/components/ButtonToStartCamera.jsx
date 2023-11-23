import React from "react";
/**
 * knapp för att starta kameran.
 * tar emot en funktion som byter state på en bool.
 *
 * @param {object} props
 * @returns
 */
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

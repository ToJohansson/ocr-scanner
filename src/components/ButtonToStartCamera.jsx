/**
 * knapp för att starta kameran.
 * tar emot en funktion som byter state på en bool.
 *
 * @param {object} props
 * @returns
 */
const ButtonToStartCamera = (props) => {
  return (
    <button
      className="button-to-start-camera"
      role="button"
      onClick={props.startCamera}
    >
      Start Camera
    </button>
  );
};

export default ButtonToStartCamera;

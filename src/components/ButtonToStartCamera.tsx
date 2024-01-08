/**
 * knapp för att starta kameran.
 * tar emot en funktion som byter state på en bool.
 *
 * @param {object} props
 * @returns
 */
interface Props {
  startCamera: () => void;
}
const ButtonToStartCamera = (props: Props) => {
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

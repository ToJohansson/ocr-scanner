import { useEffect, useState } from "react";
/**
 * Form för att skriva in WTP id manuellt
 * eller ta emot en WTP sträng
 * PROPS
 *      - changeInputValue: kan skicka en sträng som kommer visas i input fältet
 *      - onInputChange: funktion som kan updatera ett state i App.
 * @param {object} param0
 * @returns
 */
const Form = (props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (props.changeInputValue !== null && props.changeInputValue !== "") {
      setInputValue(props.changeInputValue);
    }
  }, [props.changeInputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    props.onInputChange(e.target.value); // Notify the parent component of the change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("WTP number submitted: " + inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputValue">Skipass</label>
      <input
        className="input-form"
        type="text"
        id="inputValue"
        placeholder="Enter WTP Number Here"
        value={inputValue}
        onChange={handleInputChange}
      />

      <input type="submit" id="submit" value="submit" />
    </form>
  );
};

export default Form;

import { FormEvent, useEffect, useState } from "react";
import { Interface } from "readline";
/**
 * Form för att skriva in WTP id manuellt
 * eller ta emot en WTP sträng
 * PROPS
 *      - changeInputValue: kan skicka en sträng som kommer visas i input fältet
 *      - onInputChange: funktion som kan updatera ett state i App.
 * @param {object} param0
 * @returns
 */

interface Props {
  changeInputValue: string;
  onInputChange: (prevCardNumber: string) => void;
}

const Form = ({ changeInputValue, onInputChange }: Props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (changeInputValue !== null && changeInputValue !== "") {
      setInputValue(changeInputValue);
    }
  }, [changeInputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("WTP number submitted: " + inputValue);
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

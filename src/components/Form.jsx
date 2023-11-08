import React, { useEffect, useState } from "react";

function Form({ wtpNum, onInputChange }) {
  const [wtpNumber, setWtpNumber] = useState("");

  const handleInputChange = (e) => {
    setWtpNumber(e.target.value);
    onInputChange(e.target.value); // Notify the parent component of the change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("WTP number submitted: " + wtpNumber);
  };

  useEffect(() => {
    if (wtpNum !== null && wtpNum !== "") {
      setWtpNumber(wtpNum);
    }
  }, [wtpNum]);

  return (
    <div className="container-submit-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="wtpNumber">Skipass</label>
          <input
            type="text"
            id="wtpNumber"
            placeholder="Enter WTP Number Here"
            value={wtpNumber}
            maxLength="30"
            onChange={handleInputChange}
          />
        </div>

        <input type="submit" id="submit" value="submit" />
      </form>
    </div>
  );
}

export default Form;

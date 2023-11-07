function extractIDNumber(inputString) {
  console.log("extract ", inputString);
  // SKIDATA card pattern
  const skidataPattern = /(\d{2}-\d{4} \d{4} \d{4} \d{4} \d{4}-\d)/;

  // Use the regular expression to find a match in the input string
  const match = inputString.match(skidataPattern);

  if (match) {
    // Extract the matched ID number from the regex match
    const idNumber = match[0];

    return idNumber;
  } else {
    return null;
  }
}

export default extractIDNumber;

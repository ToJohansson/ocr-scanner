function extractIDNumber(inputString) {
  console.log("extract ", inputString);
  // inputString test for team axess
  //inputString = "12345ABC-123-ABC";

  //WTP-card pattern
  const skidataPattern = /(\d{2}-\d{4} \d{4} \d{4} \d{4} \d{4}-\d)/;
  const teamAxessPattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/;

  // Use the regular expression to find a match in the input string
  const skidataMatch = inputString.match(skidataPattern);
  const teamAxessMatch = inputString.match(teamAxessPattern);

  // if its a skidata number
  if (skidataMatch) {
    console.log("Skidata card detected: ", skidataMatch[0]);
    return skidataMatch[0];
  } // if its a team axess number
  else if (teamAxessMatch) {
    console.log("Axess Card detected: ", teamAxessMatch[0]);
    return teamAxessMatch[0];
  } // No match
  else {
    return null;
  }
}

export default extractIDNumber;

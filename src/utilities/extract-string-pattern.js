/**
 *
 *  ************* extract-string-pattern  ****************
 *
 *  Denna komponent kollar om skickad sträng innehåller ett förbestämt mönster.
 *  om "ja", skickar då tillbaka bara det upptäckta mönstret,
 *  Annars returnera null
 *
 * props:
 *      - inputstring: en text sträng
 *
 * @param {object} inputString
 * @returns
 */
function skipassIdNumber(inputString) {
  const teamAxessId = extractTeamAxessId(inputString);
  const skidataId = extractSkidataId(inputString);

  if (skidataId) {
    console.log("Skidata card detected: ", skidataId);
    return skidataId;
  } else if (teamAxessId) {
    console.log("Axess Card detected: ", teamAxessId);
    return teamAxessId;
  } else {
    console.log("No valid card ID detected.");
    return undefined;
  }
}

function extractSkidataId(inputString) {
  const skidataPattern = /(\d{2}-\d{4} \d{4} \d{4} \d{4} \d{4}-\d)/;
  const skidataMatch = inputString.match(skidataPattern);
  return skidataMatch ? skidataMatch[0] : null;
}

function extractTeamAxessId(inputString) {
  const teamAxessPattern = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/;
  const teamAxessMatch = inputString.match(teamAxessPattern);
  return teamAxessMatch ? teamAxessMatch[0] : null;
}

export default skipassIdNumber;

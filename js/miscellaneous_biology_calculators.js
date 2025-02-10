// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// ✅ Helper Function to Show Explanation Properly (Solid Green)
function showExplanation(explanationBox, content) {
  explanationBox.style.display = "block";
  explanationBox.innerHTML = content;
}

// ✅ Utility Function for Error Handling
function handleError(resultId, explanationBox, message) {
  document.getElementById(resultId).textContent = message;
  explanationBox.style.display = "none";
}

// ✅ Unit Conversion Tools
document.getElementById("conversion-btn").addEventListener("click", () => {
  const value = parseFloat(document.getElementById("value-to-convert").value);
  const conversionType = document.getElementById("conversion-type").value;
  const explanationBox = document.getElementById("conversion-explanation");

  if (isNaN(value)) {
    handleError("conversion-result", explanationBox, "Error: Please enter a valid value.");
    return;
  }

  let result = "Conversion type not supported.";
  switch (conversionType) {
    case "ml-to-l":
      result = `${value} mL = ${(value / 1000).toFixed(3)} L`;
      break;
    case "ng-to-mcg":
      result = `${value} ng = ${(value / 1000).toFixed(3)} µg`;
      break;
    case "l-to-ml":
      result = `${value} L = ${(value * 1000).toFixed(3)} mL`;
      break;
    case "mcg-to-ng":
      result = `${value} µg = ${(value * 1000).toFixed(3)} ng`;
      break;
  }

  document.getElementById("conversion-result").textContent = result;
  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Converts between selected units.<br>
    - Uses standard conversion factors.<br>
  `);
});

// ✅ Concentration-Time Decay Calculator
document.getElementById("decay-btn").addEventListener("click", () => {
  const initialConcentration = parseFloat(document.getElementById("initial-concentration").value);
  const decayRate = parseFloat(document.getElementById("decay-rate").value);
  const timeElapsed = parseFloat(document.getElementById("time-elapsed").value);
  const explanationBox = document.getElementById("decay-explanation");

  if (isNaN(initialConcentration) || isNaN(decayRate) || isNaN(timeElapsed)) {
    handleError("decay-result", explanationBox, "Error: Please enter valid inputs.");
    return;
  }

  if (decayRate <= 0) {
    handleError("decay-result", explanationBox, "Error: Decay rate must be positive.");
    return;
  }

  const result = `Concentration after ${timeElapsed} units: ${(initialConcentration * Math.exp(-decayRate * timeElapsed)).toFixed(2)}`;
  document.getElementById("decay-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Uses the exponential decay formula: C = C₀ * e^(-kt).<br>
    - k = decay rate, t = time elapsed.<br>
  `);
});

// ✅ Oxygen Consumption Rate Calculator
document.getElementById("oxygen-consumption-btn").addEventListener("click", () => {
  const oxygenVolume = parseFloat(document.getElementById("o2-volume").value);
  const time = parseFloat(document.getElementById("time").value);
  const explanationBox = document.getElementById("oxygen-consumption-explanation");

  if (isNaN(oxygenVolume) || isNaN(time)) {
    handleError("oxygen-consumption-result", explanationBox, "Error: Please enter valid inputs.");
    return;
  }

  if (time <= 0) {
    handleError("oxygen-consumption-result", explanationBox, "Error: Time must be greater than zero.");
    return;
  }

  const result = `Oxygen Consumption Rate: ${(oxygenVolume / time).toFixed(2)} mL/min`;
  document.getElementById("oxygen-consumption-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Calculates oxygen consumption per minute.<br>
    - Simply divide oxygen volume by time.<br>
  `);
});

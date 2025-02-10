// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// ✅ Helper Function to Show Explanation Properly
function showExplanation(explanationBox, content) {
  explanationBox.style.display = "block";
  explanationBox.innerHTML = content;
}

// ✅ Utility Function for Error Handling
function handleError(resultId, explanationBox, message) {
  document.getElementById(resultId).textContent = message;
  explanationBox.style.display = "none";
}

// ✅ pH and pKa Calculator
document.getElementById("ph-pka-btn").addEventListener("click", () => {
  const acidConcentration = parseFloat(document.getElementById("acid-concentration").value);
  const baseConcentration = parseFloat(document.getElementById("base-concentration").value);
  const pKa = parseFloat(document.getElementById("pka-value").value);
  const explanationBox = document.getElementById("ph-pka-explanation");

  if (isNaN(acidConcentration) || isNaN(baseConcentration) || isNaN(pKa) || acidConcentration <= 0 || baseConcentration <= 0) {
    handleError("ph-pka-result", explanationBox, "Error: Please enter valid positive inputs.");
    return;
  }

  const result = `pH: ${(pKa + Math.log10(baseConcentration / acidConcentration)).toFixed(2)}`;
  document.getElementById("ph-pka-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Uses the Henderson-Hasselbalch equation: pH = pKa + log([A-]/[HA]).<br>
    - Enter acid concentration, base concentration, and pKa value.<br>
  `);
});

// ✅ Metabolite Concentration Calculator
document.getElementById("metabolite-btn").addEventListener("click", () => {
  const metaboliteAmount = parseFloat(document.getElementById("metabolite-amount").value);
  const solutionVolume = parseFloat(document.getElementById("solution-volume").value);
  const explanationBox = document.getElementById("metabolite-explanation");

  if (isNaN(metaboliteAmount) || isNaN(solutionVolume) || metaboliteAmount <= 0 || solutionVolume <= 0) {
    handleError("metabolite-result", explanationBox, "Error: Please enter valid positive inputs.");
    return;
  }

  const result = `Concentration: ${(metaboliteAmount / solutionVolume).toFixed(2)} mol/L`;
  document.getElementById("metabolite-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Uses concentration formula: C = mol/volume.<br>
    - Enter the amount of metabolite and solution volume.<br>
  `);
});

// ✅ Respiratory Quotient Calculator
document.getElementById("respiratory-btn").addEventListener("click", () => {
  const co2Produced = parseFloat(document.getElementById("co2-produced").value);
  const o2Consumed = parseFloat(document.getElementById("o2-consumed").value);
  const explanationBox = document.getElementById("respiratory-explanation");

  if (isNaN(co2Produced) || isNaN(o2Consumed) || co2Produced <= 0 || o2Consumed <= 0) {
    handleError("respiratory-result", explanationBox, "Error: Please enter valid positive inputs.");
    return;
  }

  const result = `Respiratory Quotient (RQ): ${(co2Produced / o2Consumed).toFixed(2)}`;
  document.getElementById("respiratory-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - RQ is calculated as CO₂ produced / O₂ consumed.<br>
    - Enter values for CO₂ production and O₂ consumption.<br>
  `);
});

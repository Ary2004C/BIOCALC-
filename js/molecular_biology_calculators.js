// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// Utility function to handle calculations
function calculateAndDisplay({ inputIds, formula, resultId, explanationId, explanationHTML }) {
  const inputs = inputIds.map(id => parseFloat(document.getElementById(id).value.trim()));
  
  // Check if any input is NaN or non-positive (where applicable)
  if (inputs.some(val => isNaN(val) || val <= 0)) {
    document.getElementById(resultId).textContent = "Error: Please enter valid inputs.";
    document.getElementById(explanationId).style.display = "none";
    return;
  }

  const result = formula(...inputs);

  // Update result and explanation
  document.getElementById(resultId).textContent = result;
  const explanationBox = document.getElementById(explanationId);
  explanationBox.style.display = "block";
  explanationBox.style.backgroundColor = "#4CAF50";
  explanationBox.style.color = "#fff";
  explanationBox.innerHTML = explanationHTML;
}

// PCR Calculator
document.getElementById("pcr-btn").addEventListener("click", () => {
  calculateAndDisplay({
    inputIds: ["pcr-c1", "pcr-v1", "pcr-c2"],
    formula: (c1, v1, c2) => `Final Volume (V2): ${(c1 * v1 / c2).toFixed(2)} µL`,
    resultId: "pcr-result",
    explanationId: "pcr-explanation",
    explanationHTML: `
      <strong>How it Works:</strong><br>
      - Uses the C1V1 = C2V2 equation to calculate missing values.<br>
      - If three values are provided, the missing one is computed.<br>
      - Input valid concentration and volume values.<br>
    `
  });
});

// Molarity Calculator
document.getElementById("molarity-btn").addEventListener("click", () => {
  calculateAndDisplay({
    inputIds: ["molarity-mol", "molarity-l"],
    formula: (moles, volume) => `Molarity: ${(moles / volume).toFixed(2)} M`,
    resultId: "molarity-result",
    explanationId: "molarity-explanation",
    explanationHTML: `
      <strong>How it Works:</strong><br>
      - Molarity (M) is calculated using the formula M = moles / volume (L).<br>
      - Input the amount of substance in moles and solution volume in liters.<br>
      - The result is the molar concentration of the solution.<br>
    `
  });
});

// Dilution Calculator
document.getElementById("dilution-btn").addEventListener("click", () => {
  calculateAndDisplay({
    inputIds: ["dilution-c1", "dilution-v1", "dilution-c2"],
    formula: (c1, v1, c2) => `Final Volume (V2): ${(c1 * v1 / c2).toFixed(2)} µL`,
    resultId: "dilution-result",
    explanationId: "dilution-explanation",
    explanationHTML: `
      <strong>How it Works:</strong><br>
      - Uses the dilution formula C1V1 = C2V2.<br>
      - Enter the initial concentration (C1), initial volume (V1), and final concentration (C2).<br>
      - The missing final volume (V2) is computed.<br>
    `
  });
});

// DNA/RNA Concentration Calculator
document.getElementById("concentration-btn").addEventListener("click", () => {
  calculateAndDisplay({
    inputIds: ["abs260", "dilution-factor"],
    formula: (abs260, dilutionFactor) => `Concentration: ${(abs260 * dilutionFactor * 50).toFixed(2)} µg/mL`,
    resultId: "concentration-result",
    explanationId: "concentration-explanation",
    explanationHTML: `
      <strong>How it Works:</strong><br>
      - Uses the A260 reading to estimate nucleic acid concentration.<br>
      - DNA concentration = A260 × dilution factor × 50 µg/mL.<br>
      - Enter correct values to calculate the concentration.<br>
    `
  });
});

// Melting Temperature (Tm) Calculator
document.getElementById("tm-btn").addEventListener("click", () => {
  const sequence = document.getElementById("sequence").value.trim().toUpperCase();
  const explanationBox = document.getElementById("tm-explanation");

  if (!sequence || !/^[ATGC]+$/i.test(sequence)) {
    document.getElementById("tm-result").textContent = "Error: Please enter a valid DNA sequence.";
    explanationBox.style.display = "none";
    return;
  }

  const atCount = (sequence.match(/[AT]/gi) || []).length;
  const gcCount = (sequence.match(/[GC]/gi) || []).length;
  const tm = (atCount * 2) + (gcCount * 4);

  document.getElementById("tm-result").textContent = `Melting Temperature (Tm): ${tm}°C`;
  explanationBox.style.display = "block";
  explanationBox.style.backgroundColor = "#4CAF50";
  explanationBox.style.color = "#fff";
  explanationBox.innerHTML = `
    <strong>How it Works:</strong><br>
    - Calculates Tm using the Wallace rule: (A+T)×2 + (G+C)×4.<br>
    - Enter a valid DNA sequence containing A, T, G, and C only.<br>
    - The result is the estimated melting temperature in Celsius.<br>
  `;
});

// Restriction Enzyme Digest Calculator
document.getElementById("digest-btn").addEventListener("click", () => {
  calculateAndDisplay({
    inputIds: ["dna-concentration", "enzyme-volume"],
    formula: (dnaConc, enzymeVolume) => `Digest Reaction: Use ${(dnaConc * enzymeVolume).toFixed(2)} ng/µL`,
    resultId: "digest-result",
    explanationId: "digest-explanation",
    explanationHTML: `
      <strong>How it Works:</strong><br>
      - Calculates the amount of DNA needed for a restriction digest.<br>
      - Multiply DNA concentration by enzyme volume to get required amount.<br>
      - Ensure valid inputs for accurate calculations.<br>
    `
  });
});

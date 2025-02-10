// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// ✅ Helper Function to Show Explanation Properly
function showExplanation(explanationBox, content) {
  explanationBox.style.display = "block"; // Show the explanation
  explanationBox.innerHTML = content; // Set explanation text
}

// ✅ Cell Culture Dilution Calculator
document.getElementById("culture-dilution-btn").addEventListener("click", () => {
  const initialCellCount = parseFloat(document.getElementById("initial-cells").value);
  const dilutionFactor = parseFloat(document.getElementById("dilution-factor").value);
  const explanationBox = document.getElementById("culture-dilution-explanation");

  if (isNaN(initialCellCount) || isNaN(dilutionFactor) || initialCellCount <= 0 || dilutionFactor <= 0) {
    document.getElementById("culture-dilution-result").textContent = "Error: Enter valid numbers greater than 0.";
    explanationBox.style.display = "none";
    return;
  }

  const result = `Final Cell Count: ${Math.round(initialCellCount / dilutionFactor)} cells`;
  document.getElementById("culture-dilution-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Final cell count is calculated by dividing the initial cell count by the dilution factor.<br>
    - Input the initial cell count and dilution factor to calculate the result.<br>
  `);
});

// ✅ Cell Viability Calculator
document.getElementById("viability-btn").addEventListener("click", () => {
  const totalCells = parseFloat(document.getElementById("total-cells").value);
  const viableCells = parseFloat(document.getElementById("viable-cells").value);
  const explanationBox = document.getElementById("viability-explanation");

  if (isNaN(totalCells) || isNaN(viableCells) || totalCells <= 0 || viableCells < 0 || viableCells > totalCells) {
    document.getElementById("viability-result").textContent = "Error: Enter valid numbers. Viable cells must be between 0 and total cells.";
    explanationBox.style.display = "none";
    return;
  }

  const result = `Cell Viability: ${((viableCells / totalCells) * 100).toFixed(2)}%`;
  document.getElementById("viability-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Cell viability is calculated as the percentage of viable cells out of total cells.<br>
    - Enter the total and viable cell counts to calculate the result.<br>
  `);
});

// ✅ Doubling Time Calculator
document.getElementById("doubling-time-btn").addEventListener("click", () => {
  const initialPopulation = parseFloat(document.getElementById("initial-population").value);
  const finalPopulation = parseFloat(document.getElementById("final-population").value);
  const timeElapsed = parseFloat(document.getElementById("time").value);
  const explanationBox = document.getElementById("doubling-time-explanation");

  if (isNaN(initialPopulation) || isNaN(finalPopulation) || isNaN(timeElapsed) ||
      initialPopulation <= 0 || finalPopulation < initialPopulation || timeElapsed <= 0) {
    document.getElementById("doubling-time-result").textContent = "Error: Enter valid numbers. Final population must be >= initial.";
    explanationBox.style.display = "none";
    return;
  }

  if (finalPopulation === initialPopulation) {
    document.getElementById("doubling-time-result").textContent = "No growth observed.";
    explanationBox.style.display = "none";
    return;
  }

  const doublingTime = (timeElapsed * Math.log(2)) / Math.log(finalPopulation / initialPopulation);
  document.getElementById("doubling-time-result").textContent = `Doubling Time: ${doublingTime.toFixed(2)} hours`;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Doubling time is calculated using the formula: t = (t * log(2)) / log(N2 / N1).<br>
    - It calculates how long it takes for the population to double in size.<br>
  `);
});

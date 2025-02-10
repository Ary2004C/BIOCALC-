// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// ✅ Helper Function to Show Explanation Properly
function showExplanation(explanationBox, content) {
  explanationBox.style.display = "block"; // Show the explanation
  explanationBox.innerHTML = content; // Set explanation text
}

// ✅ Population Growth Calculator
document.getElementById("population-growth-btn").addEventListener("click", () => {
  const initialPopulation = parseFloat(document.getElementById("initial-population").value);
  const growthRate = parseFloat(document.getElementById("growth-rate").value);
  const time = parseFloat(document.getElementById("time").value);
  const explanationBox = document.getElementById("population-growth-explanation");

  if (isNaN(initialPopulation) || isNaN(growthRate) || isNaN(time)) {
    document.getElementById("population-growth-result").textContent = "Error: Please enter valid inputs.";
    explanationBox.style.display = "none";
    return;
  }

  const result = `Population after ${time} units of time: ${(initialPopulation * Math.exp(growthRate * time)).toFixed(2)}`;
  document.getElementById("population-growth-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Uses the exponential growth formula: N = N0 * e^(rt).<br>
    - Input initial population (N0), growth rate (r), and time (t).<br>
  `);
});

// ✅ Hardy-Weinberg Equilibrium Calculator
document.getElementById("hardy-weinberg-btn").addEventListener("click", () => {
  const alleleP = parseFloat(document.getElementById("allele-p").value);
  const alleleQ = parseFloat(document.getElementById("allele-q").value);
  const explanationBox = document.getElementById("hardy-weinberg-explanation");

  if (isNaN(alleleP) || isNaN(alleleQ) || Math.abs(alleleP + alleleQ - 1) > 0.001) {
    document.getElementById("hardy-weinberg-result").textContent = "Error: Allele frequencies must add up to 1.";
    explanationBox.style.display = "none";
    return;
  }

  const homozygousDominant = (alleleP ** 2).toFixed(2);
  const heterozygous = (2 * alleleP * alleleQ).toFixed(2);
  const homozygousRecessive = (alleleQ ** 2).toFixed(2);

  const result = `Genotype Frequencies - AA: ${homozygousDominant}, Aa: ${heterozygous}, aa: ${homozygousRecessive}`;
  document.getElementById("hardy-weinberg-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Allele frequencies must add to 1.<br>
    - Genotype frequencies: AA = pp, Aa = 2pq, aa = qq.<br>
  `);
});

// ✅ Species Diversity Calculator
document.getElementById("species-diversity-btn").addEventListener("click", () => {
  const speciesAbundanceInput = document.getElementById("species-abundance").value.trim();
  const speciesAbundance = speciesAbundanceInput.split(",").map(num => parseFloat(num)).filter(num => !isNaN(num) && num > 0);

  if (speciesAbundance.length === 0) {
    document.getElementById("species-diversity-result").textContent = "Error: Please enter valid species abundance data.";
    document.getElementById("species-diversity-explanation").style.display = "none";
    return;
  }

  const totalIndividuals = speciesAbundance.reduce((sum, num) => sum + num, 0);
  const shannonIndex = speciesAbundance.reduce((sum, num) => {
    const proportion = num / totalIndividuals;
    return proportion > 0 ? sum - proportion * Math.log(proportion) : sum;
  }, 0).toFixed(2);

  document.getElementById("species-diversity-result").textContent = `Shannon Diversity Index: ${shannonIndex}`;

  showExplanation(document.getElementById("species-diversity-explanation"), `
    <strong>How it Works:</strong><br>
    - Shannon Index measures species diversity based on abundance.<br>
    - Calculated by: H' = -Σ(pi * log(pi)) where pi is the proportion of each species.<br>
  `);
});

// ✅ Carrying Capacity Calculator
document.getElementById("carrying-capacity-btn").addEventListener("click", () => {
  const availableResources = parseFloat(document.getElementById("available-resources").value);
  const resourcesPerIndividual = parseFloat(document.getElementById("resources-per-individual").value);
  const explanationBox = document.getElementById("carrying-capacity-explanation");

  if (isNaN(availableResources) || isNaN(resourcesPerIndividual) || resourcesPerIndividual <= 0) {
    document.getElementById("carrying-capacity-result").textContent = "Error: Please enter valid inputs.";
    explanationBox.style.display = "none";
    return;
  }

  const result = `Carrying Capacity: ${(availableResources / resourcesPerIndividual).toFixed(2)} individuals`;
  document.getElementById("carrying-capacity-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Carrying capacity = available resources / resources per individual.<br>
    - Determines the number of individuals an environment can support.<br>
  `);
});

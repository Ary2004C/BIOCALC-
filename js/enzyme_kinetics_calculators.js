// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// ✅ Generic Function to Compute Michaelis-Menten Equation
function calculateMichaelisMenten(vmax, substrate, km) {
  return (vmax * substrate) / (km + substrate);
}

// ✅ Helper Function to Handle Display
function showExplanation(explanationBox, content) {
  explanationBox.style.display = "block";
  explanationBox.innerHTML = content;
}

// ✅ Input Validation Function
function getValidNumber(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

// ✅ Michaelis-Menten Calculator
document.getElementById("michaelis-btn").addEventListener("click", () => {
  const vmax = getValidNumber("vmax");
  const substrate = getValidNumber("substrate");
  const km = getValidNumber("km");
  const explanationBox = document.getElementById("michaelis-explanation");

  if (!vmax || !substrate || !km) {
    document.getElementById("michaelis-result").textContent = "Error: Please enter valid inputs.";
    explanationBox.style.display = "none";
    return;
  }

  const result = `Reaction Velocity (v): ${calculateMichaelisMenten(vmax, substrate, km).toFixed(2)} units`;
  document.getElementById("michaelis-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Uses the Michaelis-Menten equation: v = (Vmax × [S]) / (Km + [S]).<br>
    - Input Vmax, substrate concentration [S], and Km.<br>
  `);
});

// ✅ Lineweaver-Burk Plot Tool
document.getElementById("lineweaver-btn").addEventListener("click", () => {
  const s1 = getValidNumber("s1");
  const v1 = getValidNumber("v1");
  const s2 = getValidNumber("s2");
  const v2 = getValidNumber("v2");
  const explanationBox = document.getElementById("lineweaver-explanation");

  if (!s1 || !v1 || !s2 || !v2) {
    document.getElementById("lineweaver-result").textContent = "Error: Please enter valid inputs.";
    explanationBox.style.display = "none";
    return;
  }

  const inverseS1 = 1 / s1;
  const inverseV1 = 1 / v1;
  const inverseS2 = 1 / s2;
  const inverseV2 = 1 / v2;

  const slope = (inverseV2 - inverseV1) / (inverseS2 - inverseS1);
  const yIntercept = inverseV1 - slope * inverseS1;

  const result = `Slope: ${slope.toFixed(2)}, Y-Intercept: ${yIntercept.toFixed(2)}`;
  document.getElementById("lineweaver-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Calculates Lineweaver-Burk plot values from inverse substrate and velocity.<br>
    - Determines slope and y-intercept.<br>
  `);
});

// ✅ Reaction Velocity Calculator (Reuses Michaelis-Menten Equation)
document.getElementById("reaction-btn").addEventListener("click", () => {
  const substrate = getValidNumber("reaction-s");
  const vmax = getValidNumber("reaction-vmax");
  const km = getValidNumber("reaction-km");
  const explanationBox = document.getElementById("reaction-explanation");

  if (!substrate || !vmax || !km) {
    document.getElementById("reaction-result").textContent = "Error: Please enter valid inputs.";
    explanationBox.style.display = "none";
    return;
  }

  const result = `Reaction Velocity: ${calculateMichaelisMenten(vmax, substrate, km).toFixed(2)} units`;
  document.getElementById("reaction-result").textContent = result;

  showExplanation(explanationBox, `
    <strong>How it Works:</strong><br>
    - Uses the Michaelis-Menten equation.<br>
    - Calculates reaction velocity given [S], Vmax, and Km.<br>
  `);
});

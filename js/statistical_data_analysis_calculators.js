document.addEventListener("DOMContentLoaded", () => {
  // CSS classes for styling
  const explanationClasses = ['visible-explanation'];
  const errorClasses = ['error-message'];

  // Hide all explanation boxes initially
  document.querySelectorAll(".explanation").forEach(explanation => {
    explanation.classList.remove(...explanationClasses);
  });

  // Utility Functions
  const mean = arr => arr.reduce((sum, val) => sum + val, 0) / arr.length;
  const variance = (arr, meanVal) => arr.reduce((sum, val) => sum + Math.pow(val - meanVal, 2), 0) / (arr.length - 1);

  const showExplanation = (boxId) => {
    const box = document.getElementById(boxId);
    if (box) box.classList.add(...explanationClasses);
  };

  const clearElement = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = '';
      el.classList.remove(...errorClasses);
    }
  };

  const showErrorMessage = (elementId, message) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.classList.add(...errorClasses);
    }
  };

  // Generic input validation
  const validateNumbersInput = (input, name) => {
    const original = input.trim().split(/[,\s]+/);
    const parsed = original.map(Number).filter(num => !isNaN(num));
    return { original, parsed };
  };

  // t-Test Calculator
  document.getElementById("t-test-btn")?.addEventListener("click", () => {
    const resultEl = document.getElementById("t-test-result");
    clearElement("t-test-result");
    showExplanation("t-test-explanation");

    // Validate and parse inputs
    const group1 = validateNumbersInput(document.getElementById("t-group1").value, "Group 1");
    const group2 = validateNumbersInput(document.getElementById("t-group2").value, "Group 2");

    if (group1.original.length !== group1.parsed.length || group2.original.length !== group2.parsed.length) {
      showErrorMessage("t-test-result", "Invalid numbers detected. Please enter only numeric values.");
      return;
    }

    if (group1.parsed.length < 2 || group2.parsed.length < 2) {
      showErrorMessage("t-test-result", "Each group requires at least two valid numbers.");
      return;
    }

    // Calculations
    const mean1 = mean(group1.parsed);
    const mean2 = mean(group2.parsed);
    const var1 = variance(group1.parsed, mean1);
    const var2 = variance(group2.parsed, mean2);
    const denominator = Math.sqrt(var1 / group1.parsed.length + var2 / group2.parsed.length);

    if (denominator === 0) {
      showErrorMessage("t-test-result", "Cannot compute t-value (division by zero).");
      return;
    }

    const tValue = (mean1 - mean2) / denominator;
    resultEl.textContent = `t-Value: ${tValue.toFixed(2)}`;
  });

  // ANOVA Calculator
  document.getElementById("anova-btn")?.addEventListener("click", () => {
    const resultEl = document.getElementById("anova-result");
    clearElement("anova-result");
    showExplanation("anova-explanation");

    // Validate and parse inputs
    const groupsInput = document.getElementById("anova-groups").value.trim();
    const groups = groupsInput.split(';').map(group => {
      return validateNumbersInput(group, "ANOVA group");
    });

    if (groups.length < 2 || groups.some(g => g.parsed.length < 2)) {
      showErrorMessage("anova-result", "Require at least two groups with two numbers each.");
      return;
    }

    // Calculations
    const allValues = groups.flatMap(g => g.parsed);
    const grandMean = mean(allValues);
    let ssBetween = 0, ssWithin = 0;
    const totalObservations = allValues.length;

    groups.forEach(({ parsed }) => {
      const groupMean = mean(parsed);
      ssBetween += parsed.length * Math.pow(groupMean - grandMean, 2);
      ssWithin += parsed.reduce((sum, val) => sum + Math.pow(val - groupMean, 2), 0);
    });

    const dfWithin = totalObservations - groups.length;
    if (dfWithin <= 0 || ssWithin === 0) {
      showErrorMessage("anova-result", "Insufficient data variation to compute F-value.");
      return;
    }

    const fValue = (ssBetween / (groups.length - 1)) / (ssWithin / dfWithin);
    resultEl.textContent = `F-Value: ${fValue.toFixed(2)}`;
  });

  // Chi-Square Calculator
  document.getElementById("chi-square-btn")?.addEventListener("click", () => {
    const resultEl = document.getElementById("chi-square-result");
    clearElement("chi-square-result");
    showExplanation("chi-square-explanation");

    // Validate and parse inputs
    const observed = validateNumbersInput(document.getElementById("observed").value, "Observed");
    const expected = validateNumbersInput(document.getElementById("expected").value, "Expected");

    if (observed.parsed.length !== expected.parsed.length) {
      showErrorMessage("chi-square-result", "Observed and expected must have equal numbers of values.");
      return;
    }

    if (observed.parsed.length === 0 || expected.parsed.length === 0) {
      showErrorMessage("chi-square-result", "Both observed and expected require valid numbers.");
      return;
    }

    // Calculations
    const totalObserved = observed.parsed.reduce((sum, val) => sum + val, 0);
    const totalExpected = expected.parsed.reduce((sum, val) => sum + val, 0);

    if (totalObserved === 0) {
      showErrorMessage("chi-square-result", "Observed values sum to zero. Cannot compute.");
      return;
    }

    const expectedScaled = expected.parsed.map(e => e * (totalObserved / totalExpected));
    const chiSquare = observed.parsed.reduce((sum, obs, i) => {
      return sum + (Math.pow(obs - expectedScaled[i], 2) / expectedScaled[i]);
    }, 0);

    resultEl.textContent = `Chi-Square Value: ${chiSquare.toFixed(2)}`;
  });
});
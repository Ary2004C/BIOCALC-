document.addEventListener("DOMContentLoaded", () => {
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

  // ✅ Punnett Square Calculator (Fixed Letter Case Handling)
  document.getElementById("punnett-btn").addEventListener("click", () => {
    const parent1 = document.getElementById("parent1-genotype").value.trim();
    const parent2 = document.getElementById("parent2-genotype").value.trim();
    const explanationBox = document.getElementById("punnett-explanation");

    // Validate that each parent has exactly two alleles (A-Z only, case-sensitive handling)
    const isValidGenotype = (genotype) => /^[A-Za-z]{2}$/.test(genotype);

    if (!isValidGenotype(parent1) || !isValidGenotype(parent2)) {
      handleError("punnett-result", explanationBox, "Error: Enter exactly two alleles (e.g., AA, Aa, Bb).");
      return;
    }

    // Generate all 4 offspring genotypes from the Punnett Square
    const combinations = [];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        // Maintain correct allele order with lowercase for recessive traits
        const sortedGenotype = [parent1[i], parent2[j]].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join("");
        combinations.push(sortedGenotype);
      }
    }

    // Display all 4 possible offspring genotypes
    const result = `Offspring Genotypes: ${combinations.join(", ")}`;
    document.getElementById("punnett-result").textContent = result;

    showExplanation(explanationBox, `
      <strong>How it Works:</strong><br>
      - Creates a Punnett square from two parental genotypes.<br>
      - Generates all possible offspring genotypes (4 outcomes).<br>
      - Maintains correct dominant/recessive allele order.<br>
    `);
  });

  // ✅ Mutation Rate Calculator
  document.getElementById("mutation-btn").addEventListener("click", () => {
    const totalBases = parseFloat(document.getElementById("total-bases").value);
    const mutations = parseFloat(document.getElementById("mutations").value);
    const explanationBox = document.getElementById("mutation-explanation");

    if (isNaN(totalBases) || isNaN(mutations) || totalBases <= 0 || mutations < 0) {
      handleError("mutation-result", explanationBox, "Error: Enter valid positive numbers.");
      return;
    }

    const mutationRate = mutations / totalBases;
    const resultText = `Mutation Rate: ${mutationRate.toExponential(2)} per base (${mutationRate.toFixed(8)} in decimal)`;

    document.getElementById("mutation-result").textContent = resultText;

    showExplanation(explanationBox, `
      <strong>How it Works:</strong><br>
      - Mutation rate is calculated as mutations / total bases.<br>
      - Displayed in both scientific and decimal notation for clarity.<br>
    `);
  });

  // ✅ Phylogenetic Distance Calculator
  document.getElementById("phylogenetic-btn").addEventListener("click", () => {
    const seq1 = document.getElementById("sequence1").value.trim().toUpperCase();
    const seq2 = document.getElementById("sequence2").value.trim().toUpperCase();
    const explanationBox = document.getElementById("phylogenetic-explanation");

    // Validate sequences are equal in length and contain only DNA bases (A, T, G, C)
    const isValidSequence = (seq) => /^[ATGC]+$/.test(seq);

    if (seq1.length !== seq2.length || !isValidSequence(seq1) || !isValidSequence(seq2)) {
      handleError("phylogenetic-result", explanationBox, "Error: Sequences must be equal length and contain only A, T, G, or C.");
      return;
    }

    const mismatches = seq1.split("").reduce((count, base, index) => count + (base !== seq2[index] ? 1 : 0), 0);
    const distance = (mismatches / seq1.length).toFixed(4);

    document.getElementById("phylogenetic-result").textContent = `Phylogenetic Distance: ${distance}`;

    showExplanation(explanationBox, `
      <strong>How it Works:</strong><br>
      - Calculates genetic divergence by comparing mismatched bases.<br>
      - Distance = (Mismatched bases) / (Total sequence length).<br>
      - Validates sequences to be equal in length and contain only A, T, G, C.<br>
    `);
  });
});

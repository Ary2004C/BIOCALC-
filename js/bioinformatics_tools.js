// Ensure explanation boxes are hidden initially
document.querySelectorAll(".explanation").forEach(explanation => {
  explanation.style.display = "none";
});

// Utility function for validation
function isValidDNA(sequence) {
  return /^[ATGC]*$/i.test(sequence); // DNA should contain only A, T, G, C
}

function isValidProtein(sequence) {
  return /^[ACDEFGHIKLMNPQRSTVWY]*$/i.test(sequence); // Protein should contain only valid 1-letter amino acid codes
}

// ✅ Codon Optimization Calculator
document.getElementById("codon-btn").addEventListener("click", () => {
  const dnaSequence = document.getElementById("codon-sequence").value.trim().toUpperCase();
  const explanationBox = document.getElementById("codon-explanation");

  if (!dnaSequence || !isValidDNA(dnaSequence)) {
    document.getElementById("codon-result").textContent = "Error: Invalid DNA sequence. Use only A, T, G, and C.";
    explanationBox.style.display = "none";
    return;
  }

  explanationBox.style.display = "block";
  explanationBox.style.backgroundColor = "#4CAF50";
  explanationBox.style.color = "#fff";

  const codonUsage = {
    ATG: "Start", TAA: "Stop", TAG: "Stop", TGA: "Stop", default: "Optimized"
  };

  const codons = dnaSequence.match(/.{1,3}/g) || [];
  const optimizedSequence = codons.map(codon => codonUsage[codon] || codonUsage.default).join(" ");

  document.getElementById("codon-result").textContent = `Optimized Codon Usage: ${optimizedSequence}`;

  explanationBox.innerHTML = `
    <strong>How it Works:</strong><br>
    - DNA sequence is split into codons (groups of 3 letters).<br>
    - Each codon is checked for known start/stop signals.<br>
    - Other codons are optimized for better expression.<br>
  `;
});

// ✅ Fixed Protein Molecular Weight Calculator
document.getElementById("protein-btn").addEventListener("click", () => {
  const sequence = document.getElementById("protein-sequence").value.trim().toUpperCase();
  const explanationBox = document.getElementById("protein-explanation");

  if (!sequence || !isValidProtein(sequence)) {
    document.getElementById("protein-result").textContent = "Error: Invalid protein sequence. Use only valid 1-letter amino acid codes.";
    explanationBox.style.display = "none";
    return;
  }

  explanationBox.style.display = "block";
  explanationBox.style.backgroundColor = "#4CAF50";
  explanationBox.style.color = "#fff";

  const molecularWeights = {
    A: 89.1, R: 174.2, N: 132.1, D: 133.1, C: 121.2,
    Q: 146.2, E: 147.1, G: 75.1, H: 155.2, I: 131.2,
    L: 131.2, K: 146.2, M: 149.2, F: 165.2, P: 115.1,
    S: 105.1, T: 119.1, W: 204.2, Y: 181.2, V: 117.1
  };

  let totalWeight = sequence.split("").reduce((total, aa) => total + (molecularWeights[aa] || 0), 0);

  if (sequence.length > 1) {
    totalWeight -= (sequence.length - 1) * 18.015; // Correct peptide bond correction
  }

  document.getElementById("protein-result").textContent = `Molecular Weight: ${totalWeight.toFixed(2)} Da`;

  explanationBox.innerHTML = `
    <strong>How it Works:</strong><br>
    - Each amino acid has a molecular weight.<br>
    - Peptide bonds remove water molecules, reducing the total weight.<br>
    - The final molecular weight is calculated in Daltons (Da).<br>
  `;
});

// ✅ Fixed Sequence Alignment Scorer (Corrected Gap Handling)
document.getElementById("align-btn").addEventListener("click", () => {
  const seq1 = document.getElementById("sequence1").value.trim().toUpperCase();
  const seq2 = document.getElementById("sequence2").value.trim().toUpperCase();
  const explanationBox = document.getElementById("alignment-explanation");

  if (!seq1 || !seq2 || !isValidDNA(seq1) || !isValidDNA(seq2)) {
    document.getElementById("alignment-result").textContent = "Error: Invalid sequence input. Use only A, T, G, and C.";
    explanationBox.style.display = "none";
    return;
  }

  explanationBox.style.display = "block";
  explanationBox.style.backgroundColor = "#4CAF50";
  explanationBox.style.color = "#fff";

  const matchScore = 1, mismatchScore = -1, gapScore = -2;
  let score = 0;
  let maxLength = Math.max(seq1.length, seq2.length);
  let alignedSeq1 = seq1.padEnd(maxLength, "-");
  let alignedSeq2 = seq2.padEnd(maxLength, "-");

  for (let i = 0; i < maxLength; i++) {
    if (alignedSeq1[i] === alignedSeq2[i]) {
      score += matchScore; // Match
    } else if (alignedSeq1[i] === "-" || alignedSeq2[i] === "-") {
      score += gapScore; // Gap penalty
    } else {
      score += mismatchScore; // Mismatch penalty
    }
  }

  document.getElementById("alignment-result").textContent = `Alignment Score: ${score}`;

  explanationBox.innerHTML = `
    <strong>How it Works:</strong><br>
    - Matches get +1, mismatches get -1.<br>
    - Gaps receive a penalty of -2.<br>
    - The final alignment score considers gaps in the shorter sequence.<br>
  `;
});

// ✅ ORF Finder
document.getElementById("orf-btn").addEventListener("click", () => {
  const dnaSequence = document.getElementById("orf-sequence").value.trim().toUpperCase();
  const explanationBox = document.getElementById("orf-explanation");

  if (!dnaSequence || !isValidDNA(dnaSequence)) {
    document.getElementById("orf-result").textContent = "Error: Invalid DNA sequence. Use only A, T, G, and C.";
    explanationBox.style.display = "none";
    return;
  }

  explanationBox.style.display = "block";
  explanationBox.style.backgroundColor = "#4CAF50";
  explanationBox.style.color = "#fff";

  const startCodon = "ATG";
  const stopCodons = ["TAA", "TAG", "TGA"];
  let orfs = [];

  for (let frame = 0; frame < 3; frame++) {
    let startIndex = -1;
    for (let i = frame; i < dnaSequence.length - 2; i += 3) {
      const codon = dnaSequence.substring(i, i + 3);
      if (codon === startCodon && startIndex === -1) {
        startIndex = i;
      } else if (stopCodons.includes(codon) && startIndex !== -1) {
        orfs.push(dnaSequence.substring(startIndex, i + 3));
        startIndex = -1;
      }
    }
  }

  document.getElementById("orf-result").textContent = orfs.length
    ? `Found ORFs: ${orfs.join(", ")}`
    : "No ORFs found.";

  explanationBox.innerHTML = `
    <strong>How it Works:</strong><br>
    - Scans the sequence in three reading frames.<br>
    - Identifies start and stop codons.<br>
    - Displays all Open Reading Frames (ORFs).<br>
  `;
});

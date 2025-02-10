fetch('biologyFacts.json')
  .then((response) => response.json())
  .then((facts) => {
    const today = new Date().getDate();
    const dailyFact = facts[today % facts.length];
    document.getElementById("daily-fact").textContent = dailyFact;
  })
  .catch((error) => console.error("Error loading facts:", error));

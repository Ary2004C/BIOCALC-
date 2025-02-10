async function loadMemes() {
  try {
      const response = await fetch("meme.json"); // Fetch JSON from root
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const memes = data.memes;

      if (!memes || memes.length === 0) {
          console.error("❌ No memes found in JSON.");
          document.getElementById("meme-container").innerHTML = "<p>No memes available.</p>";
          return;
      }

      // Pick a random meme
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];

      // Display meme in HTML
      document.getElementById("meme-container").innerHTML = `
          <img src="${randomMeme}" alt="Daily Meme" style="max-width:100%; height:auto; border-radius:8px;">
      `;

  } catch (error) {
      console.error("❌ Error fetching memes:", error);
      document.getElementById("meme-container").innerHTML = "<p>Failed to load meme.</p>";
  }
}

// Load meme when page loads
document.addEventListener("DOMContentLoaded", loadMemes);

const express = require("express");
const fetch = require("node-fetch"); // For OMDb API calls

const router = express.Router();

// Chatbot Helper Function
async function fetchMovieDetails(title) {
  const OMDB_API_KEY = "bb0c3e93";
  const OMDB_BASE_URL = "http://www.omdbapi.com/";
  const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(
    title
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "True") {
      return {
        Title: data.Title,
        Year: data.Year,
        Director: data.Director,
        Actors: data.Actors,
        Plot: data.Plot,
        "IMDb Rating": data.imdbRating,
        Poster: data.Poster !== "N/A" ? data.Poster : null,
        "IMDb Link": `https://www.imdb.com/title/${data.imdbID}/`,
      };
    } else {
      return { Error: data.Error };
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Error: "Failed to fetch data from OMDb API." };
  }
}

// Chatbot Route
router.post("/chat", async (req, res) => {
  const userMessage = req.body.message?.trim().toLowerCase();
  if (!userMessage) {
    return res.json({ reply: "Please provide a message." });
  }

  if (["hi", "hello", "hey"].includes(userMessage)) {
    return res.json({ reply: "Hi! How can I assist you today?" });
  }

  if (["bye", "thank you", "thanks"].includes(userMessage)) {
    return res.json({
      reply:
        "You're welcome! If you need more help, feel free to ask. Goodbye!",
    });
  }

  let title;
  if (userMessage.includes("movie called")) {
    const titleStart =
      userMessage.indexOf("movie called") + "movie called".length;
    title = userMessage.slice(titleStart).trim();
  } else if (userMessage.startsWith("movie:")) {
    title = userMessage.replace("movie:", "").trim();
  } else {
    title = userMessage;
  }

  if (!title) {
    return res.json({ reply: "Please provide a movie title." });
  }

  const movieDetails = await fetchMovieDetails(title);

  if (movieDetails.Error) {
    return res.json({
      reply: `Sorry, I couldn’t find details for '${title}'. Please try another title.`,
    });
  }

  const reply = `
    <div>
      <p><strong>Title:</strong> ${movieDetails.Title}</p>
      <p><strong>Year:</strong> ${movieDetails.Year}</p>
      <p><strong>Director:</strong> ${movieDetails.Director}</p>
      <p><strong>Actors:</strong> ${movieDetails.Actors}</p>
      <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
      <p><strong>IMDb Rating:</strong> ${movieDetails["IMDb Rating"]}</p>
      <p><a href="${
        movieDetails["IMDb Link"]
      }" target="_blank">View on IMDb</a></p>
      ${
        movieDetails.Poster
          ? `<img src="${movieDetails.Poster}" alt="Poster" style="max-width: 200px; height: auto; margin-top: 10px; border-radius: 10px;" />`
          : ""
      }
    </div>
  `;

  return res.json({ reply });
});

module.exports = router;

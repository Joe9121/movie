const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // Keep bcrypt if needed later for user routes
const path = require("path"); // For serving static files
const cors = require("cors");

const app = express();
const port = 5000;

// Import chatbot routes
const chatbotRoutes = require("./chatbot");

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from React frontend
app.use(bodyParser.json());


// Temporarily disable MongoDB connection
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://user:Bookpaper1@cluster0.mawzj.mongodb.net/";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use chatbot routes (register the chatbot route "/chat")
app.use(chatbotRoutes);

// Example User Schema and Routes (commented out for now)

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register route
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).send("User registered");
  } catch (err) {
    console.log("Error registering user:", err);
    res.status(400).send("Error registering user");
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }
    res.status(200).send("Login successful");
  } catch (err) {
    console.log("Error logging in:", err);
    res.status(500).send("Server error");
  }
});

// Complaint Schema and Model
const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// Complaint route
app.post("/complaint", async (req, res) => {
  const { name, email, message } = req.body;
  const newComplaint = new Complaint({ name, email, message });
  try {
    await newComplaint.save();
    res.status(201).send("Complaint submitted");
  } catch (err) {
    console.log("Error submitting complaint:", err);
    res.status(400).send("Error submitting complaint");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
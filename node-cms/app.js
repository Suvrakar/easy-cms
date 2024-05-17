const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Content = require("./models/content"); // Import the Content model

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors()); 

// MongoDB Connection
mongoose
  .connect("mongodb+srv://Suvra:01711536682Suv@cluster1.tavxzqu.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes

// Create new content
app.post("/content", async (req, res) => {
  try {
    const contentData = req.body;
    const newContent = new Content(contentData);
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all content
app.get("/content", async (req, res) => {
  try {
    const allContent = await Content.find();
    res.json(allContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get content by sectionName
app.get("/content/section/:sectionName", async (req, res) => {
  try {
    const sectionName = req.params.sectionName;
    const content = await Content.find({ sectionName: sectionName });
    if (!content || content.length === 0) {
      return res.status(404).json({ message: "No content found for this section" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get content by ID
app.get("/content/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update content by ID
app.put("/content/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const contentData = req.body;
    const updatedContent = await Content.findByIdAndUpdate(id, contentData, {
      new: true,
    });
    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete content by ID
app.delete("/content/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

const { Schema, model } = require("mongoose");

// Define the schema for the content
const ContentSchema = new Schema(
  {
    sectionName: { type: String, required: false },
    title: { type: String, required: false },
    subTitle: { type: String, required: false },
    body: { type: String, required: false },
    image: { type: String, required: false },
    author: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: false } // Automatically add createdAt and updatedAt fields
);

// Create a model based on the schema
const Content = model("Content", ContentSchema);

module.exports = Content;

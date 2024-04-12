import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Input } from "@mui/material";

const ContentForm = ({ content, onSubmit }) => {
  const [formData, setFormData] = useState({});

  // Set form data when content is passed or reset when content is null
  useEffect(() => {
    if (content) {
      setFormData(content);
    } else {
      setFormData({});
    }
  }, [content]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (content) {
        // If content exists, perform update
        await axios.put(`http://localhost:4000/content/${content._id}`, formData);
      } else {
        // Otherwise, perform create
        await axios.post(`http://localhost:4000/content`, formData);
      }
      // Call onSubmit function after submission
      onSubmit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Section Name"
        name="sectionName"
        value={formData.sectionName || ""}
        onChange={handleChange}
        placeholder="Enter section name"
        style={{ marginBottom: "10px" }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Title"
        name="title"
        value={formData.title || ""}
        onChange={handleChange}
        placeholder="Enter title"
        style={{ marginBottom: "10px" }}
      />
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        label="Body"
        name="body"
        value={formData.body || ""}
        onChange={handleChange}
        placeholder="Enter body text"
        style={{ marginBottom: "10px" }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Subtitle"
        name="subTitle"
        value={formData.subTitle || ""}
        onChange={handleChange}
        placeholder="Enter subtitle"
        style={{ marginBottom: "10px" }}
      />
      {/* File input for image */}
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Author"
        name="author"
        value={formData.author || ""}
        onChange={handleChange}
        placeholder="Enter author name"
        style={{ marginBottom: "10px" }}
      />
      <Button type="submit" variant="contained" color="primary">
        {content ? "Update Content" : "Create Content"}
      </Button>
    </form>
  );
};

export default ContentForm;

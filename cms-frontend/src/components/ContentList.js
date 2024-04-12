import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import ContentForm from "./ContentForm";

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/content`);
      setContentList(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/content/${id}`);
      fetchContent();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (content) => {
    setSelectedContent(content);
  };

  const handleSubmit = () => {
    setSelectedContent(null);
    fetchContent();
  };

  return (
    <div>
      <h2>Content List</h2>
      {selectedContent && <ContentForm content={selectedContent} onSubmit={handleSubmit} />}
      <TableContainer component={Paper}>
        <Table aria-label="content list table">
          <TableHead>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentList.map((content) => (
              <TableRow key={content._id}>
                <TableCell>{content.sectionName}</TableCell>
                <TableCell>{content.title}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(content)} variant="outlined">Edit</Button>
                  <Button onClick={() => handleDelete(content._id)} variant="outlined">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContentList;

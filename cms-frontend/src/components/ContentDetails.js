import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ContentDetails = ({ content }) => {
  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.body}</p>
      <TableContainer component={Paper}>
        <Table aria-label="content details table">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{content.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Body</TableCell>
              <TableCell>{content.body}</TableCell>
            </TableRow>
            {/* Add other fields as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContentDetails;

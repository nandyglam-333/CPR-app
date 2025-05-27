import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const dummyReports = [
  { id: 1, student: 'John Doe', date: '2025-05-01', file: 'john_report1.pdf' },
  { id: 2, student: 'Jane Smith', date: '2025-05-10', file: 'jane_report2.pdf' },
];

export default function ReportHistory() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Report History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>File</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyReports.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.student}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.file}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

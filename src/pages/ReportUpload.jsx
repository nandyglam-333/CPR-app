import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

export default function ReportUpload() {
  const [fileName, setFileName] = useState('');

  return (
    <div>
      <Typography variant="h4" gutterBottom>Upload CPR Report</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField fullWidth label="Student Name" margin="normal" />
        <Button variant="outlined" component="label">
          Upload File
          <input type="file" hidden onChange={e => setFileName(e.target.files[0]?.name || '')} />
        </Button>
        <Box mt={2}>
          <Button variant="contained">Upload</Button>
        </Box>
      </Box>
      {fileName && <Typography mt={2}>Selected file: {fileName}</Typography>}
    </div>
  );
}

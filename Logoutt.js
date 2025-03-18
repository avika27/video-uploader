import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Logoutt.css';

export default function ColorButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success">
        login
      </Button>
      <Button variant="outlined" color="error">
        logout
      </Button>
    </Stack>
  );
}


// src/components/ModeSelector.jsx
import React from 'react';
import { Button, Box, Typography } from '@mui/material';

function ModeSelector({ onSelect }) {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        How do you want to build your website?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => onSelect('drag')}
        >
          🧱 Drag-and-Drop Builder
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => onSelect('template')}
        >
          🎨 Choose from Templates
        </Button>
      </Box>
    </Box>
  );
}

export default ModeSelector;

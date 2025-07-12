import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const templates = [
  {
    name: 'Portfolio',
    data: {
      websiteType: 'Portfolio',
      theme: 'Creative',
      color: '#e3f2fd',
      sections: ['Navbar', 'Hero', 'About', 'Gallery', 'Contact', 'Footer'],
    },
  },
  {
    name: 'Business',
    data: {
      websiteType: 'Business',
      theme: 'Modern',
      color: '#fff3e0',
      sections: ['Navbar', 'Hero', 'Services', 'Contact', 'Footer'],
    },
  },
  {
    name: 'Startup',
    data: {
      websiteType: 'Startup',
      theme: 'Tech',
      color: '#f3e5f5',
      sections: ['Navbar', 'Hero', 'About', 'Services', 'Contact', 'Footer'],
    },
  },
];

function TemplateGallery({ onTemplateSelect }) {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Choose a Ready-Made Template
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {templates.map((tpl) => (
          <Button
            key={tpl.name}
            variant="outlined"
            onClick={() => onTemplateSelect(tpl.data)}
          >
            {tpl.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default TemplateGallery;

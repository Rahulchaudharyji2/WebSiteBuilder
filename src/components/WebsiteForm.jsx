import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, InputLabel, MenuItem, Select, FormControl,
} from '@mui/material';

const sections = ['Gallery', 'Products', 'Testimonials', 'Blog'];

function WebsiteForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    websiteTitle: '',
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    faqText: '',
    contactEmail: '',
    services: '',
    color: '#ffffff',
    heroMedia: '',
    enableDarkMode: false,
    sectionOrder: ['Gallery', 'Products', 'Testimonials', 'Blog'],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData((prev) => ({
      ...prev,
      heroMedia: reader.result, // This will be a data URL
    }));
  };
  reader.readAsDataURL(file);
};
           

  const handleSectionChange = (index, value) => {
    const newOrder = [...formData.sectionOrder];
    newOrder[index] = value;

    // Prevent duplicates
    const uniqueOrder = Array.from(new Set(newOrder));
    const missing = sections.filter((s) => !uniqueOrder.includes(s));
    const finalOrder = [...uniqueOrder, ...missing];

    setFormData((prev) => ({ ...prev, sectionOrder: finalOrder }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Create Your Professional Website</Typography>

      <TextField name="websiteTitle" label="Website Name" fullWidth margin="normal" onChange={handleChange} />
      <TextField name="heroTitle" label="Hero Section Title" fullWidth margin="normal" onChange={handleChange} />
      <TextField name="heroSubtitle" label="Hero Subtitle" fullWidth margin="normal" onChange={handleChange} />

      {/* Hero Media Upload */}
      <Box mt={2}>
        <InputLabel>Hero Image or Video</InputLabel>
        <input type="file" accept="image/*,video/*" onChange={handleFileUpload} />
        {formData.heroMedia && (
          <Box mt={1}>
            {formData.heroMedia.endsWith('.mp4') ? (
              <video src={formData.heroMedia} controls width="100%" />
            ) : (
              <img src={formData.heroMedia} alt="Preview" style={{ maxWidth: '100%' }} />
            )}
          </Box>
        )}
      </Box>

      <TextField name="aboutText" label="About Section Content" fullWidth margin="normal" multiline rows={3} onChange={handleChange} />
      <TextField name="faqText" label="FAQ Content" fullWidth margin="normal" multiline rows={3} onChange={handleChange} />
      <TextField name="contactEmail" label="Contact Email" fullWidth margin="normal" onChange={handleChange} />

      <Box mt={2}>
        <label>Background Color: </label>
        <input type="color" name="color" value={formData.color} onChange={handleChange} />
      </Box>

      <Box mt={2}>
        <label>
          <input type="checkbox" name="enableDarkMode" checked={formData.enableDarkMode} onChange={handleChange} /> Enable Dark Mode
        </label>
      </Box>

      {/* Section Order Selection */}
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>Section Order (Drag style alternative)</Typography>
        {formData.sectionOrder.map((section, idx) => (
          <FormControl key={idx} fullWidth margin="dense">
            <InputLabel>Section {idx + 1}</InputLabel>
            <Select
              value={section}
              onChange={(e) => handleSectionChange(idx, e.target.value)}
            >
              {sections.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Generate Website</Button>
    </Box>
  );
}

export default WebsiteForm;

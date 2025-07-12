// src/components/ImageUploader.jsx
import React from 'react';

export default function ImageUploader({ onUpload }) {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=181f6bddc4d863695fa2c42ed084fc78`, {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    onUpload(data.data.url);
  };

  return (
    <input type="file" accept="image/*" onChange={handleChange} />
  );
}

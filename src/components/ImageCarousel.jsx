// src/components/ImageCarousel.jsx
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function ImageCarousel({ onChange }) {
  const [images, setImages] = useState([]);

  const addImage = () => setImages([...images, '']);

  const updateImage = (index, url) => {
    const updated = [...images];
    updated[index] = url;
    setImages(updated);
    onChange(updated);
  };

  return (
    <div>
      <h3>Carousel Images</h3>
      <button type="button" onClick={addImage}>+ Add Image</button>
      {images.map((img, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <ImageUploader onUpload={(url) => updateImage(index, url)} />
          {img && <img src={img} alt="carousel" style={{ width: '200px' }} />}
        </div>
      ))}
    </div>
  );
}

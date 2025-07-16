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
    <div className="bg-[#111] text-white p-4 rounded-xl space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-400">🖼️ Carousel Images</h3>
        <button
          type="button"
          onClick={addImage}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-medium"
        >
          + Add Image
        </button>
      </div>

      {images.map((img, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl p-4 space-y-3 shadow-md border border-gray-700"
        >
          <ImageUploader onUpload={(url) => updateImage(index, url)} />
          {img && (
            <img
              src={img}
              alt="carousel"
              className="mt-2 rounded-lg shadow w-full max-w-sm h-48 object-cover border border-gray-600"
            />
          )}
        </div>
      ))}
    </div>
  );
}

import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function Testimonials({ onChange }) {
  const [testimonials, setTestimonials] = useState([]);

  const addTestimonial = () =>
    setTestimonials([...testimonials, { quote: '', name: '', role: '', photo: '' }]);

  const update = (i, field, value) => {
    const updated = [...testimonials];
    updated[i][field] = value;
    setTestimonials(updated);
    onChange(updated);
  };

  const uploadPhoto = (i, url) => update(i, 'photo', url);

  return (
    <div className="bg-[#111] text-white p-4 rounded-xl space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-400">🌟 Testimonials</h3>
        <button
          type="button"
          onClick={addTestimonial}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-medium"
        >
          + Add
        </button>
      </div>

      {testimonials.map((item, i) => (
        <div
          key={i}
          className="bg-gray-800 p-4 rounded-xl space-y-4 shadow border border-gray-700"
        >
          <textarea
            placeholder="Quote"
            value={item.quote}
            onChange={(e) => update(i, 'quote', e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
            rows={2}
          />

          <input
            placeholder="Name"
            value={item.name}
            onChange={(e) => update(i, 'name', e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
          />

          <input
            placeholder="Role"
            value={item.role}
            onChange={(e) => update(i, 'role', e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
          />

          <ImageUploader onUpload={(url) => uploadPhoto(i, url)} />

          {item.photo && (
            <img
              src={item.photo}
              alt="testimonial"
              className="w-24 h-24 rounded-full mt-2 border border-gray-600 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}

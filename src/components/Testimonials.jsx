// src/components/Testimonials.jsx
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
    <div>
      <h3>Testimonials</h3>
      <button type="button" onClick={addTestimonial}>+ Add</button>
      {testimonials.map((item, i) => (
        <div key={i} style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
          <textarea placeholder="Quote" value={item.quote} onChange={(e) => update(i, 'quote', e.target.value)} />
          <input placeholder="Name" value={item.name} onChange={(e) => update(i, 'name', e.target.value)} />
          <input placeholder="Role" value={item.role} onChange={(e) => update(i, 'role', e.target.value)} />
          <ImageUploader onUpload={(url) => uploadPhoto(i, url)} />
          {item.photo && <img src={item.photo} alt="testimonial" style={{ width: '100px', borderRadius: '50%' }} />}
        </div>
      ))}
    </div>
  );
}

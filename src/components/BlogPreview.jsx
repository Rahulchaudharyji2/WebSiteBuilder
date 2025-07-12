// src/components/BlogPreview.jsx
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function BlogPreview({ onChange }) {
  const [posts, setPosts] = useState([]);

  const addPost = () => setPosts([...posts, { title: '', summary: '', image: '' }]);

  const update = (i, field, value) => {
    const updated = [...posts];
    updated[i][field] = value;
    setPosts(updated);
    onChange(updated);
  };

  const setImage = (i, url) => update(i, 'image', url);

  return (
    <div>
      <h3>Blog Posts</h3>
      <button type="button" onClick={addPost}>+ Add Blog</button>
      {posts.map((p, i) => (
        <div key={i} style={{ border: '1px solid #aaa', padding: '10px', marginBottom: '1rem' }}>
          <input placeholder="Title" value={p.title} onChange={(e) => update(i, 'title', e.target.value)} />
          <textarea placeholder="Summary" value={p.summary} onChange={(e) => update(i, 'summary', e.target.value)} />
          <ImageUploader onUpload={(url) => setImage(i, url)} />
          {p.image && <img src={p.image} alt="blog" style={{ width: '100px' }} />}
        </div>
      ))}
    </div>
  );
}

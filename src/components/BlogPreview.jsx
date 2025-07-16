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
    <div className="bg-[#111] text-white p-4 rounded-xl space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-400">📝 Blog Posts</h3>
        <button
          type="button"
          onClick={addPost}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-medium"
        >
          + Add Blog
        </button>
      </div>

      {posts.map((p, i) => (
        <div
          key={i}
          className="bg-gray-800 p-4 rounded-xl space-y-4 shadow border border-gray-700"
        >
          <input
            type="text"
            placeholder="Title"
            value={p.title}
            onChange={(e) => update(i, 'title', e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
          />

          <textarea
            placeholder="Summary"
            value={p.summary}
            onChange={(e) => update(i, 'summary', e.target.value)}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
            rows={3}
          />

          <ImageUploader onUpload={(url) => setImage(i, url)} />

          {p.image && (
            <img
              src={p.image}
              alt="blog"
              className="w-full max-w-xs rounded mt-2 border border-gray-600 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// src/components/ProductGallery.jsx
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function ProductGallery({ onChange }) {
  const [products, setProducts] = useState([]);

  const addProduct = () => setProducts([...products, { title: '', desc: '', price: '', img: '' }]);

  const updateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
    onChange(updated);
  };

  const handleImageUpload = (index, url) => updateProduct(index, 'img', url);

  return (
    <div>
      <h3>Product List</h3>
      <button type="button" onClick={addProduct}>+ Add Product</button>
      {products.map((product, index) => (
        <div key={index} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem' }}>
          <input
            placeholder="Title"
            value={product.title}
            onChange={(e) => updateProduct(index, 'title', e.target.value)}
          />
          <input
            placeholder="Price"
            value={product.price}
            onChange={(e) => updateProduct(index, 'price', e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={product.desc}
            onChange={(e) => updateProduct(index, 'desc', e.target.value)}
          />
          <ImageUploader onUpload={(url) => handleImageUpload(index, url)} />
          {product.img && <img src={product.img} alt="Product" style={{ width: '150px' }} />}
        </div>
      ))}
    </div>
  );
}

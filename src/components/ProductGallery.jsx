import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function ProductGallery({ onChange }) {
  const [products, setProducts] = useState([]);

  const addProduct = () =>
    setProducts([...products, { title: '', desc: '', price: '', img: '' }]);

  const updateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
    onChange(updated);
  };

  const handleImageUpload = (index, url) => updateProduct(index, 'img', url);

  return (
    <div className="bg-[#111] text-white p-4 rounded-xl space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-green-400">🛒 Product List</h3>
        <button
          type="button"
          onClick={addProduct}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-black font-medium"
        >
          + Add Product
        </button>
      </div>

      {products.map((product, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl p-4 space-y-4 shadow-md border border-gray-700"
        >
          <input
            type="text"
            placeholder="Product Title"
            value={product.title}
            onChange={(e) => updateProduct(index, 'title', e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            placeholder="Price"
            value={product.price}
            onChange={(e) => updateProduct(index, 'price', e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <textarea
            placeholder="Product Description"
            value={product.desc}
            onChange={(e) => updateProduct(index, 'desc', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div>
            <ImageUploader onUpload={(url) => handleImageUpload(index, url)} />
            {product.img && (
              <img
                src={product.img}
                alt="Product"
                className="mt-3 rounded-lg shadow w-40 h-40 object-cover border border-gray-600"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

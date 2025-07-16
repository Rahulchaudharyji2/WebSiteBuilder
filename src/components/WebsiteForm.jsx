import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import ProductGallery from './ProductGallery';
import Testimonials from './Testimonials';
import BlogPreview from './BlogPreview';
import generateHTMLPages from '../utils/GenrateHtml';

const sections = ['Gallery', 'Products', 'Testimonials', 'Blog'];

function WebsiteForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    websiteTitle: '',
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    faqText: '',
    contactEmail: '',
    color: '#00ff99',
    heroMedia: '',
    enableDarkMode: true,
    sectionOrder: sections,
  });

  const [carouselImages, setCarouselImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

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
        heroMedia: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSectionChange = (index, value) => {
    const newOrder = [...formData.sectionOrder];
    newOrder[index] = value;

    const uniqueOrder = Array.from(new Set(newOrder));
    const missing = sections.filter((s) => !uniqueOrder.includes(s));
    const finalOrder = [...uniqueOrder, ...missing];

    setFormData((prev) => ({ ...prev, sectionOrder: finalOrder }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const htmlPages = generateHTMLPages(
      formData,
      products,
      carouselImages,
      testimonials,
      blogPosts
    );
    onGenerate(htmlPages);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0d0d0d] text-white p-6 sm:p-10 rounded-2xl shadow-2xl max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h2 className="text-4xl font-bold text-primary mb-1">🚀 SaaS Website Builder</h2>
        <p className="text-gray-400">Create and preview your professional site in minutes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            type="text"
            name="websiteTitle"
            placeholder="Website Name"
            className="input-style"
            onChange={handleChange}
          />
          <input
            type="text"
            name="heroTitle"
            placeholder="Hero Title"
            className="input-style"
            onChange={handleChange}
          />
          <input
            type="text"
            name="heroSubtitle"
            placeholder="Hero Subtitle"
            className="input-style"
            onChange={handleChange}
          />
          <textarea
            name="aboutText"
            placeholder="About Section Content"
            rows={3}
            className="input-style"
            onChange={handleChange}
          />
          <textarea
            name="faqText"
            placeholder="FAQ Content"
            rows={3}
            className="input-style"
            onChange={handleChange}
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            className="input-style"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-primary font-medium">Upload Hero Image/Video</label>
            <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="text-white" />
            {formData.heroMedia && (
              <div className="mt-3">
                {formData.heroMedia.includes('video') ? (
                  <video src={formData.heroMedia} controls className="rounded-lg w-full" />
                ) : (
                  <img src={formData.heroMedia} alt="Preview" className="rounded-lg max-w-full" />
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="text-primary font-medium">🎨 Accent Color:</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-12 h-12 p-0 rounded-full border-none outline-none"
            />
          </div>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enableDarkMode"
              checked={formData.enableDarkMode}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="ml-2 text-sm">🌙 Enable Dark Mode</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-xl text-primary font-semibold mb-2">📌 Section Order</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formData.sectionOrder.map((section, idx) => (
            <select
              key={idx}
              value={section}
              onChange={(e) => handleSectionChange(idx, e.target.value)}
              className="input-style"
            >
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Sub-component editors */}
      <div className="space-y-8">
        <div>
          <h3 className="text-xl text-primary font-semibold mb-2">🖼️ Carousel Images</h3>
          <ImageCarousel onChange={setCarouselImages} />
        </div>

        <div>
          <h3 className="text-xl text-primary font-semibold mb-2">🛒 Product List</h3>
          <ProductGallery onChange={setProducts} />
        </div>

        <div>
          <h3 className="text-xl text-primary font-semibold mb-2">🌟 Testimonials</h3>
          <Testimonials onChange={setTestimonials} />
        </div>

        <div>
          <h3 className="text-xl text-primary font-semibold mb-2">📝 Blog Posts</h3>
          <BlogPreview onChange={setBlogPosts} />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3 rounded-xl bg-primary text-black text-lg font-semibold hover:bg-green-400 transition-all"
      >
        ⚡ Generate Website
      </button>
    </form>
  );
}

export default WebsiteForm;

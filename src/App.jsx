// src/App.jsx
import React, { useState } from 'react';
import WebsiteForm from './components/WebsiteForm';
import ProductGallery from './components/ProductGallery';
import ImageCarousel from './components/ImageCarousel';
import Testimonials from './components/Testimonials';
import BlogPreview from './components/BlogPreview';
import ContactFormHTML from './components/ContactForm';
import { downloadZipMultiPage } from './components/Exporter';
import Preview from './components/Preview'; // Add this for iframe preview
import DarkModeToggle from './components/DarkModeToggle';


function App() {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [pages, setPages] = useState(null);
  const [isDark, setIsDark] = useState(false);


  const handleGenerate = (data) => {
    setFormData(data);
    const htmlPages = generateHTMLPages(data, products, carouselImages, testimonials, blogPosts);
    setPages(htmlPages);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pro Website Builder</h1>
      <WebsiteForm onSubmit={handleGenerate} />
      <ImageCarousel onChange={setCarouselImages} />
      <ProductGallery onChange={setProducts} />
      <Testimonials onChange={setTestimonials} />
      <BlogPreview onChange={setBlogPosts} />

      {pages && (
        <div className="text-center mt-10">
          <button
            onClick={() => downloadZipMultiPage(pages)}
            className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            📦 Download ZIP
          </button>

          <div className="mt-10 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
            <Preview html={pages['index.html']} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
function generateHTMLPages(form, products, carousel, testimonials, blogPosts) {
  const {
    websiteTitle,
    heroTitle,
    heroSubtitle,
    aboutText,
    faqText,
    contactEmail,
    color,
    heroMedia,
    enableDarkMode,
    sectionOrder
  } = form;

  const layoutStart = (title) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script>document.addEventListener('DOMContentLoaded', () => AOS.init({ duration: 1000 }));</script>
    </head>
    <body class="${enableDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}">
      <nav class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div class="text-xl font-bold">${websiteTitle}</div>
        <div class="space-x-4">
          <a href="index.html">Home</a>
          <a href="products.html">Products</a>
          <a href="testimonials.html">Testimonials</a>
          <a href="blog.html">Blog</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>
      </nav>
  `;

  const layoutEnd = `
      <footer class="bg-gray-900 text-white text-center py-4 mt-10">
        &copy; ${new Date().getFullYear()} ${websiteTitle}
      </footer>
    </body>
    </html>
  `;

  const heroSection = `
    <header class="relative text-white text-center py-20 ${heroMedia ? 'bg-black' : 'bg-gradient-to-r from-blue-600 to-purple-600'}" data-aos="fade-down">
      ${heroMedia ? `
        <div class="absolute inset-0 overflow-hidden z-0">
          ${heroMedia.endsWith('.mp4') ? `
            <video autoplay muted loop class="w-full h-full object-cover opacity-40">
              <source src="${heroMedia}" type="video/mp4" />
            </video>
          ` : `
            <img src="${heroMedia}" class="w-full h-full object-cover opacity-40" />
          `}
        </div>
      ` : ''}
      <div class="relative z-10 px-6">
        <h1 class="text-5xl font-bold mb-4">${heroTitle}</h1>
        <p class="text-xl max-w-2xl mx-auto">${heroSubtitle}</p>
        <a href="contact.html" class="inline-block mt-6 px-6 py-3 bg-white text-blue-700 font-semibold rounded shadow hover:bg-gray-100 transition">Get Started</a>
      </div>
    </header>
  `;

  const sectionGallery = `
    <section class="py-16 px-6" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-center mb-8">Gallery</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        ${carousel.map(url => `<img src="${url}" class="rounded-lg shadow-lg w-full h-60 object-cover" />`).join('')}
      </div>
    </section>
  `;

  const sectionProducts = `
    <section class="py-10 px-6" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        ${products.map(p => `
          <div class="bg-white shadow-md rounded-lg p-4 text-black">
            <img src="${p.img}" class="w-full h-40 object-cover rounded" />
            <h3 class="text-xl font-semibold mt-4">${p.title}</h3>
            <p class="text-gray-600">${p.desc}</p>
            <p class="mt-2 font-bold text-blue-600">₹ ${p.price}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const sectionTestimonials = `
    <section class="py-10 px-6" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-center mb-8">What People Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        ${testimonials.map(t => `
          <div class="bg-white shadow-md rounded-lg p-6 text-center text-black">
            <img src="${t.photo}" class="w-20 h-20 rounded-full mx-auto mb-4" />
            <blockquote class="italic">"${t.quote}"</blockquote>
            <p class="mt-2 font-semibold">- ${t.name}, <i>${t.role}</i></p>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const sectionBlog = `
    <section class="py-10 px-6" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-center mb-8">Latest Posts</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        ${blogPosts.map(post => `
          <div class="bg-white shadow-md rounded-lg overflow-hidden text-black">
            <img src="${post.image}" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="text-xl font-semibold">${post.title}</h3>
              <p class="text-gray-600">${post.summary}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const indexHTML = layoutStart('Home') + `
    ${heroSection}
    ${sectionOrder.includes('Gallery') ? sectionGallery : ''}
    ${sectionOrder.includes('Products') ? sectionProducts : ''}
    ${sectionOrder.includes('Testimonials') ? sectionTestimonials : ''}
    ${sectionOrder.includes('Blog') ? sectionBlog : ''}
  ` + layoutEnd;

  const aboutHTML = layoutStart('About') + `
    <section class="py-16 px-6 max-w-4xl mx-auto" data-aos="fade-up">
      <h2 class="text-3xl font-bold mb-4">About Us</h2>
      <p class="text-lg leading-relaxed">${aboutText}</p>
    </section>

    ${faqText?.trim() && `
      <section class="py-10 px-6 max-w-4xl mx-auto" data-aos="fade-up">
        <h3 class="text-2xl font-semibold mb-4">FAQs</h3>
        <p>${faqText}</p>
      </section>
    `}
  ` + layoutEnd;

  const contactHTML = layoutStart('Contact') + `
    ${ContactFormHTML(contactEmail)}
  ` + layoutEnd;

  return {
    'index.html': indexHTML,
    'products.html': layoutStart('Products') + sectionProducts + layoutEnd,
    'testimonials.html': layoutStart('Testimonials') + sectionTestimonials + layoutEnd,
    'blog.html': layoutStart('Blog') + sectionBlog + layoutEnd,
    'contact.html': contactHTML,
    'about.html': aboutHTML,
  };
}

import React, { useState } from 'react';
import WebsiteForm from './components/WebsiteForm';
import { downloadZipMultiPage } from './components/Exporter';
import Preview from './components/Preview';

function App() {
  const [pages, setPages] = useState(null);

  const handleGenerate = (htmlPages) => {
    setPages(htmlPages);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🌐 Pro Website Builder</h1>
      <WebsiteForm onGenerate={handleGenerate} />

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


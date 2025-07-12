// src/components/Exporter.jsx
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadZipMultiPage = async (pages) => {
  const zip = new JSZip();

  for (const [filename, html] of Object.entries(pages)) {
    zip.file(filename, html);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'professional-website.zip');
};

import React from 'react';

function Editor({ html, onChange }) {
  return (
    <textarea
      value={html}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', height: '200px' }}
    />
  );
}

export default Editor;

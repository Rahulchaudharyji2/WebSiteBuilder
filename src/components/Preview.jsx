import React from 'react';

function Preview({ html }) {
  return (
    <iframe
      srcDoc={html}
      title="Preview"
      style={{ width: '100%', height: '500px', border: '1px solid black' }}
    />
  );
}

export default Preview;

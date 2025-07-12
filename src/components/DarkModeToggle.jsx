import React from 'react';

function DarkModeToggle({ isDark, setIsDark }) {
  return (
    <div className="text-right mb-4">
      <button
        onClick={() => setIsDark(!isDark)}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default DarkModeToggle;

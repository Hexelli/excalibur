import React from 'react';

export const Toolbar = () => {
  const saveToFile = () => {
    const data = localStorage.getItem('excalibur-data');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'drawing.excalibur.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const loadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      localStorage.setItem('excalibur-data', content);
      window.location.reload();
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-2 bg-gray-100 border-b flex gap-2 items-center">
      <button onClick={saveToFile} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
      <label className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer">
        Load
        <input type="file" accept=".json" onChange={loadFromFile} className="hidden" />
      </label>
    </div>
  );
};

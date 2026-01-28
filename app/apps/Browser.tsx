import React, { useState } from 'react';
export const BrowserApp = () => {
  const [url, setUrl] = useState("https://fr.wikipedia.org/wiki/Frutiger_Aero");
  
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex gap-2 p-2 border-b bg-gray-200">
        <input 
          className="flex-1 px-2 py-1 rounded border border-gray-300 text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-3 rounded text-xs">Go</button>
      </div>
      <iframe src={url} className="flex-1 w-full border-none bg-white" title="Browser" />
    </div>
  );
}
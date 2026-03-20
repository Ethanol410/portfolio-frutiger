import React, { useState } from 'react';

export const BrowserApp = () => {
  const [url, setUrl] = useState("https://fr.wikipedia.org/wiki/Frutiger_Aero");
  const [iframeUrl, setIframeUrl] = useState("https://fr.wikipedia.org/wiki/Frutiger_Aero");
  const [iframeKey, setIframeKey] = useState(0);

  const navigate = () => {
    setIframeUrl(url);
    setIframeKey(k => k + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') navigate();
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex gap-2 p-2 border-b bg-gray-200">
        <input
          className="flex-1 px-2 py-1 rounded border border-gray-300 text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://..."
        />
        <button
          onClick={navigate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded text-xs transition-colors"
        >
          Go
        </button>
      </div>
      <iframe
        key={iframeKey}
        src={iframeUrl}
        className="flex-1 w-full border-none bg-white"
        title="Browser"
      />
    </div>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Download, Trash2 } from 'lucide-react';

export const PaintApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getPos = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const beginStroke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const continueStroke = (x: number, y: number) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getPos(canvas, e.clientX, e.clientY);
    beginStroke(x, y);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getPos(canvas, e.clientX, e.clientY);
    continueStroke(x, y);
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touch = e.touches[0];
    const { x, y } = getPos(canvas, touch.clientX, touch.clientY);
    beginStroke(x, y);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touch = e.touches[0];
    const { x, y } = getPos(canvas, touch.clientX, touch.clientY);
    continueStroke(x, y);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'dessin.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center gap-4 p-2 bg-gray-200 border-b border-gray-300 shadow-sm">
        <input
          type="color"
          value={color}
          onChange={(e) => { setColor(e.target.value); setTool('pen'); }}
          className="w-8 h-8 cursor-pointer border-none p-0"
          title="Couleur"
        />

        <div className="h-8 w-[1px] bg-gray-300" />

        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="w-24"
            title="Épaisseur"
          />
          <span className="text-xs font-mono w-4">{lineWidth}</span>
        </div>

        <div className="h-8 w-[1px] bg-gray-300" />

        <button
          onClick={() => setTool('eraser')}
          className={`p-3 md:p-1.5 rounded ${tool === 'eraser' ? 'bg-gray-300 shadow-inner' : 'hover:bg-gray-300'}`}
          title="Gomme"
        >
          <Eraser size={18} />
        </button>

        <div className="flex-1" />

        <button onClick={clearCanvas} className="p-3 md:p-1.5 hover:bg-red-200 hover:text-red-600 rounded" title="Tout effacer">
          <Trash2 size={18} />
        </button>
        <button onClick={saveImage} className="p-3 md:p-1.5 hover:bg-blue-200 hover:text-blue-600 rounded" title="Sauvegarder">
          <Download size={18} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-4 bg-gray-400/20">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="bg-white shadow-lg cursor-crosshair max-w-full max-h-full object-contain touch-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
      </div>
    </div>
  );
};

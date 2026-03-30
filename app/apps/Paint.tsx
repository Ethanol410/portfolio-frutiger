import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Download, Trash2 } from 'lucide-react';

export const PaintApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0ea5e9');
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
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
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

  // Palette de couleurs Frutiger Aero
  const palette = ['#0ea5e9', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#ef4444', '#000000', '#ffffff'];

  return (
    <div className="h-full flex flex-col aero-app">
      {/* Toolbar — glass aqua */}
      <div
        className="flex items-center gap-3 px-3 py-2 shrink-0 flex-wrap"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.75) 0%,rgba(224,242,255,0.85) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(186,230,253,0.6)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        {/* Color picker natif */}
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={e => { setColor(e.target.value); setTool('pen'); }}
            className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 opacity-0 absolute inset-0"
            title="Couleur personnalisée"
          />
          <div
            className="w-8 h-8 rounded-lg border-2 border-white shadow-sm cursor-pointer"
            style={{ background: color, boxShadow: '0 0 0 1px rgba(14,165,233,0.3)' }}
          />
        </div>

        {/* Palette rapide */}
        <div className="flex gap-1">
          {palette.map(c => (
            <button
              key={c}
              onClick={() => { setColor(c); setTool('pen'); }}
              className="w-5 h-5 rounded transition-transform hover:scale-110"
              style={{
                background: c,
                border: color === c && tool === 'pen' ? '2px solid #0ea5e9' : '1px solid rgba(14,165,233,0.2)',
                boxShadow: color === c && tool === 'pen' ? '0 0 0 1px rgba(14,165,233,0.5)' : 'none',
              }}
              title={c}
            />
          ))}
        </div>

        <div className="h-6 w-[1px]" style={{ background: 'rgba(186,230,253,0.8)' }} />

        {/* Épaisseur */}
        <div className="flex items-center gap-2">
          <input
            type="range" min="1" max="20" value={lineWidth}
            onChange={e => setLineWidth(parseInt(e.target.value))}
            className="w-20 accent-sky-500"
            title="Épaisseur"
          />
          <span className="text-xs font-mono text-sky-600 w-4">{lineWidth}</span>
        </div>

        <div className="h-6 w-[1px]" style={{ background: 'rgba(186,230,253,0.8)' }} />

        {/* Gomme */}
        <button
          onClick={() => setTool('eraser')}
          className="p-1.5 rounded-lg transition-all"
          style={
            tool === 'eraser'
              ? { background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', color: '#0284c7' }
              : { color: '#64748b' }
          }
          title="Gomme"
        >
          <Eraser size={16} />
        </button>

        <div className="flex-1" />

        <button
          onClick={clearCanvas}
          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Tout effacer"
        >
          <Trash2 size={16} />
        </button>
        <button
          onClick={saveImage}
          className="p-1.5 rounded-lg text-sky-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
          title="Sauvegarder"
        >
          <Download size={16} />
        </button>
      </div>

      {/* Zone de dessin */}
      <div
        className="flex-1 overflow-hidden flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(160deg,rgba(186,230,253,0.2) 0%,rgba(224,242,255,0.3) 100%)' }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="bg-white max-w-full max-h-full object-contain touch-none cursor-crosshair"
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(14,165,233,0.15), 0 1px 4px rgba(14,165,233,0.08)',
            border: '1px solid rgba(186,230,253,0.6)',
          }}
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

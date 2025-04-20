import React, { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider('exclonidraw-room', ydoc);
    const yarray = ydoc.getArray('drawings');

    const saveData = () => {
      const saved = JSON.stringify(yarray.toArray());
      localStorage.setItem('exclonidraw-data', saved);
    };

    const savedData = localStorage.getItem('exclonidraw-data');
    if (savedData) {
      try {
        const lines = JSON.parse(savedData);
        lines.forEach((line: any) => yarray.push([line]));
      } catch {}
    }

    yarray.observe(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      yarray.toArray().forEach((line: any) => {
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);
        line.forEach((pt: any) => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      });
      saveData();
    });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let drawing = false;
    let line: { x: number; y: number }[] = [];

    const handleMouseDown = (e: MouseEvent) => {
      drawing = true;
      line = [{ x: e.offsetX, y: e.offsetY }];
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!drawing) return;
      line.push({ x: e.offsetX, y: e.offsetY });
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };
    const handleMouseUp = () => {
      drawing = false;
      yarray.push([line]);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef} width={1200} height={760} className="bg-white border-t" />;
};

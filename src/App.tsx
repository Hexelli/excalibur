import React from 'react';
import { DrawingBoard } from './components/DrawingBoard';
import { Toolbar } from './components/Toolbar';

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <Toolbar />
      <DrawingBoard />
    </div>
  );
}

import React from 'react';

interface TerminalProps {
  logs: string[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-red-900 p-2 h-32 overflow-hidden z-40 backdrop-blur-md">
      <div className="max-w-4xl mx-auto h-full font-mono text-[10px] md:text-xs text-green-500 opacity-80 uppercase leading-tight">
        {logs.map((log, i) => (
          <div key={i} className="mb-1">{log}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};

export default Terminal;


import React from 'react';
import { OverseerJudgment } from '../types';

interface JudgmentDisplayProps {
  judgment: OverseerJudgment;
  onReset: () => void;
}

const JudgmentDisplay: React.FC<JudgmentDisplayProps> = ({ judgment, onReset }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'S': return 'text-yellow-500';
      case 'A': return 'text-green-500';
      case 'B': return 'text-blue-500';
      case 'C': return 'text-orange-500';
      case 'D': return 'text-red-600';
      default: return 'text-white';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center py-8 border-4 border-red-900 bg-red-950/10">
        <h2 className="text-sm font-bold text-red-500 uppercase tracking-[0.5em] mb-4">判决等级</h2>
        <div className={`text-9xl font-black italic ${getGradeColor(judgment.grade)} drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]`}>
          {judgment.grade}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/80 border-l-4 border-red-600 p-6">
          <h3 className="text-lg font-black text-red-500 mb-4 uppercase">[ 失败路径分析 ]</h3>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
            {judgment.failureAnalysis}
          </p>
        </div>

        <div className="bg-zinc-900/80 border-l-4 border-green-600 p-6">
          <h3 className="text-lg font-black text-green-500 mb-4 uppercase">[ 14天强制执行表 ]</h3>
          <ul className="space-y-3">
            {judgment.executionPlan.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="text-green-600 font-bold shrink-0">DAY {i + 1}:</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-10 pb-20">
        <button
          onClick={() => window.print()}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 uppercase tracking-tighter transition-colors border border-zinc-700"
        >
          打印作战计划 (PDF)
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-red-900 hover:bg-red-800 text-white font-bold py-3 uppercase tracking-tighter transition-colors"
        >
          数据归零：重启系统
        </button>
      </div>
    </div>
  );
};

export default JudgmentDisplay;

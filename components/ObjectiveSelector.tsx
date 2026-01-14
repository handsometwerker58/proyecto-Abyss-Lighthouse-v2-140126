
import React from 'react';
import { ObjectiveType } from '../types';

interface ObjectiveSelectorProps {
  onSelect: (type: ObjectiveType) => void;
}

const objectives = [
  { id: ObjectiveType.PROFESSIONAL, title: '职业效能', desc: '工作产出、职业晋升、业务核心' },
  { id: ObjectiveType.ACADEMIC, title: '学术研究', desc: '深度学习、硬核考证、知识闭环' },
  { id: ObjectiveType.CREATIVE, title: '创造力产出', desc: '作品集成、艺术表达、系统构建' },
  { id: ObjectiveType.FINANCIAL, title: '财富积累', desc: '套利分析、资产扩张、生产资料获取' },
  { id: ObjectiveType.PHYSICAL, title: '生理极限', desc: '体能突破、极端控制、物理改造' },
];

const ObjectiveSelector: React.FC<ObjectiveSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="bg-red-950/20 border border-red-900 p-4 rounded-sm">
        <h2 className="text-xl font-black text-red-500 mb-2 uppercase">[ 第一步：战区目标确认 ]</h2>
        <p className="text-sm text-gray-400">选择唯一主攻方向。多选即意味着软弱，软弱意味着失败。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
        {objectives.map((obj) => (
          <button
            key={obj.id}
            onClick={() => onSelect(obj.id)}
            className="group flex items-center bg-zinc-900/50 border border-zinc-800 p-4 text-left hover:bg-red-900/20 hover:border-red-600 transition-all duration-200"
          >
            <div className="text-3xl font-black text-zinc-700 group-hover:text-red-600 mr-6 transition-colors">
              {obj.id}
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-300 group-hover:text-white uppercase">{obj.title}</h3>
              <p className="text-xs text-zinc-500 uppercase">{obj.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ObjectiveSelector;

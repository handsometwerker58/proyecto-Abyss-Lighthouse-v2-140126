
import React, { useState } from 'react';
import { AuditData } from '../types';

interface DataAuditFormProps {
  onSubmit: (data: AuditData) => void;
}

const DataAuditForm: React.FC<DataAuditFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<AuditData>({
    outputVolume: 0,
    workHours: 0,
    moodIndex: 0,
    sleepStability: 100,
    selfMedication: false,
    recentFailure: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.workHours <= 0) {
      alert("工时不可为0。严禁情报造假。");
      return;
    }
    if (formData.recentFailure.length < 10) {
      alert("溃败描述过短。模糊的陈述视同掩盖罪行。");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      <div className="bg-red-950/20 border border-red-900 p-4 rounded-sm">
        <h2 className="text-xl font-black text-red-500 mb-2 uppercase">[ 第二步：数据审计 ]</h2>
        <p className="text-sm text-gray-400">严禁虚报。系统会自动交叉比对产出率与生理波动。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-500 uppercase">
            7天有效产出量 (单位)
          </label>
          <input
            type="number"
            name="outputVolume"
            value={formData.outputVolume}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 focus:border-red-600 outline-none text-red-500 font-bold"
            required
          />
          <p className="text-[10px] text-zinc-600 italic">定义：已交付且不可撤回的工作成果（如：代码行数、完成页面、结项数量）。</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-500 uppercase">
            7天累计硬工时 (小时)
          </label>
          <input
            type="number"
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 focus:border-red-600 outline-none text-red-500 font-bold"
            required
          />
          <p className="text-[10px] text-zinc-600 italic">定义：排除会议、闲聊、摸鱼后的纯粹生产时间。</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-500 uppercase">
            情绪干扰指数 (0-100%)
          </label>
          <input
            type="number"
            name="moodIndex"
            min="0"
            max="100"
            value={formData.moodIndex}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 focus:border-red-600 outline-none text-red-500 font-bold"
          />
          <p className="text-[10px] text-zinc-600 italic">算法：(受情绪波动影响而损失的工时 / 总工时) * 100。</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-500 uppercase">
            睡眠稳定性 (0-100%)
          </label>
          <input
            type="number"
            name="sleepStability"
            min="0"
            max="100"
            value={formData.sleepStability}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 p-3 focus:border-red-600 outline-none text-red-500 font-bold"
          />
          <p className="text-[10px] text-zinc-600 italic">算法：100 - (每日入睡时间波动分钟数 / 60) * 10。</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-zinc-900/30 p-4 border border-zinc-800">
        <input
          type="checkbox"
          name="selfMedication"
          checked={formData.selfMedication}
          onChange={handleChange}
          className="w-6 h-6 accent-red-600"
        />
        <label className="text-xs font-bold text-zinc-400 uppercase">
          [ 战地医疗记录 ] 过去30天内存在未经许可的生理干预（过量咖啡因/酒精成瘾/滥用处方药）
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-zinc-500 uppercase">近期“溃败”描述 (证据链)</label>
        <textarea
          name="recentFailure"
          value={formData.recentFailure}
          onChange={handleChange}
          className="w-full bg-zinc-900 border border-zinc-800 p-3 h-32 focus:border-red-600 outline-none text-zinc-300 text-sm"
          placeholder="必须包含具体事实。禁止抒情。例如：'周三下午因刷短视频损失120分钟生产力，导致核心模块延期2.5小时。'"
          required
        />
        <p className="text-[10px] text-red-900 font-bold uppercase">警告：描述中若出现“大概”、“可能”、“有点”等词汇，将直接判定为审计失败。</p>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-black font-black py-4 uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]"
      >
        上传数据：启动终极审计
      </button>
    </form>
  );
};

export default DataAuditForm;

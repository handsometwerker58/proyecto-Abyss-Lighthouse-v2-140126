
import React, { useState, useCallback, useEffect } from 'react';
import { AppStatus, ObjectiveType, AuditData, OverseerJudgment } from './types';
import ObjectiveSelector from './components/ObjectiveSelector';
import DataAuditForm from './components/DataAuditForm';
import JudgmentDisplay from './components/JudgmentDisplay';
import Terminal from './components/Terminal';
import { generateJudgment } from './services/overseerService';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.INITIAL);
  const [objective, setObjective] = useState<ObjectiveType | null>(null);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [judgment, setJudgment] = useState<OverseerJudgment | null>(null);
  const [logs, setLogs] = useState<string[]>(['SYSTEM INITIALIZED...', 'WAITING FOR OPERATOR INPUT.']);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-12), `> ${new Date().toLocaleTimeString()} | ${msg}`]);
  };

  const handleObjectiveSelect = (type: ObjectiveType) => {
    setObjective(type);
    addLog(`OBJECTIVE ${type} LOCKED. AUTHORIZING DATA AUDIT...`);
    setStatus(AppStatus.AUDIT);
  };

  const handleAuditSubmit = async (data: AuditData) => {
    setAuditData(data);
    setStatus(AppStatus.PROCESSING);
    addLog('TRANSMITTING HARD DATA TO THE OVERSEER...');
    addLog('STEP 1: CALCULATING OUTPUT DENSITY...');
    addLog('STEP 2: ANALYZING EMOTIONAL INTERFERENCE...');
    addLog('STEP 3: CROSS-REFERENCING FAILURE EVIDENCE...');
    
    // 模拟审计日志流
    const extraLogs = [
      'SCANNING FOR LINGUISTIC FUZZINESS...',
      'DETERRING COGNITIVE DISSONANCE...',
      'EVALUATING PHYSIOLOGICAL STABILITY...',
      'FINALIZING EXECUTION TABLE...'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < extraLogs.length) {
        addLog(extraLogs[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    try {
      if (objective) {
        const result = await generateJudgment(objective, data);
        setJudgment(result);
        setStatus(AppStatus.JUDGMENT);
        addLog('JUDGMENT RENDERED. COMPLIANCE IS MANDATORY.');
      }
    } catch (error) {
      addLog('CRITICAL FAILURE: DATA STREAM CORRUPTED.');
      setStatus(AppStatus.AUDIT);
    } finally {
      clearInterval(interval);
    }
  };

  const reset = () => {
    setStatus(AppStatus.INITIAL);
    setObjective(null);
    setAuditData(null);
    setJudgment(null);
    setLogs(['SYSTEM REBOOTED.', 'WAITING FOR OPERATOR INPUT.']);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-[#0a0a0a] text-[#e0e0e0] relative">
      <header className="w-full max-w-4xl border-b-2 border-red-900 mb-8 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-red-600 tracking-tighter glitch-text">
            深渊灯塔: OVERSEER
          </h1>
          <p className="text-xs text-red-900 font-bold uppercase mt-1">
            Status: {status} | User: OPERATOR_99
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500 font-mono">ENCRYPTED_LINK_ESTABLISHED</p>
          <p className="text-[10px] text-gray-500 font-mono">LOC: SUB-BASE_KOL-72</p>
        </div>
      </header>

      <main className="w-full max-w-4xl flex-grow">
        {status === AppStatus.INITIAL && (
          <ObjectiveSelector onSelect={handleObjectiveSelect} />
        )}

        {status === AppStatus.AUDIT && (
          <DataAuditForm onSubmit={handleAuditSubmit} />
        )}

        {status === AppStatus.PROCESSING && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-red-900 opacity-20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-red-600/10 rounded-full animate-pulse flex items-center justify-center">
                 <span className="text-red-600 font-black text-xs">AI</span>
              </div>
            </div>
            <p className="text-xl font-black text-red-600 tracking-widest animate-pulse">正在进行深度逻辑审计</p>
            <p className="text-[10px] text-zinc-500 mt-2 uppercase">不要关闭终端。逃避审计将视同叛逃。</p>
          </div>
        )}

        {status === AppStatus.JUDGMENT && judgment && (
          <JudgmentDisplay judgment={judgment} onReset={reset} />
        )}
      </main>

      <Terminal logs={logs} />
    </div>
  );
};

export default App;

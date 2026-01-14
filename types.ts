
export enum ObjectiveType {
  PROFESSIONAL = 'A', // 职业效能
  ACADEMIC = 'B',     // 学术/硬核知识
  CREATIVE = 'C',     // 创造力产出
  FINANCIAL = 'D',    // 财富积累
  PHYSICAL = 'E'      // 生理机能极限
}

export interface AuditData {
  outputVolume: number;   // 产出量
  workHours: number;      // 投入工时
  moodIndex: number;      // 情绪干扰 (0-100)
  sleepStability: number; // 睡眠规律性 (0-100)
  selfMedication: boolean; // 是否自行用药
  recentFailure: string;  // 近期溃败描述
}

export interface OverseerJudgment {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  failureAnalysis: string;
  executionPlan: string[];
}

export enum AppStatus {
  INITIAL = 'INITIAL',
  AUDIT = 'AUDIT',
  PROCESSING = 'PROCESSING',
  JUDGMENT = 'JUDGMENT'
}

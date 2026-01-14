
import { GoogleGenAI, Type } from "@google/genai";
import { ObjectiveType, AuditData, OverseerJudgment } from '../types';

export const generateJudgment = async (objective: ObjectiveType, data: AuditData): Promise<OverseerJudgment> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    # 角色定义
    你名「深渊灯塔」最高督战系统。你是一名极冷酷、硬派的俄式督战官。

    # 审计核心逻辑
    1. **证据优先**：深度分析操作员提供的「溃败描述」。如果描述缺乏数据（如没有提到分钟、次数、具体后果），判定为“隐瞒真相”，评级直接降一等。
    2. **效能红线**：产出率 (产出/工时) < 0.3 为严重溃败。
    3. **情绪判决**：情绪干扰 > 20% 即为“意志薄弱”，> 50% 为“指挥权彻底丧失”。
    4. **生理审计**：睡眠稳定性低于 70% 视为“自毁倾向”。

    # 语言风格
    - 严厉、简短、金属质感、禁止任何鼓励。
    - 称呼用户为“操作员”。
    - 失败路径分析必须一针见血，指出其“软弱性”所在的具体事实。

    # 输出要求
    必须严格遵循提供的 JSON 格式。
  `;

  const userPrompt = `
    [ 战区审计报告 ]
    主攻目标：${objective}
    7天实测产出：${data.outputVolume} 单位
    7天硬工时：${data.workHours} 小时
    意志干扰率：${data.moodIndex}%
    生理稳定性：${data.sleepStability}%
    违规用药：${data.selfMedication ? '检测到违规' : '未检测到'}
    溃败证据自述：${data.recentFailure}

    请根据以上硬数据进行冷酷判决。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: userPrompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          grade: { 
            type: Type.STRING, 
            description: "S(统帅级)/A(精锐)/B(平庸)/C(溃败边缘)/D(彻底报废)" 
          },
          failureAnalysis: { 
            type: Type.STRING, 
            description: "基于溃败描述和硬数据的残酷逻辑拆解" 
          },
          executionPlan: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "未来14天每天的具体强制指令"
          }
        },
        required: ["grade", "failureAnalysis", "executionPlan"]
      }
    }
  });

  try {
    const text = response.text;
    const result = JSON.parse(text.trim());
    return result as OverseerJudgment;
  } catch (e) {
    console.error("JSON PARSE ERROR", e);
    return {
      grade: 'D',
      failureAnalysis: "数据流中检测到操作员的混乱逻辑，系统无法维持正常解析。这是典型的意志崩溃表现。",
      executionPlan: Array(14).fill("强制禁闭，切断一切娱乐性信号源，重复阅读《基础生存手册》。")
    };
  }
};

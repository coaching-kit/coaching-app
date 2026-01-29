import {
  calculateScores,
  getDominantType,
  getTypeName,
  getTypeClosing,
  VAK_QUESTIONS,
  TYPE_INFO
} from './vakData';

describe('vakData', () => {
  describe('calculateScores', () => {
    it('全ての質問に1点で回答した場合、各タイプ4点になる', () => {
      const answers: Record<number, number> = {};
      for (let i = 1; i <= 12; i++) {
        answers[i] = 1;
      }
      
      const scores = calculateScores(answers);
      
      expect(scores.V).toBe(4); // V型は4問
      expect(scores.A).toBe(4); // A型は4問
      expect(scores.K).toBe(4); // K型は4問
    });

    it('全ての質問に5点で回答した場合、各タイプ20点になる', () => {
      const answers: Record<number, number> = {};
      for (let i = 1; i <= 12; i++) {
        answers[i] = 5;
      }
      
      const scores = calculateScores(answers);
      
      expect(scores.V).toBe(20); // 4問 × 5点
      expect(scores.A).toBe(20); // 4問 × 5点
      expect(scores.K).toBe(20); // 4問 × 5点
    });

    it('V型の質問にのみ高得点を付けた場合、Vが最も高くなる', () => {
      const answers: Record<number, number> = {};
      
      // V型の質問ID: 3, 6, 9, 11
      VAK_QUESTIONS.forEach(q => {
        answers[q.id] = q.type === 'V' ? 5 : 1;
      });
      
      const scores = calculateScores(answers);
      
      expect(scores.V).toBe(20); // 4問 × 5点
      expect(scores.A).toBe(4);  // 4問 × 1点
      expect(scores.K).toBe(4);  // 4問 × 1点
    });

    it('空の回答でも動作する', () => {
      const scores = calculateScores({});
      
      expect(scores.V).toBe(0);
      expect(scores.A).toBe(0);
      expect(scores.K).toBe(0);
    });

    it('一部の回答のみでも動作する', () => {
      const answers = {
        1: 3, // A型
        2: 4, // K型
      };
      
      const scores = calculateScores(answers);
      
      expect(scores.V).toBe(0);
      expect(scores.A).toBe(3);
      expect(scores.K).toBe(4);
    });
  });

  describe('getDominantType', () => {
    it('V型が最も高い場合、Vを返す', () => {
      const scores = { V: 20, A: 10, K: 10 };
      expect(getDominantType(scores)).toBe('V');
    });

    it('A型が最も高い場合、Aを返す', () => {
      const scores = { V: 10, A: 20, K: 10 };
      expect(getDominantType(scores)).toBe('A');
    });

    it('K型が最も高い場合、Kを返す', () => {
      const scores = { V: 10, A: 10, K: 20 };
      expect(getDominantType(scores)).toBe('K');
    });

    it('差が3未満の場合、balancedを返す', () => {
      const scores = { V: 15, A: 16, K: 14 }; // 差: 2
      expect(getDominantType(scores)).toBe('balanced');
    });

    it('差がちょうど3の場合、優勢型を返す（balancedではない）', () => {
      const scores = { V: 18, A: 15, K: 15 }; // 差: 3
      expect(getDominantType(scores)).toBe('V');
    });

    it('全て同じスコアの場合、balancedを返す', () => {
      const scores = { V: 15, A: 15, K: 15 };
      expect(getDominantType(scores)).toBe('balanced');
    });
  });

  describe('getTypeName', () => {
    it('V型の名前を正しく返す', () => {
      expect(getTypeName('V')).toBe('見るタイプ（視覚型）');
    });

    it('A型の名前を正しく返す', () => {
      expect(getTypeName('A')).toBe('聞くタイプ（聴覚型）');
    });

    it('K型の名前を正しく返す', () => {
      expect(getTypeName('K')).toBe('体感タイプ（体感覚型）');
    });

    it('balanced型の名前を正しく返す', () => {
      expect(getTypeName('balanced')).toBe('バランス型');
    });
  });

  describe('getTypeClosing', () => {
    it('V型の締めくくりメッセージを返す', () => {
      const message = getTypeClosing('V');
      expect(message).toContain('視覚');
      expect(message).toContain('プレゼンテーション');
    });

    it('A型の締めくくりメッセージを返す', () => {
      const message = getTypeClosing('A');
      expect(message).toContain('傾聴');
      expect(message).toContain('コーチング');
    });

    it('K型の締めくくりメッセージを返す', () => {
      const message = getTypeClosing('K');
      expect(message).toContain('体感');
      expect(message).toContain('マネジメント');
    });

    it('balanced型の締めくくりメッセージを返す', () => {
      const message = getTypeClosing('balanced');
      expect(message).toContain('あらゆる状況');
      expect(message).toContain('リーダー');
    });
  });

  describe('VAK_QUESTIONS', () => {
    it('12問の質問が定義されている', () => {
      expect(VAK_QUESTIONS).toHaveLength(12);
    });

    it('各タイプ4問ずつ質問がある', () => {
      const vCount = VAK_QUESTIONS.filter(q => q.type === 'V').length;
      const aCount = VAK_QUESTIONS.filter(q => q.type === 'A').length;
      const kCount = VAK_QUESTIONS.filter(q => q.type === 'K').length;
      
      expect(vCount).toBe(4);
      expect(aCount).toBe(4);
      expect(kCount).toBe(4);
    });

    it('各質問にid、type、questionが存在する', () => {
      VAK_QUESTIONS.forEach(q => {
        expect(q.id).toBeDefined();
        expect(q.type).toBeDefined();
        expect(q.question).toBeDefined();
        expect(['V', 'A', 'K']).toContain(q.type);
      });
    });

    it('質問IDが1から12まで連番である', () => {
      const ids = VAK_QUESTIONS.map(q => q.id).sort((a, b) => a - b);
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });
  });

  describe('TYPE_INFO', () => {
    it('V、A、K型の情報が定義されている', () => {
      expect(TYPE_INFO.V).toBeDefined();
      expect(TYPE_INFO.A).toBeDefined();
      expect(TYPE_INFO.K).toBeDefined();
    });

    it('各タイプにtitle、description、strengths、businessTipsが存在する', () => {
      ['V', 'A', 'K'].forEach(type => {
        const info = TYPE_INFO[type as 'V' | 'A' | 'K'];
        expect(info.title).toBeDefined();
        expect(info.description).toBeDefined();
        expect(info.strengths).toBeDefined();
        expect(info.businessTips).toBeDefined();
        expect(Array.isArray(info.strengths)).toBe(true);
        expect(Array.isArray(info.businessTips)).toBe(true);
      });
    });
  });
});

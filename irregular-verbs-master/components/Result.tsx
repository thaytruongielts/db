
import React from 'react';
import { UserAnswer } from '../types';

interface ResultProps {
  answers: UserAnswer[];
  onRestart: () => void;
  onHome: () => void;
}

const Result: React.FC<ResultProps> = ({ answers, onRestart, onHome }) => {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalCount = answers.length;
  const score = (10 * correctCount) / totalCount;

  const getEmoji = (s: number) => {
    if (s === 10) return '🏆 Tuyệt đối!';
    if (s >= 8) return '🌟 Giỏi quá!';
    if (s >= 5) return '👍 Khá lắm!';
    return '💪 Cố gắng lên!';
  };

  const getScoreColor = (s: number) => {
    if (s >= 8) return 'text-green-600';
    if (s >= 5) return 'text-orange-500';
    return 'text-red-600';
  };

  return (
    <div className="p-8 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Hoàn thành bài thi!</h2>
        <p className="text-slate-500 text-lg">{getEmoji(score)}</p>
      </div>

      <div className="relative inline-block mb-10">
        <div className="w-40 h-40 rounded-full border-8 border-slate-100 flex items-center justify-center">
          <div>
            <span className={`text-5xl font-black ${getScoreColor(score)}`}>
              {score.toFixed(1)}
            </span>
            <div className="text-xs font-bold text-slate-400 uppercase mt-1">Điểm hệ 10</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-2xl font-bold text-slate-700">{correctCount}</div>
          <div className="text-xs font-bold text-slate-400 uppercase">Câu đúng</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-2xl font-bold text-slate-700">{totalCount - correctCount}</div>
          <div className="text-xs font-bold text-slate-400 uppercase">Câu sai</div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRestart}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-md"
        >
          Làm lại bài khác
        </button>
        <button
          onClick={onHome}
          className="w-full py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;


import React, { useState, useCallback, useEffect } from 'react';
import { Verb, UserAnswer } from '../types';

interface QuizProps {
  verbs: Verb[];
  title: string;
  onFinish: (answers: UserAnswer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ verbs, title, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [inputV1, setInputV1] = useState('');
  const [inputV2, setInputV2] = useState('');
  const [inputV3, setInputV3] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const currentVerb = verbs[currentIndex];

  const checkAnswer = (v: string, correct: string) => {
    const clean = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ');
    const cleanUser = clean(v);
    const options = correct.split(/[\/,]/).map(o => clean(o));
    return options.some(opt => opt === cleanUser);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) return;

    const isV1Ok = checkAnswer(inputV1, currentVerb.v1);
    const isV2Ok = checkAnswer(inputV2, currentVerb.v2);
    const isV3Ok = checkAnswer(inputV3, currentVerb.v3);

    const isAllCorrect = isV1Ok && isV2Ok && isV3Ok;

    const currentAnswer: UserAnswer = {
      questionIndex: currentIndex,
      v1: inputV1,
      v2: inputV2,
      v3: inputV3,
      isCorrect: isAllCorrect
    };

    setFeedback({
      isCorrect: isAllCorrect,
      message: isAllCorrect ? 'Chính xác! 🎉' : 'Chưa đúng rồi! ❌'
    });

    setAnswers(prev => [...prev, currentAnswer]);
  };

  const handleNext = () => {
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputV1('');
      setInputV2('');
      setInputV3('');
      setFeedback(null);
    } else {
      onFinish([...answers]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && feedback) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback, currentIndex, answers]);

  const progress = ((currentIndex + 1) / verbs.length) * 100;

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-blue-500 font-bold text-sm uppercase">{title}</h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Câu {currentIndex + 1} / {verbs.length}
        </span>
        <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Nghĩa: <span className="text-blue-600">"{currentVerb.meaning}"</span>
        </h2>
        <p className="text-slate-500">Nhập 3 cột của động từ này:</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">V1 (Hiện tại)</label>
            <input
              autoFocus
              disabled={!!feedback}
              value={inputV1}
              onChange={(e) => setInputV1(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-white disabled:border-slate-100"
              placeholder="..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">V2 (Quá khứ)</label>
            <input
              disabled={!!feedback}
              value={inputV2}
              onChange={(e) => setInputV2(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-white disabled:border-slate-100"
              placeholder="..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">V3 (Phân từ II)</label>
            <input
              disabled={!!feedback}
              value={inputV3}
              onChange={(e) => setInputV3(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-white disabled:border-slate-100"
              placeholder="..."
            />
          </div>
        </div>

        {!feedback ? (
          <button
            type="submit"
            className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all active:scale-[0.98]"
          >
            Kiểm tra
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className={`p-4 rounded-xl font-bold text-center border-2 ${
              feedback.isCorrect ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {feedback.message}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg"
            >
              {currentIndex < verbs.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành & Xem điểm'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Quiz;

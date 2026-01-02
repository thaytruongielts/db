
import React, { useState, useCallback, useMemo } from 'react';
import { AppState, Verb, UserAnswer, Section } from './types';
import { parseAllVerbs, createSections } from './constants';
import Quiz from './components/Quiz';
import Result from './components/Result';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const allVerbs = useMemo(() => parseAllVerbs(), []);
  const sections = useMemo(() => createSections(allVerbs, 20), [allVerbs]);
  
  const [quizVerbs, setQuizVerbs] = useState<Verb[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentSectionTitle, setCurrentSectionTitle] = useState('');

  const handleStartRandom = useCallback(() => {
    const shuffled = [...allVerbs].sort(() => 0.5 - Math.random());
    setQuizVerbs(shuffled.slice(0, 10));
    setUserAnswers([]);
    setCurrentSectionTitle('Ngẫu nhiên 10 từ');
    setAppState(AppState.QUIZ);
  }, [allVerbs]);

  const handleSelectSection = useCallback((section: Section) => {
    setQuizVerbs(section.verbs);
    setUserAnswers([]);
    setCurrentSectionTitle(section.name);
    setAppState(AppState.QUIZ);
  }, []);

  const finishQuiz = useCallback((answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setAppState(AppState.RESULT);
  }, []);

  const goHome = useCallback(() => setAppState(AppState.HOME), []);
  const goToSelection = useCallback(() => setAppState(AppState.SELECT_SECTION), []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {appState === AppState.HOME && (
          <div className="p-8 text-center flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Irregular Verbs Master</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Luyện tập {allVerbs.length} động từ bất quy tắc tiếng Anh theo từng bài học.
            </p>
            <div className="space-y-4">
              <button
                onClick={goToSelection}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg"
              >
                Chọn bài học (theo nhóm 20 từ)
              </button>
              <button
                onClick={handleStartRandom}
                className="w-full px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-xl hover:bg-slate-200 transition-all border border-slate-200"
              >
                Luyện tập ngẫu nhiên (10 từ)
              </button>
            </div>
          </div>
        )}

        {appState === AppState.SELECT_SECTION && (
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex items-center mb-6">
              <button onClick={goHome} className="text-blue-600 font-bold hover:underline mr-4">← Quay lại</button>
              <h2 className="text-2xl font-bold text-slate-800">Chọn bài học</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSelectSection(section)}
                  className="text-left p-4 rounded-xl border-2 border-slate-100 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <div className="font-bold text-slate-700 group-hover:text-blue-700">{section.name}</div>
                  <div className="text-sm text-slate-500">{section.verbs.length} động từ</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {appState === AppState.QUIZ && (
          <Quiz 
            verbs={quizVerbs} 
            title={currentSectionTitle}
            onFinish={finishQuiz} 
          />
        )}

        {appState === AppState.RESULT && (
          <Result 
            answers={userAnswers} 
            onRestart={() => setAppState(AppState.SELECT_SECTION)} 
            onHome={goHome} 
          />
        )}
      </div>
      
      <footer className="mt-8 text-slate-400 text-sm pb-10">
        &copy; {new Date().getFullYear()} Irregular Verbs App • {allVerbs.length} Verbs Loaded
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default App;

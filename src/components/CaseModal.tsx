import React, { useState } from 'react';
import { InvestigationCase } from '../data/courseData';
import { Pixar3DIcon } from './Pixar3DIcon';
import { CyberIcon } from './CyberIcons';
import { 
  CheckCircle, 
  XCircle, 
  X, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  HelpCircle,
  KeyRound
} from 'lucide-react';
import { sound } from '../utils/audio';
import { CASE_RIDDLE_IMAGES } from '../screens/Screen4Investigation';

interface CaseModalProps {
  selectedCase: InvestigationCase;
  isAlreadySolved: boolean;
  isDiscussionMode: boolean;
  onClose: () => void;
  onToggleDiscussionMode: () => void;
  onCaseSolved: (caseId: number, superpowerTitle: string) => void;
}

const OPTION_LETTER: Record<string, string> = {
  A: 'А',
  B: 'Б',
  C: 'В',
  D: 'Г',
  'А': 'А',
  'Б': 'Б',
  'В': 'В',
  'Г': 'Г'
};

export const CaseModal: React.FC<CaseModalProps> = ({
  selectedCase,
  isAlreadySolved,
  isDiscussionMode,
  onClose,
  onToggleDiscussionMode,
  onCaseSolved
}) => {
  const [wrongSelectedIds, setWrongSelectedIds] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(isAlreadySolved);
  const [showExplanation, setShowExplanation] = useState<boolean>(isAlreadySolved);

  const riddleImage = CASE_RIDDLE_IMAGES[selectedCase.id];

  const handleOptionClick = (opt: { id: string; isCorrect: boolean; feedback: string }) => {
    if (isSolved || wrongSelectedIds.includes(opt.id)) return;

    if (opt.isCorrect) {
      sound.playSuccess();
      setIsSolved(true);
      setShowExplanation(true);
      onCaseSolved(selectedCase.id, selectedCase.superpower.title);
    } else {
      sound.playAlert();
      setWrongSelectedIds((prev) => [...prev, opt.id]);
    }
  };

  const handleRevealCorrectAnswer = () => {
    sound.playSuccess();
    setIsSolved(true);
    setShowExplanation(true);
    onCaseSolved(selectedCase.id, selectedCase.superpower.title);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#172B4D]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Expanded wide container: max-w-5xl lg:max-w-6xl */}
      <div className="bg-white rounded-3xl max-w-5xl lg:max-w-6xl w-full p-6 sm:p-9 lg:p-10 shadow-2xl border-4 border-[#007BFF] relative my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[94vh] overflow-y-auto">
        
        {/* Top Header of Modal */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#007BFF]/30 text-[#007BFF] font-brand font-black text-sm uppercase tracking-wider">
              ДЕЛО №{selectedCase.id}
            </span>
            <h3 className="font-brand font-black text-2xl sm:text-3xl text-[#172B4D]">
              {selectedCase.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Mentor "Reveal Answer" helper button */}
            {!isSolved && (
              <button
                onClick={handleRevealCorrectAnswer}
                title="Раскрыть верный ответ, если класс затрудняется"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFD43B] hover:bg-yellow-400 border-2 border-yellow-500 text-[#172B4D] font-brand font-black text-xs sm:text-sm cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
              >
                <KeyRound size={18} className="text-[#172B4D] stroke-[2.5]" />
                <span>Показать верный ответ</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Закрыть окно"
              className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* 3D Riddle Illustration + Scenario Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 items-stretch">
          {/* Left Column: 3D Scene */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center justify-center p-0">
            <div className="w-full h-64 sm:h-72 lg:h-80 flex items-center justify-center">
              <img
                src={riddleImage}
                alt={selectedCase.title}
                style={{ mixBlendMode: 'multiply' }}
                className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Scenario description */}
          <div className="md:col-span-8 lg:col-span-8 bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#007BFF] uppercase tracking-wider">
                  Что произошло в ситуации:
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-[#007BFF]">
                  {selectedCase.shortDesc}
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#172B4D] leading-relaxed">
                {selectedCase.scenarioText}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#FFD43B]" />
                <span>Попробуйте найти самое безопасное решение вместе с классом!</span>
              </div>

              {wrongSelectedIds.length > 0 && !isSolved && (
                <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  Попыток сделано: {wrongSelectedIds.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Question & Discussion Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h4 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] leading-snug">
              ❓ {selectedCase.question}
            </h4>

            {/* Mentor Mode Toggle */}
            <button
              onClick={onToggleDiscussionMode}
              className="self-start sm:self-auto text-xs sm:text-sm font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
            >
              <Eye size={16} className="text-amber-700" />
              <span>{isDiscussionMode ? 'Показать варианты' : 'Скрыть для дискуссии'}</span>
            </button>
          </div>

          {/* Discussion Mode / Options */}
          {isDiscussionMode && !isSolved ? (
            <div className="p-8 sm:p-10 bg-amber-50 border-3 border-amber-300 rounded-3xl text-center shadow-md">
              <div className="text-2xl sm:text-3xl font-brand font-black text-amber-950 mb-2">
                🗣️ Время открытого обсуждения!
              </div>
              <p className="text-lg text-amber-900 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
                Наставник, предложите ребятам высказаться вслух: как бы они поступили в этой ситуации до открытия готовых вариантов?
              </p>
              <button
                onClick={onToggleDiscussionMode}
                className="h-14 px-8 bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-base sm:text-lg rounded-2xl cursor-pointer transition-all shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95"
              >
                Открыть 4 варианта решения
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {selectedCase.options.map((opt) => {
                const isWrong = wrongSelectedIds.includes(opt.id);
                const isCorrect = opt.isCorrect;
                const letter = OPTION_LETTER[opt.id] || opt.id;

                // Base style: Large (min-h-[80px]), crisp border, white bg
                let btnStyle = 'bg-white border-2 border-slate-300 hover:border-[#007BFF] hover:ring-2 hover:ring-[#007BFF]/30 hover:bg-blue-50/20';

                if (isSolved && isCorrect) {
                  btnStyle = 'bg-emerald-50 border-3 border-emerald-500 shadow-md ring-2 ring-emerald-300 text-emerald-950';
                } else if (isWrong) {
                  btnStyle = 'bg-red-50/95 border-3 border-red-500 ring-2 ring-red-200 text-red-950 cursor-not-allowed';
                } else if (isSolved && !isCorrect) {
                  btnStyle = 'bg-slate-50 border-2 border-slate-200 opacity-50 cursor-not-allowed';
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isSolved || isWrong}
                    onClick={() => handleOptionClick(opt)}
                    className={`w-full min-h-[80px] p-4 sm:p-5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-4 ${btnStyle}`}
                  >
                    {/* Badge Letter А / Б / В / Г */}
                    <span
                      className={`w-12 h-12 rounded-2xl font-brand font-black text-xl flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                        isSolved && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-100 text-[#172B4D] border border-slate-200'
                      }`}
                    >
                      {letter}
                    </span>

                    {/* Option Text & Retry Feedback */}
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-bold text-[#172B4D] leading-snug">
                        {opt.text}
                      </p>

                      {/* Display wrong feedback immediately upon incorrect attempt (Large, high-contrast) */}
                      {isWrong && (
                        <div className="mt-2.5 p-3 bg-red-100/90 rounded-xl border border-red-300 text-base sm:text-lg font-bold text-red-700 leading-snug">
                          <span className="font-black mr-1.5">❌ Не совсем так:</span>
                          <span>{opt.feedback}</span>
                          <span className="block sm:inline text-red-800 font-extrabold mt-1 sm:mt-0 sm:ml-2">
                            Попробуйте другой вариант!
                          </span>
                        </div>
                      )}

                      {/* Display correct feedback once solved */}
                      {isSolved && isCorrect && (
                        <p className="text-base sm:text-lg mt-2 font-bold text-emerald-700">
                          {opt.feedback}
                        </p>
                      )}
                    </div>

                    {/* Status Icons */}
                    {isSolved && isCorrect && (
                      <CheckCircle className="text-emerald-600 shrink-0" size={32} />
                    )}
                    {isWrong && (
                      <XCircle className="text-red-500 shrink-0" size={30} />
                    )}
                  </button>
                );
              })}

              {/* Bottom mentor fallback button if on mobile / small screen */}
              {!isSolved && (
                <div className="pt-2 flex justify-end sm:hidden">
                  <button
                    onClick={handleRevealCorrectAnswer}
                    className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                  >
                    <KeyRound size={14} className="text-amber-600" />
                    <span>Показать правильный ответ</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Explanation & Superpower Box (Only shown when solved!) */}
        {showExplanation && (
          <div className="space-y-4 mt-6 animate-in fade-in duration-300">
            {/* Mentor Explanation */}
            <div className="bg-[#EAF4FF] border-2 border-[#007BFF]/30 rounded-3xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#007BFF] uppercase tracking-wider mb-2">
                <ShieldCheck size={22} />
                <span>Разбор ситуации от наставника KIBERONE:</span>
              </div>
              <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-semibold">
                {selectedCase.explanation}
              </p>
            </div>

            {/* Superpower Award Box */}
            <div className="bg-[#FFF6D8] border-3 border-[#FFD43B] rounded-3xl p-5 sm:p-6 flex items-center gap-5 shadow-md">
              <div className="w-18 h-18 rounded-2xl bg-white shadow-md border border-amber-200 flex items-center justify-center shrink-0">
                {selectedCase.superpower.icon === 'shield' ? (
                  <Pixar3DIcon name="shield" size={54} />
                ) : selectedCase.superpower.icon === 'search' ? (
                  <Pixar3DIcon name="lupa" size={54} />
                ) : (
                  <CyberIcon name={selectedCase.superpower.icon} size={48} />
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider">
                  Открыта суперсила от KIBERONE:
                </div>
                <div className="font-brand font-black text-xl sm:text-2xl text-[#172B4D]">
                  {selectedCase.superpower.title}
                </div>
                <p className="text-base sm:text-lg text-amber-950 font-bold italic mt-0.5">
                  {selectedCase.superpower.description}
                </p>
              </div>
            </div>

            {/* Modal Close / Return to Board */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg sm:text-xl shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3"
              >
                <span>Вернуться к игровому полю</span>
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseModal;

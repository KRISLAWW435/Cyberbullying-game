import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  PlusCircle, 
  Home, 
  Settings2, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { COURSE_STAGES } from '../data/courseData';
import { sound } from '../utils/audio';

interface MentorControlsProps {
  currentStage: number;
  totalStages: number;
  onPrevStage: () => void;
  onNextStage: () => void;
  onGoToStage: (stageId: number) => void;
  onResetSession: () => void;
  onAddScoreBonus: (amount: number) => void;
  isDiscussionMode: boolean;
  onToggleDiscussionMode: () => void;
  onRevealAnswer?: () => void;
  canRevealAnswer?: boolean;
}

export const MentorControls: React.FC<MentorControlsProps> = ({
  currentStage,
  totalStages,
  onPrevStage,
  onNextStage,
  onGoToStage,
  onResetSession,
  onAddScoreBonus,
  isDiscussionMode,
  onToggleDiscussionMode,
  onRevealAnswer,
  canRevealAnswer = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <aside className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2" aria-label="Панель наставника KIBERONE">
      {/* Expanded Mentor Panel (Compact & Semi-transparent) */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-3 shadow-2xl w-72 sm:w-80 mb-1.5 text-[#172B4D] animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#007BFF]" />
              <span className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-slate-700">
                Панель наставника
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Quick Discussion & Reveal Controls */}
          <div className="space-y-1.5 mb-2.5">
            <div className="flex items-center justify-between bg-slate-50/90 p-1.5 px-2 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5 truncate mr-1">
                {isDiscussionMode ? <EyeOff size={14} className="text-amber-600 shrink-0" /> : <Eye size={14} className="text-[#007BFF] shrink-0" />}
                <span className="text-[11px] font-semibold truncate">
                  {isDiscussionMode ? 'Дискуссия (скрыты)' : 'Варианты открыты'}
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleDiscussionMode();
                }}
                className={`text-[11px] px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer shrink-0 ${
                  isDiscussionMode
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                {isDiscussionMode ? 'Показать' : 'Скрыть'}
              </button>
            </div>

            {canRevealAnswer && onRevealAnswer && (
              <button
                onClick={() => {
                  sound.playClick();
                  onRevealAnswer();
                }}
                className="w-full py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Показать ответ классу</span>
              </button>
            )}

            {/* Bonus Points for Discussion */}
            <div className="bg-[#FFF6D8]/90 border border-[#FFD43B] p-2 rounded-xl">
              <div className="text-[10px] font-bold text-amber-900 mb-1 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-600" />
                <span>Поощрение активности:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onAddScoreBonus(5);
                  }}
                  className="flex-1 py-1 bg-white hover:bg-amber-50 border border-amber-300 rounded-lg text-xs font-bold text-amber-900 flex items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95"
                >
                  <PlusCircle size={13} className="text-amber-600" /> +5
                </button>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onAddScoreBonus(10);
                  }}
                  className="flex-1 py-1 bg-[#FFD43B] hover:bg-amber-400 rounded-lg text-xs font-black text-[#172B4D] flex items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-xs"
                >
                  <Sparkles size={13} /> +10
                </button>
              </div>
            </div>
          </div>

          {/* Jump to Stage Grid */}
          <div className="mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Переход к этапу:
            </span>
            <div className="grid grid-cols-4 gap-1">
              {COURSE_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    sound.playClick();
                    onGoToStage(st.id);
                  }}
                  className={`py-1 px-1 rounded text-[10px] font-bold text-center truncate transition-colors cursor-pointer ${
                    st.id === currentStage
                      ? 'bg-[#007BFF] text-white shadow-xs'
                      : 'bg-slate-100/90 hover:bg-blue-50 text-slate-700 border border-slate-200'
                  }`}
                  title={st.name}
                >
                  {st.id}. {st.code}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Session Section */}
          <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between">
            {showResetConfirm ? (
              <div className="flex items-center gap-1.5 w-full">
                <span className="text-[11px] text-red-600 font-bold">Сбросить?</span>
                <button
                  onClick={() => {
                    sound.playAlert();
                    setShowResetConfirm(false);
                    onResetSession();
                  }}
                  className="text-[11px] bg-red-600 text-white font-bold px-2 py-0.5 rounded cursor-pointer"
                >
                  Да
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-[11px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded cursor-pointer ml-auto"
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-[11px] text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={12} />
                <span>Начать занятие заново</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Bottom Control Bar (Compact, Touch-friendly, Semi-transparent) */}
      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-300 shadow-xl">
        {/* Previous stage */}
        <button
          onClick={() => {
            sound.playClick();
            onPrevStage();
          }}
          disabled={currentStage <= 1}
          title="Предыдущий экран"
          className="h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-[#172B4D] font-bold text-xs sm:text-sm flex items-center gap-1 transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Назад</span>
        </button>

        {/* Go to home */}
        <button
          onClick={() => {
            sound.playClick();
            onGoToStage(1);
          }}
          title="В начало"
          className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-blue-50 text-[#172B4D] hover:text-[#007BFF] flex items-center justify-center transition-colors cursor-pointer"
        >
          <Home size={18} />
        </button>

        {/* Toggle Mentor Menu */}
        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(!isOpen);
          }}
          title="Настройки наставника"
          className={`h-10 px-3 rounded-xl border flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${
            isOpen
              ? 'bg-[#172B4D] text-white border-[#172B4D]'
              : 'bg-[#FFF6D8] border-[#FFD43B] text-amber-900 hover:bg-amber-100'
          }`}
        >
          <Settings2 size={16} />
          <span className="hidden sm:inline">Наставник</span>
        </button>

        {/* Next stage / Advance CTA */}
        {currentStage < totalStages && (
          <button
            onClick={() => {
              sound.playClick();
              onNextStage();
            }}
            className="h-10 px-4 rounded-xl bg-[#007BFF] hover:bg-blue-600 text-white font-black text-xs sm:text-sm flex items-center gap-1 shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
          >
            <span>Далее</span>
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

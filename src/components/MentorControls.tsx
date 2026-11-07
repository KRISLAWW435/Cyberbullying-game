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
  HelpCircle,
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
      {/* Expanded Mentor Panel */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md border-2 border-[#172B4D] rounded-2xl p-3.5 shadow-2xl w-80 sm:w-96 mb-2 text-[#172B4D] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#007BFF]" />
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Панель наставника KIBERONE
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-0.5 rounded cursor-pointer"
            >
              Свернуть ✕
            </button>
          </div>

          {/* Quick Discussion & Reveal Controls */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                {isDiscussionMode ? <EyeOff size={16} className="text-amber-600" /> : <Eye size={16} className="text-[#007BFF]" />}
                <span className="text-xs font-semibold">
                  {isDiscussionMode ? 'Варианты скрыты (Дискуссия)' : 'Варианты открыты'}
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onToggleDiscussionMode();
                }}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  isDiscussionMode
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                {isDiscussionMode ? 'Показать варианты' : 'Скрыть варианты'}
              </button>
            </div>

            {canRevealAnswer && onRevealAnswer && (
              <button
                onClick={() => {
                  sound.playClick();
                  onRevealAnswer();
                }}
                className="w-full py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Показать классу правильный ответ</span>
              </button>
            )}

            {/* Bonus Points for Discussion Participation */}
            <div className="bg-[#FFF6D8] border border-[#FFD43B] p-2 rounded-xl">
              <div className="text-[11px] font-bold text-amber-900 mb-1 flex items-center gap-1">
                <Sparkles size={14} className="text-amber-600" />
                <span>Поощрение активности зала:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onAddScoreBonus(5);
                  }}
                  className="flex-1 py-1 bg-white hover:bg-amber-50 border border-amber-300 rounded-lg text-xs font-bold text-amber-900 flex items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95"
                >
                  <PlusCircle size={14} className="text-amber-600" /> +5 баллов
                </button>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    onAddScoreBonus(10);
                  }}
                  className="flex-1 py-1 bg-[#FFD43B] hover:bg-amber-400 rounded-lg text-xs font-black text-[#172B4D] flex items-center justify-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-xs"
                >
                  <Sparkles size={14} /> +10 баллов
                </button>
              </div>
            </div>
          </div>

          {/* Jump to Stage Grid */}
          <div className="mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Быстрый переход к этапу:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {COURSE_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    sound.playClick();
                    onGoToStage(st.id);
                  }}
                  className={`py-1 px-1 rounded text-[11px] font-bold text-center truncate transition-colors cursor-pointer ${
                    st.id === currentStage
                      ? 'bg-[#007BFF] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-blue-50 text-slate-700 border border-slate-200'
                  }`}
                  title={st.name}
                >
                  {st.id}. {st.code}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Session Section */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            {showResetConfirm ? (
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-red-600 font-bold">Сбросить всё?</span>
                <button
                  onClick={() => {
                    sound.playAlert();
                    setShowResetConfirm(false);
                    onResetSession();
                  }}
                  className="text-xs bg-red-600 text-white font-bold px-2 py-1 rounded cursor-pointer"
                >
                  Да, сбросить
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded cursor-pointer ml-auto"
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={13} />
                <span>Начать занятие заново</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Touch Bar on Bottom (Large Touch Buttons) */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border-2 border-slate-200 shadow-xl">
        {/* Previous stage */}
        <button
          onClick={() => {
            sound.playClick();
            onPrevStage();
          }}
          disabled={currentStage <= 1}
          title="Предыдущий экран"
          className="h-12 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-[#172B4D] font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Назад</span>
        </button>

        {/* Go to home */}
        <button
          onClick={() => {
            sound.playClick();
            onGoToStage(1);
          }}
          title="В начало"
          className="h-12 w-12 rounded-xl bg-slate-100 hover:bg-blue-50 text-[#172B4D] hover:text-[#007BFF] flex items-center justify-center transition-colors cursor-pointer"
        >
          <Home size={20} />
        </button>

        {/* Toggle Mentor Menu */}
        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(!isOpen);
          }}
          title="Настройки наставника"
          className={`h-12 px-3.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
            isOpen
              ? 'bg-[#172B4D] text-white border-[#172B4D]'
              : 'bg-[#FFF6D8] border-[#FFD43B] text-amber-900 hover:bg-amber-100'
          }`}
        >
          <Settings2 size={18} />
          <span className="hidden sm:inline">Наставник</span>
        </button>

        {/* Next stage / Advance CTA */}
        {currentStage < totalStages && (
          <button
            onClick={() => {
              sound.playClick();
              onNextStage();
            }}
            className="h-12 px-5 rounded-xl bg-[#007BFF] hover:bg-blue-600 text-white font-black text-sm flex items-center gap-1.5 shadow-md shadow-blue-500/25 transition-all cursor-pointer active:scale-95"
          >
            <span>Далее</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </aside>
  );
};

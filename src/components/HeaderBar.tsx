import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Trophy } from 'lucide-react';
import { COURSE_STAGES } from '../data/courseData';
import { sound } from '../utils/audio';

interface HeaderBarProps {
  currentStage: number;
  totalStages?: number;
  teamScore: number;
  onPrevStage: () => void;
  onGoToStage: (stageId: number) => void;
  scoreBonusTrigger?: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentStage,
  totalStages = 8,
  teamScore,
  onPrevStage,
  onGoToStage,
  scoreBonusTrigger = 0
}) => {
  const [isMuted, setIsMuted] = useState(!sound.enabled);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleSound = () => {
    const isNowEnabled = sound.toggleMute();
    setIsMuted(!isNowEnabled);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const currentStageInfo = COURSE_STAGES.find((s) => s.id === currentStage) || COURSE_STAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b-2 border-slate-100 shadow-sm px-4 lg:px-8 py-2.5 flex items-center justify-between">
      {/* LEFT: KIBERONE Branding with yellow cyber accent */}
      <div className="flex items-center gap-3">
        {currentStage > 1 && (
          <button
            onClick={() => {
              sound.playClick();
              onPrevStage();
            }}
            title="Назад"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#EAF4FF] text-[#172B4D] hover:text-[#007BFF] flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onGoToStage(1)}>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-brand font-black text-xl lg:text-2xl text-[#007BFF] tracking-tight">
                KIBERONE
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD43B] ring-2 ring-amber-300 animate-pulse" />
            </div>
            <span className="text-[11px] lg:text-xs font-semibold text-slate-500 tracking-wide">
              Моя суперсила против кибербуллинга
            </span>
          </div>
        </div>
      </div>

      {/* CENTER: Current Mission Progress Indicators */}
      <div className="hidden md:flex flex-col items-center">
        <div className="flex items-center gap-1.5 mb-1">
          {COURSE_STAGES.map((st) => {
            const isPassed = st.id < currentStage;
            const isCurrent = st.id === currentStage;
            return (
              <button
                key={st.id}
                onClick={() => {
                  sound.playClick();
                  onGoToStage(st.id);
                }}
                title={st.name}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isCurrent
                    ? 'w-7 h-3 bg-[#007BFF] ring-2 ring-blue-300 ring-offset-1'
                    : isPassed
                    ? 'w-3 h-3 bg-[#FFD43B]'
                    : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            );
          })}
        </div>
        <div className="text-xs font-bold text-[#172B4D] flex items-center gap-1.5">
          <span className="text-[#007BFF]">Этап {currentStage}/{totalStages}:</span>
          <span>{currentStageInfo.name}</span>
        </div>
      </div>

      {/* RIGHT: Team Score Counter & Controls */}
      <div className="flex items-center gap-3">
        {/* Animated Team Score Badge */}
        <div className="relative flex items-center gap-2 bg-[#FFF6D8] border-2 border-[#FFD43B] px-3 py-1.5 rounded-2xl shadow-sm">
          <div className="w-7 h-7 rounded-xl bg-[#FFD43B] text-[#172B4D] flex items-center justify-center font-bold">
            <Trophy size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
              Счёт команды
            </span>
            <span className="font-brand font-black text-base lg:text-lg text-[#172B4D] tabular-nums leading-none">
              {teamScore} <span className="text-xs font-semibold text-amber-700">баллов</span>
            </span>
          </div>

          {/* Score pop bonus badge */}
          {scoreBonusTrigger > 0 && (
            <div className="absolute -bottom-4 right-2 bg-emerald-600 text-white font-black text-xs px-2 py-0.5 rounded-full animate-bounce shadow-md">
              +{scoreBonusTrigger}
            </div>
          )}
        </div>

        {/* Audio Mute */}
        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Включить звук' : 'Выключить звук'}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172B4D] flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
        >
          {isMuted ? <VolumeX size={18} className="text-red-500" /> : <Volume2 size={18} className="text-[#007BFF]" />}
        </button>

        {/* Fullscreen */}
        <button
          onClick={handleToggleFullscreen}
          title={isFullscreen ? 'Обычный режим' : 'На весь экран'}
          className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172B4D] items-center justify-center transition-colors cursor-pointer border border-slate-200"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </header>
  );
};

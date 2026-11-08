import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Volume1, VolumeX, Maximize2, Minimize2, ArrowLeft, Trophy, Music, Disc } from 'lucide-react';
import { COURSE_STAGES } from '../data/courseData';
import { sound } from '../utils/audio';
import { useBackgroundMusic } from '../context/AudioContext';

import logoImg from '../assets/logo.jpg';

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
  const { volume, setVolume, currentTrackName, isPlaying, togglePlay } = useBackgroundMusic();
  const [isAudioPopoverOpen, setIsAudioPopoverOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const lastNonZeroVolumeRef = useRef<number>(0.5);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsAudioPopoverOpen(false);
      }
    };

    if (isAudioPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAudioPopoverOpen]);

  const handleToggleMute = () => {
    sound.playClick();
    if (volume > 0) {
      lastNonZeroVolumeRef.current = volume;
      setVolume(0);
      sound.enabled = false;
    } else {
      const restored = lastNonZeroVolumeRef.current || 0.5;
      setVolume(restored);
      sound.enabled = true;
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value) / 100;
    setVolume(newVol);
    sound.enabled = newVol > 0;
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
          <div className="flex flex-col items-start">
            <img 
              src={logoImg} 
              alt="KIBERONE" 
              className="h-12 sm:h-14 object-contain rounded-md filter drop-shadow-2xs" 
            />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide mt-0.5 text-left">
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

        {/* Audio Volume Button with Popover */}
        <div className="relative" ref={popoverRef}>
          <button
            onClick={() => {
              sound.playClick();
              setIsAudioPopoverOpen((prev) => !prev);
            }}
            title="Настройка громкости музыки"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
              isAudioPopoverOpen
                ? 'bg-[#EAF4FF] border-[#007BFF] text-[#007BFF] ring-2 ring-blue-200'
                : 'bg-slate-100 hover:bg-slate-200 text-[#172B4D] border-slate-200'
            }`}
          >
            {volume === 0 ? (
              <VolumeX size={18} className="text-red-500" />
            ) : volume < 0.4 ? (
              <Volume1 size={18} className="text-[#007BFF]" />
            ) : (
              <Volume2 size={18} className="text-[#007BFF]" />
            )}
          </button>

          {/* Volume Popover Panel */}
          {isAudioPopoverOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Header: Track Title & Playing Status */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 truncate">
                  <Disc size={16} className={`text-[#007BFF] shrink-0 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  <span className="font-brand font-bold text-xs text-[#172B4D] truncate">
                    {currentTrackName}
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#007BFF] border border-blue-200">
                  {isPlaying ? 'Играет' : 'Пауза'}
                </span>
              </div>

              {/* Volume Slider */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <Music size={13} className="text-[#007BFF]" />
                    <span>Громкость:</span>
                  </span>
                  <span className="font-brand font-black text-sm text-[#007BFF] tabular-nums">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    title={volume === 0 ? 'Включить звук' : 'Без звука'}
                    className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {volume === 0 ? <VolumeX size={16} className="text-red-500" /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={Math.round(volume * 100)}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#007BFF]"
                  />
                </div>
              </div>

              {/* Pause / Play button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  togglePlay();
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#EAF4FF] text-[#172B4D] hover:text-[#007BFF] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              >
                <span>{isPlaying ? 'Поставить музыку на паузу' : 'Возобновить музыку'}</span>
              </button>
            </div>
          )}
        </div>

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

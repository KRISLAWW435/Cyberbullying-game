import React, { useState } from 'react';
import { 
  InvestigationCase, 
  INVESTIGATION_CASES 
} from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { CaseModal } from '../components/CaseModal';
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Search,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';

import case1Img from '../assets/cases/case-1-sad-phone.jpg';
import case2Img from '../assets/cases/case-2-laughing-photo.jpg';
import case3Img from '../assets/cases/case-3-arguing-game.jpg';
import case4Img from '../assets/cases/case-4-excluded-group.jpg';
import case5Img from '../assets/cases/case-5-looming-shadow.jpg';
import case6Img from '../assets/cases/case-6-bystander-watching.jpg';

export const CASE_RIDDLE_IMAGES: Record<number, string> = {
  1: case1Img,
  2: case2Img,
  3: case3Img,
  4: case4Img,
  5: case5Img,
  6: case6Img,
};

interface Screen4InvestigationProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
  isDiscussionMode: boolean;
  onToggleDiscussionMode: () => void;
}

export const Screen4Investigation: React.FC<Screen4InvestigationProps> = ({
  onCompleteMission,
  onAddScore,
  isDiscussionMode,
  onToggleDiscussionMode
}) => {
  const [selectedCase, setSelectedCase] = useState<InvestigationCase | null>(null);
  const [solvedCases, setSolvedCases] = useState<number[]>([]);
  const [unlockedPowers, setUnlockedPowers] = useState<string[]>([]);
  const handleOpenCase = (c: InvestigationCase) => {
    sound.playFlip();
    setSelectedCase(c);
  };

  const handleCaseSolved = (caseId: number, superpowerTitle: string) => {
    if (!solvedCases.includes(caseId)) {
      onAddScore(10);
      setSolvedCases((prev) => [...prev, caseId]);
      if (!unlockedPowers.includes(superpowerTitle)) {
        setUnlockedPowers((prev) => [...prev, superpowerTitle]);
      }
    }
  };

  const handleCloseModal = () => {
    sound.playClick();
    setSelectedCase(null);
  };

  const isAllCasesSolved = solvedCases.length === INVESTIGATION_CASES.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center pb-28 mb-10">
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF6D8] border border-[#FFD43B] text-amber-900 font-bold text-xs sm:text-sm mb-3">
        <Sparkles size={16} className="text-amber-600" />
        <span>МИССИЯ №2: РАССЛЕДОВАНИЕ — БУЛЛИНГ ИЛИ КОНФЛИКТ?</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        ИГРОВОЕ ПОЛЕ РАССЛЕДОВАНИЯ
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-semibold text-center max-w-2xl mb-6">
        Внимательно изучите каждую 3D-загадку. Нажмите «Открыть дело», обсудите ситуацию и откройте суперсилу KIBERONE!
      </p>

      {/* 
        ========================================================================
        ЗАДАЧА 4: Улучшенный, контрастный и крупный индикатор прогресса для класса
        ========================================================================
      */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border-3 border-slate-200 p-4 sm:px-6 sm:py-4 mb-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#007BFF] flex items-center justify-center font-bold shrink-0">
            <Search size={22} />
          </div>
          <div className="whitespace-nowrap">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Прогресс расследования:
            </div>
            <div className="font-brand font-black text-lg sm:text-xl text-[#172B4D] whitespace-nowrap">
              <span>Расследовано дел: </span>
              <span className="text-[#007BFF] inline-block">
                {solvedCases.length} из {INVESTIGATION_CASES.length}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Large Contrast Circles */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {INVESTIGATION_CASES.map((c) => {
            const isSolved = solvedCases.includes(c.id);
            return (
              <div
                key={c.id}
                title={`Дело №${c.id}: ${c.title}`}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-brand font-black text-sm sm:text-base transition-all duration-300 ${
                  isSolved
                    ? 'bg-[#388E3C] text-white shadow-md shadow-green-500/30 scale-105 border-2 border-emerald-400'
                    : 'bg-slate-100 text-slate-500 border-2 border-slate-300'
                }`}
              >
                {isSolved ? <Check size={20} strokeWidth={3} /> : c.id}
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        ЗАДАЧА 2: 6 Сюжетных карточек-загадок с большими 3D-иллюстрациями
        ========================================================================
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full mb-10">
        {INVESTIGATION_CASES.map((caseItem) => {
          const isSolved = solvedCases.includes(caseItem.id);
          const riddleImage = CASE_RIDDLE_IMAGES[caseItem.id];

          return (
            <div
              key={caseItem.id}
              onClick={() => handleOpenCase(caseItem)}
              className={`rounded-3xl border-3 p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 group shadow-md hover:shadow-2xl ${
                isSolved
                  ? 'bg-gradient-to-b from-emerald-50/90 to-white border-[#388E3C]'
                  : 'bg-white border-slate-200 hover:border-[#007BFF]'
              }`}
            >
              {/* Top Tag & Status */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3.5 py-1 rounded-full bg-slate-100 font-brand font-black text-xs text-[#172B4D] border border-slate-200">
                  ДЕЛО №{caseItem.id}
                </span>

                {isSolved ? (
                  <span className="flex items-center gap-1 text-xs font-black text-[#388E3C] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle size={15} /> Раскрыто (+10)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-[#007BFF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    <Search size={13} /> Загадка
                  </span>
                )}
              </div>

              {/* Big 3D Riddle Illustration */}
              <div className="w-full flex flex-col items-center my-2">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl bg-slate-50/50 p-2 border border-slate-100 flex items-center justify-center overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={riddleImage}
                    alt={caseItem.title}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Title & Short Prompt */}
                <h3 className="font-brand font-black text-xl text-[#172B4D] text-center mb-1 leading-snug">
                  {caseItem.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 text-center">
                  «Что здесь происходит?»
                </p>
              </div>

              {/* Big Prominent "Открыть дело" Button */}
              <div className="mt-4 pt-2">
                <button
                  type="button"
                  className={`w-full h-14 min-h-[56px] px-4 rounded-2xl font-brand font-black text-base leading-snug flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isSolved
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#007BFF] hover:bg-blue-600 text-white group-hover:shadow-blue-500/30'
                  }`}
                >
                  <Search size={18} className="shrink-0" />
                  <span className="whitespace-nowrap">{isSolved ? 'Посмотреть решение' : 'Открыть дело'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* All Cases Solved Banner & Victory Milestone */}
      {isAllCasesSolved && (
        <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#007BFF] text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-[#FFD43B] animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD43B] text-[#172B4D] flex items-center justify-center shrink-0 shadow-lg">
              <Award size={36} />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-[#FFD43B] uppercase tracking-wider mb-1">
                РАССЛЕДОВАНИЕ ЗАВЕРШЕНО!
              </div>
              <h3 className="font-brand font-black text-2xl sm:text-3xl mb-1.5 leading-tight">
                Все 6 дел успешно раскрыты командой!
              </h3>
              <p className="text-base sm:text-lg text-blue-50 font-semibold leading-relaxed">
                Вы научились замечать признаки травли и отличать её от обычного конфликта. Теперь перейдём к алгоритму действий!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              onCompleteMission();
            }}
            className="h-16 px-8 rounded-2xl bg-[#FFD43B] hover:bg-yellow-400 text-[#172B4D] font-brand font-black text-lg shadow-xl shadow-yellow-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0 border-2 border-white"
          >
            <span>К Миссии №3: «Стоп-кран»</span>
            <ArrowRight size={22} />
          </button>
        </div>
      )}

      {/* Robot Advice */}
      <div className="w-full max-w-2xl my-6">
        <RobotAssistant
          state={isAllCasesSolved ? 'happy' : isDiscussionMode ? 'thinking' : 'warning'}
          size="dialog"
          speechPlacement="right"
          speech={
            isAllCasesSolved
              ? '«Браво! Вся команда проявила детективную чуткость. 6 суперсил уже в вашем арсенале!»'
              : '«Выбирайте любое дело на игровом поле. Обсуждайте всем классом перед тем, как нажать ответ!»'
          }
        />
      </div>

      {/* MODAL WINDOW FOR ACTIVE CASE */}
      {selectedCase && (
        <CaseModal
          selectedCase={selectedCase}
          isAlreadySolved={solvedCases.includes(selectedCase.id)}
          isDiscussionMode={isDiscussionMode}
          onClose={handleCloseModal}
          onToggleDiscussionMode={onToggleDiscussionMode}
          onCaseSolved={handleCaseSolved}
        />
      )}
    </div>
  );
};

export default Screen4Investigation;

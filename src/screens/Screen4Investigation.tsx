import React, { useState } from 'react';
import { 
  InvestigationCase, 
  INVESTIGATION_CASES 
} from '../data/courseData';
import { CaseSceneGraphic } from '../components/CaseSceneGraphic';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  Award, 
  X, 
  HelpCircle,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/audio';

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
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleOpenCase = (c: InvestigationCase) => {
    sound.playFlip();
    setSelectedCase(c);
    setSelectedOptionId(null);
    setShowExplanation(false);

    // Toggle 3D flip card visual
    if (!flippedCards.includes(c.id)) {
      setFlippedCards((prev) => [...prev, c.id]);
    }
  };

  const handleSelectOption = (option: { id: 'A' | 'B' | 'C'; isCorrect: boolean }) => {
    setSelectedOptionId(option.id);
    setShowExplanation(true);

    if (option.isCorrect) {
      sound.playSuccess();
      if (selectedCase && !solvedCases.includes(selectedCase.id)) {
        onAddScore(10);
        setSolvedCases((prev) => [...prev, selectedCase.id]);
        if (!unlockedPowers.includes(selectedCase.superpower.title)) {
          setUnlockedPowers((prev) => [...prev, selectedCase.superpower.title]);
        }
      }
    } else {
      sound.playAlert();
    }
  };

  const handleCloseModal = () => {
    sound.playClick();
    setSelectedCase(null);
    setSelectedOptionId(null);
    setShowExplanation(false);
  };

  const isAllCasesSolved = solvedCases.length === INVESTIGATION_CASES.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF6D8] border border-[#FFD43B] text-amber-900 font-bold text-xs sm:text-sm mb-3">
        <Sparkles size={16} className="text-amber-600" />
        <span>МИССИЯ №2: РАССЛЕДОВАНИЕ — БУЛЛИНГ ИЛИ КОНФЛИКТ?</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        ИГРОВОЕ ПОЛЕ РАССЛЕДОВАНИЯ
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-medium text-center max-w-2xl mb-6">
        Обсудите каждую из 6 ситуаций всем классом. Нажмите на карточку дела, выберите безопасное решение и откройте суперсилу KIBERONE!
      </p>

      {/* Progress pill tracker */}
      <div className="flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 uppercase">Расследовано дел:</span>
        <span className="font-brand font-black text-sm text-[#007BFF]">
          {solvedCases.length} из {INVESTIGATION_CASES.length}
        </span>
        <div className="flex gap-1 ml-2">
          {INVESTIGATION_CASES.map((c) => (
            <span
              key={c.id}
              className={`w-3 h-3 rounded-full ${
                solvedCases.includes(c.id) ? 'bg-[#388E3C]' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 6 Cases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
        {INVESTIGATION_CASES.map((caseItem) => {
          const isSolved = solvedCases.includes(caseItem.id);
          const isFlipped = flippedCards.includes(caseItem.id);

          return (
            <div
              key={caseItem.id}
              onClick={() => handleOpenCase(caseItem)}
              className="perspective-1000 cursor-pointer h-72 group"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div
                  className={`absolute inset-0 backface-hidden p-5 rounded-3xl border-3 flex flex-col justify-between ${
                    isSolved
                      ? 'bg-emerald-50/90 border-[#388E3C]'
                      : 'bg-white border-slate-200 hover:border-[#007BFF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-100 font-brand font-black text-xs text-[#172B4D]">
                      ДЕЛО №{caseItem.id}
                    </span>
                    {isSolved ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#388E3C] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle size={14} /> Раскрыто (+10)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        <HelpCircle size={14} /> Открыть дело
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex flex-col items-center text-center my-auto">
                    <div className="mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {caseItem.superpower.icon === 'shield' ? (
                        <Pixar3DIcon name="shield" size={58} />
                      ) : caseItem.superpower.icon === 'search' ? (
                        <Pixar3DIcon name="lupa" size={58} />
                      ) : (
                        <CyberIcon name={caseItem.superpower.icon} size={48} />
                      )}
                    </div>
                    <h3 className="font-brand font-bold text-lg text-[#172B4D] mb-1 leading-snug">
                      {caseItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {caseItem.shortDesc}
                    </p>
                  </div>

                  {/* Bottom Tap Cue */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#007BFF]">
                    <span>Нажмите, чтобы начать 🔎</span>
                    <RotateCw size={14} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                  </div>
                </div>

                {/* BACK FACE (3D Flip view after solved or opened) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 p-5 rounded-3xl border-3 flex flex-col justify-between ${
                    isSolved
                      ? 'bg-gradient-to-b from-emerald-50 to-white border-[#388E3C]'
                      : 'bg-gradient-to-b from-[#EAF4FF] to-white border-[#007BFF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#172B4D]">
                      ДЕЛО №{caseItem.id} • СУПЕРСИЛА
                    </span>
                    <span className="w-3 h-3 rounded-full bg-[#FFD43B]" />
                  </div>

                  <div className="flex flex-col items-center text-center my-auto">
                    <div className="mb-2 flex items-center justify-center">
                      {caseItem.superpower.icon === 'shield' ? (
                        <Pixar3DIcon name="shield" size={46} />
                      ) : caseItem.superpower.icon === 'search' ? (
                        <Pixar3DIcon name="lupa" size={46} />
                      ) : (
                        <CyberIcon name={caseItem.superpower.icon} size={38} />
                      )}
                    </div>
                    <h4 className="font-brand font-black text-sm text-[#007BFF] mb-1">
                      {caseItem.superpower.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 font-semibold italic">
                      {caseItem.superpower.description}
                    </p>
                  </div>

                  <div className="text-center text-xs font-bold text-slate-700 bg-white/80 py-1.5 rounded-xl border border-slate-200">
                    {isSolved ? '✅ Дело раскрыто' : '🔎 Нажмите для расследования'}
                  </div>
                </div>
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
              <div className="text-xs font-black text-[#FFD43B] uppercase tracking-wider mb-0.5">
                РАССЛЕДОВАНИЕ ЗАВЕРШЕНО!
              </div>
              <h3 className="font-brand font-black text-xl sm:text-2xl mb-1">
                Все 6 дел успешно раскрыты командой!
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
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

      {/* Robot Advice - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
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
        <div className="fixed inset-0 z-50 bg-[#172B4D]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border-4 border-[#007BFF] relative my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Header of Modal */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EAF4FF] text-[#007BFF] font-brand font-black text-xs">
                  ДЕЛО №{selectedCase.id}
                </span>
                <h3 className="font-brand font-black text-xl text-[#172B4D]">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Case Visual Scene Graphic with 3D Pixar Smartphone */}
            <div className="mb-4">
              <CaseSceneGraphic type={selectedCase.visualType} />
            </div>

            {/* Scenario Description */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
              <span className="text-xs font-bold text-[#007BFF] uppercase tracking-wider block mb-1">
                Что произошло:
              </span>
              <p className="text-sm sm:text-base font-semibold text-[#172B4D] leading-relaxed">
                {selectedCase.scenarioText}
              </p>
            </div>

            {/* Question */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-brand font-black text-base sm:text-lg text-[#172B4D]">
                  ❓ {selectedCase.question}
                </h4>
                {/* Mentor Mode Toggle */}
                <button
                  onClick={onToggleDiscussionMode}
                  className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>{isDiscussionMode ? 'Открыть варианты' : 'Скрыть для дискуссии'}</span>
                </button>
              </div>

              {/* Discussion Mode Screen / Options */}
              {isDiscussionMode && !selectedOptionId ? (
                <div className="p-6 bg-amber-50 border-2 border-amber-300 rounded-2xl text-center">
                  <div className="text-lg font-bold text-amber-900 mb-1">
                    🗣️ Время обсуждения с наставником!
                  </div>
                  <p className="text-sm text-amber-800 font-medium mb-4">
                    Ребята, выскажите свои мнения устно: как бы вы поступили в этой ситуации?
                  </p>
                  <button
                    onClick={onToggleDiscussionMode}
                    className="px-6 py-2.5 bg-[#007BFF] text-white font-bold text-sm rounded-xl cursor-pointer hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Показать 3 варианта ответа
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedCase.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrect = opt.isCorrect;

                    let btnStyle = 'bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50';
                    if (showExplanation) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-300';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-50 border-2 border-red-400 shadow-xs';
                      } else {
                        btnStyle = 'bg-slate-50 border-2 border-slate-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        disabled={showExplanation}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                      >
                        <span
                          className={`w-8 h-8 rounded-xl font-brand font-black text-sm flex items-center justify-center shrink-0 ${
                            showExplanation && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : showExplanation && isSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-slate-100 text-[#172B4D]'
                          }`}
                        >
                          {opt.id}
                        </span>

                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#172B4D] leading-snug">
                            {opt.text}
                          </p>

                          {/* Specific feedback text if selected or solved */}
                          {showExplanation && (isSelected || isCorrect) && (
                            <p
                              className={`text-xs mt-1.5 font-medium ${
                                isCorrect ? 'text-emerald-700 font-bold' : 'text-red-600'
                              }`}
                            >
                              {opt.feedback}
                            </p>
                          )}
                        </div>

                        {showExplanation && isCorrect && (
                          <CheckCircle className="text-emerald-600 shrink-0 mt-1" size={22} />
                        )}
                        {showExplanation && isSelected && !isCorrect && (
                          <XCircle className="text-red-500 shrink-0 mt-1" size={22} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Explanation & Superpower Box */}
            {showExplanation && (
              <div className="space-y-3 mt-4 animate-in fade-in duration-300">
                <div className="bg-[#EAF4FF] border border-[#007BFF]/30 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#007BFF] uppercase tracking-wider mb-1">
                    <ShieldCheck size={16} /> Разбор ситуации от наставника:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedCase.explanation}
                  </p>
                </div>

                {/* Superpower Award Box */}
                <div className="bg-[#FFF6D8] border-2 border-[#FFD43B] rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0">
                    {selectedCase.superpower.icon === 'shield' ? (
                      <Pixar3DIcon name="shield" size={42} />
                    ) : selectedCase.superpower.icon === 'search' ? (
                      <Pixar3DIcon name="lupa" size={42} />
                    ) : (
                      <CyberIcon name={selectedCase.superpower.icon} size={36} />
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                      Открыта суперсила от KIBERONE:
                    </div>
                    <div className="font-brand font-black text-base text-[#172B4D]">
                      {selectedCase.superpower.title}
                    </div>
                    <p className="text-xs text-amber-950 font-semibold italic">
                      {selectedCase.superpower.description}
                    </p>
                  </div>
                </div>

                {/* Modal close / next button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="h-12 px-6 rounded-xl bg-[#007BFF] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    Вернуться к игровому полю
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

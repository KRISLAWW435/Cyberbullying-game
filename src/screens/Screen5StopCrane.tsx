import React, { useState } from 'react';
import { STOP_CRANE_STEPS } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen5StopCraneProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

export const Screen5StopCrane: React.FC<Screen5StopCraneProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  // Scrambled state for the minigame
  // Initial scrambled order: [3, 1, 5, 2, 4]
  const [currentOrder, setCurrentOrder] = useState<number[]>([3, 1, 5, 2, 4]);
  const [selectedStepId, setSelectedStepId] = useState<number | null>(1);
  const [isAssemblyVerified, setIsAssemblyVerified] = useState(false);
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Check if current order is strictly 1, 2, 3, 4, 5
  const isCorrectOrder = currentOrder.every((val, idx) => val === idx + 1);

  // Move item up
  const moveUp = (index: number) => {
    if (index === 0) return;
    sound.playClick();
    const next = [...currentOrder];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setCurrentOrder(next);
    setIsAssemblyVerified(false);
    setFeedbackMessage(null);
  };

  // Move item down
  const moveDown = (index: number) => {
    if (index === currentOrder.length - 1) return;
    sound.playClick();
    const next = [...currentOrder];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setCurrentOrder(next);
    setIsAssemblyVerified(false);
    setFeedbackMessage(null);
  };

  const handleVerifyAssembly = () => {
    if (isCorrectOrder) {
      sound.playPowerUp();
      setIsAssemblyVerified(true);
      setFeedbackMessage('🎉 Ура! Все 5 шагов Стоп-крана собраны идеально в правильном порядке!');
      if (!hasAwardedPoints) {
        onAddScore(25);
        setHasAwardedPoints(true);
      }
    } else {
      sound.playAlert();
      setIsAssemblyVerified(false);
      setFeedbackMessage('🔍 Подсказка: Самый первый шаг — всегда «СТОП — не отвечай агрессией», затем собираем улики, блокируем и зовём взрослого!');
    }
  };

  const handleResetOrder = () => {
    sound.playClick();
    setCurrentOrder([3, 1, 5, 2, 4]);
    setIsAssemblyVerified(false);
    setFeedbackMessage(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Stage Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-300 text-red-600 font-bold text-xs sm:text-sm mb-3">
        <ShieldAlert size={16} />
        <span>МИССИЯ №3: СУПЕРСИЛА «СТОП-КРАН»</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        ЕСЛИ ТЕБЯ ОБИЖАЮТ В ИНТЕРНЕТЕ — <br />
        <span className="text-red-600">ВКЛЮЧИ СТОП-КРАН!</span>
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-medium text-center max-w-2xl mb-8">
        Запомните 5 шагов безопасного алгоритма защиты. Нажмите на значки, чтобы изучить каждый шаг!
      </p>

      {/* 5 Steps Interactive Visual Scheme */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full mb-8">
        {STOP_CRANE_STEPS.map((step) => {
          const isSelected = selectedStepId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                sound.playClick();
                setSelectedStepId(step.id);
              }}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center text-center shadow-md ${
                isSelected
                  ? 'bg-[#FFF6D8] border-[#FFD43B] ring-4 ring-amber-300 scale-105'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#172B4D] text-white font-brand font-black text-xs flex items-center justify-center mb-2 shadow-xs">
                {step.stepNumber}
              </div>
              <div className="h-16 flex items-center justify-center mb-2">
                {step.id === 3 ? (
                  <Pixar3DIcon name="shield" size={50} />
                ) : (
                  <CyberIcon name={step.icon} size={42} />
                )}
              </div>
              <h4 className="font-brand font-black text-sm text-[#172B4D] mb-1">
                {step.shortTitle}
              </h4>
              <p className="text-[11px] text-slate-500 font-semibold leading-tight">
                {step.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Card */}
      {selectedStepId && (
        <div className="w-full bg-[#EAF4FF] border-2 border-[#007BFF]/30 rounded-3xl p-5 mb-8 shadow-sm animate-in fade-in duration-200">
          {(() => {
            const step = STOP_CRANE_STEPS.find((s) => s.id === selectedStepId);
            if (!step) return null;
            return (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="shrink-0 flex items-center justify-center">
                  {step.id === 3 ? (
                    <Pixar3DIcon name="shield" size={54} />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                      <CyberIcon name={step.icon} size={42} />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-brand font-black text-lg text-[#172B4D] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* MINIGAME: "СОБЕРИ СТОП-КРАН" */}
      <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Sparkles size={14} /> Интерактивная игра
            </div>
            <h3 className="font-brand font-black text-xl text-[#172B4D]">
              МИНИ-ИГРА: «СОБЕРИ СТОП-КРАН»
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Карточки шагов перемешались! Перемещайте карточки стрелочками вверх/вниз, чтобы выстроить правильный порядок от 1 до 5.
            </p>
          </div>
          <button
            onClick={handleResetOrder}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
          >
            <RotateCcw size={14} /> Сбросить порядок
          </button>
        </div>

        {/* Scrambled List Slots */}
        <div className="space-y-2.5 mb-6">
          {currentOrder.map((stepId, index) => {
            const step = STOP_CRANE_STEPS.find((s) => s.id === stepId)!;
            const isAtCorrectSlot = step.stepNumber === index + 1;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                  isAssemblyVerified && isAtCorrectSlot
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                    : isAtCorrectSlot
                    ? 'bg-blue-50/70 border-blue-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                {/* Slot index indicator */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl font-brand font-black text-sm flex items-center justify-center shrink-0 ${
                      isAtCorrectSlot ? 'bg-[#007BFF] text-white' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    #{index + 1}
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
                    {step.id === 3 ? (
                      <Pixar3DIcon name="shield" size={32} />
                    ) : (
                      <CyberIcon name={step.icon} size={28} />
                    )}
                  </div>

                  <div>
                    <div className="font-brand font-bold text-sm text-[#172B4D]">
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-500 font-medium hidden sm:block">
                      {step.subtitle}
                    </div>
                  </div>
                </div>

                {/* Up / Down Move Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={index === 0}
                    onClick={() => moveUp(index)}
                    title="Вверх"
                    className="w-10 h-10 rounded-xl bg-white hover:bg-blue-50 disabled:opacity-30 disabled:pointer-events-none border border-slate-200 text-[#172B4D] hover:text-[#007BFF] flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                  >
                    <ChevronUp size={20} />
                  </button>
                  <button
                    disabled={index === currentOrder.length - 1}
                    onClick={() => moveDown(index)}
                    title="Вниз"
                    className="w-10 h-10 rounded-xl bg-white hover:bg-blue-50 disabled:opacity-30 disabled:pointer-events-none border border-slate-200 text-[#172B4D] hover:text-[#007BFF] flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Check button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {feedbackMessage ? (
            <div
              className={`text-xs sm:text-sm font-bold p-3 rounded-xl flex-1 ${
                isAssemblyVerified
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border border-amber-300'
              }`}
            >
              {feedbackMessage}
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-semibold">
              Расставьте все 5 шагов по порядку и нажмите «Проверить сборку Стоп-крана».
            </div>
          )}

          <button
            onClick={handleVerifyAssembly}
            className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#007BFF] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-brand font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-transform active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 border-2 border-yellow-300"
          >
            <CheckCircle2 size={20} />
            <span>Проверить сборку (+25 баллов)</span>
          </button>
        </div>

        {/* Shield Assembly Celebration Animation */}
        {isAssemblyVerified && (
          <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-50 border-4 border-[#FFD43B] flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="mb-3 flex items-center justify-center">
              <Pixar3DIcon name="shield" size={96} />
            </div>
            <h4 className="font-brand font-black text-2xl text-[#172B4D] mb-1">
              🛡️ СТОП-КРАН СОБРАН!
            </h4>
            <p className="text-sm font-semibold text-amber-950 max-w-md">
              Теперь у каждого участника команды есть надёжный щит защиты: не отвечать злом на зло, сохранять факты, блокировать и звать взрослых!
            </p>
          </div>
        )}
      </div>

      {/* Robot Advice - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
        <RobotAssistant
          state={isAssemblyVerified ? 'happy' : 'warning'}
          size="dialog"
          speechPlacement="right"
          speech={
            isAssemblyVerified
              ? '«Великолепно! Стоп-кран активирован. Запомните этот алгоритм — он защитит вас в любой непонятной ситуации в сети!»'
              : '«Помните: сначала останавливаемся (СТОП), сохраняем скриншоты, ставим блок и сразу рассказываем родителям или наставнику!»'
          }
        />
      </div>

      {/* CTA To Mission 4 */}
      <button
        onClick={() => {
          sound.playSuccess();
          onCompleteMission();
        }}
        className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
      >
        <span>Перейти к Миссии №4: «Сила наблюдателя»</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

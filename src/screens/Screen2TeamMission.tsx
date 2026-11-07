import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { ArrowRight, ThumbsUp, Sparkles, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen2TeamMissionProps {
  onStartMission1: () => void;
  onAddScore: (points: number) => void;
}

export const Screen2TeamMission: React.FC<Screen2TeamMissionProps> = ({
  onStartMission1,
  onAddScore
}) => {
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  // Simplified and high-contrast texts for children aged 7-12
  const pillars = [
    {
      id: 1,
      iconType: 'lupa' as const,
      title: 'Распознавать опасность',
      desc: 'Замечай тревожные сигналы в чатах и играх до того, как они навредят.',
      color: '#007BFF',
      bg: 'bg-blue-50/80 border-blue-200 hover:border-[#007BFF]',
      delay: 0
    },
    {
      id: 2,
      iconType: 'shield' as const,
      title: 'Защищать себя',
      desc: 'Умей нажимать «Стоп-кран» и смело зови взрослого на помощь.',
      color: '#FFD43B',
      bg: 'bg-amber-50/80 border-amber-300 hover:border-amber-400',
      delay: 0.35
    },
    {
      id: 3,
      iconType: 'heart' as const,
      title: 'Помогать другим',
      desc: 'Не будь молчаливым зрителем. Поддержи того, кому больно.',
      color: '#388E3C',
      bg: 'bg-emerald-50/80 border-emerald-200 hover:border-emerald-400',
      delay: 0.7
    }
  ];

  const handleVoteYes = () => {
    if (!answeredQuestion) {
      sound.playSuccess();
      onAddScore(10);
      setAnsweredQuestion(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* 
        ========================================================================
        1. MAIN TITLE LOCKUP (Placed at the very top as requested)
        ========================================================================
      */}
      <h2
        style={{ lineHeight: 1.25 }}
        className="font-brand font-black text-2xl sm:text-4xl lg:text-5xl text-[#172B4D] text-center mb-6 leading-[1.25]"
      >
        <span>СЕГОДНЯ МЫ СТАНЕМ</span>
        <span className="block mt-1 sm:mt-2 text-[#007BFF]">КОМАНДОЙ КИБЕРЗАЩИТНИКОВ!</span>
      </h2>

      {/* 
        ========================================================================
        2. MENTOR PROMPT CALLOUT (Placed below main title with mt-6 / mb-8)
        ========================================================================
      */}
      <div className="w-full bg-[#EAF4FF] border-2 border-[#007BFF]/30 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#007BFF] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
            K1
          </div>
          <div>
            <div className="text-xs font-bold text-[#007BFF] uppercase tracking-wider mb-0.5">
              Вопрос наставника к классу
            </div>
            <p className="text-sm md:text-base font-semibold text-[#172B4D]">
              «Как думаете, что такое суперсила в интернете? Быстро печатать? Знать все читы в играх? Или нечто большее?»
            </p>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        3. THREE PILLARS CARDS (Enlarged floating 3D icons, large text-lg fonts)
        ========================================================================
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-10">
        {pillars.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              sound.playClick();
              setActiveTab(p.id);
            }}
            className={`p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1.5 ${
              p.bg
            } ${activeTab === p.id ? 'ring-4 ring-[#FFD43B] scale-105' : ''}`}
          >
            {/* 
              Enlarged 3D icon (~1.5–2x size: w-28 h-28 / size 112)
              Floating animation with staggered delay
            */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: 'easeInOut',
                delay: p.delay,
              }}
              className="mb-4 flex items-center justify-center w-28 h-28"
            >
              <Pixar3DIcon name={p.iconType} size={112} animate={false} />
            </motion.div>

            <h3 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] mb-3">
              {p.title}
            </h3>

            {/* Shortened, clear, high-contrast text in text-lg */}
            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 
        ========================================================================
        4. INTERACTIVE VOTING BLOCK (Dialogue Style)
        Robot stands OUTSIDE the white card on the left (~160-200px)
        Speech/Voting Box is on the right with a tail pointing to the robot
        ========================================================================
      */}
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        {/* Robot standing outside on the left */}
        <div className="shrink-0 flex flex-col items-center justify-center">
          <RobotAssistant
            state={answeredQuestion ? 'happy' : 'thinking'}
            size="dialog"
          />
        </div>

        {/* Speech Bubble & Interactive Voting on the right */}
        <div className="relative flex-1 w-full bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg text-left">
          {/* Bubble Tail pointing to robot on the left */}
          <div className="hidden md:block absolute -left-2.5 top-12 w-5 h-5 bg-white border-b-2 border-l-2 border-slate-200 rotate-45" />

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
            <Sparkles size={16} />
            <span>Интерактивное голосование</span>
          </div>

          <h3 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] mb-4 leading-snug">
            «А может ли суперсилой быть умение вовремя поддержать друга?»
          </h3>

          {/* Robot's Voice Quote with text-lg */}
          <div className="bg-[#EAF4FF] border border-[#007BFF]/30 rounded-2xl p-4 sm:p-5 mb-6 text-left">
            <p className="text-base sm:text-lg md:text-xl font-bold text-[#172B4D] leading-relaxed">
              {answeredQuestion
                ? '«Именно! Самые крутые цифровые суперсилы — это внимательность, смелость попросить помощи и искреннее уважение к другим людям!»'
                : '«Ребята, ответьте на важный вопрос: может ли суперсилой быть умение вовремя поддержать друга в интернете?»'}
            </p>
          </div>

          {/* Voting Action Button - spacious, comfortable touch target, no cramped text */}
          {!answeredQuestion ? (
            <div className="flex justify-start">
              <button
                onClick={handleVoteYes}
                className="py-4 px-8 rounded-2xl bg-gradient-to-r from-[#388E3C] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-base sm:text-lg shadow-lg shadow-emerald-600/30 transition-transform active:scale-95 cursor-pointer inline-flex items-center justify-center gap-3 text-center"
              >
                <ThumbsUp size={22} className="shrink-0" />
                <span className="leading-snug">Да, это настоящая суперсила! (+10 баллов)</span>
              </button>
            </div>
          ) : (
            <div className="p-4 sm:p-5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl inline-flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Check size={22} />
              </div>
              <div className="text-base sm:text-lg font-bold text-emerald-800">
                Класс единогласно согласился! Команда заработала первые +10 баллов!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 
        ========================================================================
        5. CTA TO MISSION 1
        ========================================================================
      */}
      <button
        onClick={() => {
          sound.playSuccess();
          onStartMission1();
        }}
        className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg sm:text-xl shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
      >
        <span>Начать первую миссию: «Детективы»</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

export default Screen2TeamMission;

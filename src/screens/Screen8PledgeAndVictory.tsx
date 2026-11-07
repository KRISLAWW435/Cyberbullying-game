import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TEAM_PLEDGE_RULES, SUPERPOWER_CHOICES } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Printer, 
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen8PledgeAndVictoryProps {
  teamScore: number;
  teamPowersCount: Record<string, number>;
  onResetSession: () => void;
}

export const Screen8PledgeAndVictory: React.FC<Screen8PledgeAndVictoryProps> = ({
  teamScore,
  teamPowersCount,
  onResetSession
}) => {
  const [pledgePledged, setPledgePledged] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const triggerConfetti = () => {
    sound.playVictoryFanfare();
    setPledgePledged(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#007BFF', '#FFD43B', '#388E3C']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FFD43B', '#FFA000', '#00E5FF']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#007BFF', '#FF4B72', '#FFFFFF']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const handlePrintCertificate = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#007BFF]/30 text-[#007BFF] font-bold text-xs sm:text-sm mb-3">
        <Sparkles size={16} className="text-[#FFD43B]" />
        <span>ФИНАЛ: ТОРЖЕСТВЕННАЯ КЛЯТВА И ПОБЕДА</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-5xl text-[#172B4D] text-center mb-3">
        НАША КОМАНДА — <br />
        <span className="text-[#007BFF]">ПРОТИВ КИБЕРБУЛЛИНГА!</span>
      </h2>

      {/* Grand Golden Shield with 6 Superpowers */}
      <div className="w-full bg-gradient-to-b from-[#FFF6D8] via-white to-[#EAF4FF] border-4 border-[#FFD43B] rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow */}
        <div className="w-28 h-28 rounded-full bg-[#FFD43B]/30 blur-2xl absolute -top-8 -left-8" />
        <div className="w-28 h-28 rounded-full bg-[#007BFF]/20 blur-2xl absolute -bottom-8 -right-8" />

        <div className="relative mb-6">
          <Pixar3DIcon name="shield" size={96} />
        </div>

        {/* 6 Superpower Badges Orbiting / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mb-6">
          {SUPERPOWER_CHOICES.map((pow) => (
            <div
              key={pow.id}
              className="p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-2">
                {pow.id === 'shield_calm' ? (
                  <Pixar3DIcon name="shield" size={34} />
                ) : pow.id === 'detective_facts' ? (
                  <Pixar3DIcon name="lupa" size={34} />
                ) : pow.id === 'support_friend' ? (
                  <Pixar3DIcon name="heart" size={34} />
                ) : (
                  <CyberIcon name={pow.icon} size={28} />
                )}
              </div>
              <span className="font-brand font-bold text-xs text-[#172B4D] line-clamp-1">
                {pow.title}
              </span>
              <span className="text-[10px] text-amber-700 font-bold mt-1">
                в команде: {teamPowersCount[pow.id] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* The 6 Pledge Promises */}
        <div className="w-full bg-white rounded-2xl border-2 border-slate-200 p-5 sm:p-6 text-left mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={22} className="text-[#007BFF]" />
            <h3 className="font-brand font-black text-lg text-[#172B4D]">
              ОБЩЕЕ ОБЕЩАНИЕ КОМАНДЫ ЦИФРОВЫХ ЗАЩИТНИКОВ:
            </h3>
          </div>
          <ul className="space-y-2.5">
            {TEAM_PLEDGE_RULES.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </span>
                <span className="leading-snug">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Grand CTA Button */}
        {!pledgePledged ? (
          <button
            onClick={triggerConfetti}
            className="group h-16 sm:h-20 px-8 sm:px-14 rounded-3xl bg-gradient-to-r from-[#007BFF] via-[#0056b3] to-[#FFD43B] hover:from-[#0066dd] hover:to-[#FFA000] text-white font-brand font-black text-xl sm:text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-4 border-white"
          >
            <Sparkles size={28} className="text-[#FFD43B] group-hover:rotate-45 transition-transform" />
            <span>«Мы — команда киберзащитников!»</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={triggerConfetti}
              className="h-14 px-8 rounded-2xl bg-[#FFD43B] hover:bg-yellow-400 text-[#172B4D] font-brand font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2 border-2 border-white"
            >
              <Sparkles size={20} />
              <span>Запустить салют ещё раз!</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setShowCertificate(!showCertificate);
              }}
              className="h-14 px-8 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Award size={20} />
              <span>{showCertificate ? 'Скрыть сертификат' : 'Открыть сертификат команды'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Certificate Modal / View */}
      {showCertificate && (
        <div className="w-full bg-white border-4 border-[#FFD43B] rounded-3xl p-6 sm:p-10 shadow-2xl mb-8 text-center print:border-none print:shadow-none animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-brand font-black text-2xl text-[#007BFF]">KIBERONE</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD43B]" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Официальный сертификат занятия
            </span>
          </div>

          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFF6D8] border-2 border-[#FFD43B] flex items-center justify-center mb-4 shadow-sm">
            <Trophy size={44} className="text-amber-600" />
          </div>

          <div className="text-xs font-bold text-[#007BFF] uppercase tracking-widest mb-1">
            СЕРТИФИКАТ КИБЕРЗАЩИТНИКОВ
          </div>
          <h3 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] mb-3">
            КОМАНДА ЦИФРОВЫХ ЗАЩИТНИКОВ
          </h3>
          <p className="text-sm sm:text-base text-slate-600 font-semibold max-w-xl mx-auto mb-6 leading-relaxed">
            Настоящим подтверждается, что участники занятия успешно прошли все 4 миссии расследования, овладели алгоритмом «Стоп-кран» и приняли кодекс защиты от кибербуллинга.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#EAF4FF] px-6 py-3 rounded-2xl border border-blue-200 mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase">Итоговый счёт команды:</span>
            <span className="font-brand font-black text-2xl text-[#007BFF]">
              {teamScore} баллов
            </span>
          </div>

          <div className="flex justify-center gap-4 print:hidden">
            <button
              onClick={handlePrintCertificate}
              className="h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <Printer size={18} />
              <span>Распечатать сертификат</span>
            </button>
          </div>
        </div>
      )}

      {/* Final Mentor Speech Box */}
      <div className="w-full bg-[#EAF4FF] border-2 border-[#007BFF]/30 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#007BFF] text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
            K1
          </div>
          <div>
            <div className="text-xs font-bold text-[#007BFF] uppercase tracking-wider mb-1">
              Финальное напутствие наставника KIBERONE:
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#172B4D] leading-relaxed italic">
              «Вы не всегда можете контролировать то, что пишут другие люди в интернете. Но вы всегда можете выбирать, что делать самим: поддержать травлю, пройти мимо или помочь. И этот осознанный выбор гораздо важнее любого лайка!»
            </p>
          </div>
        </div>
      </div>

      {/* 3D Pixar Robot Victory / Support State - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-8">
        <RobotAssistant
          state={pledgePledged ? 'happy' : 'support'}
          size="dialog"
          speechPlacement="right"
          speech="«Поздравляю! Вы стали настоящими цифровыми защитниками KIBERONE. Всегда помните о своих суперсилах и делайте интернет безопасным для всех!»"
        />
      </div>

      {/* Reset Session for Next Class */}
      <div className="pt-4 border-t border-slate-200 w-full flex justify-center">
        <button
          onClick={() => {
            sound.playClick();
            onResetSession();
          }}
          className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 cursor-pointer transition-colors"
        >
          <RotateCcw size={14} />
          <span>Сбросить занятие перед следующей группой</span>
        </button>
      </div>
    </div>
  );
};

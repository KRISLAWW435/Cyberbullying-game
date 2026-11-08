import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TEAM_PLEDGE_RULES } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon, Pixar3DIconName } from '../components/Pixar3DIcon';
import { FloatingBackground, FloatingIconItem } from '../components/FloatingBackground';
import { 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw,
  Award,
  Star,
  Shield,
  PartyPopper
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen8PledgeAndVictoryProps {
  teamScore: number;
  teamPowersCount: Record<string, number>;
  onResetSession: () => void;
}

interface SuperpowerBadgeData {
  id: string;
  title: string;
  icon: Pixar3DIconName;
  border: string;
  bg: string;
  text: string;
}

const MEMO_SUPERPOWERS: SuperpowerBadgeData[] = [
  { id: 'shield_calm', title: 'Щит спокойствия', icon: 'shield', border: 'border-[#007BFF]', bg: 'bg-blue-50', text: 'text-[#007BFF]' },
  { id: 'detective_facts', title: 'Детектив фактов', icon: 'lupa', border: 'border-[#FFD43B]', bg: 'bg-amber-50', text: 'text-amber-800' },
  { id: 'detective_screenshots', title: 'Детектив скриншотов', icon: 'camera', border: 'border-[#D32F2F]', bg: 'bg-red-50', text: 'text-[#D32F2F]' },
  { id: 'security_master', title: 'Мастер безопасности', icon: 'lock', border: 'border-[#8B5CF6]', bg: 'bg-purple-50', text: 'text-[#8B5CF6]' },
  { id: 'support_force', title: 'Сила поддержки', icon: 'heart', border: 'border-[#388E3C]', bg: 'bg-emerald-50', text: 'text-[#388E3C]' },
  { id: 'ask_help', title: 'Смелость попросить помощи', icon: 'chat', border: 'border-[#00BCD4]', bg: 'bg-cyan-50', text: 'text-[#00838F]' },
];

const SCREEN8_FLOATING_ITEMS: FloatingIconItem[] = [
  { icon: Star, color: '#FFD43B', size: 56, top: '40px', left: '16px', delay: 0, duration: 4.2 },
  { icon: Trophy, color: '#007BFF', size: 50, top: '80px', right: '20px', delay: 0.7, duration: 3.9 },
  { icon: PartyPopper, color: '#FFD43B', size: 52, top: '30%', left: '12px', delay: 1.4, duration: 4.5 },
  { icon: Award, color: '#388E3C', size: 54, top: '35%', right: '18px', delay: 1.0, duration: 4.1 },
  { icon: Shield, color: '#007BFF', size: 58, top: '65%', left: '14px', delay: 1.8, duration: 4.3 },
  { icon: Star, color: '#388E3C', size: 48, top: '70%', right: '22px', delay: 0.5, duration: 3.7 },
  { icon: Trophy, color: '#FFD43B', size: 46, bottom: '60px', left: '30px', delay: 2.2, duration: 4.6 },
  { icon: PartyPopper, color: '#007BFF', size: 50, bottom: '50px', right: '30px', delay: 1.2, duration: 4.0 },
];

export const Screen8PledgeAndVictory: React.FC<Screen8PledgeAndVictoryProps> = ({
  teamScore,
  teamPowersCount,
  onResetSession
}) => {
  const [pledgePledged, setPledgePledged] = useState(false);

  const triggerConfetti = () => {
    sound.playVictoryFanfare();
    setPledgePledged(true);

    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      zIndex: 9999,
      disableForReducedMotion: false
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 28,
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
      scalar: 0.85
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

  return (
    <div className="relative min-h-[calc(100vh-100px)] max-w-5xl mx-auto px-4 py-6 flex flex-col items-center overflow-hidden">
      {/* Animated Floating Background Icons (KIBERONE palette) */}
      <FloatingBackground items={SCREEN8_FLOATING_ITEMS} />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Top Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#007BFF]/30 text-[#007BFF] font-bold text-xs sm:text-sm mb-3 shadow-2xs">
          <Sparkles size={16} className="text-[#FFD43B]" />
          <span>ФИНАЛ: ТОРЖЕСТВЕННАЯ КЛЯТВА И ПОБЕДА</span>
        </div>

        <h2 className="font-brand font-black text-2xl sm:text-5xl text-[#172B4D] text-center mb-6">
          НАША КОМАНДА — <br />
          <span className="text-[#007BFF]">ПРОТИВ КИБЕРБУЛЛИНГА!</span>
        </h2>

        {/* 1. Large Screen-Pledge Box (Large font for kids in the back rows) */}
        <div className="w-full bg-white rounded-3xl border-3 border-slate-200 p-6 sm:p-8 md:p-10 text-left mb-8 shadow-xl relative overflow-hidden">
          {/* Glow corner */}
          <div className="w-40 h-40 rounded-full bg-blue-100/60 blur-3xl absolute -top-10 -right-10 pointer-events-none" />

          {/* Heading */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
            <ShieldCheck size={32} className="text-[#007BFF] shrink-0" />
            <h3 className="font-brand font-black text-xl sm:text-2xl md:text-3xl text-[#172B4D]">
              ОБЩЕЕ ОБЕЩАНИЕ КОМАНДЫ ЦИФРОВЫХ ЗАЩИТНИКОВ:
            </h3>
          </div>

          {/* 6 Large Rules */}
          <ul className="space-y-4 sm:space-y-5 mb-8">
            {TEAM_PLEDGE_RULES.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 text-base sm:text-lg md:text-xl font-bold text-[#172B4D] leading-relaxed"
              >
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-black text-sm sm:text-base shadow-xs">
                  ✓
                </span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>

          {/* Grand CTA Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={triggerConfetti}
              className="group h-16 sm:h-20 px-8 sm:px-14 rounded-3xl bg-gradient-to-r from-[#007BFF] via-[#0056b3] to-[#FFD43B] hover:from-[#0066dd] hover:to-[#FFA000] text-white font-brand font-black text-xl sm:text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 border-4 border-white"
            >
              <Sparkles size={28} className="text-[#FFD43B] group-hover:rotate-45 transition-transform" />
              <span>{pledgePledged ? '🎉 Запустить салют победы ещё раз!' : '«Мы — команда киберзащитников!»'}</span>
            </button>
          </div>
        </div>

        {/* 2. Digital Memo of the Cyberdefender (Памятка киберзащитника) */}
        <div className="w-full bg-gradient-to-b from-[#FFFDF0] via-white to-[#EAF4FF] border-4 border-[#FFD43B] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-8 text-center relative overflow-hidden">
          {/* Glow Orbs */}
          <div className="w-32 h-32 rounded-full bg-[#FFD43B]/30 blur-2xl absolute -top-8 -left-8 pointer-events-none" />
          <div className="w-32 h-32 rounded-full bg-[#007BFF]/20 blur-2xl absolute -bottom-8 -right-8 pointer-events-none" />

          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FFD43B] shadow-2xs mb-4">
            <span className="font-brand font-black text-xs text-[#007BFF]">KIBERONE</span>
            <span className="w-2 h-2 rounded-full bg-[#FFD43B]" />
            <span className="text-xs font-bold text-slate-600 uppercase">Официальный диплом занятия</span>
          </div>

          {/* Title */}
          <h3 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] mb-2 tracking-wide">
            ПАМЯТКА КИБЕРЗАЩИТНИКА
          </h3>

          {/* Congratulation */}
          <p className="text-base sm:text-lg font-semibold text-slate-600 max-w-xl mx-auto mb-5 leading-relaxed">
            Вы прошли все миссии и готовы защищать себя и друзей в сети!
          </p>

          {/* Team Total Score Block */}
          <div className="inline-flex items-center gap-3 bg-white px-6 sm:px-8 py-3 rounded-2xl border-2 border-[#FFD43B] shadow-md mb-8">
            <Trophy size={28} className="text-amber-500" />
            <span className="text-sm font-bold text-slate-600 uppercase">Наш общий результат:</span>
            <span className="font-brand font-black text-2xl sm:text-3xl text-[#007BFF] tabular-nums">
              {teamScore} баллов
            </span>
          </div>

          {/* 6 Superpower Badges Circles */}
          <div className="w-full pt-4 border-t border-slate-200/80">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">
              СУПЕРСИЛЫ, КОТОРЫЕ СОБРАЛА НАША КОМАНДА:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {MEMO_SUPERPOWERS.map((pow) => {
                const count = teamPowersCount[pow.id] || 0;

                return (
                  <div
                    key={pow.id}
                    className="flex flex-col items-center p-3 rounded-2xl bg-white/90 border-2 border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    {/* Round Icon Badge */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${pow.bg} border-2 ${pow.border} flex items-center justify-center shadow-xs mb-2 relative group hover:scale-105 transition-transform`}>
                      <Pixar3DIcon name={pow.icon} size={36} />
                      {/* Count in Team */}
                      <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[#172B4D] text-white text-[11px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                        {count}
                      </span>
                    </div>

                    <span className="font-brand font-bold text-xs text-[#172B4D] text-center leading-tight mb-1 min-h-[30px] flex items-center justify-center">
                      {pow.title}
                    </span>
                    <span className={`text-[10px] font-black uppercase ${pow.text}`}>
                      в команде: {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Final Mentor Speech Box */}
        <div className="w-full bg-[#EAF4FF] border-2 border-[#007BFF]/30 rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#007BFF] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
              K1
            </div>
            <div>
              <div className="text-xs font-bold text-[#007BFF] uppercase tracking-wider mb-1">
                Финальное напутствие наставника KIBERONE:
              </div>
              <p className="text-base sm:text-lg font-semibold text-[#172B4D] leading-relaxed italic">
                «Вы не всегда можете контролировать то, что пишут другие люди в интернете. Но вы всегда можете выбирать, что делать самим: поддержать травлю, пройти мимо или помочь. И этот осознанный выбор гораздо важнее любого лайка!»
              </p>
            </div>
          </div>
        </div>

        {/* 4. 3D Pixar Robot Victory Dialogue Layout */}
        <div className="w-full max-w-2xl mb-8">
          <RobotAssistant
            state={pledgePledged ? 'happy' : 'support'}
            size="dialog"
            speechPlacement="right"
            speech="«Поздравляю! Вы стали настоящими цифровыми защитниками KIBERONE. Всегда помните о своих суперсилах и делайте интернет безопасным для всех!»"
          />
        </div>

        {/* 5. Reset Session for Next Class */}
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
    </div>
  );
};

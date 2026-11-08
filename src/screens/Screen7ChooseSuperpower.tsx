import React, { useState } from 'react';
import { SUPERPOWER_CHOICES, SuperpowerChoice } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon, Pixar3DIconName } from '../components/Pixar3DIcon';
import { FloatingBackground, FloatingIconItem } from '../components/FloatingBackground';
import { 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Trophy, 
  CheckCircle2, 
  Shield, 
  RotateCcw,
  Star,
  Zap,
  Heart
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen7ChooseSuperpowerProps {
  onCompleteStage: () => void;
  onAddScore: (points: number) => void;
  teamPowersCount: Record<string, number>;
  onSelectPower: (powerId: string) => void;
}

interface SuperpowerTheme {
  primary: string;
  cardBorder: string;
  frontBg: string;
  backBg: string;
  mottoColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  buttonClass: string;
  tipBorder: string;
  iconName: Pixar3DIconName;
}

const SUPERPOWER_THEMES: Record<string, SuperpowerTheme> = {
  shield_calm: {
    primary: '#007BFF',
    cardBorder: 'border-[#007BFF]',
    frontBg: 'from-blue-50/90 via-white to-blue-50/40',
    backBg: 'from-[#EAF4FF] via-white to-blue-100/70',
    mottoColor: 'text-[#007BFF]',
    badgeBg: 'bg-blue-100',
    badgeBorder: 'border-blue-300',
    badgeText: 'text-[#007BFF]',
    buttonClass: 'bg-[#007BFF] hover:bg-blue-600 text-white shadow-blue-500/30',
    tipBorder: 'border-blue-200',
    iconName: 'shield',
  },
  detective_facts: {
    primary: '#FFD43B',
    cardBorder: 'border-[#FFD43B]',
    frontBg: 'from-amber-50/90 via-white to-amber-50/40',
    backBg: 'from-[#FFFCEB] via-white to-[#FFF6D8]',
    mottoColor: 'text-amber-700',
    badgeBg: 'bg-[#FFF6D8]',
    badgeBorder: 'border-[#FFD43B]',
    badgeText: 'text-amber-900',
    buttonClass: 'bg-[#FFD43B] hover:bg-amber-400 text-[#172B4D] shadow-amber-500/30 font-black',
    tipBorder: 'border-amber-200',
    iconName: 'lupa',
  },
  detective_screenshots: {
    primary: '#D32F2F',
    cardBorder: 'border-[#D32F2F]',
    frontBg: 'from-red-50/90 via-white to-red-50/40',
    backBg: 'from-[#FFEBEE] via-white to-red-100/70',
    mottoColor: 'text-[#D32F2F]',
    badgeBg: 'bg-red-100',
    badgeBorder: 'border-red-300',
    badgeText: 'text-[#D32F2F]',
    buttonClass: 'bg-[#D32F2F] hover:bg-red-700 text-white shadow-red-500/30',
    tipBorder: 'border-red-200',
    iconName: 'camera',
  },
  security_master: {
    primary: '#8B5CF6',
    cardBorder: 'border-[#8B5CF6]',
    frontBg: 'from-purple-50/90 via-white to-purple-50/40',
    backBg: 'from-[#F3E8FF] via-white to-purple-100/70',
    mottoColor: 'text-[#8B5CF6]',
    badgeBg: 'bg-purple-100',
    badgeBorder: 'border-purple-300',
    badgeText: 'text-[#8B5CF6]',
    buttonClass: 'bg-[#8B5CF6] hover:bg-purple-700 text-white shadow-purple-500/30',
    tipBorder: 'border-purple-200',
    iconName: 'lock',
  },
  support_force: {
    primary: '#388E3C',
    cardBorder: 'border-[#388E3C]',
    frontBg: 'from-emerald-50/90 via-white to-emerald-50/40',
    backBg: 'from-[#E8F5E9] via-white to-emerald-100/70',
    mottoColor: 'text-[#388E3C]',
    badgeBg: 'bg-emerald-100',
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-[#388E3C]',
    buttonClass: 'bg-[#388E3C] hover:bg-emerald-700 text-white shadow-emerald-500/30',
    tipBorder: 'border-emerald-200',
    iconName: 'heart',
  },
  ask_help: {
    primary: '#00BCD4',
    cardBorder: 'border-[#00BCD4]',
    frontBg: 'from-cyan-50/90 via-white to-cyan-50/40',
    backBg: 'from-[#E0F7FA] via-white to-cyan-100/70',
    mottoColor: 'text-[#00838F]',
    badgeBg: 'bg-cyan-100',
    badgeBorder: 'border-cyan-300',
    badgeText: 'text-[#00838F]',
    buttonClass: 'bg-[#00BCD4] hover:bg-cyan-600 text-white shadow-cyan-500/30',
    tipBorder: 'border-cyan-200',
    iconName: 'chat',
  },
};

const SCREEN7_FLOATING_ITEMS: FloatingIconItem[] = [
  { icon: Star, color: '#FFD43B', size: 54, top: '40px', left: '16px', delay: 0, duration: 4.2 },
  { icon: Zap, color: '#007BFF', size: 48, top: '80px', right: '24px', delay: 0.6, duration: 3.8 },
  { icon: Shield, color: '#388E3C', size: 56, top: '35%', left: '10px', delay: 1.2, duration: 4.6 },
  { icon: Heart, color: '#FFD43B', size: 50, top: '45%', right: '16px', delay: 1.8, duration: 4.0 },
  { icon: Sparkles, color: '#007BFF', size: 44, bottom: '240px', left: '20px', delay: 0.9, duration: 3.6 },
  { icon: Star, color: '#388E3C', size: 52, bottom: '180px', right: '28px', delay: 1.5, duration: 4.4 },
  { icon: Zap, color: '#FFD43B', size: 42, bottom: '60px', left: '40px', delay: 2.1, duration: 4.1 },
  { icon: Heart, color: '#007BFF', size: 46, bottom: '50px', right: '35px', delay: 0.4, duration: 3.9 },
];

export const Screen7ChooseSuperpower: React.FC<Screen7ChooseSuperpowerProps> = ({
  onCompleteStage,
  onAddScore,
  teamPowersCount,
  onSelectPower
}) => {
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [justPickedId, setJustPickedId] = useState<string | null>(null);
  const [totalPicks, setTotalPicks] = useState(
    Object.values(teamPowersCount).reduce((a, b) => a + b, 0)
  );

  const handleToggleFlip = (powerId: string) => {
    sound.playFlip();
    setFlippedCardIds((prev) =>
      prev.includes(powerId)
        ? prev.filter((id) => id !== powerId)
        : [...prev, powerId]
    );
  };

  const handlePickPower = (power: SuperpowerChoice) => {
    sound.playPowerUp();
    onSelectPower(power.id);
    onAddScore(5);
    setTotalPicks((prev) => prev + 1);
    setJustPickedId(power.id);

    // Provide friendly visual feedback
    setTimeout(() => {
      setJustPickedId(null);
    }, 2200);
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] max-w-6xl mx-auto px-4 py-6 flex flex-col items-center overflow-hidden">
      {/* Animated Floating Background Icons (KIBERONE palette) */}
      <FloatingBackground items={SCREEN7_FLOATING_ITEMS} />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF6D8] border border-[#FFD43B] text-amber-900 font-bold text-xs sm:text-sm mb-3 shadow-2xs">
          <Sparkles size={16} className="text-amber-600" />
          <span>ФИНАЛ: ЧАСТЬ 1 • СОБЕРИ СВОЕГО ЦИФРОВОГО ЗАЩИТНИКА</span>
        </div>

        <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
          КАЖДЫЙ МОЖЕТ СТАТЬ <br />
          <span className="text-[#007BFF]">КИБЕРЗАЩИТНИКОМ!</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium text-center max-w-2xl mb-5">
          Выбирайте суперсилы для копилки команды! Нажмите на карточку, чтобы узнать, как применять её в жизни.
        </p>

        {/* Team Collection Counter */}
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border-2 border-slate-200 shadow-sm mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#FFD43B] text-[#172B4D] font-bold flex items-center justify-center shadow-xs">
            <Trophy size={18} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Всего выбрано суперсил классом:</span>
            <span className="font-brand font-black text-lg text-[#007BFF] tabular-nums">
              {totalPicks}
            </span>
          </div>
        </div>

        {/* 6 Superpowers Grid with 3D Flip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
          {SUPERPOWER_CHOICES.map((power) => {
            const theme = SUPERPOWER_THEMES[power.id] || SUPERPOWER_THEMES.shield_calm;
            const isFlipped = flippedCardIds.includes(power.id);
            const pickCount = teamPowersCount[power.id] || 0;
            const wasJustPicked = justPickedId === power.id;

            return (
              <div
                key={power.id}
                onClick={() => handleToggleFlip(power.id)}
                className="perspective-1000 cursor-pointer min-h-[400px] h-[410px] w-full group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* ================= FRONT FACE (With Big Action Button) ================= */}
                  <div
                    className={`absolute inset-0 backface-hidden p-6 rounded-3xl border-3 bg-gradient-to-b ${theme.frontBg} ${theme.cardBorder} flex flex-col justify-between overflow-hidden shadow-sm`}
                  >
                    {/* Top Bar: 3D Icon + Pick Counter Badge */}
                    <div className="flex items-center justify-between shrink-0">
                      <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform filter drop-shadow-sm">
                        <Pixar3DIcon name={theme.iconName} size={64} />
                      </div>

                      <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border shadow-2xs ${theme.badgeBg} ${theme.badgeBorder}`}>
                        <span className="text-[11px] font-bold text-slate-600 uppercase">Выбрано:</span>
                        <span className={`font-brand font-black text-xs ${theme.badgeText}`}>
                          {pickCount}
                        </span>
                      </div>
                    </div>

                    {/* Middle Content: Title & Short Child-Friendly Description */}
                    <div className="my-auto py-2">
                      <h3 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] mb-2 leading-tight">
                        {power.title}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-slate-700 leading-snug">
                        {power.description}
                      </p>
                    </div>

                    {/* Bottom: Big Colorful Action Button «Выбрать эту суперсилу (+5)» */}
                    <div className="pt-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePickPower(power);
                        }}
                        className={`w-full py-3.5 px-4 rounded-2xl font-brand font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ${
                          wasJustPicked
                            ? 'bg-emerald-600 text-white shadow-emerald-500/40'
                            : theme.buttonClass
                        }`}
                      >
                        {wasJustPicked ? (
                          <>
                            <CheckCircle2 size={20} className="stroke-[3]" />
                            <span>Выбрано! (+5 баллов)</span>
                          </>
                        ) : (
                          <>
                            <Plus size={20} className="stroke-[3]" />
                            <span>Выбрать эту суперсилу (+5)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ================= BACK FACE (Reference Only: Action Tip & Return) ================= */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 p-6 rounded-3xl border-3 bg-gradient-to-b ${theme.backBg} ${theme.cardBorder} flex flex-col justify-between items-center text-center overflow-hidden shadow-xl`}
                  >
                    {/* Top: Mini 3D Icon + Title */}
                    <div className="flex items-center justify-center gap-2.5 shrink-0 w-full pt-1">
                      <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        <Pixar3DIcon name={theme.iconName} size={40} />
                      </div>
                      <h4 className="font-brand font-black text-lg sm:text-xl text-[#172B4D]">
                        {power.title}
                      </h4>
                    </div>

                    {/* Middle: Action Tip Box Centered */}
                    <div className="my-auto py-2 w-full flex flex-col items-center">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                        <Shield size={15} className={theme.mottoColor} />
                        <span>КАК ПРИМЕНЯТЬ В РЕАЛЬНОЙ ЖИЗНИ:</span>
                      </div>
                      <div className={`w-full p-4 rounded-2xl border shadow-xs bg-white/95 ${theme.tipBorder}`}>
                        <p className="text-sm sm:text-base font-bold text-[#172B4D] leading-relaxed text-center">
                          {power.actionTip}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Return to Front Button */}
                    <div className="w-full shrink-0 pb-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFlip(power.id);
                        }}
                        className="w-full py-3.5 px-4 rounded-2xl font-brand font-bold text-sm text-[#172B4D] bg-white hover:bg-slate-50 border-2 border-slate-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                      >
                        <RotateCcw size={16} />
                        <span>Вернуться к суперсиле</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Robot Encouragement - Dialogue Layout */}
        <div className="w-full max-w-2xl mb-6">
          <RobotAssistant
            state="happy"
            size="dialog"
            speechPlacement="right"
            speech="«Каждая из этих суперсил делает интернет безопаснее и добрее. Вы готовы принести торжественное обещание команды киберзащитников?»"
          />
        </div>

        {/* CTA To Screen 8 */}
        <button
          onClick={() => {
            sound.playSuccess();
            onCompleteStage();
          }}
          className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
        >
          <span>К финальной церемонии: «Команда киберзащитников»</span>
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

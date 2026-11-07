import React, { useState } from 'react';
import { SUPERPOWER_CHOICES, SuperpowerChoice } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { Sparkles, ArrowRight, Plus, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen7ChooseSuperpowerProps {
  onCompleteStage: () => void;
  onAddScore: (points: number) => void;
  teamPowersCount: Record<string, number>;
  onSelectPower: (powerId: string) => void;
}

export const Screen7ChooseSuperpower: React.FC<Screen7ChooseSuperpowerProps> = ({
  onCompleteStage,
  onAddScore,
  teamPowersCount,
  onSelectPower
}) => {
  const [activePower, setActivePower] = useState<SuperpowerChoice | null>(SUPERPOWER_CHOICES[0]);
  const [totalPicks, setTotalPicks] = useState(
    Object.values(teamPowersCount).reduce((a, b) => a + b, 0)
  );

  const handlePickPower = (power: SuperpowerChoice) => {
    sound.playPowerUp();
    setActivePower(power);
    onSelectPower(power.id);
    onAddScore(5);
    setTotalPicks((prev) => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF6D8] border border-[#FFD43B] text-amber-900 font-bold text-xs sm:text-sm mb-3">
        <Sparkles size={16} className="text-amber-600" />
        <span>ФИНАЛ: ЧАСТЬ 1 • СОБЕРИ СВОЕГО ЦИФРОВОГО ЗАЩИТНИКА</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        КАЖДЫЙ МОЖЕТ СТАТЬ <br />
        <span className="text-[#007BFF]">КИБЕРЗАЩИТНИКОМ!</span>
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-medium text-center max-w-2xl mb-6">
        Выходите по очереди к экрану и нажимайте на суперсилу, которая вам ближе всего. Добавьте её в общую копилку команды!
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

      {/* 6 Superpowers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-8">
        {SUPERPOWER_CHOICES.map((power) => {
          const isSelected = activePower?.id === power.id;
          const pickCount = teamPowersCount[power.id] || 0;

          return (
            <div
              key={power.id}
              onClick={() => handlePickPower(power)}
              className={`p-5 rounded-3xl border-3 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1.5 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#EAF4FF] to-white border-[#007BFF] ring-4 ring-blue-300 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center justify-center">
                    {power.id === 'shield_calm' ? (
                      <Pixar3DIcon name="shield" size={50} />
                    ) : power.id === 'detective_facts' ? (
                      <Pixar3DIcon name="lupa" size={50} />
                    ) : power.id === 'support_friend' ? (
                      <Pixar3DIcon name="heart" size={50} />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                        <CyberIcon name={power.icon} size={36} />
                      </div>
                    )}
                  </div>

                  {/* Pick Badge */}
                  <div className="flex items-center gap-1.5 bg-[#FFF6D8] border border-[#FFD43B] px-3 py-1 rounded-full">
                    <span className="text-[11px] font-bold text-amber-900">Выбрано:</span>
                    <span className="font-brand font-black text-xs text-[#172B4D]">
                      {pickCount}
                    </span>
                  </div>
                </div>

                <h3 className="font-brand font-black text-lg text-[#172B4D] mb-1">
                  {power.title}
                </h3>
                <div className="text-xs font-bold text-[#007BFF] mb-2">
                  {power.motto}
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                  {power.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#007BFF] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-blue-50 text-[#172B4D]'
                }`}
              >
                <Plus size={16} />
                <span>Выбрать эту суперсилу (+5)</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Power Focus Box */}
      {activePower && (
        <div className="w-full bg-[#FFF6D8] border-2 border-[#FFD43B] rounded-3xl p-5 mb-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="shrink-0 flex items-center justify-center">
              {activePower.id === 'shield_calm' ? (
                <Pixar3DIcon name="shield" size={54} />
              ) : activePower.id === 'detective_facts' ? (
                <Pixar3DIcon name="lupa" size={54} />
              ) : activePower.id === 'support_friend' ? (
                <Pixar3DIcon name="heart" size={54} />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <CyberIcon name={activePower.icon} size={40} />
                </div>
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-0.5">
                Как применять в реальной жизни:
              </div>
              <h4 className="font-brand font-black text-base text-[#172B4D] mb-1">
                {activePower.title} — {activePower.actionTip}
              </h4>
            </div>
          </div>
        </div>
      )}

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
  );
};

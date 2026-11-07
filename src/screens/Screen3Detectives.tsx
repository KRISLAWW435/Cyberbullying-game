import React, { useState } from 'react';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon, Pixar3DIconName } from '../components/Pixar3DIcon';
import { CheckCircle2, ArrowRight, Sparkles, Search, ShieldAlert, Folder } from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen3DetectivesProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

export const Screen3Detectives: React.FC<Screen3DetectivesProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  const [unlockedSigns, setUnlockedSigns] = useState<number[]>([]);
  const [missionAwarded, setMissionAwarded] = useState(false);

  const signs: Array<{
    id: number;
    title: string;
    icon: Pixar3DIconName;
    desc: string;
    example: string;
  }> = [
    {
      id: 1,
      title: 'Повторяющиеся оскорбления',
      icon: 'chat',
      desc: 'Это не случайная оплошность, а систематические нападки в чатах, комментариях или голосовом чате день за днём.',
      example: '«Ты плохо играешь», «уходи отсюда», постоянный хейт под каждым постом.'
    },
    {
      id: 2,
      title: 'Угрозы и запугивание',
      icon: 'shield',
      desc: 'Попытки напугать ребёнка: «я тебя найду», «расскажу всем твой секрет», вымогательство аккаунтов или скинов.',
      example: 'Любая угроза или шантаж — повод НЕМЕДЛЕННО позвать взрослого!'
    },
    {
      id: 3,
      title: 'Слухи и чужие фото',
      icon: 'camera',
      desc: 'Публикация чужих фото без разрешения, обработка снимков в обидных редакторах и выдумка неправдивых историй.',
      example: 'Создание и распространение унизительных мемов с одноклассниками.'
    },
    {
      id: 4,
      title: 'Намеренная изоляция',
      icon: 'lock',
      desc: 'Создание закрытых групп «против одного», бойкот в играх, сговор «не дружить», чтобы причинить боль.',
      example: 'Удаление из всех общих бесед и запрет общаться с человеком.'
    }
  ];

  const handleToggleSign = (id: number) => {
    sound.playFlip();
    if (!unlockedSigns.includes(id)) {
      const nextSigns = [...unlockedSigns, id];
      setUnlockedSigns(nextSigns);
      onAddScore(5);

      if (nextSigns.length === 4 && !missionAwarded) {
        sound.playSuccess();
        onAddScore(15);
        setMissionAwarded(true);
      }
    } else {
      // Toggle back if already unlocked
      setUnlockedSigns(unlockedSigns.filter((item) => item !== id));
    }
  };

  const allSignsDiscovered = unlockedSigns.length === 4;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center pb-20">
      {/* Stage Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#007BFF]/30 text-[#007BFF] font-bold text-xs sm:text-sm mb-3">
        <Sparkles size={16} className="text-[#FFD43B]" />
        <span>МИССИЯ №1: ДЕТЕКТИВЫ ЦИФРОВОГО МИРА</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        ЧТО ТАКОЕ КИБЕРБУЛЛИНГ?
      </h2>
      <p className="text-base sm:text-lg text-slate-600 font-semibold text-center max-w-2xl mb-8">
        Изучите ключевую разницу между спором и травлей.
      </p>

      {/* 
        ========================================================================
        1. COMPARISON CARDS: Conflict vs Cyberbullying (Static & Clean - No false click cues)
        ========================================================================
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
        {/* Card 1: Conflict */}
        <div className="p-6 sm:p-7 rounded-3xl border-3 bg-blue-50/70 border-[#007BFF]/40 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-100 text-[#007BFF] text-xs font-bold uppercase tracking-wider">
                Ситуация 1
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                <Pixar3DIcon name="lupa" size={72} animate={false} />
              </div>
              <h3 className="font-brand font-black text-2xl text-[#172B4D]">Обычный конфликт</h3>
            </div>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
              «Два друга поспорили, кто первым будет играть. Они не согласны друг с другом, но могут высказаться на равных и спокойно обсудить проблему».
            </p>
          </div>

          <div className="p-3.5 bg-white/90 rounded-2xl border border-blue-200 text-sm sm:text-base font-bold text-blue-900 leading-snug">
            ✅ <strong className="text-[#007BFF]">Суть:</strong> Спор равных сторон. Нет цели уничтожить человека или сделать изгоем.
          </div>
        </div>

        {/* Card 2: Cyberbullying */}
        <div className="p-6 sm:p-7 rounded-3xl border-3 bg-red-50/70 border-red-500/40 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider">
                Ситуация 2
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                <Pixar3DIcon name="shield" size={72} animate={false} />
              </div>
              <h3 className="font-brand font-black text-2xl text-red-600">Кибербуллинг</h3>
            </div>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-4">
              «Одного ребёнка постоянно обзывают, высмеивают или унижают в интернете. Это повторяется снова и снова, и ему становится страшно или невыносимо неприятно».
            </p>
          </div>

          <div className="p-3.5 bg-white/90 rounded-2xl border border-red-200 text-sm sm:text-base font-bold text-red-900 leading-snug">
            ⚠️ <strong className="text-red-600">Суть:</strong> Неравенство сил, системное давление, регулярные нападки и страх жертвы.
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        2. GOLDEN DEFINITION BOX: REFACTORED INTO CLEAR STRUCTURED THESES
        ========================================================================
      */}
      <div className="w-full bg-[#FFF6D8] border-3 border-[#FFD43B] rounded-3xl p-6 sm:p-7 mb-10 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD43B] text-[#172B4D] font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs">
            💡
          </div>
          <div className="flex-1">
            <h3 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] mb-3">
              Главное правило кибердетектива
            </h3>

            {/* Main definition: bold, large font */}
            <p className="text-lg sm:text-xl font-bold text-[#172B4D] leading-relaxed mb-3">
              <strong>Кибербуллинг</strong> — это{' '}
              <span className="text-red-600 font-black underline decoration-red-300 underline-offset-4">
                намеренная, повторяющаяся травля
              </span>{' '}
              человека с помощью цифровых технологий (чатов, соцсетей, игр).
            </p>

            {/* Important addition: clearly highlighted */}
            <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-xl text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
              <ShieldAlert className="text-amber-700 shrink-0" size={22} />
              <span>
                <strong>Важно:</strong> Даже единичные угрозы, вымогательство или шантаж требуют{' '}
                <span className="text-[#007BFF] font-black">немедленного обращения к взрослому</span>!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        3. INTERACTIVE 3D FLIP CARDS: 4 SIGNS OF CYBERBULLYING (Dossier Folder Style)
        - Folder tab design
        - Fixed height (h-[350px]) + overflow-hidden to prevent text spilling
        - Comfortable readable font sizes
        ========================================================================
      */}
      <div className="w-full mb-12">
        {/* Mentor Classroom Callout */}
        <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl px-5 py-3.5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💡</span>
            <span className="font-brand font-black text-sm sm:text-base text-amber-950">
              Вызовите ученика к экрану нажать на карточку и раскрыть улику!
            </span>
          </div>
          <div className="px-3.5 py-1 rounded-full bg-white border border-amber-300 text-[#007BFF] font-brand font-black text-xs shrink-0 shadow-2xs">
            Раскрыто улик: {unlockedSigns.length} из 4
          </div>
        </div>

        {/* 4 Cards Grid with Dossier Folder Design & 3D Flip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signs.map((sign) => {
            const isFlipped = unlockedSigns.includes(sign.id);

            return (
              <div key={sign.id} className="flex flex-col select-none">
                {/* Dossier Folder Visual Tab Header */}
                <div className="flex items-center justify-between px-3">
                  <div
                    className={`px-3 py-1 rounded-t-xl font-brand font-black text-xs transition-colors flex items-center gap-1.5 ${
                      isFlipped
                        ? 'bg-[#007BFF] text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Folder size={13} />
                    <span>УЛИКА №{sign.id}</span>
                  </div>
                  {isFlipped && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Открыто
                    </span>
                  )}
                </div>

                {/* Card Container with Fixed Height & 3D Flip */}
                <div
                  onClick={() => handleToggleSign(sign.id)}
                  className="perspective-1000 cursor-pointer h-[350px] w-full group"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-b-3xl rounded-tr-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT FACE (Unopened Clue Folder) */}
                    <div className="absolute inset-0 backface-hidden p-5 rounded-b-3xl rounded-tr-3xl border-3 bg-white border-slate-200 hover:border-[#007BFF] flex flex-col justify-between items-center text-center overflow-hidden">
                      {/* Top Action Cue */}
                      <div className="w-full flex items-center justify-end">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFD43B] text-[#172B4D] text-[11px] font-black shadow-xs animate-pulse">
                          <Search size={12} className="stroke-[3]" />
                          <span>Открыть улику</span>
                        </div>
                      </div>

                      {/* Centered 3D Icon & Title */}
                      <div className="my-auto flex flex-col items-center px-2">
                        <div className="w-20 h-20 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Pixar3DIcon name={sign.icon} size={80} animate={false} />
                        </div>
                        <h4 className="font-brand font-black text-lg sm:text-xl text-[#172B4D] leading-snug">
                          {sign.title}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-slate-100 w-full text-[11px] font-bold text-[#007BFF]">
                        Нажмите, чтобы разгадать 🔎
                      </div>
                    </div>

                    {/* BACK FACE (Flipped Open Dossier Detail) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 p-5 rounded-b-3xl rounded-tr-3xl border-3 bg-gradient-to-b from-[#EAF4FF] via-white to-blue-50 border-[#007BFF] flex flex-col justify-between text-left shadow-xl overflow-hidden">
                      <div className="flex flex-col h-full justify-between">
                        {/* Top Green Stamp Header */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 font-brand font-black text-[11px] uppercase tracking-wider shadow-2xs">
                              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                              <span>✓ УЛИКА НАЙДЕНА</span>
                            </span>
                            <div className="w-9 h-9 flex items-center justify-center shrink-0">
                              <Pixar3DIcon name={sign.icon} size={36} animate={false} />
                            </div>
                          </div>

                          <h4 className="font-brand font-black text-base text-[#007BFF] mb-1.5 leading-snug">
                            {sign.title}
                          </h4>

                          {/* Concise, readable text inside overflow-hidden box */}
                          <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed mb-2 line-clamp-4">
                            {sign.desc}
                          </p>
                        </div>

                        {/* Real-life example box at bottom */}
                        <div className="p-2.5 bg-white/95 rounded-xl border border-blue-200 text-[11px] sm:text-xs font-bold text-blue-950 leading-snug shadow-2xs mt-auto">
                          <span className="text-[#007BFF] uppercase tracking-wider block text-[10px] mb-0.5">Пример:</span>
                          {sign.example}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        4. ROBOT ASSISTANT (Standing cleanly below cards grid, non-overlapping)
        ========================================================================
      */}
      <div className="w-full max-w-2xl my-8">
        <RobotAssistant
          state={allSignsDiscovered ? 'happy' : 'surprised'}
          size="dialog"
          speechPlacement="right"
          speech={
            allSignsDiscovered
              ? '«Отличная работа, детективы! Вы научились замечать не только отдельные слова, но и системную травлю. Пора перейти к настоящим расследованиям!»'
              : '«Нажимайте на карточки улик, чтобы натренировать глаз цифрового детектива!»'
          }
        />
      </div>

      {/* 
        ========================================================================
        5. CTA TO MISSION 2 (Positioned at the very bottom with clear margin)
        ========================================================================
      */}
      <div className="w-full flex justify-center mt-2 mb-8">
        <button
          onClick={() => {
            sound.playSuccess();
            onCompleteMission();
          }}
          className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg sm:text-xl shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
        >
          <span>Перейти к Миссии №2: «Расследование»</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Screen3Detectives;

import React, { useState } from 'react';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon, Pixar3DIconName } from '../components/Pixar3DIcon';
import { CheckCircle2, ArrowRight, Sparkles, Search, ShieldAlert, Folder, RotateCw } from 'lucide-react';
import { sound } from '../utils/audio';

import clue1Insults from '../assets/clues/clue-1-insults.jpg';
import clue2Threats from '../assets/clues/clue-2-threats.jpg';
import clue3Rumors from '../assets/clues/clue-3-rumors.jpg';
import clue4Isolation from '../assets/clues/clue-4-isolation.jpg';

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

  const signs = [
    {
      id: 1,
      title: 'Повторяющиеся оскорбления',
      icon: 'chat' as Pixar3DIconName,
      image: clue1Insults,
      imageAlt: '3D-смартфон со всплывающими злыми сообщениями',
      desc: 'Это не случайная оплошность, а систематические нападки в чатах, комментариях или голосовом чате день за днём.',
      example: '«Ты плохо играешь», «уходи отсюда», постоянный хейт под каждым постом.',
      mentorQuestion: '«Почему обидные слова в интернете ранят так же сильно, как и сказанные в лицо?»'
    },
    {
      id: 2,
      title: 'Угрозы и запугивание',
      icon: 'shield' as Pixar3DIconName,
      image: clue2Threats,
      imageAlt: 'Испуганный 3D-робот с красным знаком восклицания',
      desc: 'Попытки напугать ребёнка: «я тебя найду», «расскажу всем твой секрет», вымогательство аккаунтов или скинов.',
      example: 'Любая угроза или шантаж — повод НЕМЕДЛЕННО позвать взрослого!',
      mentorQuestion: '«К кому из взрослых ты обратишься первым делом при опасных угрозах в сети?»'
    },
    {
      id: 3,
      title: 'Слухи и чужие фото',
      icon: 'camera' as Pixar3DIconName,
      image: clue3Rumors,
      imageAlt: '3D-фотография и смартфон с разлетающимися стрелками шеринга',
      desc: 'Публикация чужих фото без разрешения, обработка снимков в обидных редакторах и выдумка неправдивых историй.',
      example: 'Создание и распространение унизительных мемов с одноклассниками.',
      mentorQuestion: '«Почему нельзя пересылать чужие фотографии без согласия того, кто на них изображён?»'
    },
    {
      id: 4,
      title: 'Намеренная изоляция',
      icon: 'lock' as Pixar3DIconName,
      image: clue4Isolation,
      imageAlt: 'Группа 3D-роботов в кругу и один грустный робот в стороне',
      desc: 'Создание закрытых групп «против одного», бойкот в играх, сговор «не дружить», чтобы причинить боль.',
      example: 'Удаление из всех общих бесед и запрет общаться с человеком.',
      mentorQuestion: '«Что чувствует человек, которого намеренно не пускают в общую беседу?»'
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
    /* Расширенный контейнер max-w-7xl для широких карточек */
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center pb-28 mb-10">
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
        1. COMPARISON CARDS: Conflict vs Cyberbullying
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
        2. GOLDEN DEFINITION BOX
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

            <p className="text-lg sm:text-xl font-bold text-[#172B4D] leading-relaxed mb-3">
              <strong>Кибербуллинг</strong> — это{' '}
              <span className="text-red-600 font-black underline decoration-red-300 underline-offset-4">
                намеренная, повторяющаяся травля
              </span>{' '}
              человека с помощью цифровых технологий (чатов, соцсетей, игр).
            </p>

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
        3. INTERACTIVE 3D FLIP CARDS: 2x2 GRID (No Scroll, w-40/w-48, h-[620px])
        ========================================================================
      */}
      <div className="w-full mb-12">
        {/* Mentor Classroom Callout */}
        <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <span className="font-brand font-black text-base sm:text-lg text-amber-950">
              Вызовите ученика к экрану нажать на карточку и раскрыть улику!
            </span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-white border-2 border-amber-300 text-[#007BFF] font-brand font-black text-sm shrink-0 shadow-2xs">
            Раскрыто улик: {unlockedSigns.length} из 4
          </div>
        </div>

        {/* 2x2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {signs.map((sign) => {
            const isFlipped = unlockedSigns.includes(sign.id);

            return (
              <div key={sign.id} className="flex flex-col select-none">
                {/* Dossier Folder Visual Tab Header */}
                <div className="flex items-center justify-between px-3 mb-1">
                  <div
                    className={`px-4 py-1.5 rounded-t-xl font-brand font-black text-xs sm:text-sm transition-colors flex items-center gap-1.5 ${
                      isFlipped
                        ? 'bg-[#007BFF] text-white shadow-xs'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Folder size={16} />
                    <span>УЛИКА №{sign.id}</span>
                  </div>
                  {isFlipped ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 size={14} /> Открыто
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Нажмите для разгадки</span>
                  )}
                </div>

                {/* Card Container (min-h-[440px] h-[440px] fixed) */}
                <div
                  onClick={() => handleToggleSign(sign.id)}
                  className="perspective-1000 cursor-pointer min-h-[440px] h-[440px] w-full group"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-b-3xl rounded-tr-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT FACE (Unopened Clue Folder) */}
                    <div className="absolute inset-0 backface-hidden p-4 sm:p-5 rounded-b-3xl rounded-tr-3xl border-3 bg-white border-slate-200 hover:border-[#007BFF] flex flex-col justify-between items-center text-center overflow-hidden transition-colors">
                      <div className="w-full flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#007BFF] font-brand font-black text-xs uppercase tracking-wider">
                          Улика #{sign.id}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD43B] text-[#172B4D] text-xs font-black shadow-xs group-hover:scale-105 transition-transform">
                          <Search size={14} className="stroke-[3]" />
                          <span>Разгадать</span>
                        </div>
                      </div>

                      <div className="my-auto flex flex-col items-center px-2">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform filter drop-shadow-md">
                          <Pixar3DIcon name={sign.icon} size={84} animate={false} />
                        </div>
                        <h4 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] leading-snug">
                          {sign.title}
                        </h4>
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 w-full text-xs sm:text-sm font-bold text-[#007BFF] flex items-center justify-center gap-2">
                        <span>Нажмите, чтобы разгадать</span>
                        <span className="text-base">🔎</span>
                      </div>
                    </div>

                    {/* BACK FACE (Strictly overflow-hidden, No internal scroll!) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 p-3.5 sm:p-4 rounded-b-3xl rounded-tr-3xl border-3 bg-gradient-to-b from-[#EAF4FF] via-white to-blue-50/70 border-[#007BFF] flex flex-col justify-between text-left shadow-xl overflow-hidden">
                      {/* Top Header Badge */}
                      <div className="flex items-center justify-between shrink-0 mb-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 font-brand font-black text-xs uppercase tracking-wider shadow-2xs">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                          <span>✓ Улика найдена</span>
                        </span>
                        <span className="text-xs font-bold text-slate-400 hover:text-[#007BFF] flex items-center gap-1">
                          <RotateCw size={12} /> Свернуть
                        </span>
                      </div>

                      {/* Compact 3D Illustration: w-28 h-28 */}
                      <div className="w-full flex justify-center shrink-0 my-0.5">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-xs border border-blue-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={sign.image}
                            alt={sign.imageAlt}
                            className="w-full h-full object-contain hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Content block: tight margins, crisp text */}
                      <div className="flex-1 flex flex-col justify-between min-h-0">
                        {/* Title */}
                        <h4 className="font-brand font-black text-base sm:text-lg text-[#007BFF] leading-tight mb-1 shrink-0">
                          {sign.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-slate-800 font-semibold leading-snug mb-1 shrink-0">
                          {sign.desc}
                        </p>

                        {/* Example Box */}
                        <div className="p-2 sm:p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-slate-800 leading-snug mb-1 shadow-2xs shrink-0">
                          <span className="text-[#007BFF] font-black uppercase tracking-wider block text-[10px] mb-0.5">
                            Пример из жизни:
                          </span>
                          <span>{sign.example}</span>
                        </div>

                        {/* Mentor Question Box */}
                        <div className="p-2 sm:p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 leading-snug shadow-2xs flex items-start gap-2 shrink-0">
                          <span className="text-base shrink-0">💬</span>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider font-black text-amber-700 block mb-0.5">
                              Вопрос наставника к классу:
                            </span>
                            <span>{sign.mentorQuestion}</span>
                          </div>
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

      {/* Робот-помощник */}
      <div className="w-full max-w-2xl my-6">
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

      {/* Навигация */}
      <div className="w-full flex justify-center mt-2 mb-10">
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

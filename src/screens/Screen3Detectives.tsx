import React, { useState } from 'react';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { CheckCircle2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen3DetectivesProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

export const Screen3Detectives: React.FC<Screen3DetectivesProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  const [activeCard, setActiveCard] = useState<'conflict' | 'bullying' | null>(null);
  const [unlockedSigns, setUnlockedSigns] = useState<number[]>([]);
  const [missionAwarded, setMissionAwarded] = useState(false);

  const signs = [
    {
      id: 1,
      title: 'Повторяющиеся оскорбления',
      icon: 'message',
      desc: 'Это не единичная оплошность, а регулярные нападки в чатах, комментариях или голосовой связи игр день за днём.',
      example: '«Ты плохой игрок», «уходи отсюда», постоянные насмешки под каждым постом.'
    },
    {
      id: 2,
      title: 'Угрозы и запугивание',
      icon: 'shield',
      desc: 'Попытки напугать ребёнка: «я тебя найду», «я расскажу всем твой секрет», вымогательство игровых предметов или паролей.',
      example: 'Любая угроза расправой или шантажом требует НЕМЕДЛЕННОГО обращения к взрослому!'
    },
    {
      id: 3,
      title: 'Слухи и чужие фото',
      icon: 'camera',
      desc: 'Распространение неудачных снимков, обработка чужих фото в унизительных редакторах и выдумка неправдивых историй.',
      example: 'Создание обидных мемов с одноклассниками без их согласия.'
    },
    {
      id: 4,
      title: 'Намеренная изоляция',
      icon: 'lock',
      desc: 'Создание закрытых чатов «против одного», бойкот в играх, сговор «не дружить» с целью причинить душевную боль.',
      example: 'Удаление из всех общих бесед и запрет общаться с одноклассником.'
    }
  ];

  const handleToggleSign = (id: number) => {
    sound.playClick();
    if (!unlockedSigns.includes(id)) {
      const nextSigns = [...unlockedSigns, id];
      setUnlockedSigns(nextSigns);
      onAddScore(5);

      if (nextSigns.length === 4 && !missionAwarded) {
        sound.playSuccess();
        onAddScore(15);
        setMissionAwarded(true);
      }
    }
  };

  const allSignsDiscovered = unlockedSigns.length === 4;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Stage Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#007BFF]/30 text-[#007BFF] font-bold text-xs sm:text-sm mb-3">
        <Sparkles size={16} className="text-[#FFD43B]" />
        <span>МИССИЯ №1: ДЕТЕКТИВЫ ЦИФРОВОГО МИРА</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        ЧТО ТАКОЕ КИБЕРБУЛЛИНГ?
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-medium text-center max-w-2xl mb-6">
        Нажмите на карточки, чтобы разобрать разницу между обычным спором и опасной травлей.
      </p>

      {/* 2 Big Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        {/* Card 1: Conflict */}
        <div
          onClick={() => {
            sound.playFlip();
            setActiveCard(activeCard === 'conflict' ? null : 'conflict');
          }}
          className={`relative p-6 rounded-3xl border-3 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
            activeCard === 'conflict'
              ? 'bg-blue-50 border-[#007BFF] ring-4 ring-blue-200'
              : 'bg-white border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#007BFF] text-xs font-bold uppercase tracking-wider">
              Ситуация 1
            </span>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <RefreshCw size={12} /> Нажмите для деталей
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <Pixar3DIcon name="lupa" size={54} className="shrink-0" />
            <h3 className="font-brand font-bold text-xl text-[#172B4D]">Обычный конфликт</h3>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            «Два друга поспорили, кто первым будет играть. Они не согласны друг с другом, но могут высказаться на равных и спокойно обсудить проблему».
          </p>

          <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs font-semibold text-blue-900">
            ✅ <strong>Суть:</strong> Спор равных сторон. Нет цели уничтожить человека или сделать изгоем.
          </div>
        </div>

        {/* Card 2: Cyberbullying */}
        <div
          onClick={() => {
            sound.playFlip();
            setActiveCard(activeCard === 'bullying' ? null : 'bullying');
          }}
          className={`relative p-6 rounded-3xl border-3 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl ${
            activeCard === 'bullying'
              ? 'bg-red-50 border-red-500 ring-4 ring-red-200'
              : 'bg-white border-slate-200 hover:border-red-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider">
              Ситуация 2
            </span>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <RefreshCw size={12} /> Нажмите для деталей
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <Pixar3DIcon name="shield" size={54} className="shrink-0" />
            <h3 className="font-brand font-bold text-xl text-red-600">Кибербуллинг</h3>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            «Одного ребёнка постоянно обзывают, высмеивают или унижают в интернете. Это повторяется снова и снова, и ему становится страшно или невыносимо неприятно».
          </p>

          <div className="p-3 bg-white rounded-xl border border-red-200 text-xs font-semibold text-red-900">
            ⚠️ <strong>Суть:</strong> Неравенство сил, системное давление, регулярные нападки и страх жертвы.
          </div>
        </div>
      </div>

      {/* Golden Definition Box */}
      <div className="w-full bg-[#FFF6D8] border-2 border-[#FFD43B] rounded-3xl p-5 mb-8 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFD43B] text-[#172B4D] font-bold flex items-center justify-center shrink-0 shadow-xs">
            💡
          </div>
          <div>
            <h4 className="font-brand font-bold text-base sm:text-lg text-[#172B4D] mb-1">
              Главное правило кибердетектива:
            </h4>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              <strong>Кибербуллинг</strong> — это намеренная, повторяющаяся травля человека с помощью цифровых технологий (чатов, соцсетей, онлайн-игр). Единичные угрозы или шантаж также требуют немедленного вмешательства взрослого!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive: 4 Signs of Cyberbullying */}
      <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-brand font-black text-xl text-[#172B4D]">
              ИНТЕРАКТИВ «УЗНАЙ ПРИЗНАКИ»
            </h4>
            <p className="text-xs text-slate-500 font-semibold">
              Нажмите на каждый из 4 значков, чтобы проверить улики и открыть суперсилу детектива!
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-blue-50 text-[#007BFF] font-bold text-xs border border-blue-200">
            Открыто: {unlockedSigns.length}/4
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {signs.map((sign) => {
            const isUnlocked = unlockedSigns.includes(sign.id);
            return (
              <button
                key={sign.id}
                onClick={() => handleToggleSign(sign.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-[#EAF4FF] border-[#007BFF] shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center">
                      <CyberIcon name={sign.icon} size={30} />
                    </div>
                    {isUnlocked ? (
                      <CheckCircle2 size={20} className="text-[#007BFF]" />
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                        Нажми
                      </span>
                    )}
                  </div>
                  <h5 className="font-brand font-bold text-sm text-[#172B4D] mb-1">
                    {sign.title}
                  </h5>
                  <p className="text-xs text-slate-600 leading-snug mb-2">
                    {sign.desc}
                  </p>
                </div>
                {isUnlocked && (
                  <div className="text-[10px] bg-white p-2 rounded-lg border border-blue-200 text-blue-900 font-medium">
                    {sign.example}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Robot Speech Feedback - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
        <RobotAssistant
          state={allSignsDiscovered ? 'happy' : 'surprised'}
          size="dialog"
          speechPlacement="right"
          speech={
            allSignsDiscovered
              ? '«Отличная работа, детективы! Вы научились замечать не только отдельные слова, но и системную травлю. Пора перейти к настоящим расследованиям!»'
              : '«Нажимайте на значки улик, чтобы натренировать глаз цифрового детектива!»'
          }
        />
      </div>

      {/* CTA to Mission 2 */}
      <button
        onClick={() => {
          sound.playSuccess();
          onCompleteMission();
        }}
        className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
      >
        <span>Перейти к Миссии №2: «Расследование»</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

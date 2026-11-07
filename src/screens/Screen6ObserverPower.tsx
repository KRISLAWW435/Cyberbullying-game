import React, { useState } from 'react';
import { OBSERVER_ACTIONS, SUPPORT_PHRASES } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  MessageCircleHeart, 
  Send
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen6ObserverPowerProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

export const Screen6ObserverPower: React.FC<Screen6ObserverPowerProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasAwardedAction, setHasAwardedAction] = useState(false);
  const [selectedPhrases, setSelectedPhrases] = useState<number[]>([1]);
  const [customPhrase, setCustomPhrase] = useState('');
  const [customPhrasesList, setCustomPhrasesList] = useState<string[]>([]);

  const handleSelectAction = (action: (typeof OBSERVER_ACTIONS)[0]) => {
    setSelectedActionId(action.id);
    setShowFeedback(true);

    if (action.isCorrect) {
      sound.playSuccess();
      if (!hasAwardedAction) {
        onAddScore(15);
        setHasAwardedAction(true);
      }
    } else {
      sound.playAlert();
    }
  };

  const handleTogglePhrase = (id: number) => {
    sound.playClick();
    if (selectedPhrases.includes(id)) {
      setSelectedPhrases(selectedPhrases.filter((p) => p !== id));
    } else {
      setSelectedPhrases([...selectedPhrases, id]);
    }
  };

  const handleAddCustomPhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPhrase.trim()) {
      sound.playSuccess();
      setCustomPhrasesList([...customPhrasesList, customPhrase.trim()]);
      setCustomPhrase('');
      onAddScore(5);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs sm:text-sm mb-3">
        <Heart size={16} />
        <span>МИССИЯ №4: СИЛА НАБЛЮДАТЕЛЯ</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-4xl text-[#172B4D] text-center mb-2">
        А ЕСЛИ ТЫ НЕ УЧАСТВУЕШЬ В ТРАВЛЕ, <br />
        <span className="text-[#007BFF]">НО ВИДИШЬ ЕЁ?</span>
      </h2>
      <p className="text-sm sm:text-base text-slate-600 font-medium text-center max-w-2xl mb-8">
        В травле всегда участвуют три стороны. Поведение наблюдателей решает всё!
      </p>

      {/* 3 Roles Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mb-8">
        {/* Role 1 */}
        <div className="p-5 rounded-3xl bg-red-50 border-2 border-red-200 flex flex-col items-center text-center shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl mb-2">
            😔
          </div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
            Роль 1
          </span>
          <h4 className="font-brand font-black text-base text-[#172B4D] mb-1">
            Тот, кого обижают
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Чувствует одиночество, тревогу и страх. Ему необходима рука помощи и поддержка!
          </p>
        </div>

        {/* Role 2 */}
        <div className="p-5 rounded-3xl bg-slate-100 border-2 border-slate-300 flex flex-col items-center text-center shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl mb-2">
            😠
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Роль 2
          </span>
          <h4 className="font-brand font-black text-base text-[#172B4D] mb-1">
            Тот, кто обижает
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Пытается самоутвердиться за счёт слабости другого. Ищет внимания и одобрения зрителей.
          </p>
        </div>

        {/* Role 3: Observer */}
        <div className="p-5 rounded-3xl bg-[#FFF6D8] border-3 border-[#FFD43B] flex flex-col items-center text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#FFD43B] text-[#172B4D] text-[10px] font-black uppercase">
            Ключ к победе
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl mb-2">
            👀
          </div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            Роль 3
          </span>
          <h4 className="font-brand font-black text-base text-[#172B4D] mb-1">
            Наблюдатель (Ты!)
          </h4>
          <p className="text-xs text-amber-950 font-semibold">
            Может остановить буллинг, если не станет ставить смайлики и поддержит человека!
          </p>
        </div>
      </div>

      {/* Interactive Situation Question */}
      <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xl mb-8">
        <div className="mb-4 pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-[#007BFF] uppercase tracking-wider block mb-1">
            Ситуация из жизни:
          </span>
          <h3 className="font-brand font-black text-lg sm:text-xl text-[#172B4D]">
            «Ты видишь, что в общем чате несколько ребят смеются над одноклассником и пересылают его фотографию».
          </h3>
        </div>

        <div className="space-y-3 mb-4">
          {OBSERVER_ACTIONS.map((action) => {
            const isSelected = selectedActionId === action.id;
            const isCorrect = action.isCorrect;

            let cardStyle = 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40';
            if (showFeedback) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300';
              } else if (isSelected) {
                cardStyle = 'bg-red-50 border-red-400';
              } else {
                cardStyle = 'bg-slate-50 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={action.id}
                onClick={() => handleSelectAction(action)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${cardStyle}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl font-brand font-black text-sm flex items-center justify-center shrink-0 ${
                    showFeedback && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : showFeedback && isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-[#172B4D] border border-slate-200 shadow-xs'
                  }`}
                >
                  {action.id}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#172B4D] leading-snug">
                    {action.text}
                  </p>
                  {showFeedback && (isSelected || isCorrect) && (
                    <p
                      className={`text-xs mt-1.5 font-medium ${
                        isCorrect ? 'text-emerald-700 font-bold' : 'text-red-600'
                      }`}
                    >
                      {action.feedback}
                    </p>
                  )}
                </div>

                {showFeedback && isCorrect && (
                  <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-1" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle size={22} className="text-red-500 shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Guidance Note */}
        {showFeedback && (
          <div className="p-4 bg-[#EAF4FF] border border-[#007BFF]/30 rounded-2xl text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            💡 <strong>Совет наставника KIBERONE:</strong> Не нужно рисковать собой или вступать в опасную открытую перепалку с агрессором. Если вмешиваться страшно — самое верное решение: лично написать слова поддержки тому, кого обижают, и рассказать об этом взрослому!
          </div>
        )}
      </div>

      {/* Discussion Section: What can you write to support? */}
      <div className="w-full bg-[#FFF6D8] border-2 border-[#FFD43B] rounded-3xl p-6 shadow-lg mb-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircleHeart size={24} className="text-amber-800" />
          <h3 className="font-brand font-black text-lg sm:text-xl text-[#172B4D]">
            ОБСУЖДЕНИЕ: «ЧТО МОЖНО НАПИСАТЬ ЧЕЛОВЕКУ, КОТОРОГО ОБИЖАЮТ?»
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 font-semibold mb-4">
          Нажмите на готовые фразы поддержки или добавьте свой добрый ответ от класса!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {SUPPORT_PHRASES.map((phrase) => {
            const isSelected = selectedPhrases.includes(phrase.id);
            return (
              <button
                key={phrase.id}
                onClick={() => handleTogglePhrase(phrase.id)}
                className={`p-3 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-white border-[#007BFF] shadow-md ring-2 ring-blue-200 text-[#172B4D]'
                    : 'bg-white/70 hover:bg-white border-amber-200 text-slate-700'
                }`}
              >
                <span className="text-xl shrink-0">{phrase.icon}</span>
                <span className="leading-snug">{phrase.text}</span>
              </button>
            );
          })}

          {customPhrasesList.map((cp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl border-2 border-emerald-400 bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-xs"
            >
              <span className="text-xl">🌟</span>
              <span>«{cp}»</span>
            </div>
          ))}
        </div>

        {/* Input for Mentor/Children to type classroom suggestion */}
        <form onSubmit={handleAddCustomPhrase} className="flex gap-2">
          <input
            type="text"
            value={customPhrase}
            onChange={(e) => setCustomPhrase(e.target.value)}
            placeholder="Напишите вариант фразы от класса..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border-2 border-amber-300 focus:border-[#007BFF] focus:outline-none text-xs sm:text-sm font-medium text-[#172B4D]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#007BFF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Send size={16} />
            <span>Добавить</span>
          </button>
        </form>
      </div>

      {/* Golden Card: Superpower of Observer */}
      <div className="w-full bg-white border-3 border-[#007BFF] rounded-3xl p-5 mb-8 shadow-md flex items-center gap-4">
        <div className="shrink-0 flex items-center justify-center">
          <Pixar3DIcon name="heart" size={56} />
        </div>
        <div>
          <span className="text-[11px] font-bold text-[#007BFF] uppercase tracking-wider">
            Золотое правило KIBERONE:
          </span>
          <h4 className="font-brand font-black text-lg sm:text-xl text-[#172B4D]">
            СУПЕРСИЛА НАБЛЮДАТЕЛЯ — НЕ ОСТАВАТЬСЯ РАВНОДУШНЫМ!
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            Твоё доброе слово сильнее сотни насмешек хейтеров.
          </p>
        </div>
      </div>

      {/* Robot Assistant speech - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
        <RobotAssistant
          state={showFeedback ? 'support' : 'thinking'}
          size="dialog"
          speechPlacement="right"
          speech="«Наблюдатели обладают огромной скрытой силой. Когда никто не смеётся над злой шуткой и поддерживает жертву — буллинг быстро гаснет!»"
        />
      </div>

      {/* CTA To Superpowers Selection */}
      <button
        onClick={() => {
          sound.playSuccess();
          onCompleteMission();
        }}
        className="h-16 px-10 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
      >
        <span>Перейти к финалу: «Собери своего защитника»</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

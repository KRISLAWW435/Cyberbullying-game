import React, { useState } from 'react';
import { OBSERVER_ACTIONS } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CloudRain, 
  MessageCircleHeart,
  Smile,
  Frown,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

// Character emotional states
import kidSadImg from '../assets/images/kid-sad.jpg';
import kidHappyImg from '../assets/images/kid-happy.jpg';
import kidHurtImg from '../assets/images/kid-hurt.jpg';

interface Screen6ObserverPowerProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

interface DialoguePhrase {
  id: string;
  type: 'good' | 'bad';
  text: string;
  characterReaction: string;
  tag: string;
}

const DIALOGUE_PHRASES: DialoguePhrase[] = [
  {
    id: 'good-1',
    type: 'good',
    text: '«Я вижу, что тебя обижают. Ты не один, я с тобой!»',
    characterReaction: '«Спасибо... Твои слова согрели мне сердце, я чувствую опору!»',
    tag: 'Помог! ✅'
  },
  {
    id: 'bad-1',
    type: 'bad',
    text: '«Да ладно тебе, это же просто шутка. Не обращай внимания.»',
    characterReaction: '«Мне совсем не смешно... Это обесценивает мою боль...»',
    tag: 'Обидел! ❌'
  },
  {
    id: 'good-2',
    type: 'good',
    text: '«Мне кажется, это совершенно несправедливо. Они не правы.»',
    characterReaction: '«Как важно это услышать! Я уже начал сомневаться в себе.»',
    tag: 'Помог! ✅'
  },
  {
    id: 'bad-2',
    type: 'bad',
    text: '«Может, ты сам что-то сделал, раз они так?»',
    characterReaction: '«Почему ты обвиняешь меня? Жертва никогда не виновата в травле...»',
    tag: 'Обидел! ❌'
  },
  {
    id: 'good-3',
    type: 'good',
    text: '«Давай вместе расскажем наставнику или родителям.»',
    characterReaction: '«С тобой мне уже не страшно попросить помощи. Спасибо!»',
    tag: 'Помог! ✅'
  },
  {
    id: 'bad-3',
    type: 'bad',
    text: '«Просто удали чат и не пиши им, само пройдет.»',
    characterReaction: '«Если прятаться и молчать, травля не прекратится сама...»',
    tag: 'Обидел! ❌'
  }
];

export const Screen6ObserverPower: React.FC<Screen6ObserverPowerProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  // Scenario question state
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [showScenarioFeedback, setShowScenarioFeedback] = useState(false);
  const [hasAwardedAction, setHasAwardedAction] = useState(false);

  // Dialogue simulator states
  const [characterMood, setCharacterMood] = useState<'sad' | 'happy' | 'hurt'>('sad');
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  const [clickedPhrases, setClickedPhrases] = useState<Record<string, 'good' | 'bad'>>({});
  const [characterQuote, setCharacterQuote] = useState<string>(
    '«Меня травят в общем чате... Я не знаю, что делать и к кому обратиться...»'
  );
  const [hasAwardedDialoguePoints, setHasAwardedDialoguePoints] = useState(false);

  // Handle Scenario Question selection
  const handleSelectAction = (action: (typeof OBSERVER_ACTIONS)[0]) => {
    setSelectedActionId(action.id);
    setShowScenarioFeedback(true);

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

  // Handle Dialogue Phrase click
  const handlePhraseClick = (phrase: DialoguePhrase) => {
    setActivePhraseId(phrase.id);
    setClickedPhrases((prev) => ({ ...prev, [phrase.id]: phrase.type }));
    setCharacterQuote(phrase.characterReaction);

    if (phrase.type === 'good') {
      sound.playSuccess();
      setCharacterMood('happy');

      // Check if all 3 good phrases found
      const newClicked = { ...clickedPhrases, [phrase.id]: 'good' as const };
      const goodCount = DIALOGUE_PHRASES.filter((p) => p.type === 'good' && newClicked[p.id]).length;
      if (goodCount >= 3 && !hasAwardedDialoguePoints) {
        sound.playPowerUp();
        onAddScore(20);
        setHasAwardedDialoguePoints(true);
      }
    } else {
      sound.playAlert();
      setCharacterMood('hurt');
    }
  };

  const handleResetSimulator = () => {
    sound.playClick();
    setCharacterMood('sad');
    setActivePhraseId(null);
    setCharacterQuote('«Меня травят в общем чате... Я не знаю, что делать и к кому обратиться...»');
  };

  const goodFoundCount = DIALOGUE_PHRASES.filter(
    (p) => p.type === 'good' && clickedPhrases[p.id]
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center pb-20 select-none">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs sm:text-sm mb-2">
        <Heart size={16} />
        <span>МИССИЯ №4: СИЛА НАБЛЮДАТЕЛЯ</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-3xl text-[#172B4D] text-center mb-1">
        А ЕСЛИ ТЫ НЕ УЧАСТВУЕШЬ В ТРАВЛЕ, <br />
        <span className="text-[#007BFF]">НО ВИДИШЬ ЕЁ?</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 font-semibold text-center max-w-2xl mb-5">
        В травле всегда три стороны. Действия наблюдателя определяют, прекратится буллинг или разгорится сильнее!
      </p>

      {/* 3 Roles Visual Cards (Compact & Crisp) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6">
        {/* Role 1 */}
        <div className="p-3.5 rounded-2xl bg-red-50/70 border-2 border-red-200 flex flex-col items-center text-center shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-2xl mb-1.5">
            😔
          </div>
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
            Роль 1
          </span>
          <h4 className="font-brand font-black text-sm text-[#172B4D] mb-0.5">
            Тот, кого обижают
          </h4>
          <p className="text-xs text-slate-600 font-medium leading-snug">
            Чувствует одиночество и страх. Ему необходима рука помощи и поддержка!
          </p>
        </div>

        {/* Role 2 */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-300 flex flex-col items-center text-center shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-2xl mb-1.5">
            😠
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Роль 2
          </span>
          <h4 className="font-brand font-black text-sm text-[#172B4D] mb-0.5">
            Тот, кто обижает
          </h4>
          <p className="text-xs text-slate-600 font-medium leading-snug">
            Самоутверждается за счёт слабости другого. Ищет внимания и смеха зрителей.
          </p>
        </div>

        {/* Role 3: Observer */}
        <div className="p-3.5 rounded-2xl bg-[#FFF6D8] border-2 border-[#FFD43B] flex flex-col items-center text-center shadow-md relative overflow-hidden ring-2 ring-amber-300/60">
          <div className="absolute top-1.5 right-2 px-2 py-0.5 rounded-full bg-[#FFD43B] text-[#172B4D] text-[9px] font-black uppercase">
            Ключ к победе
          </div>
          <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-2xl mb-1.5">
            👀
          </div>
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Роль 3
          </span>
          <h4 className="font-brand font-black text-sm text-[#172B4D] mb-0.5">
            Наблюдатель (Ты!)
          </h4>
          <p className="text-xs text-amber-950 font-bold leading-snug">
            Может остановить буллинг: не поддакивать хейтерам и поддержать лично!
          </p>
        </div>
      </div>

      {/* Interactive Situation Question */}
      <div className="w-full bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md mb-6">
        <div className="mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#007BFF] uppercase tracking-wider block mb-0.5">
              Ситуация из жизни:
            </span>
            <h3 className="font-brand font-black text-base sm:text-lg text-[#172B4D]">
              «В общем чате одноклассники высмеивают чью-то фотографию. Что сделает настоящий кибер-герой?»
            </h3>
          </div>
          {showScenarioFeedback && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
              Выбор сделан!
            </span>
          )}
        </div>

        <div className="space-y-2.5 mb-3">
          {OBSERVER_ACTIONS.map((action) => {
            const isSelected = selectedActionId === action.id;
            const isCorrect = action.isCorrect;

            let cardStyle = 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40';
            if (showScenarioFeedback) {
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
                className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${cardStyle}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg font-brand font-black text-xs flex items-center justify-center shrink-0 ${
                    showScenarioFeedback && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : showScenarioFeedback && isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-[#172B4D] border border-slate-200 shadow-xs'
                  }`}
                >
                  {action.id}
                </div>

                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-[#172B4D] leading-snug">
                    {action.text}
                  </p>
                  {showScenarioFeedback && (isSelected || isCorrect) && (
                    <p
                      className={`text-xs mt-1 font-semibold ${
                        isCorrect ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {action.feedback}
                    </p>
                  )}
                </div>

                {showScenarioFeedback && isCorrect && (
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                )}
                {showScenarioFeedback && isSelected && !isCorrect && (
                  <XCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        НОВАЯ МЕХАНИКА: ИНТЕРАКТИВНЫЙ СИМУЛЯТОР ДИАЛОГА (ЭМПАТИЯ В ДЕЙСТВИИ)
        БЕЗ ТЕКСТОВОГО ПОЛЯ ВВОДА!
        Крупные кликабельные бабблы фраз + живой 3D-персонаж с эмоциональными реакциями
        ========================================================================
      */}
      <div className="w-full bg-gradient-to-b from-[#FFFDF2] to-[#FFF9E6] border-3 border-[#FFD43B] rounded-3xl p-5 sm:p-7 shadow-xl mb-6 relative overflow-hidden">
        {/* Header of Simulator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-amber-200/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase tracking-wider mb-1">
              <MessageCircleHeart size={15} />
              <span>Интерактивный симулятор эмпатии</span>
            </div>
            <h3 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D]">
              СИМУЛЯТОР: «ЧТО НАПИСАТЬ ТОМУ, КОГО ОБИЖАЮТ?»
            </h3>
            <p className="text-xs sm:text-sm text-amber-950 font-semibold mt-0.5">
              Нажимайте на фразы и посмотрите, как ваши слова влияют на чувства одноклассника!
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 shadow-xs">
              Поддержано: {goodFoundCount} из 3
            </span>
            <button
              onClick={handleResetSimulator}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 cursor-pointer border border-slate-200 transition-colors shadow-xs"
              title="Сбросить реакцию"
            >
              <RotateCcw size={14} /> Сброс
            </button>
          </div>
        </div>

        {/* Simulator Core: Left 3D Character, Right Phrase Bubbles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* ================= LEFT: 3D CHARACTER WITH EMOTIONS ================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative flex flex-col items-center w-full max-w-[280px]">
              
              {/* Floating Empathy Effects */}
              <AnimatePresence mode="wait">
                {characterMood === 'happy' && (
                  <motion.div
                    key="happy-fx"
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-6 inset-x-0 flex items-center justify-around pointer-events-none z-20"
                  >
                    <span className="text-2xl animate-bounce">❤️</span>
                    <span className="text-xl animate-pulse">✨</span>
                    <span className="text-2xl animate-bounce delay-100">🥰</span>
                    <span className="text-xl animate-pulse delay-200">💖</span>
                  </motion.div>
                )}

                {characterMood === 'hurt' && (
                  <motion.div
                    key="hurt-fx"
                    initial={{ opacity: 0, scale: 0.5, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-6 inset-x-0 flex items-center justify-around pointer-events-none z-20"
                  >
                    <span className="text-2xl animate-pulse">💔</span>
                    <span className="text-xl">⚡</span>
                    <span className="text-2xl animate-bounce">🌧️</span>
                    <span className="text-xl">🌩️</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Character Avatar Container */}
              <motion.div
                animate={
                  characterMood === 'hurt'
                    ? { x: [-5, 5, -5, 5, -2, 2, 0], transition: { duration: 0.4 } }
                    : characterMood === 'happy'
                    ? { y: [0, -6, 0], scale: [1, 1.03, 1], transition: { duration: 0.5 } }
                    : {}
                }
                className={`w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden bg-white shadow-xl transition-all duration-300 relative flex items-center justify-center border-4 ${
                  characterMood === 'happy'
                    ? 'border-emerald-400 ring-4 ring-emerald-300/60 shadow-emerald-200'
                    : characterMood === 'hurt'
                    ? 'border-red-400 ring-4 ring-red-300/60 shadow-red-200'
                    : 'border-slate-200'
                }`}
              >
                <img
                  src={
                    characterMood === 'happy'
                      ? kidHappyImg
                      : characterMood === 'hurt'
                      ? kidHurtImg
                      : kidSadImg
                  }
                  alt="Одноклассник, которому нужна поддержка"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Mood Tag */}
                <div className="absolute bottom-2 inset-x-2 flex justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black shadow-md backdrop-blur-xs flex items-center gap-1.5 ${
                      characterMood === 'happy'
                        ? 'bg-emerald-600/90 text-white'
                        : characterMood === 'hurt'
                        ? 'bg-red-600/90 text-white'
                        : 'bg-[#172B4D]/80 text-white'
                    }`}
                  >
                    {characterMood === 'happy' ? (
                      <>
                        <Smile size={14} /> На душе стало теплее!
                      </>
                    ) : characterMood === 'hurt' ? (
                      <>
                        <Frown size={14} /> Слова ранили ещё сильнее...
                      </>
                    ) : (
                      <>
                        <span>😔</span> Нуждается в поддержке
                      </>
                    )}
                  </span>
                </div>
              </motion.div>

              {/* Character Speech Bubble */}
              <motion.div
                key={characterQuote}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 w-full p-3 rounded-2xl text-center text-xs sm:text-sm font-bold shadow-md border-2 transition-all ${
                  characterMood === 'happy'
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                    : characterMood === 'hurt'
                    ? 'bg-red-50 text-red-950 border-red-300'
                    : 'bg-white text-slate-800 border-amber-200'
                }`}
              >
                {characterQuote}
              </motion.div>
            </div>
          </div>

          {/* ================= RIGHT: INTERACTIVE PHRASE BUBBLES ================= */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-black text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
                <span>Выберите фразу для отправки в диалог:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Нажмите, чтобы проверить эффект
              </span>
            </div>

            <div className="space-y-2.5">
              {DIALOGUE_PHRASES.map((phrase) => {
                const isSelected = activePhraseId === phrase.id;
                const status = clickedPhrases[phrase.id];
                const isGood = phrase.type === 'good';

                return (
                  <button
                    key={phrase.id}
                    onClick={() => handlePhraseClick(phrase)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs select-none active:scale-[0.99] ${
                      isSelected
                        ? isGood
                          ? 'bg-emerald-50 border-emerald-500 ring-3 ring-emerald-300 shadow-md scale-[1.01]'
                          : 'bg-red-50 border-red-500 ring-3 ring-red-300 shadow-md scale-[1.01]'
                        : status === 'good'
                        ? 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-50'
                        : status === 'bad'
                        ? 'bg-red-50/60 border-red-300 hover:bg-red-50'
                        : 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl shrink-0">
                        {status === 'good' ? '💚' : status === 'bad' ? '💔' : isGood ? '💬' : '⚠️'}
                      </span>
                      <p className="font-bold text-sm sm:text-base text-[#172B4D] leading-snug">
                        {phrase.text}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {status === 'good' ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs shadow-xs flex items-center gap-1">
                          <CheckCircle2 size={13} /> Помог!
                        </span>
                      ) : status === 'bad' ? (
                        <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs shadow-xs flex items-center gap-1">
                          <XCircle size={13} /> Обидел!
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600">
                          Нажать 👉
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Victory banner when all 3 good phrases clicked */}
            {goodFoundCount === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 border-2 border-emerald-400 flex items-center gap-3 shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h5 className="font-brand font-black text-sm text-emerald-950">
                    🎉 Суперсила эмпатии активирована! (+20 баллов)
                  </h5>
                  <p className="text-xs text-emerald-900 font-semibold leading-tight">
                    Вы нашли все 3 фразы настоящей поддержки. Одноклассник больше не чувствует себя одиноким!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Golden Card: Superpower of Observer */}
      <div className="w-full bg-white border-3 border-[#007BFF] rounded-3xl p-4 sm:p-5 mb-6 shadow-md flex items-center gap-4">
        <div className="shrink-0 flex items-center justify-center">
          <Pixar3DIcon name="heart" size={52} />
        </div>
        <div>
          <span className="text-[11px] font-bold text-[#007BFF] uppercase tracking-wider">
            Золотое правило KIBERONE:
          </span>
          <h4 className="font-brand font-black text-base sm:text-lg text-[#172B4D]">
            СУПЕРСИЛА НАБЛЮДАТЕЛЯ — НЕ ОСТАВАТЬСЯ РАВНОДУШНЫМ!
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            Даже одно тёплое личное сообщение в силах вернуть человеку уверенность и остановить травлю.
          </p>
        </div>
      </div>

      {/* Robot Assistant speech - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
        <RobotAssistant
          state={goodFoundCount >= 3 ? 'happy' : characterMood === 'hurt' ? 'warning' : 'support'}
          size="dialog"
          speechPlacement="right"
          speech={
            goodFoundCount >= 3
              ? '«Браво! Твои слова поддержки защитили друга. Наблюдатели — это главная сила, которая может остановить хейтеров!»'
              : characterMood === 'hurt'
              ? '«Ой-ой! Фразы вроде "сам виноват" или "это шутка" делают жертве только больнее. Выбирай слова настоящей заботы!»'
              : '«Наблюдатели обладают огромной скрытой силой. Напиши человеку лично добрые слова — и ты спасешь его день!»'
          }
        />
      </div>

      {/* CTA To Superpowers Selection */}
      <button
        onClick={() => {
          sound.playSuccess();
          onCompleteMission();
        }}
        className="h-15 sm:h-16 px-9 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-base sm:text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border-2 border-[#FFD43B]"
      >
        <span>Перейти к финалу: «Собери своего защитника»</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
};

export default Screen6ObserverPower;

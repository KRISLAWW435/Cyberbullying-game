import React, { useState } from 'react';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  CheckCheck, 
  MessageSquare, 
  Sparkles, 
  AlertTriangle, 
  RotateCcw, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { sound } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Avatars
import avatarDasha from '../assets/images/avatar-dasha.jpg';
import avatarMaxim from '../assets/images/avatar-maxim.jpg';
import avatarLiza from '../assets/images/avatar-liza.jpg';
import avatarArtem from '../assets/images/avatar-artem.jpg';
import avatarSasha from '../assets/images/avatar-sasha.jpg';
import avatarKirill from '../assets/images/avatar-kirill.jpg';

interface Screen6ObserverPowerProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

interface ChatOption {
  id: string;
  isSupportive: boolean;
  text: string;
  characterReply: string;
  explanation: string;
}

interface ChatScenario {
  id: string;
  characterName: string;
  dativeName: string;
  avatar: string;
  badge: string;
  badgeColor: string;
  previewText: string;
  incomingMessage: string;
  options: ChatOption[];
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: 'dasha',
    characterName: 'Даша',
    dativeName: 'Даше',
    avatar: avatarDasha,
    badge: 'Оскорбления в чате',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    previewText: 'Привет... Ребята в классе опять обзываются в общем чате...',
    incomingMessage: 'Привет... Ребята в классе опять обзываются в общем чате. Я не хочу завтра идти в школу 😢',
    options: [
      {
        id: 'dasha-a',
        isSupportive: true,
        text: '«Я вижу, что тебе больно. Ты не одна, я с тобой. Давай завтра вместе подойдем к учителю.»',
        characterReply: 'Спасибо тебе огромное! С тобой мне уже не так страшно. Завтра встретимся перед уроком! ❤️',
        explanation: 'Ты проявил сочувствие («я вижу, что тебе больно») и предложил безопасное действие вместе со взрослыми.'
      },
      {
        id: 'dasha-b',
        isSupportive: false,
        text: '«Может, ты сама их как-то спровоцировала?»',
        characterReply: 'Почему ты думаешь, что я виновата? Я просто сидела за партой и ничего им не делала... 😭',
        explanation: 'Обвинение жертвы (виктимблейминг). Тот, кого травят, никогда не виноват в чужой агрессии!'
      },
      {
        id: 'dasha-c',
        isSupportive: false,
        text: '«Да забей, это же просто шутки. Не обращай внимания.»',
        characterReply: 'Легко сказать "забей", когда обзывают не тебя... Мне очень обидно и горько. 💔',
        explanation: 'Фраза «это просто шутка» обесценивает чужую боль и заставляет человека замкнуться в себе.'
      }
    ]
  },
  {
    id: 'maxim',
    characterName: 'Максим',
    dativeName: 'Максиму',
    avatar: avatarMaxim,
    badge: 'Изоляция и бойкот',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    previewText: 'Они создали новый чат без меня и присылают скрины...',
    incomingMessage: 'Они создали новый чат без меня и присылают скрины, как они там обо мне шутят. Очень обидно 🥺',
    options: [
      {
        id: 'maxim-a',
        isSupportive: true,
        text: '«Это очень некрасиво с их стороны. Ты классный, не слушай их. Хочешь, поиграем сегодня вместе?»',
        characterReply: 'Давай! Ты настоящий друг. Твои слова очень помогли мне отвлечься от обиды! 🎮✨',
        explanation: 'Ты разрушил стену изоляции, поддержал самооценку друга и предложил совместное дело.'
      },
      {
        id: 'maxim-b',
        isSupportive: false,
        text: '«Создай свой чат и назло им тоже что-нибудь напиши.»',
        characterReply: 'Но тогда я стану таким же злым, как они... Это только усилит войну. 😔',
        explanation: 'Отвечать агрессией на агрессию — значит подливать бензин в огонь. Конфликт только вырастет.'
      },
      {
        id: 'maxim-c',
        isSupportive: false,
        text: '«Ну, значит, они не хотят с тобой дружить. Найди себе других.»',
        characterReply: 'Звучит так, будто я какой-то бракованный и лишний... Спасибо за "поддержку"... 😞',
        explanation: 'Равнодушие ранит не меньше буллинга. Другу сейчас нужна эмоциональная опора, а не поучения.'
      }
    ]
  },
  {
    id: 'liza',
    characterName: 'Лиза',
    dativeName: 'Лизе',
    avatar: avatarLiza,
    badge: 'Слухи и мемы',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    previewText: 'Кто-то взял мое фото и сделал ужасный мем...',
    incomingMessage: 'Кто-то взял мое фото и сделал ужасный мем, а теперь кинул в общий чат. Все смеются... Я хочу удалить все соцсети 😭',
    options: [
      {
        id: 'liza-a',
        isSupportive: true,
        text: '«Это называется травля. Не удаляй ничего, сделай скриншот. Давай покажем это наставнику или родителям!»',
        characterReply: 'Ты права! Я заскринила публикацию и имена авторов. Сейчас покажу маме и наставнику! 🛡️❤️',
        explanation: 'Ты назвал вещи своими именами, остановил панику и напомнил главное правило — сохранить улики.'
      },
      {
        id: 'liza-b',
        isSupportive: false,
        text: '«Просто скажи им, что это не смешно.»',
        characterReply: 'Они только громче смеются, когда видят, как я злюсь и прошу прекратить... 😢',
        explanation: 'Обидчики питаются эмоциональной реакцией. Прямые споры с толпой в чате редко работают в одиночку.'
      },
      {
        id: 'liza-c',
        isSupportive: false,
        text: '«Удаляй скорее, пока родители не увидели!»',
        characterReply: 'Если я удалю профиль, мем всё равно останется в сети, а у меня не будет доказательств... 💔',
        explanation: 'Удаление профиля не удалит файл у обидчиков, зато уничтожит доказательства для разбирательства со взрослыми.'
      }
    ]
  },
  {
    id: 'artem',
    characterName: 'Артём',
    dativeName: 'Артёму',
    avatar: avatarArtem,
    badge: 'Взлом и вымогательство',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    previewText: 'Ребята из параллельного класса взломали мой игровой аккаунт...',
    incomingMessage: 'Ребята из параллельного класса взломали мой игровой аккаунт. Они пишут, что если я не отдам им свои скины и не переведу денег на игровую карту, они удалят мой прогресс и будут писать гадости моим друзьям. Я боюсь говорить родителям, они меня отругают 😨',
    options: [
      {
        id: 'artem-a',
        isSupportive: true,
        text: '«Это вымогательство и взлом. Ни в коем случае не отдавай ничего! Сделай скриншоты и СРОЧНО покажи родителям — вместе вы решите эту проблему. Ты не виноват!»',
        characterReply: 'Спасибо! Я перестал паниковать. Сейчас покажу всё папе, ведь взлом — это серьёзное нарушение. Спасибо за поддержку! 🛡️🙌',
        explanation: 'Ты дал единственно верный совет: не поддаваться на шантаж и вымогательство, сохранить улики и сразу обратиться к родителям.'
      },
      {
        id: 'artem-b',
        isSupportive: false,
        text: '«Отдай им скины, это же просто игра. Зато они от тебя отстанут.»',
        characterReply: 'Они забрали мои редкие скины, но теперь требуют ещё больше денег на карту... Они не отстают! 😭',
        explanation: 'Уступка вымогателям никогда их не останавливает — аппетиты агрессоров только растут.'
      },
      {
        id: 'artem-c',
        isSupportive: false,
        text: '«Просто создай новый аккаунт и никому не говори.»',
        characterReply: 'Но они продолжают писать гадости моим друзьям с моего старого профиля... 💔',
        explanation: 'Уход от проблемы не решает её: злоумышленники продолжают использовать украденный аккаунт во вред.'
      }
    ]
  },
  {
    id: 'sasha',
    characterName: 'Саша',
    dativeName: 'Саше',
    avatar: avatarSasha,
    badge: 'Слив личной тайны',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    previewText: 'Я поделился с одноклассником секретом, а он переслал всё в общий чат...',
    incomingMessage: 'Я поделился с одноклассником личным секретом в переписке, а он переслал мои сообщения в общий классный чат. Теперь надо мной все смеются и показывают пальцем в коридоре. Мне так стыдно, не знаю, как завтра идти в школу... 😢',
    options: [
      {
        id: 'sasha-a',
        isSupportive: true,
        text: '«Это подлость, но ты не виноват. Давай расскажем учителю или родителям, чтобы это прекратить.»',
        characterReply: 'Спасибо за эти слова... Мне казалось, что я сам во всём виноват. Ты настоящий друг, я обязательно поговорю с мамой! ❤️',
        explanation: 'Прекрасный ответ! Ты снял ложное чувство вины с пострадавшего и предложил опереться на помощь взрослых.'
      },
      {
        id: 'sasha-b',
        isSupportive: false,
        text: '«Сам виноват, в интернете вообще никому нельзя доверять.»',
        characterReply: 'Мне и так невероятно тяжело, а ты меня ещё сильнее добиваешь... 💔',
        explanation: 'Обвинение пострадавшего (виктимблейминг) заставляет человека замкнуться в себе и бояться просить о помощи.'
      },
      {
        id: 'sasha-c',
        isSupportive: false,
        text: '«Перешли всем его секреты в ответ, пусть знает, каково это!»',
        characterReply: 'Но тогда я опущусь до его уровня и стану таким же предателем... Это не выход. 😔',
        explanation: 'Месть только умножает травлю и вовлекает ещё больше людей в опасный конфликт.'
      }
    ]
  },
  {
    id: 'kirill',
    characterName: 'Кирилл',
    dativeName: 'Кириллу',
    avatar: avatarKirill,
    badge: 'Травля в голосовом чате',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    previewText: 'Мы играли в онлайн-игру, и ребята начали обзывать меня в голосовом чате...',
    incomingMessage: 'Мы играли в онлайн-игру, и ребята из класса начали в голосовом чате обзывать меня и смеяться над моим голосом. Они даже записали меня на диктофон и пересылают друг другу. Я больше не хочу играть 😭',
    options: [
      {
        id: 'kirill-a',
        isSupportive: true,
        text: '«Это травля. Не отвечай им, выключи микрофон, заблокируй обидчиков в игре и расскажи об этом родителям или наставнику. Твой голос — это нормально.»',
        characterReply: 'Спасибо! Я выключил микрофон и заблокировал их. Мне уже не так обидно, пойду поиграю в другую игру.',
        explanation: 'Отличный совет: выйти из токсичного голосового чата, поставить блокировку и опереться на поддержку близких.'
      },
      {
        id: 'kirill-b',
        isSupportive: false,
        text: '«Просто не включай микрофон, играй молча. Само пройдет.»',
        characterReply: 'Но они продолжают рассылать ту аудиозапись по другим чатам... Само ничего не проходит. 😔',
        explanation: 'Совет "терпеть молча" оставляет жертву один на один с травлей. Самостоятельно буллинг не прекращается.'
      },
      {
        id: 'kirill-c',
        isSupportive: false,
        text: '«Запиши их голоса в ответ и выложи куда-нибудь, чтобы им было стыдно.»',
        characterReply: 'Но тогда я сам стану таким же нарушителем... Это только разожжет ещё большую войну. 💔',
        explanation: 'Месть аудиозаписями делает тебя участником травли и нарушает закон о тайне частной жизни.'
      }
    ]
  }
];

export const Screen6ObserverPower: React.FC<Screen6ObserverPowerProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  // Navigation: active chat or null (chat list)
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  // Completed status per chat scenario: 'success' | 'failed'
  const [chatStatus, setChatStatus] = useState<Record<string, 'success' | 'failed'>>({});

  // Active chat state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [characterResponse, setCharacterResponse] = useState<string | null>(null);
  const [responseExplanation, setResponseExplanation] = useState<string | null>(null);
  const [isLastChoiceSupportive, setIsLastChoiceSupportive] = useState<boolean | null>(null);

  // Pedagogical scoring: 6 unique solved chats = 100 points
  const [resolvedScenarios, setResolvedScenarios] = useState<string[]>([]);
  const [hasActivePenalty, setHasActivePenalty] = useState<boolean>(false);
  const [showHeartBurst, setShowHeartBurst] = useState<boolean>(false);

  // Calculated empathy score (scaled across 6 chats to reach 100%, penalty -10 on mistake)
  const baseScore = Math.round((resolvedScenarios.length / CHAT_SCENARIOS.length) * 100);
  const empathyScore = hasActivePenalty ? Math.max(0, baseScore - 10) : baseScore;

  // Open a chat
  const handleOpenChat = (scenarioId: string) => {
    sound.playClick();
    setActiveScenarioId(scenarioId);
    setSelectedOptionId(null);
    setIsTyping(false);
    setCharacterResponse(null);
    setResponseExplanation(null);
    setIsLastChoiceSupportive(null);
  };

  // Back to chat list
  const handleBackToList = () => {
    sound.playClick();
    setActiveScenarioId(null);
    setSelectedOptionId(null);
    setIsTyping(false);
    setCharacterResponse(null);
    setHasActivePenalty(false);
  };

  // User chooses a response
  const handleSelectOption = (scenario: ChatScenario, option: ChatOption) => {
    if (selectedOptionId) return; // Prevent double click
    sound.playClick();

    setSelectedOptionId(option.id);
    setIsTyping(true);

    // Simulate character typing reaction (1000ms)
    setTimeout(() => {
      setIsTyping(false);
      setCharacterResponse(option.characterReply);
      setResponseExplanation(option.explanation);
      setIsLastChoiceSupportive(option.isSupportive);

      if (option.isSupportive) {
        sound.playSuccess();
        setChatStatus((prev) => ({ ...prev, [scenario.id]: 'success' }));
        setHasActivePenalty(false);

        // Hearts burst animation
        setShowHeartBurst(true);
        setTimeout(() => setShowHeartBurst(false), 2000);

        // If newly resolved scenario
        if (!resolvedScenarios.includes(scenario.id)) {
          const nextResolved = [...resolvedScenarios, scenario.id];
          setResolvedScenarios(nextResolved);
          onAddScore(20);

          // All 6 scenarios completed!
          if (nextResolved.length === CHAT_SCENARIOS.length) {
            sound.playPowerUp();
            confetti({
              particleCount: 100,
              spread: 85,
              origin: { y: 0.6 }
            });
          }
        }
      } else {
        sound.playAlert();
        setChatStatus((prev) => ({ ...prev, [scenario.id]: 'failed' }));
        setHasActivePenalty(true);
      }
    }, 1000);
  };

  // Retry active chat
  const handleRetryCurrentChat = () => {
    sound.playClick();
    setSelectedOptionId(null);
    setIsTyping(false);
    setCharacterResponse(null);
    setResponseExplanation(null);
    setIsLastChoiceSupportive(null);
  };

  const activeScenario = CHAT_SCENARIOS.find((s) => s.id === activeScenarioId);

  // Dynamic status text for empathy thermometer
  const getThermometerStatusText = (score: number) => {
    if (score >= 100) return '✨ Вы — Легендарный защитник!';
    if (score >= 70) return '🔥 Горячая поддержка!';
    if (score >= 20) return '💛 Теплеет! Продолжайте в том же духе';
    return 'Начните диалог, чтобы согреть сердце';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center pb-20 select-none">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold text-xs sm:text-sm mb-2">
        <Heart size={16} />
        <span>МИССИЯ №4: СИЛА НАБЛЮДАТЕЛЯ</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-3xl text-[#172B4D] text-center mb-1">
        СИМУЛЯТОР: <span className="text-[#007BFF]">МЕССЕНДЖЕР ПОДДЕРЖКИ</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 font-semibold text-center max-w-2xl mb-4">
        Все сценарии — это реальные ситуации кибербуллинга между сверстниками. Помогите всем 6 одноклассникам и доведите шкалу до 100%!
      </p>

      {/* Completion Banner (when all 6 are saved / 100%) */}
      {empathyScore >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-2 border-yellow-300"
        >
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles size={26} className="text-yellow-300 animate-spin" />
            </div>
            <div>
              <h4 className="font-brand font-black text-lg sm:text-xl leading-tight">
                🎉 Вы спасли всех! Шкала заполнена на 100%!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100 font-semibold mt-0.5">
                Вы проявили настоящую заботу и защитили всех 6 друзей от буллинга. Суперсила эмпатии полностью активирована!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              confetti({ particleCount: 80, spread: 85, origin: { y: 0.6 } });
            }}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs shrink-0 cursor-pointer transition-all border border-white/30 shadow-xs"
          >
            Запустить салют 🎊
          </button>
        </motion.div>
      )}

      {/* 
        ========================================================================
        ВИД 1: ГЛАВНЫЙ ЭКРАН — СПИСОК 6 ЧАТОВ (СЕТКА 3 КОЛОНКИ БЕЗ БЕЛЫХ ДЫР)
        ========================================================================
      */}
      {!activeScenario ? (
        <div className="w-full">
          {/* Header Bar with Empathy Progress */}
          <div className="w-full bg-white border-2 border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 flex items-center justify-center shadow-xs shrink-0">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Pixar3DIcon name="heart" size={24} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-brand font-black text-sm sm:text-base text-[#172B4D]">
                    Шкала поддержки: {empathyScore} / 100
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    {resolvedScenarios.length} из 6 спасено
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 truncate">
                  {getThermometerStatusText(empathyScore)}
                </p>
              </div>
            </div>

            {/* Progress Fill */}
            <div className="w-full sm:w-60 h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 shrink-0">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${empathyScore}%` }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B9E] via-[#FF8E53] to-[#FFD43B]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="font-brand font-black text-xs sm:text-sm text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={15} className="text-[#007BFF]" />
              <span>Входящие сообщения от 6 одноклассников:</span>
            </span>
            <span className="text-xs font-bold text-slate-400">Нажмите на контакт</span>
          </div>

          {/* 
            Сетка 6 карточек: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
            Имена НЕ обрезаются (whitespace-nowrap), карточки компактные и аккуратные
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {CHAT_SCENARIOS.map((scenario) => {
              const status = chatStatus[scenario.id];
              const isResolved = status === 'success';
              const isFailed = status === 'failed';

              return (
                <button
                  key={scenario.id}
                  onClick={() => handleOpenChat(scenario.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3.5 shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden bg-white ${
                    isResolved
                      ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-200'
                      : isFailed
                      ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-200'
                      : 'hover:bg-blue-50/40 border-slate-200 hover:border-[#007BFF]'
                  }`}
                >
                  {/* Circular 3D Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={scenario.avatar}
                      alt={scenario.characterName}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover shadow-xs border-2 border-white ring-2 ring-slate-100"
                    />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="В сети" />
                  </div>

                  {/* Info: whitespace-nowrap guarantees full name is visible */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-brand font-black text-base text-[#172B4D] whitespace-nowrap">
                        {scenario.characterName}
                      </h4>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${scenario.badgeColor} shrink-0`}>
                        {scenario.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium truncate mb-1">
                      {scenario.previewText}
                    </p>

                    {/* Status Pill */}
                    <div className="flex items-center gap-1.5">
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
                          <CheckCircle2 size={12} /> Помощь оказана (+20)
                        </span>
                      ) : isFailed ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg">
                          <AlertTriangle size={12} /> Попробуй снова!
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Ждёт ответа...
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* 
          ========================================================================
          ВИД 2: ОТКРЫТЫЙ МЕССЕНДЖЕР + ВЕРТИКАЛЬНЫЙ ТЕРМОМЕТР СПРАВА
          ========================================================================
        */
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Левая колонка: Окно переписки */}
          <div className="lg:col-span-8 xl:col-span-9 w-full bg-white border-2 border-slate-200 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-[#172B4D] text-white p-3.5 sm:p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Назад ко всем чатам"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="relative">
                  <img
                    src={activeScenario.avatar}
                    alt={activeScenario.characterName}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-white/50"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border border-white" />
                </div>

                <div>
                  <h4 className="font-brand font-black text-base sm:text-lg leading-tight">
                    {activeScenario.characterName}
                  </h4>
                  <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    {isTyping ? (
                      <span className="animate-pulse text-amber-300 font-bold">печатает сообщение...</span>
                    ) : (
                      <span>в сети</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full border bg-white/10 border-white/20 text-white shrink-0`}>
                  {activeScenario.badge}
                </span>
                <button
                  onClick={handleBackToList}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer hidden sm:flex items-center gap-1"
                >
                  Все чаты ({resolvedScenarios.length}/6)
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="bg-[#F0F4F8] p-4 sm:p-6 min-h-[300px] flex flex-col justify-end space-y-4">
              <div className="flex justify-center mb-2">
                <span className="text-[11px] font-bold text-slate-500 bg-slate-200/80 px-3 py-0.5 rounded-full">
                  Сегодня
                </span>
              </div>

              {/* 1. INCOMING MESSAGE */}
              <div className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]">
                <img
                  src={activeScenario.avatar}
                  alt={activeScenario.characterName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-xs"
                />
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 sm:p-4 shadow-sm text-slate-800">
                  <div className="text-[11px] font-black text-[#007BFF] mb-1">
                    {activeScenario.characterName}
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-relaxed">
                    {activeScenario.incomingMessage}
                  </p>
                  <div className="text-right text-[10px] text-slate-400 mt-1 font-medium">
                    15:42
                  </div>
                </div>
              </div>

              {/* 2. OUTGOING MESSAGE */}
              {selectedOptionId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end justify-end gap-2 self-end max-w-[85%] sm:max-w-[75%]"
                >
                  <div className="bg-[#007BFF] text-white rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-md">
                    <p className="text-sm sm:text-base font-semibold leading-relaxed">
                      {activeScenario.options.find((o) => o.id === selectedOptionId)?.text}
                    </p>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-blue-100 mt-1 font-medium">
                      <span>15:43</span>
                      <CheckCheck size={14} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. TYPING INDICATOR */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/80 border border-slate-200 px-3 py-2 rounded-2xl w-max"
                >
                  <div className="flex gap-1 items-center px-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                  </div>
                  <span>{activeScenario.characterName} печатает...</span>
                </motion.div>
              )}

              {/* 4. CHARACTER RESPONSE MESSAGE */}
              {characterResponse && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%]"
                >
                  <img
                    src={activeScenario.avatar}
                    alt={activeScenario.characterName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-xs"
                  />
                  <div className={`border-2 rounded-2xl rounded-tl-xs p-3.5 sm:p-4 shadow-md ${
                    isLastChoiceSupportive
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-red-50 border-red-400 text-red-950'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-black">
                        {activeScenario.characterName}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isLastChoiceSupportive
                          ? 'bg-emerald-200 text-emerald-800'
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {isLastChoiceSupportive ? '❤️ Стало легче' : '💔 Стало больнее'}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold leading-relaxed">
                      {characterResponse}
                    </p>
                    <div className="text-right text-[10px] text-slate-400 mt-1 font-medium">
                      15:43
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Options Area */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200">
              {!selectedOptionId ? (
                <div>
                  <div className="text-xs font-black text-[#172B4D] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Send size={14} className="text-[#007BFF]" />
                    <span>Как ты ответишь {activeScenario.dativeName}? Выбери вариант:</span>
                  </div>

                  <div className="space-y-2.5">
                    {activeScenario.options.map((option, idx) => {
                      const letters = ['А', 'Б', 'В'];
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(activeScenario, option)}
                          className="w-full p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 hover:border-[#007BFF] bg-slate-50 hover:bg-blue-50/50 text-left transition-all cursor-pointer flex items-center gap-3.5 shadow-xs hover:shadow-sm active:scale-[0.99]"
                        >
                          <span className="w-7 h-7 rounded-xl bg-white border border-slate-300 font-brand font-black text-xs text-[#172B4D] flex items-center justify-center shrink-0 shadow-xs">
                            {letters[idx]}
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-[#172B4D] leading-snug flex-1">
                            {option.text}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Educational Feedback & Next Steps */
                <div className="space-y-3">
                  {responseExplanation && (
                    <div className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-semibold leading-relaxed flex items-start gap-3 ${
                      isLastChoiceSupportive
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-amber-50 border-amber-300 text-amber-950'
                    }`}>
                      {isLastChoiceSupportive ? (
                        <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong className="block font-brand font-black text-sm mb-1 leading-snug">
                          {isLastChoiceSupportive
                            ? '🌟 Отличный ответ настоящего защитника!'
                            : '⚠️ Этот ответ не помог, стало грустнее (-10). Ошибаться — это нормально! Нажмите «Попробовать другой ответ», чтобы поддержать друга!'}
                        </strong>
                        <span className="text-slate-700 block mt-1">
                          {responseExplanation}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    {!isLastChoiceSupportive && (
                      <button
                        onClick={handleRetryCurrentChat}
                        className="px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <RotateCcw size={15} />
                        <span>Попробовать другой ответ</span>
                      </button>
                    )}

                    <button
                      onClick={handleBackToList}
                      className="px-5 py-2.5 rounded-xl bg-[#172B4D] hover:bg-slate-800 text-white font-brand font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ml-auto shadow-sm"
                    >
                      <span>Вернуться ко всем чатам</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка: Вертикальный стройный термометр поддержки */}
          <div className="lg:col-span-4 xl:col-span-3 w-full flex flex-col items-center">
            <div className="w-full max-w-[240px] bg-white border-3 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col items-center text-center sticky top-8 relative overflow-hidden">
              
              {/* Bursting Hearts Animation on correct answer */}
              <AnimatePresence>
                {showHeartBurst && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 0, 
                          y: 190, 
                          x: (i % 2 === 0 ? 1 : -1) * (6 + i * 8), 
                          scale: 0.5 
                        }}
                        animate={{ 
                          opacity: [0, 1, 1, 0], 
                          y: -50 - i * 18, 
                          x: (i % 2 === 0 ? 1 : -1) * (14 + i * 10), 
                          scale: [0.5, 1.25, 0.8] 
                        }}
                        transition={{ duration: 1.6, delay: i * 0.12, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 text-xl"
                      >
                        {i % 3 === 0 ? '💖' : i % 3 === 1 ? '✨' : '❤️'}
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Header Badge */}
              <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                <Sparkles size={14} className="text-amber-500" />
                <span>Термометр</span>
              </div>
              <h4 className="font-brand font-black text-sm sm:text-base text-[#172B4D] mb-1">
                Шкала поддержки
              </h4>

              {/* Score Readout (0 / 100) */}
              <div className="my-1.5 px-3.5 py-1 rounded-2xl bg-gradient-to-r from-pink-50 to-amber-50 border border-pink-200/80 shadow-xs">
                <span className="font-brand font-black text-2xl text-[#172B4D]">
                  {empathyScore}
                </span>
                <span className="font-bold text-xs text-slate-400"> / 100</span>
              </div>

              {/* Slender Thermometer Tube (w-16 = 64px) */}
              <div className="relative w-16 sm:w-18 h-72 sm:h-80 bg-slate-100 rounded-full border-3 border-slate-200 p-1.5 flex flex-col justify-end overflow-visible shadow-inner my-2">
                
                {/* Graduation marks on the side */}
                <div className="absolute inset-y-4 right-1 flex flex-col justify-between text-[9px] font-black text-slate-400 select-none pointer-events-none pr-0.5">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>

                {/* Liquid Filling Bar growing from bottom to top */}
                <motion.div
                  initial={{ height: '0%' }}
                  animate={{ height: `${empathyScore}%` }}
                  transition={{ type: 'spring', stiffness: 70, damping: 14 }}
                  className="w-full rounded-full bg-gradient-to-t from-[#FF6B9E] via-[#FF8E53] to-[#FFD43B] relative shadow-sm"
                />

                {/* Prominent 3D Heart Indicator smoothly gliding on meniscus */}
                <motion.div
                  initial={{ bottom: '0%' }}
                  animate={{ bottom: `${empathyScore}%` }}
                  transition={{ type: 'spring', stiffness: 70, damping: 14 }}
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center"
                  style={{ marginBottom: '-20px' }}
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-xl border-2 border-amber-300 flex items-center justify-center animate-pulse">
                    <Pixar3DIcon name="heart" size={30} />
                  </div>
                </motion.div>
              </div>

              {/* Dynamic Status Text */}
              <div className="mt-2 text-xs font-bold leading-tight min-h-[32px] flex items-center justify-center px-1">
                <span className={`${
                  empathyScore >= 100
                    ? 'text-emerald-600 font-black'
                    : empathyScore >= 70
                    ? 'text-amber-700 font-black'
                    : empathyScore >= 20
                    ? 'text-amber-600 font-bold'
                    : 'text-slate-500 font-semibold'
                }`}>
                  {getThermometerStatusText(empathyScore)}
                </span>
              </div>

              {/* Mechanics Hint */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-500 font-semibold leading-relaxed">
                <span className="text-emerald-600 font-bold">Поддержано:</span> {resolvedScenarios.length} из 6<br />
                <span className="text-red-500 font-bold">-10</span> за обидные слова
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        ЗОЛОТОЕ ПРАВИЛО НАБЛЮДАТЕЛЯ: СЛЕДУЕТ СРАЗУ ЗА КАРТОЧКАМИ (mt-6 sm:mt-8)
        НИКАКИХ ПУСТЫХ ДЫР ИЛИ ЖЕСТКОЙ ВЫСОТЫ!
        ========================================================================
      */}
      <div className="w-full bg-white border-3 border-[#007BFF] rounded-3xl p-4 sm:p-5 mt-6 sm:mt-8 mb-6 shadow-md flex items-center gap-4">
        <div className="shrink-0 flex items-center justify-center">
          <Pixar3DIcon name="heart" size={52} />
        </div>
        <div>
          <span className="text-[11px] font-bold text-[#007BFF] uppercase tracking-wider">
            Золотое правило наблюдателя KIBERONE:
          </span>
          <h4 className="font-brand font-black text-base sm:text-lg text-[#172B4D]">
            СУПЕРСИЛА НАБЛЮДАТЕЛЯ — НЕ ОСТАВАТЬСЯ РАВНОДУШНЫМ!
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            Когда в классе хотя бы один человек пишет в личку слова поддержки и не боится идти к взрослым — травля не имеет шансов.
          </p>
        </div>
      </div>

      {/* Robot Assistant speech - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
        <RobotAssistant
          state={empathyScore >= 100 ? 'happy' : empathyScore > 0 ? 'support' : 'thinking'}
          size="dialog"
          speechPlacement="right"
          speech={
            empathyScore >= 100
              ? '«Блестяще! Термометр эмпатии раскален до 100%! Вы спасли всех шестерых друзей от буллинга!»'
              : empathyScore > 0
              ? '«Отличный темп! Шкала поддержки наполняется. Помните: обидные слова охлаждают шкалу на -10 баллов!»'
              : '«Наблюдатели — главная сила против буллинга! Откройте чаты с Дашей, Максимом, Лизой, Артёмом, Сашей и Кириллом и согрейте шкалу до 100 баллов.»'
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

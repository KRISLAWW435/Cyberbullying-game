import React, { useState, useRef, useEffect, useCallback } from 'react';
import { STOP_CRANE_STEPS } from '../data/courseData';
import { RobotAssistant } from '../components/RobotAssistant';
import { Pixar3DIcon } from '../components/Pixar3DIcon';
import { CyberIcon } from '../components/CyberIcons';
import { 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  Check, 
  MousePointerClick
} from 'lucide-react';
import { sound } from '../utils/audio';

interface Screen5StopCraneProps {
  onCompleteMission: () => void;
  onAddScore: (points: number) => void;
}

interface ActionCard {
  id: number;
  text: string;
}

const ACTION_CARDS: ActionCard[] = [
  { 
    id: 1, 
    text: 'Остановиться и не отвечать на агрессию' 
  },
  { 
    id: 2, 
    text: 'Сохранить скриншоты сообщений и доказательства' 
  },
  { 
    id: 3, 
    text: 'Заблокировать обидчика и нажать «Пожаловаться»' 
  },
  { 
    id: 4, 
    text: 'Рассказать и показать переписку взрослым' 
  },
  { 
    id: 5, 
    text: 'Не винить себя и не отдавать личные данные' 
  }
];

// Fixed scrambled order for right column
const SCRAMBLED_ACTION_IDS = [3, 1, 5, 2, 4];

const CONNECTION_COLORS: Record<number, string> = {
  1: '#007BFF', // Blue
  2: '#E65100', // Orange
  3: '#10B981', // Green
  4: '#8B5CF6', // Purple
  5: '#D97706', // Amber
};

interface Connection {
  stepId: number;
  actionId: number;
  color: string;
}

interface Point {
  x: number;
  y: number;
}

export const Screen5StopCrane: React.FC<Screen5StopCraneProps> = ({
  onCompleteMission,
  onAddScore
}) => {
  const [selectedStepId, setSelectedStepId] = useState<number | null>(1);
  
  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartStepId, setDragStartStepId] = useState<number | null>(null);
  const [dragStartPoint, setDragStartPoint] = useState<Point | null>(null);
  const [dragCurrentPoint, setDragCurrentPoint] = useState<Point | null>(null);

  // Click-to-connect fallback states
  const [activeStepSelection, setActiveStepSelection] = useState<number | null>(null);

  // Confirmed connections
  const [connections, setConnections] = useState<Connection[]>([]);
  // Temporary wrong connection line for animation
  const [wrongLine, setWrongLine] = useState<{ stepId: number; actionId: number } | null>(null);
  const [isAssemblyVerified, setIsAssemblyVerified] = useState(false);
  const [hasAwardedPoints, setHasAwardedPoints] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Container & Coordinates
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ [key: string]: { start: Point; end: Point; color: string } }>({});

  const updateCoordinates = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newCoords: { [key: string]: { start: Point; end: Point; color: string } } = {};

    connections.forEach((conn) => {
      const stepDot = document.getElementById(`step-dot-${conn.stepId}`);
      const actionDot = document.getElementById(`action-dot-${conn.actionId}`);

      if (stepDot && actionDot) {
        const stepRect = stepDot.getBoundingClientRect();
        const actionRect = actionDot.getBoundingClientRect();

        newCoords[`${conn.stepId}-${conn.actionId}`] = {
          start: {
            x: stepRect.left + stepRect.width / 2 - containerRect.left,
            y: stepRect.top + stepRect.height / 2 - containerRect.top
          },
          end: {
            x: actionRect.left + actionRect.width / 2 - containerRect.left,
            y: actionRect.top + actionRect.height / 2 - containerRect.top
          },
          color: conn.color
        };
      }
    });

    if (wrongLine) {
      const stepDot = document.getElementById(`step-dot-${wrongLine.stepId}`);
      const actionDot = document.getElementById(`action-dot-${wrongLine.actionId}`);
      if (stepDot && actionDot) {
        const stepRect = stepDot.getBoundingClientRect();
        const actionRect = actionDot.getBoundingClientRect();
        newCoords['wrong'] = {
          start: {
            x: stepRect.left + stepRect.width / 2 - containerRect.left,
            y: stepRect.top + stepRect.height / 2 - containerRect.top
          },
          end: {
            x: actionRect.left + actionRect.width / 2 - containerRect.left,
            y: actionRect.top + actionRect.height / 2 - containerRect.top
          },
          color: '#EF4444'
        };
      }
    }

    setLineCoords(newCoords);
  }, [connections, wrongLine]);

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    const timer = setTimeout(updateCoordinates, 50);
    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearTimeout(timer);
    };
  }, [updateCoordinates]);

  // Check if step and action match
  const verifyMatch = (stepId: number, actionId: number) => {
    if (stepId === actionId) {
      // Correct Match!
      sound.playSuccess();
      const newConnection: Connection = {
        stepId,
        actionId,
        color: CONNECTION_COLORS[stepId] || '#10B981'
      };

      const updated = [...connections, newConnection];
      setConnections(updated);
      setActiveStepSelection(null);
      setWrongLine(null);

      if (updated.length === 5) {
        sound.playPowerUp();
        setFeedbackMessage('🎉 Блестяще! Все 5 стрелок соединены точно и правильно!');
      } else {
        setFeedbackMessage(`✅ Отлично! Шаг #${stepId} соединен со своим действием!`);
      }
    } else {
      // Incorrect Match!
      sound.playAlert();
      setWrongLine({ stepId, actionId });
      setActiveStepSelection(null);
      setFeedbackMessage('❌ Это действие не подходит к выбранному шагу. Попробуйте еще раз!');

      setTimeout(() => {
        setWrongLine(null);
      }, 1000);
    }
  };

  // POINTER DOWN: Start drag on left step card
  const handleStepPointerDown = (e: React.PointerEvent, stepId: number) => {
    // If already connected, just allow reading the step info
    if (connections.some((c) => c.stepId === stepId)) {
      sound.playClick();
      setSelectedStepId(stepId);
      return;
    }

    sound.playClick();
    setSelectedStepId(stepId);
    setActiveStepSelection(stepId);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dot = document.getElementById(`step-dot-${stepId}`);

      let startX = e.clientX - containerRect.left;
      let startY = e.clientY - containerRect.top;

      if (dot) {
        const dotRect = dot.getBoundingClientRect();
        startX = dotRect.left + dotRect.width / 2 - containerRect.left;
        startY = dotRect.top + dotRect.height / 2 - containerRect.top;
      }

      setIsDragging(true);
      setDragStartStepId(stepId);
      setDragStartPoint({ x: startX, y: startY });
      setDragCurrentPoint({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      });
      setFeedbackMessage('Тяните стрелку к правильному действию справа!');
    }
  };

  // POINTER MOVE: Update current dragging point coordinates
  const handleContainerPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current || !dragStartPoint) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setDragCurrentPoint({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top
    });
  };

  // POINTER UP: Drop line or finish connection
  const handleContainerPointerUp = (e: React.PointerEvent) => {
    if (isDragging && dragStartStepId !== null) {
      // Find element under pointer point (works on mouse & touch screens!)
      const targetElem = document.elementFromPoint(e.clientX, e.clientY);
      const actionCardElem = targetElem?.closest('[data-action-id]');
      const actionIdAttr = actionCardElem?.getAttribute('data-action-id');

      if (actionIdAttr) {
        const targetActionId = parseInt(actionIdAttr, 10);
        verifyMatch(dragStartStepId, targetActionId);
      } else {
        // Released in empty area: keep step selected for click fallback, but stop dragging line
        setFeedbackMessage('👉 Выберите действие справа или протяните стрелку заново.');
      }
    }

    setIsDragging(false);
    setDragStartStepId(null);
    setDragStartPoint(null);
    setDragCurrentPoint(null);
  };

  // CLICK FALLBACK on Right Action Card
  const handleActionClick = (actionId: number) => {
    if (connections.some((c) => c.actionId === actionId)) {
      return;
    }

    sound.playClick();

    if (activeStepSelection !== null) {
      verifyMatch(activeStepSelection, actionId);
    } else {
      setFeedbackMessage('👉 Сначала нажмите на шаг слева или потяните от него стрелку!');
    }
  };

  // Full verification and score awarding
  const handleVerifyAssembly = () => {
    if (connections.length === 5) {
      sound.playPowerUp();
      setIsAssemblyVerified(true);
      setFeedbackMessage('🎉 Ура! Все 5 пар соединены идеально, суперсила активирована!');
      if (!hasAwardedPoints) {
        onAddScore(25);
        setHasAwardedPoints(true);
      }
    } else {
      sound.playAlert();
      setFeedbackMessage(`⚠️ Соедините все 5 шагов стрелками (соединено: ${connections.length} из 5)!`);
    }
  };

  // Reset all connections
  const handleResetLines = () => {
    sound.playClick();
    setConnections([]);
    setIsDragging(false);
    setDragStartStepId(null);
    setDragStartPoint(null);
    setDragCurrentPoint(null);
    setActiveStepSelection(null);
    setWrongLine(null);
    setIsAssemblyVerified(false);
    setFeedbackMessage(null);
  };

  const isAllConnected = connections.length === 5;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center pb-20 select-none">
      {/* Stage Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-300 text-red-600 font-bold text-xs sm:text-sm mb-2">
        <ShieldAlert size={16} />
        <span>МИССИЯ №3: СУПЕРСИЛА «СТОП-КРАН»</span>
      </div>

      <h2 className="font-brand font-black text-2xl sm:text-3xl text-[#172B4D] text-center mb-1">
        ЕСЛИ ТЕБЯ ОБИЖАЮТ В ИНТЕРНЕТЕ — <br />
        <span className="text-red-600">ВКЛЮЧИ СТОП-КРАН!</span>
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 font-semibold text-center max-w-2xl mb-4">
        Запомните 5 шагов безопасного алгоритма защиты. Нажмите на значки, чтобы изучить каждый шаг!
      </p>

      {/* 5 Steps Interactive Scheme (Compact) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full mb-4">
        {STOP_CRANE_STEPS.map((step) => {
          const isSelected = selectedStepId === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                sound.playClick();
                setSelectedStepId(step.id);
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center shadow-xs ${
                isSelected
                  ? 'bg-[#FFF6D8] border-[#FFD43B] ring-3 ring-amber-300 scale-102'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-[#172B4D] text-white font-brand font-black text-[11px] flex items-center justify-center mb-1 shadow-xs">
                {step.stepNumber}
              </div>
              <div className="h-10 flex items-center justify-center mb-1">
                {step.id === 3 ? (
                  <Pixar3DIcon name="shield" size={38} />
                ) : (
                  <CyberIcon name={step.icon} size={32} />
                )}
              </div>
              <h4 className="font-brand font-black text-xs sm:text-sm text-[#172B4D] mb-0.5 leading-tight">
                {step.shortTitle}
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold leading-tight line-clamp-1">
                {step.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Card (Large fonts, high contrast) */}
      {selectedStepId && (
        <div className="w-full bg-[#EAF4FF] border-2 border-[#007BFF]/30 rounded-2xl p-4 sm:p-5 mb-5 shadow-xs animate-in fade-in duration-200">
          {(() => {
            const step = STOP_CRANE_STEPS.find((s) => s.id === selectedStepId);
            if (!step) return null;
            return (
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                <div className="shrink-0 flex items-center justify-center">
                  {step.id === 3 ? (
                    <Pixar3DIcon name="shield" size={54} />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center border border-blue-200">
                      <CyberIcon name={step.icon} size={36} />
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-brand font-black text-lg sm:text-xl text-[#172B4D] mb-0.5 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 
        ========================================================================
        НОВАЯ МИНИ-ИГРА: «СОЕДИНИ СТРЕЛКАМИ» (ПРОТЯГИВАНИЕ СТРЕЛОК МЫШЬЮ И ПАЛЬЦЕМ)
        Левая колонка: 5 Шагов с эффектом «схвачено» при протягивании
        Центр: SVG-слой z-30 поверх всех элементов
        Правая колонка: 5 Действий с data-action-id
        ========================================================================
      */}
      <div 
        ref={containerRef}
        onPointerMove={handleContainerPointerMove}
        onPointerUp={handleContainerPointerUp}
        onPointerCancel={() => {
          setIsDragging(false);
          setDragStartStepId(null);
          setDragStartPoint(null);
          setDragCurrentPoint(null);
        }}
        style={{ touchAction: isDragging ? 'none' : 'auto' }}
        className="w-full bg-white border-3 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xl mb-6 relative select-none"
      >
        {/* Header of Arrow Minigame */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-slate-100">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
              <Sparkles size={15} /> Интерактивная игра
            </div>
            <h3 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D]">
              МИНИ-ИГРА: «СОЕДИНИ СТРЕЛКАМИ»
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
              Зажмите Шаг слева и протяните стрелку к правильному Действию справа!
            </p>
          </div>

          <button
            onClick={handleResetLines}
            className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors shadow-xs shrink-0"
          >
            <RotateCcw size={15} /> Сбросить стрелки
          </button>
        </div>

        {/* 
          ========================================================================
          ЗАДАЧА 1: SVG-СЛОЙ НАД КАРТОЧКАМИ (Z-30) + СТРЕЛКА ДЛЯ ПРОТЯГИВАНИЯ
          ========================================================================
        */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
          <defs>
            {/* Color markers for confirmed connections */}
            {Object.entries(CONNECTION_COLORS).map(([id, col]) => (
              <marker
                key={id}
                id={`arrow-${id}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill={col} />
              </marker>
            ))}

            {/* Error line arrow marker */}
            <marker
              id="arrow-wrong"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#EF4444" />
            </marker>
          </defs>

          {/* Render confirmed connections */}
          {connections.map((conn) => {
            const line = lineCoords[`${conn.stepId}-${conn.actionId}`];
            if (!line) return null;
            const { start, end, color } = line;
            const dx = Math.abs(end.x - start.x) * 0.45;
            const pathD = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;

            return (
              <g key={`${conn.stepId}-${conn.actionId}`} className="animate-in fade-in duration-300">
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth="6"
                  strokeOpacity="0.2"
                  strokeLinecap="round"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  markerEnd={`url(#arrow-${conn.stepId})`}
                />
              </g>
            );
          })}

          {/* ACTIVE DRAGGING LINE (No arrow triangle, neat magnetic dot, dashed line) */}
          {isDragging && dragStartPoint && dragCurrentPoint && (
            <g>
              <path
                d={`M ${dragStartPoint.x} ${dragStartPoint.y} C ${dragStartPoint.x + Math.abs(dragCurrentPoint.x - dragStartPoint.x) * 0.45} ${dragStartPoint.y}, ${dragCurrentPoint.x - Math.abs(dragCurrentPoint.x - dragStartPoint.x) * 0.45} ${dragCurrentPoint.y}, ${dragCurrentPoint.x} ${dragCurrentPoint.y}`}
                fill="none"
                stroke="#007BFF"
                strokeWidth="3"
                strokeOpacity="0.8"
                strokeDasharray="5 5"
                strokeLinecap="round"
              />
              {/* Magnetic touch dot on cursor */}
              <circle
                cx={dragCurrentPoint.x}
                cy={dragCurrentPoint.y}
                r="6"
                fill="#007BFF"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Render temporary error line */}
          {wrongLine && lineCoords['wrong'] && (
            <g className="animate-pulse">
              <path
                d={`M ${lineCoords['wrong'].start.x} ${lineCoords['wrong'].start.y} C ${lineCoords['wrong'].start.x + 80} ${lineCoords['wrong'].start.y}, ${lineCoords['wrong'].end.x - 80} ${lineCoords['wrong'].end.y}, ${lineCoords['wrong'].end.x} ${lineCoords['wrong'].end.y}`}
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                markerEnd="url(#arrow-wrong)"
              />
            </g>
          )}
        </svg>

        {/* 2-COLUMN BALANCED MATCHING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center relative z-10">
          
          {/* ================= ЛЕВАЯ КОЛОНКА: ШАГИ ================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="font-brand font-black text-xs sm:text-sm text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-blue-100 text-[#007BFF] flex items-center justify-center text-xs font-black">
                  1
                </span>
                <span>Шаги алгоритма:</span>
              </span>
              <span className="text-xs font-bold text-slate-400">Шаги 1–5</span>
            </div>

            {STOP_CRANE_STEPS.map((step) => {
              const isConnected = connections.some((c) => c.stepId === step.stepNumber);
              const isBeingDragged = isDragging && dragStartStepId === step.stepNumber;
              const isSelected = activeStepSelection === step.stepNumber;
              const isWrong = wrongLine?.stepId === step.stepNumber;
              const connColor = CONNECTION_COLORS[step.stepNumber] || '#007BFF';

              return (
                <div
                  key={step.id}
                  onPointerDown={(e) => handleStepPointerDown(e, step.stepNumber)}
                  className={`h-16 sm:h-[70px] px-3.5 py-2 rounded-2xl border-2 transition-all cursor-grab active:cursor-grabbing flex items-center justify-between gap-3 shadow-xs select-none touch-none ${
                    isConnected
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200 cursor-default'
                      : isWrong
                      ? 'bg-red-50 border-red-500 ring-2 ring-red-300 animate-pulse'
                      : isBeingDragged
                      ? 'bg-[#EAF4FF] border-[#007BFF] ring-4 ring-[#007BFF]/40 scale-105 shadow-xl'
                      : isSelected
                      ? 'bg-[#EAF4FF] border-[#007BFF] ring-4 ring-[#007BFF]/30 scale-[1.02] shadow-md'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-brand font-black text-xs flex items-center justify-center shrink-0 shadow-xs ${
                        isConnected
                          ? 'bg-emerald-600 text-white'
                          : isBeingDragged || isSelected
                          ? 'bg-[#007BFF] text-white'
                          : 'bg-[#172B4D] text-white'
                      }`}
                    >
                      #{step.stepNumber}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0 border border-slate-100">
                      {step.id === 3 ? (
                        <Pixar3DIcon name="shield" size={28} />
                      ) : (
                        <CyberIcon name={step.icon} size={24} />
                      )}
                    </div>

                    <div>
                      <div className="font-brand font-black text-sm sm:text-base text-[#172B4D] leading-tight">
                        {step.shortTitle.toUpperCase()}
                      </div>
                      <div className="text-[11px] text-slate-500 font-semibold leading-tight line-clamp-1">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Точка соединения справа */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isConnected && (
                      <Check size={18} className="text-emerald-600 stroke-[3]" />
                    )}
                    <div
                      id={`step-dot-${step.stepNumber}`}
                      style={{
                        backgroundColor: isConnected ? connColor : isBeingDragged || isSelected ? '#007BFF' : '#FFFFFF',
                        borderColor: isConnected ? connColor : isBeingDragged || isSelected ? '#007BFF' : '#94A3B8'
                      }}
                      className={`w-4 h-4 rounded-full border-2 transition-all shadow-xs ${isBeingDragged ? 'scale-125 ring-2 ring-[#007BFF]' : ''}`}
                      title="Потяните отсюда"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= ПРАВАЯ КОЛОНКА: ДЕЙСТВИЯ ================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="font-brand font-black text-xs sm:text-sm text-[#172B4D] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">
                  2
                </span>
                <span>Действия (перемешаны):</span>
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Соединено: {connections.length} из 5
              </span>
            </div>

            {SCRAMBLED_ACTION_IDS.map((actionId) => {
              const actionCard = ACTION_CARDS.find((a) => a.id === actionId)!;
              const isConnected = connections.some((c) => c.actionId === actionId);
              const isWrong = wrongLine?.actionId === actionId;
              const matchedConnection = connections.find((c) => c.actionId === actionId);
              const connColor = matchedConnection ? matchedConnection.color : '#007BFF';

              return (
                <div
                  key={actionCard.id}
                  data-action-id={actionCard.id}
                  onClick={() => handleActionClick(actionCard.id)}
                  className={`h-16 sm:h-[70px] px-3.5 py-2 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs select-none touch-none ${
                    isConnected
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-200'
                      : isWrong
                      ? 'bg-red-50 border-red-500 ring-2 ring-red-300 animate-pulse'
                      : isDragging
                      ? 'bg-white hover:bg-blue-50/60 border-slate-300 hover:border-[#007BFF]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Точка соединения слева */}
                  <div
                    id={`action-dot-${actionCard.id}`}
                    style={{
                      backgroundColor: isConnected ? connColor : '#FFFFFF',
                      borderColor: isConnected ? connColor : '#94A3B8'
                    }}
                    className="w-4 h-4 rounded-full border-2 transition-all shadow-xs shrink-0"
                    title="Цель для стрелки"
                  />

                  {/* Текст действия */}
                  <div className="flex-1 px-1">
                    <p className="font-bold text-xs sm:text-sm text-[#172B4D] leading-snug line-clamp-2">
                      {actionCard.text}
                    </p>
                  </div>

                  {/* Индикатор статуса */}
                  <div className="shrink-0">
                    {isConnected ? (
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center">
                        <MousePointerClick size={14} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Check button & Feedback message */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-4 border-t-2 border-slate-100 relative z-10">
          {feedbackMessage ? (
            <div
              className={`text-xs sm:text-sm font-bold p-2.5 rounded-xl flex-1 ${
                isAssemblyVerified || isAllConnected
                  ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-300'
                  : 'bg-amber-50 text-amber-950 border-2 border-amber-300'
              }`}
            >
              {feedbackMessage}
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-slate-500 font-semibold">
              Зажмите шаг и протяните стрелку к нужному действию, чтобы активировать щит!
            </div>
          )}

          <button
            onClick={handleVerifyAssembly}
            disabled={isAssemblyVerified}
            className={`h-13 sm:h-14 px-7 rounded-2xl font-brand font-black text-sm sm:text-base shadow-xl transition-all flex items-center gap-2 shrink-0 border-2 ${
              isAssemblyVerified
                ? 'bg-emerald-600 text-white border-emerald-400 cursor-default opacity-90'
                : isAllConnected
                ? 'bg-gradient-to-r from-[#007BFF] to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-yellow-300 hover:scale-105 active:scale-95 cursor-pointer shadow-blue-500/30'
                : 'bg-slate-100 text-slate-400 border-slate-300 cursor-pointer hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 size={20} />
            <span>
              {isAssemblyVerified
                ? 'Алгоритм собран! (+25)'
                : 'Алгоритм собран! (+25 баллов)'}
            </span>
          </button>
        </div>

        {/* Shield Assembly Celebration Animation */}
        {isAssemblyVerified && (
          <div className="mt-5 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-50 border-4 border-[#FFD43B] flex flex-col items-center text-center animate-in zoom-in-95 duration-300 shadow-lg relative z-10">
            <div className="mb-2 flex items-center justify-center">
              <Pixar3DIcon name="shield" size={88} />
            </div>
            <h4 className="font-brand font-black text-xl sm:text-2xl text-[#172B4D] mb-1">
              🛡️ СТОП-КРАН СОБРАН И АКТИВИРОВАН!
            </h4>
            <p className="text-sm sm:text-base font-bold text-amber-950 max-w-lg leading-relaxed">
              Теперь у каждого участника команды есть надёжный щит защиты: не отвечать злом на зло, сохранять факты, блокировать нарушителей и звать взрослых!
            </p>
          </div>
        )}
      </div>

      {/* Robot Advice - Dialogue Layout */}
      <div className="w-full max-w-2xl mb-6">
        <RobotAssistant
          state={isAssemblyVerified ? 'happy' : 'warning'}
          size="dialog"
          speechPlacement="right"
          speech={
            isAssemblyVerified
              ? '«Великолепно! Стоп-кран активирован. Запомните этот алгоритм — он защитит вас в любой непонятной ситуации в сети!»'
              : '«Тяните стрелочки от каждого шага: СТОП — не мстить, СОХРАНИ — скриншот, БЛОКИРУЙ — в черный список, РАССКАЖИ — взрослым!»'
          }
        />
      </div>

      {/* CTA To Mission 4 */}
      <button
        onClick={() => {
          sound.playSuccess();
          onCompleteMission();
        }}
        className="h-15 px-8 rounded-2xl bg-[#007BFF] hover:bg-blue-600 text-white font-brand font-black text-base sm:text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5 border-2 border-[#FFD43B]"
      >
        <span>Перейти к Миссии №4: «Сила наблюдателя»</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Screen5StopCrane;

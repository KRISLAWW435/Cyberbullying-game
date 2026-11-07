import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Static image imports for bundling & GitHub Pages compatibility
import robotGreetingImg from '../assets/robot/robot-greeting.jpg';
import robotHappyImg from '../assets/robot/robot-happy.jpg';
import robotThinkingImg from '../assets/robot/robot-thinking.jpg';
import robotWarningImg from '../assets/robot/robot-warning.jpg';
import robotSupportImg from '../assets/robot/robot-support.jpg';
import robotSurprisedImg from '../assets/robot/robot-surprised.jpg';

export type RobotState = 'greeting' | 'happy' | 'thinking' | 'warning' | 'support' | 'surprised';

export interface RobotAssistantProps {
  state?: RobotState;
  speech?: string;
  size?: 'sm' | 'md' | 'dialog' | 'lg' | 'hero';
  speechPlacement?: 'top' | 'right';
  className?: string;
  onSpeechClick?: () => void;
}

const ROBOT_IMAGES: Record<RobotState, string> = {
  greeting: robotGreetingImg,
  happy: robotHappyImg,
  thinking: robotThinkingImg,
  warning: robotWarningImg,
  support: robotSupportImg,
  surprised: robotSurprisedImg,
};

const ROBOT_ALT: Record<RobotState, string> = {
  greeting: 'Робот-помощник приветствует команду KIBERONE',
  happy: 'Робот-помощник радуется правильному ответу',
  thinking: 'Робот-помощник задумчиво анализирует правила',
  warning: 'Робот-помощник защищает со светящимся щитом',
  support: 'Робот-помощник держит светящееся сердце поддержки',
  surprised: 'Робот-помощник удивлённо изучает улики через 3D-лупу',
};

export const RobotAssistant: React.FC<RobotAssistantProps> = ({
  state = 'greeting',
  speech,
  size = 'md',
  speechPlacement = 'top',
  className = '',
  onSpeechClick,
}) => {
  // Sizing with dialog size tuned to 150-200px as requested
  const sizeClasses = {
    sm: 'w-20 h-20 sm:w-24 sm:h-24',
    md: 'w-32 h-32 sm:w-36 sm:h-36',
    dialog: 'w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52', // ~160-200px
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
    hero: 'w-48 h-48 sm:w-60 sm:h-60 lg:w-68 lg:h-68',
  }[size];

  const currentImage = ROBOT_IMAGES[state] || ROBOT_IMAGES.greeting;

  // The static robot graphic with smooth fade-in only (no movement/oscillation)
  const robotGraphic = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative z-10 flex items-center justify-center shrink-0 select-none ${sizeClasses}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="w-full h-full flex items-center justify-center"
        >
          {/* mix-blend-mode: multiply magically removes any white background or light floor shadow on white/light pages */}
          <img
            src={currentImage}
            alt={ROBOT_ALT[state]}
            style={{ mixBlendMode: 'multiply' }}
            className="w-full h-full object-contain pointer-events-none"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  // If no speech provided, return only the robot graphic
  if (!speech) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        {robotGraphic}
      </div>
    );
  }

  // Dialogue layout: Robot on left, speech bubble on right with tail pointing to robot
  if (speechPlacement === 'right') {
    return (
      <div className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-4 select-none ${className}`}>
        {robotGraphic}

        <motion.div
          initial={{ opacity: 0, x: -8, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onSpeechClick}
          className="relative z-30 flex-1 bg-white/95 backdrop-blur-sm border-2 border-[#007BFF] rounded-3xl p-4 sm:p-5 shadow-xl shadow-blue-500/10 cursor-default text-left transition-all duration-300 hover:shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FFD43B] text-[#172B4D] font-black text-xs shrink-0 shadow-sm ring-2 ring-amber-300">
              K1
            </span>
            <p className="text-[#172B4D] text-sm md:text-base font-semibold leading-relaxed text-left">
              {speech}
            </p>
          </div>
          {/* Triangular Tail pointing to Robot on the left (on desktop) or top (on mobile) */}
          <div className="hidden sm:block absolute -left-2.5 top-8 w-4 h-4 bg-white border-b-2 border-l-2 border-[#007BFF] rotate-45" />
          <div className="sm:hidden absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-[#007BFF] rotate-45" />
        </motion.div>
      </div>
    );
  }

  // Default vertical layout: Speech bubble on top, tail pointing down to robot
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={onSpeechClick}
        className="relative z-30 mb-3 max-w-md sm:max-w-lg md:max-w-xl bg-white/95 backdrop-blur-sm border-2 border-[#007BFF] rounded-3xl p-4 sm:p-5 shadow-xl shadow-blue-500/10 cursor-default text-left transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FFD43B] text-[#172B4D] font-black text-xs shrink-0 shadow-sm ring-2 ring-amber-300">
            K1
          </span>
          <p className="text-[#172B4D] text-sm md:text-base font-semibold leading-relaxed text-left">
            {speech}
          </p>
        </div>
        {/* Tail pointing down to robot */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#007BFF] rotate-45" />
      </motion.div>

      {robotGraphic}
    </div>
  );
};

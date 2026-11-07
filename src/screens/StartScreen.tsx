import React from 'react';
import { motion } from 'motion/react';
import { RobotAssistant } from '../components/RobotAssistant';
import { 
  Play, 
  Sparkles, 
  Star, 
  Zap, 
  Search, 
  Shield, 
  Heart 
} from 'lucide-react';
import { sound } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4 py-6 sm:py-10 overflow-hidden">
      {/* 
        ======================================================================
        FLOATING BRAND VECTOR SVG ICONS (Pure SVGs without white square boxes)
        Different sizes, brand colors (#007BFF, #FFD43B), staggered motion
        ======================================================================
      */}
      {/* 1. Large Golden Star (Top-Left) */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75], y: [0, -12, 0], rotate: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0 }}
        className="absolute top-10 left-6 sm:left-14 lg:left-24 pointer-events-none hidden sm:block z-0"
      >
        <Star
          size={58}
          className="text-[#FFD43B] fill-[#FFD43B]/85 filter drop-shadow-[0_0_12px_rgba(255,212,59,0.5)]"
        />
      </motion.div>

      {/* 2. Sleek KIBERONE Blue Search / Lupa (Top-Right) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.65, 0.95, 0.65], y: [0, -10, 0], rotate: [12, -4, 12] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-14 right-8 sm:right-16 lg:right-28 pointer-events-none hidden sm:block z-0"
      >
        <Search
          size={46}
          strokeWidth={2.8}
          className="text-[#007BFF] filter drop-shadow-[0_0_10px_rgba(0,123,255,0.4)]"
        />
      </motion.div>

      {/* 3. Small Energetic Yellow Lightning (Mid-Left) */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7], y: [0, -8, 0], rotate: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 1.4 }}
        className="absolute top-1/2 -translate-y-8 left-8 sm:left-16 lg:left-28 pointer-events-none hidden sm:block z-0"
      >
        <Zap
          size={36}
          className="text-[#FFD43B] fill-[#FFD43B] filter drop-shadow-[0_0_10px_rgba(255,212,59,0.6)]"
        />
      </motion.div>

      {/* 4. Elegant Cyber Shield (Mid-Right) */}
      <motion.div
        animate={{ scale: [1, 1.14, 1], opacity: [0.65, 0.95, 0.65], y: [0, -11, 0], rotate: [-10, 8, -10] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/2 -translate-y-6 right-6 sm:right-14 lg:right-24 pointer-events-none hidden sm:block z-0"
      >
        <Shield
          size={48}
          strokeWidth={2.4}
          className="text-[#007BFF] fill-[#007BFF]/10 filter drop-shadow-[0_0_12px_rgba(0,123,255,0.45)]"
        />
      </motion.div>

      {/* 5. Golden Sparkles (Bottom-Left) */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6], y: [0, -9, 0] }}
        transition={{ repeat: Infinity, duration: 3.1, ease: 'easeInOut', delay: 1.9 }}
        className="absolute bottom-20 left-12 sm:left-24 lg:left-36 pointer-events-none hidden sm:block z-0"
      >
        <Sparkles
          size={34}
          className="text-[#FFD43B] fill-[#FFD43B]/60 filter drop-shadow-[0_0_8px_rgba(255,212,59,0.5)]"
        />
      </motion.div>

      {/* 6. Friendly Heart Accent (Bottom-Right) */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6], y: [0, -7, 0], rotate: [6, -6, 6] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1.1 }}
        className="absolute bottom-24 right-10 sm:right-20 lg:right-32 pointer-events-none hidden sm:block z-0"
      >
        <Heart
          size={38}
          strokeWidth={2.4}
          className="text-[#007BFF] fill-[#007BFF]/15 filter drop-shadow-[0_0_10px_rgba(0,123,255,0.35)]"
        />
      </motion.div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* KIBERONE Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] border border-[#007BFF]/30 text-[#007BFF] font-bold text-xs sm:text-sm mb-3 shadow-xs"
        >
          <Sparkles size={16} className="text-[#FFD43B]" />
          <span>Интерактивное приключение цифровых защитников KIBERONE</span>
        </motion.div>

        {/* Main Title Lockup */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="font-brand font-black text-3xl sm:text-5xl lg:text-6xl text-[#172B4D] tracking-tight leading-[1.1] mb-2"
        >
          МОЯ СУПЕРСИЛА <br />
          <span className="text-[#007BFF] inline-block relative">
            ПРОТИВ КИБЕРБУЛЛИНГА
            <span className="absolute -bottom-1.5 left-0 w-full h-2 bg-[#FFD43B] rounded-full -z-10 opacity-80" />
          </span>
        </motion.h1>

        <p className="text-sm sm:text-lg text-slate-600 font-semibold max-w-2xl mb-4 sm:mb-6">
          Научись распознавать травлю, защищать себя и помогать другим!
        </p>

        {/* 
          Robot Assistant with speech bubble:
          - Height reduced by ~20%
          - mix-blend-mode: multiply eliminates all gray boxes / floor shadows
          - Speech bubble is left-aligned for natural reading
          - Floating animation applied smoothly
        */}
        <div className="w-full max-w-lg mb-4">
          <RobotAssistant
            state="greeting"
            size="hero"
            speech="«Привет! Я твой цифровой помощник KIBERONE. Сегодня нам предстоит важная миссия! В интернете здорово общаться и играть, но иногда там обижают других. Мы научимся распознавать такие ситуации и находить настоящие суперсилы защиты!»"
          />
        </div>

        {/* 
          3D Tactile Push Button:
          - box-shadow: 0 6px 0 #0056b3, 0 10px 15px rgba(0,123,255,0.3)
          - Active: translateY(4px) and reduced shadow
        */}
        <div className="mt-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98, y: 4 }}
            onClick={() => {
              sound.playSuccess();
              onStart();
            }}
            className="group relative h-16 sm:h-18 px-8 sm:px-12 rounded-3xl bg-gradient-to-r from-[#007BFF] to-[#0066dd] text-white font-brand font-black text-xl sm:text-2xl cursor-pointer flex items-center gap-3.5 border-2 border-yellow-300 btn-3d-primary"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FFD43B] text-[#172B4D] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xs">
              <Play size={22} fill="#172B4D" />
            </div>
            <span className="tracking-wide">Войти в игру</span>
          </motion.button>
        </div>

        {/* 
          Bottom Guidance Tip:
          - Contrasting #5C6B80
          - 14–16px font size
          - Clearly legible on classroom projector / touch screen
        */}
        <div className="mt-2 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-slate-200 shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200 animate-ping shrink-0" />
          <p
            className="text-sm sm:text-base font-semibold tracking-wide"
            style={{ color: '#5C6B80' }}
          >
            Нажмите кнопку «Войти в игру» или используйте нижнюю панель наставника
          </p>
        </div>
      </div>
    </div>
  );
};

// Also export as default and Screen1Welcome for backward-compatibility
export default StartScreen;
export const Screen1Welcome = StartScreen;

import React from 'react';

export type RobotMood = 'greeting' | 'joy' | 'curious' | 'alert' | 'support';

interface CyberRobotProps {
  mood?: RobotMood;
  speech?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onSpeechClick?: () => void;
}

export const CyberRobot: React.FC<CyberRobotProps> = ({
  mood = 'greeting',
  speech,
  size = 'md',
  className = '',
  onSpeechClick
}) => {
  // Dimensions based on size
  const dimensions = {
    sm: { w: 100, h: 110, eyeScale: 0.8 },
    md: { w: 140, h: 155, eyeScale: 1.0 },
    lg: { w: 190, h: 210, eyeScale: 1.2 },
    hero: { w: 250, h: 280, eyeScale: 1.5 }
  }[size];

  // Colors & lights depending on mood
  const moodTheme = {
    greeting: {
      visorGlow: '#00E5FF',
      chestEmblem: 'smile',
      antennaColor: '#FFD43B',
      pulseSpeed: 'animate-pulse'
    },
    joy: {
      visorGlow: '#FFD43B',
      chestEmblem: 'star',
      antennaColor: '#FFD43B',
      pulseSpeed: 'animate-bounce'
    },
    curious: {
      visorGlow: '#38EF7D',
      chestEmblem: 'search',
      antennaColor: '#00E5FF',
      pulseSpeed: 'animate-pulse'
    },
    alert: {
      visorGlow: '#FFA000',
      chestEmblem: 'shield',
      antennaColor: '#D32F2F',
      pulseSpeed: 'animate-pulse'
    },
    support: {
      visorGlow: '#FF6584',
      chestEmblem: 'heart',
      antennaColor: '#FFD43B',
      pulseSpeed: 'animate-pulse'
    }
  }[mood];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {speech && (
        <div
          onClick={onSpeechClick}
          className="relative mb-3 max-w-md sm:max-w-lg md:max-w-xl bg-white border-2 border-[#007BFF] rounded-2xl p-3.5 shadow-lg shadow-blue-500/10 cursor-default transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-start gap-2.5">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD43B] text-[#172B4D] font-black text-xs shrink-0 shadow-sm">
              K1
            </span>
            <p className="text-[#172B4D] text-sm md:text-base font-medium leading-snug">
              {speech}
            </p>
          </div>
          {/* Triangular Tail pointing to Robot */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#007BFF] rotate-45" />
        </div>
      )}

      {/* 3D-styled SVG Robot */}
      <div className="relative group transition-transform duration-300 hover:scale-105">
        {/* Soft ground shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#172B4D]/15 rounded-full blur-sm"
          style={{ width: dimensions.w * 0.7, height: 16 }}
        />

        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-md"
        >
          <defs>
            {/* Main Robot Body Gradients */}
            <linearGradient id="botHeadGrad" x1="40" y1="30" x2="160" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.65" stopColor="#E6F0FA" />
              <stop offset="1" stopColor="#C8DCF0" />
            </linearGradient>

            <linearGradient id="botBlueAccent" x1="40" y1="40" x2="160" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0094FF" />
              <stop offset="0.8" stopColor="#007BFF" />
              <stop offset="1" stopColor="#0056B3" />
            </linearGradient>

            <linearGradient id="botYellowAccent" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF275" />
              <stop offset="1" stopColor="#FFD43B" />
            </linearGradient>

            <linearGradient id="botVisorGrad" x1="50" y1="60" x2="150" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0D1B2A" />
              <stop offset="1" stopColor="#1B263B" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ANTENNA */}
          <g>
            <rect x="96" y="10" width="8" height="24" rx="4" fill="#172B4D" />
            {/* Top antenna orb */}
            <circle cx="100" cy="10" r="10" fill={moodTheme.antennaColor} stroke="#172B4D" strokeWidth="2.5" />
            <circle cx="97" cy="7" r="3" fill="#FFFFFF" fillOpacity="0.8" />
            {/* Radio signal waves */}
            <path
              d="M84 10C84 4 116 4 116 10"
              stroke={moodTheme.antennaColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              className={moodTheme.pulseSpeed}
            />
          </g>

          {/* ROBOT EARS / HEADPHONES */}
          <rect x="26" y="60" width="16" height="34" rx="8" fill="#FFD43B" stroke="#172B4D" strokeWidth="3" />
          <rect x="158" y="60" width="16" height="34" rx="8" fill="#FFD43B" stroke="#172B4D" strokeWidth="3" />
          <circle cx="34" cy="77" r="4" fill="#007BFF" />
          <circle cx="166" cy="77" r="4" fill="#007BFF" />

          {/* HEAD CHASSIS */}
          <rect
            x="36"
            y="32"
            width="128"
            height="90"
            rx="32"
            fill="url(#botHeadGrad)"
            stroke="#172B4D"
            strokeWidth="4"
          />
          {/* Head 3D Highlight */}
          <path
            d="M56 42C75 37 125 37 144 42"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* VISOR DISPLAY */}
          <rect
            x="50"
            y="52"
            width="100"
            height="52"
            rx="20"
            fill="url(#botVisorGrad)"
            stroke="#172B4D"
            strokeWidth="3"
          />
          {/* Visor Glass Reflection */}
          <path
            d="M60 58L130 58C136 58 140 61 140 65L60 78Z"
            fill="#FFFFFF"
            fillOpacity="0.12"
          />

          {/* EYES - REACTIVE TO MOOD */}
          {mood === 'greeting' && (
            <g filter="url(#eyeGlow)">
              {/* Happy curved eyes */}
              <path
                d="M68 76C72 70 82 70 86 76"
                stroke={moodTheme.visorGlow}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M114 76C118 70 128 70 132 76"
                stroke={moodTheme.visorGlow}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="88" r="3" fill="#FFD43B" />
            </g>
          )}

          {mood === 'joy' && (
            <g filter="url(#eyeGlow)">
              {/* Star / Sparkle Joy eyes */}
              <path
                d="M77 68L80 77L88 77L82 82L84 90L77 85L70 90L72 82L66 77L74 77Z"
                fill={moodTheme.visorGlow}
              />
              <path
                d="M123 68L126 77L134 77L128 82L130 90L123 85L116 90L118 82L112 77L120 77Z"
                fill={moodTheme.visorGlow}
              />
              {/* Cheerful wide mouth */}
              <path d="M94 88C97 92 103 92 106 88" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {mood === 'curious' && (
            <g filter="url(#eyeGlow)">
              {/* One big curious eye and one inquiring eye */}
              <circle cx="76" cy="76" r="9" fill={moodTheme.visorGlow} />
              <circle cx="76" cy="76" r="4" fill="#0D1B2A" />
              <circle cx="78" cy="74" r="2.5" fill="#FFFFFF" />

              <circle cx="124" cy="76" r="6" fill={moodTheme.visorGlow} />
              <circle cx="124" cy="76" r="2.5" fill="#0D1B2A" />
              {/* Little curious mouth */}
              <circle cx="100" cy="88" r="3" fill="#FFFFFF" />
            </g>
          )}

          {mood === 'alert' && (
            <g filter="url(#eyeGlow)">
              {/* Focused determined eyes */}
              <polygon points="68,74 86,78 86,83 68,79" fill={moodTheme.visorGlow} />
              <polygon points="132,74 114,78 114,83 132,79" fill={moodTheme.visorGlow} />
              <rect x="94" y="88" width="12" height="3" rx="1.5" fill="#FFFFFF" />
            </g>
          )}

          {mood === 'support' && (
            <g filter="url(#eyeGlow)">
              {/* Gentle warm friendly rounded eyes */}
              <circle cx="77" cy="76" r="7" fill={moodTheme.visorGlow} />
              <circle cx="79" cy="74" r="3" fill="#FFFFFF" />
              <circle cx="123" cy="76" r="7" fill={moodTheme.visorGlow} />
              <circle cx="125" cy="74" r="3" fill="#FFFFFF" />
              {/* Friendly smile */}
              <path d="M92 86C96 90 104 90 108 86" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* NECK JOINT */}
          <rect x="88" y="122" width="24" height="12" rx="4" fill="#172B4D" />
          <line x1="92" y1="128" x2="108" y2="128" stroke="#00E5FF" strokeWidth="2" />

          {/* TORSO / CHEST */}
          <rect
            x="48"
            y="132"
            width="104"
            height="70"
            rx="24"
            fill="url(#botBlueAccent)"
            stroke="#172B4D"
            strokeWidth="4"
          />

          {/* CHEST CORE SHIELD DISPLAY */}
          <circle cx="100" cy="165" r="18" fill="#172B4D" stroke="#FFD43B" strokeWidth="3" />
          {mood === 'support' ? (
            <path
              d="M100 174C100 174 92 169 92 163C92 159 95 157 98 157C99.5 157 100 158 100 159C100 158 100.5 157 102 157C105 157 108 159 108 163C108 169 100 174 100 174Z"
              fill="#FF4B72"
              className="animate-pulse"
            />
          ) : mood === 'joy' ? (
            <path
              d="M100 156L102 162H108L103 166L105 172L100 168L95 172L97 166L92 162H98L100 156Z"
              fill="#FFD43B"
            />
          ) : (
            <path
              d="M100 156L94 159V165C94 169 96.5 172.5 100 174C103.5 172.5 106 169 106 165V159L100 156Z"
              fill="#00E5FF"
            />
          )}

          {/* CHEST BADGE STRIPES */}
          <line x1="64" y1="150" x2="78" y2="150" stroke="#FFD43B" strokeWidth="3" strokeLinecap="round" />
          <line x1="64" y1="158" x2="74" y2="158" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="122" y1="150" x2="136" y2="150" stroke="#FFD43B" strokeWidth="3" strokeLinecap="round" />
          <line x1="126" y1="158" x2="136" y2="158" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          {/* ROBOT ARMS */}
          {/* Left Arm */}
          <g>
            <rect x="24" y="140" width="20" height="42" rx="10" fill="url(#botHeadGrad)" stroke="#172B4D" strokeWidth="3.5" />
            <circle cx="34" cy="172" r="8" fill="#FFD43B" stroke="#172B4D" strokeWidth="2.5" />
          </g>
          {/* Right Arm (Waving or Resting) */}
          {mood === 'greeting' ? (
            <g className="animate-wiggle origin-bottom-left">
              <rect x="156" y="125" width="20" height="45" rx="10" transform="rotate(-25 156 125)" fill="url(#botHeadGrad)" stroke="#172B4D" strokeWidth="3.5" />
              <circle cx="178" cy="120" r="9" fill="#FFD43B" stroke="#172B4D" strokeWidth="2.5" />
            </g>
          ) : (
            <g>
              <rect x="156" y="140" width="20" height="42" rx="10" fill="url(#botHeadGrad)" stroke="#172B4D" strokeWidth="3.5" />
              <circle cx="166" cy="172" r="8" fill="#FFD43B" stroke="#172B4D" strokeWidth="2.5" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

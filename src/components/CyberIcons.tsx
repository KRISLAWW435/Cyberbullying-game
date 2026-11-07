import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const CyberIcon: React.FC<IconProps> = ({ name, className = '', size = 48 }) => {
  const s = size;

  switch (name) {
    case 'shield':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="shieldGrad" x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A3FF" />
              <stop offset="0.5" stopColor="#007BFF" />
              <stop offset="1" stopColor="#0047B3" />
            </linearGradient>
            <linearGradient id="shieldBorder" x1="12" y1="6" x2="52" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD43B" />
              <stop offset="1" stopColor="#FFA000" />
            </linearGradient>
            <filter id="shieldShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#007BFF" floodOpacity="0.4" />
            </filter>
          </defs>
          <path
            d="M32 4L12 12V28C12 43 20.5 54.5 32 60C43.5 54.5 52 43 52 28V12L32 4Z"
            fill="url(#shieldGrad)"
            stroke="url(#shieldBorder)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#shieldShadow)"
          />
          {/* Internal shield emblem */}
          <path
            d="M32 16L20 22V32C20 40 25.5 47 32 50C38.5 47 44 40 44 32V22L32 16Z"
            fill="#FFFFFF"
            fillOpacity="0.2"
          />
          <path
            d="M26 31L30 35L38 27"
            stroke="#FFD43B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'search':
    case 'magnifier':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="searchGrad" x1="8" y1="8" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E5FF" />
              <stop offset="1" stopColor="#007BFF" />
            </linearGradient>
            <linearGradient id="lensReflect" x1="14" y1="14" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="0.6" stopColor="#EAF4FF" stopOpacity="0.2" />
              <stop offset="1" stopColor="#007BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="26" cy="26" r="18" fill="url(#lensReflect)" stroke="url(#searchGrad)" strokeWidth="5" />
          <line
            x1="39"
            y1="39"
            x2="56"
            y2="56"
            stroke="#172B4D"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="43"
            y1="43"
            x2="54"
            y2="54"
            stroke="#FFD43B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Cyber scan crosshair */}
          <circle cx="26" cy="26" r="5" fill="#FFD43B" />
        </svg>
      );

    case 'heart':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="heartGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4B72" />
              <stop offset="1" stopColor="#E60039" />
            </linearGradient>
            <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FF4B72" floodOpacity="0.45" />
            </filter>
          </defs>
          <path
            d="M32 54C32 54 10 40 10 24C10 16 16 10 23.5 10C28 10 31 13 32 15C33 13 36 10 40.5 10C48 10 54 16 54 24C54 40 32 54 32 54Z"
            fill="url(#heartGrad)"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            filter="url(#heartGlow)"
          />
          <circle cx="22" cy="18" r="3" fill="#FFFFFF" fillOpacity="0.75" />
        </svg>
      );

    case 'lock':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="lockBody" x1="14" y1="28" x2="50" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFDE59" />
              <stop offset="1" stopColor="#FF9900" />
            </linearGradient>
          </defs>
          <path
            d="M20 28V20C20 13.37 25.37 8 32 8C38.63 8 44 13.37 44 20V28"
            stroke="#172B4D"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <rect
            x="14"
            y="28"
            width="36"
            height="28"
            rx="8"
            fill="url(#lockBody)"
            stroke="#172B4D"
            strokeWidth="3.5"
          />
          <circle cx="32" cy="40" r="4" fill="#172B4D" />
          <path d="M32 44V49" stroke="#172B4D" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'camera':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="camGrad" x1="8" y1="16" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#007BFF" />
              <stop offset="1" stopColor="#0047B3" />
            </linearGradient>
          </defs>
          <path d="M22 16L26 10H38L42 16H52C55.3 16 58 18.7 58 22V50C58 53.3 55.3 56 52 56H12C8.7 56 6 53.3 6 50V22C6 18.7 8.7 16 12 16H22Z" fill="url(#camGrad)" stroke="#172B4D" strokeWidth="3" />
          <circle cx="32" cy="36" r="13" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFD43B" strokeWidth="4" />
          <circle cx="32" cy="36" r="6" fill="#FFD43B" />
          <circle cx="48" cy="24" r="3" fill="#00E5FF" />
        </svg>
      );

    case 'eye':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M4 32C4 32 14 16 32 16C50 16 60 32 60 32C60 32 50 48 32 48C14 48 4 32 4 32Z" fill="#EAF4FF" stroke="#007BFF" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="12" fill="#007BFF" />
          <circle cx="32" cy="32" r="6" fill="#FFD43B" />
          <circle cx="35" cy="29" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'hand':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="28" fill="#D32F2F" stroke="#FFFFFF" strokeWidth="3" />
          {/* Raised open palm */}
          <path
            d="M26 18V30M32 14V30M38 18V30M44 24V32C44 39 39 45 32 45C25 45 20 39 20 32V24"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'star':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <defs>
            <linearGradient id="starGrad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF275" />
              <stop offset="0.5" stopColor="#FFD43B" />
              <stop offset="1" stopColor="#FFA000" />
            </linearGradient>
          </defs>
          <path
            d="M32 4L40.2 21.6L59.2 24L45.2 37.2L48.8 56L32 46.8L15.2 56L18.8 37.2L4.8 24L23.8 21.6L32 4Z"
            fill="url(#starGrad)"
            stroke="#172B4D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="30" r="4" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );

    case 'medal':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M22 6L28 26H36L42 6H22Z" fill="#007BFF" stroke="#172B4D" strokeWidth="2.5" />
          <path d="M16 6L25 24L32 20L39 24L48 6H16Z" fill="#FFD43B" />
          <circle cx="32" cy="40" r="18" fill="#FFD43B" stroke="#172B4D" strokeWidth="3" />
          <circle cx="32" cy="40" r="13" fill="#FFA000" />
          <path d="M32 30L34.5 36.5H41.5L36 41L38 47.5L32 43.5L26 47.5L28 41L22.5 36.5H29.5L32 30Z" fill="#FFFFFF" />
        </svg>
      );

    case 'lightning':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M36 4L14 36H32L26 60L52 26H34L36 4Z"
            fill="#FFD43B"
            stroke="#172B4D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'message':
    case 'speech_help':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M52 14H12C7.6 14 4 17.6 4 22V40C4 44.4 7.6 48 12 48H18V58L30 48H52C56.4 48 60 44.4 60 40V22C60 17.6 56.4 14 52 14Z"
            fill="#007BFF"
            stroke="#172B4D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="31" r="3.5" fill="#FFD43B" />
          <circle cx="32" cy="31" r="3.5" fill="#FFD43B" />
          <circle cx="44" cy="31" r="3.5" fill="#FFD43B" />
        </svg>
      );

    case 'shield_lock':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M32 4L12 12V28C12 43 20.5 54.5 32 60C43.5 54.5 52 43 52 28V12L32 4Z"
            fill="#007BFF"
            stroke="#FFD43B"
            strokeWidth="3.5"
          />
          <rect x="24" y="32" width="16" height="14" rx="3" fill="#FFD43B" stroke="#172B4D" strokeWidth="2" />
          <path d="M27 32V26C27 23.2 29.2 21 32 21C34.8 21 37 23.2 37 26V32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'heart_shield':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M32 4L12 12V28C12 43 20.5 54.5 32 60C43.5 54.5 52 43 52 28V12L32 4Z"
            fill="#172B4D"
            stroke="#FFD43B"
            strokeWidth="3"
          />
          <path
            d="M32 44C32 44 20 34 20 25C20 20 23.5 17 27.5 17C30 17 31.5 18.5 32 19.5C32.5 18.5 34 17 36.5 17C40.5 17 44 20 44 25C44 34 32 44 32 44Z"
            fill="#FF4B72"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      );

    case 'smartphone':
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <rect x="16" y="6" width="32" height="52" rx="6" fill="#172B4D" stroke="#007BFF" strokeWidth="3" />
          <rect x="20" y="12" width="24" height="40" rx="3" fill="#EAF4FF" />
          <circle cx="32" cy="48" r="2.5" fill="#007BFF" />
          <line x1="28" y1="9" x2="36" y2="9" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="24" fill="#007BFF" stroke="#FFD43B" strokeWidth="3" />
          <path d="M32 20V44M20 32H44" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
};

import React from 'react';
import { motion } from 'motion/react';

// Transparent 512x512 PNG icons with real alpha channel
import shieldImg from '../assets/icons/3d-shield.png';
import lupaImg from '../assets/icons/3d-lupa.png';
import phoneImg from '../assets/icons/3d-smartphone.png';
import heartImg from '../assets/icons/3d-heart.png';
import chatImg from '../assets/icons/3d-chat.png';
import cameraImg from '../assets/icons/3d-camera.png';
import lockImg from '../assets/icons/3d-lock.png';

export type Pixar3DIconName = 
  | 'shield' 
  | 'lupa' 
  | 'smartphone' 
  | 'heart' 
  | 'chat' 
  | 'camera' 
  | 'lock';

interface Pixar3DIconProps {
  name: Pixar3DIconName;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

const ICON_MAP: Record<Pixar3DIconName, string> = {
  shield: shieldImg,
  lupa: lupaImg,
  smartphone: phoneImg,
  heart: heartImg,
  chat: chatImg,
  camera: cameraImg,
  lock: lockImg,
};

export const Pixar3DIcon: React.FC<Pixar3DIconProps> = ({
  name,
  size = 56,
  className = '',
  animate = false,
}) => {
  const imgSrc = ICON_MAP[name] || shieldImg;

  // Pure transparent 3D image with object-contain and zero background/shadow wrapper
  const content = (
    <img
      src={imgSrc}
      alt={`3D Icon ${name}`}
      className="w-full h-full object-contain select-none pointer-events-none bg-transparent"
      loading="eager"
    />
  );

  if (!animate) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-transparent shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -3 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 18,
      }}
      className={`inline-flex items-center justify-center bg-transparent cursor-pointer shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {content}
    </motion.div>
  );
};

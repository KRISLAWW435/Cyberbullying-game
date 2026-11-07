import React from 'react';
import { motion } from 'motion/react';

import shieldImg from '../assets/icons/3d-shield.jpg';
import lupaImg from '../assets/icons/3d-lupa.jpg';
import phoneImg from '../assets/icons/3d-smartphone.jpg';
import heartImg from '../assets/icons/3d-heart.jpg';

export type Pixar3DIconName = 'shield' | 'lupa' | 'smartphone' | 'heart';

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
};

export const Pixar3DIcon: React.FC<Pixar3DIconProps> = ({
  name,
  size = 56,
  className = '',
  animate = true,
}) => {
  const imgSrc = ICON_MAP[name] || shieldImg;

  const content = (
    <img
      src={imgSrc}
      alt={`3D Icon ${name}`}
      style={{ mixBlendMode: 'multiply' }}
      className="w-full h-full object-contain select-none pointer-events-none"
    />
  );

  if (!animate) {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.12, y: -4, rotate: 2 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 18,
      }}
      className={`inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    >
      {content}
    </motion.div>
  );
};

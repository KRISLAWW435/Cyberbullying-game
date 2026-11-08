import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export interface FloatingIconItem {
  icon: LucideIcon;
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: number;
  duration?: number;
}

interface FloatingBackgroundProps {
  items: FloatingIconItem[];
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ items }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {items.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={idx}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
              rotate: [-6, 6, -6]
            }}
            transition={{
              repeat: Infinity,
              duration: item.duration || 4,
              ease: 'easeInOut',
              delay: item.delay || 0
            }}
            style={{
              position: 'absolute',
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              color: item.color
            }}
            className="opacity-25 sm:opacity-30 filter drop-shadow-sm"
          >
            <IconComponent size={item.size} />
          </motion.div>
        );
      })}
    </div>
  );
};

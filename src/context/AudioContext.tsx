import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import byteDetectiveUrl from '../assets/audio/Byte Detective.m4a';
import pixelHeroUrl from '../assets/audio/Pixel Hero.m4a';

interface AudioContextType {
  volume: number; // 0 to 1
  setVolume: (v: number) => void;
  isPlaying: boolean;
  hasStarted: boolean;
  currentTrackName: string;
  startMusic: () => void;
  togglePlay: () => void;
  updateStage: (stage: number) => void;
  resetMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode; currentStage: number }> = ({ 
  children, 
  currentStage 
}) => {
  const [volume, setVolumeState] = useState<number>(0.5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const byteAudioRef = useRef<HTMLAudioElement | null>(null);
  const finaleAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackRef = useRef<'byte' | 'finale'>('byte');

  // Initialize HTML5 Audio elements
  useEffect(() => {
    const byteAudio = new Audio(byteDetectiveUrl);
    byteAudio.loop = true;
    byteAudio.volume = volume;
    byteAudio.preload = 'auto';

    const finaleAudio = new Audio(pixelHeroUrl);
    finaleAudio.loop = true;
    finaleAudio.volume = volume;
    finaleAudio.preload = 'auto';

    byteAudioRef.current = byteAudio;
    finaleAudioRef.current = finaleAudio;

    return () => {
      byteAudio.pause();
      finaleAudio.pause();
    };
  }, []);

  // Sync volume changes
  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (byteAudioRef.current) byteAudioRef.current.volume = clamped;
    if (finaleAudioRef.current) finaleAudioRef.current.volume = clamped;
  };

  // Switch tracks according to stage
  useEffect(() => {
    if (!hasStarted) return;

    const isFinale = currentStage >= 7;
    const targetTrack = isFinale ? 'finale' : 'byte';

    if (targetTrack !== lastTrackRef.current) {
      lastTrackRef.current = targetTrack;

      if (targetTrack === 'finale') {
        if (byteAudioRef.current) {
          byteAudioRef.current.pause();
          byteAudioRef.current.currentTime = 0;
        }
        if (finaleAudioRef.current) {
          finaleAudioRef.current.currentTime = 0;
          finaleAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      } else {
        if (finaleAudioRef.current) {
          finaleAudioRef.current.pause();
          finaleAudioRef.current.currentTime = 0;
        }
        if (byteAudioRef.current) {
          byteAudioRef.current.currentTime = 0;
          byteAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    }
  }, [currentStage, hasStarted]);

  // Start music after user interaction (StartScreen click)
  const startMusic = () => {
    setHasStarted(true);
    const isFinale = currentStage >= 7;
    lastTrackRef.current = isFinale ? 'finale' : 'byte';

    const targetAudio = isFinale ? finaleAudioRef.current : byteAudioRef.current;
    const otherAudio = isFinale ? byteAudioRef.current : finaleAudioRef.current;

    if (otherAudio) {
      otherAudio.pause();
      otherAudio.currentTime = 0;
    }

    if (targetAudio) {
      targetAudio.currentTime = 0;
      targetAudio.volume = volume;
      targetAudio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play request prevented:', err);
      });
    }
  };

  // Toggle pause/play
  const togglePlay = () => {
    const activeAudio = lastTrackRef.current === 'finale' ? finaleAudioRef.current : byteAudioRef.current;
    if (!activeAudio) return;

    if (isPlaying) {
      activeAudio.pause();
      setIsPlaying(false);
    } else {
      activeAudio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Reset to initial track (for session reset)
  const resetMusic = () => {
    lastTrackRef.current = 'byte';
    if (finaleAudioRef.current) {
      finaleAudioRef.current.pause();
      finaleAudioRef.current.currentTime = 0;
    }
    if (byteAudioRef.current) {
      byteAudioRef.current.currentTime = 0;
      if (hasStarted) {
        byteAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const updateStage = (stage: number) => {
    // Already tracked by currentStage prop, but exposed if needed
  };

  const currentTrackName = lastTrackRef.current === 'finale' ? 'Pixel Hero' : 'Byte Detective';

  return (
    <AudioContext.Provider value={{
      volume,
      setVolume,
      isPlaying,
      hasStarted,
      currentTrackName,
      startMusic,
      togglePlay,
      updateStage,
      resetMusic
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useBackgroundMusic = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useBackgroundMusic must be used within an AudioProvider');
  }
  return context;
};

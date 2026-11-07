import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { MentorControls } from './components/MentorControls';
import { StartScreen } from './screens/StartScreen';
import { Screen2TeamMission } from './screens/Screen2TeamMission';
import { Screen3Detectives } from './screens/Screen3Detectives';
import { Screen4Investigation } from './screens/Screen4Investigation';
import { Screen5StopCrane } from './screens/Screen5StopCrane';
import { Screen6ObserverPower } from './screens/Screen6ObserverPower';
import { Screen7ChooseSuperpower } from './screens/Screen7ChooseSuperpower';
import { Screen8PledgeAndVictory } from './screens/Screen8PledgeAndVictory';

export default function App() {
  // Persistent session stage & score
  const [currentStage, setCurrentStage] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kiberone_stage');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [teamScore, setTeamScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kiberone_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [teamPowersCount, setTeamPowersCount] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('kiberone_powers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [scoreBonusTrigger, setScoreBonusTrigger] = useState<number>(0);
  const [isDiscussionMode, setIsDiscussionMode] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kiberone_stage', currentStage.toString());
      localStorage.setItem('kiberone_score', teamScore.toString());
      localStorage.setItem('kiberone_powers', JSON.stringify(teamPowersCount));
    } catch {
      // safe fallback
    }
  }, [currentStage, teamScore, teamPowersCount]);

  const handleAddScore = (points: number) => {
    setTeamScore((prev) => prev + points);
    setScoreBonusTrigger(points);
    setTimeout(() => {
      setScoreBonusTrigger(0);
    }, 2000);
  };

  const handleNextStage = () => {
    if (currentStage < 8) {
      setCurrentStage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToStage = (stageId: number) => {
    if (stageId >= 1 && stageId <= 8) {
      setCurrentStage(stageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetSession = () => {
    setCurrentStage(1);
    setTeamScore(0);
    setTeamPowersCount({});
    try {
      localStorage.removeItem('kiberone_stage');
      localStorage.removeItem('kiberone_score');
      localStorage.removeItem('kiberone_powers');
    } catch {
      // safe fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPower = (powerId: string) => {
    setTeamPowersCount((prev) => ({
      ...prev,
      [powerId]: (prev[powerId] || 0) + 1
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172B4D] selection:bg-[#FFD43B] selection:text-[#172B4D]">
      {/* Top Header Bar */}
      <HeaderBar
        currentStage={currentStage}
        totalStages={8}
        teamScore={teamScore}
        onPrevStage={handlePrevStage}
        onGoToStage={handleGoToStage}
        scoreBonusTrigger={scoreBonusTrigger}
      />

      {/* Main Stage View */}
      <main className="flex-1 w-full pb-28 pt-2">
        {currentStage === 1 && (
          <StartScreen onStart={handleNextStage} />
        )}

        {currentStage === 2 && (
          <Screen2TeamMission
            onStartMission1={handleNextStage}
            onAddScore={handleAddScore}
          />
        )}

        {currentStage === 3 && (
          <Screen3Detectives
            onCompleteMission={handleNextStage}
            onAddScore={handleAddScore}
          />
        )}

        {currentStage === 4 && (
          <Screen4Investigation
            onCompleteMission={handleNextStage}
            onAddScore={handleAddScore}
            isDiscussionMode={isDiscussionMode}
            onToggleDiscussionMode={() => setIsDiscussionMode(!isDiscussionMode)}
          />
        )}

        {currentStage === 5 && (
          <Screen5StopCrane
            onCompleteMission={handleNextStage}
            onAddScore={handleAddScore}
          />
        )}

        {currentStage === 6 && (
          <Screen6ObserverPower
            onCompleteMission={handleNextStage}
            onAddScore={handleAddScore}
          />
        )}

        {currentStage === 7 && (
          <Screen7ChooseSuperpower
            onCompleteStage={handleNextStage}
            onAddScore={handleAddScore}
            teamPowersCount={teamPowersCount}
            onSelectPower={handleSelectPower}
          />
        )}

        {currentStage === 8 && (
          <Screen8PledgeAndVictory
            teamScore={teamScore}
            teamPowersCount={teamPowersCount}
            onResetSession={handleResetSession}
          />
        )}
      </main>

      {/* Floating Bottom Touch Dock & Mentor Controls */}
      <MentorControls
        currentStage={currentStage}
        totalStages={8}
        onPrevStage={handlePrevStage}
        onNextStage={handleNextStage}
        onGoToStage={handleGoToStage}
        onResetSession={handleResetSession}
        onAddScoreBonus={handleAddScore}
        isDiscussionMode={isDiscussionMode}
        onToggleDiscussionMode={() => setIsDiscussionMode(!isDiscussionMode)}
      />
    </div>
  );
}

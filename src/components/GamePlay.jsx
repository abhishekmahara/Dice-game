import { useState } from "react";
import Navbar from "./layouts/Navbar";
import RulesModal from "./modals/RulesModal";
import SettingsModal from "./modals/SettingsModal";
import WinnerModal from "./modals/WinnerModal";

export const GamePlay = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [playerNames, setPlayerNames] = useState(["Player_One", "Player_two"]);
  const [targetScore, setTargetScore] = useState(100);
  const [showSettings, setShowSettings] = useState(false);

  const initGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setPlaying(true);
    setDice(1);
  };

  const switchPlayer = () => {
    setCurrentScore(0);
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  const rollDice = () => {
    if (playing && !rolling) {
      setRolling(true);
      const rollInterval = setInterval(() => {
        setDice(Math.trunc(Math.random() * 6) + 1);
      }, 70);

      setTimeout(() => {
        clearInterval(rollInterval);
        const rolled = Math.trunc(Math.random() * 6) + 1;
        setDice(rolled);
        setRolling(false);
        rolled !== 1 ? setCurrentScore((p) => p + rolled) : switchPlayer();
      }, 700);
    }
  };

  const holdScore = () => {
    if (playing && !rolling && currentScore > 0) {
      const updated = [...scores];
      updated[activePlayer] += currentScore;
      setScores(updated);
      updated[activePlayer] >= targetScore ? setPlaying(false) : switchPlayer();
    }
  };

  return (
    <div className=" flex flex-col items-center min-h-screen bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-red-600 ">
      {/* Navigation */}
      <div className="w-full">
<Navbar
        setShowInstructions={setShowInstructions}
        setShowSettings={setShowSettings}
      />
      </div>
      

      <main className="container mx-auto px-14 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] gap-10 sm:gap-12 items-center">
          {/* Player 1 Card */}
          <div
            className={`relative p-6 sm:p-8 rounded-[2rem] transition-all duration-500 border-2 ${activePlayer === 0 ? "bg-[#141414] border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.2)] scale-100 lg:scale-105" : "bg-transparent border-white/80 opacity-50"}`}
          >
            <div className="absolute -top-3 left-8 bg-red-600 px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white">
              Home
            </div>
            <h2 className="text-xl sm:text-2xl font-black italic uppercase truncate">
              {playerNames[0]}
            </h2>
            <div className="mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Banked
              </span>
              <div className="text-5xl sm:text-7xl font-black italic mt-1">
                {scores[0]}
              </div>
            </div>
            <div className="mt-6 h-1.5 w-full bg-white/45 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${Math.min((scores[0] / targetScore) * 100, 100)}%`,
                }}
                className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_#dc2626]"
              ></div>
            </div>
          </div>

          {/* Center Stage */}
          <div className="flex flex-col items-center order-first lg:order-none col-span-1 md:col-span-2 lg:col-span-1 pt-4">
            <div className="hidden lg:block mb-8 text-white/5 font-black text-6xl italic tracking-tighter select-none">
              VS
            </div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl overflow-hidden">
              <div
                className={`transition-all duration-300 ${rolling ? "animate-bounce scale-90" : "scale-100"}`}
              >
                <img
                  src={`/image/dice_${dice}.png`}
                  alt="dice"
                  className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 block py-2">
                Active Run
              </span>
              <h3
                className={`text-5xl sm:text-7xl font-black italic transition-all ${currentScore > 0 ? "text-white" : "text-white/10"}`}
              >
                {currentScore}
              </h3>
            </div>
          </div>

          {/* Player 2 Card */}
          <div
            className={`relative p-6 sm:p-8 rounded-[2rem] transition-all duration-500 border-2 ${activePlayer === 1 ? "bg-[#141414] border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.2)] scale-100 lg:scale-105" : "bg-transparent border-white/80 opacity-50"}`}
          >
            <div className="absolute -top-3 left-8 bg-white/10 px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white">
              Visitor
            </div>
            <h2 className="text-xl sm:text-2xl font-black italic uppercase truncate">
              {playerNames[1]}
            </h2>
            <div className="mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Banked
              </span>
              <div className="text-5xl sm:text-7xl font-black italic mt-1">
                {scores[1]}
              </div>
            </div>
            <div className="mt-6 h-1.5 w-full bg-white/35 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${Math.min((scores[1] / targetScore) * 100, 100)}%`,
                }}
                className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_10px_#dc2626]"
              ></div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 sm:mt-20 w-full max-w-lg flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={rollDice}
              disabled={!playing || rolling}
              className="flex-1 bg-red-600 hover:bg-red-700  disabled:text-white/60 text-white font-black italic py-5 rounded-2xl shadow-[0_8px_0_#991b1b] active:translate-y-1 active:shadow-none transition-all uppercase tracking-tighter text-xl"
            >
              Strike
            </button>
            <button
              onClick={holdScore}
              disabled={!playing || rolling || currentScore === 0}
              className="flex-1 bg-white hover:bg-gray-200 disabled:opacity-10 text-black font-black italic py-5 rounded-2xl shadow-[0_8px_0_#9ca3af] active:translate-y-1 active:shadow-none transition-all uppercase tracking-tighter text-xl"
            >
              Bank
            </button>
          </div>
          <button
            onClick={initGame}
            className="text-white/20 hover:text-red-500 font-black uppercase text-[10px] tracking-[0.3em] transition-all py-2"
          >
            Restart Match
          </button>
        </div>
      </main>

      {/* Rules Modal */}
      <RulesModal
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
      />

      {/* Settings Modal */}
      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        targetScore={targetScore}
        setTargetScore={setTargetScore}
        initGame={initGame}
      />
      {/* Winner Overlay */}
     <WinnerModal
  playing={playing}
  scores={scores}
  targetScore={targetScore}
  playerNames={playerNames}
  initGame={initGame}
/>
    </div>
  );
};

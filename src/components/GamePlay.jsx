import { useState, useEffect } from "react";

export const GamePlay = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2"]);
  const [targetScore, setTargetScore] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [rollHistory, setRollHistory] = useState([[], []]);

  const initGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setPlaying(true);
    setDice(1);
    setRollHistory([[], []]);
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
      }, 100);

      setTimeout(() => {
        clearInterval(rollInterval);
        const rolled = Math.trunc(Math.random() * 6) + 1;
        setDice(rolled);
        setRolling(false);

        setRollHistory((prev) => {
          const updated = [...prev];
          updated[activePlayer] = [...updated[activePlayer], rolled].slice(-10);
          return updated;
        });

        rolled !== 1 ? setCurrentScore((p) => p + rolled) : switchPlayer();
      }, 1000);
    }
  };

  const holdScore = () => {
    if (playing && !rolling) {
      const updated = [...scores];
      updated[activePlayer] += currentScore;
      setScores(updated);

      updated[activePlayer] >= targetScore ? setPlaying(false) : switchPlayer();
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!playing && e.key.toLowerCase() !== "n") return;
      if (e.key === "r") rollDice();
      if (e.key === "h") holdScore();
      if (e.key === "n") initGame();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing, rolling]);

  const progressWidth = (i) =>
    `${Math.min(100, Math.round((scores[i] / targetScore) * 100))}%`;

  return (
    <div className="relative flex flex-col items-center justify-center bg-white text-black pt-10 md:pt-12 font-poppins px-4 sm:px-6">
      {/* Top Controls */}
      <div className="fixed md:absolute top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center gap-2">
        <button
          onClick={() => setShowInstructions(true)}
          className="w-9 h-9 sm:w-auto sm:h-auto flex items-center justify-center sm:px-4 sm:py-2 rounded-xl bg-gradient-to-b from-black to-black/80 text-white shadow hover:opacity-90 transition"
        >
          ℹ
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="w-9 h-9 sm:w-auto sm:h-auto flex items-center justify-center sm:px-4 sm:py-2 rounded-xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500
 text-black shadow hover:opacity-90 transition"
        >
          ⚙
        </button>
      </div>
      {/* Title */}
      <h1 className="font-extrabold text-4xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-10 tracking-wider uppercase text-center pb-6 md:pb-8">
        <span className="text-gray-600"> Dice </span>Masters
      </h1>
      {/* Game Layout */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-15 w-full max-w-7xl justify-center items-stretch">
        {/* Player 1 */}
        <div
          className={`w-full max-w-sm md:w-[320px] lg:w-150 flex flex-col items-center justify-center rounded-2xl text-center shadow-lg transition 
          ${
            activePlayer === 0
              ? "bg-gray-100 lg:scale-105 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
              : "bg-gray-50"
          } ${
            !playing && scores[0] >= targetScore
              ? "bg-black text-white shadow-[0_0_40px_10px_rgba(0,255,0,0.8)]"
              : ""
          } p-5`}
        >
          <h2 className="text-xl sm:text-2xl font-bold uppercase">
            {playerNames[0]}
          </h2>
          <p className="text-lg font-semibold mt-2">Total: {scores[0]}</p>

          <div className="w-full max-w-xs h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: progressWidth(0) }}
            />
          </div>

          <p className="mt-2">
            Current: {activePlayer === 0 ? currentScore : 0}
          </p>

          <div className="mt-3 w-full max-w-xs text-xs text-gray-600">
            <p className="font-semibold">Last rolls:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {rollHistory[0].slice(-8).map((r, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-gray-100 border"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-10">
          <p className="text-xl sm:text-2xl font-semibold mb-4 uppercase">
            {playing ? `${playerNames[activePlayer]}'s Turn` : "Game Over"}
          </p>

          <div
            className={`w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center mb-6 ${
              rolling ? "animate-bounce" : ""
            }`}
          >
            <img
              src={`/image/dice_${dice}.png`}
              alt="dice"
              className="w-14 md:w-16 lg:w-24"
            />
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={rollDice}
              disabled={!playing || rolling}
              className="min-w-[100px] h-12  bg-gradient-to-b from-black to-black/80 text-white rounded-lg font-bold shadow hover:scale-105 transition disabled:opacity-40"
            >
              Roll
            </button>
            <button
              onClick={holdScore}
              disabled={!playing || rolling}
              className="min-w-[100px] h-12 bg-gradient-to-b from-gray-800 to-gray-600 text-white rounded-lg font-bold shadow hover:scale-105 transition disabled:opacity-40"
            >
              Hold
            </button>
            <button
              onClick={initGame}
              className="min-w-[100px] h-12 bg-gradient-to-b from-gray-300 to-gray-200 text-black rounded-lg font-bold shadow hover:scale-105 transition"
            >
              Reset
            </button>
          </div>

          {!playing && (
            <p className="mt-6 text-xl sm:text-2xl font-bold text-amber-400">
              🏆 {scores[0] >= targetScore ? playerNames[0] : playerNames[1]}{" "}
              Wins!
            </p>
          )}
        </div>

        {/* Player 2 */}
        <div
          className={`w-full max-w-sm md:w-[320px] lg:w-150 flex flex-col items-center justify-center rounded-2xl text-center shadow-lg transition
          ${
            activePlayer === 1
              ? "bg-gray-100 lg:scale-105 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
              : "bg-gray-50"
          } ${
            !playing && scores[1] >= targetScore
              ? "bg-black text-white shadow-[0_0_40px_10px_rgba(0,255,0,0.8)]"
              : ""
          } p-5`}
        >
          <h2 className="text-xl sm:text-2xl font-bold uppercase">
            {playerNames[1]}
          </h2>
          <p className="text-lg font-semibold mt-2">Total: {scores[1]}</p>

          <div className="w-full max-w-xs h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: progressWidth(1) }}
            />
          </div>

          <p className="mt-2">
            Current: {activePlayer === 1 ? currentScore : 0}
          </p>

          <div className="mt-3 w-full max-w-xs text-xs text-gray-600">
            <p className="font-semibold">Last rolls:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {rollHistory[1].slice(-8).map((r, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-gray-100 border"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-11/12 max-w-2xl max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-3 right-3 font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Each player rolls the dice.</li>
              <li>Rolling 1 resets turn score.</li>
              <li>Hold to save points.</li>
              <li>Reach {targetScore} to win.</li>
            </ul>
          </div>
        </div>
      )}
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 transition-opacity duration-300 ease-in-out px-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-6 md:p-10 w-11/12 max-w-lg md:max-w-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">Settings</h2>

            <div className="flex flex-col gap-4">
              {/* Player 1 Name */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Player 1 Name</span>
                <input
                  className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                  value={playerNames[0]}
                  onChange={(e) =>
                    setPlayerNames([e.target.value, playerNames[1]])
                  }
                />
              </label>

              {/* Player 2 Name */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Player 2 Name</span>
                <input
                  className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                  value={playerNames[1]}
                  onChange={(e) =>
                    setPlayerNames([playerNames[0], e.target.value])
                  }
                />
              </label>

              {/* Target Score (NO LIMIT) */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Target Score</span>
                <input
                  type="number"
                  className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                  value={targetScore}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTargetScore(value === "" ? "" : Number(value));
                  }}
                />
              </label>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    initGame();
                    setShowSettings(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-b from-black to-black/80 text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setPlayerNames(["Player 1", "Player 2"]);
                    setTargetScore(50);
                    initGame();
                    setShowSettings(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-black font-semibold shadow-md hover:scale-105 transition"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

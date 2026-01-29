import { useState, useEffect } from "react";

export const GamePlay = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false); // NEW state
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
        const randomFace = Math.trunc(Math.random() * 6) + 1;
        setDice(randomFace);
      }, 100);

      setTimeout(() => {
        clearInterval(rollInterval);
        const rolled = Math.trunc(Math.random() * 6) + 1;
        setDice(rolled);
        setRolling(false);

        // Track roll history for the active player
        setRollHistory((prev) => {
          const updated = [...prev];
          updated[activePlayer] = [...updated[activePlayer], rolled].slice(-10);
          return updated;
        });

        if (rolled !== 1) {
          setCurrentScore((prev) => prev + rolled);
        } else {
          switchPlayer();
        }
      }, 1000);
    }
  };

  const holdScore = () => {
    if (playing && !rolling) {
      const newScores = [...scores];
      newScores[activePlayer] += currentScore;
      setScores(newScores);

      if (newScores[activePlayer] >= targetScore) {
        setPlaying(false);
      } else {
        switchPlayer();
      }
    }
  };

  // Keyboard shortcuts: R (roll), H (hold), N (reset)
  useEffect(() => {
    const handleKey = (e) => {
      if (!playing && e.key.toLowerCase() !== "n") return;
      const key = e.key.toLowerCase();
      if (key === "r") {
        rollDice();
      } else if (key === "h") {
        holdScore();
      } else if (key === "n") {
        initGame();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing, rolling, activePlayer, scores, currentScore, targetScore]);

  const progressWidth = (playerIndex) => {
    const pct = Math.min(
      100,
      Math.round((scores[playerIndex] / targetScore) * 100),
    );
    return `${pct}%`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-white text-black pt-10 md:pt-15 font-poppins px-4 sm:px-6">
      {/* Top Controls */}
      <div
              className="
          fixed md:absolute 
          top-3 right-3 sm:top-5 sm:right-5 
          z-50
          flex items-center gap-2 sm:gap-3
        "
      >
        <button
          onClick={() => setShowInstructions(true)}
                className="w-10 h-10 sm:w-auto sm:h-autoflex items-center justify-center
            px-0 sm:px-5 py-0 sm:py-2
            rounded-2xl bg-gradient-to-br from-black  to-black/70 text-white font-semibold
            shadow-md
            hover:opacity-90
            transition
          "
              >
          ℹ
        </button>

        <button
          onClick={() => setShowSettings(true)}
                  className="
              w-10 h-10 sm:w-auto sm:h-auto
              flex items-center justify-center
              px-0 sm:px-4 py-0 sm:py-2
              rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-black font-semibold
              shadow-md
              hover:opacity-90
              transition"
        >
          ⚙
        </button>
      </div>

      {/* Title */}
      <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl mb-6 md:mb-10 tracking-wider uppercase text-center pb-6 md:pb-10 font-poppins">
        Dice Game
      </h1>

      {/* Game Layout */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-15 w-full max-w-7xl justify-center items-stretch">
        {/* Player 1 */}
        <div
          className={`w-full max-w-sm lg:w-150 md:w-80 md:h-80 flex flex-col items-center justify-center rounded-2xl text-center shadow-lg transition 
          ${
            activePlayer === 0
              ? "scale-100 md:scale-105 bg-gray-100 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
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
          <p className="text-lg sm:text-xl font-semibold mt-2">
            Total: {scores[0]}
          </p>
          <div className="w-full max-w-xs h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: progressWidth(0) }}
            />
          </div>
          <p className="mt-2 text-base sm:text-lg">
            Current: {activePlayer === 0 ? currentScore : 0}
          </p>
          {/* Roll history */}
          <div className="mt-3 w-full max-w-xs text-xs sm:text-sm text-gray-600">
            <p className="font-semibold">Last rolls:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {rollHistory[0].slice(-8).map((r, idx) => (
                <span
                  key={`p1-${idx}`}
                  className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Dice + Controls */}
        <div className="flex flex-col items-center justify-center p-6 md:p-10">
          <p className="text-xl sm:text-2xl font-semibold mb-4 uppercase pb-4">
            {playing ? `${playerNames[activePlayer]}'s Turn` : "Game Over"}
          </p>

          {/* Dice Area */}
          <div
            className={`w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-6 ${
              rolling ? "animate-bounce" : ""
            }`}
          >
            <img
              src={`/image/dice_${dice}.png`}
              alt={`Dice ${dice}`}
              className="w-16 sm:w-20 md:w-24"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
            <button
              onClick={rollDice}
              disabled={!playing || rolling}
              className="min-w-[96px] sm:min-w-[120px] h-12 rounded-lg bg-black text-white font-bold italic shadow-md hover:scale-105 transition disabled:opacity-40 px-4"
              title="R"
            >
              Roll
            </button>
            <button
              onClick={holdScore}
              disabled={!playing || rolling}
              className="min-w-[96px] sm:min-w-[120px] h-12 border-white rounded-lg bg-gray-800 text-white font-bold italic shadow-md hover:scale-105 transition disabled:opacity-40 px-4"
              title="H"
            >
              Hold
            </button>
            <button
              onClick={initGame}
              className="min-w-[96px] sm:min-w-[120px] h-12 rounded-lg bg-gray-200 text-black font-bold italic shadow-md hover:scale-105 transition px-4"
              title="N"
            >
              Reset
            </button>
          </div>

          {/* Winner */}
          {!playing && (
            <p className="mt-6 text-xl sm:text-2xl font-bold uppercase text-amber-300 pt-10">
              🏆 {scores[0] >= targetScore ? playerNames[0] : playerNames[1]}{" "}
              Wins!
            </p>
          )}
        </div>

        {/* Player 2 */}
        <div
          className={`w-full max-w-sm  lg:w-150 md:w-80 md:h-80 flex flex-col items-center justify-center rounded-2xl text-center shadow-lg transition
          ${
            activePlayer === 1
              ? "scale-100 md:scale-105 bg-gray-100 shadow-[0_0_25px_rgba(0,0,0,0.3)]"
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
          <p className="text-lg sm:text-xl font-semibold mt-2">
            Total: {scores[1]}
          </p>
          <div className="w-full max-w-xs h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: progressWidth(1) }}
            />
          </div>
          <p className="mt-2 text-base sm:text-lg">
            Current: {activePlayer === 1 ? currentScore : 0}
          </p>
          {/* Roll history */}
          <div className="mt-3 w-full max-w-xs text-xs sm:text-sm text-gray-600">
            <p className="font-semibold">Last rolls:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {rollHistory[1].slice(-8).map((r, idx) => (
                <span
                  key={`p2-${idx}`}
                  className="px-2 py-0.5 rounded bg-gray-100 border border-gray-200"
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/90 bg-opacity-50 transition-opacity duration-300 ease-in-out px-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-6 md:p-10 w-11/12 max-w-lg md:max-w-2xl relative animate-fadeIn">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Play</h2>
            <ul className="pl-5 space-y-2 text-base md:text-lg list-disc">
              <li>Each player takes turns rolling the dice.</li>
              <li>
                If you roll a 1, your turn ends and your current turn score
                resets.
              </li>
              <li>
                You can "Hold" to save your current turn score to your total.
              </li>
              <li>First player to reach {targetScore} points wins.</li>
              <li className="text-xs md:text-sm text-gray-500">
                Shortcuts: R = Roll, H = Hold, N = Reset
              </li>
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
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Target Score</span>
                <input
                  type="number"
                  min={10}
                  max={500}
                  className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                  value={targetScore}
                  onChange={(e) =>
                    setTargetScore(
                      Math.max(10, Math.min(500, Number(e.target.value) || 0)),
                    )
                  }
                />
              </label>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 rounded-lg bg-black text-white font-semibold shadow-md hover:scale-105 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setPlayerNames(["Player 1", "Player 2"]);
                    setTargetScore(50);
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

const SettingsModal = ({
  showSettings,
  setShowSettings,
  playerNames,
  setPlayerNames,
  targetScore,
  setTargetScore,
  initGame,
}) => {
  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
      <div className="bg-[#111] border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">

        {/* Close Button */}
        <button
          onClick={() => setShowSettings(false)}
          className="absolute top-6 right-6 text-gray-500 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-black italic uppercase mb-8 text-red-600 tracking-tighter">
          Arena Config
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Player Names */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Player Identities
            </label>

            <input
              className="w-full bg-black border border-white/10 p-4 rounded-xl font-bold outline-none focus:border-red-600 transition-all"
              value={playerNames[0]}
              onChange={(e) =>
                setPlayerNames([e.target.value, playerNames[1]])
              }
              placeholder="Player 1"
            />

            <input
              className="w-full bg-black border border-white/10 p-4 rounded-xl font-bold outline-none focus:border-red-600 transition-all"
              value={playerNames[1]}
              onChange={(e) =>
                setPlayerNames([playerNames[0], e.target.value])
              }
              placeholder="Player 2"
            />
          </div>

          {/* Target Score */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Victory Threshold
            </label>

            <input
              type="number"
              className="w-full bg-black border border-white/10 p-4 rounded-xl font-bold outline-none focus:border-red-600"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={() => {
              initGame();
              setShowSettings(false);
            }}
            className="w-full bg-red-600 py-4 rounded-xl font-black uppercase shadow-lg shadow-red-600/20 active:scale-95 transition-transform"
          >
            Save & Restart
          </button>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
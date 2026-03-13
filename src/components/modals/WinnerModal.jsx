const WinnerModal = ({ playing, scores, targetScore, playerNames, initGame }) => {
  if (playing) return null;

  const winner = scores[0] >= targetScore ? playerNames[0] : playerNames[1];

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
      
      {/* Title */}
      <div className="text-red-600 font-black uppercase tracking-[0.5em] mb-4 text-xs">
        Champion Crowned
      </div>

      <div className="flex flex-col gap-10 items-center">

        {/* Winner Name */}
        <h2 className="text-5xl sm:text-8xl font-black italic uppercase mb-12">
          {winner} <span className="text-red-600">Wins</span>
        </h2>

        {/* Restart Button */}
        <button
          onClick={initGame}
          className="bg-red-600 text-white px-16 py-5 rounded-full font-black uppercase italic tracking-widest hover:scale-110 transition shadow-[0_0_30px_rgba(220,38,38,0.5)]"
        >
          New Match
        </button>

      </div>
    </div>
  );
};

export default WinnerModal;
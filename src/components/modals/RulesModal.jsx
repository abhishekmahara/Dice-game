const RulesModal = ({ showInstructions, setShowInstructions }) => {
  if (!showInstructions) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
      <div className="bg-[#111] border border-white/10 p-8 rounded-[2rem] w-full max-w-lg shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setShowInstructions(false)}
          className="absolute top-6 right-6 text-gray-500 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-black italic uppercase mb-6 text-red-600 tracking-tighter">
          Battle Rules
        </h2>

        {/* Rules */}
        <div className="flex flex-col gap-3 text-md text-gray-400 font-medium">
          <p className="flex gap-3">
            <span className="text-red-600 font-black">01</span>
            Roll to accumulate points in your "Active Run".
          </p>

          <p className="flex gap-3">
            <span className="text-red-600 font-black">02</span>
            Roll a <span className="text-white font-bold underline">1</span> and
            your current run is wiped out.
          </p>

          <p className="flex gap-3">
            <span className="text-red-600 font-black">03</span>
            Tap "Bank" to secure your points to your total score.
          </p>

          {/* Close Button */}
          <button
            onClick={() => setShowInstructions(false)}
            className="w-full mt-6 bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
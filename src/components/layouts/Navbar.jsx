import { FiSettings } from "react-icons/fi";

const Navbar = ({ setShowInstructions, setShowSettings }) => {
  return (
    <nav className="border-b border-white/5 bg-black/60 backdrop-blur-md px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center -rotate-3 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
          <img
            src="/dicemasters.png"
            alt="Dice Masters"
            className="rounded-lg"
          />
        </div>

        <h1 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter">
          Dice<span className="text-red-600">Masters</span>
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={() => setShowInstructions(true)}
          className="text-gray-400 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors"
        >
          Rules
        </button>

        <button
          onClick={() => setShowSettings(true)}
          className="bg-white/5 hover:bg-white/10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all"
        >
          <FiSettings size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
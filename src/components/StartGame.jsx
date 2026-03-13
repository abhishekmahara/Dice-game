import React from "react";

const StartGame = ({ toggle }) => {
  return (
    <section className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 px-6 sm:px-12">
        
        {/* Left Section: High-End Dice Visual */}
        <div className="md:w-1/2 flex justify-center order-2 md:order-1">
          <div className="relative group">
            {/* Red Glow behind dice */}
            <div className="absolute inset-0 bg-red-600/20 blur-3xl group-hover:bg-red-600/30 transition-all duration-700 rounded-full scale-75"></div>
            <img
              src="./dices.png"
              alt="Dice Masters Arena"
              className="w-56 sm:w-72 md:w-[450px] relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
            />
          </div>
        </div>

        {/* Right Section: Branding & CTA */}
        <div className="md:w-1/2 text-center md:text-left order-1 md:order-2 ">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
               <span className="h-[2px] w-8 bg-red-600"></span>
               <span className="text-red-500 text-xs font-black uppercase tracking-[0.4em]">Season Is Live</span>
            </div>

            <h1 className="font-black italic text-6xl sm:text-7xl lg:text-9xl leading-[0.85] tracking-tighter text-white mb-6">
              DICE
              <span className="block text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">MASTERS</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-md leading-relaxed mb-10 font-medium">
              Join the elite arena of <span className="text-white italic">strategic rolling</span>. 
              Battle opponents, bank your points, and dominate the leaderboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={toggle}
                className="group relative px-12 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(220,38,38,0.4)] overflow-hidden"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000"></div>
                
                <span className="relative z-10 flex items-center gap-3 font-black italic uppercase tracking-widest text-lg">
                  Enter Arena
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="absolute bottom-8 left-0 w-full px-12 flex justify-between items-end opacity-20 hidden md:flex">
         <div className="text-[10px] font-black uppercase tracking-widest">Global Championship Series</div>
         <div className="text-[10px] font-black uppercase tracking-widest">© 2026 DiceMasters Studio</div>
      </div>
    </section>
  );
};

export default StartGame;
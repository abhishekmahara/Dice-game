const StartGame = ({ toggle }) => {
  return (
    <section className="min-h-screen  bg-white relative overflow-hidden flex items-center justify-center">
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16 px-2 sm:px-10">
        {/* Dice Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="./dices.png"
            alt="Dice Game"
            className="w-44 sm:w-56 md:w-72 drop-shadow-[0_30px_80px_rgba(0,0,0,0.18)] animate-float"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Inner stack — spacing controlled HERE */}
          <div className="flex flex-col gap-6">
            <h1
              className="font-poppins text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
              font-extrabold tracking-tight text-black leading-none"
            >
              DICE
              <span className="block text-black/50">MASTERS</span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
              A thoughtfully crafted dice game built on <br />
              balance, strategy, and seamless play.
            </p>

            {/* Button with EXTRA separation */}
            <div className="pt-1">
              <button
                onClick={toggle}
                className="group relative inline-flex items-center justify-center
                      px-14 py-4 text-sm sm:text-base font-semibold uppercase tracking-widest
                      text-white
                      bg-gradient-to-b from-black to-black/80
                      rounded-md
                      transition-all duration-700 ease-out
                      hover:text-black
                      hover:bg-none hover:bg-gray-300"
              >
                <span className="relative z-10">Play Now</span>

                <span
                  className="absolute inset-0 rounded-md 
                ring-1 ring-black/20 scale-110 opacity-0 
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-300"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartGame;

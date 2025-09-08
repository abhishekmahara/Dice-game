
const StartGame = ( {toggle}) => {
  return (
    <div className="max-w-1180px flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center pt-6 md:pt-10 px-4 sm:px-6">
      <img src="./dices.png" alt="Dices" className="w-40 sm:w-56 md:w-auto" />
      <div className="relative flex-col justify-center items-center text-center md:text-left">
      <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl font-bold whitespace-nowrap"> DICE GAME</h1>
      <button className="mt-4 md:mt-0 md:absolute md:top-25 md:right-1 text-sm sm:text-base py-2 px-8 sm:px-10 bg-black rounded-sm text-white 
                  cursor-pointer  hover:scale-110 hover:bg-gray-900 transition-all duration-300 ease-in-out" onClick={toggle}>Play Now</button>
      </div>
    </div>
  )
} 

export default StartGame;

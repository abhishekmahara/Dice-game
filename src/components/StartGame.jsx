
const StartGame = () => {
  return (
    <div className="max-w-1180px flex  justify-center items-center pt-10" >
      <img src="./public/dices.png" alt="Dices" />
      <div className="relative flex-col justify-center items-center ">
      <h1 className="font-poppins text-8xl font-bold whitespace-nowrap"> DICE GAME</h1>
      <button className=" absolute top-25 right-1 text-base py-1 px-10 bg-black rounded-sm text-white 
                  cursor-pointer  hover:scale-110 hover:bg-gray-900 transition-all duration-300 ease-in-out">Play Now</button>
      </div>
    </div>
  )
} 

export default StartGame;

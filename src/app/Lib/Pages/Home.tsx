//@ts-nocheck
"use client"
import { useState } from "react";

const PLAYERS = ["Amezan", "Ashim", "Mukesh", "Sandesh"];

function getRandomTurn(players){
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

function getGameWord(){
  const everydayObjects = [
  "pen", "chair", "table", "bottle", "phone", "lamp", "mirror", "cup", "spoon", "pencil",
  "notebook", "shoe", "sock", "towel", "toothbrush", "soap", "plate", "fork", "bag", "hat",
  "glove", "clock", "key", "remote", "wallet", "book", "fan", "bed", "pillow", "blanket",
  "scissors", "comb", "brush", "laptop", "charger", "mouse", "keyboard", "monitor", "stapler", "tape",
  "eraser", "ruler", "marker", "mug", "pan", "bowl", "napkin", "umbrella", "shampoo", "toothpaste",
  "hanger", "mirror", "bucket", "broom", "dustpan", "mop", "soap", "detergent", "tissue", "razor",
  "candle", "sponge", "lighter", "match", "tray", "clock", "cushion", "curtain", "lens", "tripod",
  "helmet", "bottle opener", "can", "jar", "basket", "bin", "flashlight", "screwdriver", "hammer", "pliers",
  "nail", "tape measure", "ladder", "toolbox", "glasses", "watch", "belt", "jacket", "scarf", "jeans",
  "umbrella", "thermometer", "iron", "kettle", "blender", "microwave", "toaster", "fan", "vacuum", "speaker"
];

  const word = Math.floor(Math.random() * everydayObjects.length);
  return everydayObjects[word];
}

function getImposter(players){
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}

function getRand(x){
   return Math.floor(Math.random() * x);
}

export default function Home() {
  const [players, setPlayers] = useState(PLAYERS);
  const [turn, setTurn] = useState("");
  const [gameWord, setGameWord] = useState("");
  const [imposter, setImposter] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [seeResult, setSeeResult] = useState(false);
  const [usedPlayers, setUsedPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [showPlayerManagement, setShowPlayerManagement] = useState(false);

  function changeTurn(){
      setSeeResult(false);
      const newUsedPlayers = [...usedPlayers, turn];
      setUsedPlayers(newUsedPlayers);

      const availablePlayers = players.filter(player => !newUsedPlayers.includes(player));
      
      if(availablePlayers.length > 0){
        const randomIndex = getRand(availablePlayers.length);
        setTurn(availablePlayers[randomIndex]);
      } else {
        // Game round finished, reset for new round
        setHasStarted(false);
        setUsedPlayers([]);
        setTurn("");
        setGameWord("");
        setImposter("");
      }
  }

  function seeWord(){
    if(turn === imposter){
      return "IMPOSTER"
    }
    else{
      return gameWord;
    }
  }

  function addPlayer(){
    if(newPlayerName.trim() && !players.includes(newPlayerName.trim())){
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName("");
    }
  }

  function removePlayer(playerToRemove){
    if(players.length > 2){ // Keep at least 2 players
      setPlayers(players.filter(player => player !== playerToRemove));
    }
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      addPlayer();
    }
  }

  function togglePlayerManagement(){
    setShowPlayerManagement(!showPlayerManagement);
  }

  function startGame(){
    setHasStarted(true); 
    setTurn(getRandomTurn(players)); 
    setGameWord(getGameWord());
    setImposter(getImposter(players));
    setUsedPlayers([]);
    setShowPlayerManagement(false); // Close player management when game starts
  }
  
  return (
   <div className="p-4 max-w-md mx-auto">
      <h1 className="text-center text-2xl text-slate-900 font-black mt-2">Imposter Game</h1>

      <div className="mt-3 flex items-center gap-2 justify-center">
        <span>Number of players:</span>
        <button 
          onClick={togglePlayerManagement}
          disabled={hasStarted}
          className={`px-3 py-1 rounded transition-colors ${
            hasStarted 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
          }`}
        >
          {players.length}
        </button>
      </div>

      {showPlayerManagement && !hasStarted && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-center">Manage Players</h3>
          
          {/* Add Player */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter player name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={addPlayer}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Player List */}
          <div className="space-y-2 mb-4">
            {players.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="font-medium">{player}</span>
                <button
                  onClick={() => removePlayer(player)}
                  disabled={players.length <= 2}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    players.length <= 2 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowPlayerManagement(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="mt-20 flex items-center justify-center">
          {!hasStarted && (
            <button 
              onClick={startGame}
              className="p-2 active:scale-95 bg-green-700 text-white rounded-full px-4 hover:bg-green-800 transition-colors"
            >
              Start Game
            </button>
          )}
      </div>

      {hasStarted && (
        <div>
            <div className="mt-20 flex flex-col gap-2 text-4xl font-bold items-center justify-center">
                {turn}'s Turn
                <span className="text-xs font-medium">hand over the phone</span>
            </div>
            <div className="mt-20 flex items-center justify-center">
              <button 
                onClick={() => setSeeResult(true)} 
                className="p-2 active:scale-95 bg-green-700 text-white rounded-full px-4 hover:bg-green-800 transition-colors"
              >
                I got the phone
              </button>
            </div>

            {seeResult && (
              <div className="flex items-center justify-center flex-col gap-2">
                <div className="mt-20 text-center text-xl font-bold uppercase">
                  {seeWord()}
                </div>
                
                <button 
                  onClick={changeTurn} 
                  className="p-2 active:scale-95 bg-green-700 text-white rounded-full px-4 hover:bg-green-800 transition-colors"
                >
                  OK
                </button>
              </div>
            )}
        </div>
      )}

   </div>
  );
}
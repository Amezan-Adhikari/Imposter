//@ts-nocheck
"use client";
import React, { useState } from 'react';
import { Users, Clock, Eye, ArrowRight, Plus, Minus, Play, RotateCcw, UserMinus } from 'lucide-react';
import Link from 'next/link';

const GAME_WORDS = [
  "pen", "chair", "table", "bottle", "phone", "lamp", "mirror", "cup", "spoon", "pencil",
  "notebook", "shoe", "sock", "towel", "toothbrush", "soap", "plate", "fork", "bag", "hat",
  "glove", "clock", "key", "remote", "wallet", "book", "fan", "bed", "pillow", "blanket",
  "scissors", "comb", "brush", "laptop", "charger", "mouse", "keyboard", "monitor", "stapler", "tape",
  "eraser", "ruler", "marker", "mug", "pan", "bowl", "napkin", "umbrella", "shampoo", "toothpaste",
  "hanger", "bucket", "broom", "dustpan", "mop", "detergent", "tissue", "razor", "candle", "sponge",
  "lighter", "match", "tray", "cushion", "curtain", "lens", "tripod", "helmet", "bottle opener", "can",
  "jar", "basket", "bin", "flashlight", "screwdriver", "hammer", "pliers", "nail", "tape measure",
  "ladder", "toolbox", "glasses", "watch", "belt", "jacket", "scarf", "jeans", "thermometer", "iron",
  "kettle", "blender", "microwave", "toaster", "vacuum", "speaker", "headphones", "camera", "sunglasses",
  "skateboard", "drone", "guitar", "ukulele", "drum", "paintbrush", "canvas", "lego", "dice", "gamepad",
  "joystick", "projector", "popcorn", "mask", "comic", "notepad", "rubik's cube", "figurine", "torch",
  "walkie-talkie", "beanbag", "lava lamp", "snow globe", "slippers", "record player", "vinyl", "radio",
  "controller", "cactus", "succulent", "globe", "trophy", "medal", "badge", "puzzle", "kite", "magnets",
  "lantern", "binoculars", "compass", "map", "chessboard", "checkers", "domino", "ping pong", "frisbee",
  "suitcase", "passport", "luggage", "airpods", "stylus", "whiteboard", "megaphone", "timer", "thermos",
  "ice tray", "cooler", "fan remote", "mini fridge", "beanie", "hoodie", "action figure", "drinking straw"
];

const WordImposterGame = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing, discussion, gameOver
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameWord, setGameWord] = useState('');
  const [imposterIndex, setImposterIndex] = useState(-1);
  const [showWord, setShowWord] = useState(false);
  const [usedPlayers, setUsedPlayers] = useState([]);

  const getRandomWord = () => {
    return GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)];
  };

  const getRandomImposter = (playerCount) => {
    return Math.floor(Math.random() * playerCount);
  };

  const addPlayer = () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  const startGame = () => {
    if (players.length < 3) return;
    
    const word = getRandomWord();
    const imposter = getRandomImposter(players.length);
    
    setGameWord(word);
    setImposterIndex(imposter);
    setCurrentPlayerIndex(0);
    setUsedPlayers([]);
    setShowWord(false);
    setGameState('playing');
  };

  const showPlayerWord = () => {
    setShowWord(true);
  };

  const nextPlayer = () => {
    const nextIndex = currentPlayerIndex + 1;
    setUsedPlayers([...usedPlayers, currentPlayerIndex]);
    setShowWord(false);
    
    if (nextIndex >= players.length) {
      setGameState('discussion');
    } else {
      setCurrentPlayerIndex(nextIndex);
    }
  };

  const endGame = () => {
    setGameState('gameOver');
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentPlayerIndex(0);
    setGameWord('');
    setImposterIndex(-1);
    setShowWord(false);
    setUsedPlayers([]);
  };

  const getCurrentWord = () => {
    return currentPlayerIndex === imposterIndex ? 'IMPOSTER' : gameWord;
  };

  const isImposter = () => {
    return currentPlayerIndex === imposterIndex;
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-[poppins]">
        {/* Navigation */}
        <nav className="px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Word Imposter</span>
            </Link>
            <div className="text-sm text-gray-600">Setup Game</div>
          </div>
        </nav>

        {/* Setup Section */}
        <div className="px-6 py-16 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Setup Your <span className="text-orange-500">Game</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Add players to start the game. You need at least 3 players to begin.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm text-gray-700">
                <Users className="w-4 h-4 inline mr-2" />
                {players.length} Players
              </div>
              <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm text-gray-700">
                <Clock className="w-4 h-4 inline mr-2" />
                5-10 min
              </div>
            </div>
          </div>

          {/* Add Player Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Players</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter player name"
                className=" md:flex-1 w-3/4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={addPlayer}
                className="px-3 md:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className='md:block hidden'>Add</span>
              </button>
            </div>
          </div>

          {/* Players List */}
          {players.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Players ({players.length})</h3>
              <div className="space-y-3">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-medium text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{player}</span>
                    </div>
                    <button
                      onClick={() => removePlayer(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Game Button */}
          <div className="text-center">
            <button
              onClick={startGame}
              disabled={players.length < 3}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 mx-auto ${
                players.length >= 3
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Play className="w-5 h-5" />
              Start Game
              <ArrowRight className="w-5 h-5" />
            </button>
            {players.length < 3 && (
              <p className="text-sm text-gray-500 mt-2">You need at least 3 players to start</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-[poppins]">
        {/* Navigation */}
        <nav className="px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Word Imposter</span>
            </div>
            <div className="text-sm text-gray-600">
              {currentPlayerIndex + 1} / {players.length}
            </div>
          </div>
        </nav>

        {/* Game Section */}
        <div className="px-6 py-16 max-w-2xl mx-auto text-center">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentPlayerIndex + 1) / players.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {!showWord ? (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {players[currentPlayerIndex]}'s Turn
                </h2>
                <p className="text-gray-600">
                  Pass the device to {players[currentPlayerIndex]}
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-xl mb-6">
                <p className="text-orange-800 font-medium">
                  📱 Hand over the phone to {players[currentPlayerIndex]}
                </p>
              </div>

              <button
                onClick={showPlayerWord}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Eye className="w-5 h-5" />
                I Have the Phone
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isImposter() 
                    ? 'bg-gradient-to-br from-red-100 to-red-200' 
                    : 'bg-gradient-to-br from-green-100 to-green-200'
                }`}>
                  <span className={`text-2xl ${isImposter() ? 'text-red-600' : 'text-green-600'}`}>
                    {isImposter() ? '🎭' : '📝'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Word</h2>
                <p className="text-gray-600 mb-6">
                  {isImposter() 
                    ? "You are the imposter! Try to blend in without knowing the word."
                    : "Remember this word and discuss it with others to find the imposter."
                  }
                </p>
              </div>

              <div className={`p-8 rounded-xl mb-6 ${
                isImposter() 
                  ? 'bg-red-50 border-2 border-red-200' 
                  : 'bg-green-50 border-2 border-green-200'
              }`}>
                <div className={`text-4xl font-bold ${
                  isImposter() ? 'text-red-600' : 'text-green-600'
                }`}>
                  {getCurrentWord()}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <p className="text-gray-700 text-sm">
                  💡 <strong>Tip:</strong> {isImposter() 
                    ? "Listen carefully to others and try to figure out what they're talking about!"
                    : "Discuss the word naturally but watch for suspicious behavior!"
                  }
                </p>
              </div>

              <button
                onClick={nextPlayer}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <ArrowRight className="w-5 h-5" />
                {currentPlayerIndex < players.length - 1 ? 'Next Player' : 'Start Discussion'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'discussion') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-[poppins]">
        {/* Navigation */}
        <nav className="px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Word Imposter</span>
            </div>
            <div className="text-sm text-gray-600">Discussion Time</div>
          </div>
        </nav>

        {/* Discussion Section */}
        <div className="px-6 py-16 max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗣️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Discussion <span className="text-orange-500">Time</span>!
              </h2>
              <p className="text-gray-600 mb-8">
                Everyone has seen their word. Now discuss and find the imposter!
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">🎯 How to Play</h3>
              <div className="space-y-3 text-sm text-blue-800 text-left">
                <div className="flex items-start gap-2">
                  <span className="font-medium">1.</span>
                  <span>Discuss the word naturally without saying it directly</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">2.</span>
                  <span>Watch for suspicious behavior or vague responses</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">3.</span>
                  <span>Vote to eliminate the suspected imposter</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">4.</span>
                  <span>Imposter wins if they survive or guess the word!</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-orange-900 mb-3">Game Info</h3>
              <div className="space-y-2 text-sm text-orange-800">
                <div className="flex justify-between">
                  <span>Players:</span>
                  <span className="font-medium">{players.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Word Category:</span>
                  <span className="font-medium">Everyday Objects</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={endGame}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Eye className="w-5 h-5" />
                Reveal Results
              </button>
              
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <RotateCcw className="w-5 h-5" />
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-[poppins]">
        {/* Navigation */}
        <nav className="px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Word Imposter</span>
            </div>
            <div className="text-sm text-gray-600">Game Results</div>
          </div>
        </nav>

        {/* Game Over Section */}
        <div className="px-6 py-16 max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Game <span className="text-orange-500">Results</span>!
              </h2>
              <p className="text-gray-600 mb-8">
                Here's how the game played out
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-orange-900 mb-3">Game Summary</h3>
              <div className="space-y-2 text-sm text-orange-800">
                <div className="flex justify-between">
                  <span>The Word:</span>
                  <span className="font-medium text-lg">{gameWord}</span>
                </div>
                <div className="flex justify-between">
                  <span>The Imposter:</span>
                  <span className="font-medium text-lg">{players[imposterIndex]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Players:</span>
                  <span className="font-medium">{players.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-green-900 mb-3">All Players</h3>
              <div className="space-y-2">
                {players.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === imposterIndex 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {index === imposterIndex ? '🎭' : '✅'}
                      </div>
                      <span className="font-medium">{player}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      index === imposterIndex ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {index === imposterIndex ? 'Imposter' : 'Innocent'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default WordImposterGame;
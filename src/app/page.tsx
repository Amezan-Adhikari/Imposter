import React from 'react';
import { Users, Clock, Heart, Play, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-[poppins]">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">SUS GAMES</span>
          </div>
          <div className="text-sm text-gray-600">Game Platform</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              Live Now
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find the <span className="text-orange-500">Sus</span> One Out
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Play social deduction games with friends on a single device. 
              Trust no one, suspect everyone.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm text-gray-700">
              <Users className="w-4 h-4 inline mr-2" />
              Single Device
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm text-gray-700">
              4-12 Players
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm text-gray-700">
              No Download
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 italic">
            "Trust the crew or play the spy, speak the truth or tell a lie. 
            One by one, the lights go dim — can you tell who's not like them?"
          </blockquote>
        </div>
      </section>

      {/* Games Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Games
            </h2>
            <p className="text-gray-600">Choose your game and start the fun</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Word Imposter Game Card */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Word Imposter</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Everyone gets a word except one player. Find the imposter through discussion.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>Players</span>
                  </div>
                  <span className="font-medium text-gray-900">4-12</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium text-gray-900">5-10 min</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span>Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <Link href={"/wordimposter"} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group">
                <Play className="w-4 h-4" />
                Play Now
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Coming Soon Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 opacity-60">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-2xl">🎭</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Chor Police</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Secret roles, hidden agendas. Can you complete your mission?
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Players</span>
                  <span className="text-gray-400">4-15</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-gray-400">10-20 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-orange-500 font-medium">Coming Soon</span>
                </div>
              </div>
              
              <button className="w-full bg-gray-200 text-gray-500 font-medium py-3 px-6 rounded-xl cursor-not-allowed">
                Coming Soon
              </button>
            </div>

            {/* Coming Soon Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 opacity-60">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-2xl">🔍</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon...</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Solve clues together while one player sabotages the investigation.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Players</span>
                  <span className="text-gray-400">5-10</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-gray-400">15-25 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-orange-500 font-medium">Coming Soon</span>
                </div>
              </div>
              
              <button className="w-full bg-gray-200 text-gray-500 font-medium py-3 px-6 rounded-xl cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            Why Choose SUS Games?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Single Device</h3>
              <p className="text-sm text-gray-600">
                Pass one phone around. No downloads, no setup required.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Games</h3>
              <p className="text-sm text-gray-600">
                Perfect for parties, breaks, or anytime you need quick fun.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Social Fun</h3>
              <p className="text-sm text-gray-600">
                Build trust, create suspicion, and have unforgettable moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">SUS GAMES</span>
          </div>
          <p className="text-sm text-gray-600">
            The world's best social deduction game platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
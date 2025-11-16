import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MatchCard from '../components/MatchCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Matches = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [previousMatches, setPreviousMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const matchesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const now = new Date();
      const upcoming = [];
      const previous = [];

      matchesData.forEach(match => {
        const matchDate = new Date(match.date);
        if (matchDate >= now) {
          upcoming.push(match);
        } else {
          previous.push(match);
        }
      });

      setUpcomingMatches(upcoming);
      setPreviousMatches(previous);
    };

    fetchMatches();
  }, []);

  const getResultBasedOnScore = (result) => {
    if (!result) return 'D';
    const scores = result.split('-').map(Number);
    if (scores[0] > scores[1]) return 'W';
    if (scores[0] < scores[1]) return 'L';
    return 'D';
  }

  const stats = {
    totalMatches: previousMatches.length,
    wins: previousMatches.filter(m => getResultBasedOnScore(m.result) === 'W').length,
    draws: previousMatches.filter(m => getResultBasedOnScore(m.result) === 'D').length,
    losses: previousMatches.filter(m => getResultBasedOnScore(m.result) === 'L').length,
    winRate: previousMatches.length > 0 ? Math.round((previousMatches.filter(m => getResultBasedOnScore(m.result) === 'W').length / previousMatches.length) * 100) : 0
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Matches
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow our journey through the season with live updates, match results, and upcoming fixtures
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-sm text-gray-400">Total Matches</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalMatches}</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span className="text-sm text-gray-400">Wins</span>
            </div>
            <div className="text-3xl font-bold text-green-500">{stats.wins}</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <Minus className="w-6 h-6 text-yellow-500" />
              <span className="text-sm text-gray-400">Draws</span>
            </div>
            <div className="text-3xl font-bold text-yellow-500">{stats.draws}</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-6 h-6 text-red-500" />
              <span className="text-sm text-gray-400">Losses</span>
            </div>
            <div className="text-3xl font-bold text-red-500">{stats.losses}</div>
          </div>
        </div>

        {/* Win Rate Banner */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.winRate}%</div>
            <div className="text-lg text-gray-300">Win Rate This Season</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats.winRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Matches
              </div>
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'previous'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Previous Matches
              </div>
            </button>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'upcoming' ? (
            upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} isUpcoming={true} />
            ))
          ) : (
            previousMatches.map((match) => (
              <MatchCard key={match.id} match={match} isUpcoming={false} />
            ))
          )}
        </div>

        {/* Empty State */}
        {activeTab === 'upcoming' && upcomingMatches.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Upcoming Matches</h3>
            <p className="text-gray-500">Check back later for new fixtures</p>
          </div>
        )}

        {activeTab === 'previous' && previousMatches.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Previous Matches</h3>
            <p className="text-gray-500">Match history will appear here</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Never miss a match! Get live updates, exclusive content, and behind-the-scenes access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
                Get Notifications
              </button>
              <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300">
                Join Fan Club
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matches;

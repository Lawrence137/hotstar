import React from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Play, Ticket, Tv } from 'lucide-react';

const MatchCard = ({ match, isUpcoming = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'W': return 'text-green-500';
      case 'L': return 'text-red-500';
      case 'D': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  const getResultText = (result) => {
    switch (result) {
      case 'W': return 'Won';
      case 'L': return 'Lost';
      case 'D': return 'Draw';
      default: return 'TBD';
    }
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500">{match.competition}</span>
          </div>
          {!isUpcoming && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${getResultColor(match.result)} bg-gray-800`}>
              {getResultText(match.result)}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(match.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{match.venue}</span>
          </div>
        </div>
      </div>

      {/* Teams and Score */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-white mb-2">
              {match.homeTeam}
            </div>
            {match.homeTeam === 'Hotstar FC' && (
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                HFC
              </div>
            )}
          </div>

          {/* VS or Score */}
          <div className="px-6">
            {isUpcoming ? (
              <div className="text-2xl font-bold text-yellow-500">VS</div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {match.homeScore !== undefined && match.awayScore !== undefined ? `${match.homeScore} - ${match.awayScore}` : 'N/A'}
                </div>
                <div className="text-sm text-gray-400">Full Time</div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-white mb-2">
              {match.awayTeam}
            </div>
            {match.awayTeam === 'Hotstar FC' && (
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                HFC
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span>{isUpcoming ? `Expected: ${match.expectedAttendance?.toLocaleString()}` : `Attended: ${match.attendance?.toLocaleString()}`}</span>
          </div>
          {isUpcoming && (
            <div className="flex items-center gap-2 text-gray-400">
              <Ticket className="w-4 h-4" />
              <span>{match.ticketPrice}</span>
            </div>
          )}
          {isUpcoming && (
            <div className="flex items-center gap-2 text-gray-400 col-span-2">
              <Tv className="w-4 h-4" />
              <span>Broadcast: {match.broadcast}</span>
            </div>
          )}
        </div>
      </div>

      {/* Highlights or Action Button */}
      <div className="px-6 pb-6">
        {isUpcoming ? (
          <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <Ticket className="w-5 h-5" />
            Buy Tickets
          </button>
        ) : (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-yellow-500 mb-2">Match Highlights:</div>
            <div className="space-y-1">
              {match.highlights?.slice(0, 3).map((highlight, index) => (
                <div key={index} className="text-sm text-gray-400 flex items-center gap-2">
                  <Play className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Watch Highlights
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
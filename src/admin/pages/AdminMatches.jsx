import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminMatches = () => {
  const [matches, setMatches] = useState([]);
  const [opponent, setOpponent] = useState('');
  const [opponentLogo, setOpponentLogo] = useState('');
  const [date, setDate] = useState('');
  const [homeOrAway, setHomeOrAway] = useState('Home');
  const [result, setResult] = useState('');
  const [goals, setGoals] = useState([]);

  const [goalTime, setGoalTime] = useState('');
  const [goalScorer, setGoalScorer] = useState('');

  const fetchMatches = async () => {
    const querySnapshot = await getDocs(collection(db, 'matches'));
    const matchesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMatches(matchesData);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'matches'), {
        opponent,
        opponentLogo,
        date,
        homeOrAway,
        result,
        goals,
      });
      setOpponent('');
      setOpponentLogo('');
      setDate('');
      setHomeOrAway('Home');
      setResult('');
      setGoals([]);
      fetchMatches();
    } catch (error) {
      console.error('Error adding match: ', error);
    }
  };

  const handleDeleteMatch = async (id) => {
    try {
      await deleteDoc(doc(db, 'matches', id));
      fetchMatches();
    } catch (error) {
      console.error('Error deleting match: ', error);
    }
  };

  const handleAddGoal = () => {
    if (goalTime && goalScorer) {
      setGoals([...goals, { time: goalTime, scorer: goalScorer }]);
      setGoalTime('');
      setGoalScorer('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Matches</h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">Add New Match</h2>
        <form onSubmit={handleAddMatch} className="space-y-4">
          <div>
            <label className="block">Opponent</label>
            <input
              type="text"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block">Opponent Logo URL</label>
            <input
              type="text"
              value={opponentLogo}
              onChange={(e) => setOpponentLogo(e.target.value)}
              className="w-full p-2 border"
            />
          </div>
          <div>
            <label className="block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block">Home/Away</label>
            <select
              value={homeOrAway}
              onChange={(e) => setHomeOrAway(e.target.value)}
              className="w-full p-2 border"
            >
              <option>Home</option>
              <option>Away</option>
            </select>
          </div>
          <div>
            <label className="block">Result</label>
            <input
              type="text"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full p-2 border"
              placeholder="e.g., 2-1"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Goals</h3>
            <div className="space-y-2">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{goal.time}' - {goal.scorer}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={goalTime}
                onChange={(e) => setGoalTime(e.target.value)}
                className="p-2 border"
                placeholder="Time (e.g., 45')"
              />
              <input
                type="text"
                value={goalScorer}
                onChange={(e) => setGoalScorer(e.target.value)}
                className="p-2 border"
                placeholder="Scorer"
              />
              <button
                type="button"
                onClick={handleAddGoal}
                className="bg-green-500 text-white p-2 rounded"
              >
                Add Goal
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Match
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Existing Matches</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Opponent</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Result</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td className="border p-2">{match.opponent}</td>
                <td className="border p-2">{match.date}</td>
                <td className="border p-2">{match.result}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteMatch(match.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMatches;

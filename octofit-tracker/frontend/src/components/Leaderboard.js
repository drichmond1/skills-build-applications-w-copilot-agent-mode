import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <h2 className="mb-3 text-primary">Leaderboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>User</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.user || '-'}</td>
              <td>{entry.team || '-'}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

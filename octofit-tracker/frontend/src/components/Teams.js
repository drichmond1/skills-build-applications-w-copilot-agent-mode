import React, { useEffect, useState } from 'react';

const Teams = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <h2 className="mb-3 text-primary">Teams</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={idx}>
              <td>{team.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;

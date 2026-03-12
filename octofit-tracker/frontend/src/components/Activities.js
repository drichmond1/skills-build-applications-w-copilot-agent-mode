import React, { useEffect, useState } from 'react';

const Activities = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <h2 className="mb-3 text-primary">Activities</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>User</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={idx}>
              <td>{activity.name}</td>
              <td>{activity.user || '-'}</td>
              <td>{activity.team || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;

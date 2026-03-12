import React, { useEffect, useState } from 'react';

const Users = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const endpoint = `https://${codespaceName}-8000.app.github.dev/api/users/`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      });
  }, [endpoint]);

  return (
    <div className="mt-4">
      <h2 className="mb-3 text-primary">Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

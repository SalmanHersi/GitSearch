import React, { useEffect, useState } from 'react';

const Popular = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.github.com/search/users?q=followers:>1000&sort=followers&order=desc&per_page=10");
        const data = await response.json();
        setUsers(data.items);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        let userRepos = {};
        for (const user of users) {
          const response = await fetch(`https://api.github.com/users/${user.login}/repos?sort=stars&direction=desc&per_page=1`);
          const data = await response.json();
          userRepos[user.login] = data[0];
        }
        setRepos(userRepos);
      } catch (error) {
        console.error(error);
      }
    };

    if (users.length > 0) {
      fetchRepos();
    }
  }, [users]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Top 10 GitHub Users by Followers</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-4 p-4 border rounded-lg bg-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{user.login}</h3>
            <p className="text-sm mb-2">
              <a href={user.html_url} className="text-blue-600" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </p>
            <p className="text-sm mb-2">Most Popular Repo: {repos[user.login]?.name || 'Loading...'}</p>
            <p className="text-sm">
              Repo Link: 
              {repos[user.login] 
                ? <a href={repos[user.login]?.html_url} className="text-blue-600 ml-1" target="_blank" rel="noopener noreferrer">Visit Repo</a>
                : ' Loading...'
              }
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;

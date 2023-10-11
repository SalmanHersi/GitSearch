import React, { useEffect, useState } from 'react';

const Popular = () => {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState({});
  const [sortType, setSortType] = useState('stars');
  const [userFilter, setUserFilter] = useState('followers');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${userFilter}:>1000&sort=${userFilter}&order=desc&per_page=10`);
        const data = await response.json();
        setUsers(data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [userFilter]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        let userRepos = {};
        for (const user of users) {
          const response = await fetch(`https://api.github.com/users/${user.login}/repos?per_page=5`);
          const data = await response.json();
          userRepos[user.login] = data.sort((a, b) => b[sortType] - a[sortType])[0];
        }
        setRepos(userRepos);
      } catch (error) {
        console.error(error);
      }
    };
    if (users.length > 0) {
      fetchRepos();
    }
  }, [users, sortType]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleUserFilterChange = (e) => {
    setUserFilter(e.target.value);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Top 10 GitHub Users</h2>
      <label htmlFor="userFilter" className="mb-4 block text-white">Filter Users by: </label>
      <select id="userFilter" value={userFilter} onChange={handleUserFilterChange} className="mb-6 border p-2">
        <option value="followers">Most Followers</option>
        <option value="following">Most Following</option>
        <option value="repos">Most Repos</option>
      </select>
      <label htmlFor="sortType" className="mb-4 block text-white">Sort Repos by: </label>
      <select id="sortType" value={sortType} onChange={handleSortChange} className="mb-6 border p-2">
        <option value="stars">Most Starred</option>
        <option value="forks">Most Forked</option>
      </select>
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

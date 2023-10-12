import React, { useState } from 'react';

const FilteredRepos = () => {
  const [repos, setRepos] = useState([]);
  const [topic, setTopic] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Predefined popular tech terms.
  const popularTerms = ["React", "JavaScript", "Blockchain", "Crypto", "Machine Learning", "AI", "Cybersecurity", "Cloud Computing", "NFT", "Metaverse"];

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=topic:${topic}&sort=stars&order=desc&per_page=10`);
      const data = await response.json();
      if (data.items) {
        setRepos(data.items);
      } else {
        setError(data.message || "Unknown error occurred");
        setRepos([]);
      }
    } catch (error) {
      setError("Network error: Couldn't fetch the data");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (topic) {
      fetchRepos();
    }
  };

  // Function to handle clicking popular term buttons
  const handlePopularTermClick = (term) => {
    setTopic(term);
    fetchRepos();
  };

  return (
    <div className="p-3 md:p-8">
      <h2 className="text-3xl font-bold  md:mb-3 text-white">Search GitHub Repos by Topic</h2>
      
      {/* Popular Search Terms Buttons */}
      <div className="invisible lg:visible md:mb-6">
        {popularTerms.map((term) => (
          <button 
            key={term}
            onClick={() => handlePopularTermClick(term)}
            className="bg-gray-200 p-2 md:m-1 rounded"
          >
            {term}
          </button>
        ))}
      </div>
      
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-6 ">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)} 
          className="border p-2 mr-2"
          placeholder="Enter topic..."
        />
        <button type="submit" className="bg-blue-600 text-white p-2">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      {/* Display Repositories */}
      {!loading && !error && (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} className="mb-4 p-4 border rounded-lg bg-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
              <p className="text-sm mb-2">{repo.description}</p>
              <a href={repo.html_url} className="text-blue-600" target="_blank" rel="noopener noreferrer">Visit Repo</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredRepos;

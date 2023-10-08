import React, { useState, useEffect } from "react";

const Search = ({ setUserData, setLoading }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 900);

    return () => clearTimeout(timerId);
  }, [query]);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    setIsLoading(true);
    setUserData(null);
    try {
      const res = await fetch(`https://api.github.com/users/${searchTerm}`);
      const data = await res.json();
      if (!res.ok || data.message) {
        setError("User not found");
        return;
      }
      setUserData(data);
      addToLocalStorage(data, searchTerm);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const addToLocalStorage = (data, username) => {
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    const userExists = users.find((user) => user.id === username);

    if (userExists) {
      users.splice(users.indexOf(userExists), 1);
    }
    users.unshift({
      id: username,
      avatar_url: data.avatar_url,
      name: data.name,
      url: data.html_url,
    });

    localStorage.setItem("github-users", JSON.stringify(users));
  };

  const clearSearch = () => {
    setQuery("");
    setUserData(null);
    setError("");
    setLoading(false);
    setIsLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          performSearch(query);
        }}
        className="flex flex-col p-4 justify-center items-center space-y-5 mt-3 text-center"
      >
        <input
          type="text"
          placeholder="Type a username"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          value={query}
          onChange={(e) => {
            setError("");
            setQuery(e.target.value);
          }}
        />
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-green-200 rounded-md px-4 py-1"
            disabled={!query || isLoading}
            style={{ opacity: !query || isLoading ? 0.5 : 1 }}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            className="bg-red-200 rounded-md px-4 py-1"
            onClick={clearSearch}
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            Clear Search
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default Search;

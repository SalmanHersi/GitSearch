import React, { useState } from "react";

const Search = ({ setUserData, setLoading }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true); //Loading function
    setUserData(null); //No initial data
    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      const data = await res.json();
      console.log("Data test", data);
      // Check if the user exists
      if (data.message) {
        setError("User not found");
        return; // Exit
      }
      setUserData(data); // If no error, fetch data
      addToLocalStorage(data, query);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); //Remove spinner
    }
  };

  const addToLocalStorage = (data, username) => {
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    const userexists = users.find((user) => user.id === username);
    if (userexists) {
      users.splice(users.indexOf(userexists), 1);
    }
    users.unshift({
      id: username,
      avatar_url: data.avatar_url,
      name: data.name,
      url: data.html_url,
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col p-4 justify-center items-center space-y-5 mt-3 text-center"
      >
        <input
          type="text"
          placeholder="Type a username"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-center
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-200 rounded-md px-4 py-1"
          disabled={!query}
          style={{ opacity: !query ? 0.5 : 1 }}
        >
          Search
        </button>
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

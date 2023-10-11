import React, { useState, useEffect } from "react";
import useDebounce from './Debounce';


const Search = ({ setUserData, setLoading }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query, 300);
  
  const randomUsernames = [
    "knadh",
    "JayantGoel001",
    "paulirish",
    "tonymorris",
    "alysonla",
    "LeaVerou",
    "jlord",
    "silentbicycle",
    "kennethreitz",
    "jashkenas",
    "addyosmani",
    "sebastienros",
    "SaraSoueidan",
    "visionmedia",
    "c9s",
    "fabpot",
    "weierophinney",
    "springmeyer",
    "dcramer",
    "jeromeetienne",
    "ornicar",
    "davglass",
    "postmodern",
    "tmcw",
    "isaacs",
    "substack",
    "fsouza",
    "taylorotwell",
    "yihui",
    "josevalim",
    "kevinsawicki",
    "jordansissel",
    "kripken",
    "sferik",
    "Raynos",
    "Shougo",
    "ekmett",
    "svenfuchs",
    "radar",
    "TooTallNate",
    "dominictarr",
    "davidfowl",
    "drnic",
    "snoyberg",
    "kohsuke",
    "agentzh",
    "paulmillr",
    "ayende",
    "tokuhirom",
    "aheckmann",
  ]; //Popular users

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 900);

    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery).then((suggestions) => {
        setSuggestions(suggestions);
      });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await res.json();
      return data.items || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const selectSuggestion = (username) => {
    setQuery(username);
    setSuggestions([]);
  };

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

  const getRandomUsername = () => {
    const randomIndex = Math.floor(Math.random() * randomUsernames.length);
    return randomUsernames[randomIndex];
  };

  const handleLuckyButtonClick = () => {
    const randomUsername = getRandomUsername();
    setQuery(randomUsername);
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
    <div className=" mt-32">
        <h3 className="text-center font-semibold text-white text-2xl">Search for labbers!</h3>
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
          className="mt-1 block w-1/2 px-3 py-3 bg-white border border-orange-300 rounded-md text-sm shadow-lg placeholder-slate-400 placeholder:text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
          value={query}
          onChange={(e) => {
            setError("");
            setQuery(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <ul className="bg-white border rounded-md  mt-2 w-full max-h-40 overflow-auto w-1/2">
            {suggestions.map((user) => (
              <li
                key={user.id}
                onClick={() => selectSuggestion(user.login)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
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
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLuckyButtonClick}
          >
            I'm Feeling Lucky
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

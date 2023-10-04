"use client";
import React from "react";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  return (
    <form
      action=""
      className=" flex flex-col p-4 justify-center items-center space-y-5 mt-3 text-center"
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
        className=" bg-green-200 rounded-md px-4 py-1"
        disabled={!query}
        style={{ opacity: !query ? 0.5 : 1 }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;

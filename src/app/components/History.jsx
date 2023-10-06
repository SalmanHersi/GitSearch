"use client";
import React, { useState, useEffect } from "react";

const renderUser = (user) => (
  <div
    key={user.id}
    className="flex items-center bg-white bg-opacity-20 w-full hover:bg-opacity-40 rounded p-2 cursor-pointer justify-between"
  >
    <div className="flex gap-2 items-center">
      <imgage
        className="block w-16 h-16 rounded-full"
        alt={user.name}
        src={user.avatar_url}
      />
      <div>
        <p className="font-bold"> {user.name || "User"} </p>
        <p className="text-sm text-gray-400">{user.id}</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <a
        href={user.url}
        className="text-sm text-black bg-green-200 px-2 py-1 rounded hover:bg-green-300"
      >
        Visit
      </a>
    </div>
  </div>
);

const History = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    setSearchHistory(users);
  }, []);

  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4">Search History</div>
      {searchHistory.map(renderUser)}
    </div>
  );
};

export default History;

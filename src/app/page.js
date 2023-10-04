"use client";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { useState } from "react";
import UserProfile from "./components/UserProfile";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <div className=" container mx-auto ">
      <Navbar />
      <h3 className="text-center font-semibold">Search for labbers!</h3>
      <Search setUserData={(res) => setUserData(res)} setLoading={setLoading}/>
      {userData && <UserProfile userData={userData} />}
    </div>
  );
}

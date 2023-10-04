"use client";
import Navbar from "./components/navbar";
import Search from "./components/search";
import { useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (
    <div className=" container mx-auto ">
      <Navbar />
      <h3 className="text-center font-semibold">Search for labbers!</h3>
      <Search setUserData={(res) => setUserData(res)} setLoading={setLoading}/>
      {/* <UserProfile /> */}
    </div>
  );
}

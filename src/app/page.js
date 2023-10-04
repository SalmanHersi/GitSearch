"use client";
import Navbar from "./components/navbar";
import Search from "./components/Search";

export default function Home() {
  return (
    <div className=" container mx-auto ">
      <Navbar />
      <h3 className="text-center font-semibold">Search for labbers!</h3>
      <Search />
    </div>
  );
}

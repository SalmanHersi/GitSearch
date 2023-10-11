"use client"
import React from 'react'
import Navbar from "../components/Navbar";
import FilteredRepos from '../components/FilteredRepos'


const Repos = () => {
  return (
    <div className='container mx-auto'>
   <Navbar/>
      <FilteredRepos/>
    </div>
  )
}

export default Repos
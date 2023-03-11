import React from 'react'
import {Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#131318] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        Sidebar
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280] mx-auto sm:pr-5">
        Navbar
      </div>
    </div>
  )
}

export default App
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import { CreateProject, Home, Profile, ProjectDetails, PreHome } from './pages';
import { Sidebar, Navbar } from './components';
import { useStateContext } from './context';

const App = () => {

  const { connect, address } = useStateContext();

  return (

    <div>
      {address ? (
        <>
          <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
              <Sidebar />
            </div>

            <div className="flex-1 max-sm:w-full max-w-[1280] mx-auto sm:pr-5">
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/project-details/:id" element={<ProjectDetails />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        
          <div className="flex-1 max-sm:w-full max-w-[1280] mx-auto sm:pr-5">
            <PreHome />
          </div>
          
      )}


    </div>


  )
}

export default App
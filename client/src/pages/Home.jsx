import React, { useState, useEffect } from 'react'

import { DisplayProjects } from '../components'
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const { address, contract, getProjects } = useStateContext();

  const fetchProjects = async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchProjects();
  }, [address, contract]);

  
  return (

    <DisplayProjects 
      title= "Todos los projectos⚒️"
      isLoading={isLoading}
      projects={projects}
    />
  )
}

export default Home
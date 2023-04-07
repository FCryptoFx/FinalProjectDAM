import React from 'react'
import { useNavigate } from 'react-router-dom';

import { loader } from '../assets';
import FundCard from './FundCard';



const DisplayProjects = ({ title, isLoading, projects }) => {
  const navigate = useNavigate();

  //Función para manejar la navegación de los proyectos
  const handleNavigate = (project) =>{
    navigate(`/project-details/${ project.title }`, { state : project })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({projects.length})</h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {/*Si la pagina està cargando mostraremos el gif de cargando*/}
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {/*Si ya no està cargando y la longitud de projects es igual a 0, mostraremos un texto*/}
        {!isLoading && projects.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No tienes ningún proyecto creado aún, ánimate!!
          </p>
        )}

        {/*si no està cargando y la longitud es mayor a 0, mostraremos los projectos*/}
        {!isLoading && projects.length > 0 && projects.map((project) => 
        <FundCard 
          key={project.id}
          {...project}
          handleClick={() => handleNavigate(project)}
        />)}
      </div>
    </div>
  )
}

export default DisplayProjects
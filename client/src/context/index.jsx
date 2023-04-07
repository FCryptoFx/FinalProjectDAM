import React, { useContext, createContext } from "react";

// Elementos necesarios para la web3
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

/* Con "StateContextProvider" proporcionamos un contexto de estado para los componentes secundarios que se anidan dentro de él, 
en este caso dentro de este contexto renderizaremos el componente children*/
export const StateContextProvider = ({ children }) => { 

    //Conectamos nuestro smartContract
    const { contract } = useContract('0x340f00f74c9d5e19e7086316629455f25f348ae3');
    const { mutateAsync: createProject } = useContractWrite(contract, 'createProject');

    //Conectamos con la wallet del usuario
    const address = useAddress();
    const connect = useMetamask();

    //Función para poder publicar proyectos en la blockchain
    const publishProject = async (form) => {
        try {
          const data = await createProject([ //Los datos a continuación deben coincidir en orden con los parametros de entrada de la función "createProject" de nuestro SC
            address,
            form.title, 
            form.description, 
            form.target,
            new Date(form.deadline).getTime(), //esto nos devuelve el número de segundos que han pasado desde 1970 (JavaScript Rules)
            form.image
          ])
          console.log("La llamada al smart contract ha resultado existosa", data)
          
        } catch (error) {
          console.log("La llamada al smart contract ha fallado.", error)
        }
      }

    // Función para poder recoger los proyectos publicados
    const getProjects = async () => {
      const projects = await contract.call('getProjects');

      //Recogemos los datos del contrato que nos important y los formateamos para hacerlos visuales
      const parsedProjects = projects.map((project, i) => ({
        owner: project.owner,
        title: project.title,
        description: project.description,
        target: ethers.utils.formatEther(project.target.toString()), //Pasamus un BigNumber a un string legible
        deadline: project.deadline.toNumber(), //Pasamos un BigNumber a un number legible
        amountCollected: ethers.utils.formatEther(project.amountCollected.toString()), //Pasamos un BigNumber a un string legible
        image: project.image,
        pId: i
      }));
  
      return parsedProjects;
    }

    //Recogemos solo los proyectos creados por el usuario
    const getUserProjects = async () => {
      const allProjects = await getProjects();
  
      const filteredProjects = allProjects.filter((project) => project.owner === address);
  
      return filteredProjects;
    }

    //Recogemos la cantidad donada a un proyecto
    const donate = async (pId, amount) => {
      const data = await contract.call('contributeToProject', pId, { value: ethers.utils.parseEther(amount)});
  
      return data;
    }

    //Recogemos quien ha donado a que proyecto
    const getDonations = async (pId) => {
      const donations = await contract.call('getContributors', pId);
      const numberOfDonations = donations[0].length;
  
      const parsedDonations = [];
  
      for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        })
      }
  
      return parsedDonations;
    }

    return (
      <StateContext.Provider
        value={{
          address,
          contract,
          connect,
          createProject : publishProject, //Renombramos la función "createProject" para utilizar, en este caso, "publishProject"
          getProjects,
          getUserProjects,
          getDonations,
          donate
        }}
      >

        {children} {/*Renderizamos el children dentro del "StateContextProvider*/}
      </StateContext.Provider>
    )
  }

  export const useStateContext = () => useContext(StateContext);
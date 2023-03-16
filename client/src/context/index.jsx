import React, { useContext, createContext } from "react";

// Elementos necesarios para la web3
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
//import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

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

      return (
        <StateContext.Provider
          value={{
            address,
            contract,
            connect,
            createProject : publishProject //Renombramos la función "createProject" para utilizar, en este caso, "publishProject"

          }}
        >

          {children} {/*Renderizamos el children dentro del "StateContextProvider*/}
        </StateContext.Provider>
      )
    }

    export const useStateContext = () => useContext(StateContext);
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMetamask } from '@thirdweb-dev/react';

//Importamos las imagenes y las constantes de sus respectivos paquetes para poder usarlos
import { dashboard, logo, logout, sun } from '../assets';

// Esta función va a manejar el comportamiento de los iconos cuando el cursor interactue con ellos, ya sea clickando o pasando por encima
const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} 
    flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>

      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-60% h-60%" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
      )}
    </div>
  )


const Sidebar = () => {
  const navigate = useNavigate();
  //const [isActive, setIsActive] = useState('dashboard');
  const { isConnected, disconnect } = useMetamask(); // obtenemos la conexión a Metamask y la función de desconectar

  const handleDisconnect = () => {
    disconnect(); // al hacer clic en el icono, desconectamos la billetera de Metamask
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]"> {/*div que contiene el lógo de la página*/}
      <Link to="/">
        <Icon styles="w-[60px] h-[60px] bg-[#2c2f32]" imgUrl={logo} /> {/*Estos son los atributos del icono principal de la página*/}
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12"> {/*div que contiene las imagenes del menú de navegación*/}
        {/*Con esto conseguimos generar los logos del menú de navegación de la SideBar*/}
        <div className="flex flex-col justify-center items-center gap-3">
          
          <Link to='/'>
            <Icon imgUrl={dashboard} />
          </Link>
          
          <Icon imgUrl={logout} handleClick={handleDisconnect} />

        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  )
}

export default Sidebar
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { menu, search, profileButton, wallet } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('Menú Principal');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const [showWalletImage, setShowWalletImage] = useState(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="¿Que projecto buscas?" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
          </div>
        </div>

        {/* Este div solo aparecerá en dispositivos pequeños ya que estamos utilizando el "sm:flex"*/}
        <div className="sm:flex hidden flex-row justify-end gap-4">

        {/*Para que al conectar con Metamaks aparezca un icono que te lleve a su dirección de etherscan*/}
        <Link to={`https://goerli.etherscan.io/address/${address}`}>
          <div>
            {address ? (
              <>
                <div>
                  <img src={wallet} alt="Imagen" className="w-[60px] h-[60px]" />
                </div>  
              </>
            ) : (
              <h1></h1>
            )}
          </div>
            </Link>
        
        {/*Para que al conectar con Metamaks aparezca la address y que te lleve a su dirección de etherscan*/}
        <Link to={`https://goerli.etherscan.io/address/${address}`}>
          <div>
            {address ? (
              <>
                <div>
                <h1 className="font-epilogue text-[14px] underline sm:text-[25px] text-[18px] leading-[58px] text-white">{address.substring(0, 6) + "..." + address.substring(address.length - 4)}</h1>{/*Para abreviar el address*/}
                </div>  
              </>
            ) : (
              <h1></h1>
            )}
          </div>
        </Link>
        
        <CustomButton 
          btnType="button"
          title={address ? 'Crear un proyecto' : 'Conectar'} //Comprobamos si existe una address para permitir crear una campaña
          styles={address ? 'bg-[#4acd8d]' : 'bg-[#fad900]'} //Aplicamos estilos dependiendo si existe o no la address

          //Callback function para que si es una address activa, podamos navegar al apartado 'create-project', sino debemos conectar una wallet.
          handleClick={() => {
            if(address) navigate('create-project')
            else connect()
          }}
        />

        <Link to="/profile">
          <div>
          {address ? (
              <>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                  <img src={profileButton} alt="user" className="w-[100%] h-[100%] object-contain" />
                </div> 
              </>
            ) : (
              <h1></h1>
            )}
          </div>
        </Link>
      </div>

      {/*Navegación para pantallas pequeñas = Hamburguer menu*/}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={profileButton} alt="user" className="w-[100%] h-[100%] object-contain" />
        </div>

        {/*Creamos el botón para poder desplegar el menú en dispositivos móviles*/}
        <img 
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)} //Cuando presionemos se desplegará el menú y cuando volvamos a presionar se esconderá
        />

        {/*Creamos la ventana que se desplegará al pulsar el botón*/}
        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                {/*Le añadimos las imágenes de los iconos y los nombres como en el sidebar*/}
                <img 
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          
          {/*Creamos el botón de crear campaña como en el navbar pero lo incrustamos en el desplegable*/}
          <div className="flex mx-4 justify-center">
            
            <CustomButton 
              btnType="button"
              title={address ? 'Crear un proyecto' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('Crea un proyecto')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

{/*import { useStateContext } from '../context';*/}
import { CustomButton } from './';
import { logo, menu, search, profileButton } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const address ='0xabc';
  //const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="Search a project" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
          </div>
        </div>

        {/* Este div solo aparecerá en dispositivos pequeños ya que estamos utilizando el "sm:flex"*/}
        <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton 
          btnType="button"
          title={address ? 'Create a project' : 'Connect'} //Comprobamos si existe una address para permitir crear una campaña
          styles={address ? 'bg-[#4acd8d]' : 'bg-[#fad900]'} //Aplicamos estilos dependiendo si existe o no la address

          //Callback function para que si es una address activa, podamos navegar al apartado 'create-project', sino debemos conectar una wallet.
          handleClick={() => {
            if(address) navigate('create-project')
            else 'connect()'
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={profileButton} alt="user" className="w-[100%] h-[100%] object-contain" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
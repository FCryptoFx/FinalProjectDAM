import React from 'react'

import { useStateContext } from '../context';
import { CustomButton } from '../components';

import { ethereumLogo, Ferran } from '../assets';

const PreHome = () => {
  const { connect, address } = useStateContext();

  return (

    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center py-10 w-full">
        <h1 className="font-black text-5xl text-white tracking-wide mb-3">BIENVENID@ 🧸</h1>
        <p className="font-medium text-base text-white mb-10">Vas a ser párticipe de algo muy bonito</p>
        <div className="w-full max-w-screen-md rounded-3xl overflow-hidden">
          <div className="bg-pink-500 bg-opacity-50">
            <div className="pink_gradient" />

            <div className="w-full h-96 bg-gray-900 backdrop-blur-md flex flex-col items-center justify-start">
              <img
                src={ethereumLogo}
                alt="ethereumLogo"
                className="w-40 h-40 object-contain mt-12"
              />

              <div className='my-5'>
                <p className="font-epilogue font-semibold text-[18px] text-white"> Por favor, conecte su wallet para acceder</p>
                <img
                  src={Ferran}
                  alt="Ferran gif"
                  className="w-40 h-40 object-contain mx-auto block mb-10px"
                />
              </div>

            </div>

          </div>
          <div className="blue_gradient" />
        </div>
        
          <CustomButton
            btnType="button"
            title= 'Conectar Wallet'
            styles= 'bg-[#4acd8d] mt-4 hover:bg-[#5be49e] text-white font-bold py-2 px-4 rounded-md'
            handleClick={() => { 
              connect();
              }
            }
          />
      </div>
    </div>
  );
};

export default PreHome;
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'; //Esta libreria nos permitirá interactuar con el smart contract

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateProject = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createProject } = useStateContext(); //Con esto compartimos los datos y funciones a través de toda la página
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  }); //Estos serán los campos que tendremos que rellenar para crear un project

  //Cada vez que se llame a esta función desde un campo del formulario, esta recogerà los cambios efectuados en estos campos
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  //Función para recoger los datos e interactuar con la blockchain
  const handleSubmit = async (e) => {
    e.preventDefault(); //Esto evita que se envie el formulario predeterminada mente y que la página se recarge

    console.log(form);

    checkIfImage(form.image, async (exists) => {
      //Comprobamos que la URL sea accesible y que se trate de una imagen
      if(exists) {
        setIsLoading(true) // Cambiamos el setIsLoading a true
        await createProject({ ...form, target: ethers.utils.parseUnits(form.target, 18)}) // Pasamos el target introducido en el form a WEI
        setIsLoading(false); //Cambiamos setIsLoading a false cuando ya hemos creado la campaña
        navigate('/'); //Navegamos al menú principal de la página
      } else {
        alert('Por favor, inserte una imagen válida :)')
        setForm({ ...form, image: '' }); //Si la imagen no es válida, mostramos una alerta y limpiamos el inputField
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
    {isLoading && <Loader />}
    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Aquí comienza tu proyecto 🎉💝</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Tu nombre:"
            placeholder="Quien ha tenido la maravillosa idea?"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Dale nombre a tu proyecto:"
            placeholder="Escribe aquí el nombre..."
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

          <FormField 
            labelName="Tu idea:"
            placeholder="Explica aquí cuál es tu idea y cómo pretendes llevarla a cabo..."
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />
          
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Objetivo:"
            placeholder="0.50 ETH"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="Fecha límite:"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Logo del proyecto:"
            placeholder="Inserta la URL de una imagen ya que, una imagen vale mas que mil palabras..."
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

        <div className="w-full flex justify-center items-center p-4 bg-[#00d8db] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">Recibirás el 100% de la cantidad que se recaude💸</h4>
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton 
            btnType="submit"
            title="Lanza tu proyecto al mundo"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}
export default CreateProject
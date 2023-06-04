//Este archivo no contiene lógica solamente links de navegación para que los podamos utilizar desde otro archivo

import { dashboard, misProyectos } from '../assets';

export const navlinks = [
  {
    name: 'Menú Principal',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Mis proyectos',
    imgUrl: misProyectos,
    link: '/profile',
  }
];
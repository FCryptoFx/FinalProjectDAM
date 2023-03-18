//Este archivo no contiene lógica solamente links de navegación para que los podamos utilizar desde otro archivo

import { dashboard, logout, payment, profile } from '../assets';

export const navlinks = [
  {
    name: 'Menú Principal',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Cerrar sesión',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
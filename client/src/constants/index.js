//Este archivo no contiene lógica solamente links de navegación para que los podamos utilizar desde otro archivo

import { createProject, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Menú Principal',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Projectos',
    imgUrl: createProject,
    link: '/create-project',
  },
  {
    name: 'Contribuye',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'Withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'Perfil',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'Cerrar sesión',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
//Este archivo no contiene lógica solamente links de navegación para que los podamos utilizar desde otro archivo

import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Project',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'Payment',
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
    name: 'Profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'Logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];
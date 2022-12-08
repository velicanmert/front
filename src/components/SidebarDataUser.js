import React from 'react';
import * as AiIcons from 'react-icons/ai';

export const SidebarDataUser = [
  {
    title: 'Home Page',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <AiIcons.AiFillMessage />,
    className: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    className: 'nav-text'
  }
];

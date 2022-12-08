import React from 'react';

function Logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('loginClicked');
  return <div className='logout'>You have logged out successfully!</div>;
}

export default Logout;

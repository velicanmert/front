import React from 'react';

function Logout() {
  localStorage.removeItem('user_info');
  return <div className='logout'>You have logged out successfully!</div>;
}

export default Logout;

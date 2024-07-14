import React, { useState } from 'react';

const Navbar = () => {
  
    return (
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="logo">

          </div>
          <div className="navbar-right">
          </div>
        </div>
        {/* <div className="navbar-menu"> */}
        <div className=''>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/ipotskids">iPOTS KIDS</a>
          <a href="/iaccess">iAccess</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    );
  }
  
  export default Navbar;
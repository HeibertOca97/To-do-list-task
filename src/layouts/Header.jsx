import React from 'react';

const styleImage = {
  width: "30px",
  maxWidth: "100%"
}

const styleNavbar = {
  boxShadow: "0px 3px 8px rgba(240, 240, 240, .9)"
}

export function Header(){

  return (
    <nav className="navbar navbar-light" style={styleNavbar}>
    <div className="container-xl">
      <a className="navbar-brand" href="/">
      <img src="image/logo.png" className="d-inline-block align-top" alt="logo" style={styleImage}/> TodoList
      </a>
    </div>
    </nav>
  );
}
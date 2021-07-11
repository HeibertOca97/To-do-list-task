import React from 'react';
import { FaLinkedin } from "react-icons/fa";

const linkStyle = {
  textDecoration: 'none'
};

export function Footer(){
  return (
  <footer className="text-center mt-4 mb-4">
    <p>Desarrollado por: <strong><a target="_blank" rel="noopener noreferrer" className="text-dark" style={linkStyle} href="https://www.linkedin.com/in/heibert-joseph-oca%C3%B1a-rodr%C3%ADguez-1a29871b7/">Heibert Ocaña <FaLinkedin/></a></strong></p>
  </footer>
  );
}
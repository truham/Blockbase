import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center space-x-12 p-4 bg-gray-800 text-white">
      <a
        className="hover:text-blue-400"
        href="https://www.linkedin.com/in/hamiltontruong/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-linkedin-in text-2xl"></i>
      </a>
      <a
        className="hover:text-blue-400"
        href="https://github.com/truham"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github text-2xl"></i>
      </a>
      <a className="hover:text-blue-400" href="mailto:hamiltontruong@gmail.com">
        <i className="fa-solid fa-envelope text-2xl"></i>
      </a>
    </footer>
  );
};

export default Footer;

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer social-icons">
      <a className="social-icon" href="https://www.linkedin.com/in/hamiltontruong/">
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a className="social-icon" href="https://github.com/truham">
        <i className="fab fa-github"></i>
      </a>
      <a className="social-icon" href="https://truham.github.io/">
        <i className="fas fa-user-circle"></i>
      </a>
      <a className="social-icon" href="mailto:hamiltontruong@gmail.com">
        <i className="fa-solid fa-envelope"></i>
      </a>
    </footer>
  );
};

export default Footer;

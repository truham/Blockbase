import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer social-icons">
      <a class="social-icon" href="https://www.linkedin.com/in/hamiltontruong/">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a class="social-icon" href="https://github.com/truham">
        <i class="fab fa-github"></i>
      </a>
      <a class="social-icon" href="https://truham.github.io/">
        <i class="fas fa-user-circle"></i>
      </a>
      <a class="social-icon" href="mailto:hamiltontruong@gmail.com">
        <i class="fa-solid fa-envelope"></i>
      </a>
    </footer>
  );
};

export default Footer;

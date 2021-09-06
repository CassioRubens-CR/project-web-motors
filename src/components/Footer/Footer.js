import { FaGithub, FaLinkedin } from "react-icons/fa";

import './Footer.scss';

export function Footer() {

  return (
    <footer>
      <div className="footer">
        <span>2021 Cássio Rubens</span>
        <a
          href="https://cassiorubens-cr.github.io/portfolio/"
        >
          <FaGithub size={20}></FaGithub>
        </a>
        <a
          href="https://www.linkedin.com/in/c%C3%A1ssio-rubens/"
        >
          <FaLinkedin size={20}></FaLinkedin>
        </a>
      </div>
    </footer>
  );
};
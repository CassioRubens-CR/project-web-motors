import { FaGithub, FaLinkedin } from "react-icons/fa";

import './Footer.scss';

export function Footer() {

  return (
    <footer>
      <div className="row footer">
        <div className="col-10">
          <span>2021 Cássio Rubens</span>
        </div>

        <div className="col-1">
          <a
            href="https://cassiorubens-cr.github.io/portfolio/"
          >
            <FaGithub size={20}></FaGithub>
          </a>
        </div>

        <div className="col-1">
          <a
            href="https://www.linkedin.com/in/c%C3%A1ssio-rubens/"
          >
            <FaLinkedin size={20}></FaLinkedin>
          </a>          
        </div>

      </div>
    </footer>
  );
};
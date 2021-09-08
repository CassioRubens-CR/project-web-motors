import { FaGithub, FaLinkedin } from 'react-icons/fa';

import './Footer.scss';

export function Footer() {
  return (
    <footer>
      <div className="row footer">
        <div className="col-10 name">
          <span>2021 Cássio Rubens</span>
        </div>

        <div className="col-1 gitHub">
          <a
            href="https://cassiorubens-cr.github.io/portfolio/"
          >
            <FaGithub size={20} />
          </a>
        </div>

        <div className="col-1 linkedin">
          <a
            href="https://www.linkedin.com/in/c%C3%A1ssio-rubens/"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}

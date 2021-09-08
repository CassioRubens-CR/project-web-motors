import { useState } from 'react';
import { FaCarSide, FaMotorcycle } from 'react-icons/fa';
import logo from '../../img/webmotors.svg';
import './Header.scss';

export function Header() {
  const [tabSelected, setTabSelected] = useState(0);

  const selectTab = (tabIndex) => {
    setTabSelected(tabIndex);
  };

  return (
    <header id="headerComponents">
      <div className="title">
        <img src={logo} alt="WebMotors" title="WebMotors" />
      </div>

      <div className="tabActions">
        <div className="tabVehicles">
          <div
            className={`tabVehiclesItem ${tabSelected === 0 ? 'active' : ''}`}
            onClick={() => selectTab(0)}
          >
            <FaCarSide />
            <div className="tabVehiclesItemTitle">
              <span className="tabVehiclesItemSubtitle">COMPRAR</span>
              {' '}
              CARROS
            </div>
          </div>
          <div
            className={`tabVehiclesItem ${tabSelected === 1 ? 'active' : ''}`}
            onClick={() => selectTab(1)}
          >
            <FaMotorcycle />
            <div className="tabVehiclesItemTitle">
              <span className="tabVehiclesItemSubtitle">COMPRAR</span>
              {' '}
              MOTOS
            </div>
          </div>
        </div>
        <button className="sellCar">Vender meu carro</button>
      </div>
    </header>
  );
}

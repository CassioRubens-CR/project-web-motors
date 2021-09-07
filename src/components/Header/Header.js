import './Header.scss';

export function Header() {

  return (
    <header id="headerComponents">
      <div className="title">
        <h1>WebMotors</h1>
      </div>
      <div className="tabvehicle">
        <h2>CARROS</h2>
        <h2>MOTOS</h2>
        <button>Vender meu carro</button>
      </div>
    </header>
  );
};
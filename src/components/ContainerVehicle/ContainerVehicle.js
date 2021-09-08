import { CardVehicle } from '../CardVehicle/CardVehicle';
import './ContainerVehicle.scss';

export function ContainerVehicle({ vehicles }) {

  return (
    <div id="containerVehicle">
      <div className="row">
        {vehicles.length ? (
          vehicles.map((vehicle) => (
            <div key={vehicle.ID}>
              <CardVehicle vehicle={vehicle} />
            </div>
          ))
        ) : (
          <div className="messageError">
            Desculpe, não localizamos ofertas com o(os) filtro(os) selecionado(os).
          </div>
        )}
      </div>
    </div>
  );
}

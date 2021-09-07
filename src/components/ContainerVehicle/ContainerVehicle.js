import { CardVehicle } from '../CardVehicle/CardVehicle';
import './ContainerVehicle.scss';

export function ContainerVehicle({ vehicles }) {

  console.log("console log ContainerVehicle", vehicles);

  return (
    <div id="containerVehicle">
      <div className="row">
        {vehicles.length ? (
          vehicles.map((vehicle) => {
            return (
              <div key={vehicle.ID}>
                <CardVehicle vehicle={vehicle}></CardVehicle>
              </div>
            );
          })
        ) : (
          <div className="messageError">
            Nenhuma oferta foi pesquisada. Não perca tempo, ofertas imperdiveis!
          </div>
        )}
      </div>
    </div>
  );
};
import './ContainerVehicle.scss';

export function ContainerVehicle({ vehicles }) {

  console.log("console log ContainerVehicle", vehicles);

  return (
    <div id="containerVehicle">
      <div className="divContainer">
        {vehicles.length ? (
          vehicles.map((item) => {
            return (
              <div key={item.ID} className="card">
                <h4><b>{item.Make}</b></h4>
                <img src={item.Image} alt="vehicle" />
                <p>{item.Model}</p>
                <p>{item.Version}</p>
                <p>{item.Price}</p>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            Nenhuma oferta foi pesquisada. Não perca tempo, ofertas imperdiveis! 
          </div>
        )}
      </div>
    </div>
  );
};
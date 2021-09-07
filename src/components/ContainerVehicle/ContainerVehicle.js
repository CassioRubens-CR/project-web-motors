import './ContainerVehicle.scss';

export function ContainerVehicle({ vehicles }) {

  console.log("console log ContainerVehicle", vehicles);

  return (
    <container id="containerVehicle">
      <div className="divContainer">
        {vehicles.length ? (
          vehicles.map((item, index) => {
            return (
              <div class="card">
                <h4><b>{item.Make}</b></h4>
                <img src={item.Image} alt="vehicle" />
                <p>{item.Model}</p>
                <p>{item.Version}</p>
                <p>{item.Price}</p>
              </div>
            );
          })
        ) : (
          <tr>
            <td colSpan={3} className="text-center">
              Nenhum produto foi adicionado ao pedido
            </td>
          </tr>
        )}
      </div>
    </container>
  );
};
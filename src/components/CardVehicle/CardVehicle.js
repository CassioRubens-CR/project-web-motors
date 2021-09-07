import './CardVehicle.scss';

export function CardVehicle({ vehicle }) {

  return (
    <div className="col-4 cardVehicle">
      <h4><b>{vehicle.Make}</b></h4>
      {/* imagem api apresentando erro GET 404 (Not Found) */}
      <img src={vehicle.Image} alt={`Veículo ${vehicle.Model}`} />
      <p>{vehicle.Model}</p>
      <p>{vehicle.Version}</p>
      <p>{vehicle.Price}</p>
    </div>
  );

};
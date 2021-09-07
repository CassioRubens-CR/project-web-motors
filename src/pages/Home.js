import { useEffect, useState } from 'react';
import { ContainerVehicle } from '../components/ContainerVehicle/ContainerVehicle';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import api from "../services/api";

import './Home.scss';

export function Home() {

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const loadMake = async () => {
      const response = await api.get("/Make");
      setMakes(response.data);
    };
    loadMake();
  }, []);

  // console.log("console log make", make);
  // console.log("console log make", make[0]);

  const loadModel = async (id) => {
    const response = await api.get(`/Model?MakeID=${id}`);
    setModels(response.data);
  };

  // console.log("console log model", model);

  const loadVersion = async (id) => {
    const response = await api.get(`/Version?ModelID=${id}`);
    setVersions(response.data);
  };

  // console.log("console log version", version);

  const loadVehicles = async (page) => {
    const response = await api.get(`/Vehicles?Page=${page}`);
    // console.log("console response 10", response.data);
    return response.data;
  }

  const handleButtonBid = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let page = 1;
    let loadMore = true;
    const vehicleList = [];

    while (loadMore) {
      const vehiclesLoaded = await loadVehicles(page);
      if (vehiclesLoaded.length) {
        vehicleList.push(...vehiclesLoaded);
        page++;
      } else {
        loadMore = false;
      }
    }
    // console.log("console log vehicles", vehicleList);

    const vehiclesFiltered = vehicleList
      .filter(vehicle => !filters?.make || filters.make === vehicle.Make) // filtro de marca
      .filter(vehicle => !filters?.model || filters.model === vehicle.Model) // filtro de modelo
      .filter(vehicle => !filters?.year || filters.year === vehicle.YearModel || filters.year === vehicle.YearModel) // filtro de ano
      .filter(vehicle => true) // filtro de preco
      .filter(vehicle => !filters?.version || filters.version === vehicle.Version) // filtro de versao

    // console.log("console log vehicles filtered", vehiclesFiltered);

    setVehicles(vehiclesFiltered);
  };



  const handleMakeChange = (e) => {
    // console.log("console log handleMakeChange", e);
    const findMake = makes.find((make) => make.ID === Number.parseInt(e, 10));
    // console.log("console log findMake", findMake);
    if (findMake) {
      setFilters({ ...filters, make: findMake.Name });

      // console.log("console log findMake.id", findMake.ID);
      loadModel(findMake.ID);
    }
  };

  const handleModelChange = (e) => {
    // console.log("console log handleModelChange", e);
    const findModel = models.find((model) => model.ID === Number.parseInt(e, 10));
    // console.log("console log findModel", findModel);
    setFilters({ ...filters, model: findModel.Name });

    // console.log("console log findMake.id", findMake.ID);
    loadVersion(findModel.ID);
  };

  const handleVersionChange = (e) => {
    // console.log("console log handleVersionChange", e);
    const findVersion = versions.find((version) => version.ID === Number.parseInt(e, 10));
    // console.log("console log findVersion", findVersion);
    setFilters({ ...filters, version: findVersion.Name });
    // console.log("console log findMake.id", findMake.ID);
    // loadVersion(findModel.ID);
  };


  // let year = (new Date()).getFullYear();
  // let current = year;
  // year -= 11;

  // for (let i = 0; i < 12; i++) {
  //   if ((year + i) === Number.parseInt(current)) {
  //     console.log('<option value="' + (year + i) + '">' + (year + i) + '</option>');
  //   } else {
  //     console.log('<option value="' + (year + i) + '">' + (year + i) + '</option>');
  //   }
  // }

  // console.log("console log filters antes", filters);

  const handleDateChange = (e) => {
    // console.log("console log handleDateChange", e);
    // const find = versions.find((version) => version.ID === Number.parseInt(e, 10));
    // console.log("console log findVersion", findVersion);
    const parseElement = Number.parseInt(e, 10);
    setFilters({ ...filters, year: parseElement });
    // console.log("console log findMake.id", findMake.ID);
    // loadVersion(findModel.ID);
  };

  // console.log("console log filters depois", filters);

  return (
    <div id="HomePage">
      <Header />
      <form
        onSubmit={handleButtonBid}
      >

        <div>
          <label htmlFor="new">Novos</label>
          <input type="checkbox" id="new" name="new" />
        </div>

        <div>
          <label htmlFor="used">Usados</label>
          <input type="checkbox" id="used" name="used" />
        </div>

        <select
          name="make"
          onChange={(e) =>
            handleMakeChange(e.target.value)
          }
        >
          <option value="">Marca: Todas</option>
          {makes.map((make) => (
            <option key={make.ID} value={make.ID}>
              {make.Name}
            </option>
          ))}
        </select>

        <select
          name="model"
          onChange={(e) =>
            handleModelChange(e.target.value)
          }
        >
          <option value="">Modelo: Todos</option>
          {models.map((model) => (
            <option key={model.ID} value={model.ID}>
              {model.Name}
            </option>
          ))}
        </select>

        <select
          name="year"
          onChange={(e) =>
            handleDateChange(e.target.value)
          }
        >
          <option value="">Ano Desejado</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
        </select>

        <select name="priceRanger">
          <option value="">Faixa de Preço</option>
          <option value="to1000">até R$ 1.000</option>
          <option value="to1001The5000">De R$ 1.001 a R$ 5.000</option>
        </select>

        <select
          name="version"
          onChange={(e) =>
            handleVersionChange(e.target.value)
          }
        >
          <option value="">Versão: Todas</option>
          {versions.map((version) => (
            <option key={version.ID} value={version.ID}>
              {version.Name}
            </option>
          ))}
        </select>

        <button type="button" className="cleanFilter">Limpar Filtros</button>

        <button type="submit" className="buttonBid">Ver Ofertas</button>

      </form>

      <div className="containerVehicleHome">
        <ContainerVehicle vehicles={vehicles} />
      </div>

      <Footer />
    </div>
  )
}

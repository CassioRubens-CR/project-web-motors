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
  const [years, setYears] = useState([]);

  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const loadMake = async () => {
      const response = await api.get("/Make");
      setMakes(response.data);
    };
    loadMake();
  }, []);

  useEffect(() => {
    const loadYears = () => {
      let currentYear = (new Date()).getFullYear();
      const listYear = [];
      for (let index = 0; index < 12; index++) {
        listYear.push(currentYear - index);
      }
      setYears(listYear);
    };
    loadYears();
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
      .filter(vehicle => !filters?.year || filters.year === vehicle.YearModel || filters.year === vehicle.YearFab) // filtro de ano
      .filter(vehicle => true) // filtro de preco
      .filter(vehicle => (!filters?.newCars && !filters?.usedCars) || (filters?.newCars && vehicle.KM === 0) || (filters?.usedCars && vehicle.KM > 0)) // filtro de carros novos/usados
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

  const handleNewCarsChange = (e) => {
    setFilters({ ...filters, newCars: e });
  }

  const handleUsedCarsChange = (e) => {
    setFilters({ ...filters, usedCars: e });
  }

  const handleClearButton = (e) => {
    setFilters({});
    setModels([]);
    setVersions([]);
    setVehicles([]);
  }
  // console.log("console log filters depois", filters);

  return (
    <div id="HomePage">
      <Header />
      <form
        onSubmit={handleButtonBid}
      >

        <div>
          <label htmlFor="new">Novos</label>
          <input
            type="checkbox"
            id="new"
            name="new"
            onChange={(e) =>
              handleNewCarsChange(e.target.checked)
            } />
        </div>

        <div>
          <label htmlFor="used">Usados</label>
          <input
            type="checkbox"
            id="used"
            name="used"
            onChange={(e) =>
              handleUsedCarsChange(e.target.checked)
            } />
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
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
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

        <button type="reset" className="cleanFilter" onClick={handleClearButton}>Limpar Filtros</button>

        <button type="submit" className="buttonBid">Ver Ofertas</button>

      </form>

      <div className="containerVehicleHome">
        <ContainerVehicle vehicles={vehicles} />
      </div>

      <Footer />
    </div>
  )
}

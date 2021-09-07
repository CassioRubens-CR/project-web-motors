import { useEffect, useState } from 'react';
import { FaGreaterThan, FaSpinner } from 'react-icons/fa';
import { ContainerVehicle } from '../components/ContainerVehicle/ContainerVehicle';
import api from "../services/api";
import { prices } from '../enum/priceEnum';

import './Home.scss';

export function Home() {

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [vehicles, setVehicles] = useState(null);
  const [years, setYears] = useState([]);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const response = await api.get(`/Model?MakeID=${id}`);
    setModels(response.data);
    setLoading(false);
  };

  // console.log("console log model", model);

  const loadVersion = async (id) => {
    setLoading(true);
    const response = await api.get(`/Version?ModelID=${id}`);
    setVersions(response.data);
    setLoading(false);
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

    setLoading(true);

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
      .filter(vehicle => !filters?.price || (Number.parseFloat(vehicle.Price) > filters.price.min && (filters.price.max && Number.parseFloat(vehicle.Price) <= filters.price.max))) // filtro de preco
      .filter(vehicle => (!filters?.newCars && !filters?.usedCars) || (filters?.newCars && vehicle.KM === 0) || (filters?.usedCars && vehicle.KM > 0)) // filtro de carros novos/usados
      .filter(vehicle => !filters?.version || filters.version === vehicle.Version) // filtro de versao

    // console.log("console log vehicles filtered", vehiclesFiltered);

    setVehicles(vehiclesFiltered);
    setLoading(false);
  };



  const handleMakeChange = (e) => {
    // console.log("console log handleMakeChange", e);
    const findMake = makes.find((make) => make.ID === Number.parseInt(e, 10));
    // console.log("console log findMake", findMake);
    if (findMake) {
      setFilters({ ...filters, make: findMake.Name });
      loadModel(findMake.ID);
    } else {
      setFilters({ ...filters, make: null });
    }
      // console.log("console log findMake.id", findMake.ID);
    // }
  };

  const handleModelChange = (e) => {
    // console.log("console log handleModelChange", e);
    const findModel = models.find((model) => model.ID === Number.parseInt(e, 10));
    // console.log("console log findModel", findModel);
    if (findModel) {
      setFilters({ ...filters, model: findModel.Name });
      loadVersion(findModel.ID);
    } else {
      setFilters({ ...filters, model: null });
    }

    // console.log("console log findMake.id", findMake.ID);
  };

  const handleVersionChange = (e) => {
    // console.log("console log handleVersionChange", e);
    const findVersion = versions.find((version) => version.ID === Number.parseInt(e, 10));
    // console.log("console log findVersion", findVersion);
    if (findVersion) {
      setFilters({ ...filters, version: findVersion.Name });
    } else {
      setFilters({ ...filters, version: null });
    }
    
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

  const handlePriceChange = (e) => {
    if (e && prices[e]) {
      setFilters({ ...filters, price: prices[e] });
    } else {
      setFilters({ ...filters, price: null });
    }
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
    setVehicles(null);
  }
  // console.log("console log filters depois", filters);

  return (<>
    <div id="HomePage">
      <form
        onSubmit={handleButtonBid}
      >

        <div className="row optionsCarState">
          <div className="col-12">
            <input
              type="checkbox"
              id="new"
              name="new"
              onChange={(e) =>
                handleNewCarsChange(e.target.checked)
              } />
            <label htmlFor="new">Novos</label>

            <input
              type="checkbox"
              id="used"
              name="used"
              onChange={(e) =>
                handleUsedCarsChange(e.target.checked)
              } />
            <label className="optionsLabel" htmlFor="used">Usados</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <input type="text" placeholder="Local"/>
          </div>

          <div className="col-2 selectKm">
            <select className="col-2 selectKm">
              <option value="100">Raio: 100Km</option>
              <option value="200">Raio: 200Km</option>
              <option value="300">Raio: 300Km</option>
              <option value="500">Raio: 500Km</option>
              <option value="1.000">Raio: 1.000Km</option>
            </select>
          </div>

          <div className="col-3">
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
          </div>

          <div className="col-3">
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
          </div>
        </div>

        <div className="row">
          <div className="col-3">
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
          </div>

          <div className="col-3">
            <select
              name="priceRanger"
              onChange={(e) =>
                handlePriceChange(e.target.value)
              }
            >
              <option value="">Faixa de Preço</option>
              <option value="FAIXA01">Até R$ 9.999,99</option>
              <option value="FAIXA02">De R$ 10.000,00 até R$ 39.999,99</option>
              <option value="FAIXA03">De R$ 40.000,00 até R$ 59.999,99</option>
              <option value="FAIXA04">De R$ 60.000,00 até R$ 79.999,99</option>
              <option value="FAIXA05">Acima de R$ 80.000,00</option>
            </select>
          </div>

          <div className="col-6">
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
          </div>
        </div>

        <div className="row buttonsFilter">
          <div className="col-6">
            <span className="advancedFilter">
              <FaGreaterThan size={8} /> Busca Avançada
            </span>
          </div>

          <div className="col-2">
            <button
              type="reset"
              className="clearFilter"
              onClick={handleClearButton}>
              Limpar Filtros
            </button>
          </div>

          <div className="col-4">
            <button
              type="submit"
              className="buttonBid">
              {
                loading ?
                  <FaSpinner className="spinner"></FaSpinner>
                  : 'VER OFERTAS'
              }
            </button>
          </div>
        </div>
      </form>
    </div>

    {
      vehicles &&
      <div className="containerVehicleHome">
        <ContainerVehicle vehicles={vehicles} />
      </div>
    }</>
  )
}

import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

import api from "../services/api";

import './Home.scss'
import { useEffect, useState } from 'react';

export function Home() {

  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);
  const [version, setVersion] = useState([]);
  // const [vehicles, setVehicles] = useState([]);
  
  // const [optionsSelected, setOptionsSelected] = useState([]);

  useEffect(() => {
    const loadMake = async () => {
      const response = await api.get("/Make");
      setMake(response.data);
    };
    loadMake();
  }, []);

  // console.log("console log make", make);
  // console.log("console log make", make[0]);

  const loadModel = async (id) => {
    const response = await api.get(`/Model?MakeID=${id}`);
    setModel(response.data);
  };

  // console.log("console log model", model);

  const loadVersion = async (id) => {
    const response = await api.get(`/Version?ModelID=${id}`);
    setVersion(response.data);
  };

  // console.log("console log version", version);
  
  // const handleButtonBid = async () => {
  //   const response = await api.get("/Vehicles?Page=1");
  //   setVehicles(response.data);
  // };
  
  // console.log("console log vehicles", vehicles);


  const handleMakeChange = (e) => {
    // console.log("console log handleMakeChange", e);
    const findMake = make.find((make) => make.Name === e);
    console.log("console log findMake", findMake);

    // console.log("console log findMake.id", findMake.ID);
    loadModel(findMake.ID);
  };

  const handleModelChange = (e) => {
    // console.log("console log handleModelChange", e);
    const findModel = model.find((model) => model.Name === e);
    console.log("console log findModel", findModel);

    // console.log("console log findMake.id", findMake.ID);
    loadVersion(findModel.ID);
  };
  
  const handleVersionChange = (e) => {
    // console.log("console log handleVersionChange", e);
    const findVersion = version.find((version) => version.Name === e);
    console.log("console log findVersion", findVersion);
    // console.log("console log findMake.id", findMake.ID);
    // loadVersion(findModel.ID);
  };


  return (
    <div id="HomePage">
      <Header />
      <form>

        <div>
          <input type="checkbox" id="new" name="new" />
          <label for="new">Novos</label>
        </div>

        <div>
          <input type="checkbox" id="used" name="used" />
          <label for="used">Usados</label>
        </div>

        <select
          name="make"
          onChange={(e) =>
            handleMakeChange(e.target.value)
          }
        >
          <option value="makeAll" selected>Marca: Todas</option>
          {make.map((makes) => (
            <option key={makes.id} value={makes.id}>
              {makes.Name}
            </option>
          ))}
        </select>

        <select
          name="model"
          onChange={(e) =>
            handleModelChange(e.target.value)
          }
        >
          <option value="modelAll" selected>Modelo: Todos</option>
          {model.map((model) => (
            <option key={model.id} value={model.id}>
              {model.Name}
            </option>
          ))}
        </select>

        <select name="year">
          <option value="desiredYear" selected>Ano Desejado</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>

        <select name="priceRanger">
          <option value="priceRanger" selected>Faixa de Preço</option>
          <option value="to1000">até R$ 1.000</option>
          <option value="to1001The5000">De R$ 1.001 a R$ 5.000</option>
        </select>

        <select
          name="version"
          onChange={(e) =>
            handleVersionChange(e.target.value)
          }
        >
          <option value="version" selected>Versão: Todas</option>
          {version.map((version) => (
            <option key={version.id} value={version.id}>
              {version.Name}
            </option>
          ))}
        </select>

        <button type="button" className="cleanFilter">Limpar Filtros</button>

        <button type="submit" className="buttonBid">Ver Ofertas</button>

      </form>
      <Footer />
    </div>
  )
}
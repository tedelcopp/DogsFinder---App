import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../actions/index.js";
import { Card, Pagination, Filters } from "../index.js";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();

  const dogs = useSelector((state) => state.dogs);

  const temperaments = useSelector((state) => state.temperaments);

  const [dogsPerPage, setDogsPerPage] = useState();
  const [reRenderer, setReRenderer] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [temperament, setTemperament] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, []);

  useEffect(() => {
    if (!searchInput.length) dispatch(getDogs());
  }, [searchInput]);

  useEffect(() => {
    setDogsPerPage(dogs?.slice(0, 8));
    setLoading(false);
  }, [dogs]);

  useEffect(() => {
    setLoading(true);
    dispatch(getDogs(searchInput, dogs, temperament));
    setReRenderer(!reRenderer);
  }, [temperament]);

  const searchDogs = async () => {
    if (searchInput?.length) {
      setLoading(true);
      dispatch(getDogs(searchInput));
    }
  };

  const dogsInPage = (page) => {
    let startFrom = page * 8 - 8;
    setDogsPerPage(dogs.slice(startFrom, page * 8));
  };

  return (
    <div className="BackgroundHome">
      <div className="MainHome">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          DOGS! 🐕
        </h1>
        <Link className="ButtonsFromHome" to="/">
          Home 🏠
        </Link>
        <Link className="ButtonsFromHome" to="create-dog">
          Crea tu propia raza 🐶
        </Link>
        <select
          onChange={(e) => setTemperament(e.target.value)}
          style={{ height: "25px", alignSelf: "center" }}
        >
          {temperaments?.map((temp, key) => {
            return (
              <option value={temp} key={key}>
                {temp}
              </option>
            );
          })}
        </select>

        <div>
          <input
            type="search"
            style={{ height: "25px", width: "80%" }}
            onInput={(e) => setSearchInput(e.target.value)}
          ></input>
          <button className="SearchButton" onClick={searchDogs}>
            Buscar 🔎
          </button>
        </div>
      </div>
      <Filters
        setSearchInput={setSearchInput}
        setDogsPerPage={setDogsPerPage}
        dogs={dogs}
        setIsFiltering={setIsFiltering}
        setTemperament={setTemperament}
        setLoading={setLoading}
      />
      {dogsPerPage && dogsPerPage.length ? (
        <div>
          <div className="Grid">
            {dogsPerPage?.map((dog, key) => (
              <Card key={key} dog={dog} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "0.2cm",
            }}
          >
            <Pagination dogs={dogs} dogsInPage={dogsInPage} />
          </div>
        </div>
      ) : !loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          ⚠️ No se han encontrado resultados ⚠️{" "}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Cargando.. 🔋
        </div>
      )}
    </div>
  );
};

export default Home;

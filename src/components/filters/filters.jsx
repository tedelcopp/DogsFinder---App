import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";
import "./filters.css";

const Filters = ({
  setSearchInput,
  setDogsPerPage,
  setIsFiltering,
  setTemperament,
  setLoading,
}) => {
  const dispatch = useDispatch();

  const resetFilters = () => {
    setLoading(true);
    setSearchInput("");
    dispatch(getDogs());
  };

  const filter = (type) => {
    setLoading(true);
    setDogsPerPage(dispatch(getDogs("", type)));
    setIsFiltering(true);
    setTemperament("");
  };

  return (
    <div className="BgFilter">
      <div style={{ marginBottom: "-5px" }}>
        <div>
          <button
            className="Filter"
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "14.0cm",
            }}
            onClick={resetFilters}
          >
            <b>Resetear Filtros de Búsqueda</b>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "5px",
          }}
        >
          <div className="box">
            <p>
              <u>
                <b>Filtrado por Procedencia</b>
              </u>
            </p>
            <button className="Filter" onClick={() => filter("created")}>
              Filtrar por creados
            </button>
            <button className="Filter" onClick={() => filter("existing")}>
              Filtrar por Raza Existente
            </button>
          </div>
          <div className="box">
            <p>
              <b>
                <u>Ordenar Alfabéticamente por Nombre</u>
              </b>
            </p>
            <button className="Filter" onClick={() => filter("nameaz")}>
              A-Z
            </button>
            <button className="Filter" onClick={() => filter("nameza")}>
              Z-A
            </button>
          </div>
          <div className="box">
            <p>
              <b>
                <u>Ordenar por Peso</u>
              </b>
            </p>
            <button className="Filter" onClick={() => filter("weightaz")}>
              De Menor a Mayor
            </button>
            <button className="Filter" onClick={() => filter("weightza")}>
              De Mayor a Menor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

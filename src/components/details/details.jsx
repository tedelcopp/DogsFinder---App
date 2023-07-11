import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDog } from "../../actions";
import QuestionMark from "./Question_mark_(black).svg.png";
import "./details.css";

const Details = () => {
  let [loading, setLoading] = useState(true);

  let { idRaza } = useParams();

  const dispatch = useDispatch();

  const dog = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getDog(idRaza));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (!loading) {
    return (
      <div className="MainDivDetail">
        <div className="container-amarillo">
          <div className="img">
            <img
              className="img--perro"
              src={dog.image || QuestionMark}
              alt="⚠️ Img not found/non existing ⚠️"
              width="200"
            />
            <div style={{ alignItem: "start" }}>
              <h1>{dog.name}</h1>

              <p>
                <b>
                  · <u>Altura estimada</u>
                </b>
                : {dog.height} cm.
              </p>
              <p>
                {" "}
                <b>
                  · <u>Peso estimado</u>
                </b>
                : {dog.weight} kg.
              </p>
              <p>
                <b>
                  · <u>Promedio de vida</u>
                </b>
                : {dog.age}.
              </p>
              <p>
                <b>
                  · <u>Temperamentos</u>
                </b>
                {dog.temperament?.map((temp, key) => {
                  return <li key={key}>{temp}</li>;
                })}
              </p>
              <Link className="Button" to="/home">
                Volver a la Página Principal 🏠
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        Cargando información de la raza .. 🔋
      </div>
    );
  }
};

export default Details;

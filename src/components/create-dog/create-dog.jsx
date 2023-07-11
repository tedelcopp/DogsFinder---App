import { useState, useEffect } from "react";
import { getTemperaments, createDog, clearData } from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./create-dog.css";

const CreateDog = () => {
  const temperaments = useSelector((state) => state.temperaments);

  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();

  let [storedTemps, setStoredTemps] = useState([]);

  let [name, setName] = useState("");
  let [height, setHeight] = useState({ min: 0, max: 1 });
  let [weight, setWeight] = useState({ min: 0, max: 1 });
  let [age, setAge] = useState(1);
  let [temps, setTemps] = useState([]);

  let [error, setError] = useState({
    heightErr: "",
    weightErr: "",
    ageErr: "",
    generalErr: "",
  });

  useEffect(() => {
    if (!storedTemps?.length) {
      setStoredTemps(temperaments);
    }
  }, [temperaments]);

  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, []);

  let setTempWithoutDuplicates = (temp) => {
    setStoredTemps(temperaments.filter((tmp) => tmp !== temp));

    setTemps([...temps, temp]);
  };

  useEffect(() => {
    if (!temperaments?.length) dispatch(getTemperaments());
  }, []);

  useEffect(() => {
    if (height.min < 0) {
      setHeight({ max: height.max, min: 0 });
    } else if (height.max < 1) {
      setHeight({ min: height.min, max: 1 });
    } else if (height.min > height.max) {
      setHeight({ max: height.max, min: height.max - 1 });
      setError({ height: "La altura mínima no puede ser mayor a la máxima" });
    }
  }, [height]);

  useEffect(() => {
    if (weight.min < 0) {
      setWeight({ max: weight.max, min: 0 });
    } else if (weight.max < 1) {
      setWeight({ min: weight.min, max: 1 });
    } else if (weight.min > weight.max) {
      setWeight({ max: weight.max, min: weight.max - 1 });
      setError({ weight: "El peso mínimo no puede ser mayor al máximo " });
    }
  }, [weight]);

  useEffect(() => {
    const arr = name.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    setName(arr.join(" "));
  }, [name]);

  useEffect(() => {
    if (age < 1) {
      setAge(1);
    } else if (age > 30) {
      setAge(30);
      setError({ age: "Ningún perro vive tanto 😅" });
    }
  }, [age]);

  const validateAndCreateDog = (e) => {
    if (
      age &&
      weight.min &&
      weight.max &&
      height.min &&
      height.max &&
      temps.length
    ) {
      dispatch(createDog({ name, height, weight, age, temperament: temps }));
    } else {
      setError({
        generalErr: "⚠️Ups! Olvidaste completar alguno de los campos...⚠️",
      });
    }
  };

  return (
    <div className="MainCreateDog" style={{ width: "100vw", height: "100vh" }}>
      <div>
        <h1 className="msg"> Crea tu raza 🐶 </h1>
        <div>
          <form>
            <div>
              <div>
                <label className="titles" htmlFor="name">
                  <b>
                    · <u> Nombre: </u>
                  </b>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="titles" htmlFor="height">
                  <b>
                    <u>· Altura máxima:</u>
                  </b>
                  <input
                    type="number"
                    value={height.max}
                    onChange={(e) =>
                      setHeight({ ...height, max: e.target.value })
                    }
                  />
                  <p style={{ color: "red" }}>{error.height}</p>
                  <b>
                    {" "}
                    <u>· Altura mínima:</u>{" "}
                  </b>
                  <input
                    type="number"
                    value={height.min}
                    onChange={(e) =>
                      setHeight({ ...height, min: e.target.value })
                    }
                  />{" "}
                </label>
                <label className="titles" htmlFor="weight">
                  <b>
                    <u>· Peso máximo:</u>
                  </b>
                  <input
                    type="number"
                    value={weight.max}
                    onChange={(e) =>
                      setWeight({ ...weight, max: e.target.value })
                    }
                  />
                  <b>
                    <u>· Peso mínimo:</u>{" "}
                  </b>
                  <input
                    type="number"
                    value={weight.min}
                    onChange={(e) =>
                      setWeight({ ...weight, min: e.target.value })
                    }
                  />
                  <p style={{ color: "red" }}>{error.weight}</p>
                </label>
                <label className="titles" htmlFor="age">
                  <b>
                    <u>· Años de vida aproximados:</u>{" "}
                  </b>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <p style={{ color: "red" }}>{error.age}</p>
                </label>
                <label className="titles" htmlFor="temperament">
                  <b>
                    <u>· Temperamento/s:</u>
                  </b>
                  {storedTemps && storedTemps.length ? (
                    <select
                      onChange={(e) => setTempWithoutDuplicates(e.target.value)}
                    >
                      {storedTemps?.map((temp, key) => (
                        <option key={key} value={temp}>
                          {temp}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>Loading Temperaments...</p>
                  )}
                </label>
                <div style={{ display: "flex" }}>
                  {temps?.map((t, key) => {
                    return (
                      <ul key={key}>
                        <li key={key}>{t}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p style={{ color: message?.includes("éxito") ? "green" : "red" }}>
            {message}
          </p>
          <button
            className="CreateButton"
            onClick={(e) => validateAndCreateDog(e)}
          >
            {" "}
            Crea tu Perro 🐶
          </button>
          {error ? <p style={{ color: "red" }}>{error.generalErr}</p> : null}
          <Link to="/home" className="ToHomeButton">
            Home 🏠
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateDog;

import { Link } from "react-router-dom";
import style from "./landing.css";

function Landing() {
  return (
    <div className="centrado">
      <div className="LandingTitle1">
        <h2>
          <u>
            <span>Encuentra</span> todas tus <br />
            razas <br />
            <span>favoritas!</span>
          </u>
        </h2>
        <Link to="/home">
          <input className="boton" type="submit" value="Ingresar" />
        </Link>
        <h5>Hecho con &hearts; para Henry</h5>
      </div>
    </div>
  );
}

export default Landing;

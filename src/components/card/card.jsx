import { Link } from "react-router-dom";
import "./card.css";
import questionmark from "./questionmark.png";
import { clearData } from "../../actions";
import { useDispatch } from "react-redux";
const Card = (props) => {
  let { dog } = props;
  let dispatch = useDispatch();
  return (
    <Link
      onClick={() => dispatch(clearData())}
      className="card"
      to={`/details/${dog.id}`}
    >
      <div>
        <div>
          <img
            width="125"
            height="100"
            src={dog.image || questionmark}
            alt="⚠️ Img not found ⚠️"
          />
        </div>
        <div>
          <h4>
            <b>
              ∙ <u> Nombre</u>
            </b>
            : {dog.name}.
          </h4>
          <div>
            <b>
              ∙ <u> Peso estimado</u>
            </b>
            : {dog.weight.metric || dog.weight} Kg.
          </div>
        </div>
      </div>
      <div>
        <b>
          ∙ <u> Temperamento:</u>
        </b>
        <div>
          <ul>
            {dog
              ? dog.temperament?.split(" ").map((temp, key) => {
                  return <li key={key}>{temp}</li>;
                })
              : null}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Card;

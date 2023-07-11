import axios from "axios";

export const GET_DOGS = "GetDogs";
export const GET_DOG = "GetDog";
export const CREATE_DOG = "CreateDog";
export const GET_TEMPERAMENTS = "GetTemperaments";
export const CLEAR_DATA = "ClearData";

function alphabetically(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function byWeight(a, b) {
  return a.avgWeight - b.avgWeight;
}

function sortBy(dogs, filter) {
  switch (filter) {
    case "created":
      return dogs.filter((dog) => typeof dog.id === "string");
    case "existing":
      return dogs.filter((dog) => typeof dog.id !== "string");
    case "nameaz":

    case "nameza":
      return dogs.sort(alphabetically).reverse();
    case "weightaz":
      for (let dog of dogs) {
        let [min, max] =
          dog.weight?.metric?.split(" - ") || dog.weight.split(" - ");
        dog.avgWeight = Math.floor(Number(min) + Number(max) / 2);
      }
      return dogs.sort(byWeight);
    case "weightza":
      for (let dog of dogs) {
        let [min, max] =
          dog.weight?.metric?.split(" - ") || dog.weight.split(" - ");
        dog.avgWeight = Number(min) + Number(max) / 2;
      }
      return dogs.sort(byWeight).reverse();
    default:
      return dogs;
  }
}

export function getDogs(search, filter, temperament) {
  return async function (dispatch) {
    try {
      let dogs = [];

      if (!Array.isArray(filter) || !filter.length) {
        dogs = await axios.get("http://localhost:3001/dogs").then((res) => {
          if (search)
            return res.data.filter((dog) =>
              dog.name.toLowerCase().includes(search.toLowerCase())
            );
          else if (filter) return sortBy(res.data, filter);
          else return res.data;
        });
      } else {
        dogs = filter;
      }

      if (temperament)
        dogs = dogs.filter((dog) => dog.temperament?.includes(temperament));
      return dispatch({
        type: GET_DOGS,
        payload: dogs,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
}

export function getDog(id) {
  return async function (dispatch) {
    try {
      let dog = await axios
        .get(`http://localhost:3001/dogs/${id}`)
        .then((res) => {
          return res.data;
        });
      return dispatch({
        type: GET_DOG,
        payload: dog,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function createDog(data) {
  return async function (dispatch) {
    try {
      let message = await axios
        .post(`http://localhost:3001/dogs`, data)
        .then((res) => {
          return res.data;
        });
      return dispatch({
        type: CREATE_DOG,
        payload: message,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      let temperaments = await axios
        .get(`http://localhost:3001/temperaments`)
        .then((res) => {
          return res.data;
        });

      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: temperaments.map((temp) => temp.name),
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function clearData() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_DATA,
    });
  };
}

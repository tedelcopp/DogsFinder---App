import {
  GET_DOGS,
  GET_DOG,
  CREATE_DOG,
  GET_TEMPERAMENTS,
  CLEAR_DATA,
} from "../actions/index";

const initialState = {
  temperaments: [],
  dogs: [],
  dog: {},
  message: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOG:
      return {
        ...state,
        dog: action.payload,
      };
    case CREATE_DOG:
      return {
        ...state,
        message: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        dog: null,
        message: null,
      };

    default:
      return state;
  }
};
export default reducer;

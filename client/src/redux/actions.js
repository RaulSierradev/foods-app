import {
  GET_RECIPES,
  ADD_RECIPE,
  GET_DIETS,
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  ORDER_BY,
  AWAIT_BY,
  NAME_SUCCESS,
  NAME_FAILURE,
  GET_RECIPES_BY_ID,
} from "./actions.type";
import axios from "axios";

const host = "http://localhost:3001";

export const addRecipe = (recipe) => {
  const endpoint = `${host}/recipes`;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, recipe);
      return dispatch({
        type: ADD_RECIPE,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getDiets = () => {
  const endpoint = `${host}/diets`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_DIETS,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getRecipes = () => {
  const endpoint = `${host}/recipes`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_RECIPES,
        payload: data,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const orderBy = (order) => {
  return {
    type: ORDER_BY,
    payload: order,
  };
};

export const filterByDiet = (diets) => {
  return {
    type: FILTER_BY_DIET,
    payload: diets,
  };
};

export const filterbyOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const awaitBy = () => {
  return {
    type: AWAIT_BY,
  };
};

export const getRecipesByiD = (id) => {
  const endpoint = `${host}/recipes/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({
        type: GET_RECIPES_BY_ID,
        payload: data,
      });
    } catch (error) {
      return { error: `There is no recipe with this id: "${id}"` };
    }
  };
};

export const searchByName = (name) => {
  return async (dispatch) => {
    const endpoint = `${host}/recipes?name=${name}`;
    try {
      const { data } = await axios(endpoint);
      dispatch(nameSuccess(data));
    } catch (error) {
      dispatch(nameFailure(`No recipe found with the name "${name}"`));
    }
  };
};

export const nameSuccess = (name) => {
  return {
    type: NAME_SUCCESS,
    payload: name,
  };
};
export const nameFailure = (error) => {
  return {
    type: NAME_FAILURE,
    payload: error,
  };
};

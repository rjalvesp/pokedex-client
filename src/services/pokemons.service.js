import axios from "axios";
import * as R from "ramda";

export const GetPokemonTypes = () =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/types`)
    .then(R.propOr([], "data"));

export const GetPokemonWeaknesses = () =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/weaknesses`)
    .then(R.propOr([], "data"));

export const GetPokemons = (searchParams) => {
  const payload = R.reject(R.either(R.isNil, R.isEmpty), searchParams || {});

  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}`, payload)
    .then(R.propOr([], "data"));
};

export const GetPokemonById = (id) =>
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/${id}`)
    .then(R.propOr({}, "data"));

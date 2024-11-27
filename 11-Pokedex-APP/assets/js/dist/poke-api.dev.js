"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var loadingMessage = document.getElementById("loading");
var pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  var pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  var types = pokeDetail.types.map(function (typeSlot) {
    return typeSlot.type.name;
  });

  var _types = _slicedToArray(types, 1),
      type = _types[0];

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  return pokemon;
}

pokeApi.getPokemonDetail = function (pokemon) {
  return fetch(pokemon.url).then(function (response) {
    return response.json();
  }).then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = function () {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var url = "https://pokeapi.co/api/v2/pokemon?offset=".concat(offset, "&limit=").concat(limit);
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (jsonBody) {
    return jsonBody.results;
  }).then(function (pokemons) {
    return pokemons.map(pokeApi.getPokemonDetail);
  }).then(function (detailRequests) {
    return Promise.all(detailRequests);
  }).then(function (pokemonsDetails) {
    return pokemonsDetails;
  }).then(loadingMessage.remove());
};
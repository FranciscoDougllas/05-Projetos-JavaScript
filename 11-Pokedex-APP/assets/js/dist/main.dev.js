"use strict";

var pokemonList = document.getElementById('pokemonList');
var loadMoreButton = document.getElementById('loadMoreButton');
var maxRecords = 151;
var limit = 10;
var offset = 0;

function convertPokemonToLi(pokemon) {
  return "\n        <li class=\"pokemon ".concat(pokemon.type, "\" onClick=\"abrirModalDoPokemon(").concat(pokemon.number, ")\">\n            <span class=\"number\">#").concat(pokemon.number, "</span>\n            <span class=\"name\">").concat(pokemon.name, "</span>\n\n            <div class=\"detail\">\n                <ol class=\"types\">\n                    ").concat(pokemon.types.map(function (type) {
    return "<li class=\"type ".concat(type, "\">").concat(type, "</li>");
  }).join(''), "\n                </ol>\n\n                <img src=\"").concat(pokemon.photo, "\"\n                     alt=\"").concat(pokemon.name, "\">\n            </div>\n        </li>\n    ");
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then(function () {
    var pokemons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);
loadMoreButton.addEventListener('click', function () {
  offset += limit;
  var qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    var newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
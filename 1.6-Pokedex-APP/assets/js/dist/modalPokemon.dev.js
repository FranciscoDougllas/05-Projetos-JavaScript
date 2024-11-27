"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var modal = document.getElementById("modalPokemon");
var botaoFecharModal = document.getElementById("botaoFecharModal");
var arrayStatsTitulo = Array.from(document.getElementsByClassName("stats__item--titulo"));
var arrayAbasDesc = Array.from(document.getElementsByClassName("description__aba"));
var nomeDoPokemon = document.getElementById("nomeDoPokemon");
var numeroDoPokemon = document.getElementById("numeroDoPokemon");
var tiposDoPokemon = document.getElementById("tiposDoPokemon");
var imagemDoPokemon = document.getElementById("imagemDoPokemon");
var especieDoPokemon = document.getElementById("especieDoPokemon");
var alturaDoPokemon = document.getElementById("alturaDoPokemon");
var pesoDoPokemon = document.getElementById("pesoDoPokemon");
var habilidadesDoPokemon = document.getElementById("habilidadesDoPokemon");
var vidaDoPokemon = document.getElementById("vidaDoPokemon");
var ataqueDoPokemon = document.getElementById("ataqueDoPokemon");
var defesaDoPokemon = document.getElementById("defesaDoPokemon");
var spatkDoPokemon = document.getElementById("spatkDoPokemon");
var spdefDoPokemon = document.getElementById("spdefDoPokemon");
var velDoPokemon = document.getElementById("velDoPokemon");
var evoChain = document.getElementById("evoChain");

function abrirModalDoPokemon(idDoPokemon) {
  Promise.all([pegarStatsDoPokmeon(idDoPokemon), pegarEvolucoes(idDoPokemon)]).then(modal.showModal());
}

function pegarStatsDoPokmeon(idDoPokemon) {
  fetch("https://pokeapi.co/api/v2/pokemon/".concat(idDoPokemon)).then(function (response) {
    return response.json();
  }).then(povoarModalDoPokemon);
}

function povoarModalDoPokemon(pokemon) {
  var _modal$classList;

  (_modal$classList = modal.classList).remove.apply(_modal$classList, _toConsumableArray(modal.classList));

  modal.classList.add("modal__container");
  modal.classList.add("".concat(pokemon.types[0].type.name));
  nomeDoPokemon.innerHTML = pokemon.name;
  numeroDoPokemon.innerHTML = "# ".concat(pokemon.id);
  tiposDoPokemon.innerHTML = "";
  pokemon.types.map(function (tipo) {
    tiposDoPokemon.innerHTML += "<span class=\"type ".concat(tipo.type.name, "\">").concat(tipo.type.name, "</span>");
  });
  imagemDoPokemon.src = pokemon.sprites.other.dream_world.front_default;
  especieDoPokemon.innerHTML = pokemon.species.name;
  alturaDoPokemon.innerHTML = "".concat(pokemon.height / 10, " m");
  pesoDoPokemon.innerHTML = "".concat(pokemon.weight, " Kg");
  habilidadesDoPokemon.innerHTML = "";
  pokemon.abilities.map(function (habilidade) {
    var textoAAdicionar = habilidade.ability.name[0].toUpperCase() + habilidade.ability.name.substring(1);

    if (pokemon.abilities.indexOf(habilidade) < pokemon.abilities.length - 1) {
      habilidadesDoPokemon.innerHTML += "".concat(textoAAdicionar, ", ");
    } else {
      habilidadesDoPokemon.innerHTML += "".concat(textoAAdicionar, ".");
    }
  });
  vidaDoPokemon.innerHTML = "<span>".concat(pokemon.stats[0].base_stat, "</span><span class=\"description__range\"><div style=\"width: ").concat(pokemon.stats[0].base_stat * 100 / 150, "%; background: ").concat(pokemon.stats[0].base_stat > 49 ? "lightgreen" : "red", ";\"></div></span>");
  ataqueDoPokemon.innerHTML = "<span>".concat(pokemon.stats[1].base_stat, "</span><span class=\"description__range\"><div style=\"width: ").concat(pokemon.stats[1].base_stat * 100 / 150, "%; background: ").concat(pokemon.stats[1].base_stat > 49 ? "lightgreen" : "red", ";\"></div></span>");
  defesaDoPokemon.innerHTML = "<span>".concat(pokemon.stats[2].base_stat, "</span><span class=\"description__range\"><div style=\"width: ").concat(pokemon.stats[2].base_stat * 100 / 150, "%; background: ").concat(pokemon.stats[2].base_stat > 49 ? "lightgreen" : "red", ";\"></div></span>");
  spatkDoPokemon.innerHTML = "<span>".concat(pokemon.stats[3].base_stat, "</span><span class=\"description__range\"><div style=\"width: ").concat(pokemon.stats[3].base_stat * 100 / 150, "%; background: ").concat(pokemon.stats[3].base_stat > 49 ? "lightgreen" : "red", ";\"></div></span>");
  spdefDoPokemon.innerHTML = "<span>".concat(pokemon.stats[4].base_stat, "</span><span class=\"description__range\"><div style=\"width: ").concat(pokemon.stats[4].base_stat * 100 / 150, "%; background: ").concat(pokemon.stats[4].base_stat > 49 ? "lightgreen" : "red", ";\"></div></span>");
  velDoPokemon.innerHTML = "<span>".concat(pokemon.stats[5].base_stat, "</span><span class=\"description__range\"><div style=\"width: ").concat(pokemon.stats[5].base_stat * 100 / 150, "%; background: ").concat(pokemon.stats[5].base_stat > 49 ? "lightgreen" : "red", ";\"></div></span>");
}

botaoFecharModal.addEventListener("click", function () {
  modal.close();
});
arrayStatsTitulo.map(function (elementoHTML) {
  elementoHTML.addEventListener("click", function (evento) {
    arrayStatsTitulo.map(function (elemento) {
      elemento.classList.remove("item__ativo");
    });
    arrayAbasDesc.map(function (elemento) {
      elemento.classList.remove("item__ativo");
    });
    evento.target.classList.add("item__ativo");
    arrayAbasDesc[arrayStatsTitulo.indexOf(evento.target)].classList.add("item__ativo");
  });
});

function pegarEvolucoes(idDoPokemon) {
  var evolutions = [];
  var evolutionChainURL = fetch("https://pokeapi.co/api/v2/pokemon-species/".concat(idDoPokemon)).then(function (response) {
    return response.json();
  }).then(function (species) {
    return evolutionChainURL = species.evolution_chain.url;
  }).then(function (evolutionChainURL) {
    fetch(evolutionChainURL).then(function (response) {
      return response.json();
    }).then(function (response) {
      evolution0 = response.chain.species.name;
      evolutions.push({
        name: evolution0
      });

      if (response.chain.evolves_to.length > 0) {
        evolution1 = response.chain.evolves_to[0].species.name;
        evolutions.push({
          name: evolution1
        });

        if (response.chain.evolves_to[0].evolves_to.length > 0) {
          evolution2 = response.chain.evolves_to[0].evolves_to[0].species.name;
          evolutions.push({
            name: evolution2
          });
        }
      }

      evoChain.innerHTML = "<h3 class=\"evo__title\">Evolution Chain</h3>";
      Promise.allSettled(evolutions.map(function (evolucao, index) {
        fetch("https://pokeapi.co/api/v2/pokemon/".concat(evolucao.name)).then(function (response) {
          return response.json();
        }).then(function (evolucaoJson) {
          evolutions[index].img = evolucaoJson.sprites.other.dream_world.front_default;
        })["finally"](function (results) {
          if (evolutions.length > 1 && index > 0) {
            evoChain.innerHTML += "<div class=\"evo__row\">\n                                                                    <div class=\"evo__cell\">\n                                                                        <img\n                                                                            class=\"pokemon__evo--imagem\"\n                                                                            src=".concat(evolutions[index - 1].img, "\n                                                                            alt=\"imagem de ").concat(evolutions[index - 1].name, "\"\n                                                                        />\n                                                                        <span>").concat(evolutions[index - 1].name, "</span>\n                                                                    </div>\n                                                                    <div class=\"evo__cell\">\n                                                                        <span class=\"evo__cell--pointer\">\u27A1</span>\n                                                                    </div>\n                                                                    <div class=\"evo__cell\">\n                                                                        <img\n                                                                            class=\"pokemon__evo--imagem\"\n                                                                            src=").concat(evolutions[index].img, "\n                                                                            alt=\"imagem de ").concat(evolutions[index].name, "\"\n                                                                        />\n                                                                        <span>").concat(evolutions[index].name, "</span>\n                                                                    </div>\n                                                                </div>");
          } else if (evolutions.length == 1) {
            evoChain.innerHTML += "<div class=\"evo__cell\">\n                                                                    <img\n                                                                        class=\"pokemon__evo--imagem\"\n                                                                        src=".concat(evolutions[index].img, "\n                                                                        alt=\"imagem de ").concat(evolutions[index].name, "\"\n                                                                    />\n                                                                    <span>").concat(evolutions[index].name, "</span>\n                                                                    <span>Este pokemon n\xE3o tem evolu\xE7\xF5es.</span>\n                                                                </div>");
          }
        });
      }));
    });
  });
}
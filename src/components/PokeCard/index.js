import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss"

function PokeCard(props) {
  const [pokemon, setPokemon] = useState("");

  const pickPokemon = (pokeName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then((response) => {
        console.log(response.data);
        setPokemon(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    pickPokemon(props.pokemon);
  }, [props.pokemon]);

  const { name, id, weight, types, sprites } = pokemon;
  const properName = name && name[0].toUpperCase() + name.slice(1);
  return (
    <div className="card">
      <p className="card__name">Name: {name && properName}</p>
      <p className="card__id">Id: {id}</p>
      <p className="card__weight">Weight: {weight} kg</p>
      {types &&
        types.map((pokemon, i) => {
          const type = pokemon.type.name;
          const properType = type && type[0].toUpperCase() + type.slice(1);
          return <h3 key={i} className="card__type">{properType}</h3>;
        })}
      {sprites && <img src={sprites.front_default} className="card__img" alt={name} />}
    </div>
  );
}

export default PokeCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import pokeBall from './pokeball.png'

const Pokeinfo = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="pokeinfo-container">
        <div className="poke-box">
          <h1>{pokemon.name}</h1>
          <img src={pokeBall} alt={pokemon.name} />
          <div className="abilities">
            <p>Abilities</p>
            {pokemon.abilities.map((ability, index) => (
              <div className="group" key={index}>

                <ul>
                  <li>

                <h2>{ability.ability.name}</h2>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {pokemon.stats.map((stat, index) => (
             <h3 key={index}>
             <span className="stat-name">{stat.stat.name}:</span>{" "}
             {stat.base_stat}
           </h3>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokeinfo;

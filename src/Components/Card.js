import React, { useState, useEffect } from "react";
import pokeBall from "./pokeball.png";
import Favorite from "./Favorite";

const Card = ({ pokemon, loading, infoPokemon }) => {
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (pokemon.length > 0) {
      const first20Pokemon = pokemon.slice(0, 20);
      setDisplayedPokemon(first20Pokemon);
    }
  }, [pokemon]);

  const handleNextClick = () => {
    if (pokemon.length > displayedPokemon.length) {
      const currentIndex = displayedPokemon.length;
      const next20Pokemon = pokemon.slice(currentIndex, currentIndex + 20);
      setDisplayedPokemon((prevDisplayedPokemon) => [
        ...prevDisplayedPokemon,
        ...next20Pokemon,
      ]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemon.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleClick = (pokemon, event) => {
    event.stopPropagation();
    if (favorites.includes(pokemon)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav !== pokemon)
      );
      alert(`${pokemon.name} removed from favorites!`);
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
      alert(`${pokemon.name} added to favorites!`);
    }
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleRemoveFavorite = (pokemon) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav !== pokemon)
    );
    alert(`${pokemon.name} removed from favorites!`);
  };

  return (
    <div className="section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button className="favoriteBtn" onClick={handleShowFavorites}>
        {showFavorites ? "Show All Pokemon" : "Favorites"}
      </button>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="card-container">
            {showFavorites
              ? favorites.map((pokemon) => (
                  <div
                    className="card"
                    key={pokemon.id}
                    onClick={() => infoPokemon(pokemon.id)}
                  >
                    <h2>{pokemon.id}</h2>
                    <img src={pokeBall} alt={pokemon.name} />
                    <h2>{pokemon.name}</h2>
                    <div
                      className={`favorite-heart ${
                        favorites.includes(pokemon) ? "clicked" : ""
                      }`}
                      onClick={(event) => handleClick(pokemon, event)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                      >
                        <path d="M12 21.35l-1.74-1.57C4.4 14.71 1 11.09 1 7.25 1 4.42 3.42 2 6.25 2c1.89 0 3.63 1.07 4.75 2.75C12.37 3.07 14.11 2 16 2 18.76 2 21 4.24 21 7c0 3.84-3.4 7.46-10.26 12.53L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                ))
              : filteredPokemon.map((pokemon) => (
                  <div
                    className="card"
                    key={pokemon.id}
                    onClick={() => infoPokemon(pokemon.id)}
                  >
                    <h2>{pokemon.id}</h2>
                    <img src={pokeBall} alt={pokemon.name} />
                    <h2>{pokemon.name}</h2>
                    <div
                      className={`favorite-heart ${
                        favorites.includes(pokemon) ? "clicked" : ""
                      }`}
                      onClick={(event) => handleClick(pokemon, event)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="red"
                      >
                        <path d="M12 21.35l-1.74-1.57C4.4 14.71 1 11.09 1 7.25 1 4.42 3.42 2 6.25 2c1.89 0 3.63 1.07 4.75 2.75C12.37 3.07 14.11 2 16 2 18.76 2 21 4.24 21 7c0 3.84-3.4 7.46-10.26 12.53L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                ))}
          </div>
          {pokemon.length > displayedPokemon.length && (
            <button onClick={handleNextClick}>Next</button>
          )}

          {showFavorites && (
            <Favorite favorites={favorites} handleRemove={handleRemoveFavorite} />
          )}
        </>
      )}
    </div>
  );
};

export default Card;

import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState("");

  const navigate = useNavigate();

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const { results, next, previous } = res.data;
      setNextUrl(next);
      setPrevUrl(previous);
      const pokemonData = await getPokemon(results);
      setPokeData(pokemonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPokemon = async (res) => {
    const pokemonData = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );

    return pokemonData;
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  const handleCardClick = (id) => {
    navigate(`/pokeinfo/${id}`);
  };

  const handlePrevClick = () => {
    if (prevUrl) {
      setUrl(prevUrl);
    }
  };

  const handleNextClick = () => {
    if (nextUrl) {
      setUrl(nextUrl);
    }
  };

  return (
   <>
   <div className="container">

      <div className="content">
        <Card pokemon={pokeData} loading={loading} infoPokemon={handleCardClick} />
        </div>
 
        <div className="btn-group">
          {prevUrl && <button onClick={handlePrevClick}>Previous</button>}
          {nextUrl && <button onClick={handleNextClick}>Next</button>}
      </div>
   </div>
   </>
  );
};

export default Main;

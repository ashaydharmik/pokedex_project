import React from "react";


const Favorite = ({ favorites }) => {
  return (<>
  
     
    <div className="favorite-container">
      {favorites.map((pokemon) => (
        <div className="favorite-card" key={pokemon.id}/>
      ))}
    </div>
  </>
  );
};

export default Favorite;

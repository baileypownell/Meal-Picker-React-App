import React from 'react';


const Recipe = (props) => {
  return (
    <div className="recipe">
      <h2>{props.title}</h2>
      <h3>Ingredients include: {props.ingredients}</h3>
      <a target="_blank" href={props.link}><button>GET THE RECIPE</button></a>
    </div>
  )
}

export default Recipe;

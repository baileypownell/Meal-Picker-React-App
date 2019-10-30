import React from 'react';
import Recipe from './Recipe';
import '../../scss/media-queries.scss';

const Recipes = (props) => {
  return (
    <div>
      {props.requestStatus ? <h1>Recipes</h1> : null}
      <div id="recipes">
        {props.response.map((recipe) => (
          <Recipe
            title={recipe.title}
            ingredients={recipe.ingredients}
            thumbnail={recipe.thumbnail}
            link={recipe.href}
          />
        ))}
      </div>
    </div>
  )
}

export default Recipes;

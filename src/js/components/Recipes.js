import React from 'react';
import Recipe from './Recipe';
import '../../scss/media-queries.scss';
import ErrorMessage from './ErrorMessage';
import NoResultsMessage from './NoResultsMessage';

const Recipes = (props) => {
  return (
    <div id="recipes">
      {props.requestStatus ? <h1>Recipes</h1> : null}
      {props.error ? <ErrorMessage/> : null }
      {props.noResults ? <NoResultsMessage/> : null }
      {props.response.map((recipe) => (
        <Recipe
          title={recipe.title}
          ingredients={recipe.ingredients}
          thumbnail={recipe.thumbnail}
          link={recipe.href}
        />
      ))}
    </div>
  )
}

export default Recipes;

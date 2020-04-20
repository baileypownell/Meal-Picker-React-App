import React from 'react';
import ReactDOM from 'react-dom';
import FoodType from './components/FoodType';
import Ingredients from './components/Ingredients';
import Recipes from './components/Recipes';
import regeneratorRuntime from "regenerator-runtime";

class App extends React.Component {

  state = {
    buttonDisabled: true,
    foodTypesPresent: 0,
    ingredientsPresent: 0,
    foodTypes: [],
    ingredients: [],
    recipesRequested: false,
    response: '',
    recipeArray: [],
    errorMessagePresent: false,
    noResultsMessagePresent: false
  }

  updateFoodTypesHandler = () => {
    let input = document.getElementById('foodTypes').value;
    if (document.getElementById('foodTypes').value.length > 1 && this.state.foodTypes.length < 1) {
      this.setState(prevState => ({
        foodTypes: [...prevState.foodTypes, input],
        foodTypesPresent: 1,
        buttonDisabled: false
      }))
      document.getElementById('foodTypes').value = ''
    }
  }

  removeFoodTypeHandler = () => {
    this.setState(prevState => ({
      foodTypes: [],
      foodTypesPresent: 0
    }))
    if (this.state.ingredientsPresent === 0) {
      this.setState(prevState => ({
        buttonDisabled: true
      }))
    }
  }

  updateIngredientsHandler = () => {
    let input = document.getElementById('ingredients').value;
    if (document.getElementById('ingredients').value.length > 1) {
      this.setState(prevState => ({
        ingredientsPresent: 1,
        ingredients: [...prevState.ingredients, input],
        buttonDisabled: false
      }))
      document.getElementById('ingredients').value = ''
    }
  }

  removeIngredientsHandler = (index, e) => {
    const ingredients = Object.assign([], this.state.ingredients);
    ingredients.splice(index, 1);
    this.setState({
      ingredients: ingredients
    });
    if (ingredients.length === 0) {
      this.setState({
        ingredientsPresent: 0
      })
    }
    if (this.state.foodTypesPresent === 0 && ingredients.length === 0) {
      this.setState({
        buttonDisabled: true
      })
    }
  }

  async findMealsHandler() {
    if (this.state.ingredientsPresent === 1 || this.state.foodTypesPresent === 1) {
      if (this.state.errorMessagePresent === true) {
        !this.state.errorMessagePresent
      }
      if (this.state.noResultsMessagePresent === true) {
        this.setState({
          noResultsMessagePresent: false
        });
      }
      // build url
      let foodType = this.state.foodType;
      let ingredients = '';
      for (let i = 0; i < this.state.ingredients.length; i++) {
        if (i === (this.state.ingredients.length-1)) {
          ingredients += this.state.ingredients[i];
        } else {
          ingredients += this.state.ingredients[i];
          ingredients += '%2C';
        }
      }

      let url = 'https://recipe-puppy.p.rapidapi.com/?p=1&i=' + ingredients + '&q=' + this.state.foodTypes;
      console.log(url);

      const response = await fetch(url, {
      	"method": "GET",
      	"headers": {
      		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
      		"x-rapidapi-key": "0364c1c0b2msh0a35a50c81fb52fp11c5f5jsn3711d1bbb1ce"
        }
      });

      const json = await response.json();
      this.setState({
        response: json,
        recipeArray: json.results,
        recipesRequested: true,
        errorMessagePresent: false
      });
      // if there are no results, print no results message
      if (this.state.recipeArray.length < 1) {
        this.setState({
          noResultsMessagePresent: true
        })
      }
    } else {
      this.setState({
        errorMessagePresent: true,
        response: '',
        recipeArray: [],
        noResultsMessagePresent: false
      });
    }
  }

  render() {
    return (
      <div id="content">
        <h2>Feeling hungry, but only have a vague idea about what you're craving?</h2>
        <h1 id="cursive">You've come to the right place!</h1>
        <div className="parameters">
          <label>Optional: Pick 1 type of food (like pasta)</label>
          <div>
            <input
              id="foodTypes"
              type="text"
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.updateFoodTypesHandler()
                }
              }}>
            </input>
            <i className={this.state.foodTypesPresent ? "fas fa-plus-circle " + "disabled" : "fas fa-plus-circle"} onClick={this.updateFoodTypesHandler}></i>
          </div>
          {this.state.foodTypesPresent === 0 ? null : <FoodType value={this.state.foodTypes} action={this.removeFoodTypeHandler}/>}
          <label>Desired ingredients</label>
          <div>
            <input
              id="ingredients"
              type="text"
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.updateIngredientsHandler();
                }
              }}
            ></input>
          <i className="fas fa-plus-circle" onClick={this.updateIngredientsHandler}></i>
          </div>
          {this.state.ingredientsPresent === 0 ? null : <Ingredients value={this.state.ingredients} action={this.removeIngredientsHandler}/>}
        </div>
        <button
          className={this.state.buttonDisabled ? "disabled" : null} onClick={(event) => { this.findMealsHandler()}}>Find Meals <i className="fas fa-utensils"></i></button>
        <Recipes
          error={this.state.errorMessagePresent}
          noResults={this.state.noResultsMessagePresent}
          requestStatus={this.state.recipesRequested}
          response={this.state.recipeArray}
        />

      </div>
    )
  }
}

export default App;

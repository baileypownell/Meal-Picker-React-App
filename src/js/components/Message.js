import React from 'react';
import FoodType from './FoodType';
import Ingredients from './Ingredients';
import Recipes from './Recipes';
import regeneratorRuntime from "regenerator-runtime";

class Message extends React.Component {

  state = {
    buttonDisabled: true,
    foodTypesPresent: 0,
    ingredientsPresent: 0,
    foodTypes: [],
    ingredients: [],
    recipesRequested: false,
    response: '',
    recipeArray: []
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
      foodTypesPresent: 0,
      buttonDisabled: true
    }))
  }

  updateIngredientsHandler = () => {
    let input = document.getElementById('ingredients').value;
    if (document.getElementById('ingredients').value.length > 1) {
      this.setState(prevState => ({
        ingredientsPresent: 1,
        ingredients: [...prevState.ingredients, input],
        buttonDisabled: false
      }))
      console.log(this.state);
      document.getElementById('ingredients').value = ''
    }
  }

  removeIngredientsHandler = (index, e) => {
    const ingredients = Object.assign([], this.state.ingredients);
    console.log(index);
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

  reverseRequestState = () => {
    this.setState({
      recipesRequested: true
    });
  }

  buildFetchHandler = () => {
    let foodType = this.state.foodType;
    let ingredients = '';
    for (let i = 0; i < this.state.ingredients.length; i++) {
      console.log('in for loop')
      if (i === (this.state.ingredients.length-1)) {
        console.log('we are on last element of this.state.ingredients');
        ingredients.concat(this.state.ingredients[i]);
      } else {
        ingredients.concat(this.state.ingredients[i]);
        ingredients.concat('%2C');
      }
    }
    console.log(this.state.ingredients.length);
  }

  async findMealsHandler() {
    // build url https://recipe-puppy.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=omelet
    let foodType = this.state.foodType;
    let ingredients = '';
    for (let i = 0; i < this.state.ingredients.length; i++) {
      if (i === (this.state.ingredients.length-1)) {
        console.log('we are on last element of this.state.ingredients');
        ingredients += this.state.ingredients[i];
      } else {
        ingredients += this.state.ingredients[i];
        ingredients += '%2C';
      }
    }

    let url = 'https://recipe-puppy.p.rapidapi.com/?p=1&i=' + ingredients + '&q=' + this.state.foodTypes;

    const response = await fetch(url, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
    		"x-rapidapi-key": "0364c1c0b2msh0a35a50c81fb52fp11c5f5jsn3711d1bbb1ce"
      }
    });

    const json = await response.json();
    console.log(json);
    this.setState({
      response: json,
      recipeArray: json.results
    });
    console.log(this.state.recipeArray);
  }

  render() {
    return (
      <div id="message">
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
            <i class="fas fa-plus-circle" onClick={this.updateIngredientsHandler}></i>
          </div>
          {this.state.ingredientsPresent === 0 ? null : <Ingredients value={this.state.ingredients} action={this.removeIngredientsHandler}/>}
        </div>
        <button className={this.state.buttonDisabled ? "disabled" : null} onClick={(event) => { this.findMealsHandler(); this.reverseRequestState();}}>Find Meals <i class="fas fa-utensils"></i></button>
        <Recipes
          requestStatus={this.state.recipesRequested}
          response={this.state.recipeArray}
        />

      </div>
    )
  }
}

export default Message;

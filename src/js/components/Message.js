import React from 'react';
import FoodType from './FoodType';
import Ingredients from './Ingredients';

class Message extends React.Component {

  state = {
    buttonDisabled: true,
    foodTypesPresent: 0,
    ingredientsPresent: 0,
    foodTypes: [],
    ingredients: []
  }

  updateFoodTypesHandler = () => {
    if (document.getElementById('foodTypes').value.length > 1 && this.state.foodTypes.length < 1) {
      this.setState(prevState => ({
        foodTypes: [...prevState.foodTypes, document.getElementById('foodTypes').value],
        foodTypesPresent: 1,
        buttonDisabled: false
      }))
      // document.getElementById('foodTypes').value = ''
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
    if (document.getElementById('ingredients').value.length > 1) {
      this.setState(prevState => ({
        ingredientsPresent: 1,
        ingredients: [...prevState.ingredients, document.getElementById('ingredients').value],
        buttonDisabled: false
      }))
      console.log(this.state);
      // document.getElementById('ingredients').value = ''
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

  render() {
    return (
      <div id="message">
        <h2>Feeling hungry, but only have a vague idea about what you're craving?</h2>
        <h1 id="cursive">You've come to the right place!</h1>
        <div className="parameters">
          <label>Type of food (like pasta)</label>
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
        <button className={this.state.buttonDisabled ? "disabled" : null}>Find Meals <i class="fas fa-utensils"></i></button>
      </div>
    )
  }
}

export default Message;

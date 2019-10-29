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
    if (document.getElementById('foodTypes').value.length > 1) {
      this.setState(prevState => ({
        foodTypes: [...prevState.foodTypes, document.getElementById('foodTypes').value],
        foodTypesPresent: 1,
        buttonDisabled: false
      }))
      // document.getElementById('foodTypes').value = ''
    }
  }

  removeFoodTypeHandler = (index) => {
    console.log(index);
    this.setState(prevState => ({
       foodTypes: [...prevState.foodTypes].filter(item => item != index )
    }))
    console.log(this.state, "I'm working");
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

  render() {
    return (
      <div id="message">
        <h2>Feeling hungry, but only have a vague idea about what you're craving?</h2>
        <h1 id="cursive">You've come to the right place!</h1>
        <div>
        {this.state.foodTypesPresent === 0 ? null : <FoodType value={this.state.foodTypes} action={this.removeFoodTypeHandler}/>}
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
            <i class="fas fa-plus-circle" onClick={this.updateFoodTypesHandler}></i>
          </div>
          {this.state.ingredientsPresent === 0 ? null : <Ingredients value={this.state.ingredients}/>}
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
        </div>
        <button className={this.state.buttonDisabled ? "disabled" : null}>Find Meals <i class="fas fa-utensils"></i></button>
      </div>
    )
  }
}

export default Message;

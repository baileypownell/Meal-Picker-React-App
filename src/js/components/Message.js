import React from 'react';
import InputValue from './InputValue';

class Message extends React.Component {

  render() {
    return (
      <div id="message">
        <h2>Feeling hungry, but only have a vague idea about what you're craving?</h2>
        <h1 id="cursive">You've come to the right place!</h1>
        <div>
          <InputValue value="ingredients"/>
          <label>Type of food (like "pasta")</label>
          <input type="text"></input>
          <InputValue value="garlic"/>
          <label>Desired ingredients</label>
          <input type="text"></input>
        </div>
        <button >Find Meals <i class="fas fa-utensils"></i></button>
      </div>
    )
  }
}

export default Message;

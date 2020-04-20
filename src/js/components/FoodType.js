import React from 'react';

export default class FoodType extends React.Component {
  render() {
    const removeFoodTypeHandler  =  this.props.action;
    return (
      <div id="inputContainer">
        {this.props.value.map((item, index) => (
          <div class="ingredients" key={index}>{item}<i class="fas fa-times-circle" onClick={removeFoodTypeHandler}></i></div>
        ))}
      </div>
    )
  }
}

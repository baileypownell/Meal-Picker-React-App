import React from 'react';


export default class Ingredients extends React.Component {
  render() {
    const removeIngredientsHandler = this.props.action;
    return (
      <div id="inputContainer">
        {this.props.value.map((item, index) => (
          <div class="ingredients" key={index}>{item}<i class="fas fa-times-circle" onClick={removeIngredientsHandler}></i></div>
        ))}
      </div>
    )
  }
}

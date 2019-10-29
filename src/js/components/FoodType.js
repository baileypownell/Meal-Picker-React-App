import React from 'react';

// const InputValue = (props) => {
//   // function that iterates over the array of passed ingredients and returns a div for each ingredient
//   return (<div>
//       {props.value.map((item, index) => (
//         <div class="ingredients" key={index}>{item}<i class="fas fa-times-circle" onClick={this.removeFoodItemHandler}></i></div>
//       ))}
//     </div>);
// }

export default class FoodType extends React.Component {
  render() {
    const removeFoodTypeHandler  =  this.props.action;
    return (
      <div>
        {this.props.value.map((item, index) => (
          <div class="ingredients" key={index}>{item}<i class="fas fa-times-circle" onClick={() => removeFoodTypeHandler(index)}></i></div>
        ))}
      </div>
    )
  }
}

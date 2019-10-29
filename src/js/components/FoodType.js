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
  // constructor(props) {
  //   super(props);
  // }
  removeFoodTypeHandler = (key) => {
    var array = [...this.state.foodTypes]; // make a separate copy of the array
    var index = key.index;
    array.splice(index, 1);
    this.setState({foodTypes: array});
    // this.setState(prevState => ({
    //   foodTypes: [...prevState.foodTypes].splice(key.index, 1)
    // }))
    console.log(key.index);
  }
  render() {
    return (
      <div>
        {this.props.value.map((item, index) => (
          <div class="ingredients" key={index}>{item}<i class="fas fa-times-circle" onClick={() => this.removeFoodTypeHandler({index})}></i></div>
        ))}
      </div>
    )
  }
}

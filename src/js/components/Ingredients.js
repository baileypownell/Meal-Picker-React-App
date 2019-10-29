import React from 'react';

export default class Ingredients extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  removeIngredientsHandler = (key) => {
    // this.setState(prevState => ({
    //   foodTypes: [...prevState.foodTypes].splice(key, 1)
    // }))
    console.log('hi');
  }
  render() {
    return (
      <div>
        {this.props.value.map((item, index) => (
          <div class="ingredients" key={index}>{item}<i class="fas fa-times-circle" onClick={this.removeIngredientsHandler({index})}></i></div>
        ))}
      </div>
    )
  }
}

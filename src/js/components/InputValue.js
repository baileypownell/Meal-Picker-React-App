import React from 'react';

const InputValue = (props) => {
  // function that iterates over the array of passed ingredients and returns a div for each ingredient
  return (
    <div class="ingredients">{props.value} <i class="fas fa-times-circle"></i></div>
  )
}

export default InputValue;

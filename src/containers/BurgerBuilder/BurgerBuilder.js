import React, { Component } from "react";
import Aux from "../../hoc/Auxilliar";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: { 
        meat: 0, 
        cheese: 0,
        bacon : 0,
        salad: 0
      },
    };
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredient}/>
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;

import React, { Component } from "react";
import Aux from "../../hoc/Auxilliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  bacon: 1,
  meat: 1.2,
};
const INITIAL_PRICE = 4;
const INITIAL_INGREDIENTS = {
  meat: 0,
  cheese: 0,
  bacon: 0,
  salad: 0,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      ...INITIAL_INGREDIENTS,
    },
    totalPrice: INITIAL_PRICE,
    purchasable: false,
    showSummary: false,
  };

  updatePurchaseState(totalPrice) {
    if (totalPrice > INITIAL_PRICE) {
      this.setState({ purchasable: true });
    } else {
      this.setState({ purchasable: false });
    }
  }

  showSummaryHandler = () => {
    this.setState({ showSummary: true });
  };

  clearOrder = () => {
    this.setState({
      ingredients: INITIAL_INGREDIENTS,
      totalPrice: INITIAL_PRICE,
      purchasable: false,
    });
  };

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedPrice);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedPrice);
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.showSummary}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          purchasable={this.state.purchasable}
          clearOrder={this.clearOrder}
          summary={this.showSummaryHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;

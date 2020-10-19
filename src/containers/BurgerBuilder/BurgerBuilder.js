import React, { Component } from "react";
import Aux from "../../hoc/Auxilliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axiosInstance from "../../axios-orders";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  bacon: 1,
  meat: 1.2,
};
const INITIAL_PRICE = 4;

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    purchasable: false,
    showSummary: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.getIngredients();
  }

  getIngredients() {
    axiosInstance
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

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

  closeSummaryHanlder = () => {
    this.setState({ showSummary: false });
  };

  clearOrder = () => {
    this.setState({
      ingredients: this.getIngredients(),
      totalPrice: INITIAL_PRICE,
      purchasable: false,
    });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Charly García",
        address: {
          street: "Olazabal 2331 10b",
          zipcode: "1421",
          country: "Argentina",
        },
        deliveryMethod: "fastest",
      },
    };
    axiosInstance
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, showSummary: false });
        console.log(response.data);
      })
      .then(() => {
        const queryParams = [];
        for (let key in this.state.ingredients) {
          queryParams.push(
            encodeURIComponent(key) +
              "=" +
              encodeURIComponent(this.state.ingredients[key])
          );
        }
        const query = queryParams.join("&");
        this.props.history.push({
          pathname: "/checkout",
          search: "?" + query,
        });
      })
      .catch((e) => {
        this.setState({ loading: false, showSummary: false });
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

    let burger = this.state.error ? (
      <p>Ingredients cant be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.closeSummaryHanlder}
          continue={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.showSummary}
          closeModal={this.closeSummaryHanlder}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHanlder(BurgerBuilder, axiosInstance);

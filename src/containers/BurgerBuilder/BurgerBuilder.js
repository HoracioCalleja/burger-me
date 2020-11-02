import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axiosInstance from "../../axios-orders";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";

const INITIAL_PRICE = 4;

class BurgerBuilder extends Component {
  state = {
    showSummary: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(totalPrice) {
    if (totalPrice > INITIAL_PRICE) {
      return true;
    } else {
      return false;
    }
  }

  showSummaryHandler = () => {
    this.setState({ showSummary: true });
  };

  closeSummaryHanlder = () => {
    this.setState({ showSummary: false });
  };

  clearOrder = () => {
    this.props.onInitIngredients();
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients cant be loaded</p>
    ) :  (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.price}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.price)}
            clearOrder={this.props.onInitIngredients}
            summary={this.showSummaryHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancel={this.closeSummaryHanlder}
          continue={this.purchaseContinueHandler}
          totalPrice={this.props.price}
        />
      );
    } 

    if (this.props.loading) {
      orderSummary = <Spinner />;
      burger = <Spinner />
    }
    return (
      <>
        <Modal
          show={this.state.showSummary}
          closeModal={this.closeSummaryHanlder}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.reducerBurger.ingredients,
    price: state.reducerBurger.price,
    error: state.reducerBurger.error,
    loading : state.reducerBurger.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase : () => dispatch(actions.orderInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHanlder(BurgerBuilder, axiosInstance));

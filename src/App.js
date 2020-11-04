import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/";

function App(props) {
  const { onCheckTokens } = props;

  useEffect(() => {
    onCheckTokens();
  }, [onCheckTokens]);

  let routes = (
    <>
      <Route path="/authentication" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </>
  );

  if (props.isAuthenticated) {
    routes = (
      <>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/authentication" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckTokens: () => dispatch(actions.checkTokens()),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.reducerAuth.token !== null,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

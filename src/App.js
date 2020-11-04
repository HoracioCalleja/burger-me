import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/";

function App(props) {
  const { onCheckTokens } = props;

  useEffect(() => {
    onCheckTokens();
  }, [onCheckTokens]);

  return (
    <div>
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/authentication" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckTokens: () => dispatch(actions.checkTokens()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));

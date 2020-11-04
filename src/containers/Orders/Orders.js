import React, { useEffect } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";

const Orders = (props) => {
  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [onFetchOrders, props.token, props.userId]);

  const orderList = props.orders.map((order) => {
    return (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    );
  });

  return <div style={{marginTop:'80px'}}>{props.loading ? <Spinner /> : orderList ? orderList : null}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.reducerOrder.orders,
    loading: state.reducerOrder.loading,
    token : state.reducerAuth.token,
    userId : state.reducerAuth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));

import React, { useState, useEffect } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("orders.json")
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        for (let key in res.data) {
          setOrders((orders) => [...orders, { ...res.data[key], id: key }]);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);


  return (
    <div>
      {orders &&
        orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
    </div>
  );
};

export default Orders;

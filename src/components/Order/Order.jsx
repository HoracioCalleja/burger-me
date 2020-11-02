import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  console.log(props);

  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ingredient) => {
    return (
      <span key={ingredient.name} className={classes.OrderIngredients}>
        {ingredient.name} ({ingredient.amount}){" "}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput} </p>
      <p className={classes.Price}>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;

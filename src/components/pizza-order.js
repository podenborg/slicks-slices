import React from 'react'
import Image from "gatsby-image"
import formatMoney from "../utils/formatMoney"
import calculatePizzaPrice from "../utils/calculatePizzaPrice"
import MenuItemStyles from "../styles/MenuItemStyles"

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);

        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Image fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button 
                type="button" 
                className="remove" 
                onClick={() => removeFromOrder(index)}
                title={`Remove ${singleOrder.size} ${pizza.className} from Order`}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        )
      })}
    </>
  )
}

export default PizzaOrder

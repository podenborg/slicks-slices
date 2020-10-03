import React from 'react'
import Image from "gatsby-image"
import { graphql } from "gatsby"
import useForm from "../utils/useForm"
import usePizza from "../utils/usePizza"
import formatMoney from "../utils/formatMoney"
import calculatePizzaPrice from "../utils/calculatePizzaPrice"
import calculateOrderTotal from "../utils/calculateOrderTotal"

import SEO from '../components/seo'
import OrderStyles from "../styles/OrderStyles"
import MenuItemStyles from "../styles/MenuItemStyles"
import PizzaOrder from "../components/pizza-order"

const OrderPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  const { values, updateValues } = useForm({
    name: "",
    email: "",
    maplesyrup: "",
  });

  const { order, error, loading, message, addToOrder, submitOrder, removeFromOrder } = usePizza({ pizzas, values });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div>
      <SEO title="Order a Pizza!" />
      
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>

          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name"
            value={values.name}
            onChange={updateValues}
          />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            value={values.email}
            onChange={updateValues}
          />

          <input 
            type="text" 
            name="maplesyrup" 
            value={values.maplesyrup}
            onChange={updateValues}
            className="mapleSyrup"
          />
        </fieldset>

        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>

          {pizzas.map(pizza => (
            <MenuItemStyles key={pizza.id}>
              <Image width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>       
              <div>
                {['S', 'M', 'L'].map(size => (
                  <button key={size} type="button" onClick={() => addToOrder({
                    id: pizza.id,
                    size: size,
                  })}>
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>       
            </MenuItemStyles>
          ))}
        </fieldset>

        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>

          <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
        </fieldset>

        <fieldset disabled={loading}>
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>
            {error ? <p>Error: {error}</p> : ''}
          </div>
          <button disabled={loading} type="submit">
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </div>
  )
}

export default OrderPage

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
import React from "react"
import { graphql } from "gatsby"

import ToppingsFilter from "../components/toppings-filter"
import PizzaList from "../components/pizza-list"
import SEO from "../components/seo"

const PizzasPage = ({ data, pageContext }) => {
  return (
    <div>
      <SEO 
        title={pageContext.topping ? `Pizzas with ${pageContext.topping}` : `All Pizzas`} 
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={data.pizzas.nodes} />
    </div>
  )
}

export default PizzasPage

export const query = graphql`
  query PizzasQuery($toppingRegex: String) {
    pizzas: allSanityPizza(filter: {
      toppings: { elemMatch: { name: { regex: $toppingRegex } } }
    }) {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
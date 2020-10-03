import React from 'react'
import Img from "gatsby-image"
import { graphql } from "gatsby"
import styled from 'styled-components'

import SEO from "../components/seo"

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const SinglePizzaPage = ({ data }) => {
  const { pizza } = data;

  return (
    <>
      <SEO 
        title={pizza.name}
        image={pizza.image?.asset?.fluid?.src}
      />

      <PizzaGrid>      
        <Img fluid={pizza.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map(topping => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>    
  )
}

export default SinglePizzaPage

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug }}) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        id
        name
        vegetarian
      }
    }
  }
`

import React from 'react'
import Img from "gatsby-image"
import { graphql } from "gatsby"
import SEO from '../components/seo';

const SlicemasterPage = ({ data }) => {
  const { person } = data;

  return (
    <div className="center">
      <SEO 
        title={person.name}
        image={person.image?.asset?.fluid?.src}
      />

      <Img fluid={person.image.asset.fluid} />
      <h2>
        <span className="mark">
          {person.name}
        </span>
      </h2>
      <p>
        {person.description}
      </p>
    </div>
  )
}

export default SlicemasterPage

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug }}) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`

import React from 'react'
import Image from "gatsby-image"
import styled from 'styled-components'
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Pagination from "../components/pagination"

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 3;
    position: relative;
    transform: rotate(1deg);
  }
`;

const SlicemastersPage = ({ data, pageContext }) => {
  const slicemasters = data.slicemasters.nodes;
  
  return (
    <>
      <SEO 
        title={`Slicemasters - Page ${pageContext.currentPage || 1}`}
      />

      <Pagination 
        base="/slicemasters"
        skip={pageContext.skip}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
      />
      <SlicemasterGrid>
        {slicemasters.map(person => (
          <SlicemasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Image fluid={person.image.asset.fluid} />
            <p className="description">
              {person.description}
            </p>
          </SlicemasterStyles>
        ))}
      </SlicemasterGrid>
    </>    
  )
}

export default SlicemastersPage

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
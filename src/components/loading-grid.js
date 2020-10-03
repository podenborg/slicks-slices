import React from 'react'
import { ItemsGrid, ItemStyles } from "../styles/Grids"

const LoadingGrid = ({ count }) => {
  return (    
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={`loader-${i}`}>
          <p>
            <span className="mark">
              Loading...
            </span>            
          </p>
          <img 
            height="400"
            width="500" 
            alt="Loading" 
            className="loading" 
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  )
}

export default LoadingGrid

import React from "react"
import useLatestData from "../utils/useLatestData"

import ItemGrid from "../components/item-grid"
import { HomePageGrid } from "../styles/Grids"
import LoadingGrid from "../components/loading-grid"

const CurrentlySlicing = ({ slicemasters }) => {
  return (
    <div className="">
      <h2 className="center">
        <span className="mark tilt">
          Slicemasters On
        </span>
      </h2>
      <p>Standing by, ready to slice you up!</p>

      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  )
}

const HotSlices = ({ hotSlices }) => {
  return (
    <div className="">
      <h2 className="center">
        <span className="mark tilt">
          Hot Slices
        </span>
      </h2>
      <p>Come on by, buy the slice!</p>

      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices.length && (
        <p>Nothin' in the case!</p>
      )}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  )
}

const HomePage = () => {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  )
}

export default HomePage
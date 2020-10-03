import { useState, useEffect } from "react"

const deets = `
  _id
  name
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  const [ hotSlices, setHotSlices ] = useState(null);
  const [ slicemasters, setSlicemasters ] = useState(null);

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `          
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      })
    })
    .then(res => res.json())
    .then(res => {
      setHotSlices(res.data.StoreSettings.hotSlices);
      setSlicemasters(res.data.StoreSettings.slicemaster);
    })
    .catch(err => {
      console.log('SHOOOOOT');
      console.log(err);
    })
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}
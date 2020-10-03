const path = require("path");
const fetch = require("isomorphic-fetch");

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve("./src/templates/pizza.js");

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        wes: 'is cool',
        slug: pizza.slug.current,
      }
    });
  });
};

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve("./src/pages/pizzas.js");

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      }
    });
  });
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      }
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.slicemasters.nodes.forEach(slicemaster => {
    actions.createPage({
      component: path.resolve("./src/templates/slicemaster.js"),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, index) => {
    actions.createPage({
      path: `/slicemasters/${index + 1}`,
      component: path.resolve("./src/pages/slicemasters.js"),
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize,
      },
    });
  });
}

exports.sourceNodes = async (params) => {
  await Promise.all([
    fetchBeersAndTurnIntoNodes(params),
  ]);
}

exports.createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}
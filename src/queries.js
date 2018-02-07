import gql from 'graphql-tag';
import client from 'graphqlClient';

export function getPizzaSize() {
  return client.query({
    query: gql`
      query {
        pizzaSizes {
          name
          basePrice
        }
      }
    `,
  });
}

export function getPizzaToppings(name) {
  return client.query({
    query: gql`
      query {
        pizzaSizeByName(name: ${name.toUpperCase()}) {
          maxToppings
          toppings {
            defaultSelected,
            topping {
              name
              price
            }
          }
        }
      }
    `,
  });
}
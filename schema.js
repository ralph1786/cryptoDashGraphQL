const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} = require("graphql");
const { firstApiKey, secondApiKey } = require("./constant");
const axios = require("axios");

const CurrencyType = new GraphQLObjectType({
  name: "cryptocurrency",
  fields: () => ({
    currency: { type: GraphQLString },
    price: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "rootquery",
  fields: {
    currencies: {
      type: new GraphQLList(CurrencyType),
      resolve(parent, args) {
        return axios
          .get(`https://api.nomics.com/v1/currencies/ticker?key=${firstApiKey}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

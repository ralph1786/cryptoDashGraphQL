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
    price: { type: GraphQLString },
    logo_url: { type: GraphQLString },
    name: { type: GraphQLString },
    price_date: { type: GraphQLString }
  })
});

const NewsType = new GraphQLObjectType({
  name: "currencynews",
  fields: () => ({
    title: { type: GraphQLString },
    categories: { type: GraphQLString },
    url: { type: GraphQLString }
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
          .then(res => res.data.slice(0, 12));
      }
    },
    currency: {
      type: CurrencyType,
      args: {
        currency: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        console.log(args);
        return axios
          .get(
            `https://api.nomics.com/v1/currencies/ticker?key=${firstApiKey}&ids=${
              args.currency
            }`
          )
          .then(res => res.data[0]);
      }
    },
    news: {
      type: new GraphQLList(NewsType),
      resolve(parent, args) {
        return axios
          .get(
            `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${secondApiKey}`
          )
          .then(res => res.data.Data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

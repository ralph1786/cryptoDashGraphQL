const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server running on port ${PORT} `));

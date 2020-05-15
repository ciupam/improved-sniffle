import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import session from "express-session";
import connectRedis from "connect-redis";
import redis from "./util/redis";
import cors from "cors";

(async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    }),
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "ssid",
      secret: "totallysecretpassword",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
      },
    }),
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log("Server started!"));
})();

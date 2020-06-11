import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import cors from "cors";
import refreshTokenRouter from "./routes/refreshToken";

(async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(cookieParser());

  app.get("/", (_req, res) => res.send("Graphql on: /graphql"));

  app.use("/", refreshTokenRouter);

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("Server is listening on port 4000"));
})();

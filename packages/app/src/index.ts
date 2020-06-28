import { Server } from "jayson";
import cors from "cors";
import connect, { HandleFunction } from "connect";
import bodyParser from "body-parser";
import isAuth from "./middleware/isAuth";
import { createConnection } from "typeorm";

import * as procedures from "./procedures";

(async () => {
  await createConnection();

  const app = connect();

  const server = new Server({
    ...procedures,
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
    }) as HandleFunction,
  );

  app.use(isAuth);

  app.use(bodyParser.json());
  app.use(server.middleware());

  app.listen(5000, () => console.log("Server is listening on port 5000"));
})();

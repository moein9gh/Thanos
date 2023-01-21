import fs from "fs";
import path from "path";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";
import { Router } from "@gateway";

@injectable()
export class GraphQLServer {
  constructor(@inject(TYPES.RootRouter) private router: Router) {}

  listen = () => {
    const expressRouter = this.router.getRouter();
    const file = fs.readFileSync(path.resolve("src", "schema", "schema.gql")).toString();

    const schema = buildSchema(file);

    const root = {
      hello: () => "Hello world!"
    };

    expressRouter.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
      })
    );
  };
}

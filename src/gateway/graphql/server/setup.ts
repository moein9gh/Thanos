import fs from "fs";
import path from "path";
import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {Router} from "@gateway";

export class GraphQLServer {
    constructor(private router: Router) {
    }

    static NewServer(router: Router) {
        const expressRouter = router.getRouter();
        const file = fs.readFileSync(path.resolve("src", "schema", "schema.gql")).toString();

        const schema = buildSchema(file);

        const root = {
            hello: () => "Hello world!",
        };

        expressRouter.use("/graphql", graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));

        return (new GraphQLServer(router));
    }
}
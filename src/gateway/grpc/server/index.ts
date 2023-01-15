import {APP_CONFIG} from "@config";
import {Logger} from "../../../log";

const grpc = require("@grpc/grpc-js");
const PROTO_PATH = process.cwd()+"/src/protos/news.proto";
const protoLoader = require("@grpc/proto-loader");

export class GrpcServer{
    static NewServer(){
        const options = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        };

        const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

        const newsProto = grpc.loadPackageDefinition(packageDefinition);

        const server = new grpc.Server();

        let news = [];

        server.addService(newsProto.NewsService.service, {
            getAllNews: (_, callback) => {
                new Logger("GRPC_SERVER", null, "received");
                callback(null, news);
            }, 
        });

        server.bindAsync(
            "127.0.0.1:"+APP_CONFIG.grpcServerPort,
            grpc.ServerCredentials.createInsecure(),
            (error, port) => {
                if(!error){
                    new Logger("GRPC_SERVER", null, "grpc server running on "+APP_CONFIG.grpcServerPort);
                    server.start();
                }else{
                    new Logger("GRPC_SERVER", error, "grpc server error");
                }
            }
        );
    }
}
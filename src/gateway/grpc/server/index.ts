import {APP_CONFIG} from "@config";

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
                // console.log("received")
                callback(null, news);
            }, 
        });

        server.bindAsync(
            "127.0.0.1:"+APP_CONFIG.grpcServerPort,
            grpc.ServerCredentials.createInsecure(),
            (error, port) => {
                if(!error){
                    // console.log("grpc server running on "+APP_CONFIG.grpcServerPort);
                    server.start();
                }else{
                    // console.log("grpc server error",error);
                }
            }
        );
    }
}
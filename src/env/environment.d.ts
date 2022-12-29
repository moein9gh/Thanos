declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_USERNAME: string;
            MONGO_PASSWORD: string;
            MONGO_DB: string;
            MONGO_HOST: string;
            MONGO_LOCAL_PORT: number;
            MONGO_CONTAINER_PORT: number;
            HTTP_SERVER_LOCAL_PORT: number;
            HTTP_SERVER_CONTAINER_PORT: number;
            WEBSOCKET_SERVER_LOCAL_PORT: number;
            WEBSOCKET_SERVER_CONTAINER_PORT: number;
            GRPC_SERVER_LOCAL_PORT: number;
            GRPC_SERVER_CONTAINER_PORT: number;
        }
    }
}
export {};

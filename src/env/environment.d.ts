declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_USERNAME: string;
            MONGO_PASSWORD: string;
            MONGO_DB: string;
            MONGO_HOST: string;
            MONGO_LOCAL_PORT: number;
            MONGO_CONTAINER_PORT: number;
            SERVER_LOCAL_PORT: number;
            SERVER_CONTAINER_PORT: number;
        }
    }
}
export {};

 import { MongoClient , Db} from 'mongodb'
// Connection URL
const url = 'mongodb://root:example@localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

export async function setup():Promise<Db> {
    try{

        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');

        return client.db(dbName);

    }catch (e) {
        console.log(e)
        throw new Error("")
    }
}


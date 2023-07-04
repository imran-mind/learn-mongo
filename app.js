const {MongoClient} = require('mongodb');
const uri = require('./atlas-uri');
console.log(uri);

const client = new MongoClient(uri);
const dbname = "blog"
const connectToDB = async () =>{
    try{
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    }catch(err){
        console.error(`Error connecting to the database ${err}`);
    }
}

const main = async ()=>{
    try{
        await connectToDB();
    }catch(err){
        console.error(`Error connecting to the database ${err}`);
    }finally{
        await client.close();
    }
}

main();
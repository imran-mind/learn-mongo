const {MongoClient,ObjectId} = require('mongodb');
const uri = require('./atlas-uri');
console.log(uri);

const client = new MongoClient(uri);
const dbname = "blog"
const postsCollection = client.db('blog').collection('posts');

const connectToDB = async () =>{
    try{
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    }catch(err){
        console.error(`Error connecting to the database ${err}`);
    }
}

const docToUpdate = { title: 'title test 1'}
const update = {$push:{tags: 'travel'}};

const main = async ()=>{
    try{
        await connectToDB();
        let result = await postsCollection.updateMany(docToUpdate, update);
        console.log('Document Inserted ',result);
    }catch(err){
        console.error(`Error connecting to the database ${err}`);
    }finally{
        await client.close();
    }
}

main();
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

const docToDelete = { title: 'title test 3'}
const update = {$push:{tags: 'travel'}};

const main = async ()=>{
    try{
        await connectToDB();
        let result = await postsCollection.deleteMany(docToDelete);
        console.log('Document Inserted ',result);
    }catch(err){
        console.error(`Error connecting to the database ${err}`);
    }finally{
        await client.close();
    }
}

main();
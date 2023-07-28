const {MongoClient} = require('mongodb');
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

const blog = [
    {
        title: 'title test 1',
        description: 'some text 1',
        date: new Date()
    },
    {
        title: 'title test 2',
        description: 'some text 2',
        date: new Date()
    }
]
const main = async ()=>{
    try{
        await connectToDB();
        let result = await postsCollection.insertMany(blog);
        console.log('Document Inserted ',result);
    }catch(err){
        console.error(`Error connecting to the database ${err}`);
    }finally{
        await client.close();
    }
}

console.log('Demo Logs');
main();
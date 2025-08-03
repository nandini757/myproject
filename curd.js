const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
  console.log("script started");
async function runCRUD() {
    try{
        console.log("connecting to mongodb")
        await client.connect();
        console.log("connected to mongodb")
        const db = client.db('student');
        const collection = db.collection('cse');

        //1.create:inserted doc
        console.log("inserting doc");
        await collection.insertMany([ 
            { name : 'sita',rollno : 13},
            {  name : 'ram',rollno : 15}
        ]);
         console.log('doc is inserted');
        //2.read:retrived doc

        const students = await collection.Find().toArray();
        console.log('retrived doc:',students);
        
        //3.update doc
        console.log('updating doc');
        await collection.UpdateOne({name : 'sita'},{$set:{name : 'honey'}});
        console.log('doc is updated');

        //4.delete doc
        console.log('deleting doc');
        await collection.DeleteOne({name : 'honey'});
        console.log('doc is deleted');
    } catch(error){
    console.error('Error:',error); 
    }finally{
    await client.close();
    console.log('monoDB connection successfully')
}}

runCRUD();

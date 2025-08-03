const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'testdb';
const collectionName = 'users';

async function main() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const users = db.collection(collectionName);

    // CREATE
    const newUser = { name: 'Alice', age: 28 };
    const createResult = await users.insertOne(newUser);
    console.log('Created:', createResult.insertedId);

    // READ
    const allUsers = await users.find().toArray();
    console.log('All Users:', allUsers);

    // UPDATE
    const updateResult = await users.updateOne(
      { _id: createResult.insertedId },
      { $set: { age: 29 } }
    );
    console.log('Updated count:', updateResult.modifiedCount);

    // DELETE
    const deleteResult = await users.deleteOne({ _id: createResult.insertedId });
    console.log('Deleted count:', deleteResult.deletedCount);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main();

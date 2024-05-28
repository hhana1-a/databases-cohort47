const { MongoClient } = require('mongodb');
require('dotenv').config();

async function cleanUpAccountsCollection(db) {
  try {
    await db.dropCollection('accounts');
    console.log('Accounts collection dropped successfully.');
  } catch (error) {
    if (error.codeName !== 'NamespaceNotFound') {
      console.error('Error dropping accounts collection:', error);
    }
  }
}

async function fillData(db) {
  try {
    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: []
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: []
      }
      
    ];

    const result = await db.collection('accounts').insertMany(accounts);
    console.log(`${result.insertedCount} account added into accounts collection.`);
  } catch (error) {
    console.error('Error inserting accounts:', error);
  }
}

async function setUpEnvironment() {
  const url = process.env.MONGODB_URL;
//  const dbName = 'process.env.DB_NAME;'
    const dbName = 'Bank';

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB.');

    const db = client.db(dbName);

    await cleanUpAccountsCollection(db);

    await fillData(db);
  } catch (error) {
    console.error('Error setting up environment:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}

module.exports = { setUpEnvironment };

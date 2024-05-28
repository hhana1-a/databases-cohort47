const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const dbName = 'week4Ex';
const sourceCollectionName = 'CountryData';
const populationCollectionName = 'TotalPopulationByCountry';
const continentCollectionDataName = 'continentCollectionData';

const countriesToMatch = [
  'South America',
  'NORTHERN AMERICA',
  'OCEANIA',
  'EUROPE',
  'Australia',
  'ASIA'
];

async function createCollectionsIfNeeded(db) {
  try {
    const collectionsToCreate = [
      populationCollectionName,
      continentCollectionDataName
    ];

    for (const collectionName of collectionsToCreate) {
      const collectionExists = await db.listCollections({ name: collectionName }).toArray();
      if (collectionExists.length === 0) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created`);
      }
    }
  } catch (error) {
    console.error('Error creating collections: ', error);
  }
}

async function importCSVtoMongoDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db(dbName);

    await createCollectionsIfNeeded(db);

    const sourceCollection = db.collection(sourceCollectionName);

    const data = [];
    fs.createReadStream('./population_pyramid_1950-2022.csv')
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        try {
          const result = await sourceCollection.insertMany(data);
          console.log(`${result.insertedCount} documents were inserted into source collection`);
          await populateTotalPopulationCollection(db);
          await getDataByYearAndAgeContinent(db, '2020', '100+');
        } catch (error) {
          console.error('Error inserting documents into source collection: ', error);
        } finally {
          await client.close();
        }
      });
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas: ', err);
  }
}

async function populateTotalPopulationCollection(db) {
  const sourceCollection = db.collection(sourceCollectionName);
  const populationCollection = db.collection(populationCollectionName);

  try {
    const query = [
      { 
        $group: {
          _id: { Country: '$Country', Year: '$Year' },
          countPopulation: { $sum: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] } }
        }
      },
      {
        $project: {
          _id: 0,
          Country: '$_id.Country',
          Year: '$_id.Year',
          countPopulation: 1
        }
      }
    ];

    const results = await sourceCollection.aggregate(query).toArray();
    await populationCollection.insertMany(results);
    console.log(`${results.length} documents were inserted into population collection`);
  } catch (error) {
    console.error('Error populating TotalPopulationByCountry collection: ', error);
  }
}

async function getDataByYearAndAgeContinent(db, year, age) {
  const sourceCollection = db.collection(sourceCollectionName);
  const continentCollection = db.collection(continentCollectionDataName);

  try {
    const query = [
      {
        $match: {
          Country: { $in: countriesToMatch },
          Year: year,
          Age: age
        }
      },
      {
        $addFields: {
          TotalPopulation: { $add: [{ $toInt: '$M' }, { $toInt: '$F' }] }
        }
      }
    ];

    const results = await sourceCollection.aggregate(query).toArray();

    if (results.length > 0) {
      const insertResult = await continentCollection.insertMany(results);
      console.log(`${insertResult.insertedCount} documents were inserted into continent collection`);
    } else {
      console.log('No documents matched the query');
    }

    return results;
  } catch (error) {
    console.error('Error retrieving data by Year and Age: ', error);
    return [];
  }
}

importCSVtoMongoDB();


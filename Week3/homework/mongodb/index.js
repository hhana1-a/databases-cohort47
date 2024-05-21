const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

require('dotenv').config();

async function createEpisodeExercise(client) {
  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
  };

  try {
    const database = client.db("databaseWeek3");
    const collection = database.collection("bob_ross_episodes");
    const result = await collection.insertOne(newEpisode);
    console.log(`Created season 9 episode 13 and the document got the id ${result.insertedId}`);
  } catch (error) {
    console.error("Error inserting the new episode: ", error);
  }
}

async function findEpisodesExercises(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  const episode2Season2 = await collection.findOne({ season: "S02", episode: "E02" });

  console.log(
    `The title of episode 2 in season 2 is ${episode2Season2.title}`
  );

  const blackRiverEpisode = await collection.findOne ({ title: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode are following. Season: ${blackRiverEpisode.season}; Episode number: ${blackRiverEpisode.episode}`
  );

 const cliffEpisodes = await collection.find({ elements: "CLIFF" }, {projection: { _id:0, title:1 }}).toArray();
 const cliffTitles = cliffEpisodes.map(episode => episode.title);
  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffTitles}`
  );

  const cliffAndLighthouseEpisodes = await collection.find ({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] }}, {projection: {_id:0, title:1}}).toArray();
  const cliffAndLighthouseTitles = cliffAndLighthouseEpisodes.map(episode => episode.title);
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseTitles}`
  );
}

async function updateEpisodeExercises(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
const updateResult = await collection.updateOne({ season: "S30", episode: "E13" }, {$set: {title: "BLUE RIDGE FALLS"}});


  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateResult.modifiedCount} episodes`
  );

  const updateBushesResult = await collection.updateMany ({ elements: "BUSHES" }, { $set: {"elements.$": "BUSH"}});

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateBushesResult.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */

  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");
  const deleteResult = await collection.deleteOne ({season: "S31", episode: "E14"});

  console.log(
    `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/

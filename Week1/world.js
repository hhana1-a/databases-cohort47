const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'rootroot',
  database: 'new_world'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

const executeQuery = (query, description) => {
  connection.query(query, (error, results) => {
    if (error) {
      console.error(`Error executing query "${query}": ${error.stack}`);
      return;
    }
    console.log(description);
    console.log(results);
  });
};

executeQuery('SELECT Name FROM country WHERE Population > 8000000', 'Countries with population greater than 8 million:');
executeQuery("SELECT Name FROM country WHERE Name LIKE '%land%'", 'Countries with "land" in their names:');
executeQuery('SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000', 'Cities with population between 500,000 and 1 million:');
executeQuery("SELECT Name FROM country WHERE Continent = 'Europe'", 'Countries in Europe:');
executeQuery('SELECT Name FROM country ORDER BY SurfaceArea DESC', 'Countries in descending order of surface area:');
executeQuery("SELECT Name FROM city WHERE CountryCode = 'NLD'", 'Cities in the Netherlands:');
executeQuery("SELECT Population FROM city WHERE Name = 'Rotterdam'", 'Population of Rotterdam:');
executeQuery('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10', 'Top 10 countries by surface area:');
executeQuery('SELECT Name FROM city ORDER BY Population DESC LIMIT 10', 'Top 10 most populated cities:');
executeQuery('SELECT SUM(Population) AS TotalPopulation FROM country', 'Population of the world:');

connection.end((err) => {
  if (err) {
    console.error('Error disconnecting from the database: ' + err.stack);
    return;
  }
  console.log('Disconnected from the database');
});

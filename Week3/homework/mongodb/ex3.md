


function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

Instead of Name and Code, a user can insert "' OR 1=1; --". "' OR 1=1;" this condition will always evaluate to true, therefore it will show all the results from the database, and "--" will start a comment, therefore ignore all the code that follows. 

To fix this, we use placeholder "?" because in that way we don't include values in SQL directly, database driver handles the proper escaping and sanitization of these values. This prevents SQL injection attacks because the values are treated as DATA rather than executable SQL code.

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
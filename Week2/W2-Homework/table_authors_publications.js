const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'rootroot',
  database: 'authorsdb'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
  });
  

const createTablesQuery = `
  CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other')
  );

CREATE TABLE research_papers (
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255) NOT NULL,
    conference VARCHAR(100),
    publish_date DATE

); 

CREATE TABLE author_paper (

    author_id INT,
    paper_id INT,
    UNIQUE KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);`;


const alterTablesQuery = `
  ALTER TABLE authors
  ADD COLUMN mentor INT,
  ADD CONSTRAINT fk_mentor
  FOREIGN KEY (mentor) REFERENCES authors(author_id)
`;


connection.query(createTablesQuery, (err, results) => {
    if (err) {
      console.error('Error creating authors table: ' + err.message);
    } else {
      console.log('Authors table created successfully');
      
      connection.query(alterTablesQuery, (err, results) => {
        if (err) {
          console.error('Error adding mentor column: ' + err.message);
        } else {
          console.log('Mentor column added successfully');
        }
        

        connection.query(`UPDATE authors
                SET mentor = 1
                WHERE author_name = 'Mary';`, (err, results) => {
        if (err) {
        console.error('Error updating Mary\'s mentor: ' + err.message);
        } else {
        console.log('Mary\'s mentor updated successfully');
        }


        connection.query(`UPDATE authors
        SET mentor = (SELECT author_id FROM authors WHERE author_name = 'Olivia')
        WHERE author_name = 'Karen';`, (err, results) => {
        if (err) {
        console.error('Error updating Karen\'s mentor: ' + err.message);
        } else {
        console.log('Karen\'s mentor updated successfully');
        }
        });


        });

        connection.end();
      });
    }
  });
  

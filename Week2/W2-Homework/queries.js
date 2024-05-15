const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'rootroot',
  database: 'authorsdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
  });
  
const query1 = `
SELECT a.author_name AS author_name, m.author_name AS mentor_name
FROM authors a
LEFT JOIN authors m ON a.mentor = m.author_id
`;

const query2 = `
SELECT a.*, rp.paper_title
FROM authors a
LEFT JOIN author_paper ap ON a.author_id = ap.author_id
LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id
`;

const query3 = `
SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors
FROM research_papers rp
LEFT JOIN author_paper ap ON rp.paper_id = ap.paper_id
GROUP BY rp.paper_title
`;

const query4 = `
SELECT COUNT(ap.paper_id) AS total_papers_published_by_female_authors
FROM authors a
LEFT JOIN author_paper ap ON a.author_id = ap.author_id
WHERE a.gender = 'Female'
`;

const query5 = `
SELECT university, AVG(h_index) AS avg_h_index
FROM authors
GROUP BY university
`;

const query6 = `
SELECT university, COUNT(ap.paper_id) AS total_papers_per_university
FROM authors a
LEFT JOIN author_paper ap ON a.author_id = ap.author_id
GROUP BY university
`;

const query7 = `
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM authors
GROUP BY university
`;

connection.end((err) => {
    if (err) {
        console.error('Error closing database connection:', err.message);
    } else {
        console.log('Database connection closed');
    }
})

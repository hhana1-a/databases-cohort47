const { Client } = require('pg');

const client = new Client({
  user: 'hyfuser',
  host: 'localhost',
  database: 'transactions_db',
  password: 'rootroot',
  port: 5432,
});

const createTables = async () => {
  await client.connect();

  const createAccountTable = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT PRIMARY KEY,
      balance DECIMAL(15, 2) NOT NULL
    );
  `;

  const createAccountChangesTable = `
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number SERIAL PRIMARY KEY,
      account_number INT REFERENCES account(account_number),
      amount DECIMAL(15, 2),
      changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(255)
    );
  `;

  try {
    await client.query(createAccountTable);
    await client.query(createAccountChangesTable);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  } finally {
    await client.end();
  }
};

createTables();

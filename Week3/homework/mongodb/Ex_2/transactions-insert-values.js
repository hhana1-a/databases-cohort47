const { Client } = require('pg');

const client = new Client({
  user: 'hyfuser',
  host: 'localhost',
  database: 'transactions_db',
  password: 'rootroot',
  port: 5432,
});

const insertValues = async () => {
  await client.connect();

  const insertAccounts = `
    INSERT INTO account (account_number, balance) VALUES
    (101, 5000.00),
    (102, 3000.00)
    ON CONFLICT (account_number) DO NOTHING;
  `;

  const insertAccountChanges = `
    INSERT INTO account_changes (account_number, amount, remark) VALUES
    (101, 5000.00, 'Initial balance'),
    (102, 3000.00, 'Initial balance');
  `;

  try {
    await client.query(insertAccounts);
    await client.query(insertAccountChanges);
    console.log('Initial values inserted successfully');
  } catch (err) {
    console.error('Error inserting values', err);
  } finally {
    await client.end();
  }
};

insertValues();

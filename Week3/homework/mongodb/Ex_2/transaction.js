const { Client } = require('pg');

const client = new Client({
  user: 'hyfuser',
  host: 'localhost',
  database: 'transactions_db',
  password: 'rootroot',
  port: 5432,
});

const transferAmount = async () => {
  await client.connect();

  try {
    await client.query('BEGIN');

    const deductAmount = `
      UPDATE account
      SET balance = balance - 1000
      WHERE account_number = 101;
    `;

    const logDeduction = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES (101, -1000, 'Transfer to account 102');
    `;

    const addAmount = `
      UPDATE account
      SET balance = balance + 1000
      WHERE account_number = 102;
    `;

    const logAddition = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES (102, 1000, 'Transfer from account 101');
    `;

    await client.query(deductAmount);
    await client.query(logDeduction);
    await client.query(addAmount);
    await client.query(logAddition);

    await client.query('COMMIT');
    console.log('Transaction completed successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Transaction failed', err);
  } finally {
    await client.end();
  }
};

transferAmount();

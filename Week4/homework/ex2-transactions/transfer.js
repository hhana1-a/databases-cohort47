const { MongoClient } = require('mongodb');
require('dotenv').config();

async function transferMoney(user_1, user_2, amount, remark) {
  const url = process.env.MONGODB_URL;
  const dbName = 'Bank';

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB.');

    const db = client.db(dbName);
    const accountsCollection = db.collection('accounts');

    const session = client.startSession();
    session.startTransaction();

    try {
      const sendingAccount = await accountsCollection.findOne({ account_number: user_1 }, { session });
      if (!sendingAccount) {
        throw new Error(`Sender account with number ${user_1} not found.`);
      }

      const receivingAccount = await accountsCollection.findOne({ account_number: user_2 }, { session });
      if (!receivingAccount) {
        throw new Error(`Recipient account with number ${user_2} not found.`);
      }

      if (sendingAccount.balance < amount) {
        throw new Error('Insufficient balance to transfer.');
      }

      const newsendingAccountBalance = sendingAccount.balance - amount;
      const sendingAccountChange = {
        change_number: sendingAccount.account_changes.length + 1,
        amount: -amount,
        changed_date: new Date(),
        remark: remark
      };

      const newReceivingAccountBalance = receivingAccount.balance + amount;
      const receivingChange = {
        change_number: receivingAccount.account_changes.length + 1,
        amount: amount,
        changed_date: new Date(),
        remark: remark
      };

      await accountsCollection.updateOne(
        { account_number: user_1 },
        { $set: { balance: newsendingAccountBalance }, $push: { account_changes: sendingAccountChange } },
        { session }
      );

      await accountsCollection.updateOne(
        { account_number: user_2 },
        { $set: { balance: newReceivingAccountBalance }, $push: { account_changes: receivingChange } },
        { session }
      );

      await session.commitTransaction();
      console.log('Transaction successful.');

    } catch (error) {
      await session.abortTransaction();
      console.error('Transaction aborted:', error);
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error('Error transferring money:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB.');
  }
}

module.exports = { transferMoney };

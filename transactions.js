const { MongoClient, ObjectId } = require('mongodb');
const uri = require('./atlas-uri');
console.log(uri);

const client = new MongoClient(uri);
const dbname = "bank"


const connectToDB = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    } catch (err) {
        console.error(`Error connecting to the database ${err}`);
    }
}
// Collections
const accounts = client.db("bank").collection("accounts")
const transfers = client.db("bank").collection("transfers")


// Account information
let account_id_sender = "MDB011235813"
let account_id_receiver = "MDB829000001"
let transaction_amount = 100

const session = client.startSession()

const main = async () => {
    try {
        await connectToDB();
        const transactionResults = await session.withTransaction(async () => {
            // Update the balance field of the sender’s account by decrementing the transaction_amount from the balance field.
            const senderUpdate = await accounts.updateOne(
                { account_id: account_id_sender },
                { $inc: { balance: -transaction_amount } },
                { session }
            )
            //Update the balance field of the receiver’s account by incrementing the transaction_amount to the balance field.
            const receiverUpdate = await accounts.updateOne(
                { account_id: account_id_receiver },
                { $inc: { balance: transaction_amount } },
                { session }
            )

            //Create a transfer document and insert it into the transfers collection
            const transfer = {
                transfer_id: "TR21872188",
                amount: 200,
                from_account: account_id_sender,
                to_account: account_id_receiver,
            }

            const insertTransferResults = await transfers.insertOne(transfer, { session })

            //   Update the transfers_complete array of the sender’s account by adding the transfer_id to the array.
            const updateSenderTransferResults = await accounts.updateOne(
                { account_id: account_id_sender },
                { $push: { transfers_complete: transfer.transfer_id } },
                { session }
            )
            // Update the transfers_complete array of the receiver’s account by adding the transfer_id to the array.
            const updateReceiverTransferResults = await accounts.updateOne(
                { account_id: account_id_receiver },
                { $push: { transfers_complete: transfer.transfer_id } },
                { session }
            )
        })

        // Log a message regarding the success or failure of the transaction.
        if (transactionResults) {
            console.log("Transaction completed successfully.")
        } else {
            console.log("Transaction failed.")
        }
    } catch (err) {
        console.error(`Transaction aborted: ${err}`)
        process.exit(1)
    } finally {
        await session.endSession()
        await client.close()
    }
}

main();
import express from 'express';
import { MongoClient } from 'mongodb';
import { config as configDotenv } from 'dotenv';
import  cors from 'cors';

configDotenv();

const app = express();
const PORT =  3000;
const MONGODB_URI = process.env.DATABASE_URL;

let client;


app.use(express.json());
app.use(cors());


async function run() {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.error);

// Endpoint to add a new record
app.post('/addRecord', async (req, res) => {
  try {
      const db = client.db(); 
      const collection = db.collection('records'); 

      const { dateTime, drawCount, playerOne, playerOneLoseCount, playerOneWinCount, playerTwo, playerTwoLoseCount, playerTwoWinCount, roundCount } = req.body;
      
      await collection.insertOne({
        dateTime,
        roundCount,
        drawCount,
        playerOne,
        playerOneWinCount,
        playerOneLoseCount,
        playerTwo,
        playerTwoWinCount,
        playerTwoLoseCount
      });
      
      console.log('add data success');
      res.status(200).json({ message: 'Data is successfully added' });
  } catch (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all records
app.get('/getRecords', async (req, res) => {
  try {
      const db = client.db(); 
      const collection = db.collection('records'); 

      const records = await collection.find({}).toArray();

      console.log('get data success');
      res.json(records);
  } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})



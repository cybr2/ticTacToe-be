import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config as configDotenv } from 'dotenv';
import  cors from 'cors';

configDotenv();

const app = express();
const PORT =  3000;
const MONGODB_URI = process.env.DATABASE_URL;
const client = new MongoClient(MONGODB_URI,{
  serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json());
app.use(cors());


async function run() {
  try {
    console.log(`connecting`);
    await client.connect();
    console.log(`connected`);
    // const database = client.db('test');
    // const records = database.collection('records')
    // const doc = {
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // }
    // console.log(`${records} accessed`)
    // const result = await records.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    console.log('closing client')
    await client.close();
  }
  
}
run().catch(console.dir);




// Endpoint to add a new record
app.post('/addRecord', async (req, res) => {
  try {
      await client.connect()
      const database = client.db('test'); 
      const collection = database.collection('records'); 

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
  }finally {
    console.log('closing client')
    await client.close();
  }
});

// Endpoint to get all records
app.get('/getRecords', async (req, res) => {
  try {
      console.log('connecting')
      await client.connect()
      console.log(`locating client`);

      const database = client.db('test'); 
      const collection = database.collection('records'); 

      console.log(`getting data`);
      const records = await collection.find({}).toArray();

      console.log('get data success');
      res.json(records);
  } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }finally {
    // Close the client connection
    if (client) {
      console.log('closing client')
      await client.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})



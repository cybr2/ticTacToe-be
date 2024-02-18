import prisma from "../lib/prisma";

const addRecord = async (req, res) => {
    try {
        const { dateTime, drawCount, playerOne, playerOneLoseCount, playerOneWinCount, playerTwo, playerTwoLoseCount, playerTwoWinCount, roundCount } = req.body;
        
        const newRecord = await prisma.record.create({
            data: {
                dateTime,
                roundCount,
                playerOne,
                playerOneWinCount,
                playerOneLoseCount,
                playerTwo,
                playerTwoWinCount,
                playerTwoLoseCount,
                drawCount,
            }
        });

        res.json(newRecord);
        res.status(200);
    } catch (error) {
        console.error('Error adding record:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRecords = async (req, res) => {
    try {
        const records = await prisma.record.findMany();
        res.json(records);
        res.status(200);
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default  {
    addRecord,
    getRecords
};
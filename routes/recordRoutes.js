import { addRecord , getRecords} from "../controller/recordController";
import express from 'express';

const recordRoutes = express.Router();

recordRoutes.post('/addRecord', addRecord);
recordRoutes.get('/getRecords', getRecords);

export default  {
    recordRoutes
};
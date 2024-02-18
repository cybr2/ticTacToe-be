import { addRecord , getRecords} from "../controller/recordController";
import express from 'express';

const router = express.Router();

router.post('/addRecord', addRecord);
router.get('/getRecords', getRecords);

export default  {
    router
};
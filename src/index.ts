import express from 'express';
import cors from 'cors'; 
import { router } from './routes/index';
import * as path from 'path';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const port = process.env.PORT || 5000
const app = express();
// const app2 = express();
// ! Attention à ne pas toucher
// TODO :  check the environement befor deploy code
// FirestoreService.initEnv(Environement.DEVELOPPEMENT)
// body middleware bodyParser
// tslint:disable-next-line: deprecation
app.use(express.urlencoded({extended: true}));
// tslint:disable-next-line: deprecation
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'), {}))
// cors middleware
app.use(cors()); 
app.use('/api',  router);

app.listen(port, ()=>{
    console.log("The serve is runing" + port);
})
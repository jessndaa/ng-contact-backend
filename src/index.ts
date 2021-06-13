import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './docs/swagger.json';
import cors from 'cors'; 
import { router } from './routes/index';
import * as path from 'path';
import * as https  from 'https';
import * as fs  from 'fs';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
https.createServer({
    key: fs.readFileSync(path.resolve(__dirname+'/certs/server/local.key')),
    cert: fs.readFileSync(path.resolve(__dirname+ '/certs/server/local.cert'))
}, app)
.listen(5001); 
app.listen(port, ()=>{
    console.log("The serve is runing" + port);
})
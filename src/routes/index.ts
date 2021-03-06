import * as express from 'express';

import { UserDAO } from '../services/DAO/user.dao';
import { Utility } from '../utils/utils';
import { ContactRoute } from './contact/Contact.route';
import { UserRoute } from './user/User.route';



export const router = express.Router();

// user url
router.get('/user/authenticate', UserRoute.Authenticate);
router.post('/user/create', UserRoute.Create);
router.put('/user/update', UserRoute.update);


router.get('/contacts', userExistMidleware, ContactRoute.getAll);
router.get('/contact/:id', userExistMidleware, ContactRoute.getContact);
router.post('/contact', userExistMidleware, ContactRoute.Create);
router.delete('/contact/:id', userExistMidleware, ContactRoute.Delete);
router.put('/contact', userExistMidleware, ContactRoute.Update);



async function  userExistMidleware(req: express.Request, res: express.Response, next: any){
   var tokenId = Utility.getBearerToken(req);
   if(!tokenId) return res.status(401).send("Unauthorized");
   if(await UserDAO.intance.tokenExist({id: tokenId}))  return next();
   return res.status(401).send("Unauthorized");
}



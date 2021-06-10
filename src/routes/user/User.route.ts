import * as express from 'express';
import { ContactDAO } from '../../services/DAO/contact.dao';
import { UserDAO } from '../../services/DAO/user.dao';

export class UserRoute {
     public static async Authenticate(req: express.Request, res: express.Response,) {
          try {
               var user = await UserDAO.intance.get({
                    name : req.query.name!.toString(),
                    password: req.query.password?.toString()
               });
               if(!user) return res.status(404).send("User not exist");
               return res.json(user);
          } catch (error) {
               return res.status(403).send("Forbidden")
          }
     }
     public static async Create(req: express.Request, res: express.Response,) {
          try {
               await UserDAO.intance.add({
                    name: req.body.name!.toString(),
                    password: req.body.password?.toString()
               });
               var user = await UserDAO.intance.get({
                    name : req.body.name!.toString(),
                    password: req.body.password?.toString()
               });
               return res.json(user);
          } catch (error) {
               return res.status(403).send("Forbidden")
          }
     }
}
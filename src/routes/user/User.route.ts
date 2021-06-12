import * as express from 'express';
import { ContactDAO } from '../../services/DAO/contact.dao';
import { UserDAO } from '../../services/DAO/user.dao';
import { Utility } from '../../utils/utils';

export class UserRoute {
     public static async Authenticate(req: express.Request, res: express.Response,) {
          try {
               var user = await UserDAO.intance.get({
                    name : req.query.name!.toString(),
                    password: req.query.password?.toString()
               });
               if(!user) return res.status(404).send("User not exist");
               return res.json({
                    name : user.name,
                    id: user.id,
                    contacts: user.contacts,
                    token: user.id
               });
          } catch (error) {
               return res.status(400).send("Bad request")
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
               return res.status(400).send("Bad request")
          }
     }
     public static async update(req: express.Request, res: express.Response,) {
          try {
               await UserDAO.intance.update({
                    id: Utility.getBearerToken(req),
                    name: req.body.name!.toString(),
                    password: req.body.password?.toString()
               });
               return res.json(true);
          } catch (error) {
               return res.status(403).send("Forbidden")
          }
     }
}
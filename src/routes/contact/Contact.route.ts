import * as express from 'express';
import { ContactDAO } from '../../services/DAO/contact.dao';
import { UserDAO } from '../../services/DAO/user.dao';
import { Utility } from '../../utils/utils';

export class ContactRoute {
    public static async getAll(req: express.Request, res: express.Response,) {
        var tokenId = Utility.getBearerToken(req);
        var contacts = await ContactDAO.intance.getUserContacts({id: tokenId});
        return res.json(contacts);
    }
    public static async getContact(req: express.Request, res: express.Response,) {
        var tokenId = Utility.getBearerToken(req);
        var contact = await ContactDAO.intance.getUserContact({id: req.params.id, userId: tokenId});
        return contact == null ? res.status(404).send("No item found") : res.json(contact);
    }
    public static async Create(req: express.Request, res: express.Response,) {
        var tokenId = Utility.getBearerToken(req);
        var contact = await ContactDAO.intance.addContact(
            {id: tokenId}, 
            req.body as ContactModel
        );
        if(contact == null) return res.status(403).send("Forbidden")
        var data = (await contact.get());
        return !contact?.id ? res.status(403).send("Forbidden") : res.json(
            {
                id: data.id,
                userId: tokenId,
                ...data.data()
            } as ContactModel);
    }
    public static async update(req: express.Request, res: express.Response,) {
        var tokenId = Utility.getBearerToken(req);
        var contact = await ContactDAO.intance.updateOneContact(
            {id: tokenId}, 
            req.body as ContactModel
        );
        if(contact == null) return res.status(403).send("Forbidden");
        return res.json(true);
    }
    public static async delete(req: express.Request, res: express.Response,) {
        var tokenId = Utility.getBearerToken(req);
        var contact = await ContactDAO.intance.deleteOneContact(
            {id: tokenId}, 
            req.body as ContactModel
        );
        if(contact == null) return res.status(403).send("Forbidden");
        return res.json(true);
    }
}

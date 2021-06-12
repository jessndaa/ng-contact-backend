import * as express from 'express';
import { ContactDAO } from '../../services/DAO/contact.dao';
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
        const {name,
            prename,
            phone,
            email,
            position,
            society,
            societyAdress} = req.body;
        if(name == null ||
            prename == null ||
            phone == null ||
            email == null ||
            position == null ||
            society == null ||
            societyAdress == null) return res.status(400).send("Bad Request");
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
    public static async Update(req: express.Request, res: express.Response,) {
        try {
            var tokenId = Utility.getBearerToken(req);
            var contact = await ContactDAO.intance.updateOneContact(
                {id: tokenId}, 
                req.body as ContactModel
            );
            if(contact == null) return res.status(403).send("Forbidden");
            return res.json(true);
        } catch (error) {
            return res.status(403).send("Forbidden");
        }
    }
    public static async Delete(req: express.Request, res: express.Response,) {
        try {
            var tokenId = Utility.getBearerToken(req);
            var contact = await ContactDAO.intance.deleteOneContact(
                {id: tokenId}, 
                req.params as ContactModel
            );
            if(contact == null) return res.status(403).send("Forbidden");
            return res.json(true);
        } catch (error) {
            return res.status(403).send("Forbidden");
        }
    }
}

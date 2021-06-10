import { FirestoreService } from "./firestore.service";
import { UserModel } from '../../models/user.model';
import { ContactDAO } from "./contact.dao";

export class UserDAO {
    private _COLLECTION_NAME = "user";
    private static _instance: UserDAO | undefined;
    static get intance(): UserDAO{
        if (!this._instance) {
             this._instance = new UserDAO();
        }
        return this._instance;
    }
    async tokenExist(data: UserModel): Promise<boolean>{
        var res = await FirestoreService.instance?.collection(this._COLLECTION_NAME)
            .doc(data.id!).get();
        return res?.exists ?? false;
    }
    async get(data: UserModel){
       var dataDoc = await FirestoreService.instance?.collection(this._COLLECTION_NAME)
            .where('name', "==", data.name)
                .where('password', "==", data.password)
                    .get();
        if(dataDoc?.empty) return;
        var user ={
            id: dataDoc?.docs[0].id,
            ...dataDoc?.docs[0].data()
        } as UserModel;
        var contacts = await ContactDAO.intance.getUserContacts(user);
        user!.contacts = contacts;
        return user;
    }
    add(data: UserModel){
        return FirestoreService.instance
                    ?.collection(this._COLLECTION_NAME)
                        .add(data);
    }
}
import { FirestoreService } from "./firestore.service";
import { UserModel } from '../../models/user.model';

export class ContactDAO {
     private _COLLECTION_NAME = "contacts";
     private static _instance: ContactDAO | undefined;
     static get intance(): ContactDAO{
          if (!this._instance) {
               this._instance = new ContactDAO();
          }
          return this._instance;
     }
     async getUserContacts(data: UserModel) {
          var dataDocs = await FirestoreService.instance?.collection("user")
          .doc(data.id!.trim())
          .collection(this._COLLECTION_NAME).get();
          var contacts: Array<ContactModel> = [];
          dataDocs?.forEach((e)=>contacts.push({
               ...e.data(),
               id: e.id,
               userId: data.id,
          } as ContactModel));
          return contacts;
     }
     async getUserContact(data: ContactModel) {
          var dataDoc = await FirestoreService.instance?.collection("user")
          .doc(data.userId!)
          .collection(this._COLLECTION_NAME)
          .doc(data.id!).get();
          if(!dataDoc?.exists) return;
          return {
               ...dataDoc.data(),
               id: dataDoc.id,
               userId: data.userId,
          } as ContactModel;
     }
     addContact(user: UserModel, data: ContactModel){
          const {name, prename, phone, email, position, society, societyAdress} = data;
          return FirestoreService.instance?.collection("user")
               .doc(user.id!)
                    .collection(this._COLLECTION_NAME)
                         .add({name, prename, phone, email, position, society, societyAdress});
     }
     deleteOneContact(user: UserModel, data: ContactModel){
          return FirestoreService.instance?.collection("user")
               .doc(user.id!)
                    .collection(this._COLLECTION_NAME)
                         .doc(data.id!)
                         .delete();
     }
     updateOneContact(user: UserModel, data: ContactModel){
          const {name, prename, phone, email, position, society, societyAdress} = data;
          return FirestoreService.instance?.collection("user")
               .doc(user.id!)
                    .collection(this._COLLECTION_NAME)
                         .doc(data.id!)
                         .update({name, prename, phone, email, position, society, societyAdress});
     }
}
import * as admin from 'firebase-admin'
import { environement } from '../../config/environement';
import { Environement } from '../../models/enums/Environement';
import * as serviceAccount from '../../config/firebase-config.json';



export class FirestoreService {
    
    private static _instance: admin.firestore.Firestore | undefined;
    static get  instance(): admin.firestore.Firestore | undefined{
        if (!this._instance) {
            const params = {
                type: serviceAccount.type,
                projectId: serviceAccount.project_id,
                privateKeyId: serviceAccount.private_key_id,
                privateKey: serviceAccount.private_key,
                clientEmail: serviceAccount.client_email,
                clientId: serviceAccount.client_id,
                authUri: serviceAccount.auth_uri,
                tokenUri: serviceAccount.token_uri,
                authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
                clientC509CertUrl: serviceAccount.client_x509_cert_url
            }
            admin.initializeApp({
                credential: environement == Environement.PRODUCTION ?  
                    admin.credential.cert(params) :
                    admin.credential.cert(params),
                databaseURL: "https://test-technica.firebaseio.com"
            }); 
            this._instance = admin.firestore();
        }
        return this._instance;
    }
}
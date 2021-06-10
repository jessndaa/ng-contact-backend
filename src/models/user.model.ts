export interface UserModel{
    id?: string;
    name?: string;
    password?: string;
    contacts?: Array<ContactModel>;
}
export interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: {
        cep: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
    }    
}
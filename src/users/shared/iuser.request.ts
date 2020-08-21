export interface IUserRequest {
    name: string;
    email: string;
    password: string;
    address: {
        cep: string;
        stret: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
    }    
}
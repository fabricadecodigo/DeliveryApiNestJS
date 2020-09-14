export interface IUpdateUserRequest {
    name: string;
    email: string;
    phone: string;
    address: {
        cep: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
    }
}
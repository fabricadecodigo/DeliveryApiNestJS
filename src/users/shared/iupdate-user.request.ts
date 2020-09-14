export interface IUpdateUserRequest {
    name: string;
    phone: string;
    address: {
        cep: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
    }
}
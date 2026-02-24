import { apiRequest } from "./client";

export interface ContactRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

export const contactService = {
    async sendRequest(data: ContactRequest): Promise<any> {
        return apiRequest("/contacts", {
            method: "POST",
            body: data,
        });
    }
};

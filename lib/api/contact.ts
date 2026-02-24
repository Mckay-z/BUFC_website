import { apiRequest } from "./client";

export interface ContactRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

export const contactService = {
    async sendRequest(data: ContactRequest): Promise<{ success: boolean; message: string }> {
        return apiRequest<{ success: boolean; message: string }>("/contacts", {
            method: "POST",
            body: data,
        });
    }
};

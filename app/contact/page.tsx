import { client } from "@/lib/sanity.client";
import {
  contactUsSettingsQuery
} from "@/lib/sanity.queries";
import { ContactUsSettings } from "@/lib/types";

export default async function Contact() {
    const [contactUsSettings] =
      await Promise.all([
        client.fetch<ContactUsSettings>(contactUsSettingsQuery),
      ]);

   
    return (
      <main>
      </main>
    );
}

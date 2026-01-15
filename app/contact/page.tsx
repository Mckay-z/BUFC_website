import { client } from "@/lib/sanity.client";
import { contactUsSettingsQuery } from "@/lib/sanity.queries";
import { ContactUsSettings } from "@/lib/types";
import ContactPage from "@/components/pages/contactPage";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Contact() {
  const [contactUsSettings] = await Promise.all([
    client.fetch<ContactUsSettings>(contactUsSettingsQuery),
  ]);

  return <ContactPage contactUsSettings={contactUsSettings} />;
}

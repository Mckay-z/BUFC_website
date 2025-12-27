"use client";

import { ContactUsSettings } from "@/lib/types";

interface ContactPageProps {
  contactUsSettings: ContactUsSettings;
}

export default function ContactPage({ contactUsSettings }: ContactPageProps) {
  // Use first featured article if hero news is not available

  return <main>Contact Us</main>;
}

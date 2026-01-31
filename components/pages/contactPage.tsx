"use client";

import { ContactUsSettings } from "@/lib/types";
import SectionHeader from "@/components/layout/SectionHeader";
import PageHeader from "../layout/PageHeader";
import { CgPhone } from "react-icons/cg";
import { RiMailFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";

interface ContactPageProps {
  contactUsSettings: ContactUsSettings;
}

export default function ContactPage({ contactUsSettings }: ContactPageProps) {
  return (
    <main>
      {/* Page Header */}
      <PageHeader
        title={contactUsSettings.pageTitle}
        backgroundImage={contactUsSettings.pageBannerImage}
      />

      {/* Contact Info + Form Section */}
      <section className="bg-[#F4F3F7] py-20">
        <div className="container-wide">
          <div className="bg-white rounded-2xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">
            {/* LEFT – CONTACT INFO */}
            <div className="relative bg-[#3E2B78] rounded-xl text-white p-8 overflow-hidden">
              <h3 className="text-2xl font-semibold mb-3">
                {contactUsSettings.contactFormTitle}Contact Information
              </h3>

              <p className="text-sm text-white/80 max-w-sm mb-10 leading-relaxed">
                {contactUsSettings.contactFormSubtext}Have questions or
                feedback? Reach out to us to learn more about Bechem United FC,
                stay updated on the latest news,
              </p>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10  flex items-center justify-center">
                    <CgPhone />
                  </span>
                  <span className="text-sm font-medium">
                    {contactUsSettings.phoneNumber}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center">
                    <RiMailFill />
                  </span>
                  <span className="text-sm font-medium">
                    {contactUsSettings.emailAddress}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 ml-2 mr-2 flex items-center justify-center mt-1">
                    <FaLocationDot />

                  </span>
                  <span className="text-sm font-medium leading-relaxed">
                    {contactUsSettings.locationAddress}
                  </span>
                </div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-[#7B35C8]" />
              <div className="absolute bottom-24 right-8 w-32 h-32 rounded-full bg-white/30" />
            </div>

            {/* RIGHT – FORM */}
            <div className="flex flex-col justify-center px-2 md:px-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {[
                  ["First Name", "text"],
                  ["Last Name", "text"],
                  ["Email", "email"],
                  ["Phone Number", "tel"],
                ].map(([label, type]) => (
                  <div key={label} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-neutral-700">
                      {label}
                    </label>
                    <input
                      type={type}
                      className="border-b border-neutral-300 focus:border-[#3E2B78] outline-none py-1 text-sm"
                    />
                  </div>
                ))}

                <div className="md:col-span-2 flex flex-col gap-2 mt-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your message.."
                    className="border-b border-neutral-300 focus:border-[#3E2B78] outline-none py-2 text-sm resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-[#3E2B78] text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container-wide py-16 md:py-28">
        <div className="flex flex-col gap-10">
          <SectionHeader
            title={contactUsSettings.mapSectionTitle}
            subtext={contactUsSettings.mapSectionSubtext}
          />

          <div className="h-[400px] rounded-[20px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.050481039635!2d-0.21232532552409208!3d5.559536633615201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf91869426aeff%3A0x7569175b8a05a693!2sBechem%20house!5e0!3m2!1sen!2sgh!4v1767405931761!5m2!1sen!2sgh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { NewsletterSettings } from "@/lib/types";
import { useState } from "react";
import Button from "../ui/Button";
import { Icon } from "@iconify/react";

interface NewsletterProps {
  settings: NewsletterSettings;
}

export default function Newsletter({ settings }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Implement newsletter signup logic
    // For now, just simulate a submission
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-9 via-neutral-10 to-neutral-11" />

      {/* Content */}
      <div className="relative container-wide">
        <div className="max-w-2xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-neutral-1 text-2xl xs:text-3xl md:text-4xl font-bold mb-4">
            {settings.sectionTitle}
          </h2>

          {/* Subtext */}
          <p className="text-neutral-4 text-sm md:text-base mb-8">
            {settings.sectionSubtext}
          </p>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col xs:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={settings.inputPlaceholder}
                required
                disabled={status === "loading" || status === "success"}
                className="w-full px-5 py-3 rounded-full bg-neutral-1/10 border border-neutral-1/20 text-neutral-1 placeholder:text-neutral-5 focus:outline-none focus:border-primary focus:bg-neutral-1/15 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status === "loading" || status === "success"}
              buttonClassName="!px-8 whitespace-nowrap"
            >
              {status === "loading" && (
                <Icon
                  icon="eos-icons:loading"
                  className="w-5 h-5 animate-spin"
                />
              )}
              {status === "success" && (
                <Icon icon="mdi:check-circle" className="w-5 h-5" />
              )}
              {status === "idle" && settings.buttonText}
              {status === "error" && "Try Again"}
            </Button>
          </form>

          {/* Success Message */}
          {status === "success" && (
            <p className="text-prim-4 text-sm mt-4 animate-fade-in">
              Successfully subscribed! Check your inbox.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

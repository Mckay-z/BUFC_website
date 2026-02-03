"use client";

import AuthContent from "@/components/auth/AuthContent";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-neutral-0 flex items-center justify-center p-6 pt-32 pb-20">
            <div className="w-full max-w-[1000px]">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-5 hover:text-[#3F2A78] mb-8 transition-colors font-medium"
                >
                    <Icon icon="ph:arrow-left" />
                    <span>Back to Home</span>
                </Link>

                <AuthContent initialState="signup" />
            </div>
        </div>
    );
}

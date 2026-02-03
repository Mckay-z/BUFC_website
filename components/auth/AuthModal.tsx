"use client";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useUI } from "@/context/UIContext";
import AuthContent from "./AuthContent";

export default function AuthModal() {
    const { isAuthModalOpen, closeAuthModal, authMode } = useUI();

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAuthModal();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeAuthModal]);

    if (!isAuthModalOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Container */}
            <div className="relative w-full max-w-[1366px] h-fit max-h-[95vh] lg:h-[811px] animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={closeAuthModal}
                    className="absolute top-8 right-8 z-60 p-2.5 text-white md:text-[#1A1A1A] hover:opacity-80 transition-all bg-black/20 md:bg-white/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
                    aria-label="Close modal"
                >
                    <Icon icon="mdi:close" className="w-6 h-6" />
                </button>

                <AuthContent initialState={authMode} onSuccess={closeAuthModal} />
            </div>
        </div>
    );
}

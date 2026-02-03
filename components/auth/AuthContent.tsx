"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import NextImage from "next/image";

interface AuthContentProps {
    initialState?: "signin" | "signup";
    onSuccess?: () => void;
}

export default function AuthContent({ initialState = "signin", onSuccess }: AuthContentProps) {
    const [isSignIn, setIsSignIn] = useState(initialState === "signin");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden shadow-2xl">
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto scrollbar-hide">
                <div className="max-w-[420px] w-full mx-auto">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3 mb-6">
                        <NextImage
                            src="/img/bufc_logo.png"
                            alt="BUFC Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                        <span className="font-montserrat font-bold text-[18px] tracking-tight text-[#1A1A1A]">BUFC</span>
                    </div>

                    <h2 className="text-[36px] font-bold text-[#1A1A1A] mb-1 leading-tight">
                        {isSignIn ? "Sign in" : "Sign up"}
                    </h2>
                    <p className="text-[15px] text-[#666666] mb-6">
                        {isSignIn
                            ? "Please login in to continue to your account"
                            : "Create an account to join the Hunters family"}
                    </p>

                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        if (onSuccess) onSuccess();
                    }}>
                        {/* Name Field (Sign Up Only) */}
                        {!isSignIn && (
                            <div className="relative group">
                                <div className="absolute -top-2.5 left-4 px-1 bg-white text-[11px] font-medium text-[#3F2A78] z-10 transition-all">Name</div>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-3 rounded-xl border border-[#3F2A78] focus:border-[#3F2A78] outline-none transition-all placeholder:text-neutral-3 text-[#1A1A1A]"
                                    required
                                />
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="relative group">
                            <div className="absolute -top-2.5 left-4 px-1 bg-white text-[11px] font-medium text-[#3F2A78] z-10 transition-all">Email</div>
                            <input
                                type="email"
                                placeholder="jonas_kahnwald@gmail.com"
                                className="w-full px-5 py-3 rounded-xl border border-[#3F2A78] focus:border-[#3F2A78] outline-none transition-all placeholder:text-neutral-3 text-[#1A1A1A]"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-5 py-3 rounded-xl border border-neutral-2 focus:border-[#3F2A78] outline-none transition-all placeholder:text-neutral-3 text-[#1A1A1A]"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-4"
                            >
                                <Icon icon={showPassword ? "ph:eye-slash-light" : "ph:eye-light"} className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Remember Me / Forgot Password */}
                        <div className="flex items-center justify-between py-0.5">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-neutral-3 text-[#3F2A78] focus:ring-[#3F2A78]" />
                                <span className="text-[13px] text-[#1A1A1A] font-medium">Keep me logged in</span>
                            </label>
                            {isSignIn && (
                                <button type="button" className="text-[13px] font-semibold text-[#3F2A78] hover:underline">Forgot password?</button>
                            )}
                        </div>

                        {/* Action Button */}
                        <button type="submit" className="w-full bg-[#3F2A78] hover:bg-[#2A165F] text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-purple-900/10 active:scale-[0.98]">
                            {isSignIn ? "Sign in" : "Sign up"}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-1"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-3 bg-white text-neutral-4 text-[13px]">or</span></div>
                    </div>

                    {/* Google Login */}
                    <button className="w-full bg-white border border-neutral-2 hover:bg-neutral-0 text-[#1A1A1A] font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3">
                        <Icon icon="logos:google-icon" className="w-5 h-5" />
                        <span className="text-[14px]">Continue with Google</span>
                    </button>

                    {/* Switch Mode */}
                    <p className="mt-6 text-center text-[#666666] text-[13.5px]">
                        {isSignIn ? "Need an account??" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsSignIn(!isSignIn)}
                            className="text-[#3F2A78] font-bold hover:underline"
                        >
                            {isSignIn ? "Create one" : "Sign in here"}
                        </button>
                    </p>
                </div>
            </div>

            {/* Right Side: Decorative Image */}
            <div className="hidden md:block w-1/2 relative">
                <NextImage
                    src="/img/auth_modal_bg.png"
                    alt="Decorative Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-white/5" />
            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectTitle: string;
    initialMode?: "volunteer" | "donate";
}

type Mode = "volunteer" | "donate";

const DONATION_AMOUNTS = [50, 100, 200, 500, 1000];

export default function PaymentModal({
    isOpen,
    onClose,
    projectTitle,
    initialMode = "volunteer",
}: PaymentModalProps) {
    const [mode, setMode] = useState<Mode>(initialMode);
    const [step, setStep] = useState<"form" | "success">("form");
    const [loading, setLoading] = useState(false);
    const [customAmount, setCustomAmount] = useState("");
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        skills: "",
        message: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep("success");
        }, 1500);
    };

    const resetModal = () => {
        setStep("form");
        setMode(initialMode);
        setFormData({
            name: "",
            email: "",
            phone: "",
            skills: "",
            message: "",
        });
        setSelectedAmount(null);
        setCustomAmount("");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetModal}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="bg-[#3F2A78] p-6 text-white text-center relative shrink-0">
                                <button
                                    onClick={resetModal}
                                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                                >
                                    <Icon icon="ph:x-bold" className="w-6 h-6" />
                                </button>
                                <h3 className="font-mona-sans font-bold text-xl md:text-2xl mb-1">
                                    {step === "success"
                                        ? "Thank You!"
                                        : mode === "volunteer"
                                            ? "Volunteer Registration"
                                            : "Make a Donation"}
                                </h3>
                                <p className="text-white/80 text-sm font-montserrat line-clamp-1">
                                    {projectTitle}
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                {step === "success" ? (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                            <Icon icon="ph:check-circle-fill" className="w-12 h-12" />
                                        </div>
                                        <h4 className="font-mona-sans font-bold text-2xl text-neutral-900 mb-2">
                                            {mode === "volunteer" ? "Registration Successful" : "Donation Received"}
                                        </h4>
                                        <p className="text-neutral-600 mb-8 font-montserrat">
                                            {mode === "volunteer"
                                                ? "Thank you for volunteering! We have sent a confirmation email with further details."
                                                : "Thank you for your generous text-neutral-600. Your support makes a huge difference."}
                                        </p>
                                        <Button onClick={resetModal} fullWidth>
                                            Close
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Mode Switcher */}
                                        <div className="flex bg-neutral-100 p-1 rounded-full mb-8">
                                            <button
                                                onClick={() => setMode("volunteer")}
                                                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${mode === "volunteer"
                                                        ? "bg-white text-[#3F2A78] shadow-sm"
                                                        : "text-neutral-500 hover:text-neutral-700"
                                                    }`}
                                            >
                                                Volunteer
                                            </button>
                                            <button
                                                onClick={() => setMode("donate")}
                                                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${mode === "donate"
                                                        ? "bg-white text-[#3F2A78] shadow-sm"
                                                        : "text-neutral-500 hover:text-neutral-700"
                                                    }`}
                                            >
                                                Donate
                                            </button>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {mode === "volunteer" ? (
                                                <>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input
                                                            label="Name"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            placeholder="Full Name"
                                                            required
                                                        />
                                                        <Input
                                                            label="Phone"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            placeholder="Phone Number"
                                                            required
                                                        />
                                                    </div>
                                                    <Input
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="email@example.com"
                                                        required
                                                    />
                                                    <Input
                                                        label="Skills / Interests"
                                                        name="skills"
                                                        value={formData.skills}
                                                        onChange={handleInputChange}
                                                        placeholder="e.g. Teaching, medical, organizing..."
                                                    />
                                                    <Textarea
                                                        label="Message (Optional)"
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        placeholder="Tell us why you want to join..."
                                                        rows={3}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-bold text-neutral-700 mb-2">Select Amount (GHS)</label>
                                                        <div className="grid grid-cols-3 gap-2 mb-3">
                                                            {DONATION_AMOUNTS.map(amount => (
                                                                <button
                                                                    key={amount}
                                                                    type="button"
                                                                    onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                                                                    className={`py-2 px-3 rounded-xl text-sm font-bold border transition-all ${selectedAmount === amount
                                                                            ? "bg-[#3F2A78] text-white border-[#3F2A78]"
                                                                            : "bg-white text-neutral-600 border-neutral-200 hover:border-[#3F2A78]"
                                                                        }`}
                                                                >
                                                                    {amount}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <div className="relative">
                                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">GHS</span>
                                                            <input
                                                                type="number"
                                                                placeholder="Custom Amount"
                                                                value={customAmount}
                                                                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                                                className="w-full pl-14 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-[#3F2A78] outline-none transition-all placeholder:text-neutral-400 font-bold text-neutral-900"
                                                            />
                                                        </div>
                                                    </div>

                                                    <Input
                                                        label="Full Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Name on card/momo"
                                                        required
                                                    />
                                                    <Input
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="Receipt will be sent here"
                                                        required
                                                    />

                                                    <div className="pt-2">
                                                        <label className="block text-sm font-bold text-neutral-700 mb-2">Payment Method</label>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="border border-neutral-200 p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:border-primary-500 bg-neutral-50">
                                                                <Icon icon="ph:credit-card-duotone" className="w-5 h-5 text-neutral-600" />
                                                                <span className="text-sm font-bold text-neutral-700">Card</span>
                                                            </div>
                                                            <div className="border border-neutral-200 p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:border-primary-500 bg-neutral-50">
                                                                <Icon icon="ph:device-mobile-camera-duotone" className="w-5 h-5 text-neutral-600" />
                                                                <span className="text-sm font-bold text-neutral-700">Mobile Money</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            <div className="pt-4">
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    loading={loading}
                                                    buttonClassName="py-4 text-lg bg-[#3F2A78] hover:bg-[#2A165F]"
                                                >
                                                    {mode === "volunteer" ? "Submit Registration" : "Proceed to Pay"}
                                                </Button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

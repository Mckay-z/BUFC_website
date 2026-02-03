"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import Image from "next/image";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0F0A1E]">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
            </div>

            <div className="container-wide relative z-10 flex flex-col items-center text-center px-6">
                {/* Animated Icon Container */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full" />
                    <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl">
                        <FiAlertTriangle className="w-20 h-20 text-primary" />
                    </div>

                    {/* Animated Sparks */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 bg-primary w-4 h-4 rounded-full"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        PAGE UNDER <span className="text-primary italic">CONSTRUCTION</span>
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-mona-sans">
                        The Hunters are currently training in this area or building something special.
                        Please head back to the main pitch for now!
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all duration-300"
                    >
                        <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go to Previous Page
                    </button>

                    <Link
                        href="/"
                        className="px-8 py-4 bg-primary hover:bg-prim-4 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Return Home pitch
                    </Link>
                </motion.div>

                {/* Progress Bar Mockup */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="mt-20 w-full max-w-md h-1.5 bg-white/5 rounded-full overflow-hidden"
                >
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-1/3 h-full bg-linear-to-r from-transparent via-primary to-transparent"
                    />
                </motion.div>
                <p className="mt-4 text-white/20 text-xs font-bold tracking-widest uppercase">
                    Building Bechem United Together
                </p>
            </div>

            {/* Floating Logo */}
            <div className="absolute bottom-10 left-10 opacity-10 hidden lg:block">
                <Image src="/img/bufc_logo.png" alt="BUFC" width={100} height={100} className="grayscale invert" />
            </div>
        </main>
    );
}

"use client";

import React, { useState } from "react";

import { Icon } from "@iconify/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const MATCH_HISTORY = [
    {
        id: 1,
        date: "2025-10-15",
        opponent: "Asante Kotoko",
        result: "Win",
        score: "2 - 1",
        attendance: "Full House",
        streak: 3,
    },
    {
        id: 2,
        date: "2025-10-08",
        opponent: "Hearts of Oak",
        result: "Draw",
        score: "1 - 1",
        attendance: "High",
        streak: 2,
    },
    {
        id: 3,
        date: "2025-10-01",
        opponent: "Medeama SC",
        result: "Win",
        score: "3 - 0",
        attendance: "Moderate",
        streak: 1,
    },
];

const SEASON_TICKET = {
    season: "2025/2026",
    seat: "Section A, Row 5, Seat 12",
    type: "Gold Member",
    status: "Active",
    renewalDate: "2026-08-01",
    qrCode: "/img/qr-placeholder.png", // Mock
};

const TABS = [
    { id: "activity", label: "Activity Feed", icon: "ph:activity-duotone" },
    { id: "matches", label: "Match History", icon: "ph:soccer-ball-duotone" },
    { id: "tickets", label: "Season Tickets", icon: "ph:ticket-duotone" },
    { id: "settings", label: "Settings", icon: "ph:gear-duotone" },
];

export default function CommunityDashboard() {
    const [activeTab, setActiveTab] = useState("activity");
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle

    const renderContent = () => {
        switch (activeTab) {
            case "activity":
                return <ActivityTab />;
            case "matches":
                return <MatchHistoryTab />;
            case "tickets":
                return <SeasonTicketsTab />;
            case "settings":
                return <SettingsTab />;
            default:
                return <ActivityTab />;
        }
    };

    return (
        <div className="bg-neutral-1 min-h-screen pb-20">
            {/* Page Header */}
            <PageHeader
                title="My Dashboard"
                subtitle="Manage your community profile, match history, and season tickets."
                variant="standard"
            />

            <div className="container-wide py-12 md:py-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className={`lg:w-72 shrink-0 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 fixed inset-y-0 left-0 z-50 bg-white shadow-xl p-4 w-72' : 'hidden lg:block'}`}>
                        <Card variant="default" padding="none" cardClassName="sticky top-24 overflow-hidden">
                            {/* User Profile Summary */}
                            <div className="p-8 bg-primary text-white text-center">
                                <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center border-2 border-white/30 relative">
                                    <Icon icon="ph:user-duotone" className="w-12 h-12" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-primary" />
                                </div>
                                <h3 className="font-mona-sans font-bold text-xl mb-1">Kwame Mensah</h3>
                                <p className="text-white/70 text-xs uppercase tracking-wider font-bold">Super Fan • Member since 2023</p>
                            </div>

                            {/* Nav Links */}
                            <nav className="p-4 space-y-1">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'text-neutral-6 hover:bg-neutral-2 hover:text-neutral-9'
                                            }`}
                                    >
                                        <Icon icon={tab.icon} className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary' : 'text-neutral-4'}`} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            <div className="p-4 border-t border-neutral-3">
                                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all">
                                    <Icon icon="ph:sign-out-duotone" className="w-5 h-5" />
                                    Log Out
                                </button>
                            </div>
                        </Card>

                        {/* Mobile Sidebar Overlay */}
                        {sidebarOpen && (
                            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                        )}
                    </aside>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-neutral-3 w-full mb-4">
                        <span className="font-bold text-lg text-neutral-9 capitalize">{TABS.find(t => t.id === activeTab)?.label}</span>
                        <button onClick={() => setSidebarOpen(true)} className="p-2 bg-neutral-2 rounded-lg text-neutral-6">
                            <Icon icon="ph:list-bold" className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <main className="flex-1 w-full max-w-5xl mx-auto">
                        <Card variant="default" padding="lg" cardClassName="min-h-[600px] border-neutral-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {renderContent()}
                                </motion.div>
                            </AnimatePresence>
                        </Card>
                    </main>

                    {/* Right Sidebar (Desktop only) */}
                    <aside className="hidden xl:block w-80 shrink-0 space-y-6">
                        {/* Social Connections */}
                        <Card variant="default" padding="md">
                            <SectionHeader title="Connections" uppercase className="mb-6 text-sm" />
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-3 border-b border-neutral-2 pb-3 last:border-0 last:pb-0">
                                        <div className="w-10 h-10 rounded-full bg-neutral-2 border border-neutral-3" />
                                        <div className="flex-1">
                                            <div className="font-bold text-sm text-neutral-9">Fan Member {i}</div>
                                            <div className="text-xs text-neutral-5">2 mutual friends</div>
                                        </div>
                                        <button className="text-primary text-xs font-bold hover:underline bg-primary/5 px-2 py-1 rounded">Connect</button>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Trending Topics */}
                        <Card variant="default" padding="md">
                            <SectionHeader title="Trending Topics" uppercase className="mb-6 text-sm" />
                            <div className="space-y-3">
                                {['#HuntersVictory', '#NewSigning', '#CommunityDay'].map(tag => (
                                    <div key={tag} className="flex justify-between items-center text-sm p-2 hover:bg-neutral-2 rounded-lg transition-colors cursor-pointer group">
                                        <span className="font-bold text-neutral-7 group-hover:text-primary">{tag}</span>
                                        <span className="text-xs text-neutral-4">2.1k</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}

// --- Tabs Components ---

function ActivityTab() {
    return (
        <div className="space-y-8">
            <SectionHeader title="Activity Feed" showLine uppercase />

            <div className="bg-neutral-2 border border-neutral-3 rounded-2xl p-6 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-3 shrink-0" />
                <div className="flex-1">
                    <Input placeholder="Share your thoughts with the community..." className="w-full bg-white mb-3" />
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <button className="p-2 text-neutral-5 hover:bg-neutral-3 rounded-full transition-colors"><Icon icon="ph:image" className="w-5 h-5" /></button>
                            <button className="p-2 text-neutral-5 hover:bg-neutral-3 rounded-full transition-colors"><Icon icon="ph:gif" className="w-5 h-5" /></button>
                        </div>
                        <Button size="sm">Post Update</Button>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-neutral-2 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-3" />
                                <div>
                                    <div className="font-bold text-sm text-neutral-9">Kojo Boateng</div>
                                    <div className="text-xs text-neutral-5 font-bold uppercase tracking-wider">2 hours ago</div>
                                </div>
                            </div>
                            <button className="text-neutral-4 hover:text-neutral-6"><Icon icon="ph:dots-three" className="w-6 h-6" /></button>
                        </div>
                        <p className="text-neutral-7 mb-4 leading-relaxed text-sm md:text-base">
                            What a match yesterday! The team showed great spirit in the second half. Can&apos;t wait for the next home game. 🔴⚪️ #BechemUnited
                        </p>
                        <div className="flex gap-6 text-neutral-5 text-sm font-bold">
                            <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><Icon icon="ph:heart" className="w-5 h-5" /> 24</button>
                            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors"><Icon icon="ph:chat-circle" className="w-5 h-5" /> 5</button>
                            <button className="flex items-center gap-2 hover:text-green-500 transition-colors"><Icon icon="ph:share-fat" className="w-5 h-5" /> Share</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MatchHistoryTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <SectionHeader title="Match History" showLine uppercase />
                <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200 shadow-sm">
                    Active Streak: 3 Matches 🔥
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-3">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="bg-neutral-2 border-b border-neutral-3 text-left text-xs font-bold text-neutral-5 uppercase tracking-wider">
                                <th className="py-4 px-6">Date</th>
                                <th className="py-4 px-6">Opponent</th>
                                <th className="py-4 px-6">Score</th>
                                <th className="py-4 px-6">Attendance</th>
                                <th className="py-4 px-6">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MATCH_HISTORY.map(match => (
                                <tr key={match.id} className="border-b border-neutral-3 hover:bg-neutral-1 transition-colors last:border-0">
                                    <td className="py-4 px-6 text-neutral-7 text-sm font-medium">{match.date}</td>
                                    <td className="py-4 px-6 font-bold text-neutral-9">{match.opponent}</td>
                                    <td className="py-4 px-6 text-neutral-9 font-bold font-mono text-lg">{match.score}</td>
                                    <td className="py-4 px-6 text-neutral-6 text-sm">
                                        <span className="inline-flex items-center gap-1">
                                            <Icon icon="ph:users" className="text-neutral-4" /> {match.attendance}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${match.result === "Win" ? "bg-green-100 text-green-700 border border-green-200" :
                                            match.result === "Draw" ? "bg-neutral-2 text-neutral-6 border border-neutral-3" : "bg-red-100 text-red-700 border border-red-200"
                                            }`}>
                                            {match.result}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function SeasonTicketsTab() {
    return (
        <div>
            <SectionHeader title="Season Tickets" showLine uppercase className="mb-8" />

            <div className="bg-linear-to-br from-[#3F2A78] to-[#25184b] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden max-w-2xl mx-auto border-t border-white/10">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                        <div className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Season</div>
                        <div className="text-4xl md:text-5xl font-black font-mona-sans">{SEASON_TICKET.season}</div>
                    </div>
                    <div className="bg-green-500/20 text-green-400 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase border border-green-500/30">
                        {SEASON_TICKET.status}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-10 relative z-10">
                    <div>
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Type</div>
                        <div className="text-xl font-bold">{SEASON_TICKET.type}</div>
                    </div>
                    <div>
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Seat Location</div>
                        <div className="text-xl font-bold">{SEASON_TICKET.seat}</div>
                    </div>
                </div>

                <div className="flex items-end justify-between relative z-10 pt-8 border-t border-white/10">
                    <div>
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Renewal Date</div>
                        <div className="text-base font-bold font-mono">{SEASON_TICKET.renewalDate}</div>
                    </div>
                    <div className="w-20 h-20 bg-white rounded-xl p-2 shadow-lg">
                        <div className="w-full h-full bg-neutral-900 border-2 border-dashed border-white/50" /> {/* Placeholder QR */}
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center">
                <Button size="lg" buttonClassName="shadow-lg">Renew Season Ticket</Button>
                <p className="text-xs text-neutral-5 uppercase font-bold tracking-wide mt-4">Early bird renewal ends soon.</p>
            </div>
        </div>
    );
}

function SettingsTab() {
    return (
        <div className="max-w-2xl mx-auto space-y-10">
            <SectionHeader title="Account Settings" showLine uppercase />

            <div className="space-y-6">
                <h3 className="text-xs font-bold text-neutral-4 uppercase tracking-wider border-b border-neutral-3 pb-3">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="First Name" defaultValue="Kwame" />
                    <Input label="Last Name" defaultValue="Mensah" />
                </div>
                <Input label="Email Address" defaultValue="kwamemensah@example.com" type="email" />
                <Input label="Phone Number" defaultValue="+233 50 123 4567" />
                <div className="pt-2">
                    <Button variant="outline" size="sm">Update Profile</Button>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xs font-bold text-neutral-4 uppercase tracking-wider border-b border-neutral-3 pb-3">Notifications</h3>
                <div className="space-y-4 bg-neutral-1 p-6 rounded-2xl border border-neutral-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                        <div>
                            <span className="block text-sm font-bold text-neutral-9">Email Notifications</span>
                            <span className="text-xs text-neutral-5">Receive updates about activity and matches.</span>
                        </div>
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-3 rounded-full peer peer-checked:bg-primary peer-focus:outline-none transition-colors">
                            <div className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 left-0.5 peer-checked:translate-x-full transition-transform" />
                        </div>

                        {/* Fallback simplified toggle since peer/absolute positioning might be tricky without relative parent */}
                        {/* Re-implementing simplified standard toggle */}
                        <div className="relative w-11 h-6 bg-neutral-3 rounded-full peer-checked:bg-primary transition-colors">
                            <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                        </div>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                        <div>
                            <span className="block text-sm font-bold text-neutral-9">SMS Alerts</span>
                            <span className="text-xs text-neutral-5">Get urgent match updates on your phone.</span>
                        </div>
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-neutral-3 rounded-full peer-checked:bg-primary transition-colors">
                            <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="pt-8 border-t border-neutral-3">
                <Button variant="ghost" buttonClassName="text-red-600 hover:bg-red-50 hover:text-red-700 pl-0 text-sm">Delete Account</Button>
            </div>
        </div>
    );
}

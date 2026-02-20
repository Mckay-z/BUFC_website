
import CommunityDashboard from "../../../components/pages/CommunityDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Community Dashboard | Bechem United FC",
    description: "Manage your community profile, match history, and season tickets.",
};

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-neutral-100 py-8">
            <CommunityDashboard />
        </main>
    );
}

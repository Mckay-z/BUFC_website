
import { client } from "@/lib/sanity.client";
import { communityPageSettingsQuery, featuredCommunityProjectsQuery, clubPageSettingsQuery } from "@/lib/sanity.queries";
import { CommunityPageSettings, CommunityProject } from "@/lib/types";
import CommunityPageContent from "../../components/pages/CommunityPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community | Bechem United FC",
    description: "Join the Hunters community and make an impact together.",
};

export default async function CommunityPage() {
    const settings = await client.fetch<CommunityPageSettings>(communityPageSettingsQuery);
    const clubSettings = await client.fetch(clubPageSettingsQuery);
    const featuredProjects = await client.fetch<CommunityProject[]>(featuredCommunityProjectsQuery);

    return (
        <main className="min-h-screen bg-neutral-0">
            <CommunityPageContent
                settings={settings}
                joinHuntersPackSettings={clubSettings?.joinHuntersPack}
                featuredProjects={featuredProjects}
            />
        </main>
    );
}

import { client } from "@/lib/sanity.client";
import { communityProjectsQuery, communityPageSettingsQuery } from "@/lib/sanity.queries";
import { CommunityProject, CommunityPageSettings } from "@/lib/types";
import ProjectsPageContent from "../../../components/pages/ProjectsPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Community Projects | Bechem United FC",
    description: "Explore our ongoing and completed community initiatives.",
};

export default async function ProjectsPage() {
    const [allProjects, settings] = await Promise.all([
        client.fetch<CommunityProject[]>(communityProjectsQuery),
        client.fetch<CommunityPageSettings>(communityPageSettingsQuery)
    ]);

    return (
        <main className="min-h-screen bg-neutral-0">
            <ProjectsPageContent
                allProjects={allProjects}
                settings={settings}
            />
        </main>
    );
}


import { client } from "@/lib/sanity.client";
import { singleCommunityProjectQuery, relatedCommunityProjectsQuery, communityProjectsQuery, clubPageSettingsQuery, featuredCommunityProjectsQuery } from "@/lib/sanity.queries";
import { CommunityProject, ClubPageSettings } from "@/lib/types";
import ProjectDetailsContent from "../../../../components/pages/ProjectDetailsContent";
import { Metadata } from "next";

// Revalidate every 60 seconds
export const revalidate = 60;

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const project = await client.fetch<CommunityProject>(singleCommunityProjectQuery, {
        slug: resolvedParams.slug,
    });

    if (!project) {
        return {
            title: 'Project Not Found | Bechem United FC Community',
        };
    }

    return {
        title: `${project.title} | Community Projects`,
        description: project.description ? project.description[0].children[0].text : 'Bechem United FC Community Project',
    };
}

export async function generateStaticParams() {
    const projects = await client.fetch<CommunityProject[]>(communityProjectsQuery);
    return projects.map((project) => ({
        slug: project.slug.current,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = await params;

    const project = await client.fetch<CommunityProject>(singleCommunityProjectQuery, {
        slug: resolvedParams.slug,
    });

    // Calculate related projects based on category, preventing self-reference
    const [relatedProjects, clubSettings, featuredProjects] = await Promise.all([
        client.fetch<CommunityProject[]>(relatedCommunityProjectsQuery, {
            category: project?.category,
            projectId: project?._id,
        }),
        client.fetch<ClubPageSettings | null>(clubPageSettingsQuery),
        client.fetch<CommunityProject[]>(featuredCommunityProjectsQuery)
    ]);

    return (
        <main className="min-h-screen bg-neutral-0">
            {project ? (
                <ProjectDetailsContent
                    project={project}
                    relatedProjects={relatedProjects}
                    joinHuntersPackSettings={clubSettings?.joinHuntersPack}
                    featuredProjects={featuredProjects}
                />
            ) : (
                <div className="flex h-[50vh] items-center justify-center text-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                        <p>The project you are looking for does not exist.</p>
                    </div>
                </div>
            )}
        </main>
    );
}

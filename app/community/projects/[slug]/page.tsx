
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

    // Safe description: strip block content to plain text
    const rawDescription = project.description?.[0]?.children?.[0]?.text
        ?? 'A community initiative by Bechem United FC.';

    // Build OG image URL from Sanity if available
    const ogImageUrl = project.featuredImage
        ? `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bufc.com'}/api/og?title=${encodeURIComponent(project.title)}`
        : undefined;

    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bufc.com'}/community/projects/${resolvedParams.slug}`;

    return {
        title: `${project.title} | Community Projects | Bechem United FC`,
        description: rawDescription.slice(0, 160),
        keywords: [project.category, project.status, 'Bechem United FC', 'Ghana community', 'football community'],
        alternates: { canonical: canonicalUrl },
        openGraph: {
            type: 'article',
            url: canonicalUrl,
            title: `${project.title} | Bechem United FC Community`,
            description: rawDescription.slice(0, 160),
            siteName: 'Bechem United FC',
            images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: project.title }] : [],
            publishedTime: project.startDate,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} | Bechem United FC`,
            description: rawDescription.slice(0, 160),
            images: ogImageUrl ? [ogImageUrl] : [],
        },
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

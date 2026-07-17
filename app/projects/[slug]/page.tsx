import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { getProject, getProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Printly Project`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}/`
    },
    openGraph: {
      title: `${project.title} | Printly Project`,
      description: project.summary,
      images: [project.coverImage]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

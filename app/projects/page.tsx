import type { Metadata } from "next";
import { ProjectCollection } from "@/components/project-collection";

export const metadata: Metadata = {
  title: "Selected Work | Printly",
  description:
    "Explore Printly projects across design from images, 1:1 replication, and fast prototyping.",
  alternates: {
    canonical: "/projects/"
  }
};

export default function ProjectsPage() {
  return <ProjectCollection />;
}

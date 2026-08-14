import type { Metadata } from "next";
import { ProjectCollection } from "@/components/project-collection";

export const metadata: Metadata = {
  title: "Selected Work | Printly",
  description:
    "Explore Printly resin projects, including detailed display models and custom figures.",
  alternates: {
    canonical: "/projects/"
  }
};

export default function ResinProjectsPage() {
  return <ProjectCollection />;
}

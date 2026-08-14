import type { Metadata } from "next";
import { ProjectCollection } from "@/components/project-collection";

export const metadata: Metadata = {
  title: "Selected Work | Printly",
  description:
    "Explore Printly FDM projects, including functional replacement parts and custom prototypes.",
  alternates: {
    canonical: "/projects/"
  }
};

export default function FdmProjectsPage() {
  return <ProjectCollection />;
}

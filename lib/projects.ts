import paintedBust from "@/content/projects/painted-bust.json";
import customFigures from "@/content/projects/custom-figures.json";
import tennisGrip from "@/content/projects/tennis-grip.json";
import wiperPart from "@/content/projects/wiper-part.json";

export type ProjectSpecification = {
  label: string;
  value: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  service: string;
  category: string;
  summary: string;
  coverImage: string;
  imageAlt: string;
  challenge: string;
  approach: string;
  result: string;
  specifications: ProjectSpecification[];
  gallery: ProjectImage[];
};

const projects: Project[] = [
  paintedBust,
  customFigures,
  wiperPart,
  tennisGrip
];

export function getProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

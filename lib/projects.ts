import paintedBust from "@/content/projects/painted-bust.json";
import customFigures from "@/content/projects/custom-figures.json";
import tennisGrip from "@/content/projects/tennis-grip.json";
import wiperPart from "@/content/projects/wiper-part.json";
import smartFishTank from "@/content/projects/smart-fish-tank.json";

export type ProjectSpecification = {
  label: string;
  value: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  fit?: string;
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
  mediaLayout?: string;
  coverFit?: string;
  specifications: ProjectSpecification[];
  gallery: ProjectImage[];
};

const projects: Project[] = [
  paintedBust,
  customFigures,
  wiperPart,
  tennisGrip,
  smartFishTank
];

export function getProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByService(service: string) {
  return projects.filter(
    (project) => project.service.toLowerCase() === service.toLowerCase()
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

type ServiceIconName = "scan" | "bolt" | "file";

type ProjectCardData = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
};

type ServiceGroup = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  projects?: ProjectCardData[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: "fast-prototyping",
    title: "Product Development",
    description: "Custom models and functional prototypes for testing ideas, fit, and performance.",
    icon: "bolt",
    projects: [
      {
        title: "Custom Keyboard",
        description: "A custom control interface prototype with rotary controls and programmable keys.",
        image: "/images/project-custom-keyboard.jpg",
        imageAlt: "Black custom keyboard prototype with two rotary controls and programmable keys"
      },
      {
        title: "Racket Handle Mold",
        description: "A 3D-printed mold developed for forming and testing a custom tennis racket handle.",
        image: "/images/project-tennis-racket-handle-mold.webp",
        imageAlt: "Red and black 3D-printed mold for a custom tennis racket handle"
      },
      {
        title: "Lightweight Racket Handle",
        description: "A foamed 3D-printed racket handle developed to reduce weight while maintaining a solid grip.",
        image: "/images/project-lightweight-racket-handle.webp",
        imageAlt: "Tennis racket fitted with a white lightweight foamed 3D-printed handle"
      },
      {
        title: "3D-Printed Robotic Arm",
        description: "A modular robotic arm that uses 3D printing for faster component updates and continuous design iteration.",
        image: "/images/project-3d-printed-robotic-arm.webp",
        imageAlt: "Blue, white, and black 3D-printed robotic arm with exposed gears and wiring"
      },
      {
        title: "Real-Time Water Beacon",
        description: "A functional beacon prototype with custom housings for electronics and deployment hardware.",
        image: "/images/project-realtime-water-beacon.webp",
        imageAlt: "Real-time water beacon prototypes and internal electronic components"
      },
      {
        title: "Lighter Display Stand",
        description: "A branded display stand designed and printed from customer-supplied reference images.",
        image: "/images/project-custom-lighter-display.webp",
        imageAlt: "Custom green and white lighter display stand with orange branding"
      },
      {
        title: "Smart Fish Tank",
        description: "A multi-part smart fish tank enclosure developed from customer reference images.",
        image: "/images/project-smart-fish-tank-cad.webp",
        imageAlt: "CAD assembly model of the smart fish tank and internal components"
      }
    ]
  },
  {
    id: "one-to-one-replication",
    title: "Parts Replication",
    description: "Accurate replacements recreated from an original sample or precise measurements.",
    icon: "scan",
    projects: [
      {
        title: "Van Wiper Clip",
        description: "A discontinued van wiper clip recreated at 1:1 scale for a precise replacement.",
        image: "/images/project-mercedes-van-wiper-clip.webp",
        imageAlt: "Mercedes-Benz van wiper assembly and replicated black retaining clips"
      },
      {
        title: "Industrial Oven Part",
        description: "A 3D-printed sensor part recreated at 1:1 scale to reduce industrial oven repair costs.",
        image: "/images/project-industrial-oven-sensor-part.webp",
        imageAlt: "Original gray industrial oven sensor component beside its black 3D-printed replacement"
      },
      {
        title: "Discontinued Fence",
        description: "A discontinued fence component recreated at 1:1 scale to restore the original assembly.",
        image: "/images/project-discontinued-fence-component.webp",
        imageAlt: "White discontinued fence component held in front of its yellow CAD model"
      }
    ]
  },
  {
    id: "print-from-files",
    title: "Print from Files",
    description: "Ready-to-print 3D files prepared and produced as finished physical parts.",
    icon: "file",
    projects: [
      {
        title: "Painted Resin Bust",
        description: "A high-detail resin bust produced from an existing 3D file and hand painted.",
        image: "/images/project-painted-resin-bust-replica.webp",
        imageAlt: "Hand-painted high-detail resin character bust in an artist workspace"
      },
      {
        title: "3D-Printed Crawlers",
        description: "Detailed rock crawler models produced directly from customer-supplied 3D files.",
        image: "/images/project-3d-printed-rock-crawlers.webp",
        imageAlt: "Three detailed 3D-printed rock crawler models on a wooden workbench"
      },
      {
        title: "Drone Protection Kit",
        description: "Flexible drone protection parts printed from supplied files to absorb impact damage.",
        image: "/images/project-flexible-drone-protection-kit.webp",
        imageAlt: "Racing drone fitted with flexible black and orange 3D-printed protection parts"
      }
    ]
  }
];

const placeholderStyles = [
  "from-[#DCE8FF] via-[#F8FAFF] to-[#C9DAFF]",
  "from-[#E9E2FF] via-[#FAF8FF] to-[#D7CCFF]",
  "from-[#DDF4F0] via-[#F7FCFB] to-[#C9E9E2]",
  "from-[#FFE8D7] via-[#FFF9F4] to-[#FFD8BD]"
];

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const sharedProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8
  };

  if (name === "scan") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...sharedProps}>
        <path d="M8 3.5H4.5V7M16 3.5h3.5V7M8 20.5H4.5V17M16 20.5h3.5V17" />
        <path d="m12 8 3.5 2v4L12 16l-3.5-2v-4zM12 8v4m3.5-2L12 12l-3.5-2" />
      </svg>
    );
  }

  if (name === "file") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...sharedProps}>
        <path d="M6.5 3.5h7l4 4v13h-11z" />
        <path d="M13.5 3.5v4h4M9 12h6M9 16h6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...sharedProps}>
      <path d="m13.5 2.8-8 11h6l-1 7.4 8-11h-6z" />
    </svg>
  );
}

function PlaceholderVisual({ index, label }: { index: number; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${placeholderStyles[index % placeholderStyles.length]}`}
    >
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/80 bg-white/25" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rotate-12 rounded-[2rem] border border-white/80 bg-white/20" />
      <div className="absolute inset-0 flex items-center justify-center text-[#2F6BFF]">
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="h-16 w-16 opacity-70"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="m32 11 18 10v22L32 53 14 43V21z" />
          <path d="m14 21 18 10 18-10M32 31v22M23 16l18 10" />
        </svg>
      </div>
    </div>
  );
}

function ProjectCard({
  projectNumber,
  projectIndex,
  project
}: {
  projectNumber: number;
  projectIndex: number;
  project?: ProjectCardData;
}) {
  const projectLabel = project?.title ?? `Project ${String(projectNumber).padStart(2, "0")}`;
  const projectDescription =
    project?.description ?? "Photos and project information coming soon.";

  return (
    <li className="w-[78vw] max-w-[310px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#E4EAF4] bg-white shadow-[0_8px_24px_rgba(24,24,27,0.05)]">
      <div className="relative">
        {project ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
            <Image
              src={assetPath(project.image)}
              alt={project.imageAlt}
              fill
              sizes="310px"
              className={project.imageFit === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ) : (
          <PlaceholderVisual index={projectIndex} label={`Placeholder image for ${projectLabel}`} />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-extrabold">{projectLabel}</h3>
        <p className="mt-1 text-sm text-[#7A7A7A]">{projectDescription}</p>
      </div>
    </li>
  );
}

function ServiceBoard({
  group,
  initiallyOpen
}: {
  group: ServiceGroup;
  initiallyOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const panelId = `${group.id}-projects`;
  const projects = group.projects ?? Array.from({ length: 4 });

  return (
    <article className="overflow-hidden rounded-2xl border border-[#E4EAF4] bg-white shadow-soft">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="focus-ring group flex w-full items-center gap-4 p-5 text-left transition hover:bg-[#F8FAFD] sm:gap-6 sm:p-7"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2F6BFF] sm:h-14 sm:w-14">
          <ServiceIcon name={group.icon} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xl font-extrabold leading-tight sm:text-2xl">
            {group.title}
          </span>
          <span className="mt-1.5 hidden text-sm leading-6 text-[#555555] sm:block">
            {group.description}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDE5F1] text-xl font-semibold text-[#2F6BFF] transition duration-300 group-hover:border-[#2F6BFF] ${
            isOpen ? "rotate-45 bg-[#EAF2FF]" : "bg-white"
          }`}
        >
          +
        </span>
      </button>

      {isOpen ? (
        <div id={panelId} className="border-t border-[#E4EAF4] bg-[#F8FAFD] p-5 sm:p-7">
          <ul
            aria-label={`${group.title} project placeholders`}
            className="project-strip -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project?.title ?? index}
                projectNumber={index + 1}
                projectIndex={index}
                project={project}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export function ProjectCollection() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#18181B]">
      <SiteHeader activePage="projects" />

      <section className="container-page flex min-h-[184px] flex-col justify-center text-center sm:min-h-[204px] lg:min-h-[228px]">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          Selected <span className="text-[#2F6BFF]">Work</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#555555] sm:text-lg">
          Open a service to explore selected prototyping, replication, and file production projects.
        </p>
      </section>

      <section className="container-page pb-14 pt-0 sm:pb-16 lg:pb-20">
        <div className="space-y-5">
          {serviceGroups.map((group) => (
            <ServiceBoard
              key={group.id}
              group={group}
              initiallyOpen={group.id === "fast-prototyping"}
            />
          ))}
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-[#F8FAFD] p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2F6BFF]">
              Start a Project
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl">
              Have a project in mind?
            </h2>
          </div>
          <Link
            href="/quote/"
            className="focus-ring inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6]"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

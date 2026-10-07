"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

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
  projects: ProjectCardData[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: "fast-prototyping",
    title: "Product Development",
    description: "Custom models and functional prototypes for testing ideas, fit, and performance.",
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

function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <li className="w-[88%] max-w-[380px] shrink-0 snap-start sm:w-[350px] lg:w-[380px]">
      <div className="brand-image relative aspect-[4/3] bg-[#F3F5F7]">
        <Image
          src={assetPath(project.image)}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 350px, 380px"
          className={project.imageFit === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
      <div className="pb-1 pt-4">
        <h3 className="text-base font-bold leading-6 tracking-[-0.02em] sm:text-lg">{project.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#535B68]">{project.description}</p>
      </div>
    </li>
  );
}

function ServiceBoard({
  group,
  groupNumber,
  initiallyOpen
}: {
  group: ServiceGroup;
  groupNumber: number;
  initiallyOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const panelId = `${group.id}-projects`;
  const projects = group.projects;

  useEffect(() => {
    function openLinkedGroup() {
      if (window.location.hash === `#${group.id}`) {
        setIsOpen(true);
      }
    }

    openLinkedGroup();
    window.addEventListener("hashchange", openLinkedGroup);
    return () => window.removeEventListener("hashchange", openLinkedGroup);
  }, [group.id]);

  return (
    <article id={group.id} className={`scroll-mt-24 overflow-hidden border border-t-4 bg-white ${isOpen ? "border-[#111318] border-t-[#006DFD]" : "border-[#D8DDE5] border-t-[#111318]"}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="focus-ring group flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-[#F3F5F7] focus-visible:ring-inset sm:gap-6 sm:p-7"
      >
        <span className="flex size-8 shrink-0 items-center justify-center bg-[#006DFD] font-mono text-xs font-bold tabular-nums text-white sm:size-10 sm:text-sm">
          {String(groupNumber).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold leading-tight tracking-[-0.025em] sm:text-2xl">
            {group.title}
          </span>
          <span className="mt-2 block max-w-xl text-sm leading-6 text-[#535B68]">
            {group.description}
          </span>
          <span className="mt-3 block font-mono text-xs text-[#6A7380]">
            {projects.length} projects
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`flex size-8 shrink-0 items-center justify-center border text-xl font-normal ${isOpen ? "border-[#111318] bg-[#111318] text-white" : "border-[#BFC7D3] text-[#111318]"}`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen ? (
        <div id={panelId} className="border-t border-[#D8DDE5] bg-[#F3F5F7] p-5 sm:p-7">
          <ul
            aria-label={`${group.title} projects`}
            tabIndex={0}
            className="project-strip focus-ring flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:gap-6"
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </ul>
          <p className="mt-2 text-xs text-[#6A7380]">Scroll to browse this collection.</p>
        </div>
      ) : null}
    </article>
  );
}

export function ProjectCollection() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F3F5F7] text-[#111318]">
      <SiteHeader activePage="projects" />

      <section className="container-page page-intro">
        <p className="eyebrow">Projects</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
          Selected <span className="text-[#006DFD]">work</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#535B68] sm:text-lg">
          Prototypes, replacement parts, and finished prints from our studio.
        </p>
      </section>

      <section className="container-page pb-12 pt-0 sm:pb-16 lg:pb-20">
        <div className="space-y-4">
          {serviceGroups.map((group, index) => (
            <ServiceBoard
              key={group.id}
              group={group}
              groupNumber={index + 1}
              initiallyOpen={group.id === "fast-prototyping"}
            />
          ))}
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 border-t-2 border-[#111318] pt-8 sm:gap-8 sm:pt-10 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">
              Let’s work on your next part.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#535B68]">
              Send a model, a drawing, or a photo of what you need.
            </p>
          </div>
          <Link
            href="/quote/"
            className="studio-button"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

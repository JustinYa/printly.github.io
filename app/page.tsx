"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const showcaseAutoplayDelay = 3000;

const equipmentList: Array<{
  label: string;
  title: string;
  description: string;
  buildVolume?: string;
  src: string;
  alt: string;
}> = [
  {
    label: "FDM Printer",
    title: "Bambu Lab H2C",
    description: "Large-format multi-hotend FDM",
    buildVolume: "Build volume · 330 × 320 × 325 mm",
    src: "/images/equipment-bambu-h2c.png",
    alt: "Bambu Lab H2C FDM 3D printer"
  },
  {
    label: "FDM Printer",
    title: "Bambu Lab H2D",
    description: "Large-format dual-nozzle FDM",
    buildVolume: "Build volume · 350 × 320 × 325 mm",
    src: "/images/equipment-bambu-h2d.png",
    alt: "Bambu Lab H2D FDM 3D printer"
  },
  {
    label: "FDM Printer",
    title: "Bambu Lab H2S",
    description: "Extra-large single-nozzle FDM",
    buildVolume: "Build volume · 340 × 320 × 340 mm",
    src: "/images/equipment-bambu-h2s.png",
    alt: "Bambu Lab H2S FDM 3D printer"
  },
  {
    label: "FDM Printer",
    title: "Bambu Lab X2D",
    description: "Compact dual-nozzle FDM",
    buildVolume: "Build volume · 256 × 256 × 260 mm",
    src: "/images/equipment-bambu-x2d.png",
    alt: "Bambu Lab X2D FDM 3D printer"
  },
  {
    label: "FDM Post-processing",
    title: "ArtinBox",
    description: "Controlled annealing for FDM parts",
    src: "/images/equipment-artinbox.png",
    alt: "ArtinBox annealing oven for FDM printed parts"
  },
  {
    label: "Resin Printer · Coming Soon",
    title: "ELEGOO Saturn 4 Ultra 16K",
    description: "High-detail resin printing",
    buildVolume: "Build volume · 211.68 × 118.37 × 220 mm",
    src: "/images/equipment-elegoo-saturn-4-ultra-16k.png",
    alt: "ELEGOO Saturn 4 Ultra 16K resin 3D printer"
  }
];

const coreServices = [
  {
    title: "Design from Images",
    description: "Send photos, a sketch, or measurements. We build the CAD model and print a part you can test.",
    note: "CAD modeling & prototypes"
  },
  {
    title: "1:1 Replication",
    description: "Have a worn or discontinued part? We use the original sample or its measurements to make a replacement.",
    note: "Replacement parts"
  },
  {
    title: "Print from Files",
    description: "Already have a model? Send your STL, 3MF, OBJ, or STEP file with the size, material, and quantity you need.",
    note: "File preparation & printing"
  }
];

const featuredProjects = [
  {
    title: "Racket Handle Mold",
    category: "Product development",
    description: "A printed mold for forming and testing a custom racket handle.",
    src: "/images/project-tennis-racket-handle-mold.webp",
    alt: "Red and black 3D-printed mold with a green racket handle inside",
    href: "/projects/#fast-prototyping"
  },
  {
    title: "Industrial Oven Part",
    category: "Parts replication",
    description: "A replacement sensor component, recreated from the original part.",
    src: "/images/project-industrial-oven-sensor-part.webp",
    alt: "Original gray oven component beside its black 3D-printed replacement",
    href: "/projects/#one-to-one-replication"
  },
  {
    title: "3D-Printed Crawlers",
    category: "Print from files",
    description: "Crawler bodies and accessories printed from supplied 3D files.",
    src: "/images/project-3d-printed-rock-crawlers.webp",
    alt: "Three 3D-printed crawler models on a workbench",
    href: "/projects/#print-from-files"
  }
];

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

function Arrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5" aria-hidden="true">
      {direction === "left" ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

export default function Home() {
  const [currentExample, setCurrentExample] = useState(0);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState(false);
  const [isShowcaseFocused, setIsShowcaseFocused] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const currentEquipment = equipmentList[currentExample];

  useEffect(() => {
    if (isShowcaseHovered || isShowcaseFocused || isAutoplayPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentExample((currentExample + 1) % equipmentList.length);
    }, showcaseAutoplayDelay);

    return () => window.clearTimeout(timeoutId);
  }, [currentExample, isShowcaseHovered, isShowcaseFocused, isAutoplayPaused]);

  function showPreviousExample() {
    setCurrentExample((current) => (current - 1 + equipmentList.length) % equipmentList.length);
  }

  function showNextExample() {
    setCurrentExample((current) => (current + 1) % equipmentList.length);
  }

  return (
    <main id="top" className="min-h-screen bg-white text-[#111318]">
      <SiteHeader activePage="home" />

      <section className="container-page grid gap-9 py-10 sm:py-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:py-16">
        <div className="max-w-xl">
          <p className="eyebrow">A design & printing studio · Oshkosh, WI</p>
          <h1 className="mt-6 text-[clamp(2rem,10vw,2.75rem)] font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-[3.75rem]">
            CAD design &<br /><span className="text-[#006DFD]">3D printing.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#535B68] sm:text-lg sm:leading-8">
            Send a sketch, a 3D file, or a part you need to replace.
            We handle the CAD work and printing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/quote/" className="studio-button">Request a quote <Arrow /></Link>
            <Link href="/projects/" className="text-link">View our work</Link>
          </div>
          <div className="mt-10 border-t border-[#D8DDE5] pt-5">
            <p className="text-sm leading-6 text-[#535B68]">Prototypes · Replacement parts · Small production runs</p>
            <a href="tel:+19208405302" className="focus-ring mt-3 inline-block text-sm font-semibold hover:text-[#0057CB]">
              +1 (920) 840-5302
            </a>
          </div>
        </div>
        <figure className="min-w-0">
          <div className="relative aspect-square overflow-hidden border border-[#111318] bg-[#F3F5F7]">
            <Image
              src={assetPath("/images/project-3d-printed-robotic-arm.webp")}
              alt="A robotic arm built with blue and white 3D-printed components, exposed gears, and wiring"
              fill
              priority
              sizes="(min-width: 1024px) 544px, (min-width: 640px) 80vw, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-x border-b border-[#111318] bg-[#F3F5F7] px-4 py-3 text-xs leading-5 text-[#535B68]">
            <span className="font-bold text-[#111318]">3D-Printed Robotic Arm</span>
            <span>Replaceable parts. Easier iteration.</span>
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-[#D8DDE5] bg-[#F3F5F7]">
        <div className="container-page py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">From the workbench</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em]">A few of our projects</h2>
            </div>
            <Link href="/projects/" className="text-link">See all projects <Arrow /></Link>
          </div>
          <div className="mt-8 grid gap-9 sm:grid-cols-3 sm:gap-6">
            {featuredProjects.map((project) => (
              <article key={project.title} className="min-w-0">
                <Link href={project.href} className="focus-ring group block" aria-label={`View ${project.title} in our projects`}>
                  <div className="brand-image relative aspect-[4/3] bg-white">
                    <Image src={assetPath(project.src)} alt={project.alt} fill sizes="(min-width: 640px) 33vw, 90vw" className="object-cover" />
                  </div>
                  <p className="mt-4 text-xs text-[#535B68]">{project.category}</p>
                  <h3 className="mt-1 text-lg font-bold tracking-[-0.02em] group-hover:text-[#0057CB]">{project.title}</h3>
                </Link>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#535B68]">{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-[0.65fr_1fr] sm:gap-16">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em]">Start with what you have.</h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-[#535B68]">
            Some projects start with a finished file. Others start with a photo or a broken part.
            We can work from any of these.
          </p>
        </div>
        <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-10">
          {coreServices.map((service, index) => (
            <article key={service.title} className="border-t-2 border-[#111318] pt-5">
              <span className="text-xs font-semibold tabular-nums text-[#0057CB]">0{index + 1} / {service.note}</span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{service.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[#535B68]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#D8DDE5]">
        <div
          className="container-page grid gap-9 py-12 sm:py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16"
          onMouseEnter={() => setIsShowcaseHovered(true)}
          onMouseLeave={() => setIsShowcaseHovered(false)}
          onFocusCapture={() => setIsShowcaseFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsShowcaseFocused(false);
          }}
        >
          <div>
            <p className="eyebrow">In the studio</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em]">Our equipment</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#535B68]">
              FDM printing for housings, fixtures, and functional parts.
              Controlled annealing for post-processing. Resin printing is coming soon.
            </p>
            <div className="mt-8 border-t border-[#D8DDE5] pt-6">
              <p className="text-xs text-[#535B68]">{currentEquipment.label}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em]">{currentEquipment.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#535B68]">{currentEquipment.description}</p>
              {currentEquipment.buildVolume ? (
                <p className="mt-2 text-sm text-[#535B68]">{currentEquipment.buildVolume}</p>
              ) : null}
            </div>
            <div className="mt-7 flex items-center gap-3">
              <button type="button" aria-label="Previous equipment" onClick={showPreviousExample} className="focus-ring grid size-11 shrink-0 place-items-center border border-[#111318] transition-colors hover:bg-[#111318] hover:text-white"><Arrow direction="left" /></button>
              <button type="button" aria-label="Next equipment" onClick={showNextExample} className="focus-ring grid size-11 shrink-0 place-items-center border border-[#111318] transition-colors hover:bg-[#111318] hover:text-white"><Arrow /></button>
              <span className="mx-2 text-xs tabular-nums text-[#535B68]">0{currentExample + 1} / 0{equipmentList.length}</span>
              <button type="button" aria-pressed={isAutoplayPaused} onClick={() => setIsAutoplayPaused((current) => !current)} className="focus-ring min-h-11 text-xs text-[#535B68] underline underline-offset-4">
                {isAutoplayPaused ? "Resume slideshow" : "Pause slideshow"}
              </button>
            </div>
          </div>
          <div role="region" aria-roledescription="carousel" aria-label="Our equipment" className="min-w-0">
            <div className="brand-image relative aspect-square bg-white">
              <div className="absolute inset-0 flex transition-transform duration-500 motion-reduce:transition-none" style={{ transform: `translateX(-${currentExample * 100}%)` }}>
                {equipmentList.map((equipment, index) => (
                  <div key={equipment.src} aria-hidden={index !== currentExample} className="relative h-full w-full shrink-0">
                    <Image src={assetPath(equipment.src)} alt={index === currentExample ? equipment.alt : ""} fill sizes="(min-width: 1024px) 544px, 90vw" className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {equipmentList.map((equipment, index) => (
                <button key={equipment.src} type="button" aria-label={`Show ${equipment.title}`} aria-current={index === currentExample ? "true" : undefined} onClick={() => setCurrentExample(index)} className={`focus-ring min-h-11 border-b-2 text-xs transition-colors ${index === currentExample ? "border-[#006DFD] font-medium text-[#111318]" : "border-transparent text-[#535B68] hover:text-[#111318]"}`}>
                  {equipment.title.startsWith("Bambu Lab") ? equipment.title.replace("Bambu Lab ", "") : equipment.title.startsWith("ELEGOO") ? "Saturn 4 Ultra" : equipment.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-4 border-[#006DFD] bg-[#111318] text-white">
        <div className="container-page flex flex-col items-start justify-between gap-7 py-12 sm:flex-row sm:items-center sm:py-14">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">Tell us what you need to make.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#CAD1DC]">Send your file or reference images, along with the size and quantity. We’ll review the details and send a quote.</p>
          </div>
          <Link href="/quote/" className="studio-button studio-button-on-dark shrink-0">Request a quote <Arrow /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

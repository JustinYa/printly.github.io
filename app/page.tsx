"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const showcaseAutoplayDelay = 3000;

type HomeIconName =
  | "image"
  | "file"
  | "scan"
  | "chevronLeft"
  | "chevronRight";

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

const coreServices: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  {
    title: "Design from Images",
    description: "Photos or sketches turned into a 3D model.",
    icon: "image"
  },
  {
    title: "Print from Files",
    description: "Your 3D files printed into physical parts.",
    icon: "file"
  },
  {
    title: "1:1 Replication",
    description: "Replacement parts recreated from a sample.",
    icon: "scan"
  }
];

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

function HomeIcon({ name, className = "size-7" }: { name: HomeIconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  switch (name) {
    case "image":
      return (
        <svg {...common}>
          <rect width="18" height="16" x="3" y="4" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="m21 15-5-5L5 20" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h6" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
          <path d="m12 7 4 2.3v4.4L12 16l-4-2.3V9.3L12 7ZM12 11.5 8.2 9.4M12 11.5l3.8-2.1M12 11.5V16" />
        </svg>
      );
    case "chevronLeft":
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
  }
}

export default function Home() {
  const [currentExample, setCurrentExample] = useState(0);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState(false);
  const currentEquipment = equipmentList[currentExample];
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isShowcaseHovered || reduceMotion) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentExample((currentExample + 1) % equipmentList.length);
    }, showcaseAutoplayDelay);

    return () => window.clearTimeout(timeoutId);
  }, [currentExample, isShowcaseHovered, reduceMotion]);

  function showExample(index: number) {
    if (index === currentExample) {
      return;
    }

    setCurrentExample(index);
  }

  function showPreviousExample() {
    showExample(currentExample === 0 ? equipmentList.length - 1 : currentExample - 1);
  }

  function showNextExample() {
    showExample(currentExample === equipmentList.length - 1 ? 0 : currentExample + 1);
  }

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-white text-[#18181B]">
      <SiteHeader activePage="home" />

      <section className="container-page py-8 sm:py-12">
        <p className="text-xs font-semibold text-[#555555]">Oshkosh, WI</p>
        <h1 className="mt-3 text-[1.75rem] font-extrabold leading-tight sm:text-4xl">
          CAD Design &amp; <span className="inline-block text-[#2F6BFF]">3D Printing</span>
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-[#555555]">
          Prototypes, replacement parts, and small production runs.
        </p>
        <Link href="/quote/" className="focus-ring mt-5 inline-flex min-h-12 items-center rounded-lg bg-[#2F6BFF] px-6 text-sm font-extrabold text-white transition hover:bg-[#1F5AF6]">
          Request a Quote
        </Link>
      </section>

      <section aria-labelledby="services-heading" className="container-page pb-8 sm:pb-12">
        <h2 id="services-heading" className="text-xl font-extrabold sm:text-2xl">How we can help</h2>
        <div className="mt-4 grid divide-y divide-[#ECEFF5] rounded-lg border border-[#ECEFF5] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {coreServices.map((service) => (
            <article key={service.title} className="flex items-start gap-3 p-4 sm:p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EAF2FF] text-[#2F6BFF]"><HomeIcon name={service.icon} className="size-5" /></span>
              <div><h3 className="text-sm font-extrabold sm:text-base">{service.title}</h3><p className="mt-1 text-sm leading-6 text-[#555555]">{service.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="work-heading" className="bg-[#F8FAFD] py-7 sm:py-10">
        <div className="container-page">
          <div className="flex items-center justify-between gap-3">
            <h2 id="work-heading" className="text-xl font-extrabold sm:text-2xl">Selected work</h2>
            <Link href="/projects/" className="focus-ring inline-flex min-h-11 items-center rounded text-sm font-bold text-[#2F6BFF]">All projects →</Link>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-5">
            {[
              { title: "Racket Handle Mold", src: "/images/project-tennis-racket-handle-mold.webp", alt: "3D-printed tennis racket handle mold" },
              { title: "Custom Keyboard", src: "/images/project-custom-keyboard.jpg", alt: "Custom keyboard prototype with rotary controls and programmable keys" }
            ].map((project) => (
              <Link key={project.title} href="/projects/" className="focus-ring overflow-hidden rounded-lg border border-[#ECEFF5] bg-white">
                <div className="relative aspect-[4/3]"><Image src={assetPath(project.src)} alt={project.alt} fill sizes="(min-width: 1024px) 480px, 45vw" className="object-cover" /></div>
                <h3 className="p-3 text-sm font-extrabold sm:p-4 sm:text-base">{project.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-6 sm:py-10">
        <div className="mx-auto w-full max-w-[24rem]">
          <div className="mb-4 flex items-end justify-between gap-4 text-left">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl">Our equipment</h2>
            </div>
            <p className="pb-1 text-xs font-bold uppercase tracking-[0.12em] text-[#777777]">
              6 Systems
            </p>
          </div>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Our equipment"
            onMouseEnter={() => setIsShowcaseHovered(true)}
            onMouseLeave={() => setIsShowcaseHovered(false)}
            className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#E4E9F1] bg-white shadow-soft"
          >
            <div
              className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${currentExample * 100}%)` }}
            >
              {equipmentList.map((equipment, index) => (
                <div
                  key={equipment.src}
                  aria-hidden={index === currentExample ? undefined : true}
                  className="relative h-full w-full shrink-0 overflow-hidden"
                >
                  <Image
                    src={assetPath(equipment.src)}
                    alt={index === currentExample ? equipment.alt : ""}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 28rem, 92vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
            <button
              type="button"
              aria-label="Previous equipment"
              onClick={showPreviousExample}
              className="focus-ring absolute left-3 top-1/2 z-40 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/20 text-white/80 transition hover:bg-black/35 hover:text-white"
            >
              <HomeIcon name="chevronLeft" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next equipment"
              onClick={showNextExample}
              className="focus-ring absolute right-3 top-1/2 z-40 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/20 text-white/80 transition hover:bg-black/35 hover:text-white"
            >
              <HomeIcon name="chevronRight" className="size-4" />
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-4 text-white sm:p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/70">
                {currentEquipment.label}
              </p>
              <h3 className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl">
                {currentEquipment.title}
              </h3>
              <p className="mt-2 text-xs font-semibold text-white/80">
                {currentEquipment.description}
              </p>
              {currentEquipment.buildVolume ? (
                <p className="mt-1 text-[11px] font-extrabold text-white">
                  {currentEquipment.buildVolume}
                </p>
              ) : null}
              <div className="mt-3 flex items-center gap-2">
                {equipmentList.map((equipment, index) => (
                  <button
                    key={equipment.src}
                    type="button"
                    aria-label={`Show ${equipment.title}`}
                    aria-current={index === currentExample ? "true" : undefined}
                    onClick={() => showExample(index)}
                    className={`focus-ring pointer-events-auto h-2.5 rounded-full transition-all ${
                      index === currentExample ? "w-8 bg-white" : "w-2.5 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="sr-only" aria-live="off">Showing {currentEquipment.title}</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

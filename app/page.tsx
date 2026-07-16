"use client";

import Image from "next/image";
import type { FocusEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";

const contactEmail = "contact.printlylab@gmail.com";
const quoteFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdqbuDsPwCyFewc5asZn3jofF2rcWo1aD5FYC54Amrs8gEOTw/viewform?usp=publish-editor";
const supportFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdy8woehAlDrSA1wL-Ksqe0MGnCQ2zHcIV5OfGymYANGYE_tA/viewform?usp=publish-editor";
const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type PrintServiceId = "fdm" | "resin";

type IconName =
  | "shield"
  | "lock"
  | "bolt"
  | "cube"
  | "layers"
  | "spark"
  | "package"
  | "upload"
  | "mail"
  | "check"
  | "chevronLeft"
  | "chevronRight"
  | "play"
  | "pause";

const showcaseAutoplayDelay = 5500;

const showcaseExamples: Array<{
  label: string;
  title: string;
  src: string;
  alt: string;
}> = [
  {
    label: "Resin",
    title: "Painted Bust",
    src: "/images/showcase-painted-bust.jpg",
    alt: "Painted resin character bust displayed in a hobby workspace"
  },
  {
    label: "Resin",
    title: "Custom Figures",
    src: "/images/showcase-miniatures.jpg",
    alt: "Four custom white resin figures on a black background"
  },
  {
    label: "FDM",
    title: "Wiper Part",
    src: "/images/showcase-wiper-custom.jpg",
    alt: "FDM printed discontinued car windshield wiper replacement part"
  },
  {
    label: "FDM",
    title: "Tennis Grip",
    src: "/images/showcase-tennis-grip.jpg",
    alt: "FDM printed tennis racket grip replacement"
  }
];

const printServiceOptions: Array<{
  id: PrintServiceId;
  label: string;
  description: string;
  materials: string[];
  colors: Array<{
    name: string;
    value: string;
  }>;
}> = [
  {
    id: "fdm",
    label: "FDM",
    description: "Durable functional prints for prototypes, fixtures, and everyday parts.",
    materials: ["PLA", "PETG", "ABS", "ASA", "TPU"],
    colors: [
      { name: "Black", value: "#18181B" },
      { name: "White", value: "#FFFFFF" },
      { name: "Green", value: "#22C55E" },
      { name: "Red", value: "#EF4444" },
      { name: "Blue", value: "#2F6BFF" },
      { name: "Purple", value: "#8B5CF6" },
      { name: "Gold", value: "#D4A017" },
      { name: "Copper", value: "#B87333" }
    ]
  },
  {
    id: "resin",
    label: "Resin",
    description: "High-detail prints for miniatures, prototypes, and display models.",
    materials: ["Standard", "Tough", "Flexible", "High-detail"],
    colors: [
      { name: "Black", value: "#18181B" },
      { name: "White", value: "#FFFFFF" },
      { name: "Gray", value: "#8A8F98" }
    ]
  }
];

const featureHighlights: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "High Quality",
    description: "Precision FDM and resin prints",
    icon: "shield"
  },
  {
    title: "Secure",
    description: "Your files are safe",
    icon: "lock"
  },
  {
    title: "Fast Turnaround",
    description: "Reliable service",
    icon: "bolt"
  }
];

const steps: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "Upload",
    description: "Send STL, 3MF, OBJ, STEP, or ZIP files.",
    icon: "upload"
  },
  {
    title: "Quote",
    description: "We review your files and send a clear quote.",
    icon: "mail"
  },
  {
    title: "Print",
    description: "Once approved, we produce your FDM or resin order.",
    icon: "check"
  },
  {
    title: "Deliver",
    description: "Pick up locally or choose shipping when ready.",
    icon: "package"
  }
];

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Icon({ name, className = "size-7" }: { name: IconName; className?: string }) {
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
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect width="14" height="10" x="5" y="11" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
          <path d="M12 11 4.4 6.7" />
          <path d="m12 11 7.6-4.3" />
          <path d="M12 11v9" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 17 8 4 8-4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <path d="M3 12h4" />
          <path d="M17 12h4" />
          <path d="m6 6 2.4 2.4" />
          <path d="m15.6 15.6 2.4 2.4" />
          <path d="m18 6-2.4 2.4" />
          <path d="m8.4 15.6-2.4 2.4" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
          <path d="M4.4 6.7 12 11l7.6-4.3" />
          <path d="M12 11v9" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
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
    case "play":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="m8 5 11 7-11 7V5Z" />
        </svg>
      );
    case "pause":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect width="4" height="14" x="6" y="5" rx="1" />
          <rect width="4" height="14" x="14" y="5" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [emailNotice, setEmailNotice] = useState("");
  const [currentExample, setCurrentExample] = useState(0);
  const [isShowcaseAutoplayEnabled, setIsShowcaseAutoplayEnabled] = useState(true);
  const [isShowcaseInteracting, setIsShowcaseInteracting] = useState(false);
  const [selectedPrintService, setSelectedPrintService] =
    useState<PrintServiceId>("fdm");
  const selectedService = printServiceOptions.find(
    (service) => service.id === selectedPrintService
  ) ?? printServiceOptions[0];
  const currentShowcase = showcaseExamples[currentExample];

  useEffect(() => {
    if (!isShowcaseAutoplayEnabled || isShowcaseInteracting) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentExample((example) => (example + 1) % showcaseExamples.length);
    }, showcaseAutoplayDelay);

    return () => window.clearTimeout(timeoutId);
  }, [currentExample, isShowcaseAutoplayEnabled, isShowcaseInteracting]);

  function showPreviousExample() {
    setCurrentExample((example) =>
      example === 0 ? showcaseExamples.length - 1 : example - 1
    );
  }

  function showNextExample() {
    setCurrentExample((example) =>
      example === showcaseExamples.length - 1 ? 0 : example + 1
    );
  }

  function handleShowcaseBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsShowcaseInteracting(false);
    }
  }

  function handleEmailClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    setEmailNotice("Opening your mail app. Email copied if your browser allows it.");

    void copyTextToClipboard(contactEmail).then((copied) => {
      setEmailNotice(
        copied
          ? "Email copied. If nothing opened, paste it into your email app."
          : "If nothing opened, copy this address into your email app."
      );
    });
  }

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-white text-[#18181B]">
      <header className="container-page flex justify-center pb-4 pt-8 sm:justify-start sm:pb-5 sm:pt-10 lg:pb-6 lg:pt-12">
        <Image
          src={assetPath("/images/printly-logo-transparent.png")}
          alt="Printly"
          width={1242}
          height={388}
          priority
          sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 208px"
          className="h-auto w-52 object-contain sm:w-64 lg:w-72"
        />
      </header>

      <section className="container-page grid gap-10 pb-16 pt-1 sm:gap-12 sm:pb-20 lg:grid-cols-[0.45fr_0.55fr] lg:items-center lg:pb-24 lg:pt-0">
        <div className="mx-auto max-w-xl text-center sm:text-left lg:mx-0">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#2F6BFF] sm:text-[13px]">
            Resin and FDM 3D Printing
          </p>
          <h1 className="mx-auto mt-4 max-w-[28rem] text-3xl font-extrabold leading-[1.08] text-[#18181B] sm:mx-0 sm:text-4xl">
            Bring Your{" "}
            <span className="text-[#2F6BFF]">Ideas</span>
            <br />
            To <span className="text-[#2F6BFF]">Life</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-[1.65] text-[#555555] sm:mx-0 sm:mt-6 sm:text-lg">
            Professional design, prototyping, and custom 3D printing &mdash; all
            in one place.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={quoteFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6] sm:w-auto"
            >
              <Icon name="upload" className="size-5" />
              Upload Your Model
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[28rem] lg:ml-auto">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Print examples"
            onMouseEnter={() => setIsShowcaseInteracting(true)}
            onMouseLeave={() => setIsShowcaseInteracting(false)}
            onFocusCapture={() => setIsShowcaseInteracting(true)}
            onBlurCapture={handleShowcaseBlur}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[#ECEFF5] bg-[#F8FAFD] shadow-soft"
          >
            {showcaseExamples.map((example, index) => (
              <Image
                key={example.src}
                src={assetPath(example.src)}
                alt={index === currentExample ? example.alt : ""}
                aria-hidden={index === currentExample ? undefined : true}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 28rem, 92vw"
                className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  index === currentExample
                    ? "z-10 scale-100 opacity-100"
                    : "z-0 scale-[1.015] opacity-0"
                }`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <button
              type="button"
              aria-label="Previous example"
              onClick={showPreviousExample}
              className="focus-ring absolute left-3 top-1/2 z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/20 text-white/80 backdrop-blur-[2px] transition hover:-translate-x-0.5 hover:bg-black/35 hover:text-white"
            >
              <Icon name="chevronLeft" className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next example"
              onClick={showNextExample}
              className="focus-ring absolute right-3 top-1/2 z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/20 text-white/80 backdrop-blur-[2px] transition hover:translate-x-0.5 hover:bg-black/35 hover:text-white"
            >
              <Icon name="chevronRight" className="size-4" />
            </button>
            <div className="absolute inset-x-0 bottom-0 z-30 p-4 text-white sm:p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/70">
                {currentShowcase.label}
              </p>
              <h2 className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl">
                {currentShowcase.title}
              </h2>
              <div className="mt-3 flex items-center gap-2">
                {showcaseExamples.map((example, index) => (
                  <button
                    key={example.src}
                    type="button"
                    aria-label={`Show ${example.title}`}
                    aria-current={index === currentExample ? "true" : undefined}
                    onClick={() => setCurrentExample(index)}
                    className={`focus-ring h-2.5 rounded-full transition-all ${
                      index === currentExample
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
                <button
                  type="button"
                  aria-label={
                    isShowcaseAutoplayEnabled
                      ? "Pause automatic slideshow"
                      : "Play automatic slideshow"
                  }
                  title={
                    isShowcaseAutoplayEnabled ? "Pause slideshow" : "Play slideshow"
                  }
                  onClick={() =>
                    setIsShowcaseAutoplayEnabled((isEnabled) => !isEnabled)
                  }
                  className="focus-ring ml-1 grid size-7 place-items-center rounded-full bg-white/15 text-white/85 transition hover:bg-white/25 hover:text-white"
                >
                  <Icon
                    name={isShowcaseAutoplayEnabled ? "pause" : "play"}
                    className="size-3.5"
                  />
                </button>
              </div>
            </div>
            <p
              className="sr-only"
              aria-live={isShowcaseAutoplayEnabled ? "off" : "polite"}
            >
              Showing {currentShowcase.title}
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:mx-0 lg:max-w-4xl">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 sm:border-r sm:border-[#ECEFF5] sm:pr-6 last:sm:border-r-0 lg:pr-8"
            >
              <div className="grid size-12 shrink-0 place-items-center text-[#2F6BFF]">
                <Icon name={feature.icon} className="size-8" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#18181B]">
                  {feature.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#555555]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8FAFD] py-20 sm:py-24 lg:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#2F6BFF] sm:text-[13px]">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
              What We Offer
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div className="rounded-lg border border-[#ECEFF5] bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_10px_30px_rgba(47,107,255,0.10)]">
              <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                <Icon name="cube" className="size-10" />
              </div>
              <h3 className="mt-6 text-base font-extrabold text-[#18181B]">
                Printing services
              </h3>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#555555]">
                {selectedService.description}
              </p>
              <div
                className="mt-5 grid grid-cols-2 gap-1 rounded-lg bg-[#F8FAFD] p-1"
                role="group"
                aria-label="Printing service type"
              >
                {printServiceOptions.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={service.id === selectedPrintService}
                    onClick={() => setSelectedPrintService(service.id)}
                    className={`focus-ring min-h-10 rounded-md px-3 text-sm font-extrabold transition ${
                      service.id === selectedPrintService
                        ? "bg-[#2F6BFF] text-white shadow-[0_8px_18px_rgba(47,107,255,0.22)]"
                        : "text-[#555555] hover:bg-white hover:text-[#2F6BFF]"
                    }`}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#ECEFF5] bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_10px_30px_rgba(47,107,255,0.10)]">
              <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                <Icon name="layers" className="size-10" />
              </div>
              <h3 className="mt-6 text-base font-extrabold text-[#18181B]">
                Material Options
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#555555]">
                Available choices for {selectedService.label}.
              </p>
              <div className="mt-5 flex min-h-[92px] flex-wrap items-center justify-center gap-2">
                {selectedService.materials.map((material) => (
                  <span
                    key={material}
                    className="rounded-full border border-[#ECEFF5] bg-[#F8FAFD] px-3 py-2 text-xs font-extrabold text-[#18181B]"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#ECEFF5] bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_10px_30px_rgba(47,107,255,0.10)]">
              <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                <Icon name="spark" className="size-10" />
              </div>
              <h3 className="mt-6 text-base font-extrabold text-[#18181B]">
                Color Choices
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#555555]">
                Available choices for {selectedService.label}.
              </p>
              <div className="mt-5 flex min-h-[92px] flex-wrap items-center justify-center gap-2">
                {selectedService.colors.map((color) => (
                  <span
                    key={color.name}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ECEFF5] bg-[#F8FAFD] px-3 py-2 text-xs font-extrabold text-[#18181B]"
                  >
                    <span
                      className="size-4 rounded-full border border-[#D9DEE8]"
                      style={{ backgroundColor: color.value }}
                      aria-hidden="true"
                    />
                    {color.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#ECEFF5] bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_10px_30px_rgba(47,107,255,0.10)]">
              <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                <Icon name="package" className="size-10" />
              </div>
              <h3 className="mt-6 text-base font-extrabold text-[#18181B]">
                Pickup & Shipping
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#555555]">
                Local pickup or shipping after your quote is approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="container-page py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#2F6BFF] sm:text-[13px]">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
            Four Simple Steps
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 ? (
                <div className="absolute left-[calc(50%+3rem)] top-10 hidden h-px w-[calc(100%-6rem)] border-t border-dashed border-[#ECEFF5] lg:block" />
              ) : null}
              <div className="relative z-10 mx-auto grid size-20 place-items-center rounded-full bg-[#EAF2FF] text-[#2F6BFF]">
                <span className="absolute -top-2 right-1 grid size-6 place-items-center rounded-full bg-[#2F6BFF] text-xs font-extrabold text-white">
                  {index + 1}
                </span>
                <Icon name={step.icon} className="size-8" />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-[#18181B]">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-44 text-sm leading-6 text-[#555555]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="container-page pb-8 pt-0 sm:pb-12">
        <div className="overflow-hidden rounded-lg border border-[#ECEFF5] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[0.31fr_0.69fr]">
            <aside className="bg-[#F8FAFD] p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
                Get
                <br />
                Support
              </h2>
              <div className="mt-7 h-1 w-10 rounded-full bg-[#2F6BFF]" />
              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Questions about 3D printing?
                <br />
                We are here to help.
              </p>
              <div className="mt-12 border-t border-[#ECEFF5] pt-8 text-sm sm:mt-20 lg:mt-28">
                <p className="font-extrabold text-[#18181B]">
                  Need urgent help?
                </p>
                <a
                  className="focus-ring mt-2 inline-flex rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                  href={`mailto:${contactEmail}`}
                  onClick={handleEmailClick}
                >
                  {contactEmail}
                </a>
                <p className="mt-4 leading-6 text-[#7A7A7A]">
                  We typically reply within 24 hours on business days.
                </p>
                {emailNotice ? (
                  <p className="mt-3 text-xs font-semibold leading-5 text-[#555555]" aria-live="polite">
                    {emailNotice}
                  </p>
                ) : null}
              </div>
            </aside>

            <div className="grid content-center gap-6 p-6 sm:p-8 lg:p-10">
              <div className="p-0 sm:p-2 lg:p-4">
                <h3 className="max-w-xl text-3xl font-extrabold leading-[1.08] text-[#18181B] sm:text-5xl">
                  Tell us how we
                  <br />
                  can help<span className="text-[#2F6BFF]">.</span>
                </h3>
                <p className="mt-6 max-w-lg text-base leading-7 text-[#555555]">
                  Fill out the support form with as much detail as possible. You
                  can also upload files or screenshots to help us understand your
                  question better.
                </p>
                <a
                  href={supportFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-7 inline-flex min-h-[56px] w-full min-w-0 items-center justify-between gap-6 rounded-lg bg-[#2F6BFF] px-6 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6] sm:w-auto sm:min-w-72 sm:px-7"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon name="mail" className="size-5" />
                    Open Support Form
                  </span>
                  <span aria-hidden="true">-&gt;</span>
                </a>
                <p className="mt-5 text-xs font-semibold text-[#7A7A7A]">
                  Secure &nbsp;&middot;&nbsp; Powered by Google Forms
                </p>
              </div>

              <div className="mt-4 border-t border-[#ECEFF5] pt-8">
                <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    title: "Upload Files",
                    description: "STL, images, or screenshots",
                    icon: "upload" as IconName
                  },
                  {
                    title: "Quick Response",
                    description: "We typically reply within 24 hours",
                    icon: "bolt" as IconName
                  },
                  {
                    title: "Expert Advice",
                    description: "Get clear answers from our team",
                    icon: "mail" as IconName
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-[#ECEFF5] sm:border-r sm:pr-6 last:sm:border-r-0 lg:pr-8"
                  >
                    <div className="text-[#2F6BFF]">
                      <Icon name={item.icon} className="size-9" />
                    </div>
                    <h4 className="mt-5 text-base font-extrabold text-[#18181B]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#555555]">
                      {item.description}
                    </p>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex flex-col gap-3 py-8 text-center text-sm font-semibold text-[#7A7A7A] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>Copyright {new Date().getFullYear()} Printly. All rights reserved.</span>
          <a
            className="focus-ring break-all rounded-lg px-3 py-2 hover:bg-[#EAF2FF] hover:text-[#2F6BFF]"
            href={`mailto:${contactEmail}`}
            onClick={handleEmailClick}
          >
            {contactEmail}
          </a>
        </footer>
      </section>
    </main>
  );
}

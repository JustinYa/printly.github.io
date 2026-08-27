"use client";

import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const quoteFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdqbuDsPwCyFewc5asZn3jofF2rcWo1aD5FYC54Amrs8gEOTw/viewform?usp=publish-editor";

type PrintServiceId = "fdm" | "resin";
type QuoteIconName =
  | "cube"
  | "layers"
  | "spark"
  | "package"
  | "upload"
  | "mail"
  | "check";

const printServiceOptions: Array<{
  id: PrintServiceId;
  label: string;
  description: string;
  materials: string[];
  colors: Array<{ name: string; value: string }>;
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

const steps: Array<{
  title: string;
  description: string;
  icon: QuoteIconName;
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

function QuoteIcon({ name, className = "size-7" }: { name: QuoteIconName; className?: string }) {
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
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <path d="m6 6 2.4 2.4M15.6 15.6 18 18M18 6l-2.4 2.4M8.4 15.6 6 18" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
          <path d="M4.4 6.7 12 11l7.6-4.3M12 11v9" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4m-5 5 5-5 5 5M5 20h14" />
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
  }
}

export function QuotePage() {
  const [selectedPrintService, setSelectedPrintService] =
    useState<PrintServiceId>("fdm");
  const selectedService =
    printServiceOptions.find((service) => service.id === selectedPrintService) ??
    printServiceOptions[0];
  const isResinComingSoon = selectedPrintService === "resin";

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#18181B]">
      <SiteHeader activePage="quote" />

      <section className="container-page grid gap-8 py-12 sm:gap-10 sm:py-20 lg:grid-cols-[0.58fr_0.42fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2F6BFF]">
            Quote
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Start Your Next Print
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#555555] sm:text-lg">
            Tell us what you need, upload your model, and we will review the details before sending a clear quote.
          </p>
          <a
            href={quoteFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6]"
          >
            <QuoteIcon name="upload" className="size-5" />
            Upload Your Model
          </a>
        </div>
        <div className="rounded-lg border border-[#E3E8F0] bg-[#F8FAFD] p-6 shadow-soft sm:p-9">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2F6BFF]">
            Before You Submit
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-[#555555]">
            <li><strong className="text-[#18181B]">File types:</strong> STL, 3MF, OBJ, STEP, or ZIP</li>
            <li><strong className="text-[#18181B]">Include:</strong> dimensions, material preferences, quantity, and deadline</li>
            <li><strong className="text-[#18181B]">Response:</strong> typically within 24 hours on business days</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#F8FAFD] py-16 sm:py-24 lg:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2F6BFF]">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              What We Offer
            </h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div className="rounded-lg border border-[#ECEFF5] bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] sm:p-8">
              <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                <QuoteIcon name="cube" className="size-10" />
              </div>
              <h3 className="mt-6 text-base font-extrabold">Printing Services</h3>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#555555]">
                {selectedService.description}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-1 rounded-lg bg-[#F8FAFD] p-1" role="group" aria-label="Printing service type">
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

            <OptionCard comingSoon={isResinComingSoon} icon="layers" title="Material Options">
              <p className="mt-3 text-sm leading-6 text-[#555555]">
                Available choices for {selectedService.label}.
              </p>
              <div className="mt-5 flex min-h-[92px] flex-wrap items-center justify-center gap-2">
                {selectedService.materials.map((material) => (
                  <span key={material} className="rounded-full border border-[#ECEFF5] bg-[#F8FAFD] px-3 py-2 text-xs font-extrabold">
                    {material}
                  </span>
                ))}
              </div>
            </OptionCard>

            <OptionCard comingSoon={isResinComingSoon} icon="spark" title="Color Choices">
              <p className="mt-3 text-sm leading-6 text-[#555555]">
                Available choices for {selectedService.label}.
              </p>
              <div className="mt-5 flex min-h-[92px] flex-wrap items-center justify-center gap-2">
                {selectedService.colors.map((color) => (
                  <span key={color.name} className="inline-flex items-center gap-2 rounded-full border border-[#ECEFF5] bg-[#F8FAFD] px-3 py-2 text-xs font-extrabold">
                    <span className="size-4 rounded-full border border-[#D9DEE8]" style={{ backgroundColor: color.value }} aria-hidden="true" />
                    {color.name}
                  </span>
                ))}
              </div>
            </OptionCard>

            <div className="rounded-lg border border-[#ECEFF5] bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] sm:p-8">
              <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                <QuoteIcon name="package" className="size-10" />
              </div>
              <h3 className="mt-6 text-base font-extrabold">Pickup &amp; Shipping</h3>
              <p className="mt-3 text-sm leading-6 text-[#555555]">
                Local pickup or shipping after your quote is approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#2F6BFF]">How It Works</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Four Simple Steps</h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 ? (
                <div className="absolute left-[calc(50%+3rem)] top-10 hidden h-px w-[calc(100%-6rem)] border-t border-dashed border-[#ECEFF5] lg:block" />
              ) : null}
              <div className="relative z-10 mx-auto grid size-20 place-items-center rounded-full bg-[#EAF2FF] text-[#2F6BFF]">
                <span className="absolute -top-2 right-1 grid size-6 place-items-center rounded-full bg-[#2F6BFF] text-xs font-extrabold text-white">
                  {index + 1}
                </span>
                <QuoteIcon name={step.icon} className="size-8" />
              </div>
              <h3 className="mt-4 text-base font-extrabold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-44 text-sm leading-6 text-[#555555]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function OptionCard({
  comingSoon,
  icon,
  title,
  children
}: {
  comingSoon: boolean;
  icon: QuoteIconName;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#ECEFF5] bg-white text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF]">
      <div className={`p-6 transition duration-300 sm:p-8 ${comingSoon ? "opacity-30 grayscale" : "opacity-100"}`}>
        <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
          <QuoteIcon name={icon} className="size-10" />
        </div>
        <h3 className="mt-6 text-base font-extrabold">{title}</h3>
        {children}
      </div>
      {comingSoon ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#18181B]/10 backdrop-blur-[1px]">
          <span className="rounded-full border border-[#D7E4FF] bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#2F6BFF] shadow-soft">
            Coming Soon
          </span>
        </div>
      ) : null}
    </div>
  );
}

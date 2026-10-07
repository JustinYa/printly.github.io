"use client";

import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const quoteFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdqbuDsPwCyFewc5asZn3jofF2rcWo1aD5FYC54Amrs8gEOTw/viewform?usp=publish-editor";

type PrintServiceId = "fdm" | "resin";

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
    description: "For functional prototypes, replacement parts, fixtures, and housings.",
    materials: ["PLA", "PETG", "ABS", "ASA", "TPU"],
    colors: [
      { name: "Black", value: "#18181B" },
      { name: "White", value: "#FFFFFF" },
      { name: "Green", value: "#22C55E" },
      { name: "Red", value: "#EF4444" },
      { name: "Blue", value: "#006DFD" },
      { name: "Purple", value: "#8B5CF6" },
      { name: "Gold", value: "#D4A017" },
      { name: "Copper", value: "#B87333" }
    ]
  },
  {
    id: "resin",
    label: "Resin",
    description: "For detailed figures, display models, and small prototypes.",
    materials: ["Standard", "Tough", "Flexible", "High-detail"],
    colors: [
      { name: "Black", value: "#18181B" },
      { name: "White", value: "#FFFFFF" },
      { name: "Gray", value: "#8A8F98" }
    ]
  }
];

const steps = [
  { title: "Send the files", description: "Upload your model and tell us the size, quantity, and intended use." },
  { title: "Review the quote", description: "We check the files, discuss materials, and confirm the price with you." },
  { title: "Approve production", description: "Printing starts after you approve the quote and project details." },
  { title: "Collect your parts", description: "Arrange local pickup or shipping when the order is ready." }
];

export function QuotePage() {
  const [selectedPrintService, setSelectedPrintService] =
    useState<PrintServiceId>("fdm");
  const selectedService =
    printServiceOptions.find((service) => service.id === selectedPrintService) ??
    printServiceOptions[0];
  const isResinComingSoon = selectedPrintService === "resin";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F3F5F7] text-[#111318]">
      <SiteHeader activePage="quote" />

      <section className="container-page page-intro grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow">Request a quote</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Let’s look at your project.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#535B68]">
            Send a print-ready file, a drawing, or photos of the part you need.
            We’ll review the dimensions, material, and quantity before quoting.
          </p>
          <a
            href={quoteFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-button mt-7"
          >
            Upload your model <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-3 text-xs leading-5 text-[#6A7380]">
            Opens our project form in a new tab.
          </p>
        </div>

        <aside className="brand-panel self-start p-6 sm:p-7">
          <h2 className="text-base font-semibold">What to include</h2>
          <dl className="mt-5 space-y-5 text-sm leading-6">
            <div>
              <dt className="font-semibold">Files or references</dt>
              <dd className="mt-1 text-[#535B68]">STL, 3MF, OBJ, STEP, or ZIP. Include drawings or photos if you need CAD design.</dd>
            </div>
            <div>
              <dt className="font-semibold">Part requirements</dt>
              <dd className="mt-1 text-[#535B68]">Dimensions, quantity, material preference, and deadline.</dd>
            </div>
            <div className="border-t border-[#D8DDE5] pt-4">
              <dt className="font-semibold">Response time</dt>
              <dd className="mt-1 text-[#535B68]">Typically within 24 hours on business days.</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="border-y border-[#D8DDE5] bg-white py-10 sm:py-14">
        <div className="container-page">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="eyebrow">Printing options</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Choose a process.</h2>
            </div>
            <div className="inline-flex border border-[#D8DDE5] p-1" role="group" aria-label="Printing service type">
              {printServiceOptions.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={service.id === selectedPrintService}
                  onClick={() => setSelectedPrintService(service.id)}
                  className={`focus-ring min-h-11 px-5 text-sm font-semibold transition-colors ${
                    service.id === selectedPrintService
                      ? "bg-[#006DFD] text-white"
                      : "text-[#535B68] hover:bg-[#F3F5F7] hover:text-[#111318]"
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-7 border-t border-[#D8DDE5] pt-7 lg:grid-cols-[1fr_1fr_1.2fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-base font-semibold">{selectedService.label} printing</h3>
                {isResinComingSoon ? (
                  <span className="border border-[#D8DDE5] bg-[#F3F5F7] px-2 py-1 text-xs font-semibold text-[#535B68]">Coming soon</span>
                ) : null}
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#535B68]">{selectedService.description}</p>
              <p className="mt-3 text-sm leading-6 text-[#535B68]">
                {isResinComingSoon
                  ? "Resin material and color options will be available when this service launches."
                  : "Not sure which material to use? Tell us how the part will be used."}
              </p>
            </div>

            <div className={isResinComingSoon ? "opacity-50" : ""}>
              <h3 className="text-base font-semibold">Materials</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedService.materials.map((material) => (
                  <span key={material} className="border border-[#D8DDE5] bg-[#F3F5F7] px-3 py-2 text-xs font-medium">{material}</span>
                ))}
              </div>
            </div>

            <div className={isResinComingSoon ? "opacity-50" : ""}>
              <h3 className="text-base font-semibold">Colors</h3>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {selectedService.colors.map((color) => (
                  <span key={color.name} className="inline-flex items-center gap-2 text-xs text-[#535B68]">
                    <span className="size-3 border border-[#D8DDE5]" style={{ backgroundColor: color.value }} aria-hidden="true" />
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <p className="eyebrow">From quote to delivery</p>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-[#D8DDE5] pt-4">
              <span className="text-xs font-medium text-[#0057CB]">0{index + 1}</span>
              <h2 className="mt-3 text-base font-semibold">{step.title}</h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#535B68]">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}

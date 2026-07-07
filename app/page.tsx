"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useState } from "react";

const contactEmail = "contact.printlylab@gmail.com";
const quoteFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdqbuDsPwCyFewc5asZn3jofF2rcWo1aD5FYC54Amrs8gEOTw/viewform?usp=publish-editor";
const siteBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/printly.github.io" : "");

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
  | "check";

const featureHighlights: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "High Quality",
    description: "Precision FDM prints",
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

const services: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "FDM 3D Printing",
    description: "Strong, durable parts with practical layer control.",
    icon: "cube"
  },
  {
    title: "Material Options",
    description: "PLA, PETG, ABS, ASA, and TPU for different uses.",
    icon: "layers"
  },
  {
    title: "Color Choices",
    description: "Pick standard colors or describe a custom filament.",
    icon: "spark"
  },
  {
    title: "Pickup & Shipping",
    description: "Local pickup or shipping after your quote is approved.",
    icon: "package"
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
    description: "Once approved, we produce your FDM order.",
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
    default:
      return null;
  }
}

export default function Home() {
  const [emailNotice, setEmailNotice] = useState("");

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
    <main id="top" className="min-h-screen overflow-hidden bg-white text-[#18181B]">
      <header className="container-page flex py-8">
        <Image
          src={assetPath("/images/printly-logo-transparent.png")}
          alt="Printly"
          width={1242}
          height={388}
          priority
          sizes="288px"
          className="h-auto w-56 object-contain sm:w-64 lg:w-72"
        />
      </header>

      <section className="container-page grid gap-12 pb-16 pt-0 lg:grid-cols-[0.45fr_0.55fr] lg:items-start lg:pb-24 lg:pt-0">
        <div>
          <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
            FDM 3D Printing
          </p>
          <h1 className="mt-5 max-w-[28rem] text-3xl font-extrabold leading-[1.08] text-[#18181B] sm:text-4xl">
            Custom FDM
            <br />
            Printing.
            <br />
            <span className="text-[#2F6BFF]">Made Simple.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-[1.6] text-[#555555] sm:text-lg">
            Upload your model, choose your options, and we will take care of the
            rest with a clear quote before printing.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={quoteFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6]"
            >
              <Icon name="upload" className="size-5" />
              Upload Your Model
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[40rem] lg:ml-auto">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={assetPath("/images/fdm-studio-hero.png")}
              alt="FDM 3D printing studio with a printer producing a blue part"
              width={1448}
              height={1086}
              priority
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="grid max-w-4xl gap-8 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 md:border-r md:border-[#ECEFF5] md:pr-8 last:md:border-r-0"
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

      <section className="bg-[#F8FAFD] py-24 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
              What We Offer
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-[#ECEFF5] bg-white p-8 text-center shadow-soft transition hover:-translate-y-1 hover:border-[#2F6BFF] hover:shadow-[0_10px_30px_rgba(47,107,255,0.10)]"
              >
                <div className="mx-auto grid size-14 place-items-center text-[#2F6BFF]">
                  <Icon name={service.icon} className="size-10" />
                </div>
                <h3 className="mt-6 text-base font-extrabold text-[#18181B]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#555555]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="container-page py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
            Four Simple Steps
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < steps.length - 1 ? (
                <div className="absolute left-[calc(50%+3rem)] top-10 hidden h-px w-[calc(100%-6rem)] border-t border-dashed border-[#ECEFF5] md:block" />
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

      <section id="quote" className="container-page pb-10 pt-4 sm:pb-12">
        <div className="overflow-hidden rounded-lg border border-[#ECEFF5] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[0.31fr_0.69fr]">
            <aside className="bg-[#F8FAFD] p-8 sm:p-10">
              <h2 className="text-3xl font-extrabold leading-tight text-[#18181B] sm:text-4xl">
                Get Started
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#555555]">
                Fill out the form and upload your model. We will get back to you
                with a clear FDM quote.
              </p>
              <div className="mt-9 grid gap-3">
                {["Quote first", "Pickup or shipping"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-[#ECEFF5] bg-white px-4 py-3 text-sm font-extrabold text-[#18181B]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-2 text-sm">
                <p className="font-semibold text-[#7A7A7A]">
                  Need help before submitting?
                </p>
                <a
                  className="focus-ring inline-flex rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                  href={`mailto:${contactEmail}`}
                  onClick={handleEmailClick}
                >
                  {contactEmail}
                </a>
                {emailNotice ? (
                  <p className="text-xs font-semibold leading-5 text-[#555555]" aria-live="polite">
                    {emailNotice}
                  </p>
                ) : null}
              </div>
            </aside>

            <div className="grid content-center gap-6 p-6 sm:p-8">
              <div className="rounded-lg border border-[#ECEFF5] bg-[#F8FAFD] p-6 sm:p-8">
                <p className="text-[13px] font-extrabold uppercase text-[#2F6BFF]">
                  Google Forms Quote Request
                </p>
                <h3 className="mt-3 text-3xl font-extrabold leading-tight text-[#18181B]">
                  Submit your model and details.
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#555555]">
                  The quote form opens in a new tab. You can enter your contact
                  details, material, color, pickup or shipping preference, and
                  upload model files directly through Google Forms.
                </p>
                <a
                  href={quoteFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6]"
                >
                  <Icon name="upload" className="size-5" />
                  Open Quote Form
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  "Upload STL, 3MF, OBJ, STEP, or ZIP files",
                  "Responses are saved through Google Forms",
                  "We reply with a clear quote before printing"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-[#ECEFF5] bg-white p-4 text-sm font-semibold leading-6 text-[#555555]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex flex-col gap-3 py-8 text-sm font-semibold text-[#7A7A7A] sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright {new Date().getFullYear()} Printly. All rights reserved.</span>
          <a
            className="focus-ring rounded-lg px-3 py-2 hover:bg-[#EAF2FF] hover:text-[#2F6BFF]"
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

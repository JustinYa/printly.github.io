"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const contactEmail = "contact.printlylab@gmail.com";
const contactPhone = "(920) 840-5302";
const instagramUrl = "https://www.instagram.com/theprintlylab/?hl=en";
const supportFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdy8woehAlDrSA1wL-Ksqe0MGnCQ2zHcIV5OfGymYANGYE_tA/viewform?usp=publish-editor";

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

function ContactIcon({ name }: { name: "mail" | "upload" | "bolt" }) {
  const common = {
    className: "size-8",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };

  if (name === "mail") {
    return (
      <svg {...common}>
        <rect width="18" height="14" x="3" y="5" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  if (name === "upload") {
    return (
      <svg {...common}>
        <path d="M12 16V4m-5 5 5-5 5 5M5 20h14" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />
    </svg>
  );
}

export function ContactPage() {
  const [emailNotice, setEmailNotice] = useState("");

  function handleEmailClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();

    void copyTextToClipboard(contactEmail).then((copied) => {
      setEmailNotice(
        copied
          ? "Email copied. If nothing opened, paste it into your email app."
          : "If nothing opened, copy this address into your email app."
      );
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#18181B]">
      <SiteHeader activePage="contact" />

      <section className="container-page flex min-h-[156px] flex-col justify-center text-left sm:min-h-[204px] lg:min-h-[228px] lg:text-center">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          How Can We Help?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#555555] sm:text-lg lg:mx-auto">
          Ask a question about your model, material, order, or the printing process.
        </p>
      </section>

      <section className="container-page pb-16 sm:pb-24 lg:pb-28">
        <div className="overflow-hidden rounded-lg border border-[#ECEFF5] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
            <aside className="bg-[#F8FAFD] p-6 sm:p-10 lg:p-12">
              <h2 className="text-xl font-extrabold leading-tight sm:text-2xl">
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
              <div className="mt-8 border-t border-[#ECEFF5] pt-6 text-sm sm:mt-14 sm:pt-8 lg:mt-24">
                <div>
                  <p className="font-extrabold">Instagram</p>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring mt-2 inline-flex rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                  >
                    @theprintlylab
                  </a>
                </div>
                <div className="mt-5 sm:mt-6">
                  <p className="font-extrabold">Phone</p>
                  <a
                    className="focus-ring mt-2 inline-flex rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                    href="tel:+19208405302"
                  >
                    {contactPhone}
                  </a>
                </div>
                <div className="mt-5 sm:mt-6">
                <p className="font-extrabold">Need urgent help?</p>
                <a
                  className="focus-ring mt-2 inline-flex break-all rounded-lg font-extrabold text-[#2F6BFF] hover:text-[#1F5AF6]"
                  href={`mailto:${contactEmail}`}
                  onClick={handleEmailClick}
                >
                  {contactEmail}
                </a>
                </div>
                {emailNotice ? (
                  <p className="mt-3 text-xs font-semibold leading-5 text-[#555555]" aria-live="polite">
                    {emailNotice}
                  </p>
                ) : null}
              </div>
            </aside>

            <div className="grid content-center gap-6 p-6 sm:gap-8 sm:p-10 lg:p-14">
              <div>
                <h2 className="max-w-xl text-xl font-extrabold leading-tight sm:text-2xl">
                  Tell us how we
                  <br />
                  can help<span className="text-[#2F6BFF]">.</span>
                </h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-[#555555] sm:mt-6">
                  Fill out the support form with as much detail as possible. You can also upload files or screenshots to help us understand your question better.
                </p>
                <a
                  href={supportFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-6 inline-flex min-h-[56px] w-full items-center justify-between gap-3 rounded-lg bg-[#2F6BFF] px-4 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6] sm:mt-7 sm:w-auto sm:min-w-72 sm:gap-6 sm:px-6"
                >
                  <span className="inline-flex items-center gap-3">
                    <ContactIcon name="mail" />
                    Open Support Form
                  </span>
                  <span aria-hidden="true">-&gt;</span>
                </a>
                <p className="mt-5 text-xs font-semibold text-[#7A7A7A]">
                  Secure &nbsp;&middot;&nbsp; Powered by Google Forms
                </p>
              </div>

              <div className="border-t border-[#ECEFF5] pt-8">
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { title: "Upload Files", description: "STL, images, or screenshots", icon: "upload" as const },
                    { title: "Quick Response", description: "Typically within 24 hours", icon: "bolt" as const },
                    { title: "Expert Advice", description: "Clear answers from our team", icon: "mail" as const }
                  ].map((item) => (
                    <div key={item.title} className="border-[#ECEFF5] sm:border-r sm:pr-5 last:sm:border-r-0">
                      <div className="text-[#2F6BFF]"><ContactIcon name={item.icon} /></div>
                      <h3 className="mt-4 text-sm font-extrabold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#555555]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

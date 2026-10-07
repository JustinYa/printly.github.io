"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const contactEmail = "contact.printlylab@gmail.com";
const contactPhone = "+1 (920) 840-5302";
const contactLocation = "Oshkosh, WI";
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
    <main className="min-h-screen overflow-x-hidden bg-[#F3F5F7] text-[#111318]">
      <SiteHeader activePage="contact" />

      <section className="container-page page-intro py-12 sm:py-16">
        <p className="eyebrow">Contact the studio</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Talk to us about your part.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#535B68]">
          Need a model made, a part replaced, or advice on a print?
          Send us the details. For an existing order, include your name and project reference.
        </p>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <div className="grid gap-8 border-t border-[#D8DDE5] pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-10">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Get in touch</h2>
            <dl className="mt-6 space-y-6 text-sm leading-6">
              <div>
                <dt className="text-[#6A7380]">Email</dt>
                <dd className="mt-1">
                  <a className="text-link break-all" href={`mailto:${contactEmail}`} onClick={handleEmailClick}>
                    {contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[#6A7380]">Phone</dt>
                <dd className="mt-1">
                  <a className="text-link" href="tel:+19208405302">{contactPhone}</a>
                </dd>
              </div>
              <div>
                <dt className="text-[#6A7380]">Studio location</dt>
                <dd className="mt-1">{contactLocation}</dd>
              </div>
              <div>
                <dt className="text-[#6A7380]">Instagram</dt>
                <dd className="mt-1">
                  <a className="text-link" href={instagramUrl} target="_blank" rel="noopener noreferrer">@theprintlylab <span aria-hidden="true">↗</span></a>
                </dd>
              </div>
            </dl>
            {emailNotice ? (
              <p className="mt-4 max-w-sm text-xs leading-5 text-[#535B68]" aria-live="polite">{emailNotice}</p>
            ) : null}
          </div>

          <div className="brand-panel self-start p-6 sm:p-8">
            <p className="eyebrow">Project &amp; order questions</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">Send the details.</h2>
            <p className="mt-4 text-sm leading-6 text-[#535B68]">
              Use the support form to explain what you need and attach a model,
              photos, or screenshots. We typically reply within 24 hours on business days.
            </p>
            <a className="studio-button mt-6" href={supportFormUrl} target="_blank" rel="noopener noreferrer">
              Open support form <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-3 text-xs leading-5 text-[#6A7380]">Opens Google Forms in a new tab.</p>

            <div className="mt-7 border-t border-[#D8DDE5] pt-5">
              <p className="text-sm leading-6 text-[#535B68]">Ready to send a model for pricing?</p>
              <Link className="text-link mt-2 inline-flex" href="/quote/">Request a quote <span className="ml-2" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const quoteFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdqbuDsPwCyFewc5asZn3jofF2rcWo1aD5FYC54Amrs8gEOTw/viewform?usp=publish-editor";
const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

export function ProjectDetail({ project }: { project: Project }) {
  const projectSections = [
    { number: "01", title: "Challenge", content: project.challenge },
    { number: "02", title: "Approach", content: project.approach },
    { number: "03", title: "Result", content: project.result }
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#18181B]">
      <header className="container-page flex items-center justify-between border-b border-[#ECEFF5] py-6 sm:py-8">
        <Link href="/" aria-label="Printly home" className="focus-ring">
          <Image
            src={assetPath("/images/printly-logo-transparent.png")}
            alt="Printly"
            width={1242}
            height={388}
            priority
            sizes="180px"
            className="h-auto w-40 object-contain sm:w-44"
          />
        </Link>
        <Link
          href="/"
          className="focus-ring text-xs font-extrabold uppercase tracking-[0.12em] text-[#555555] transition hover:text-[#2F6BFF]"
        >
          Back to Home
        </Link>
      </header>

      <section className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2F6BFF]">
            Selected Work / {project.service}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#555555]">
            {project.summary}
          </p>
          <p className="mt-8 border-l-2 border-[#2F6BFF] pl-4 text-sm font-bold text-[#555555]">
            {project.category}
          </p>
        </div>

        <div className="relative mx-auto aspect-[3/4] w-full max-w-[34rem] overflow-hidden rounded-lg bg-[#F8FAFD] lg:mr-0">
          <Image
            src={assetPath(project.coverImage)}
            alt={project.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[#ECEFF5]">
        <div className="container-page grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {project.specifications.map((specification) => (
            <div
              key={specification.label}
              className="border-b border-r border-[#ECEFF5] py-6 pr-4 last:border-r-0 md:py-8 lg:border-b-0 lg:px-5 first:lg:pl-0 last:lg:pr-0"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#7A7A7A]">
                {specification.label}
              </p>
              <p className="mt-2 text-sm font-extrabold leading-5 text-[#18181B]">
                {specification.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {projectSections.map((section) => (
            <article key={section.title} className="border-t border-[#DDE2EA] pt-6">
              <p className="text-xs font-extrabold text-[#2F6BFF]">{section.number}</p>
              <h2 className="mt-8 text-2xl font-extrabold">{section.title}</h2>
              <p className="mt-4 leading-7 text-[#555555]">{section.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F8FAFD] py-20 sm:py-24 lg:py-28">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2F6BFF]">
                Project Gallery
              </p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Closer Look</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-[#7A7A7A] sm:block">
              Additional project photography will be added here.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {project.gallery.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white"
              >
                <Image
                  src={assetPath(image.src)}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-[#DDE2EA] pt-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2F6BFF]">
              Have a Similar Project?
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
              Let&apos;s turn your next idea into a finished part.
            </h2>
          </div>
          <a
            href={quoteFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#2F6BFF] px-7 text-sm font-extrabold text-white shadow-blue transition hover:-translate-y-0.5 hover:bg-[#1F5AF6]"
          >
            Start a Similar Project
          </a>
        </div>
      </section>

      <footer className="border-t border-[#ECEFF5] py-8">
        <div className="container-page flex flex-col gap-2 text-xs font-semibold text-[#7A7A7A] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Printly. All rights reserved.</p>
          <p>Resin and FDM 3D Printing</p>
        </div>
      </footer>
    </main>
  );
}

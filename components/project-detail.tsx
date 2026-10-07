import Image from "next/image";
import type { Project } from "@/lib/projects";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

export function ProjectDetail({ project }: { project: Project }) {
  const usesLandscapeMedia = project.mediaLayout === "landscape";
  const projectSections = [
    { number: "01", title: "Challenge", content: project.challenge },
    { number: "02", title: "Approach", content: project.approach },
    { number: "03", title: "Result", content: project.result }
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#111318]">
      <SiteHeader activePage="projects" />

      <section className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.4fr_0.6fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="max-w-xl">
          <Link
            href="/projects/"
            className="text-link mb-5 inline-flex items-center gap-2"
          >
            <span aria-hidden="true" className="text-base leading-none">
              &larr;
            </span>
            Back to Projects
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#006DFD]">
            Selected Work / {project.service}
          </p>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#535B68]">
            {project.summary}
          </p>
          <p className="mt-8 border-l-2 border-[#006DFD] pl-4 text-sm font-semibold text-[#535B68]">
            {project.category}
          </p>
        </div>

        <div
          className={`brand-image relative mx-auto w-full overflow-hidden bg-[#F6F8FB] lg:mr-0 ${
            usesLandscapeMedia ? "aspect-[4/3] max-w-[40rem]" : "aspect-[3/4] max-w-[34rem]"
          }`}
        >
          <Image
            src={assetPath(project.coverImage)}
            alt={project.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 92vw"
            className={project.coverFit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      </section>

      <section className="border-y border-[#D8DDE5]">
        <div className="container-page grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {project.specifications.map((specification) => (
            <div
              key={specification.label}
              className="border-b border-r border-[#D8DDE5] py-6 pr-4 last:border-r-0 md:py-8 lg:border-b-0 lg:px-5 first:lg:pl-0 last:lg:pr-0"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6A7380]">
                {specification.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-5 text-[#111318]">
                {specification.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20 sm:py-24 lg:py-28">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {projectSections.map((section) => (
            <article key={section.title} className="border-t border-[#D8DDE5] pt-6">
              <p className="font-mono text-xs text-[#006DFD]">{section.number}</p>
              <h2 className="mt-8 text-2xl font-bold tracking-tight">{section.title}</h2>
              <p className="mt-4 leading-7 text-[#535B68]">{section.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8DDE5] bg-[#F6F8FB] py-20 sm:py-24 lg:py-28">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#006DFD]">
                Project Gallery
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Closer Look</h2>
            </div>
            <p className="hidden max-w-xs text-right text-sm leading-6 text-[#6A7380] sm:block">
              Additional project photography will be added here.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {project.gallery.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`brand-image relative overflow-hidden bg-white ${
                  usesLandscapeMedia ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={assetPath(image.src)}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 46vw, 92vw"
                  className={image.fit === "contain" ? "object-contain" : "object-cover"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-[#D8DDE5] pt-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#006DFD]">
              Have a Similar Project?
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Let&apos;s turn your next idea into a finished part.
            </h2>
          </div>
          <Link
            href="/quote/"
            className="studio-button"
          >
            Start a Similar Project
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

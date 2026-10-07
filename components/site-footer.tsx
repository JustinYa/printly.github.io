import Link from "next/link";

const contactEmail = "contact.printlylab@gmail.com";
const contactPhone = "+1 (920) 840-5302";
const contactLocation = "Oshkosh, WI";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#303640] bg-[#111318] py-8">
      <div className="container-page flex flex-col gap-6 text-sm text-[#CAD1DC] lg:flex-row lg:justify-between">
        <div>
          <p className="font-bold text-white">Printly · {contactLocation}</p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} Printly. All rights reserved.</p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 lg:justify-end">
          <Link className="focus-ring inline-flex min-h-11 items-center transition-colors hover:text-[#8FBAFF]" href="/contact/">
            Contact Us
          </Link>
          <a className="focus-ring inline-flex min-h-11 items-center transition-colors hover:text-[#8FBAFF]" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          <a className="focus-ring inline-flex min-h-11 items-center transition-colors hover:text-[#8FBAFF]" href="tel:+19208405302">
            {contactPhone}
          </a>
        </div>
      </div>
    </footer>
  );
}

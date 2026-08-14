import Link from "next/link";

const contactEmail = "contact.printlylab@gmail.com";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ECEFF5] py-8">
      <div className="container-page flex flex-col gap-3 text-center text-sm font-semibold text-[#7A7A7A] sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <span>Copyright {new Date().getFullYear()} Printly. All rights reserved.</span>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
          <Link className="transition hover:text-[#2F6BFF]" href="/contact/">
            Contact Us
          </Link>
          <a className="transition hover:text-[#2F6BFF]" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}

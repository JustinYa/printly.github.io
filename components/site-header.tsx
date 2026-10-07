import Image from "next/image";
import Link from "next/link";

export type SitePage = "home" | "projects" | "quote" | "contact";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const navigation: Array<{ label: string; href: string; page: SitePage }> = [
  { label: "Home", href: "/", page: "home" },
  { label: "Quote", href: "/quote/", page: "quote" },
  { label: "Projects", href: "/projects/", page: "projects" },
  { label: "Contact Us", href: "/contact/", page: "contact" }
];

function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}

export function SiteHeader({ activePage }: { activePage: SitePage }) {
  return (
    <header className="border-b border-[#E7EBF0] bg-white">
      <div className="container-page flex flex-col items-start justify-between gap-5 py-5 sm:flex-row sm:items-center sm:gap-8 sm:py-6">
        <Link href="/" aria-label="Printly home" className="focus-ring shrink-0">
          <Image
            src={assetPath("/images/printly-logo-transparent.png")}
            alt="Printly"
            width={6280}
            height={1716}
            priority
            sizes="(min-width: 640px) 176px, 152px"
            className="h-auto w-[152px] object-contain sm:w-44"
          />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="grid w-full grid-cols-4 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-7 lg:gap-9"
        >
          {navigation.map((item) => {
            const isActive = activePage === item.page;

            return (
              <Link
                key={item.page}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring flex min-h-11 items-center justify-center whitespace-nowrap border-b-[3px] py-2 text-center text-xs font-bold transition-colors sm:text-sm ${
                  isActive
                    ? "border-[#006DFD] text-[#111318]"
                    : "border-transparent text-[#535B68] hover:border-[#006DFD] hover:text-[#111318]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

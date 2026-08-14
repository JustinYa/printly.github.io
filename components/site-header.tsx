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
    <header className="relative overflow-hidden border-y border-[#E3E8F0] bg-gradient-to-r from-white via-[#FBFCFE] to-[#EEF4FF]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-55"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(47, 107, 255, 0.18) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(to right, black, transparent)"
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-[#2F6BFF]/10 blur-3xl"
      />
      <div className="container-page relative z-10 flex min-h-[148px] flex-col items-center justify-center gap-4 py-4 lg:min-h-[124px] lg:flex-row lg:justify-between lg:gap-8">
        <Link href="/" aria-label="Printly home" className="focus-ring rounded-lg">
          <Image
            src={assetPath("/images/printly-logo-transparent.png")}
            alt="Printly"
            width={1242}
            height={388}
            priority
            sizes="(min-width: 1024px) 234px, 192px"
            className="h-auto w-48 object-contain lg:w-[14.625rem]"
          />
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {navigation.map((item) => {
            const isActive = activePage === item.page;

            return (
              <Link
                key={item.page}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring rounded-md px-[0.8rem] py-2.5 text-center text-sm font-extrabold transition lg:px-[1.1rem] ${
                  isActive
                    ? "bg-[#2F6BFF] text-white shadow-[0_8px_18px_rgba(47,107,255,0.20)]"
                    : "text-[#555555] hover:bg-white hover:text-[#2F6BFF]"
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

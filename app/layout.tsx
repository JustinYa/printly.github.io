import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://printlylab.com"),
  title: "Printly | Resin and FDM 3D Printing",
  description:
    "Minimal resin and FDM 3D printing quote page. Upload your model, choose material and color, and request a quote.",
  keywords: [
    "FDM 3D printing",
    "resin 3D printing",
    "custom 3D prints",
    "PLA printing",
    "resin printing",
    "PETG printing",
    "prototype printing"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Script
          id="cloudflare-web-analytics"
          strategy="afterInteractive"
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({
            token: "6813786c43a141929f80ff4dd1d8ba88"
          })}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://justinya.github.io"),
  title: "Printly | FDM 3D Printing",
  description:
    "Minimal FDM 3D printing quote page. Upload your model, choose material and color, and request a quote.",
  keywords: [
    "FDM 3D printing",
    "custom 3D prints",
    "PLA printing",
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
      </body>
    </html>
  );
}

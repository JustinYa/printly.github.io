import type { Metadata } from "next";
import { QuotePage } from "@/components/quote-page";

export const metadata: Metadata = {
  title: "Request a Quote | Printly",
  description:
    "Review Printly 3D printing services, material options, and quote process, then upload your model.",
  alternates: {
    canonical: "/quote/"
  }
};

export default function QuoteRoute() {
  return <QuotePage />;
}

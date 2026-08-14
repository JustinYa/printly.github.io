import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | Printly",
  description:
    "Contact Printly for 3D printing support, file questions, and project guidance.",
  alternates: {
    canonical: "/contact/"
  }
};

export default function ContactRoute() {
  return <ContactPage />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newton Kamau – PHP/JavaScript Developer",
  description:
    "Newton Kamau is a skilled full-stack developer with deep expertise in PHP and JavaScript. He builds high-performance, secure, and scalable web applications — from dynamic dashboards to complex transaction systems — powering mobile and web platforms handling millions in value.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

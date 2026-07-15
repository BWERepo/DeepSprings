import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://deepsprings.businesswebexpress.com";
const SITE_NAME = "Deep Springs Discount Fabrics";
const SITE_DESCRIPTION =
  "Your down home shop for quality cotton quilting & crafting fabrics. 786 Haynes Road, Dandridge, TN. Open Monday through Saturday.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Quality 100% Cotton Quilting Fabrics`,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "quilting fabric",
    "cotton fabric shop",
    "Dandridge Tennessee",
    "discount fabrics",
    "crafting fabric",
    "fat quarters",
    "quilting cotton",
  ],
  openGraph: {
    title: `${SITE_NAME} — Quality 100% Cotton Quilting Fabrics`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Quality 100% Cotton Quilting Fabrics`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

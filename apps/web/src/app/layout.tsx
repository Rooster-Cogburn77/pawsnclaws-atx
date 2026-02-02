import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { siteConfig } from "@/data/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Austin",
    "animal rescue",
    "pet resources",
    "low-cost vet",
    "TNR",
    "community cats",
    "volunteer",
    "animal shelter",
  ],
  metadataBase: new URL("https://pawsandclawsatx.com"),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "PawsNClaws ATX",
  alternateName: "PawsNClaws",
  description: siteConfig.description,
  url: "https://pawsandclawsatx.com",
  logo: "https://pawsandclawsatx.com/logo.png",
  sameAs: [
    // Add social media URLs when available
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Austin", "@id": "https://www.wikidata.org/wiki/Q16559" },
    { "@type": "City", name: "Charlotte", "@id": "https://www.wikidata.org/wiki/Q16559" },
  ],
  nonprofitStatus: "Nonprofit501c3",
  foundingDate: "2024",
  keywords: "animal rescue, pet resources, TNR, community cats, Austin, Charlotte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollToTop />
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-amber-500 focus:text-white focus:px-4 focus:py-2 focus:m-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

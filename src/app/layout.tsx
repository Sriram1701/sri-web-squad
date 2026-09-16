import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PublicShell } from "@/components/layout/public-shell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sriwebsquad.com"),
  title: {
    default: "Sri Web Squad | AI-Powered Web & Custom Software Development Company",
    template: "%s | Sri Web Squad",
  },
  description: "Sri Web Squad is a leading digital agency & software company in Cuddalore, Tamil Nadu. We build high-performance Websites, Mobile Apps (Android/iOS), Custom ERP & POS Billing Software, Healthcare Portals, and AI-driven Digital Solutions at budget-friendly pricing.",
  keywords: [
    "Sri Web Squad",
    "Website Development Cuddalore",
    "Software Company in Cuddalore",
    "Web Design Pondicherry",
    "Custom Software Development India",
    "Mobile App Development",
    "Hospital Management Software",
    "Dental Clinic Website",
    "Gym Management Software",
    "Pawn Broker Software",
    "Supermarket POS Billing Software",
    "E-Commerce Website Development",
    "Next.js Developer India",
    "React Developer Tamil Nadu",
    "SEO Services Cuddalore",
    "Affordable Web Design Tamil Nadu"
  ],
  authors: [{ name: "Sri Web Squad Team", url: "https://sriwebsquad.com" }],
  creator: "Sri Web Squad",
  publisher: "Sri Web Squad",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sri Web Squad | AI-Powered Web & Custom Software Development",
    description: "Crafting high-speed Websites, Mobile Apps, and Custom Software with modern tech stacks at budget-friendly pricing.",
    url: "https://sriwebsquad.com",
    siteName: "Sri Web Squad",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Sri Web Squad - AI-Powered Web & Software Agency Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Web Squad | AI-Powered Web & Software Solutions",
    description: "High-performance Websites, Mobile Apps, and Custom Software crafted for your business growth.",
    images: ["/logo.png"],
    creator: "@sriwebsquad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" }
    ],
  },
};

// JSON-LD Structured Data for Rich Google Search Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
  "name": "Sri Web Squad",
  "legalName": "Sri Web Squad",
  "url": "https://sriwebsquad.com",
  "logo": "https://sriwebsquad.com/logo.png",
  "image": "https://sriwebsquad.com/logo.png",
  "description": "Sri Web Squad is an AI-powered software & web development agency providing custom websites, mobile applications, business software, ERP, POS billing systems, and SEO services.",
  "telephone": "+91-7845391712",
  "email": "sriwebsquad@gmail.com",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "36, Salt Office Road, Pachayankuppam, Cuddalore Old Town",
    "addressLocality": "Cuddalore",
    "addressRegion": "Tamil Nadu",
    "postalCode": "607003",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.7040456,
    "longitude": 79.7671579
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "sameAs": [
    "https://g.page/r/CTzTPZIQwxQlECE/review",
    "https://www.google.com/maps/place/Sri+Web+Squad/@11.7040456,79.7671579,17z"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "7",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital & Software Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Software Development",
          "description": "Tailored business software, clinical portals, gym check-in automation, and pawn loan management systems."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Development & UI/UX Design",
          "description": "High-speed, SEO-optimized business websites, clinical platforms, and B2B corporate portals."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile Application Development",
          "description": "Cross-platform iOS and Android native apps with live rates, push notifications, and customer ledgers."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Commerce Solutions & POS Billing",
          "description": "D2C online stores, supermarket thermal barcode POS billing software, and GST invoice automation."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO & Performance Marketing",
          "description": "Local SEO, Google My Business optimization, keyword rankings, and high-conversion marketing."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative bg-[#070b14]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PublicShell>
            {children}
          </PublicShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

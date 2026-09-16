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
  metadataBase: new URL("https://sriwebsquad.in"),
  title: {
    default: "Sri Web Squad | AI-Powered Web & Custom Software Development Company",
    template: "%s | Sri Web Squad",
  },
  description: "Sri Web Squad is a premier AI-powered software company and digital agency in Cuddalore, Tamil Nadu, India. We build high-speed Websites, Mobile Apps (Android & iOS), Custom ERP & CRM, POS Barcode Billing Software, Clinic Portals, and AI Solutions at budget-friendly pricing.",
  keywords: [
    "Sri Web Squad",
    "SriWebSquad",
    "sriwebsquad.in",
    "Custom Software Development",
    "Website Development Cuddalore",
    "Software Company in Cuddalore",
    "Web Design Pondicherry",
    "Custom Software Development India",
    "Mobile App Development Tamil Nadu",
    "Android App Development",
    "iOS App Development",
    "Hospital Management Software",
    "Dental Clinic Website",
    "Gym Management Software",
    "Pawn Broker Software",
    "Gold Loan Software",
    "Supermarket POS Billing Software",
    "GST Billing Software India",
    "E-Commerce Website Development",
    "Next.js Developer India",
    "React Developer Tamil Nadu",
    "AI Development Agency",
    "SEO Services Cuddalore",
    "Affordable Web Design Tamil Nadu"
  ],
  authors: [{ name: "Sri Web Squad Team", url: "https://sriwebsquad.in" }],
  creator: "Sri Web Squad",
  publisher: "Sri Web Squad",
  category: "technology",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://sriwebsquad.in",
  },
  openGraph: {
    title: "Sri Web Squad | AI-Powered Web & Custom Software Development",
    description: "Crafting high-speed Websites, Mobile Apps (iOS/Android), and Custom Software with modern tech stacks at budget-friendly pricing.",
    url: "https://sriwebsquad.in",
    siteName: "Sri Web Squad",
    images: [
      {
        url: "https://sriwebsquad.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sri Web Squad - AI-Powered Web & Custom Software Development Agency",
        type: "image/png",
      },
      {
        url: "https://sriwebsquad.in/logo.png",
        width: 800,
        height: 800,
        alt: "Sri Web Squad Logo",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Web Squad | AI-Powered Web & Custom Software Solutions",
    description: "High-performance Websites, Mobile Apps, and Custom Software crafted for your business growth.",
    site: "@sriwebsquad",
    creator: "@sriwebsquad",
    images: ["https://sriwebsquad.in/og-image.png"],
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
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Cuddalore, Tamil Nadu, India",
    "geo.position": "11.7040456;79.7671579",
    "ICBM": "11.7040456, 79.7671579",
    "rating": "General",
    "revisit-after": "7 days",
    "distribution": "Global",
  },
};

// Comprehensive JSON-LD Structured Data for Google, Gemini, ChatGPT & Social Crawlers
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sriwebsquad.in/#website",
      "url": "https://sriwebsquad.in",
      "name": "Sri Web Squad",
      "description": "AI-Powered Web & Custom Software Development Company",
      "publisher": {
        "@id": "https://sriwebsquad.in/#organization"
      },
      "inLanguage": "en-IN"
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
      "@id": "https://sriwebsquad.in/#organization",
      "name": "Sri Web Squad",
      "legalName": "Sri Web Squad",
      "alternateName": ["SriWebSquad", "Sri Web Squad Cuddalore", "Sri Web Squad Software Agency"],
      "url": "https://sriwebsquad.in",
      "logo": "https://sriwebsquad.in/logo.png",
      "image": "https://sriwebsquad.in/og-image.png",
      "description": "Sri Web Squad is a premier AI-powered software & web development agency in Cuddalore, Tamil Nadu, India. Providing custom business software, ERP, POS billing systems, modern web apps, and mobile applications.",
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
        "https://www.google.com/maps/place/Sri+Web+Squad/@11.7040456,79.7671579,17z",
        "https://g.page/r/CTzTPZIQwxQlECE/review",
        "https://facebook.com",
        "https://instagram.com",
        "https://linkedin.com",
        "https://youtube.com",
        "https://wa.me/917845391712"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "7",
        "bestRating": "5",
        "worstRating": "1"
      },
      "knowsAbout": [
        "Custom Software Development",
        "Website Design & Web Applications",
        "Mobile App Development (Android & iOS)",
        "Enterprise Resource Planning (ERP)",
        "POS Barcode Billing Software",
        "Hospital & Clinical Management Systems",
        "Gym Biometric Attendance Software",
        "Pawn Broker & Gold Loan Software",
        "Next.js and React Development",
        "Artificial Intelligence Solutions",
        "Search Engine Optimization (SEO)"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software & Digital Services",
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
              "name": "AI Solutions & Automation",
              "description": "Custom AI integrations, automated workflows, intelligent chatbots, and predictive analytics."
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
    }
  ]
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
        {/* OpenGraph & Facebook Specific Tags */}
        <meta property="og:site_name" content="Sri Web Squad" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Geo Meta Tags for Local SEO */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Cuddalore" />
        <meta name="geo.position" content="11.7040456;79.7671579" />
        <meta name="ICBM" content="11.7040456, 79.7671579" />
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

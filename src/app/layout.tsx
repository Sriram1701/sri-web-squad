import type { Metadata, Viewport } from "next";
import { Inter, Syne, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PublicShell } from "@/components/layout/public-shell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
    default: "Sri Web Squad | #1 Best Software Company in Cuddalore | Web Design & Mobile Apps",
    template: "%s | Sri Web Squad - Best Software Company in Cuddalore",
  },
  description: "Sri Web Squad, founded by Sriram, is the #1 premier AI-powered software company and web design agency in Cuddalore, Tamil Nadu. We build high-speed Websites, Android & iOS Mobile Apps, Custom ERP Billing Softwares, POS Systems, Clinic Portals, and Digital Growth Solutions at budget-friendly pricing.",
  keywords: [
    // Core Brand Keywords
    "Sri Web Squad",
    "SriWebSquad",
    "sriwebsquad.in",
    "Sriram",
    "Sriram Sri Web Squad",
    "Sriram Cuddalore",
    "Sriram software developer",
    "Sriram web designer",
    
    // Cuddalore Software & IT Company Keywords
    "Software company in Cuddalore",
    "Cuddalore software company",
    "Best software company in Cuddalore",
    "Top software company Cuddalore",
    "Cuddalore software",
    "Softwares Cuddalore",
    "Software development Cuddalore",
    "Custom software development in Cuddalore",
    "IT company in Cuddalore",
    "Software agency Cuddalore",
    
    // Cuddalore Web Design & Website Development Keywords
    "Web designing Cuddalore",
    "Web design in Cuddalore",
    "Website Cuddalore",
    "Website development Cuddalore",
    "Best web design company in Cuddalore",
    "Web designer in Cuddalore",
    "Affordable website development Cuddalore",
    "Website design Cuddalore Old Town",
    "Web developers in Cuddalore",
    
    // Mobile App Development Keywords
    "App development Cuddalore",
    "Mobile app development in Cuddalore",
    "App Cuddalore best",
    "Android app development Cuddalore",
    "iOS app development Cuddalore",
    "Best app developers in Cuddalore",
    "Flutter app development Cuddalore",
    
    // Business & Industry Software Keywords
    "ERP software in Cuddalore",
    "Billing software Cuddalore",
    "POS billing software Cuddalore",
    "GST billing software Cuddalore",
    "Supermarket billing software Cuddalore",
    "Hospital management software Cuddalore",
    "Clinic software Cuddalore",
    "Gym management software Cuddalore",
    "Pawn broker software Cuddalore",
    "Gold loan billing software Cuddalore",
    "E-Commerce website development Cuddalore",
    
    // Regional Surrounding Area Keywords
    "Web design Pondicherry",
    "Software company Pondicherry",
    "Web development Panruti",
    "Software company Neyveli",
    "Website design Chidambaram",
    "Web development Villupuram",
    "Software company in Tamil Nadu",
    "Best digital agency Tamil Nadu",
    "Next.js Developer India",
    "AI Development Agency Cuddalore"
  ],
  authors: [
    { name: "Sriram", url: "https://sriwebsquad.in" },
    { name: "Sri Web Squad Team", url: "https://sriwebsquad.in" }
  ],
  creator: "Sriram - Sri Web Squad",
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
    title: "Sri Web Squad | #1 Best Software Company in Cuddalore",
    description: "Founded by Sriram — Crafting high-speed Websites, Android/iOS Mobile Apps, and Custom ERP Billing Softwares in Cuddalore, Tamil Nadu at pocket-friendly pricing.",
    url: "https://sriwebsquad.in",
    siteName: "Sri Web Squad",
    images: [
      {
        url: "https://sriwebsquad.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sri Web Squad - Best Software Company in Cuddalore",
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
    title: "Sri Web Squad | Best Software Company in Cuddalore",
    description: "High-performance Websites, Mobile Apps, and Custom ERP Software crafted by Sriram & Sri Web Squad in Cuddalore.",
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
    "revisit-after": "3 days",
    "distribution": "Global",
    "language": "English, Tamil",
  },
};

// Comprehensive JSON-LD Structured Data for Google Search, Knowledge Graph, & Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sriwebsquad.in/#website",
      "url": "https://sriwebsquad.in",
      "name": "Sri Web Squad",
      "description": "Best Software Company in Cuddalore & Web Design Agency",
      "publisher": {
        "@id": "https://sriwebsquad.in/#organization"
      },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sriwebsquad.in/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Person",
      "@id": "https://sriwebsquad.in/#founder",
      "name": "Sriram",
      "jobTitle": "Founder & Lead Software Architect",
      "worksFor": {
        "@id": "https://sriwebsquad.in/#organization"
      },
      "url": "https://sriwebsquad.in",
      "sameAs": [
        "https://www.linkedin.com",
        "https://github.com/Sriram1701"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cuddalore",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      }
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
      "@id": "https://sriwebsquad.in/#organization",
      "name": "Sri Web Squad",
      "legalName": "Sri Web Squad",
      "alternateName": [
        "SriWebSquad",
        "Sri Web Squad Cuddalore",
        "Sri Web Squad Software Company",
        "Sriram Sri Web Squad",
        "Best Software Company in Cuddalore"
      ],
      "founder": {
        "@id": "https://sriwebsquad.in/#founder"
      },
      "url": "https://sriwebsquad.in",
      "logo": "https://sriwebsquad.in/logo.png",
      "image": "https://sriwebsquad.in/og-image.png",
      "description": "Sri Web Squad is the #1 premier AI-powered software company and web design agency in Cuddalore, Tamil Nadu, India. Providing custom business software, ERP, POS billing systems, modern web apps, Android & iOS mobile applications, and SEO services.",
      "telephone": "+91-7845391712",
      "email": "sriwebsquad@gmail.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
      "areaServed": [
        { "@type": "City", "name": "Cuddalore" },
        { "@type": "City", "name": "Pondicherry" },
        { "@type": "City", "name": "Neyveli" },
        { "@type": "City", "name": "Panruti" },
        { "@type": "City", "name": "Chidambaram" },
        { "@type": "City", "name": "Villupuram" },
        { "@type": "AdministrativeArea", "name": "Tamil Nadu" },
        { "@type": "Country", "name": "India" }
      ],
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
        "https://wa.me/917845391712",
        "https://github.com/Sriram1701/sri-web-squad"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "12",
        "bestRating": "5",
        "worstRating": "1"
      },
      "knowsAbout": [
        "Software Company in Cuddalore",
        "Web Designing in Cuddalore",
        "Mobile App Development in Cuddalore",
        "Custom Software Development",
        "Enterprise Resource Planning (ERP)",
        "POS Barcode Billing Software",
        "Hospital & Clinical Management Systems",
        "Gym Biometric Attendance Software",
        "Pawn Broker & Gold Loan Software",
        "E-Commerce Online Stores",
        "Next.js and React Web Applications",
        "AI Automation & Intelligent Chatbots",
        "Search Engine Optimization (SEO)"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software, Web & App Development Services in Cuddalore",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Software Development in Cuddalore",
              "description": "Tailored business software, hospital & clinical management systems, biometric gym software, pawn broker billing software in Cuddalore."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Website Design & Development in Cuddalore",
              "description": "High-speed, SEO-optimized business websites, corporate landing pages, and responsive web portals in Cuddalore."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile App Development in Cuddalore (Android & iOS)",
              "description": "Custom mobile applications for Android & iOS with cloud backend, live sync, push notifications, and payment gateways."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "ERP & POS Barcode Billing Software in Cuddalore",
              "description": "Cloud & desktop ERP, supermarket barcode POS billing systems, GST invoice software, and automated stock management."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-Commerce Website Development in Cuddalore",
              "description": "Online shopping stores with Razorpay, PhonePe payment gateway integration, and WhatsApp order alerts."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO & Digital Growth Marketing in Cuddalore",
              "description": "Top Google search rankings, Google Business Profile local SEO, and performance marketing in Cuddalore, Tamil Nadu."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://sriwebsquad.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which is the best software company in Cuddalore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sri Web Squad, founded by Sriram, is recognized as the best software company and web design agency in Cuddalore, Tamil Nadu. Sri Web Squad specializes in custom software development, mobile apps (Android/iOS), high-speed websites, ERP & GST billing systems, and AI automation."
          }
        },
        {
          "@type": "Question",
          "name": "Who is Sriram at Sri Web Squad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sriram is the founder and lead software architect of Sri Web Squad in Cuddalore. He leads the engineering team building enterprise websites, mobile apps, and custom software for businesses across Tamil Nadu."
          }
        },
        {
          "@type": "Question",
          "name": "What web design and app development services are offered in Cuddalore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sri Web Squad provides custom website development (Next.js, React), mobile app development (Android & iOS), ERP billing systems, clinic portals, gym management software, pawn broker billing systems, e-commerce stores, and local SEO services in Cuddalore."
          }
        },
        {
          "@type": "Question",
          "name": "How to contact Sri Web Squad in Cuddalore for website or software development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact Sri Web Squad directly via WhatsApp or phone at +91 78453 91712 / +91 99446 88602, or visit 36, Salt Office Road, Pachayankuppam, Cuddalore Old Town, Tamil Nadu 607003."
          }
        }
      ]
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
      className={`${inter.variable} ${syne.variable} ${outfit.variable} font-sans h-full antialiased scroll-smooth`}
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
        
        {/* Geo Meta Tags for High Local Ranking in Cuddalore & Tamil Nadu */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Cuddalore, Tamil Nadu, India" />
        <meta name="geo.position" content="11.7040456;79.7671579" />
        <meta name="ICBM" content="11.7040456, 79.7671579" />
        <meta name="city" content="Cuddalore" />
        <meta name="state" content="Tamil Nadu" />
        <meta name="country" content="India" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
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

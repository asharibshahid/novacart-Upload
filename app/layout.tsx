import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NovaCart | Pakistans #1 Online Shopping Store – Jewelry, Clothing, Perfumes & More",
  description: "Shop the latest fashion, electronics, perfumes, wallets, and more at NovaCart. Pakistans best wholesale online store delivering quality & affordability.",
  keywords: [
    "NovaCart", "Online Shopping Pakistan", "Buy Jewelry Online", "Buy Perfumes Online", 
    "Electronics Store Pakistan", "Wholesale Clothing", "Top Ecommerce Site", 
    "Nova Cart Pakistan", "Best Online Shopping", "Affordable Online Store", 
    "Wallets Online", "Top Trending Fashion 2025", "Women Jewelry Sale", 
    "Mobile Accessories Pakistan", "Smart Watches Online", 
    "Perfume Brands Pakistan", "Cash on Delivery Shopping", "Mens Clothing Sale", "Fashion Pakistan 2025"
  ],
  openGraph: {
    title: "NovaCart | Wholesale Jewelry, Fashion & Electronics in Pakistan",
    description: "Discover trending styles & premium electronics at wholesale prices. Fast delivery in Pakistan. NovaCart is your one-stop online store.",
    url: "https://novacart.space",
    siteName: "NovaCart",
    images: [
      {
        url: "/thd1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaCart - Pakistan's Best Online Store",
    description: "Jewelry, Fashion, Electronics & more — all at wholesale prices. Trusted by thousands. Shop now on NovaCart!",
    images: ["https://novacart.space/thd1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/thd1.jpg" />
          <meta name="keywords" content="Nova Cart, E-commerce, Online Shopping, Pakistan, Top E-commerce, Best Online Store" />
          <meta name="author" content="Nova Cart Pakistan" />
          <meta name="robots" content="index, follow" />
          <meta name="revisit-after" content="7 days" />
          <meta name="language" content="English" />
          <meta name="distribution" content="global" />
          <meta name="rating" content="general" />
          <meta name="googlebot" content="index, follow" />
          <meta name="bingbot" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#ffffff" />
<meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:image:alt" content="NovaCart Pakistan - Jewelry, Fashion, Electronics Online Store" />
<meta name="twitter:creator" content="@NovaCartOfficial" />
<link rel="canonical" href="https://novacart.space/" />

        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
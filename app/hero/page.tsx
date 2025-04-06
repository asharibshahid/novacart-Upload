"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Head from "next/head";

const categories = [
  { 
    name: "Luxury Wallets", 
    emoji: "👛", 
    route: "/collections/leather-wallets",
    keywords: ["premium leather wallets", "men's designer wallets", "RFID blocking wallets Pakistan"]
  },
  { 
    name: "Trending Sneakers", 
    emoji: "👟", 
    route: "/collections/sneakers-2025",
    keywords: ["latest sneakers Pakistan", "comfortable running shoes", "branded sports shoes"]
  },
  { 
    name: "Premium Perfumes", 
    emoji: "🌸", 
    route: "/collections/luxury-perfumes",
    keywords: ["designer fragrances", "long-lasting perfumes", "imported perfumes Pakistan"]
  },
  { 
    name: "Modern Furniture", 
    emoji: "🪑", 
    route: "/collections/home-furniture",
    keywords: ["luxury home decor", "Pakistani furniture", "affordable sofas"]
  },
  { 
    name: "Smart Gadgets", 
    emoji: "📱", 
    route: "/collections/electronics",
    keywords: ["latest tech Pakistan", "smart home devices", "wireless earbuds 2025"]
  },
  { 
    name: "Fashion Clothing", 
    emoji: "👕", 
    route: "/collections/pakistani-fashion",
    keywords: ["trending outfits 2025", "modest Islamic wear", "premium fabric clothing"]
  },
  { 
    name: "Premium Hijabs", 
    emoji: "🧕", 
    route: "/collections/hijabs",
    keywords: ["luxury chiffon hijabs", "ready-to-wear shawls", "Pakistani hijab brands"]
  },
  { 
    name: "Gold Jewelry", 
    emoji: "💍", 
    route: "/collections/jewelry",
    keywords: ["22k gold jewelry", "traditional Pakistani jewelry", "bridal collection"]
  },
  { 
    name: "Designer Caps", 
    emoji: "🧢", 
    route: "/collections/caps",
    keywords: ["branded baseball caps", "trendy headwear", "unisex caps Pakistan"]
  },
  { 
    name: "Graphic Tees", 
    emoji: "👚", 
    route: "/collections/tshirts",
    keywords: ["cotton t-shirts Pakistan", "trendy graphic tees", "oversized t-shirts"]
  },
];

export default function CategoriesPage() {
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Performance-optimized animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      categoryRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>NovaCart | Pakistan #1 Online Store - Shop 10,000+ Products Across Categories</title>
        <meta
          name="description"
          content="✨ Explore 50+ categories at NovaCart - Pakistan's largest online marketplace for fashion, electronics, jewelry & home goods. Free delivery nationwide ✓ Cash on Delivery ✓ 7-Day Returns"
        />
        <meta
          name="keywords"
          content="online shopping Pakistan, buy jewelry online, electronics store Karachi, luxury perfumes Dubai, leather wallets, bulk fashion items, eCommerce Pakistan, COD shopping, NovaCart deals"
        />
        
        {/* Branding & Localization */}
        <meta name="author" content="NovaCart Global" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Karachi" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NovaCart | Shop 10,000+ Products Across 50+ Categories" />
        <meta property="og:description" content="Pakistan's #1 Online Marketplace - Discover fashion, electronics, home goods & more with free delivery nationwide" />
        <meta property="og:image" content="https://novacart.space/og-categories.jpg" />
        <meta property="og:url" content="https://novacart.space/categories" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NovaCart | Pakistan's Largest Online Shopping Categories" />
        <meta name="twitter:description" content="🚀 Trending Now: 2025 Collections! Shop 50+ categories with Cash on Delivery across Pakistan" />
        <meta name="twitter:image" content="https://novacart.space/twitter-categories.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://novacart.space/categories" />
      </Head>

      <div
        ref={sectionRef}
        className="min-h-screen bg-black text-white py-12 md:py-20 px-4 sm:px-6 relative overflow-hidden"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Product Categories",
            "description": "Explore all product categories available at NovaCart Pakistan",
            "url": "https://novacart.space/categories",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": categories.map((category, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "CategoryCode",
                  "name": category.name,
                  "url": `https://novacart.space${category.route}`,
                  "keywords": category.keywords.join(", ")
                }
              }))
            }
          })}
        </script>

        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute w-full h-full bg-gradient-to-r from-teal-900 via-purple-900 to-indigo-900"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent"
            itemProp="name"
          >
            Shop Our Trending Categories
            <span className="block text-lg md:text-xl font-normal text-gray-300 mt-4">
              Pakistan's Most Trusted Online Marketplace
            </span>
          </h1>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            itemProp="itemListElement"
          >
            {categories.map((category, index) => (
              <div
                key={category.name}
                ref={(el) => { categoryRefs.current[index] = el }}
                className="group relative bg-gray-900/80 border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:-translate-y-2"
                itemScope
                itemType="https://schema.org/CategoryCode"
              >
                <Link 
                  href={category.route}
                  className="block p-6 text-center h-full"
                  itemProp="url"
                >
                  <span 
                    className="text-5xl mb-4 inline-block transition-transform duration-300 group-hover:scale-110"
                    itemProp="image"
                  >
                    {category.emoji}
                  </span>
                  <h2 
                    className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300"
                    itemProp="name"
                  >
                    {category.name}
                  </h2>
                  <meta itemProp="keywords" content={category.keywords.join(", ")} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

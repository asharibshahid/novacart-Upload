import Head from "next/head";
import AllProductsPage from "./swiper/page";
import TestimonialsPage from "./components/testimonials/page";
import Hero from "./productsAll/page";
import ServicesPage from "./services/page";
import GsapAnimation from "./gsapanimation";
import CategoriesPage from "./hero/page";

export default function Home() {
  return (
    <>
      {/* Enhanced SEO Meta Tags with MLB Strategy */}
      <Head>
        {/* Primary Meta Tags */}
        <title>NovaCart | Pakistan's #1 Online Store for Jewelry, Electronics & Fashion | Free Delivery</title>
        <meta
          name="description"
          content="🇵🇰 Pakistan's Largest Online Marketplace - Shop 10,000+ products in Jewelry, Electronics, Fashion & More. ✓ Cash on Delivery ✓ 7-Day Returns ✓ Authentic Brands"
        />
        
        {/* Semantic Keywords (2025 Trending) */}
        <meta
          name="keywords"
          content="online shopping Pakistan, buy jewelry online, electronics store Karachi, luxury perfumes Dubai, leather wallets, bulk fashion items, eCommerce Pakistan, COD shopping, NovaCart deals, trending products 2025, #1 online store, Eid collection, luxury watches, smart gadgets, home appliances, premium fragrances"
        />
        
        {/* Branding & Localization */}
        <meta name="author" content="NovaCart Global" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Karachi" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NovaCart | Pakistan's #1 Online Store - Jewelry, Electronics & Fashion" />
        <meta
          property="og:description"
          content="✨ 50% OFF Eid Sale! Shop 10,000+ products with Cash on Delivery across Pakistan. Free Returns & Authentic Brands Only at NovaCart!"
        />
        <meta property="og:image" content="https://novacart.space/og-novacart-2025.jpg" />
        <meta property="og:url" content="https://novacart.space" />
        <meta property="og:site_name" content="NovaCart" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@NovaCartPK" />
        <meta name="twitter:creator" content="@NovaCartDeals" />
        <meta name="twitter:title" content="NovaCart | Pakistan's #1 Online Store" />
        <meta
          name="twitter:description"
          content="🚀 Trending Now: 2025 Smart Watches & Luxury Jewelry Collections! Shop with Confidence at Pakistan's Most Trusted eCommerce Platform"
        />
        <meta name="twitter:image" content="https://novacart.space/twitter-novacart-2025.jpg" />
        
        {/* Structured Data Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "NovaCart",
            "url": "https://novacart.space",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://novacart.space/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "sameAs": [
              "https://www.facebook.com/NovaCartPK",
              "https://www.instagram.com/NovaCartOfficial",
              "https://twitter.com/NovaCartPK"
            ]
          })}
        </script>
        
        {/* Canonical & Alternate Links */}
        <link rel="canonical" href="https://novacart.space" />
        <link rel="alternate" hrefLang="en" href="https://novacart.space" />
        <link rel="alternate" hrefLang="ur" href="https://novacart.space/ur" />
      </Head>

      {/* Main Content with Semantic Structure */}
      <div className="bg-black text-white">
        {/* GSAP Animation (Client Component) */}
        <GsapAnimation />

        {/* Product Showcase (Schema: ItemList) */}
        <section itemScope itemType="https://schema.org/ItemList">
          <meta itemProp="name" content="Trending Products" />
          <AllProductsPage />
        </section>

        {/* Categories (Schema: CollectionPage) */}
        <CategoriesPage />

        {/* Testimonials (Schema: Review) */}
        <section className="py-16 bg-gray-900" itemScope itemType="https://schema.org/Review">
          <TestimonialsPage />
        </section>

        {/* Features Section with Voice Search Optimization */}
        <section className="py-16" itemScope itemType="https://schema.org/WebPageElement">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Why Choose NovaCart?
            </h1>
            <span className="inline-block h-1 w-24 rounded bg-emerald-500" />
            <meta itemProp="keywords" content="best online store Pakistan, trusted ecommerce, secure shopping" />
          </div>
          <Hero />
        </section>

        {/* Services (Schema: Service) */}
        <section className="py-16 bg-gray-900" itemScope itemType="https://schema.org/Service">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Our Premium Services
            </h1>
            <span className="inline-block h-1 w-24 rounded bg-emerald-500" /> 
            <meta itemProp="serviceType" content="eCommerce Solutions" />
          </div>
          <ServicesPage />
        </section>
      </div>
    </>
  );
}
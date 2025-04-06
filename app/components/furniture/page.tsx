import Head from "next/head";
import FurniturePage from "./FurniturePage";
import { Product } from "@/types/products";

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Head>
        <title>NovaCart | Premium Furniture Pakistan | Modern Home & Office Furniture</title>
        <meta name="description" content="🛋️ Pakistan's largest furniture collection - Sofas, Chairs, Tables & Outdoor furniture. Free Karachi delivery ✓ 7-day returns ✓ Best prices" />
        <meta name="keywords" content="luxury furniture Pakistan, modern sofas Karachi, office chairs Lahore, dining tables Islamabad, NovaCart furniture, home decor" />
        <meta name="author" content="NovaCart Global" />
        <meta name="geo.region" content="PK" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NovaCart Furniture | Premium Home & Office Furniture Pakistan" />
        <meta property="og:description" content="Modern furniture collection with free Karachi delivery. 100+ items in stock - Sofas, Dining Sets, Office Chairs & More" />
        <meta property="og:image" content="https://novacart.space/og-furniture.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trending 2025 Furniture Designs | NovaCart Pakistan" />
        <meta name="twitter:description" content="🔥 Modern Italian & Turkish designs now available with installment plans. Free assembly included!" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Premium Furniture Collection",
            "description": "Modern furniture for home and office",
            "url": "https://novacart.space/furniture"
          })}
        </script>
      </Head>
      
      <FurniturePage products={products} />
    </>
  );
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.SANITY_URL}?query=*[_type=="chairs" || _type=="table" || _type=="outdoor" || _type=="sofa" || _type=="sets"]{
        _id, name, description, price, 
        "imageUrl": image.asset->url, 
        "slug": slug.current,
        "category": _type
      }`
    );
    const data = await res.json();
    return data.result || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
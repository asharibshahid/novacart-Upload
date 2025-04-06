import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Perfumes } from "@/sanity/lib/queries";
import { SanityFetch } from "@/sanity/lib/fetch";

type PerfumeType = {
  id: string;
  name: string;
  unique: number;
  description: string;
  price: number;
  brand: string;
  imageUrl: string;
  slug: { current: string };
};

export default async function PerfumeCard() {
  const perfumes: PerfumeType[] = await SanityFetch({ query: Perfumes });

  return (
    <>
      <Head>
        <title>NovaCart | Pakistan #1 Luxury Perfumes Store | Premium Fragrances</title>
        <meta name="description" content="✨ Buy authentic designer perfumes in Pakistan with COD. 100+ luxury fragrances from Chanel, Dior, Versace & more. Free delivery on bulk orders." />
        <meta name="keywords" content="luxury perfumes Pakistan, buy original perfumes Karachi, designer fragrances Lahore, imported perfumes Islamabad, B2B perfume wholesale, NovaCart perfumes" />
        <meta name="author" content="NovaCart Global" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="PK" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NovaCart | Premium Perfumes Collection - Pakistan's #1 Fragrance Store" />
        <meta property="og:description" content="Discover 100+ authentic designer perfumes with cash on delivery across Pakistan. Free shipping on orders over 10,000 PKR" />
        <meta property="og:image" content="https://novacart.space/og-perfumes.jpg" />
        <meta property="og:url" content="https://novacart.space/perfumes" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Perfumes Pakistan | NovaCart Fragrance Collection" />
        <meta name="twitter:description" content="🔥 2025 Trending: Chanel No.5, Dior Sauvage & Versace Eros. Authentic bottles with manufacturer warranty" />
        <meta name="twitter:image" content="https://novacart.space/twitter-perfumes.jpg" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Luxury Perfumes",
            "description": "Premium fragrance collection at NovaCart Pakistan",
            "url": "https://novacart.space/perfumes",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": perfumes.slice(0,5).map((perfume, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": perfume.name,
                  "brand": perfume.brand,
                  "image": perfume.imageUrl,
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "PKR",
                    "price": perfume.price
                  }
                }
              }))
            }
          })}
        </script>
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Luxury Perfume Collection
          <span className="block text-lg font-normal text-gray-300 mt-2">Authentic Designer Fragrances | Cash on Delivery</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              <Link href={`/final/${perfume.slug.current}`} className="block">
                <div className="relative w-full aspect-square">
                  <Image
                    src={perfume.imageUrl}
                    alt={`${perfume.brand} ${perfume.name} perfume`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {perfume.name}
                    </h2>
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                      {perfume.brand}
                    </span>
                  </div>
                  <p className="text-emerald-400 font-bold mt-2">{perfume.price.toLocaleString()} PKR</p>
                  <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                    {perfume.description}
                  </p>
                </div>
              </Link>
              <div className="px-5 pb-5">
                <Link href={`/ContactUs?product=${encodeURIComponent(perfume.name)}&price=${perfume.price}&id=${perfume.id}`}
                  className="block w-full py-2.5 text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all">
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

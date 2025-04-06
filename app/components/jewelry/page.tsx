import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SanityFetch } from "@/sanity/lib/fetch";
import { jewelry } from "@/sanity/lib/queries";

type JewelryType = {
  id: string;
  name: string;
  unique: number;
  description: string;
  price: number;
  imageUrl: string;
  slug: { current: string };
};

export default async function JewelryCard() {
  const jewelryItems: JewelryType[] = await SanityFetch({ query: jewelry });

  return (
    <>
      <Head>
        <title>NovaCart | 22K Gold Jewelry Pakistan | Authentic Gold & Diamond Jewelry</title>
        <meta name="description" content="💍 Premium 22K gold jewelry collection in Pakistan - Necklaces, Rings, Bracelets & Earrings. BIS Hallmark certified with free authenticity certificate" />
        <meta name="keywords" content="gold jewelry Pakistan, 22K jewelry Karachi, diamond rings Lahore, bridal jewelry Islamabad, NovaCart jewelry, authentic gold jewelry" />
        <meta name="author" content="NovaCart Global" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NovaCart | 22K Gold Jewelry Collection" />
        <meta property="og:description" content="Authentic gold jewelry with BIS certification. Special bridal collection now available" />
        <meta property="og:image" content="https://novacart.space/og-jewelry.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2025 Bridal Jewelry Trends | NovaCart Pakistan" />
        <meta name="twitter:description" content="✨ New collection: Diamond encrusted gold sets with installment payment options" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "22K Gold Jewelry Collection",
            "description": "Authentic gold and diamond jewelry",
            "url": "https://novacart.space/jewelry",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": jewelryItems.slice(0,5).map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": item.name,
                  "image": item.imageUrl,
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "PKR",
                    "price": item.price
                  }
                }
              }))
            }
          })}
        </script>
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
          22K Gold Jewelry
          <span className="block text-lg font-normal text-gray-300 mt-2">BIS Hallmark Certified | Free Authenticity Certificate</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {jewelryItems.map((item) => (
            <div key={item.id} className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
              <Link href={`/final/${item.slug.current}`} className="block">
                <div className="relative w-full aspect-square bg-black">
                  <Image
                    src={item.imageUrl}
                    alt={`${item.name} gold jewelry`}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-emerald-400 font-bold mt-2">{item.price.toLocaleString()} PKR</p>
                  <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
              <div className="px-5 pb-5">
                <Link href={`/ContactUs?product=${encodeURIComponent(item.name)}&price=${item.price}&id=${item.id}`}
                  className="block w-full py-2.5 text-center bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 rounded-lg font-medium transition-all">
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
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SanityFetch } from "@/sanity/lib/fetch";
import { allProducts } from "@/sanity/lib/queries";

type WalletType = {
  id: string;
  name: string;
  size: string;
  slug: { current: string; _type: string };
  description: string;
  price: number;
  imageUrl: string;
};

export default async function WalletCard() {
  const wallets: WalletType[] = await SanityFetch({ query: allProducts });

  return (
    <>
      <Head>
        <title>NovaCart | Premium Leather Wallets Pakistan | Men's Designer Wallets</title>
        <meta name="description" content="👛 Genuine leather wallets for men in Pakistan - RFID blocking, premium stitching & 1-year warranty. Bulk orders available with COD across Pakistan" />
        <meta name="keywords" content="leather wallets Pakistan, men wallets Karachi, RFID blocking wallet, designer wallets Lahore, NovaCart wallets, bulk wallet orders" />
        <meta name="author" content="NovaCart Global" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NovaCart | Authentic Leather Wallets Collection" />
        <meta property="og:description" content="Premium men's wallets with RFID protection. Free delivery on orders over 5,000 PKR" />
        <meta property="og:image" content="https://novacart.space/og-wallets.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2025 Trending Wallet Designs | NovaCart Pakistan" />
        <meta name="twitter:description" content="🛡️ RFID protected wallets now available in 15+ colors. Bulk discounts for retailers!" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Premium Wallets Collection",
            "description": "Genuine leather wallets for men",
            "url": "https://novacart.space/wallets"
          })}
        </script>
      </Head>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Premium Leather Wallets
          <span className="block text-lg font-normal text-gray-300 mt-2">RFID Protected | 1-Year Warranty</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-500/10 transition-all">
              <Link href={`/final/${wallet.slug.current}`} className="block">
                <div className="relative w-full aspect-square">
                  <Image
                    src={wallet.imageUrl}
                    alt={`${wallet.name} leather wallet`}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {wallet.name}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Size: {wallet.size}</p>
                  <p className="text-emerald-400 font-bold mt-2">{wallet.price.toLocaleString()} PKR</p>
                </div>
              </Link>
              <div className="px-5 pb-5">
                <Link href={`/ContactUs?product=${encodeURIComponent(wallet.name)}&price=${wallet.price}&id=${wallet.id}`}
                  className="block w-full py-2.5 text-center bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-lg font-medium transition-all">
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
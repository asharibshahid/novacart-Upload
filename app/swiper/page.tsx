import { SanityFetch } from "@/sanity/lib/fetch";
import { allProd } from "@/sanity/lib/queries";
import { Product } from "@/types/products";
import ProductSwiper from "./ProductSwiper";

export default async function AllProductsPage() {
  let products: Product[] = [];

  try {
    products = await SanityFetch({
      query: allProd
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Implement error boundary or fallback UI in production
  }

  return (
    <section 
      className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* SEO-Optimized Heading with Structured Data */}
      <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight"
          itemProp="name"
        >
          Trending Products in Pakistan
        </h1>
        <meta itemProp="description" content="Discover the most popular products at NovaCart - Pakistan's #1 online shopping destination" />
        <p className="text-lg md:text-xl text-gray-300 mt-4">
          Shop the most sought-after items this season with <span className="font-semibold text-emerald-400">free delivery</span> across Pakistan
        </p>
      </div>

      {/* Product Swiper with Error Boundary */}
      <div itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
        <ProductSwiper products={products} />
      </div>

      {/* SEO Microdata for Product Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Trending Products",
            "description": "Browse the most popular products available at NovaCart Pakistan",
            "url": "https://novacart.space/products",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": products.slice(0, 5).map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.title,
                  "url": `https://novacart.space/products/${product.slug}`,
                  "image": product.imageUrl,
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "PKR",
                    "price": product.price,
                    "availability": "https://schema.org/InStock"
                  }
                }
              }))
            }
          })
        }}
      />
    </section>
  );
}
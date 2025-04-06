// app/final/[slug]/page.jsx

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductContent from "./ProductContent";
import Head from "next/head";

async function getProduct(slug) {
  try {
    return await client.fetch(
      groq`*[_type in [
        "wallet", 
        "shoes", 
        "electronic", 
        "hijab", 
        "jewelry", 
        "cap", 
        "perfume", 
        "hoodie", 
        "tshirt"
      ] && slug.current == $slug][0] {
        _id,
        name,
        description,
        "seoTitle": coalesce(seo.title, name + ' | ' + _type + ' | NovaCart'),
        "metaDescription": coalesce(seo.description, 'Buy ' + name + ' in Pakistan ✓ Free Delivery ✓ Cash on Delivery ✓ 7-Day Returns'),
        price,
        _type,
        "imageUrl": image.asset->url,
        slug,
        "category": _type,
        sku,
        "stock": count(*[_type == 'stock' && references(^._id)]),
        "reviews": *[_type == 'review' && product._ref == ^._id]{
          author,
          rating,
          text
        }
      }`,
      { slug }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  const canonicalUrl = `https://novacart.space/products/${params.slug}`;

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <Head>
          <title>Product Not Found | NovaCart Pakistan</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="text-center">
          <h1 className="text-3xl mb-4">Product Unavailable</h1>
          <p className="text-gray-400">
            Explore similar products in our{' '}
            <a href="/categories" className="text-teal-400 hover:underline">
              trending categories
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${product.seoTitle} | Pakistan’s #1 Online Store`}</title>
        <meta name="description" content={product.metaDescription} />
        
        {/* Semantic Keywords */}
        <meta 
          name="keywords" 
          content={`buy ${product.name} online Pakistan, price of ${product.name}, ${product.category} collection, authentic ${product.category} Pakistan`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} | NovaCart Pakistan`} />
        <meta property="og:description" content={`${product.metaDescription} | Shop now at Pakistan's #1 Online Store`} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product.item" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | NovaCart Pakistan`} />
        <meta name="twitter:description" content={`🔥 Trending ${product.category} in Pakistan - Free Delivery & COD Available`} />
        <meta name="twitter:image" content={product.imageUrl} />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.metaDescription,
            "image": product.imageUrl,
            "sku": product.sku,
            "brand": {
              "@type": "Brand",
              "name": "NovaCart"
            },
            "offers": {
              "@type": "Offer",
              "url": canonicalUrl,
              "priceCurrency": "PKR",
              "price": product.price,
              "availability": product.stock > 0 ? 
                "https://schema.org/InStock" : 
                "https://schema.org/OutOfStock",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": 0,
                  "currency": "PKR"
                }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.reviews.length > 0 ? 
                product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length : 
                4.8,
              "reviewCount": product.reviews.length
            }
          })}
        </script>

        {/* Canonical & Localization */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="NovaCart Global" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Karachi" />
        <meta property="og:locale" content="en_PK" />
      </Head>

      <ProductContent product={product} />
    </>
  );
}
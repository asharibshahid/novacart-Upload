import { SanityFetch } from "@/sanity/lib/fetch";
import { shoe } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";

type ShoesType = {
  id: string;
  name: string;
unique:number;
  description: string;
  price: number;
  imageUrl: string;
  slug: {
    current: string;
  };

};


export default async function ShoesCard() {
  // Fetching the Shoess data
  const Data: ShoesType[] = await SanityFetch({ query: shoe });
 
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-200">
        Explore Our Shoes
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Data.map((Shoes) => (
          <div
            key={Shoes.id}
            className="group relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <Link href={`/final/${Shoes.slug.current}`}>
              <div className="relative w-full h-64 cursor-pointer">
                <Image
                  alt={`Image of ${Shoes.name}`}
                  src={Shoes.imageUrl}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors">
                {Shoes.name}
                

              </h2>
              
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                {Shoes.description.split(" ").slice(0, 18).join(" ")}...
              </p>
              <p className="text-lg font-bold text-emerald-400 mb-4">
                {Shoes.price} PKR
              </p>
              <div className="flex flex-col space-y-3">
               
                <Link
                  href={`/ContactUs?product=${encodeURIComponent(Shoes.name)}&id=${Shoes.id} &price=${Shoes.price}`}
                >
                  <button className="w-full py-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

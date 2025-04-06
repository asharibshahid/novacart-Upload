"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp, FaCheckCircle, FaShieldAlt, FaTruck, FaClock } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Head from "next/head";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  deliveryInstructions: string;
  product: string;
  price: number;
  quantity: number;
  email: string;
  [key: string]: string | number;
}

const BalloonsAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 20}px`,
          }}
          initial={{
            y: "100vh",
            x: `${Math.random() * 100 - 50}%`,
            opacity: 1,
          }}
          animate={{
            y: "-100vh",
            x: `${Math.random() * 40 - 20}%`,
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "linear",
          }}
        >
          🎈
        </motion.div>
      ))}
    </div>
  );
};

function DeliverySystem() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    city: "Karachi",
    deliveryInstructions: "",
    product: searchParams?.get("product") || "",
    price: parseInt(searchParams?.get("price") || "0", 10),
    quantity: 1,
    email: "",
  });

  const deliveryFee = 200;
  const totalPrice = (formData.price * formData.quantity) + deliveryFee;
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);

  // SEO Meta Configuration
  const metaData = {
    title: "NovaCart Express Delivery | Pakistan's Fastest eCommerce Shipping",
    description: "Enjoy lightning-fast delivery across Pakistan with NovaCart FastTrack. Free COD ✓ 24hr Delivery Promise ✓ Live Tracking ✓ Secure Checkout",
    keywords: "fast delivery Pakistan, secure checkout, COD shopping, free shipping, NovaCart Express, ecommerce delivery",
    ogImage: "https://novacart.space/og-delivery.jpg"
  };

  useEffect(() => {
    calculateDeliveryEstimate();
    initAnimations();
  }, []);

  const calculateDeliveryEstimate = () => {
    const cities = {
      Karachi: "24-48 hours",
      Lahore: "48-72 hours",
      Islamabad: "72-96 hours",
      default: "3-5 business days"
    };
    setDeliveryEstimate(cities[formData.city as keyof typeof cities] || cities.default);
  };

  const initAnimations = () => {
    gsap.from(".delivery-card", { 
      opacity: 0, 
      y: 100, 
      duration: 1,
      ease: "power3.out"
    });
    
    gsap.from(".form-element", { 
      opacity: 0, 
      x: -50, 
      stagger: 0.1,
      duration: 0.8
    });
    
    ScrollTrigger.create({
      trigger: ".trust-badges",
      start: "top 75%",
      animation: gsap.fromTo(".badge", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }
      )
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "0eb265e5-be95-4968-ba9a-19ecc044c1a0",
          ...formData,
          deliveryFee: deliveryFee,
          totalPrice: totalPrice
        })
      });

      if (response.ok) {
        // Reset form fields
        setFormData({
          name: "",
          phone: "",
          address: "",
          city: "Karachi",
          deliveryInstructions: "",
          product: searchParams?.get("product") || "",
          price: parseInt(searchParams?.get("price") || "0", 10),
          quantity: 1,
          email: "",
        });
        
        setShowSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    setShowSuccess(false);
    setShowBalloons(true);
    setTimeout(() => setShowBalloons(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? parseInt(value) || 0 : value
    }));
    
    if (name === "city") {
      setDeliveryEstimate(calculateCityDelivery(value));
    }
  };

  const calculateCityDelivery = (city: string) => {
    const cities: Record<string, string> = {
      Karachi: "24-48 hours",
      Lahore: "48-72 hours",
      Islamabad: "72-96 hours",
      default: "3-5 business days"
    };
    return cities[city] || cities.default;
  };

  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="PK" />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.ogImage} />
        <meta property="og:url" content="https://novacart.space/delivery" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.ogImage} />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DeliveryService",
            "name": "NovaCart Express Delivery",
            "serviceArea": "Pakistan",
            "deliveryTime": "PT24H",
            "availableChannel": "OnlineOnly",
            "provider": {
              "@type": "Organization",
              "name": "NovaCart",
              "url": "https://novacart.space"
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            NovaCart FastTrack Delivery
          </motion.h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12 trust-badges">
            {[
              { icon: <FaTruck />, text: "24hr Delivery Promise" },
              { icon: <FaShieldAlt />, text: "Secure Checkout" },
              { icon: <FaClock />, text: "Live Tracking" }
            ].map((badge, i) => (
              <div key={i} className="badge flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full">
                <span className="text-emerald-400">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>

          {/* Delivery Form */}
          <div className="max-w-2xl mx-auto delivery-card bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Full Name", name: "name", type: "text"   },
                { label: "Email (optional)", name: "email", type: "email" , optional: true},
                { label: "Phone Number", name: "phone", type: "tel" },
                { 
                  label: "City", 
                  name: "city", 
                  type: "select", 
                  options: [ "Karachi",
                    "Lahore",
                    "Islamabad",
                    "Rawalpindi",
                    "Faisalabad",
                    "Multan",
                    "Peshawar",
                    "Quetta",
                    "Hyderabad",
                    "Sialkot",
                    "Gujranwala",
                    "Bahawalpur",
                    "Sargodha",
                    "Sukkur",
                    "Larkana",
                    "Sheikhupura",
                    "Mirpur Khas",
                    "Rahim Yar Khan",
                    "Jhang",
                    "Abbottabad",
                    "Mardan",
                    "Gujrat",
                    "Kasur",
                    "Okara",
                    "Dera Ghazi Khan",
                    "Wah Cantt",
                    "Sahiwal",
                    "Muzaffargarh",
                    "Chiniot",
                    "Nawabshah",
                    "Bannu",
                    "Khairpur",
                    "Kotri",
                    "Turbat",
                    "Dera Ismail Khan",
                    "Mansehra",
                    "Gwadar",
                    "Other"
                  ] 
                },
                { label: "Delivery Address", name: "address", type: "text" },
                { label: "Special Instructions", name: "deliveryInstructions", type: "textarea" }
              ].map((field) => (
                <div key={field.name} className="form-element">
                  <label className="block text-left text-emerald-300 mb-2 text-sm md:text-base">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name].toString()}
                      onChange={handleChange}
                      className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      required
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name].toString()}
                      onChange={handleChange}
                      className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all min-h-[100px]"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name].toString()}
                      onChange={handleChange}
                      className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                      required={field.type !== "textarea"}
                    />
                  )}
                </div>
              ))}

              {/* Quantity Section */}
              <div className="form-element">
                <label className="block text-left text-emerald-300 mb-2 text-sm md:text-base">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  required
                />
              </div>

              {/* Product Info */}
              <div className="form-element">
                <label className="block text-left text-emerald-300 mb-2 text-sm md:text-base">
                  Product
                </label>
                <input
                  type="text"
                  value={formData.product}
                  readOnly
                  className="w-full bg-gray-900/50 text-gray-300 p-3 rounded-lg border border-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Product Price:</span>
                    <span>{formData.price} PKR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>{deliveryFee} PKR</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-400 border-t border-gray-700 pt-2 mt-2">
                    <span>Total Price:</span>
                    <span>{totalPrice} PKR</span>
                  </div>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-emerald-400">Estimated Delivery:</span>
                  <span className="font-bold">{deliveryEstimate}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-1000"
                    style={{ width: `${showSuccess ? '100%' : '0%'}` }}
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                    isSubmitting 
                      ? "bg-gray-700 cursor-not-allowed" 
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    "Confirm Delivery"
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => window.open(`https://wa.me/03212558027?text=Order Inquiry: ${formData.product}`, "_blank")}
                  className="flex items-center justify-center gap-2 p-4 bg-green-500 hover:bg-green-600 rounded-lg transition-all"
                >
                  <FaWhatsapp className="text-xl" />
                  Live Chat Support
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <motion.div 
              className="bg-gray-800 p-8 rounded-xl text-center max-w-md w-full mx-4 border border-emerald-400/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCheckCircle className="text-emerald-400 text-6xl mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-gray-300 mb-6">
                Your {formData.product} will arrive in {deliveryEstimate}
              </p>
              <button
                onClick={handleDone}
                className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all"
              >
                Done
                <FaCheckCircle />
              </button>
            </motion.div>
          </div>
        )}

        {/* Balloons Animation */}
        {showBalloons && <BalloonsAnimation />}
      </div>
    </>
  );
}

export default function DeliveryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    }>
      <DeliverySystem />
    </Suspense>
  );
}
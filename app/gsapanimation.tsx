"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function HeroSection() {
  const sphereRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced 3D Sphere Animation with Performance Optimization
  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    let rotation = 0;
    let animationFrameId: number;
    const fps = 60;
    const interval = 1000 / fps;
    let then = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = Date.now();
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        rotation += 0.5;
        sphere.style.transform = `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`;
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Enhanced Parallax Effect with Device Detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined') return;

    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (isTouchDevice() || window.innerWidth < 1024) return;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      gsap.to(container, {
        duration: 1.2,
        rotationY: 8 * (x - 0.5),
        rotationX: -8 * (y - 0.5),
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Optimized Floating Animation with Reduced Motion Preference
  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const duration = window.innerWidth < 768 ? 6 : 4;
    const floatElements = document.querySelectorAll('.float-element');

    floatElements.forEach((el, i) => {
      gsap.to(el, {
        duration: duration + (i * 0.5),
        y: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-gray-900 to-indigo-900"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* SEO-Optimized Background Particles */}
      <div 
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        itemProp="background"
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle ${8 + i/5}s linear infinite`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* Semantic 3D Card with Structured Data */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-2000 w-[90%] max-w-[800px]"
        itemScope
        itemType="https://schema.org/CreativeWork"
      >
        <div className="relative w-full h-[300px] md:h-[500px] bg-gradient-to-br from-black/80 to-indigo-900/50 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10 transform-style-preserve-3d">
          {/* Performance-Optimized Sphere */}
          <div
            ref={sphereRef}
            className="absolute -top-16 md:-top-32 right-8 md:right-32 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-indigo-500 to-emerald-400 rounded-full opacity-20 blur-xl transform-gpu will-change-transform"
            aria-hidden="true"
          />

          {/* Semantic Content with Voice Search Keywords */}
          <div className="relative h-full flex flex-col justify-center items-center text-center p-6 md:p-12 z-10">
            <h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-300 to-emerald-400 bg-clip-text text-transparent mb-4 md:mb-6"
              itemProp="headline"
            >
              Welcome to NovaCart
              <span 
                className="block text-lg md:text-2xl font-light text-gray-300 mt-2 md:mt-4"
                itemProp="alternativeHeadline"
              >
                Pakistan #1 Online Shopping Destination
              </span>
            </h1>

            {/* SEO-Optimized Feature Ticker */}
            <div 
              className="w-full overflow-hidden my-4 md:my-8"
              itemProp="keywords"
              content="eCommerce Pakistan, online shopping, best deals, secure payments"
            >
              <div className="flex space-x-6 md:space-x-12 animate-infinite-scroll">
                {[
                  '10,000+ Products', 
                  'Cash on Delivery', 
                  '24/7 Support', 
                  'Secure Payments', 
                  'Free Returns',
                  'Authentic Brands'
                ].map((text, i) => (
                  <div 
                    key={i} 
                    className="flex items-center space-x-2 md:space-x-4 shrink-0"
                    itemProp="featureList"
                  >
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full" />
                    <span className="text-base md:text-xl text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schema-Marked CTA */}
            <Link
              href="/hero"
              className="relative overflow-hidden group"
              itemProp="significantLink"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button 
                className="relative px-8 md:px-16 py-2 md:py-4 bg-black/50 backdrop-blur-lg border border-white/20 rounded-full text-base md:text-xl font-medium text-white group-hover:text-white/90 transition-all duration-300"
                aria-label="Explore NovaCart Products"
                itemProp="potentialAction"
              >
                Shop Now
                <meta itemProp="target" content="https://novacart.space/products" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Performance-Optimized Floating Elements */}
      <div 
        className="float-element absolute top-1/4 left-1/4 w-16 h-16 md:w-24 md:h-24 bg-indigo-500/20 rounded-xl transform rotate-45"
        aria-hidden="true"
      />
      <div 
        className="float-element absolute top-1/3 right-1/4 w-20 h-20 md:w-32 md:h-32 bg-emerald-400/20 rounded-full"
        aria-hidden="true"
      />

      {/* Structured Progress Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-2"
        aria-label="Content progress indicators"
      >
        {[1, 2, 3].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20 animate-pulse"
            aria-current={i === 0 ? "step" : undefined}
          />
        ))}
      </div>

      {/* Mobile UX with Accessibility */}
      <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="i-ph-hand-swipe-light text-4xl text-white/50 animate-swipe-hint" />
        <span className="text-sm text-white/50 mt-2">Scroll to explore</span>
      </div>

      {/* Performance-Optimized Global Styles */}
      <style jsx global>{`
        @keyframes particle {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }

        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 25s linear infinite;
        }

        @keyframes swipe-hint {
          0%, 100% { transform: translateX(-10px) translateY(0); }
          50% { transform: translateX(10px) translateY(-5px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-infinite-scroll,
          .animate-swipe-hint,
          .float-element {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

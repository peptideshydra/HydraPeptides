import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

interface Product {
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  saleBadge?: string;
  tag?: string;
  testedBadge?: boolean;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    name: 'GLOW',
    subtitle: '70 mg',
    price: 139.99,
    image:
      'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-GLOW-70mg-FrontView-CPUPD2K-e1769169509242-600x658.png',
    link: '/product/glow/',
  },
  {
    name: 'KPV',
    subtitle: '10 mg',
    price: 49.99,
    originalPrice: 59.99,
    saleBadge: '17% OFF',
    tag: 'New',
    image:
      'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-KPV-10mg-FrontView-CPUPD2K-e1769169688252-600x658.png',
    link: '/product/kp/',
  },
  {
    name: 'Tesamorelin',
    subtitle: '5 mg',
    price: 59.99,
    tag: 'New',
    image:
      'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-Tesamorelin-5mg-FrontView-CPUPD2K-e1769169281545-600x658.png',
    link: '/product/tesa/',
  },
  {
    name: 'NAD+',
    subtitle: '10 ml',
    price: 99.00,
    tag: 'New',
    image:
      'https://beyond-peptides.com/wp-content/uploads/2025/12/BeyondPeptides-ProductVis-vA26-t-Vial-10ml-NADplus-FrontView-CPUPD2K-e1769168305556-600x679.png',
    link: '/product/nad/',
  },
  {
    name: 'BeyondG',
    subtitle: '20 mg',
    price: 129.99,
    tag: 'New',
    image:
      'https://beyond-peptides.com/wp-content/uploads/2026/02/BeyondG-10mg-FrontView-e1770136096260-600x658.png',
    link: '/product/beyondg/',
  },
  {
    name: 'MOTS-C',
    subtitle: '10mg',
    price: 44.99,
    tag: 'New',
    testedBadge: true,
    image:
      'https://beyond-peptides.com/wp-content/uploads/2025/06/MOTS-C-600x600.png',
    link: '/product/mots-c/',
  },
];

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M8.75 16.5L1.25 9L8.75 1.5" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M1.25 1.5L8.75 9L1.25 16.5" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M13.1234 8.75V5C13.1234 4.1712 12.7942 3.37634 12.2081 2.79029C11.6221 2.20424 10.8272 1.875 9.9984 1.875C9.1696 1.875 8.37474 2.20424 7.78869 2.79029C7.20264 3.37634 6.8734 4.1712 6.8734 5V8.75M16.3367 7.08917L17.3892 17.0892C17.4476 17.6433 17.0142 18.125 16.4567 18.125H3.54007C3.40857 18.1251 3.27852 18.0976 3.15836 18.0442C3.03819 17.9908 2.93061 17.9127 2.84259 17.8151C2.75457 17.7174 2.68808 17.6023 2.64745 17.4772C2.60681 17.3521 2.59294 17.2199 2.60673 17.0892L3.66007 7.08917C3.68436 6.8588 3.79309 6.64558 3.96528 6.49063C4.13746 6.33568 4.36092 6.24996 4.59257 6.25H15.4042C15.8842 6.25 16.2867 6.6125 16.3367 7.08917Z"
        stroke="#5B6775"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col rounded-[12px] border border-[#F0F0F0] bg-white overflow-hidden transition-shadow duration-300"
      style={{ boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <a href={product.link} className="relative block bg-white p-4">
        <div className="flex items-center justify-center" style={{ minHeight: 220 }}>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[260px] w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.testedBadge && (
            <span className="inline-block rounded-md bg-[#2D9B9D] px-3 py-1 text-xs font-semibold text-white">
              Tested
            </span>
          )}
          {product.tag && (
            <span className="inline-block rounded-md bg-[#16A1C5] px-3 py-1 text-xs font-semibold text-white">
              {product.tag}
            </span>
          )}
          {product.saleBadge && (
            <span className="inline-block rounded-md bg-[#C85625] px-3 py-1 text-xs font-semibold text-white">
              {product.saleBadge}
            </span>
          )}
        </div>
      </a>

      {/* Product info */}
      <div className="flex flex-col flex-1 px-5 pb-2 pt-1">
        {product.subtitle && (
          <span className="text-[12px] text-[#2D9B9D] mb-1">{product.subtitle}</span>
        )}
        <h3 className="text-[#22282F] text-[20px] font-semibold leading-snug font-primary">
          {product.name}
        </h3>
      </div>

      {/* Bottom bar */}
      <div className="relative overflow-hidden">
        {/* Default bottom */}
        <div
          className="flex items-center justify-between px-5 py-3 border-t border-[#F0F0F0] transition-transform duration-300"
          style={{ transform: hovered ? 'translateY(-100%)' : 'translateY(0)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#22282F] text-[14px] font-semibold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[#8494A6] text-[13px] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#DBDFE5] hover:border-[#22282F] transition-colors"
            aria-label="Add to bag"
          >
            <ShoppingBagIcon />
          </button>
        </div>

        {/* Hover overlay */}
        <a
          href={product.link}
          className="absolute inset-0 flex items-center justify-center bg-[#22282F] text-white text-sm font-semibold transition-transform duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}
        >
          Select options
        </a>
      </div>
    </div>
  );
}

export default function PeptideProducts({ title = 'Peptide Products' }: { title?: string }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const handleSwiperInit = (swiper: SwiperType) => {
    const nav = swiper.params.navigation;
    if (nav && typeof nav !== 'boolean') {
      nav.prevEl = prevRef.current;
      nav.nextEl = nextRef.current;
    }
    swiper.navigation.init();
    swiper.navigation.update();
    setSwiperReady(true);
  };

  return (
    <section style={{ background: '#f8f9fa' }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10 py-20">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[#22282F] font-primary font-semibold text-[24px] leading-tight">
              {title}
            </h2>
          </div>

          <div className="flex items-center justify-between flex-1 gap-4 sm:justify-end">
            <p className="text-[14px] font-semibold max-w-sm text-right hidden sm:block" style={{ color: '#5B67759C' }}>
              For research purposes only. Not intended for human consumption. For use by professionals only.
            </p>

            {/* Navigation arrows */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                ref={prevRef}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#22282F] hover:bg-[#22282F] hover:text-white transition-colors group"
                aria-label="Previous slide"
              >
                <ChevronLeft />
              </button>
              <button
                ref={nextRef}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#22282F] hover:bg-[#22282F] hover:text-white transition-colors group"
                aria-label="Next slide"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile disclaimer */}
        <p className="text-[13px] mb-8 sm:hidden" style={{ color: '#5B67759C' }}>
          For research purposes only. Not intended for human consumption. For use by professionals only.
        </p>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop
          speed={500}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={handleSwiperInit}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className={swiperReady ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
        >
          {products.map((product) => (
            <SwiperSlide key={product.name}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

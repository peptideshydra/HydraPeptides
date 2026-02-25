import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

const steps = [
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Safe-Payment-Options-Icon.svg',
    title: 'Safe Payment Options',
    description: 'Secure payments via bank transfer, cryptocurrency, and more.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Clear-Legal-Compliance-and-Use-Guidelines.svg',
    title: 'Clear Legal Compliance and Use Guidelines',
    description:
      'We provide clear usage guidelines for research purposes only and are working on a QR code verification system for product authenticity.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Shipping-with-Trusted-Partners-Icon.svg',
    title: 'Shipping with Trusted Partners',
    description:
      'Shipped from Europe using trusted partners like GLS, UPS, etc., ensuring no customs duties within Europe.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Cold-Chain-Storage-and-Handling.svg',
    title: 'Cold Chain Storage and Handling',
    description: 'Peptides stored at 2-8°C, shipped in lyophilized form for stability',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Secure-and-Discreet-Packaging.svg',
    title: 'Secure and Discreet Packaging',
    description:
      'Products are discreetly packaged, with invoices sent via email. All packages have security seals.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Inclusion-of-Antibacterial-Water.svg',
    title: 'Inclusion of Antibacterial Water',
    description: 'Peptide orders include 2ml antibacterial injection water.',
  },
];

function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M8.75 16.5L1.25 8.99999L8.75 1.49999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M1.25 1.5L8.75 9L1.25 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EverythingYouNeed() {
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
    <section
      className="relative"
      style={{
        backgroundImage: 'url(https://beyond-peptides.com/wp-content/uploads/2024/09/hero-bg.png)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="mx-auto px-2.5 sm:px-5"
        style={{ maxWidth: 1519, paddingTop: 96, paddingBottom: 96 }}
      >
        {/* Glass card */}
        <div
          className="overflow-hidden"
          style={{
            border: '1px solid rgba(255,255,255,0.30)',
            borderRadius: 36,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Text area */}
          <div
            className="flex flex-col items-start px-5 py-10 sm:px-10 md:px-[60px] lg:px-[90px]"
            style={{
              paddingTop: 96,
              paddingBottom: 60,
              backgroundColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <h2
              className="font-primary font-semibold mb-0"
              style={{ fontSize: 16, lineHeight: '48px', color: '#3CD4D7' }}
            >
              Bringing You Quality Beyond Limits
            </h2>
            <h2
              className="font-primary font-semibold"
              style={{
                fontSize: 'clamp(28px, 3.2vw, 40px)',
                lineHeight: 'clamp(32px, 3.6vw, 48px)',
                color: 'rgba(255,255,255,0.90)',
                maxWidth: '68%',
                marginBottom: 36,
              }}
            >
              Everything You Need to Know for a Smooth Purchase Experience
            </h2>
          </div>

          {/* Carousel area */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.51)',
              backgroundColor: 'rgba(255,255,255,0.05)',
              paddingTop: 30,
              paddingBottom: 20,
            }}
          >
            {/* Navigation arrows row */}
            <div className="flex items-center gap-3 justify-end px-5 sm:px-10 md:px-[60px] lg:px-[90px] mb-4">
              <button
                ref={prevRef}
                className="flex items-center justify-center w-[46px] h-[46px] rounded-full transition-colors"
                style={{
                  border: '1px solid rgba(255,255,255,0.20)',
                  background: 'transparent',
                }}
                aria-label="Previous slide"
              >
                <ArrowLeft />
              </button>
              <button
                ref={nextRef}
                className="flex items-center justify-center w-[46px] h-[46px] rounded-full transition-colors"
                style={{
                  border: '1px solid rgba(255,255,255,0.20)',
                  background: 'transparent',
                }}
                aria-label="Next slide"
              >
                <ArrowRight />
              </button>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={2}
              slidesPerView={1}
              loop
              speed={500}
              autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onSwiper={handleSwiperInit}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 5 },
              }}
              className={swiperReady ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
            >
              {steps.map((step) => (
                <SwiperSlide key={step.title}>
                  <div className="flex flex-col gap-4" style={{ padding: '0 30px' }}>
                    <img
                      src={step.icon}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      className="rounded-full"
                      style={{ width: 64, height: 64 }}
                    />
                    <h3
                      className="font-primary font-semibold leading-snug"
                      style={{ fontSize: 20, color: 'rgba(255,255,255,0.90)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-primary"
                      style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.80)', lineHeight: 1.6 }}
                    >
                      {step.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

const tips = [
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/001.svg',
    title: 'Store at 2-8°C',
    description:
      'Ensure your peptides are stored in a cool environment between 2-8°C. This temperature range maintains their stability and extends shelf life for accurate research results.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/002.svg',
    title: 'Keep away from direct light',
    description:
      'To preserve peptide integrity, always keep vials away from direct light. Exposure to light can degrade the peptides and reduce their effectiveness.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/003.svg',
    title: 'Minimize vibrations',
    description:
      'Limit vibrations during storage to prevent the peptides from destabilizing. A steady environment ensures the peptides remain in optimal condition for research.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/004.svg',
    title: 'Airtight containers for reconstituted peptides',
    description:
      'Once reconstituted, store peptides in airtight containers to prevent contamination and maintain sterility. Proper sealing helps preserve the peptides for future use.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/005.svg',
    title: 'Store peptides out of reach of children',
    description:
      'For safety, ensure all peptide vials are stored securely and out of reach of children. Proper handling minimizes the risk of accidental exposure or misuse.',
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

export default function StorageTips() {
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
        className="mx-auto px-5 sm:px-10 lg:px-[60px]"
        style={{ maxWidth: 1519, paddingTop: 80, paddingBottom: 80 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="font-primary font-semibold mb-2"
            style={{ fontSize: 16, lineHeight: '24px', color: '#3CD4D7' }}
          >
            Help and support
          </h2>
          <h2
            className="font-primary font-semibold"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              lineHeight: 'clamp(32px, 3.6vw, 48px)',
              color: 'rgba(255,255,255,0.90)',
            }}
          >
            Learn the Best Practices for Storage
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-[44px] h-[44px] rounded-full transition-colors"
            style={{
              border: '1px solid rgba(255,255,255,0.20)',
              background: 'rgba(0,0,0,0.3)',
              marginLeft: -8,
            }}
            aria-label="Previous slide"
          >
            <ArrowLeft />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-[44px] h-[44px] rounded-full transition-colors"
            style={{
              border: '1px solid rgba(255,255,255,0.20)',
              background: 'rgba(0,0,0,0.3)',
              marginRight: -8,
            }}
            aria-label="Next slide"
          >
            <ArrowRight />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop
            speed={500}
            autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onSwiper={handleSwiperInit}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={swiperReady ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
          >
            {tips.map((tip) => (
              <SwiperSlide key={tip.title}>
                <div style={{ padding: 3 }}>
                  <div
                    className="flex flex-col h-full"
                    style={{
                      border: '1px solid rgba(255,255,255,0.51)',
                      borderRadius: 12,
                      padding: 32,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <img
                      src={tip.icon}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      style={{ width: 56, height: 56, marginBottom: 8 }}
                    />
                    <h3
                      className="font-primary font-semibold"
                      style={{
                        fontSize: 'clamp(23px, 2.5vw, 32px)',
                        lineHeight: 'clamp(24px, 2.5vw, 32px)',
                        color: 'rgba(255,255,255,0.90)',
                        marginBottom: 4,
                      }}
                    >
                      {tip.title}
                    </h3>
                    <p
                      className="font-primary"
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.80)',
                        lineHeight: 1.6,
                      }}
                    >
                      {tip.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

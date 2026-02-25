import { useState } from 'react';

export default function PromoBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative overflow-hidden" style={{ background: '#f8f9fa' }}>
      <div className="mx-auto max-w-[1320px] grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">

        {/* Left — text content */}
        <div className="px-10 py-16 md:px-16 md:py-20 lg:px-20 flex flex-col items-start justify-center">
          <p
            className="font-primary font-bold text-[11px] uppercase tracking-[2px] mb-4"
            style={{ color: '#8494A6' }}
          >
            Ensure Safe Research Every Time
          </p>

          <h2 className="font-primary font-bold text-[clamp(22px,3vw,36px)] leading-[1.2] mb-4" style={{ color: '#22282F' }}>
            Get Free{' '}
            <span style={{ color: '#16a1c5' }}>Antibacterial Water</span>
            {' '}with Every Peptide Purchase!
          </h2>

          <p
            className="text-[14px] leading-[1.7] mb-6"
            style={{ color: '#5B6775' }}
          >
            This product, along with all of our products, includes free antibacterial water with each unit!
          </p>

          <a
            href="/shop"
            className="inline-flex items-center gap-[10px] font-primary font-semibold text-[14px] text-white rounded-[10px] transition-all duration-300"
            style={{
              background: hovered ? '#138da8' : '#1BB5DD',
              padding: '14px 24px',
              transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
              <path d="M11.5 1.5L19 9M19 9L11.5 16.5M19 9H1" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            Explore Peptides
          </a>
        </div>

        {/* Right — image (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-center relative overflow-hidden self-stretch">
          <img
            src="https://beyond-peptides.com/wp-content/uploads/2024/10/Antibacterial-Water-Image.png"
            alt="Antibacterial Water"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}

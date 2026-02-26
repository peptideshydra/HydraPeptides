import { Link } from 'react-router-dom'
import PeptideProducts from '../components/PeptideProducts'
import HeroHeader from '../components/HeroHeader'

function AboutHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #0a9edd 0%, #006ea8 35%, #004f82 65%, #004974 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[120%] rounded-full bg-white/[0.04] -rotate-[15deg]" />
        <div className="absolute -bottom-[40%] -left-[15%] w-[65%] h-full rounded-full bg-black/[0.04] rotate-[10deg]" />
        <div
          className="absolute -top-[30%] -left-[10%] w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)' }}
        />
      </div>

      <div
        className="relative z-10 mx-auto w-full flex flex-col items-center"
        style={{
          paddingTop: 'clamp(6px, 2vh, 20px)',
          paddingLeft: 'clamp(16px, 2.5vw, 40px)',
          paddingRight: 'clamp(16px, 2.5vw, 40px)',
        }}
      >
        <div
          className="w-full max-w-[1440px] rounded-t-[24px] overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderBottom: 'none',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <HeroHeader activeNav="About" />
        </div>
      </div>

      <div className="relative z-10 hidden sm:block">
        <img
          src="https://beyond-peptides.com/wp-content/uploads/2024/09/Rectangle-1058.png"
          alt=""
          className="w-full"
          style={{ maxHeight: 1, opacity: 0.5 }}
          loading="eager"
        />
      </div>

    </section>
  )
}

function AboutIntro() {
  return (
    <section style={{ background: '#EDEEF0' }}>
      <div
        className="mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16"
        style={{
          maxWidth: 1320,
          padding: 'clamp(60px, 8vh, 100px) clamp(20px, 3vw, 40px)',
        }}
      >
        <div className="flex-1 min-w-0">
          <p
            className="font-primary font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ fontSize: 'clamp(12px, 1vw, 14px)', color: '#0a9edd' }}
          >
            About us
          </p>
          <h1
            className="font-primary font-semibold leading-[1.35] mb-8"
            style={{ fontSize: 'clamp(22px, 2.4vw, 36px)', color: '#22282F' }}
          >
            We are dedicated to providing high-quality research peptides and chemical compounds that meet the needs of scientific communities and researchers worldwide.
          </h1>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2.5 font-primary font-semibold text-[14px] rounded-full px-7 py-3 transition-all hover:bg-[#22282F] hover:text-white"
            style={{ border: '2px solid #22282F', color: '#22282F' }}
          >
            <span>Learn More</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6.75 2.25L10.5 6M10.5 6L6.75 9.75M10.5 6H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="hidden md:block flex-shrink-0" style={{ width: 'clamp(280px, 30vw, 556px)' }}>
          <img
            src="https://beyond-peptides.com/wp-content/uploads/2024/10/about-hero-img.png"
            alt="About Beyond Peptides"
            className="w-full h-auto"
            width={556}
            height={525}
          />
        </div>
      </div>
    </section>
  )
}

function AboutMission() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#fff' }}>
      {/* Decorative watermark */}
      <img
        src="https://beyond-peptides.com/wp-content/uploads/2024/10/Union.png"
        alt=""
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          width: 760,
          height: 749,
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: 1320,
          padding: 'clamp(60px, 8vh, 100px) clamp(20px, 3vw, 40px)',
        }}
      >
        {/* Top row: text + image */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="flex-1 min-w-0">
            <p
              className="font-primary font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ fontSize: 'clamp(12px, 1vw, 14px)', color: '#0a9edd' }}
            >
              We deliver quality beyond expectations.
            </p>
            <h2
              className="font-primary font-semibold leading-[1.4] mb-6"
              style={{ fontSize: 'clamp(20px, 2.2vw, 32px)', color: '#22282F', maxWidth: 620 }}
            >
              Our products are designed to support cutting-edge experiments in areas like cellular growth, muscle development, tissue regeneration, and more.
            </h2>
            <p
              className="font-primary leading-[1.7]"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', color: '#5B6775', maxWidth: 560 }}
            >
              With a strong focus on quality, purity, and transparency, we aim to be the trusted source for researchers seeking reliable materials for their studies.
            </p>
          </div>

          <div className="hidden md:block flex-shrink-0" style={{ width: 'clamp(280px, 38vw, 707px)' }}>
            <img
              src="https://beyond-peptides.com/wp-content/uploads/2024/10/AdobeStock_568900479.jpg"
              alt="Research laboratory"
              className="w-full h-auto rounded-2xl"
              width={707}
              height={471}
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom row: mission statement */}
        <div
          className="mt-12 md:mt-16"
          style={{
            borderTop: '1px solid #E5E7EB',
            paddingTop: 'clamp(30px, 4vh, 50px)',
          }}
        >
          <p
            className="font-primary leading-[1.8]"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: '#5B6775',
              maxWidth: 900,
            }}
          >
            Our mission is to advance scientific research by delivering superior research peptides and compounds that adhere to the highest standards of quality and purity. We are committed to supporting researchers with the tools they need to push the boundaries of discovery.
          </p>
        </div>
      </div>
    </section>
  )
}

const whyCards = [
  {
    title: 'Exceptional Purity & Quality',
    description: 'All our peptides undergo rigorous testing, ensuring they meet the strictest quality and purity standards.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
        <path d="M9.67568 36.6484C15.0114 36.6484 19.3514 32.3084 19.3514 26.9727C19.3514 21.6369 15.0114 17.297 9.67568 17.297C4.33992 17.297 0 21.637 0 26.9727C0.00204509 32.3084 4.34201 36.6484 9.67568 36.6484ZM3.94305 26.9517C4.34595 26.4691 5.06381 26.4016 5.54446 26.8045L8.53868 29.3017C8.68594 29.4264 8.89046 29.4121 9.00499 29.2853L13.8583 23.9124C14.2775 23.4461 14.9995 23.4093 15.4658 23.8347C15.9321 24.258 15.9689 24.9759 15.5435 25.4422L10.6984 30.8151C10.181 31.3857 9.47948 31.6782 8.77181 31.6782C8.17054 31.6782 7.56717 31.4696 7.07632 31.0442L4.09644 28.5572C3.60354 28.1563 3.54014 27.4324 3.94305 26.9517Z" fill="#2D9B9D" />
        <path d="M35.3582 5.39578L23.2689 0.219348C22.5878 -0.073116 21.8127 -0.073116 21.1337 0.219348L9.05059 5.39783C8.05046 5.82732 7.40625 6.80085 7.40625 7.89093V15.2519C8.1446 15.1108 8.90336 15.0269 9.68464 15.0269C16.2765 15.0269 21.6368 20.3873 21.6368 26.9791C21.6368 29.6133 20.7738 32.0431 19.3216 34.0165L20.741 34.9266C21.6306 35.4972 22.7821 35.4972 23.6738 34.9266L31.5338 29.8749C34.9575 27.6702 37.0046 23.9276 37.0046 19.8532L37.0005 7.88843C37.0005 6.79834 36.3522 5.82527 35.3582 5.39578Z" fill="#2D9B9D" />
      </svg>
    ),
  },
  {
    title: 'Research-Focused Products',
    description: 'Our products are developed specifically for research purposes, allowing scientists to explore new frontiers in biochemistry, molecular biology, and pharmacology.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 40 32" fill="none">
        <path d="M1.23183 0.00536992C0.90576 0.00536992 0.597798 0.137611 0.367734 0.367669C0.132241 0.603163 0 0.921982 0 1.25532V4.71707C0 5.05039 0.132241 5.36919 0.367734 5.60472C0.599606 5.8366 0.913004 5.96884 1.23906 5.97246H12.7149C13.4014 5.9634 13.9557 5.40544 13.9557 4.71711V1.25716C13.9557 0.563355 13.3924 0 12.6986 0L1.23183 0.00536992ZM17.8394 0.00355887H17.8376C17.5097 0.00355887 17.1999 0.1358 16.9681 0.367671C16.7326 0.603165 16.6003 0.921984 16.6003 1.25532V4.71707C16.6003 5.05039 16.7326 5.36919 16.9681 5.60473C17.1999 5.8366 17.5133 5.96884 17.8412 5.97246H29.317C30.0018 5.9634 30.5561 5.40544 30.5561 4.71711V1.25716C30.5561 0.563357 29.9945 1.76904e-06 29.3007 1.76904e-06L17.8394 0.00355887ZM1.23693 26.2612C1.23693 29.4313 3.80746 32 6.97761 32C10.1477 32 12.7164 29.4313 12.7164 26.2612V23.9044H8.64236C7.9377 23.9044 7.36525 23.332 7.36525 22.6273C7.36525 21.9227 7.9377 21.352 8.64236 21.352H12.7164V18.6348H8.64236C7.9377 18.6348 7.36525 18.0641 7.36525 17.3577C7.36525 16.653 7.9377 16.0824 8.64236 16.0824H12.7164L12.7146 13.3669L8.6424 13.3651C7.93774 13.3651 7.3653 12.7945 7.3653 12.0898C7.3653 11.3852 7.93774 10.8127 8.6424 10.8127H12.7146V10.8145V6.68434L1.23883 6.68253L1.23693 26.2612ZM17.8376 12.916V12.9178L14.2707 17.8252V26.2611C14.2707 28.0817 13.6149 29.7374 12.5117 31.0145L12.5027 31.0254C12.1965 31.3804 11.856 31.7065 11.4846 31.9982L36.7331 32C38.5446 31.9837 40.0065 30.5091 40.0065 28.694C40.0065 27.9386 39.7529 27.2412 39.3254 26.6851L30.3459 14.3305H25.4659C24.7613 14.3305 24.1888 13.758 24.1888 13.0534C24.1888 12.3487 24.7613 11.7781 25.4641 11.7781H29.319L29.3172 10.1278L25.4659 10.126C24.7613 10.126 24.1888 9.55354 24.1888 8.84888C24.1888 8.14422 24.7613 7.57359 25.4641 7.57359H29.3172V6.68413L17.8414 6.68232L17.8376 12.916Z" fill="#2D9B9D" />
      </svg>
    ),
  },
  {
    title: 'Discreet & Secure Shipping',
    description: "We understand the importance of privacy in research. That's why we offer discreet shipping with secure packaging, ensuring that your order arrives safely and securely.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="28" viewBox="0 0 49 28" fill="none">
        <path d="M12.4316 23.0331C14.7565 25.5709 10.2076 29.736 7.8856 27.1982C5.56074 24.6577 10.1096 20.4954 12.4316 23.0331Z" fill="#2D9B9D" />
        <path d="M41.5491 23.0446C43.8739 25.5823 39.325 29.7475 37.003 27.2097C34.6782 24.6692 39.2243 20.5068 41.5491 23.0446Z" fill="#2D9B9D" />
        <path d="M6.5264 0.00322637L5.73648 4.37845H0.215677L0 5.81258H10.8986L10.683 7.2467H5.30498L4.23219 12.8376H1.57963L1.36395 14.2717H12.2626L12.0469 15.7058H3.73042L2.15345 24.4533H6.17015C6.88721 22.4449 8.89556 20.9408 10.9739 20.9408C13.0522 20.9408 14.5592 22.4478 14.5592 24.4533H30.6931L34.9955 0L6.5264 0.00322637Z" fill="#2D9B9D" />
        <path d="M44.746 6.02539H35.2815L34.063 12.9103L33.8473 14.3445L32.0547 24.526H35.2815C35.9985 22.5177 38.0069 21.0136 40.0852 21.0136C42.1635 21.0136 43.6705 22.5205 43.6705 24.526H46.8973L48.69 14.2713C48.4042 13.3386 48.0457 12.4058 47.6144 11.5459L44.746 6.02539ZM35.7095 11.4034L36.4266 7.38666H43.7399L45.8182 11.4034H35.7095Z" fill="#2D9B9D" />
      </svg>
    ),
  },
]

function WhyChoose() {
  return (
    <section style={{ background: '#EDEEF0' }}>
      <div
        className="mx-auto"
        style={{
          maxWidth: 1320,
          padding: 'clamp(60px, 8vh, 100px) clamp(20px, 3vw, 40px)',
        }}
      >
        <p
          className="font-primary font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ fontSize: 'clamp(12px, 1vw, 14px)', color: '#0a9edd' }}
        >
          We deliver quality beyond expectations.
        </p>
        <h2
          className="font-primary font-semibold leading-[1.35] mb-12"
          style={{ fontSize: 'clamp(24px, 2.6vw, 40px)', color: '#22282F' }}
        >
          Why Choose Beyond Peptides?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-8"
              style={{ background: '#fff' }}
            >
              <div className="mb-6">{card.icon}</div>
              <h3
                className="font-primary font-semibold mb-3"
                style={{ fontSize: 'clamp(16px, 1.3vw, 20px)', color: '#22282F' }}
              >
                {card.title}
              </h3>
              <p
                className="font-primary leading-[1.7]"
                style={{ fontSize: 'clamp(13px, 1vw, 15px)', color: '#5B6775' }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutMission />
      <WhyChoose />
      <PeptideProducts />
    </>
  )
}

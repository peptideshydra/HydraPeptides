import { useState } from 'react';

const features = [
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/pure-peptides.svg',
    title: '99% Pure Peptides',
    description: 'Guaranteed quality with rigorous testing and the highest purity and effectiveness.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Certified-Products-1.svg',
    title: 'Certified Products',
    description: 'All of our products are rigorously tested for authenticity and reliability.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Fast-Delivery.svg',
    title: 'Fast Delivery',
    description: 'Enjoy fast delivery options for all orders.',
  },
  {
    icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Expert-Support.svg',
    title: 'Expert Support',
    description: 'Access knowledgeable support from our team of experts, available 24/7.',
  },
];

const quickLinks = [
  { label: 'Products', href: '/shop/' },
  { label: 'My account', href: '/my-account/' },
  { label: 'Wishlist', href: '/wishlist/' },
  { label: 'Peptides', href: '/shop' },
  { label: 'Blog', href: '/blog/' },
];

const aboutLinks = [
  { label: 'Contact', href: '/contact/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'About', href: '/about-us/' },
];

const legalLinks = [
  { label: 'Imprint', href: '/imprint/' },
  { label: 'Shipping Policies', href: '/shipping-policies/' },
  { label: 'Terms of Service', href: '/terms-of-service/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 3L14 8M14 8L9 13M14 8H2" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer
      className="relative"
      style={{
        backgroundImage: 'url(https://beyond-peptides.com/wp-content/uploads/2024/09/hero-bg.png)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Features bar */}
      <div
        className="mx-auto px-5 sm:px-10 lg:px-[60px]"
        style={{ maxWidth: 1519, paddingTop: 50, paddingBottom: 10 }}
      >
        <div className="footer-features-grid">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4"
              style={{
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 12,
                padding: '24px 20px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <img
                src={feature.icon}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                style={{ width: 40, height: 40, flexShrink: 0 }}
              />
              <div>
                <h6
                  className="font-primary font-semibold"
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.90)', marginBottom: 4 }}
                >
                  {feature.title}
                </h6>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', lineHeight: 1.5 }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div
        className="mx-auto px-5 sm:px-10 lg:px-[60px]"
        style={{ maxWidth: 1519, paddingTop: 50 }}
      >
        {/* Glass container for footer content */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 24,
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '50px 50px 0',
          }}
        >
          {/* Footer grid */}
          <div
            className="footer-main-grid"
            style={{ paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.10)' }}
          >
            {/* Brand column */}
            <div>
              <a href="/">
                <img
                  src="https://beyond-peptides.com/wp-content/uploads/2024/09/website-logo-1.svg"
                  alt="Beyond Peptides"
                  width={130}
                  height={35}
                  loading="lazy"
                />
              </a>
              <p
                className="font-primary"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 16, lineHeight: 1.6 }}
              >
                We deliver quality beyond expectations.
              </p>
              <div className="flex gap-2.5 mt-4">
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:border-[#16a1c5] cursor-default"
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  <InstagramIcon />
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5
                className="font-primary font-bold"
                style={{ fontSize: 14, color: '#fff', marginBottom: 16, letterSpacing: 0.3 }}
              >
                Quick Links
              </h5>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block transition-colors hover:text-[#16a1c5]"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* About */}
            <div>
              <h5
                className="font-primary font-bold"
                style={{ fontSize: 14, color: '#fff', marginBottom: 16, letterSpacing: 0.3 }}
              >
                About
              </h5>
              {aboutLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block transition-colors hover:text-[#16a1c5]"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h5
                className="font-primary font-bold"
                style={{ fontSize: 14, color: '#fff', marginBottom: 16, letterSpacing: 0.3 }}
              >
                Legal
              </h5>
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block transition-colors hover:text-[#16a1c5]"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <span
                className="font-primary font-bold block"
                style={{ fontSize: 14, color: '#fff', marginBottom: 4 }}
              >
                Sign up to our newsletter
              </span>
              <span
                className="block"
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 14, lineHeight: 1.6 }}
              >
                Don't miss out on deals and discounts!
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail('');
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 font-primary outline-none"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontSize: 13,
                  }}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center transition-colors"
                  style={{
                    width: 40,
                    height: 40,
                    background: '#1BB5DD',
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  aria-label="Submit"
                >
                  <ArrowIcon />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom row: badges, currency, payment icons */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
          >
            {/* Left: security badges + currency */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <img
                  src="https://beyond-peptides.com/wp-content/uploads/2024/09/PCI-DSS-Level-1-Service.png"
                  alt="PCI DSS Level 1"
                  loading="lazy"
                  style={{ height: 36, borderRadius: 4 }}
                />
                <img
                  src="https://beyond-peptides.com/wp-content/uploads/2024/09/ssl.png"
                  alt="SSL Secured"
                  loading="lazy"
                  style={{ height: 36, borderRadius: 4 }}
                />
              </div>
              <select
                className="font-primary outline-none cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 6,
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 13,
                  padding: '6px 10px',
                }}
                defaultValue="USD"
              >
                <option value="USD">USD, $</option>
                <option value="EUR">EUR, &euro;</option>
              </select>
            </div>

            {/* Right: payment methods */}
            <img
              src="https://beyond-peptides.com/wp-content/uploads/2025/06/Group-427320819.png"
              alt="Payment methods"
              loading="lazy"
              style={{ height: 32, opacity: 0.8 }}
            />
          </div>

          {/* Copyright */}
          <div className="py-5 text-center">
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
              &copy; 2025 Beyond Peptides
            </p>
          </div>
        </div>

        {/* Bottom spacing */}
        <div style={{ height: 30 }} />
      </div>

      {/* Responsive styles */}
      <style>{`
        .footer-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
          gap: 40px;
        }
        @media (max-width: 1024px) {
          .footer-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .footer-main-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .footer-features-grid {
            grid-template-columns: 1fr;
          }
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

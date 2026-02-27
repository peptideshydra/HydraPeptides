import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroHeader from '../components/HeroHeader'

function FaqHero() {
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
          <HeroHeader activeNav="FAQ" />

          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ padding: 'clamp(40px, 6vh, 80px) clamp(20px, 3vw, 40px) clamp(50px, 8vh, 100px)' }}
          >
            <nav className="flex items-center gap-2 mb-5" aria-label="Breadcrumb">
              <Link
                to="/"
                className="font-primary text-white/70 hover:text-white transition-colors"
                style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
              >
                Home
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span
                className="font-primary text-white/90"
                style={{ fontSize: 'clamp(12px, 1vw, 14px)' }}
              >
                FAQ
              </span>
            </nav>

            <h2
              className="font-primary font-semibold text-white leading-[1.25] mb-5"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
            >
              Frequently Asked Questions
            </h2>

            <p
              className="font-primary text-white/80 leading-[1.7]"
              style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', maxWidth: 680 }}
            >
              If you have questions regarding our peptides, research kits, or the ordering process,
              we've compiled some common inquiries here to assist you.
            </p>
          </div>
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

const faqItems = [
  { q: 'What are peptides?', a: 'Peptides are short chains of amino acids that play crucial roles in various biological processes. They are widely used in research and medicine for their potential therapeutic benefits.' },
  { q: 'Are your peptides legal in Poland and Europe?', a: 'Yes, our peptides are legal for sale and distribution in Poland and throughout Europe when intended for research purposes. They are classified as research chemicals and are not intended for human consumption. We comply with all regulatory requirements, including proper labeling and documentation.' },
  { q: 'Can I purchase peptides for personal use?', a: 'Our peptides are sold strictly for research purposes and are intended for use by qualified professionals. They are not intended for personal or human use.' },
  { q: 'Do you include test certificates with your products?', a: 'Yes, each product package includes a <b>test certificate</b> specific to the batch. This certificate verifies the chemical purity and content of the peptides, ensuring full transparency and safety in research.' },
  { q: 'Do your peptides come with antibacterial water?', a: 'Yes, every peptide vial is accompanied by a <b>2ml vial of antibacterial injection water</b>. This allows for sterile preparation suitable for research use.' },
  { q: 'How are the peptides stored and shipped?', a: 'We store all peptides under optimal conditions (<b>2-8°C</b>) and protect them from light and vibrations until dispatch. To ensure maximum stability during transport, all peptides are shipped in their <b>lyophilized (dry) form</b>, not dissolved in water.' },
  { q: 'Are there customs duties within Europe?', a: 'No, there are generally <b>no customs duties</b> on goods shipped within the European Union due to the free movement of goods.' },
  { q: 'How can I contact customer support?', a: 'You can reach our customer support team via our <b>email address (<a href="mailto:contact@hydrapeptides.com" class="text-[#0a9edd] hover:underline">contact@hydrapeptides.com</a>)</b>. We are also working on providing support through <b>WhatsApp</b> in the near future.' },
  { q: 'Is my data secure with you?', a: 'Absolutely. We prioritize the security of your personal data by implementing high IT security standards.' },
  { q: 'Do you provide usage guidelines?', a: 'Yes, we provide clear usage guidelines for <b>research purposes only</b>. Please note that our products are not intended for human consumption.' },
  { q: 'How can I verify the authenticity of the products?', a: 'We include <b>test certificates</b> with every batch for verification. Additionally, we are working on implementing a <b>QR code verification system</b> to confirm product authenticity.' },
  { q: 'What sizes of peptide packaging are available?', a: '<p>We offer peptides in three packaging sizes:</p><ul class="list-disc pl-5 mt-2 space-y-1"><li><b>Single Vial Packaging</b></li><li><b>Four-Vial Packaging</b></li><li><b>Ten-Vial Packaging</b></li></ul>' },
  { q: 'Do you plan to expand your product range?', a: 'Yes, we are continually working to expand our product range. By subscribing to our newsletter, you will receive updates on new product launches.' },
  { q: 'What are the steps involved in processing my order?', a: '<ul class="list-disc pl-5 space-y-1"><li><b>Order Placement:</b> Place your order easily through our secure online shop.</li><li><b>Quality Testing and Batch Verification:</b> Every batch undergoes rigorous quality testing upon arrival at our facility.</li><li><b>Inclusion of Test Certificates:</b> Each package includes a test certificate specific to the batch.</li><li><b>Inclusion of Antibacterial Water:</b> All peptide orders come with antibacterial injection water (2ml vials).</li><li><b>Shipping with Trusted Partners:</b> Shipped from Europe using trusted partners like GLS.</li></ul>' },
  { q: 'Do you provide guidance on peptide storage and handling?', a: '<p>Yes, we recommend the following for optimal peptide stability:</p><ul class="list-disc pl-5 mt-2 space-y-1"><li><b>Store at 2-8°C.</b></li><li><b>Keep away from direct light.</b></li><li><b>Minimize vibrations.</b></li><li><b>Use airtight containers for reconstituted peptides.</b></li><li><b>Always store peptides out of reach of children.</b></li></ul>' },
  { q: 'Are there any interactive resources available for storage and handling?', a: 'We are developing an interactive guide where you can learn about best practices for storing and handling peptides. Stay tuned for updates via our newsletter.' },
  { q: 'What measures do you take to ensure product security and trust?', a: '<ul class="list-disc pl-5 space-y-1"><li><b>Trust Badges and Certifications:</b> We display relevant certifications to assure you of our commitment to quality.</li><li><b>Data Security:</b> We employ high IT security standards to protect your personal information.</li><li><b>Legal Compliance:</b> We ensure all products and practices comply with legal standards.</li></ul>' },
  { q: 'Are there any customs considerations for international orders?', a: 'For shipments within the European Union, there are generally no customs duties. For international orders outside the EU, customers are responsible for any import duties, taxes, or customs regulations applicable in their country.' },
  { q: 'What responsibility do consumers have regarding legal compliance?', a: 'Consumers are responsible for ensuring compliance with local laws concerning the purchase, possession, and use of peptides. This includes understanding any prohibitions or restrictions on specific peptides within their country.' },
]

function FaqContent() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section style={{ background: '#fff' }}>
      <div
        className="mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16"
        style={{
          maxWidth: 1320,
          padding: 'clamp(50px, 7vh, 90px) clamp(20px, 3vw, 40px)',
        }}
      >
        {/* Left sticky sidebar */}
        <div className="lg:w-[420px] shrink-0">
          <div className="lg:sticky" style={{ top: 120 }}>
            <h5
              className="font-primary font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ fontSize: 'clamp(12px, 1vw, 14px)', color: '#0a9edd' }}
            >
              General Product Information
            </h5>
            <h2
              className="font-primary font-semibold leading-[1.35] mb-5"
              style={{ fontSize: 'clamp(22px, 2.4vw, 36px)', color: '#22282F' }}
            >
              Common Questions About Our Research Products
            </h2>
            <p
              className="font-primary leading-[1.7]"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', color: '#5B6775' }}
            >
              Find answers to the most frequently asked questions about our peptides and research products.
            </p>
          </div>
        </div>

        {/* Right accordion */}
        <div className="flex-1 min-w-0">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                style={{ borderBottom: '1px solid #E5E7EB' }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  style={{ padding: 'clamp(16px, 2vh, 24px) 0' }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-primary font-semibold transition-colors group-hover:text-[#0a9edd]"
                    style={{
                      fontSize: 'clamp(14px, 1.1vw, 17px)',
                      color: isOpen ? '#0a9edd' : '#22282F',
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-[28px] h-[28px] rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: isOpen ? '#0a9edd' : '#F3F4F6',
                    }}
                  >
                    {isOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="#22282F" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: isOpen ? 600 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <div
                    className="font-primary leading-[1.8]"
                    style={{
                      fontSize: 'clamp(13px, 1vw, 15px)',
                      color: '#5B6775',
                      paddingBottom: 'clamp(16px, 2vh, 24px)',
                    }}
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FaqContact() {
  return (
    <section style={{ background: '#EDEEF0' }}>
      <div
        className="mx-auto"
        style={{
          maxWidth: 1320,
          padding: 'clamp(40px, 6vh, 70px) clamp(20px, 3vw, 40px)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-10"
          style={{
            background: '#fff',
            padding: 'clamp(30px, 4vh, 50px) clamp(30px, 4vw, 60px)',
          }}
        >
          {/* Decorative curves */}
          <svg className="absolute top-0 right-0 pointer-events-none opacity-[0.08]" width="400" height="200" viewBox="0 0 400 200" fill="none">
            <circle cx="320" cy="80" r="120" stroke="#0a9edd" strokeWidth="1.5" fill="none" />
            <circle cx="360" cy="60" r="80" stroke="#0a9edd" strokeWidth="1.5" fill="none" />
          </svg>

          <div className="flex-1 min-w-0 relative z-10">
            <h3
              className="font-primary font-semibold leading-[1.4] mb-3"
              style={{ fontSize: 'clamp(16px, 1.5vw, 22px)', color: '#22282F' }}
            >
              Our team is here to assist you with any questions or concerns.
            </h3>
            <p
              className="font-primary leading-[1.7]"
              style={{ fontSize: 'clamp(13px, 1vw, 15px)', color: '#5B6775' }}
            >
              Whether you need guidance with product information, shipping inquiries, or anything related to your order, we're just a click away.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <Link
              to="/contact/"
              className="inline-flex items-center gap-3 font-primary font-semibold text-white rounded-full transition-all hover:brightness-110"
              style={{
                fontSize: 'clamp(13px, 1vw, 15px)',
                padding: 'clamp(12px, 1.5vh, 16px) clamp(24px, 2.5vw, 36px)',
                background: '#0a9edd',
              }}
            >
              <span>Contact Us</span>
              <span
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 21 18" fill="none">
                  <path d="M11.5 1.5L19 9M19 9L11.5 16.5M19 9H1" stroke="white" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqContent />
      <FaqContact />
    </>
  )
}

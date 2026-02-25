import { useState } from 'react';

interface BatchInfo {
  batchNumber: string;
  certificateUrl?: string;
}

interface ProductCert {
  name: string;
  link: string;
  batches: BatchInfo[];
}

const products: ProductCert[] = [
  { name: 'GLOW', link: '/product/glow/', batches: [] },
  { name: 'KPV', link: '/product/kp/', batches: [] },
  { name: 'Tesamorelin', link: '/product/tesa/', batches: [] },
  { name: 'VIP', link: '/product/vi/', batches: [] },
  { name: 'NAD+', link: '/product/nad/', batches: [] },
  { name: 'KLOW', link: '/product/klo/', batches: [] },
  { name: 'BeyondC', link: '/product/beyondc/', batches: [] },
  { name: 'Beyond Skin', link: '/product/beyond-skin/', batches: [] },
  { name: 'Beyond Hair', link: '/product/beyond-hair/', batches: [] },
  { name: 'Thymosin Alpha 1', link: '/product/thymosin/', batches: [] },
  { name: 'AOD 9604', link: '/product/aod-9604/', batches: [] },
  { name: 'Bacteriostatic Water', link: '/product/bac/', batches: [] },
  { name: 'Beyond Gut Pro', link: '/product/gut-pro/', batches: [] },
  { name: 'Methylene Blue', link: '/product/mb/', batches: [] },
  {
    name: 'SLU-PP-332',
    link: '/product/slu-pp-332/',
    batches: [
      { batchNumber: '001', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2025/06/Certificate_SLU.pdf' },
    ],
  },
  { name: '5-Amino-1MQ', link: '/product/5-a1mq/', batches: [] },
  { name: 'L-Carnitine', link: '/product/l-carnitine/', batches: [] },
  { name: 'Beyond Sleep', link: '/product/beyond-sleep/', batches: [] },
  { name: 'BeyondG', link: '/product/beyondg/', batches: [] },
  {
    name: 'MOTS-C',
    link: '/product/mots-c/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2025/06/Certificate_MOTSc.pdf' },
    ],
  },
  {
    name: 'SS-31',
    link: '/product/ss-31/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2025/06/Certificate_SS31.pdf' },
    ],
  },
  {
    name: 'TB-500',
    link: '/product/tb-500/',
    batches: [
      { batchNumber: '001', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_Tb500-10mg.pdf' },
    ],
  },
  { name: 'HCG', link: '/product/hcg/', batches: [] },
  {
    name: 'IGF-1 LR3',
    link: '/product/igf-1-lr3/',
    batches: [
      { batchNumber: '', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/BP-Certificate-1_17_Igf-1.pdf' },
    ],
  },
  {
    name: 'BPC-157',
    link: '/product/bpc-157/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_BPC.pdf' },
    ],
  },
  {
    name: 'BPC-157 & TB-500 Mix',
    link: '/product/bpc-157-tb-500-mix/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_BP-TBmix.pdf' },
    ],
  },
  {
    name: 'Ipamorelin',
    link: '/product/ipamorelin/',
    batches: [
      { batchNumber: '001', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_IPA.pdf' },
    ],
  },
  {
    name: 'MT2 (Melanotan II)',
    link: '/product/mt2-melanotan-ii/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_MT.pdf' },
    ],
  },
  { name: 'HGH Fragment 176-191', link: '/product/hgh-fragment-176-191/', batches: [] },
  {
    name: 'GHK-Cu',
    link: '/product/ghk-cu/',
    batches: [
      { batchNumber: '5/26/2027', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/GHK-CU.pdf' },
    ],
  },
  {
    name: 'DSIP',
    link: '/product/dsip/',
    batches: [
      { batchNumber: '001', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_DSIP.pdf' },
    ],
  },
  { name: 'Epithalon', link: '/product/epithalon/', batches: [] },
  {
    name: 'Oxytocin',
    link: '/product/oxytocin/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_Oxytocin.pdf' },
    ],
  },
  { name: 'PT-141', link: '/product/pt-141/', batches: [] },
  {
    name: 'Semax',
    link: '/product/semax/',
    batches: [
      { batchNumber: '001', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/Certificate_Semax.pdf' },
    ],
  },
  {
    name: 'Selank',
    link: '/product/selank/',
    batches: [
      { batchNumber: '002', certificateUrl: 'https://beyond-peptides.com/wp-content/uploads/2024/10/selank-1.pdf' },
    ],
  },
  { name: 'PEG-MGF', link: '/product/peg-mgf/', batches: [] },
];

function ChevronDown({ rotated }: { rotated: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="10"
      viewBox="0 0 20 13"
      style={{
        transition: 'transform 0.3s ease',
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path
        d="M12,14.979l-10-10L4.979,2,12,9.021,19.02,2,22,4.979Z"
        transform="translate(-2 -2)"
        fill="#7c7c7c"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Transparency() {
  const [openAccordion, setOpenAccordion] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleProduct = (name: string) => {
    setExpandedProduct((prev) => (prev === name ? null : name));
  };

  return (
    <section style={{ background: '#fff' }}>
      <div
        className="mx-auto grid items-center gap-10 lg:gap-[60px] px-6 sm:px-10 lg:px-[60px] py-[60px]"
        style={{ maxWidth: 1320, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}
      >
        {/* Left — Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://beyond-peptides.com/wp-content/uploads/2024/09/Frame-601.png"
            alt="Transparency and safety certificates"
            className="w-full"
            style={{ maxWidth: 460, borderRadius: 20 }}
            loading="lazy"
          />
        </div>

        {/* Right — Content */}
        <div>
          <span
            className="font-primary block mb-3"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#8494A6',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            Transparency and safety
          </span>

          <h2
            className="font-primary font-bold mb-2"
            style={{ fontSize: 28, lineHeight: 1.2, color: '#0F172A' }}
          >
            Full transparency and safety in Research
          </h2>

          <h6
            className="font-primary font-semibold mb-3"
            style={{ fontSize: 14, color: '#0F172A' }}
          >
            Test certificates included with every batch
          </h6>

          <p
            className="mb-6"
            style={{ fontSize: 14, lineHeight: 1.7, color: '#5B6775' }}
          >
            Easily check the certification for any batch to verify quality and authenticity, giving you confidence.
          </p>

          <h6
            className="font-primary font-semibold mb-2"
            style={{ fontSize: 14, color: '#0F172A' }}
          >
            Check the certificate of any batch
          </h6>

          {/* Accordion */}
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: '#e5e7eb', background: '#f8f9fa' }}
          >
            {/* Accordion trigger */}
            <button
              onClick={() => {
                setOpenAccordion(!openAccordion);
                if (openAccordion) setExpandedProduct(null);
              }}
              className="w-full flex items-center justify-between px-4 py-3 font-primary text-left transition-colors hover:bg-[#f0f2f5]"
              style={{ fontSize: 14, fontWeight: 500, color: '#5B6775', background: 'transparent' }}
            >
              Select a product
              <ChevronDown rotated={openAccordion} />
            </button>

            {/* Product list */}
            <div
              style={{
                maxHeight: openAccordion ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}
            >
              <div
                className="overflow-y-auto"
                style={{ maxHeight: 400, borderTop: openAccordion ? '1px solid #e5e7eb' : 'none' }}
              >
                {products.map((product) => (
                  <div key={product.name} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    {/* Product name row */}
                    <button
                      onClick={() => toggleProduct(product.name)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-[#eef0f3]"
                      style={{ background: 'transparent', fontSize: 13 }}
                    >
                      <a
                        href={product.link}
                        onClick={(e) => e.stopPropagation()}
                        className="font-primary font-semibold hover:underline"
                        style={{ color: '#0F172A', fontSize: 13 }}
                      >
                        {product.name}
                      </a>
                      <ChevronDown rotated={expandedProduct === product.name} />
                    </button>

                    {/* Batch details */}
                    <div
                      style={{
                        maxHeight: expandedProduct === product.name ? 200 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                      }}
                    >
                      <div className="px-4 pb-3">
                        <table className="w-full" style={{ fontSize: 13 }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                              <th
                                className="text-left py-1.5 font-primary font-semibold"
                                style={{ color: '#5B6775', fontSize: 12 }}
                              >
                                Batch Number
                              </th>
                              <th
                                className="text-left py-1.5 font-primary font-semibold"
                                style={{ color: '#5B6775', fontSize: 12 }}
                              >
                                Certificate
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.batches.length === 0 ? (
                              <tr>
                                <td className="py-1.5" style={{ color: '#8494A6' }}>
                                  No batch found
                                </td>
                                <td className="py-1.5" style={{ color: '#8494A6' }}>
                                  -
                                </td>
                              </tr>
                            ) : (
                              product.batches.map((batch, i) => (
                                <tr key={i}>
                                  <td className="py-1.5" style={{ color: '#0F172A' }}>
                                    {batch.batchNumber || '-'}
                                  </td>
                                  <td className="py-1.5">
                                    {batch.certificateUrl ? (
                                      <a
                                        href={batch.certificateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 font-primary font-semibold transition-colors hover:opacity-80"
                                        style={{ color: '#16a1c5', fontSize: 12 }}
                                      >
                                        <DownloadIcon />
                                        Download
                                      </a>
                                    ) : (
                                      <span style={{ color: '#8494A6' }}>-</span>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

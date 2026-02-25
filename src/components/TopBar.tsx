import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function TopBar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('NEWYEAR10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative overflow-hidden text-white/85 text-center font-primary font-medium tracking-wide z-[1001] px-5 flex items-center justify-center"
      style={{
        backgroundColor: '#0a9edd',
        minHeight: '4vh',
        paddingTop: '0.6vh',
        paddingBottom: '0.6vh',
        fontSize: 'clamp(14px, 1.4vw, 17px)',
      }}
    >
      <div className="absolute top-1/2 -translate-y-1/2 -left-full w-[200%] h-[200%] min-h-[80px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent animate-shimmer" />
      <span className="relative z-10 font-bold" style={{ fontSize: 'clamp(12px, 1.1vw, 14px)' }}>
        Get 10% OFF on all products with code:{' '}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2.5 px-8 py-3 rounded-lg font-bold text-white ml-3 cursor-pointer transition-all hover:brightness-110"
          style={{
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            backgroundColor: 'rgba(0, 45, 75, 0.45)',
            border: '1.5px solid rgba(0, 30, 60, 0.7)',
          }}
        >
          NEWYEAR10
          {copied
            ? <Check className="w-3.5 h-3.5" style={{ opacity: 0.85 }} />
            : <Copy className="w-3.5 h-3.5" style={{ opacity: 0.85 }} />
          }
        </button>
      </span>
    </div>
  );
}

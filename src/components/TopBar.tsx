export default function TopBar() {
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
        Free Shipping On All Orders Over $200
      </span>
    </div>
  );
}

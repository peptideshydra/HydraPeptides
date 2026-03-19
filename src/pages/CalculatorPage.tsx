import { useState, useMemo, useCallback } from 'react'
import ShopNav from '../components/ShopNav'

type SyringeVolume = 30 | 50 | 100

function SyringeScale({ maxUnits, fillUnits, warning }: { maxUnits: SyringeVolume; fillUnits: number; warning: boolean }) {
  const clampedFill = Math.min(Math.max(fillUnits, 0), maxUnits)
  const fillPct = (clampedFill / maxUnits) * 100

  const buildTicks = useCallback(() => {
    const ticks: { pos: number; unit: number; major: boolean; label: boolean }[] = []

    let majorEvery: number
    let labelEvery: number
    let step: number
    if (maxUnits === 30) { majorEvery = 5; labelEvery = 5; step = 1 }
    else if (maxUnits === 50) { majorEvery = 5; labelEvery = 5; step = 1 }
    else { majorEvery = 10; labelEvery = 10; step = 2 }

    for (let u = 0; u <= maxUnits; u += step) {
      const isMajor = u % majorEvery === 0
      const isLabel = u !== 0 && u % labelEvery === 0
      ticks.push({ pos: (u / maxUnits) * 100, unit: u, major: isMajor, label: isLabel })
    }
    return ticks
  }, [maxUnits])

  const ticks = buildTicks()

  return (
    <div className="mt-8">
      <div className="relative" style={{ height: 56, pointerEvents: 'none' }}>
        {/* Bar background */}
        <div
          className="absolute left-0 right-0 rounded-md overflow-hidden"
          style={{ top: 0, height: 32, background: '#fff', border: '2px solid #1a1a1a' }}
        >
          {/* Fill */}
          <div
            className="absolute left-0 top-0 bottom-0 transition-all duration-500"
            style={{
              width: `${fillPct}%`,
              background: warning
                ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                : '#00aaee',
            }}
          />
        </div>

        {/* Tick marks */}
        {ticks.map((t) => (
          <div key={t.unit} className="absolute" style={{ left: `${t.pos}%`, top: 0, transform: 'translateX(-50%)' }}>
            <div
              style={{
                width: t.major ? 2 : 1,
                height: t.major ? 28 : 16,
                background: '#1a1a1a',
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'relative',
                zIndex: 2,
              }}
            />
            {t.label && (
              <span
                className="font-primary font-bold absolute"
                style={{
                  fontSize: maxUnits === 100 ? 10 : 11,
                  color: '#1a1a1a',
                  top: 34,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.unit}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const SYRINGE_OPTIONS: { label: string; value: SyringeVolume; ml: string }[] = [
  { label: '0.3 ml', value: 30, ml: '0.3' },
  { label: '0.5 ml', value: 50, ml: '0.5' },
  { label: '1.0 ml', value: 100, ml: '1.0' },
]

const VIAL_OPTIONS = [5, 10, 15]
const WATER_OPTIONS = [1, 2, 3, 5]
const DOSE_OPTIONS = [50, 100, 250, 500]

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-primary font-semibold text-[14px] rounded-xl border-2 transition-all duration-200 cursor-pointer"
      style={{
        padding: '12px 20px',
        minWidth: 72,
        background: selected ? '#16A1C5' : 'rgba(22,161,197,0.06)',
        borderColor: selected ? '#16A1C5' : '#e2e8f0',
        color: selected ? '#fff' : '#0F172A',
        boxShadow: selected ? '0 4px 14px rgba(22,161,197,0.25)' : 'none',
      }}
    >
      {children}
    </button>
  )
}

export default function CalculatorPage() {
  const [syringeVolume, setSyringeVolume] = useState<SyringeVolume>(30)
  const [vialQty, setVialQty] = useState(5)
  const [customVial, setCustomVial] = useState(false)
  const [waterAmount, setWaterAmount] = useState(1)
  const [customWater, setCustomWater] = useState(false)
  const [doseAmount, setDoseAmount] = useState(50)
  const [customDose, setCustomDose] = useState(false)

  const result = useMemo(() => {
    if (vialQty <= 0 || waterAmount <= 0 || doseAmount <= 0) {
      return { units: 0, warning: false, pct: 0 }
    }
    const concentrationMcgPerMl = (vialQty * 1000) / waterAmount
    const volumeNeededMl = doseAmount / concentrationMcgPerMl
    const syringeMl = syringeVolume / 100
    const units = (volumeNeededMl / syringeMl) * syringeVolume
    const warning = units > syringeVolume
    const pct = Math.min((units / syringeVolume) * 100, 100)
    return { units: +units.toFixed(2), warning, pct }
  }, [syringeVolume, vialQty, waterAmount, doseAmount])

  return (
    <>
      <ShopNav />
      <section
        className="relative overflow-hidden min-h-screen flex flex-col items-center"
        style={{
          background: 'linear-gradient(150deg, #0a9edd 0%, #006ea8 35%, #004f82 65%, #004974 100%)',
        }}
      >
        <div className="relative z-10 w-full max-w-[1440px] rounded-[24px] overflow-hidden flex flex-col"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            margin: '0 auto',
          }}
        >
          <div className="flex-1 px-5 sm:px-10 lg:px-[60px] py-10 lg:py-16">
            <div className="max-w-[900px] mx-auto">
              <h1 className="font-primary font-bold text-white text-[28px] sm:text-[36px] leading-tight mb-3">
                Peptide Reconstitution Calculator
              </h1>
              <p className="font-primary text-white/50 text-[15px] mb-10 max-w-[600px]">
                Calculate the exact syringe units for your desired peptide dosage. Select your parameters below.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
                {/* Left: Syringe selection */}
                <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid #e2e8f0' }}>
                  <h2 className="font-primary font-bold text-[#0F172A] text-[18px] mb-2">Syringe Volume</h2>
                  <p className="font-primary text-[#8494A6] text-[13px] mb-5">What is the total volume of your syringe?</p>
                  <div className="flex flex-wrap gap-3">
                    {SYRINGE_OPTIONS.map((opt) => (
                      <OptionButton
                        key={opt.value}
                        selected={syringeVolume === opt.value}
                        onClick={() => setSyringeVolume(opt.value)}
                      >
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>

                  {/* Syringe scale visual */}
                  <SyringeScale maxUnits={syringeVolume} fillUnits={result.units} warning={result.warning} />
                </div>

                {/* Right: Parameters */}
                <div className="space-y-6">
                  {/* Vial Quantity */}
                  <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid #e2e8f0' }}>
                    <h3 className="font-primary font-bold text-[#0F172A] text-[16px] mb-1">Peptide Vial Quantity</h3>
                    <p className="font-primary text-[#8494A6] text-[13px] mb-4">Select the amount of peptide in your vial</p>
                    <div className="flex flex-wrap gap-2">
                      {VIAL_OPTIONS.map((v) => (
                        <OptionButton
                          key={v}
                          selected={!customVial && vialQty === v}
                          onClick={() => { setVialQty(v); setCustomVial(false) }}
                        >
                          {v} mg
                        </OptionButton>
                      ))}
                      <OptionButton selected={customVial} onClick={() => setCustomVial(true)}>
                        Other
                      </OptionButton>
                    </div>
                    {customVial && (
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={vialQty}
                        onChange={(e) => setVialQty(+e.target.value || 0)}
                        placeholder="Enter vial quantity (mg)"
                        className="mt-3 w-full font-primary text-[14px] rounded-lg outline-none"
                        style={{ padding: '10px 14px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                      />
                    )}
                  </div>

                  {/* Water Amount */}
                  <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid #e2e8f0' }}>
                    <h3 className="font-primary font-bold text-[#0F172A] text-[16px] mb-1">Bacteriostatic Water</h3>
                    <p className="font-primary text-[#8494A6] text-[13px] mb-4">How much bacteriostatic water are you adding?</p>
                    <div className="flex flex-wrap gap-2">
                      {WATER_OPTIONS.map((w) => (
                        <OptionButton
                          key={w}
                          selected={!customWater && waterAmount === w}
                          onClick={() => { setWaterAmount(w); setCustomWater(false) }}
                        >
                          {w} ml
                        </OptionButton>
                      ))}
                      <OptionButton selected={customWater} onClick={() => setCustomWater(true)}>
                        Other
                      </OptionButton>
                    </div>
                    {customWater && (
                      <input
                        type="number"
                        min={0}
                        step={0.5}
                        value={waterAmount}
                        onChange={(e) => setWaterAmount(+e.target.value || 0)}
                        placeholder="Enter water amount (ml)"
                        className="mt-3 w-full font-primary text-[14px] rounded-lg outline-none"
                        style={{ padding: '10px 14px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                      />
                    )}
                  </div>

                  {/* Dose Amount */}
                  <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid #e2e8f0' }}>
                    <h3 className="font-primary font-bold text-[#0F172A] text-[16px] mb-1">Dose Per Injection</h3>
                    <p className="font-primary text-[#8494A6] text-[13px] mb-4">How much peptide do you want in each dose?</p>
                    <div className="flex flex-wrap gap-2">
                      {DOSE_OPTIONS.map((d) => (
                        <OptionButton
                          key={d}
                          selected={!customDose && doseAmount === d}
                          onClick={() => { setDoseAmount(d); setCustomDose(false) }}
                        >
                          {d} mcg
                        </OptionButton>
                      ))}
                      <OptionButton selected={customDose} onClick={() => setCustomDose(true)}>
                        Other
                      </OptionButton>
                    </div>
                    {customDose && (
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={doseAmount}
                        onChange={(e) => setDoseAmount(+e.target.value || 0)}
                        placeholder="Enter dose (mcg)"
                        className="mt-3 w-full font-primary text-[14px] rounded-lg outline-none"
                        style={{ padding: '10px 14px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Result */}
              <div
                className="mt-8 rounded-2xl p-6 sm:p-8"
                style={{
                  background: result.warning
                    ? 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(220,38,38,0.08))'
                    : 'linear-gradient(135deg, rgba(22,161,197,0.12), rgba(14,165,233,0.08))',
                  border: `1px solid ${result.warning ? 'rgba(239,68,68,0.3)' : 'rgba(22,161,197,0.3)'}`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl shrink-0"
                    style={{
                      background: result.warning ? 'rgba(239,68,68,0.15)' : 'rgba(22,161,197,0.15)',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={result.warning ? '#ef4444' : '#16A1C5'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    {result.warning ? (
                      <>
                        <h3 className="font-primary font-bold text-red-400 text-[18px] mb-1">
                          Warning: Syringe Too Small
                        </h3>
                        <p className="font-primary text-white/60 text-[14px]">
                          The syringe volume is not sufficient for the specified dosage. Please select a larger syringe or adjust your parameters.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-primary text-white/50 text-[13px] mb-1">
                          To have a dose of <strong className="text-white">{doseAmount} mcg</strong>, pull the syringe to:
                        </p>
                        <h3 className="font-primary font-bold text-white text-[32px] sm:text-[40px] leading-none">
                          {result.units} <span className="text-[18px] font-medium text-white/50">units</span>
                        </h3>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

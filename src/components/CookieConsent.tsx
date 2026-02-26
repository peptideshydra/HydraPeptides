import { useState, useEffect } from 'react'

interface CookiePrefs {
  necessary: boolean
  functional: boolean
  analytics: boolean
  performance: boolean
  advertisement: boolean
}

const STORAGE_KEY = 'bp_cookie_consent'
const defaultPrefs: CookiePrefs = { necessary: true, functional: false, analytics: false, performance: false, advertisement: false }

const categories: { key: keyof CookiePrefs; label: string; alwaysActive?: boolean; description: string }[] = [
  { key: 'necessary', label: 'Necessary', alwaysActive: true, description: 'Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.' },
  { key: 'functional', label: 'Functional', description: 'Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.' },
  { key: 'analytics', label: 'Analytics', description: 'Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.' },
  { key: 'performance', label: 'Performance', description: 'Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.' },
  { key: 'advertisement', label: 'Advertisement', description: 'Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.' },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0 transition-transform duration-200 text-[#888]"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function CookieConsent() {
  const [consented, setConsented] = useState(true)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>(defaultPrefs)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setConsented(false)
    } else {
      try { setPrefs(JSON.parse(stored)) } catch { /* use defaults */ }
    }
  }, [])

  function save(p: CookiePrefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
    setPrefs(p)
    setConsented(true)
    setShowPrefs(false)
  }

  function acceptAll() {
    save({ necessary: true, functional: true, analytics: true, performance: true, advertisement: true })
  }

  function rejectAll() {
    save({ ...defaultPrefs })
  }

  function saveMyPrefs() {
    save({ ...prefs, necessary: true })
  }

  const toggle = (key: keyof CookiePrefs) => {
    if (key === 'necessary') return
    setPrefs(p => ({ ...p, [key]: !p[key] }))
  }

  // ── Banner (first visit) ──────────────────────────────────────────────────
  if (!consented && !showPrefs) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[10000] bg-white border-t border-[#e5e7eb] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-5 py-5 sm:px-8">
        <div className="max-w-[960px] mx-auto">
          <p className="font-primary text-[14px] text-[#333] leading-relaxed mb-4">
            We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowPrefs(true)} className="font-primary text-[13px] font-semibold px-5 py-2.5 rounded-lg border border-[#1863dc] text-[#1863dc] bg-transparent hover:bg-[#1863dc]/5 transition-colors cursor-pointer">
              Customize
            </button>
            <button onClick={rejectAll} className="font-primary text-[13px] font-semibold px-5 py-2.5 rounded-lg border border-[#1863dc] text-[#1863dc] bg-transparent hover:bg-[#1863dc]/5 transition-colors cursor-pointer">
              Reject All
            </button>
            <button onClick={acceptAll} className="font-primary text-[13px] font-semibold px-5 py-2.5 rounded-lg bg-[#1863dc] text-white border border-[#1863dc] hover:bg-[#1453b8] transition-colors cursor-pointer">
              Accept All
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── Revisit button (bottom-left) ── */}
      {consented && !showPrefs && (
        <button
          onClick={() => setShowPrefs(true)}
          className="fixed bottom-5 left-5 z-[10000] w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer border-none"
          style={{ background: '#0056a7' }}
          aria-label="Consent Preferences"
          title="Consent Preferences"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            <circle cx="8.5" cy="10.5" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="15.5" cy="10.5" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="14" cy="14.5" r="1"/>
          </svg>
        </button>
      )}

      {/* ── Preferences modal ── */}
      {showPrefs && (
        <>
          <div className="fixed inset-0 z-[10001] bg-black/40" onClick={() => { setShowPrefs(false); if (!consented) setConsented(false) }} />
          <div
            className="fixed z-[10002] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 'min(560px, calc(100vw - 32px))',
              maxHeight: 'min(640px, calc(100vh - 48px))',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0] shrink-0">
              <h2 className="font-primary font-semibold text-[16px] text-[#212121]">Customize Consent Preferences</h2>
              <button
                onClick={() => { setShowPrefs(false); if (!consented) setConsented(false) }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f5f7] transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 13.5L13.5 4.5M4.5 4.5L13.5 13.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="font-primary text-[13px] text-[#444] leading-relaxed mb-5">
                <p>We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.</p>
                {showMore ? (
                  <>
                    <p className="mt-2">The cookies that are categorized as &ldquo;Necessary&rdquo; are stored on your browser as they are essential for enabling the basic functionalities of the site. We also use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.</p>
                    <button onClick={() => setShowMore(false)} className="text-[#1863dc] font-semibold mt-1 cursor-pointer bg-transparent border-none p-0 font-primary text-[13px]">Show less</button>
                  </>
                ) : (
                  <button onClick={() => setShowMore(true)} className="text-[#1863dc] font-semibold mt-1 cursor-pointer bg-transparent border-none p-0 font-primary text-[13px]">Show more</button>
                )}
              </div>

              {/* Categories */}
              <div className="flex flex-col divide-y divide-[#f0f0f0]">
                {categories.map((cat) => (
                  <div key={cat.key}>
                    <div
                      className="flex items-center gap-3 py-3.5 cursor-pointer select-none"
                      onClick={() => setExpanded(e => e === cat.key ? null : cat.key)}
                    >
                      <ChevronIcon open={expanded === cat.key} />
                      <span className="flex-1 font-primary font-semibold text-[14px] text-[#212121]">{cat.label}</span>
                      {cat.alwaysActive ? (
                        <span className="font-primary text-[12px] font-semibold text-[#008000]">Always Active</span>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); toggle(cat.key) }}
                          className={`relative w-[40px] h-[22px] rounded-full transition-colors duration-200 cursor-pointer border-none ${prefs[cat.key] ? 'bg-[#1863dc]' : 'bg-[#ccc]'}`}
                          aria-label={`${prefs[cat.key] ? 'Disable' : 'Enable'} ${cat.label}`}
                        >
                          <span
                            className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow transition-[left] duration-200"
                            style={{ left: prefs[cat.key] ? '20px' : '2px' }}
                          />
                        </button>
                      )}
                    </div>
                    {expanded === cat.key && (
                      <div className="pb-3 pl-7 pr-2">
                        <p className="font-primary text-[13px] text-[#555] leading-relaxed">{cat.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative shrink-0 border-t border-[#f0f0f0]">
              <div className="absolute -top-8 left-0 right-0 h-8 pointer-events-none" style={{ background: 'linear-gradient(transparent, white)' }} />
              <div className="flex flex-wrap gap-2 px-6 py-4 justify-end">
                <button onClick={rejectAll} className="font-primary text-[13px] font-semibold px-4 py-2.5 rounded-lg border border-[#1863dc] text-[#1863dc] bg-transparent hover:bg-[#1863dc]/5 transition-colors cursor-pointer">
                  Reject All
                </button>
                <button onClick={saveMyPrefs} className="font-primary text-[13px] font-semibold px-4 py-2.5 rounded-lg border border-[#1863dc] text-[#1863dc] bg-transparent hover:bg-[#1863dc]/5 transition-colors cursor-pointer">
                  Save My Preferences
                </button>
                <button onClick={acceptAll} className="font-primary text-[13px] font-semibold px-4 py-2.5 rounded-lg bg-[#1863dc] text-white border border-[#1863dc] hover:bg-[#1453b8] transition-colors cursor-pointer">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

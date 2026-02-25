import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'
import TopBar from '../../components/TopBar'
import ShopNav from '../../components/ShopNav'
import Footer from '../../components/Footer'

function MyAccountHero() {
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

      <div className="relative z-10 hidden sm:block">
        <img
          src="https://beyond-peptides.com/wp-content/uploads/2024/09/Rectangle-1058.png"
          alt=""
          className="w-full"
          style={{ maxHeight: 1, opacity: 0.5 }}
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center text-center mx-auto px-5"
        style={{ maxWidth: 1320, paddingTop: 50, paddingBottom: 70 }}
      >
        <nav className="flex items-center gap-1.5 mb-5">
          <Link to="/" className="font-primary text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <span className="font-primary text-[13px]" style={{ color: 'rgba(255,255,255,0.9)' }}>My Account</span>
        </nav>

        <h1 className="font-primary font-bold" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
          My Account
        </h1>

        <p className="font-primary" style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 500, lineHeight: 1.6 }}>
          Sign in to access the admin panel.
        </p>
      </div>
    </section>
  )
}

export default function AdminLoginPage() {
  const { user, loading, signIn } = useAdmin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8f9fb' }}>
        <div className="w-8 h-8 rounded-full border-4 border-[#16A1C5] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (user) return <Navigate to="/admin" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const err = await signIn(email, password)
    setSubmitting(false)
    if (err) setError('Invalid email or password.')
  }

  return (
    <>
      <TopBar />
      <ShopNav />
      <MyAccountHero />

      <section style={{ background: '#f8f9fb', padding: '50px 0 80px' }}>
        <div className="mx-auto px-5" style={{ maxWidth: 480 }}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 border border-[#eef0f3]"
          >
            <h2 className="text-[20px] font-semibold text-[#22282F] mb-6 font-primary">Sign In</h2>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px] font-primary">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[13px] text-[#6B7785] mb-1.5 font-primary">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] text-[#22282F] font-primary text-[14px] outline-none focus:border-[#16A1C5] transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[13px] text-[#6B7785] mb-1.5 font-primary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-lg border border-[#e5e7eb] text-[#22282F] font-primary text-[14px] outline-none focus:border-[#16A1C5] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

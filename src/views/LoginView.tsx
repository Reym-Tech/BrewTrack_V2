import { useState } from 'react'

interface Props {
  onLogin: (email: string, password: string) => void
  isLoading: boolean
  error: string | null
}

export function LoginView({ onLogin, isLoading, error }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    if (!email.trim() || !password.trim()) return
    onLogin(email.trim(), password)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #606c38 0%, #dda15e 50%, #fefae0 100%)',
      }}
    >
      <div className="w-full max-w-sm mx-4 bg-white/25 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#283618] tracking-wide">
            BrewTrack POS
          </h1>
          <p className="text-sm text-[#606c38] mt-1 font-medium">
            Coffee & Pastry Shop
          </p>
          <div className="w-12 h-1 bg-[#dda15e] rounded-full mx-auto mt-3" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#606c38] uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="you@example.com"
              className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-3 text-sm text-[#283618] placeholder-[#606c38]/50 focus:outline-none focus:border-[#dda15e] focus:bg-white/60 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#606c38] uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="••••••••"
              className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-3 text-sm text-[#283618] placeholder-[#606c38]/50 focus:outline-none focus:border-[#dda15e] focus:bg-white/60 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-100/60 border border-red-200 rounded-xl px-4 py-2.5">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading || !email.trim() || !password.trim()}
            className="w-full py-3 rounded-xl bg-[#606c38] text-[#fefae0] text-sm font-bold hover:bg-[#283618] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md mt-2"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

      </div>
    </div>
  )
}

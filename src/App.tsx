import { useState } from 'react'
import { useAuthController } from './controllers/use-auth-controller'
import { LoginView } from './views/LoginView'
import { PosView } from './views/PosView'
import { OrderHistoryView } from './views/OrderHistoryView'

type ActiveView = 'pos' | 'orders'

function App() {
  const { profile, isLoading, error, login, logout } = useAuthController()
  const [activeView, setActiveView] = useState<ActiveView>('pos')

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #606c38 0%, #dda15e 50%, #fefae0 100%)',
        }}
      >
        <div className="bg-white/25 backdrop-blur-xl border border-white/40 rounded-2xl px-8 py-6 text-center">
          <p className="text-sm font-semibold text-[#283618]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return <LoginView onLogin={login} isLoading={isLoading} error={error} />
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #606c38 0%, #dda15e 50%, #fefae0 100%)',
      }}
    >
      {/* Header */}
      <header className="bg-white/20 backdrop-blur-md border-b border-white/30 px-6 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-[#283618]">BrewTrack POS</h1>
          <p className="text-xs text-[#606c38] font-medium">Coffee & Pastry Shop</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Navigation Tabs */}
          <nav className="flex gap-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-1">
            <button
              onClick={() => setActiveView('pos')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'pos'
                  ? 'bg-[#606c38] text-[#fefae0] shadow'
                  : 'text-[#283618] hover:bg-white/30'
              }`}
            >
              POS
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'orders'
                  ? 'bg-[#606c38] text-[#fefae0] shadow'
                  : 'text-[#283618] hover:bg-white/30'
              }`}
            >
              Orders
            </button>
          </nav>

          {/* User Info + Logout */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-1.5">
            <div className="text-right">
              <p className="text-xs font-bold text-[#283618] leading-tight">
                {profile.full_name}
              </p>
              <p className="text-xs text-[#606c38] capitalize leading-tight">
                {profile.role}
              </p>
            </div>
            <div className="w-px h-6 bg-[#dda15e]/40" />
            <button
              onClick={logout}
              className="text-xs font-semibold text-[#bc6c25] hover:text-[#283618] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* View Content */}
      {activeView === 'pos' ? <PosView /> : <OrderHistoryView />}
    </div>
  )
}

export default App

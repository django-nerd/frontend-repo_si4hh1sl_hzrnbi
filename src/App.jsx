import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Player from './components/Player'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Ambient backdrop */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(900px_500px_at_110%_10%,rgba(99,102,241,0.2),transparent)]" />
      </div>

      {/* Content */}
      <div className="relative">
        <Navbar />
        <Hero />
        <Player />
        <Footer />
      </div>
    </div>
  )
}

export default App

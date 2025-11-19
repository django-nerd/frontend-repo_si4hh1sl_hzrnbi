import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center">
      {/* 3D Headphones */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4JFCLsE5jz72cZzw/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient glow overlay (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/10 to-slate-900/80" />

      {/* Headline content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-200 text-sm mb-6">
          Interactive 3D • Sleek • Modern
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
          Feel the music. Control the vibe.
        </h1>
        <p className="mt-4 text-blue-200/90 max-w-2xl mx-auto">
          A minimal, elegant web music player with an interactive 3D hero.
        </p>
      </div>
    </section>
  );
}

export default Hero;

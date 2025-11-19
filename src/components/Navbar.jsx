import { Menu, Library, Music2, Settings } from 'lucide-react';

function Navbar() {
  return (
    <header className="relative z-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5"><Menu size={18} /></button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500" />
            <span className="text-white font-semibold">VibePlay</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-blue-200/80">
          <a className="hover:text-white transition" href="#">Browse</a>
          <a className="hover:text-white transition" href="#">Radio</a>
          <a className="hover:text-white transition" href="#">Library</a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5" title="Library"><Library size={18} /></button>
          <button className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5" title="Now Playing"><Music2 size={18} /></button>
          <button className="p-2 rounded-lg border border-white/10 text-white hover:bg-white/5" title="Settings"><Settings size={18} /></button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

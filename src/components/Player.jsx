import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';

const demoTracks = [
  {
    title: 'Midnight Drive',
    artist: 'Nova',
    url: 'https://cdn.pixabay.com/download/audio/2021/09/03/audio_66d0b6f7b0.mp3?filename=midnight-stroll-15583.mp3',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Skyline',
    artist: 'Aero',
    url: 'https://cdn.pixabay.com/download/audio/2023/01/06/audio_fec93a20a2.mp3?filename=skyline-132740.mp3',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Sunset Glow',
    artist: 'Lumen',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/16/audio_2ab2b0f08f.mp3?filename=good-night-140983.mp3',
    cover: 'https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1200&auto=format&fit=crop'
  }
];

function formatTime(sec) {
  if (!sec || Number.isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function Player() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play(); else audio.pause();
  }, [playing, index]);

  const onLoaded = () => setDuration(audioRef.current?.duration || 0);
  const onTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
  const onEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    next();
  };

  const toggle = () => setPlaying(p => !p);

  const prev = () => setIndex(i => (i - 1 + demoTracks.length) % demoTracks.length);
  const next = () => {
    if (shuffle) {
      const r = Math.floor(Math.random() * demoTracks.length);
      setIndex(r);
    } else {
      setIndex(i => (i + 1) % demoTracks.length);
    }
  };

  const onSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(Math.max(x / rect.width, 0), 1);
    const newTime = ratio * duration;
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const track = demoTracks[index];

  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 -mt-10">
      <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Track info */}
        <div className="flex items-center gap-5 mb-6">
          <img src={track.cover} alt={track.title} className="w-20 h-20 rounded-xl object-cover border border-white/10" />
          <div>
            <h3 className="text-white text-xl font-semibold leading-tight">{track.title}</h3>
            <p className="text-blue-200/80 text-sm">{track.artist}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 w-full bg-white/10 rounded-full cursor-pointer" onClick={onSeek} ref={progressRef}>
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-blue-200/70 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button onClick={() => setShuffle(s => !s)} className={`p-2 rounded-lg border ${shuffle ? 'bg-blue-500/20 border-blue-400' : 'border-white/10'} text-white`}
              title="Shuffle"><Shuffle size={18} /></button>
            <button onClick={prev} className="p-2 rounded-lg border border-white/10 text-white" title="Previous"><SkipBack size={18} /></button>
            <button onClick={toggle} className="p-3 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30" title="Play/Pause">
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={next} className="p-2 rounded-lg border border-white/10 text-white" title="Next"><SkipForward size={18} /></button>
            <button onClick={() => setRepeat(r => !r)} className={`p-2 rounded-lg border ${repeat ? 'bg-blue-500/20 border-blue-400' : 'border-white/10'} text-white`} title="Repeat"><Repeat size={18} /></button>
          </div>

          <div className="flex items-center gap-2 min-w-[180px]">
            <button onClick={() => setMuted(m => !m)} className="p-2 rounded-lg border border-white/10 text-white" title="Mute">
              {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-40 accent-blue-500"
            />
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={track.url}
          onLoadedMetadata={onLoaded}
          onTimeUpdate={onTime}
          onEnded={onEnded}
          preload="metadata"
        />
      </div>
    </section>
  );
}

export default Player;

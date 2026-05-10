// timeline.jsx — orchestrate the 6 scenes + global subtitles + transitions
// Total duration: 213.5s (3:33) — synced to recorded narration (Juliana voice)
// Cue boundaries derived from silence-detection in assets/narration.mp3

const SCENES = [
  { start: 0,     end: 32,    render: () => <Scene1/> },  // Friendship
  { start: 32,    end: 84.5,  render: () => <Scene2/> },  // Malta + price wall
  { start: 84.5,  end: 122.5, render: () => <Scene4/> },  // S2 revelation
  { start: 122.5, end: 162.5, render: () => <Scene3/> },  // France becomes the answer
  { start: 162.5, end: 194.5, render: () => <Scene5/> },  // Today
  { start: 194.5, end: 229.5, render: () => <Scene6/> },  // Closing — 35s for trio + logo glow
];

const SUBTITLES = [
  // Scene 1 (0-32) — Founding friendship
  { s: 0.0,    e: 5.88,   text: "It all begins with a friendship — more than thirty years between two doctors." },
  { s: 7.36,   e: 16.00,  text: "Doctor Thierry Manos, gastroenterologist — one of France's leading specialists in endoscopic sleeve gastroplasty." },
  { s: 17.46,  e: 22.30,  text: "And — Doctor Stéphane Bach, public health physician and entrepreneur." },
  { s: 23.72,  e: 31.12,  text: "Together — through an established collaboration with ELSAN — we set out to treat obesity at the scale of its impact." },

  // Scene 2 (32-84.5) — Malta: alternative to Turkey, then the price wall
  { s: 32.56,  e: 37.04,  text: "In March 2023, we launched Obesity Care Clinic." },
  { s: 37.94,  e: 45.44,  text: "We saw what Turkey was offering — bariatric surgery at very low cost, but without the same standards of care." },
  { s: 46.34,  e: 55.84,  text: "Malta would be our answer: a Mediterranean platform, English-speaking, European, with quality medicine." },
  { s: 56.74,  e: 65.96,  text: "But we hit a wall — five thousand five hundred euros in Malta, against three thousand in Turkey." },
  { s: 66.88,  e: 70.78,  text: "Even with quality, the price kept patients away." },
  { s: 71.70,  e: 77.46,  text: "We had built the team, the partnerships, the AI tools — but the economics did not yet add up." },
  { s: 78.48,  e: 84.00,  text: "We needed another path. One where the patient would no longer have to pay." },

  // Scene 3 (84.5-122.5) — The S2 revelation
  { s: 84.90,  e: 87.84,  text: "And then we activated a forgotten right." },
  { s: 88.78,  e: 95.90,  text: "Preserved after Brexit by the Trade and Cooperation Agreement: the NHS S2 form." },
  { s: 96.82,  e: 104.98, text: "It allows a British patient to be operated in Europe — fully funded by the NHS. Zero cost for the patient." },
  { s: 106.00, e: 114.56, text: "We handle everything: the concierge service, the file processing, fighting for each NHS approval." },
  { s: 115.50, e: 121.98, text: "It is legal. It is a right. But almost no one activates it. We made it the heart of our model." },

  // Scene 4 (122.5-162.5) — France becomes the answer
  { s: 122.96, e: 131.70, text: "But Malta's health system could not process the S2 pathway. France could." },
  { s: 132.68, e: 138.24, text: "So we turned to the highest standard of quality — France." },
  { s: 138.96, e: 145.28, text: "Through an established collaboration with ELSAN, at Bouchard Private Hospital in Marseille." },
  { s: 146.16, e: 152.68, text: "Surgical care coordinated by Doctor Marius Nedelcu — one of Europe's leading bariatric surgeons." },
  { s: 153.74, e: 162.10, text: "British patients now receive the same surgery, the same care pathway, as any French citizen." },

  // Scene 5 (162.5-194.5) — Today, the operational flow
  { s: 162.96, e: 171.46, text: "Today, since the beginning of this year, fifty-five British patients have placed their trust in us." },
  { s: 172.46, e: 177.78, text: "Seven have been operated. Others are on the waiting list." },
  { s: 178.70, e: 183.46, text: "Thirty-five files are currently pending NHS validation." },
  { s: 184.30, e: 187.94, text: "The operational flow has begun — and it is accelerating." },
  { s: 188.84, e: 194.02, text: "A second establishment, in Martigues, will soon join our active network." },

  // Scene 6 (194.5-213.5) — What comes next
  { s: 195.12, e: 199.62, text: "Three years. Three steps. One conviction:" },
  { s: 200.44, e: 206.22, text: "Helping every patient suffer less from obesity — and from the medical complications it brings." },
  { s: 207.24, e: 212.98, text: "Obesity Care Clinic. Connecting patients. Simplifying their journey." },
];

function ActiveSubtitle() {
  const t = useTime();
  const cue = SUBTITLES.find(c => t >= c.s && t <= c.e);
  if (!cue) return null;
  // Local fade
  const lt = t - cue.s;
  const dur = cue.e - cue.s;
  const enter = clamp(lt / 0.25, 0, 1);
  const exit = clamp((lt - (dur - 0.25)) / 0.25, 0, 1);
  const op = Easing.easeOutCubic(enter) * (1 - Easing.easeInCubic(exit));

  return (
    <div style={{
      position:'absolute',
      left:'50%', bottom: 70,
      transform: `translateX(-50%) translateY(${(1-enter)*8}px)`,
      width: 'min(1500px, 78%)',
      textAlign:'center',
      opacity: op,
      zIndex: 80,
      pointerEvents:'none',
    }}>
      <div style={{
        display:'inline-block',
        padding: '14px 32px',
        background:'rgba(0,0,0,0.45)',
        backdropFilter:'blur(8px)',
        WebkitBackdropFilter:'blur(8px)',
        border:'1px solid rgba(244,239,230,0.08)',
      }}>
        <span style={{
          fontFamily: FONT_SANS,
          fontSize: 26,
          fontWeight: 500,
          color:'#F4EFE6',
          letterSpacing:'-0.005em',
          lineHeight: 1.4,
        }}>{cue.text}</span>
      </div>
    </div>
  );
}

// Top-level chrome: title bar with film name + runtime
function FilmChrome() {
  const t = useTime();
  const total = 229;
  const fmt = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };
  return (
    <div style={{
      position:'absolute',
      bottom: 28, left: 0, right: 0,
      display:'flex', justifyContent:'space-between',
      padding:'0 32px',
      pointerEvents:'none',
      zIndex: 90,
      fontFamily: FONT_MONO,
      fontSize: 11,
      letterSpacing:'0.25em',
      textTransform:'uppercase',
      color:'rgba(244,239,230,0.45)',
    }}>
      <div>OBESITY CARE CLINIC · The True Story · 2026</div>
      <div style={{ display:'flex', gap: 24 }}>
        <span>{fmt(t)} / {fmt(total)}</span>
        <span>EN</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ambient music bed — soft generative pad via Web Audio
// ---------------------------------------------------------------------------

function useAmbientMusic(enabled) {
  const ctxRef = React.useRef(null);
  const nodesRef = React.useRef(null);

  React.useEffect(() => {
    if (!enabled) {
      if (nodesRef.current) {
        try {
          nodesRef.current.master.gain.cancelScheduledValues(0);
          nodesRef.current.master.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.6);
          setTimeout(() => {
            try { nodesRef.current.oscs.forEach(o => o.stop()); } catch(e){}
            try { ctxRef.current.close(); } catch(e){}
            ctxRef.current = null;
            nodesRef.current = null;
          }, 700);
        } catch(e) {}
      }
      return;
    }
    if (nodesRef.current) return;

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    // Fade in
    master.gain.linearRampToValueAtTime(0.085, ctx.currentTime + 2.5);
    // Gentle low-pass for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;
    filter.Q.value = 0.5;
    master.connect(filter);
    filter.connect(ctx.destination);

    // Subtle reverb-ish via convolver with a tiny synthetic IR
    // (skip — keep it light)

    // C minor 9 chord, gentle drift — C, Eb, G, Bb, D
    const baseFreqs = [130.81, 155.56, 196.00, 233.08, 293.66];
    const oscs = [];
    baseFreqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = f;

      // Slow detune drift
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.04 + i * 0.013;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 1.4 + i * 0.6;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);

      // Per-voice gain (slow swell)
      const g = ctx.createGain();
      g.gain.value = 0.0;
      const swell = ctx.createOscillator();
      swell.type = 'sine';
      swell.frequency.value = 0.018 + i * 0.007;
      const swellGain = ctx.createGain();
      swellGain.gain.value = 0.12;
      swell.connect(swellGain);
      swellGain.connect(g.gain);
      // Bias around a base level
      g.gain.value = 0.18 + 0.04 * (i % 2);

      osc.connect(g);
      g.connect(master);
      osc.start();
      lfo.start();
      swell.start();
      oscs.push(osc, lfo, swell);
    });

    nodesRef.current = { master, oscs };
    // Resume context (autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();

    return () => {
      try { oscs.forEach(o => o.stop()); } catch(e){}
      try { ctx.close(); } catch(e){}
      ctxRef.current = null;
      nodesRef.current = null;
    };
  }, [enabled]);
}

function MusicBed({ enabled }) {
  useAmbientMusic(enabled);
  return null;
}

function MusicToggle({ enabled, setEnabled }) {
  return (
    <button
      onClick={() => setEnabled(v => !v)}
      style={{
        position:'absolute',
        top: 28, right: 192,
        zIndex: 95,
        background: enabled ? '#C8A45C' : 'rgba(244,239,230,0.08)',
        color: enabled ? '#0E1B2C' : 'rgba(244,239,230,0.7)',
        border:'1px solid ' + (enabled ? '#C8A45C' : 'rgba(244,239,230,0.2)'),
        padding:'10px 16px',
        fontFamily: FONT_MONO,
        fontSize: 11,
        letterSpacing:'0.25em',
        textTransform:'uppercase',
        cursor:'pointer',
        display:'flex', alignItems:'center', gap: 10,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
      Music {enabled ? 'On' : 'Off'}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Voice narration — recorded MP3, synced to the timeline
// ---------------------------------------------------------------------------

function VoiceNarration({ enabled }) {
  const t = useTime();
  const { playing } = useTimeline();
  const audioRef = React.useRef(null);

  // Create the audio element once
  React.useEffect(() => {
    const a = new Audio('assets/narration.mp3');
    a.preload = 'auto';
    a.volume = 1.0;
    audioRef.current = a;
    return () => { try { a.pause(); } catch(e){} audioRef.current = null; };
  }, []);

  // Enable / disable: mute or unmute, but always keep position synced
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !enabled;
  }, [enabled]);

  // Sync playback to the timeline (play/pause + scrub correction)
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    if (!playing) {
      try { a.pause(); } catch(e){}
      return;
    }

    // Re-sync if drift > 0.25s (scrub or initial start)
    const drift = Math.abs((a.currentTime || 0) - t);
    if (drift > 0.25 && isFinite(a.duration)) {
      try { a.currentTime = Math.min(t, a.duration - 0.05); } catch(e){}
    }

    if (a.paused) {
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, [t, playing]);

  return null;
}

function VoiceToggle({ enabled, setEnabled }) {
  return (
    <button
      onClick={() => setEnabled(v => !v)}
      style={{
        position:'absolute',
        top: 28, right: 32,
        zIndex: 95,
        background: enabled ? '#D9613A' : 'rgba(244,239,230,0.08)',
        color: enabled ? '#F4EFE6' : 'rgba(244,239,230,0.7)',
        border:'1px solid ' + (enabled ? '#D9613A' : 'rgba(244,239,230,0.2)'),
        padding:'10px 16px',
        fontFamily: FONT_MONO,
        fontSize: 11,
        letterSpacing:'0.25em',
        textTransform:'uppercase',
        cursor:'pointer',
        display:'flex', alignItems:'center', gap: 10,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {enabled ? (
          <React.Fragment>
            <path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor" stroke="none"/>
            <path d="M16 8a5 5 0 0 1 0 8"/>
            <path d="M19 5a9 9 0 0 1 0 14"/>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor" stroke="none"/>
            <line x1="16" y1="9" x2="22" y2="15"/>
            <line x1="22" y1="9" x2="16" y2="15"/>
          </React.Fragment>
        )}
      </svg>
      Voice {enabled ? 'On' : 'Off'}
    </button>
  );
}

// Track a per-second timestamp on the root, for commenting
function ScreenLabelUpdater() {
  const t = useTime();
  React.useEffect(() => {
    const sec = Math.floor(t);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const label = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    const root = document.getElementById('film-root');
    if (root && root.dataset.screenLabel !== label) {
      root.dataset.screenLabel = label;
    }
  }, [Math.floor(t)]);
  return null;
}

// Re-provide TimelineContext so children's Sprite start/end are scene-local
function LocalTimeline({ start, end, children }) {
  const outer = useTimeline();
  const localTime = clamp(outer.time - start, 0, end - start);
  const value = React.useMemo(
    () => ({ ...outer, time: localTime, duration: end - start }),
    [outer, localTime, end, start]
  );
  return (
    <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
  );
}

function FilmTimeline({ voiceEnabled }) {
  return (
    <React.Fragment>
      {SCENES.map((sc, i) => (
        <Sprite key={i} start={sc.start} end={sc.end + 0.4 /* small overlap for crossfade */}>
          <LocalTimeline start={sc.start} end={sc.end + 0.4}>
            <SceneFade>{sc.render()}</SceneFade>
          </LocalTimeline>
        </Sprite>
      ))}
      <ActiveSubtitle/>
      <VoiceNarration enabled={voiceEnabled}/>
      <Letterbox height={64}/>
      <FilmChrome/>
      <ScreenLabelUpdater/>
    </React.Fragment>
  );
}

function FilmRoot() {
  const [soundEnabled, setSoundEnabled] = React.useState(false);
  return (
    <div id="film-root" data-screen-label="00:00" style={{ position:'absolute', inset:0 }}>
      <Stage
        width={1920}
        height={1080}
        duration={229.5}
        background="#000000"
        persistKey="occ-film-v8"
      >
        <FilmTimeline voiceEnabled={soundEnabled}/>
      </Stage>
      <VoiceToggle enabled={soundEnabled} setEnabled={setSoundEnabled}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<FilmRoot/>);

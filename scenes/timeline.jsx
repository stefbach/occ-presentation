// timeline.jsx — orchestrate the 6 scenes + global subtitles + transitions
// Total duration: 254s (4:14) — restructured narrative:
// Friendship → Malta (vs Turkey, then price wall) → S2 revelation → France (the quality answer) → Today → Closing

const SCENES = [
  { start: 0,    end: 40,   render: () => <Scene1/> },  // Friendship (extended)
  { start: 40,   end: 97,   render: () => <Scene2/> },  // Malta + the price wall
  { start: 97,   end: 143,  render: () => <Scene4/> },  // S2 revelation
  { start: 143,  end: 191,  render: () => <Scene3/> },  // France becomes the answer
  { start: 191,  end: 234,  render: () => <Scene5/> },  // Today
  { start: 234,  end: 259,  render: () => <Scene6/> },  // Closing
];

const SUBTITLES = [
  // Scene 1 (0-40) — Founding friendship
  { s: 2.0,  e: 9.5,   text: "It all begins with a friendship — more than thirty years between two doctors." },
  { s: 10.0, e: 20.5,  text: "Doctor Thierry Manos, gastroenterologist — one of France's leading specialists in endoscopic sleeve gastroplasty." },
  { s: 21.0, e: 28.0,  text: "And myself — Doctor Stéphane Bach, public health physician and entrepreneur." },
  { s: 28.5, e: 39.0,  text: "Together — through an established collaboration with ELSAN — we set out to treat obesity at the scale of its impact." },

  // Scene 2 (40-97) — Malta: the alternative to Turkey, and the price wall
  { s: 40.5,  e: 47.0,  text: "In March 2023, we launched Obesity Care Clinic." },
  { s: 47.5,  e: 55.0,  text: "We saw what Turkey was offering — bariatric surgery at very low cost, but without the same standards of care." },
  { s: 55.5,  e: 64.0,  text: "Malta would be our answer: a Mediterranean platform, English-speaking, European, with quality medicine." },
  { s: 64.5,  e: 72.0,  text: "But we hit a wall — five thousand five hundred euros in Malta, against three thousand in Turkey." },
  { s: 72.5,  e: 79.5,  text: "Even with quality, the price kept patients away." },
  { s: 80.0,  e: 88.0,  text: "We had built the team, the partnerships, the AI tools — but the economics did not yet add up." },
  { s: 88.5,  e: 96.0,  text: "We needed another path. One where the patient would no longer have to pay." },

  // Scene 3 (97-143) — The S2 revelation — pivot moment, zero cost for the patient
  { s: 97.5,  e: 104.5,  text: "And then we activated a forgotten right." },
  { s: 105.0,  e: 114.0, text: "Preserved after Brexit by the Trade and Cooperation Agreement: the NHS S2 form." },
  { s: 114.5,  e: 124.0, text: "It allows a British patient to be operated in Europe — fully funded by the NHS. Zero cost for the patient." },
  { s: 124.5,  e: 133.0, text: "We handle everything: the concierge service, the file processing, fighting for each NHS approval." },
  { s: 133.5,  e: 142.0, text: "It is legal. It is a right. But almost no one activates it. We made it the heart of our model." },

  // Scene 4 (143-191) — France becomes the answer (because Malta could not process S2)
  { s: 143.5,  e: 151.5, text: "But Malta's health system could not process the S2 pathway. France could." },
  { s: 152.0,  e: 160.0, text: "So we turned to the highest standard of quality — France." },
  { s: 160.5,  e: 169.5, text: "Through an established collaboration with ELSAN, at Bouchard Private Hospital in Marseille." },
  { s: 170.0,  e: 179.5, text: "Surgical care coordinated by Doctor Marius Nedelcu — one of Europe's leading bariatric surgeons." },
  { s: 180.0,  e: 190.0, text: "British patients now receive the same surgery, the same care pathway, as any French citizen." },

  // Scene 5 (191-234) — Today, the operational flow
  { s: 191.5,  e: 200.5, text: "Today, since the beginning of this year, fifty-five British patients have placed their trust in us." },
  { s: 201.0,  e: 208.5, text: "Seven have been operated. Others are on the waiting list." },
  { s: 209.0,  e: 216.0, text: "Thirty-five files are currently pending NHS validation." },
  { s: 216.5,  e: 223.0, text: "The operational flow has begun — and it is accelerating." },
  { s: 223.5,  e: 232.5, text: "A second establishment, in Martigues, will soon join our active network." },

  // Scene 6 (234-259) — What comes next
  { s: 234.5,  e: 240.5, text: "Three years. Three steps. One conviction:" },
  { s: 241.0,  e: 249.5, text: "Helping every patient suffer less from obesity — and from the medical complications it brings." },
  { s: 250.0,  e: 258.0, text: "Obesity Care Clinic. Connecting patients. Simplifying their journey." },
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
  const total = 259;
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
// Voice narration — Web Speech API, synced to subtitle cues
// ---------------------------------------------------------------------------

function pickVoice() {
  const voices = window.speechSynthesis.getVoices() || [];
  // Allow user override via localStorage (set by the voice picker UI)
  const override = (() => {
    try { return localStorage.getItem('siramed_voice_uri'); } catch(e) { return null; }
  })();
  if (override) {
    const m = voices.find(v => v.voiceURI === override || v.name === override);
    if (m) return m;
  }

  const prefs = [
    // ---- TOP-TIER MALE BRITISH ----
    // Google UK English Male — Chrome's natural-sounding male voice (best on Mac/Win Chrome)
    v => /Google UK English Male/i.test(v.name),
    // Apple Daniel UK — works whether name is "Daniel" or "Daniel (anglais (Royaume-Uni))"
    v => v.lang === 'en-GB' && /\bDaniel\b/i.test(v.name),
    // Apple Arthur (en-GB male)
    v => v.lang === 'en-GB' && /\bArthur\b/i.test(v.name),
    // Microsoft Ryan / George (Edge/Win)
    v => v.lang === 'en-GB' && /\bRyan\b|\bGeorge\b/i.test(v.name),

    // ---- MALE US/IRISH FALLBACK ----
    // Apple US males
    v => v.lang === 'en-US' && /\bAaron\b|\bFred\b|\bAlbert\b|\bRalph\b/i.test(v.name),
    v => v.lang === 'en-IN' && /\bRishi\b/i.test(v.name),
    v => v.lang === 'en-AU' && /\bGordon\b/i.test(v.name),

    // ---- LAST RESORT: any en-GB that is NOT a known female ----
    v => v.lang === 'en-GB' && !/Female|Martha|Catherine|Karen|Tessa|Moira|Samantha|Fiona|Serena|Kate|Susan/i.test(v.name),
  ];
  for (const p of prefs) {
    const m = voices.find(p);
    if (m) return m;
  }
  return voices.find(v => /^en/i.test(v.lang)) || voices[0];
}

function getEnglishVoices() {
  return (window.speechSynthesis.getVoices() || []).filter(v => /^en/i.test(v.lang));
}

function VoiceNarration({ enabled }) {
  const t = useTime();
  const { playing } = useTimeline();
  const lastSpokenRef = React.useRef(null);

  // Cancel speech when paused, scrubbed, or disabled
  React.useEffect(() => {
    if (!enabled || !playing) {
      window.speechSynthesis.cancel();
      lastSpokenRef.current = null;
    }
  }, [enabled, playing]);

  React.useEffect(() => {
    if (!enabled || !playing) return;
    const cue = SUBTITLES.find(c => t >= c.s && t <= c.e);
    const key = cue ? `${cue.s}:${cue.text}` : null;

    if (key && key !== lastSpokenRef.current) {
      // Don't start in the middle of a cue (avoid awkward partial reads on scrub)
      if (t - cue.s > 0.45) return;
      lastSpokenRef.current = key;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(cue.text);
        const voice = pickVoice();
        if (voice) { u.voice = voice; u.lang = voice.lang; }
        else { u.lang = 'en-GB'; }
        // Deeper, calmer male delivery — wider rate range so heavy sentences can breathe.
        const dur = cue.e - cue.s;
        const wordCount = cue.text.trim().split(/\s+/).length;
        const wantedRate = wordCount / Math.max(dur - 0.5, 1.5) / 2.7;
        u.rate = clamp(wantedRate, 0.72, 1.0);
        u.pitch = 0.4;     // very deep, fully masculine
        u.volume = 1.0;
        window.speechSynthesis.speak(u);
      } catch(e) { /* ignore */ }
    }
  }, [t, enabled, playing]);

  return null;
}

function VoiceToggle({ enabled, setEnabled }) {
  const [showPicker, setShowPicker] = React.useState(false);
  const [voices, setVoices] = React.useState([]);
  const [selectedURI, setSelectedURI] = React.useState(() => {
    try { return localStorage.getItem('siramed_voice_uri') || ''; } catch(e) { return ''; }
  });

  React.useEffect(() => {
    const refresh = () => setVoices(getEnglishVoices());
    refresh();
    window.speechSynthesis.onvoiceschanged = refresh;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const setVoice = (uri) => {
    setSelectedURI(uri);
    try {
      if (uri) localStorage.setItem('siramed_voice_uri', uri);
      else localStorage.removeItem('siramed_voice_uri');
    } catch(e) {}
    // Sample the new voice
    if (uri && enabled) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance("Voice selected.");
      const v = (window.speechSynthesis.getVoices()||[]).find(x => x.voiceURI === uri);
      if (v) { u.voice = v; u.lang = v.lang; }
      u.pitch = 0.4; u.rate = 0.9; u.volume = 1.0;
      window.speechSynthesis.speak(u);
    }
  };

  // Group voices: known-male first, then others
  const isLikelyMale = (n) => /Daniel|Arthur|Aaron|Albert|Fred|Ralph|Rishi|Gordon|Reed|Eddy|Rocko|Junior|Bruce|Lee|Tom|Alex|Ryan|George|Mark|Guy|James|William|David|UK English Male|US English/i.test(n);
  const males = voices.filter(v => isLikelyMale(v.name));
  const others = voices.filter(v => !isLikelyMale(v.name));

  return (
    <div style={{ position:'absolute', top: 28, right: 32, zIndex: 95, display:'flex', flexDirection:'column', alignItems:'flex-end', gap: 8 }}>
      <div style={{ display:'flex', gap: 8 }}>
        <button
          onClick={() => setEnabled(v => !v)}
          style={{
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
        <button
          onClick={() => setShowPicker(s => !s)}
          style={{
            background: 'rgba(244,239,230,0.08)',
            color: 'rgba(244,239,230,0.85)',
            border:'1px solid rgba(244,239,230,0.2)',
            padding:'10px 14px',
            fontFamily: FONT_MONO, fontSize: 11, letterSpacing:'0.25em', textTransform:'uppercase',
            cursor:'pointer',
          }}
        >
          {showPicker ? 'Close' : 'Pick voice'}
        </button>
      </div>

      {showPicker && (
        <div style={{
          background:'rgba(10,10,10,0.92)',
          border:'1px solid rgba(244,239,230,0.18)',
          padding:'14px 16px',
          width: 320,
          maxHeight: 380,
          overflow:'auto',
          fontFamily: FONT_MONO, fontSize: 11,
          color:'rgba(244,239,230,0.85)',
        }}>
          <div style={{ letterSpacing:'0.25em', textTransform:'uppercase', opacity:0.6, marginBottom: 10 }}>
            Choose a male voice
          </div>
          <select
            value={selectedURI}
            onChange={(e) => setVoice(e.target.value)}
            style={{
              width:'100%', padding:'8px 10px',
              background:'rgba(244,239,230,0.05)',
              color:'#F4EFE6',
              border:'1px solid rgba(244,239,230,0.2)',
              fontFamily: FONT_MONO, fontSize: 11,
              marginBottom: 10,
            }}
          >
            <option value="">— Auto-pick —</option>
            {males.length > 0 && <optgroup label="Likely male">
              {males.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
            </optgroup>}
            {others.length > 0 && <optgroup label="Other English">
              {others.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
            </optgroup>}
          </select>
          <div style={{ opacity:0.55, fontSize: 10, lineHeight: 1.5 }}>
            Tip on Mac: Google UK English Male or Daniel give the deepest male voice.
            Selection is saved.
          </div>
        </div>
      )}
    </div>
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
  // Warm up voice list on mount
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    return () => { try { window.speechSynthesis.cancel(); } catch(e){} };
  }, []);
  return (
    <div id="film-root" data-screen-label="00:00" style={{ position:'absolute', inset:0 }}>
      <Stage
        width={1920}
        height={1080}
        duration={259}
        background="#000000"
        persistKey="occ-film-v5"
      >
        <FilmTimeline voiceEnabled={soundEnabled}/>
      </Stage>
      <VoiceToggle enabled={soundEnabled} setEnabled={setSoundEnabled}/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<FilmRoot/>);

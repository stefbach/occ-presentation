// timeline.jsx — orchestrate the 6 scenes + global subtitles + transitions
// Total duration: 120s (2:00)

const SCENES = [
  { start: 0,    end: 18,   render: () => <Scene1/> },
  { start: 18,   end: 40,   render: () => <Scene2/> },
  { start: 40,   end: 60,   render: () => <Scene3/> },
  { start: 60,   end: 85,   render: () => <Scene4/> },
  { start: 85,   end: 110,  render: () => <Scene5/> },
  { start: 110,  end: 120,  render: () => <Scene6/> },
];

// Subtitle cues — keep on-screen text concise (synced ~ to spoken English)
const SUBTITLES = [
  // Scene 1 (0-18)
  { s: 1.0, e: 5.5,   text: "It all begins with a friendship — more than 30 years between two doctors." },
  { s: 5.7, e: 10.5,  text: "Thierry Manos, gastroenterologist. One of France's leading specialists in endoscopic sleeve gastroplasty." },
  { s: 10.7, e: 14.5, text: "Me — a public health physician, an entrepreneur." },
  { s: 14.7, e: 18.0, text: "And the same observation: obesity kills, and no one is treating it at scale." },

  // Scene 2 (18-40)
  { s: 18.5, e: 22.0, text: "In March 2023, we launched Obesity Care Clinic." },
  { s: 22.3, e: 27.5, text: "Our first intuition: make Malta the Mediterranean platform for bariatric medical tourism." },
  { s: 27.8, e: 32.0, text: "An English-speaking European crossroads, at the meeting point of cultures." },
  { s: 32.2, e: 36.0, text: "We built a team. Forged industrial partnerships. Deployed AI tools." },
  { s: 36.2, e: 39.8, text: "We learned as we moved forward." },

  // Scene 3 (40-60) — Late 2025: France joins
  { s: 40.5, e: 45.0, text: "Late 2025 — France joins our network." },
  { s: 45.3, e: 50.5, text: "Malta's health system did not allow the S2 pathway. France did." },
  { s: 50.8, e: 54.5, text: "And France offers one of the highest standards of care in the world." },
  { s: 54.8, e: 59.8, text: "Three steps: pre-operative assessment, surgery one month later, long-term follow-up — and we never drop you in between." },

  // Scene 4 (60-85)
  { s: 60.5, e: 64.5, text: "And then I discovered a forgotten right." },
  { s: 64.8, e: 71.5, text: "Preserved after Brexit by the Trade and Cooperation Agreement: the NHS S2 form." },
  { s: 71.8, e: 77.5, text: "It allows a British patient to be operated in France, fully funded by the NHS." },
  { s: 77.8, e: 80.8, text: "It is legal. It is a right. But no one activates it." },
  { s: 81.0, e: 84.8, text: "We decided to make it the heart of our model." },

  // Scene 5 (85-110)
  { s: 85.5, e: 91.0, text: "Today, since the start of this year, 55 British patients have placed their trust in us." },
  { s: 91.3, e: 95.5, text: "Seven have been operated. Others are on the waiting list." },
  { s: 95.8, e: 100.0, text: "Several files are pending NHS validation." },
  { s: 100.3, e: 104.5, text: "The operational flow has begun." },
  { s: 104.8, e: 109.5, text: "And a second establishment, in Martigues, will soon join our active network." },

  // Scene 6 (110-120)
  { s: 110.5, e: 113.5, text: "Three years. Three steps. One conviction:" },
  { s: 113.8, e: 117.0, text: "no patient should die waiting for their operation." },
  { s: 117.3, e: 119.8, text: "Obesity Care Clinic — connecting patients, simplifying journey." },
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
  const total = 120;
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

function FilmTimeline() {
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
      <Letterbox height={64}/>
      <FilmChrome/>
      <ScreenLabelUpdater/>
    </React.Fragment>
  );
}

function FilmRoot() {
  return (
    <div id="film-root" data-screen-label="00:00" style={{ position:'absolute', inset:0 }}>
      <Stage
        width={1920}
        height={1080}
        duration={120}
        background="#000000"
        persistKey="occ-film-v1"
      >
        <FilmTimeline/>
      </Stage>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<FilmRoot/>);

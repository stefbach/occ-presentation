// shared.jsx — design tokens, common chrome, helpers

const TOKENS = {
  ink:     '#0E1B2C',     // deep navy
  inkSoft: '#1B2D45',
  cream:   '#F4EFE6',
  paper:   '#EAE3D5',
  coral:   '#D9613A',     // OCC accent — warm coral/clay
  coralDeep: '#A6431F',
  sage:    '#7A8C6F',
  gold:    '#C8A45C',
  rule:    'rgba(14,27,44,0.18)',
};

// Display + body type
const FONT_DISPLAY = '"Fraunces", "Cormorant Garamond", Georgia, serif';
const FONT_SANS    = '"Inter", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO    = '"JetBrains Mono", ui-monospace, monospace';

// ── Film Grain overlay ──────────────────────────────────────────────────
function FilmGrain({ opacity = 0.06 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      opacity,
      mixBlendMode: 'multiply',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      backgroundSize: '200px 200px',
    }} />
  );
}

// ── Vignette ─────────────────────────────────────────────────────────────
function Vignette({ strength = 0.35 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      background: `radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,${strength}) 100%)`,
    }} />
  );
}

// ── Letterbox bars (cinematic 2.39:1 inside 16:9) ─────────────────────────
function Letterbox({ height = 88, color = '#000' }) {
  return (
    <React.Fragment>
      <div style={{ position:'absolute', top:0, left:0, right:0, height, background:color, zIndex: 50, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height, background:color, zIndex: 50, pointerEvents:'none' }} />
    </React.Fragment>
  );
}

// ── Scene "shot" timecode + shot label (top corners during scene) ───────
function ShotChrome({ scene, shot, time }) {
  const t = useTime();
  return (
    <div style={{
      position: 'absolute', top: 16, left: 0, right: 0,
      display: 'flex', justifyContent: 'space-between',
      padding: '0 32px',
      zIndex: 60,
      fontFamily: FONT_MONO,
      fontSize: 12,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'rgba(244,239,230,0.55)',
    }}>
      <div>OCC · {scene}</div>
      <div style={{ display:'flex', gap: 18 }}>
        <span>SHOT {shot}</span>
        <span>{fmtTC(t)}</span>
        <span style={{ color: '#D9613A' }}>● REC</span>
      </div>
    </div>
  );
}

function fmtTC(t) {
  const total = Math.max(0, t);
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  const f = Math.floor((total * 24) % 24);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(f).padStart(2,'0')}`;
}

// ── Lower-third caption (Dr Stéphane Bach etc.) ──────────────────────────
function LowerThird({ name, role, accent = '#D9613A', delay = 0.4 }) {
  const { localTime, duration } = useSprite();
  const enter = clamp((localTime - delay) / 0.6, 0, 1);
  const exit = clamp((localTime - (duration - 0.6)) / 0.6, 0, 1);
  const t = Easing.easeOutCubic(enter) * (1 - Easing.easeInCubic(exit));

  return (
    <div style={{
      position: 'absolute',
      left: 96,
      bottom: 140,
      transform: `translateX(${(1 - t) * -20}px)`,
      opacity: t,
      zIndex: 40,
    }}>
      <div style={{
        display: 'flex', alignItems: 'stretch',
        gap: 14,
      }}>
        <div style={{
          width: 4,
          background: accent,
          transform: `scaleY(${t})`,
          transformOrigin: 'top',
        }} />
        <div>
          <div style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 38,
            fontWeight: 500,
            color: '#F4EFE6',
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
          }}>{name}</div>
          <div style={{
            fontFamily: FONT_SANS,
            fontSize: 16,
            fontWeight: 400,
            color: 'rgba(244,239,230,0.7)',
            marginTop: 6,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

// ── Subtitle (translation of the spoken script) ─────────────────────────
function Subtitle({ text, delay = 0 }) {
  const { localTime, duration } = useSprite();
  const enter = clamp((localTime - delay) / 0.4, 0, 1);
  const exit = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
  const t = Easing.easeOutCubic(enter) * (1 - Easing.easeInCubic(exit));

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      transform: `translate(-50%, ${(1 - t) * 8}px)`,
      bottom: 56,
      width: 'min(1400px, 80%)',
      textAlign: 'center',
      opacity: t,
      zIndex: 40,
    }}>
      <div style={{
        fontFamily: FONT_SANS,
        fontSize: 26,
        fontWeight: 500,
        color: '#F4EFE6',
        letterSpacing: '-0.005em',
        lineHeight: 1.35,
        textShadow: '0 2px 16px rgba(0,0,0,0.6)',
      }}>{text}</div>
    </div>
  );
}

// ── Scene title card chrome (chapter marker) ────────────────────────────
function ChapterMarker({ chapter, title, year }) {
  const { localTime, duration } = useSprite();
  const enter = clamp(localTime / 0.7, 0, 1);
  const exit = clamp((localTime - (duration - 0.6)) / 0.6, 0, 1);
  const t = Easing.easeOutCubic(enter) * (1 - Easing.easeInCubic(exit));

  return (
    <div style={{
      position: 'absolute',
      top: 110,
      left: 96,
      zIndex: 40,
      opacity: t,
      transform: `translateX(${(1 - t) * -16}px)`,
    }}>
      <div style={{
        fontFamily: FONT_MONO,
        fontSize: 13,
        letterSpacing: '0.3em',
        color: '#D9613A',
        textTransform: 'uppercase',
      }}>Chapter {chapter}</div>
      {year && (
        <div style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          color: 'rgba(244,239,230,0.6)',
          marginTop: 4,
          fontStyle: 'italic',
        }}>{year}</div>
      )}
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 56,
        fontWeight: 400,
        color: '#F4EFE6',
        marginTop: 8,
        letterSpacing: '-0.02em',
        lineHeight: 1.0,
        maxWidth: 720,
      }}>{title}</div>
    </div>
  );
}

// ── Ken-Burns wrapper for B-roll plates ─────────────────────────────────
function KenBurns({ children, from = 1.0, to = 1.12, panX = 0, panY = 0 }) {
  const { progress } = useSprite();
  const e = Easing.easeInOutQuad(progress);
  const scale = from + (to - from) * e;
  const tx = panX * e;
  const ty = panY * e;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
      transformOrigin: 'center',
      willChange: 'transform',
    }}>{children}</div>
  );
}

// ── Crossfade between scenes ────────────────────────────────────────────
function SceneFade({ children }) {
  const { localTime, duration } = useSprite();
  const fadeIn = clamp(localTime / 0.5, 0, 1);
  const fadeOut = clamp((localTime - (duration - 0.5)) / 0.5, 0, 1);
  const opacity = Easing.easeOutCubic(fadeIn) * (1 - Easing.easeInCubic(fadeOut));
  return (
    <div style={{ position:'absolute', inset:0, opacity }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  TOKENS, FONT_DISPLAY, FONT_SANS, FONT_MONO,
  FilmGrain, Vignette, Letterbox,
  ShotChrome, LowerThird, Subtitle, ChapterMarker,
  KenBurns, SceneFade, fmtTC,
});

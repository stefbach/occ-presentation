// scene6.jsx — What Comes Next
// Scene 6 closing: 194.5 → 213.5 (19s)
// Sequence: Bach big → Manos big → Nedelcu big → Trio together → Logo lockup

function OCCLogo({ size = 1, glow = 0 }) {
  return (
    <svg width={420 * size} height={120 * size} viewBox="0 0 420 120">
      <defs>
        <linearGradient id="logogold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9613A"/>
          <stop offset="100%" stopColor="#C8A45C"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="40" stroke="#F4EFE6" strokeWidth="3" fill="none"/>
      <circle cx="60" cy="60" r="40" stroke="#D9613A" strokeWidth="3" fill="none"
        strokeDasharray="251" strokeDashoffset={251 * (1 - glow)} opacity={glow}/>
      <path d="M 200 30 A 40 40 0 1 0 200 90" stroke="#F4EFE6" strokeWidth="3" fill="none"/>
      <path d="M 320 30 A 40 40 0 1 0 320 90" stroke="#F4EFE6" strokeWidth="3" fill="none"/>
      <text x="210" y="115" textAnchor="middle"
        fontFamily={FONT_MONO} fontSize="11" letterSpacing="0.45em"
        fill="rgba(244,239,230,0.7)">
        OBESITY · CARE · CLINIC
      </text>
    </svg>
  );
}

// One full-bleed portrait card. Crossfades on enter/exit.
function HeroPortrait({ src, name, role, opacity, scale, gradientSide = 'right' }) {
  return (
    <div style={{
      position:'absolute', inset:0,
      opacity,
      transform:`scale(${scale})`,
      transformOrigin:'40% 50%',
      background:'#0a1422',
      overflow:'hidden',
    }}>
      <img src={src} alt={name}
        style={{
          position:'absolute', inset:0,
          width:'100%', height:'100%',
          objectFit:'cover',
          objectPosition:'center 25%',
          filter:'contrast(1.08) saturate(0.95) brightness(1.05)',
        }}/>
      {/* Side gradient so name reads cleanly */}
      <div style={{
        position:'absolute', inset:0,
        background: gradientSide === 'right'
          ? 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(14,27,44,0.55) 78%, rgba(14,27,44,0.85) 100%)'
          : 'linear-gradient(270deg, transparent 0%, transparent 45%, rgba(14,27,44,0.55) 78%, rgba(14,27,44,0.85) 100%)',
      }}/>
    </div>
  );
}

function NameOverlay({ name, role, side = 'right', opacity = 1 }) {
  const isRight = side === 'right';
  return (
    <div style={{
      position:'absolute',
      [isRight ? 'right' : 'left']: 96,
      bottom: 180,
      textAlign: isRight ? 'right' : 'left',
      zIndex: 30,
      opacity,
    }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 11,
        letterSpacing:'0.35em', textTransform:'uppercase',
        color:'rgba(217,97,58,0.95)', marginBottom: 14,
      }}>{role}</div>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 76, fontWeight: 400,
        color:'#F4EFE6', letterSpacing:'-0.025em', lineHeight: 1.0,
        textShadow:'0 4px 24px rgba(0,0,0,0.6)',
      }}>{name}</div>
    </div>
  );
}

function Scene6() {
  const { localTime, duration } = useSprite();

  // Portrait sequence — local times within scene 6 (35s total)
  // 0    – 8    : Bach big (covers "Three years..." mantra)
  // 8    – 14   : Manos big (6s hold)
  // 14   – 20   : Nedelcu big (6s hold)
  // 20   – 29   : Trio together (9s hold)
  // 26   – 35   : Logo lockup with slow OCC ring animation

  const fade = (t, inStart, inEnd, outStart, outEnd) => {
    const i = clamp((t - inStart) / Math.max(inEnd - inStart, 0.01), 0, 1);
    const o = clamp((t - outStart) / Math.max(outEnd - outStart, 0.01), 0, 1);
    return Easing.easeInOutCubic(i) * (1 - Easing.easeInOutCubic(o));
  };

  const bachOp    = fade(localTime, 0,    0.6,   8,    9);
  const manosOp   = fade(localTime, 8,    9,     14,   15);
  const nedelcuOp = fade(localTime, 14,   15,    20,   21);
  const trioOp    = fade(localTime, 20,   21,    29,   30);
  const logoOp    = fade(localTime, 26,   27.5,  40,   41);
  // Slow OCC ring fill — drawn over ~6s for a true reveal
  const logoGlow  = clamp((localTime - 27) / 6.0, 0, 1);

  const kb = Easing.easeInOutQuad(clamp(localTime / duration, 0, 1));
  const slowZoom = 1.0 + 0.04 * kb;

  return (
    <div style={{ position:'absolute', inset:0, background:'#000' }}>
      {/* ---------- BACH ---------- */}
      {bachOp > 0.001 && (
        <HeroPortrait src="assets/bach.png" name="Dr Stéphane Bach" role="Co-founder"
          opacity={bachOp} scale={slowZoom} gradientSide="right"/>
      )}
      {bachOp > 0.5 && (
        <NameOverlay name="Dr Stéphane Bach" role="Co-founder · Public Health" side="right" opacity={bachOp}/>
      )}

      {/* ---------- MANOS ---------- */}
      {manosOp > 0.001 && (
        <HeroPortrait src="assets/manos.png" name="Dr Thierry Manos" role="Co-founder"
          opacity={manosOp} scale={slowZoom} gradientSide="left"/>
      )}
      {manosOp > 0.5 && (
        <NameOverlay name="Dr Thierry Manos" role="Co-founder · Gastroenterology" side="left" opacity={manosOp}/>
      )}

      {/* ---------- NEDELCU ---------- */}
      {nedelcuOp > 0.001 && (
        <HeroPortrait src="assets/nedelcu.png" name="Dr Marius Nedelcu" role="Surgical Coordinator"
          opacity={nedelcuOp} scale={slowZoom} gradientSide="right"/>
      )}
      {nedelcuOp > 0.5 && (
        <NameOverlay name="Dr Marius Nedelcu" role="Bariatric Surgery · ELSAN" side="right" opacity={nedelcuOp}/>
      )}

      <Vignette strength={0.4}/>
      <FilmGrain opacity={0.06}/>

      {/* ---------- TRIO ---------- */}
      {trioOp > 0.001 && (() => {
        const docs = [
          { src: "assets/bach.png",    name: 'Dr Stéphane Bach',    role: 'Co-founder' },
          { src: "assets/manos.png",   name: 'Dr Thierry Manos',    role: 'Co-founder' },
          { src: "assets/nedelcu.png", name: 'Dr Marius Nedelcu',   role: 'Surgical Coordinator' },
        ];
        const lt = localTime - 12.5; // local to trio entrance
        return (
          <div style={{
            position:'absolute', inset:0,
            background:'#0E1B2C',
            opacity: trioOp,
            zIndex: 25,
          }}>
            <div style={{
              position:'absolute',
              left:'50%', top:'50%',
              transform:'translate(-50%, -50%)',
              display:'flex', gap: 40,
            }}>
              {docs.map((d, i) => {
                const t = Easing.easeOutCubic(clamp((lt - i*0.2) / 0.7, 0, 1));
                return (
                  <div key={i} style={{
                    width: 360,
                    opacity: t,
                    transform:`translateY(${(1-t)*30}px)`,
                  }}>
                    <div style={{
                      width:'100%', height: 460,
                      overflow:'hidden', background:'#0a1422',
                      boxShadow:'0 30px 60px rgba(0,0,0,0.5)',
                      borderBottom:'3px solid #D9613A',
                    }}>
                      <img src={d.src} alt={d.name} style={{
                        width:'100%', height:'100%', objectFit:'cover',
                        objectPosition:'center 25%',
                        filter:'contrast(1.05) saturate(0.95)',
                      }}/>
                    </div>
                    <div style={{
                      marginTop: 18,
                      fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 500,
                      color:'#F4EFE6', letterSpacing:'-0.02em', lineHeight: 1.05,
                      textAlign:'center',
                    }}>{d.name}</div>
                    <div style={{
                      marginTop: 6,
                      fontFamily: FONT_MONO, fontSize: 10,
                      color:'rgba(244,239,230,0.6)',
                      letterSpacing:'0.28em', textTransform:'uppercase',
                      textAlign:'center',
                    }}>{d.role}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ---------- MANTRA — over Bach intro (extended to match longer Bach hold) ---------- */}
      <Sprite start={0.6} end={7.8}>
        {({ localTime: lt }) => {
          const lines = [
            { text: 'Three years.',     t: 0.0 },
            { text: 'Three steps.',     t: 0.7 },
            { text: 'One conviction.',  t: 1.4, italic: true, color: '#D9613A' },
          ];
          return (
            <div style={{
              position:'absolute',
              right: 96, top: '50%',
              transform:'translateY(-50%)',
              textAlign:'right',
              zIndex: 30,
            }}>
              {lines.map((l, i) => {
                const t = Easing.easeOutCubic(clamp((lt - l.t) / 0.6, 0, 1));
                const exit = clamp((lt - 6.5) / 0.6, 0, 1);
                return (
                  <div key={i} style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 76, fontWeight: 400,
                    color: l.color || '#F4EFE6',
                    letterSpacing:'-0.03em', lineHeight: 1.05,
                    opacity: t * (1 - Easing.easeInCubic(exit)),
                    transform:`translateX(${(1-t)*30}px)`,
                    fontStyle: l.italic ? 'italic' : 'normal',
                    textShadow:'0 4px 24px rgba(0,0,0,0.6)',
                  }}>{l.text}</div>
                );
              })}
            </div>
          );
        }}
      </Sprite>

      {/* ---------- LOGO LOCKUP ---------- */}
      {logoOp > 0.001 && (
        <div style={{
          position:'absolute',
          left:'50%', top:'50%',
          transform:`translate(-50%, -50%) translateY(${(1-logoOp)*16}px)`,
          opacity: logoOp,
          zIndex: 35,
          textAlign:'center',
        }}>
          <OCCLogo size={1.1} glow={logoGlow}/>
          <div style={{
            marginTop: 36,
            fontFamily: FONT_DISPLAY,
            fontSize: 28, fontStyle:'italic',
            color:'rgba(244,239,230,0.85)',
            letterSpacing:'-0.01em',
          }}>Connecting patients. Simplifying journey.</div>
          <div style={{
            marginTop: 60,
            width: 80, height: 1,
            background:'#D9613A',
            margin:'60px auto 0',
          }}/>
          <div style={{
            marginTop: 22,
            fontFamily: FONT_MONO, fontSize: 11,
            letterSpacing:'0.4em',
            color:'rgba(244,239,230,0.55)',
            textTransform:'uppercase',
          }}>Malta · France · United Kingdom</div>
        </div>
      )}

      <ShotChrome scene="06 / WHAT COMES NEXT" shot="F001"/>
    </div>
  );
}

window.Scene6 = Scene6;

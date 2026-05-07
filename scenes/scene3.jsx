// scene3.jsx — Late 2025: Adding France (0:40 – 1:00)
// France becomes the S2-eligible answer Malta couldn't provide.
// The 3-step French protocol: Bilan → Intervention → Suivi.

function MarseillePlate() {
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'100%' }}>
        <defs>
          <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cbd9d9"/>
            <stop offset="100%" stopColor="#9aa9a3"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="700" fill="url(#sky3)"/>
        <path d="M 0 580 L 200 540 L 420 560 L 680 520 L 920 545 L 1200 510 L 1500 540 L 1920 525 L 1920 720 L 0 720 Z" fill="#7a8c8a" opacity="0.55"/>
        {Array.from({length: 60}).map((_,i)=>{
          const x = i*32;
          const h = 80 + ((i*13)%7)*30;
          const y = 700 - h;
          const c = i%3===0 ? '#d9c8a8' : i%3===1 ? '#c4a878' : '#a88858';
          return (
            <g key={i}>
              <rect x={x} y={y} width="28" height={h} fill={c}/>
              {Array.from({length: Math.floor(h/22)}).map((_,j)=>(
                <rect key={j} x={x+4} y={y+8+j*22} width="6" height="10" fill="#3a2818" opacity="0.7"/>
              ))}
              {Array.from({length: Math.floor(h/22)}).map((_,j)=>(
                <rect key={j+'b'} x={x+18} y={y+8+j*22} width="6" height="10" fill="#3a2818" opacity="0.7"/>
              ))}
            </g>
          );
        })}
        <path d="M 1500 380 L 1520 380 L 1520 320 L 1530 320 L 1530 280 L 1540 280 L 1540 240 L 1545 230 L 1550 240 L 1550 280 L 1560 280 L 1560 320 L 1570 320 L 1570 380 L 1600 380 L 1600 460 L 1480 460 L 1480 380 Z" fill="#d9c8a8"/>
        <circle cx="1545" cy="220" r="8" fill="#C8A45C"/>
        <rect y="700" width="1920" height="380" fill="#3a4f5a"/>
      </svg>
    </div>
  );
}

function ProtocolStep({ idx, kicker, title, desc, delay = 0, photo }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp((localTime - delay) / 0.7, 0, 1));
  return (
    <div style={{
      flex: 1,
      opacity: t,
      transform:`translateY(${(1-t)*30}px)`,
      borderTop: '2px solid #D9613A',
      paddingTop: 22,
      position:'relative',
    }}>
      <div style={{
        position:'absolute', top: -14, left: 0,
        background:'#0E1B2C',
        paddingRight: 14,
        fontFamily: FONT_MONO, fontSize: 11, letterSpacing:'0.3em',
        color:'#D9613A', textTransform:'uppercase',
      }}>STEP {idx} · {kicker}</div>
      <div style={{
        marginTop: 6,
        fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 500,
        color:'#F4EFE6', letterSpacing:'-0.02em', lineHeight: 1.05,
      }}>{title}</div>
      <div style={{
        marginTop: 14,
        fontFamily: FONT_SANS, fontSize: 16, lineHeight: 1.5,
        color:'rgba(244,239,230,0.75)', maxWidth: 380,
      }}>{desc}</div>
    </div>
  );
}

function Scene3() {
  const { localTime, duration } = useSprite();
  const kb = Easing.easeInOutQuad(clamp(localTime / duration, 0, 1));
  const scale = 1.05 + 0.06 * kb;
  return (
    <div style={{ position:'absolute', inset:0, background:'#0a1422' }}>
      <div style={{
        position:'absolute', inset:0,
        transform:`scale(${scale}) translateX(${20*kb}px)`,
        transformOrigin:'30% 50%',
        opacity: 0.55,
      }}>
        <MarseillePlate/>
      </div>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(180deg, rgba(14,27,44,0.4) 0%, rgba(14,27,44,0.92) 70%)',
      }}/>
      <Vignette strength={0.4}/>
      <FilmGrain opacity={0.06}/>

      <Sprite start={0.3} end={5}>
        <ChapterMarker chapter="03" year="LATE 2025" title="France joins." />
      </Sprite>

      {/* Why France: highest standard, S2-eligible */}
      <Sprite start={2.5} end={9}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.7, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              right: 96, top: 130, width: 620,
              opacity: op,
              transform:`translateX(${(1-t)*30}px)`,
              zIndex: 25,
            }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 11,
                color:'#D9613A', letterSpacing:'0.3em',
                textTransform:'uppercase',
              }}>Why France</div>
              <div style={{
                marginTop: 14,
                fontFamily: FONT_DISPLAY, fontSize: 44,
                fontStyle:'italic', color:'#F4EFE6',
                letterSpacing:'-0.025em', lineHeight: 1.1,
                fontWeight: 400,
              }}>One of the highest<br/>standards of care<br/>in the world.</div>
              <div style={{
                marginTop: 22, paddingTop: 18,
                borderTop:'1px solid rgba(244,239,230,0.2)',
                fontFamily: FONT_SANS, fontSize: 16, lineHeight: 1.55,
                color:'rgba(244,239,230,0.8)',
              }}>
                Malta's health system did not allow the S2 pathway.<br/>
                <span style={{ color:'#F4EFE6' }}>France did.</span> Late 2025, our French dimension begins.
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* The 3-step French protocol — centerpiece */}
      <Sprite start={9} end={20.5}>
        {({ localTime: lt, duration: d }) => {
          const head = Easing.easeOutCubic(clamp(lt / 0.6, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = head * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute', inset:0,
              opacity: op,
              zIndex: 30,
            }}>
              {/* Header */}
              <div style={{
                position:'absolute',
                top: 130, left: 96, right: 96,
                transform:`translateY(${(1-head)*16}px)`,
              }}>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 11,
                  color:'#D9613A', letterSpacing:'0.3em',
                  textTransform:'uppercase',
                }}>The french protocol</div>
                <div style={{
                  marginTop: 12,
                  fontFamily: FONT_DISPLAY, fontSize: 64,
                  fontWeight: 400, color:'#F4EFE6',
                  letterSpacing:'-0.03em', lineHeight: 1.0,
                }}>Three steps. One continuous<br/>journey of care.</div>
              </div>

              {/* Steps row */}
              <div style={{
                position:'absolute',
                left: 96, right: 96, bottom: 200,
                display:'flex', gap: 56,
              }}>
                <ProtocolStep
                  idx="01"
                  kicker="Bilan préopératoire"
                  title="Pre-operative assessment."
                  desc="A complete workup — every examination, every specialist — to confirm the right path forward."
                  delay={0.6}
                />
                <ProtocolStep
                  idx="02"
                  kicker="Intervention"
                  title="Surgery, one month later."
                  desc="Performed in France by leading bariatric surgeons, in a hospital meeting the highest European standards."
                  delay={1.1}
                />
                <ProtocolStep
                  idx="03"
                  kicker="Suivi"
                  title="Long-term follow-up."
                  desc="Post-op review — and continuous support in between. We never let our patients down."
                  delay={1.6}
                />
              </div>

              {/* Connecting flow line */}
              <svg style={{
                position:'absolute',
                left: 96, right: 96, bottom: 384,
                width: 'calc(100% - 192px)', height: 4,
              }}>
                <line x1="0" y1="2" x2="100%" y2="2"
                  stroke="#D9613A" strokeWidth="1" strokeDasharray="3 6"
                  opacity={clamp((lt - 1.2) / 1.0, 0, 1)}/>
              </svg>

              {/* Bottom kicker */}
              <div style={{
                position:'absolute',
                left: 96, bottom: 120,
                opacity: clamp((lt - 2.0) / 0.8, 0, 1),
                transform: `translateY(${(1 - clamp((lt - 2.0)/0.8,0,1)) * 12}px)`,
              }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 26,
                  fontStyle:'italic', color:'rgba(244,239,230,0.85)',
                  letterSpacing:'-0.01em',
                }}>"Between each step — we never drop you."</div>
              </div>
            </div>
          );
        }}
      </Sprite>

      <ShotChrome scene="03 / FRANCE · LATE 2025" shot="C022"/>
    </div>
  );
}

window.Scene3 = Scene3;

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

      <Sprite start={0.3} end={5.5}>
        <ChapterMarker chapter="04" year="LATE 2025" title="France: the answer." />
      </Sprite>

      {/* Turkey contrast — bottom-left callout */}
      <Sprite start={14} end={45}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.7, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              left: 96, bottom: 130, width: 760,
              opacity: op,
              transform:`translateY(${(1-t)*20}px)`,
              zIndex: 26,
            }}>
              <div style={{
                display:'flex', gap: 28, alignItems:'stretch',
              }}>
                {/* Turkey side */}
                <div style={{
                  flex: 1, padding: '20px 24px',
                  background:'rgba(244,239,230,0.05)',
                  border:'1px solid rgba(244,239,230,0.18)',
                  position:'relative',
                }}>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 10,
                    color:'rgba(244,239,230,0.55)', letterSpacing:'0.28em',
                    textTransform:'uppercase',
                  }}>Turkey · €2,500</div>
                  <div style={{
                    marginTop: 10,
                    fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500,
                    color:'rgba(244,239,230,0.85)', letterSpacing:'-0.01em',
                    lineHeight: 1.25,
                  }}>Low cost.<br/>
                    <span style={{ color:'rgba(244,239,230,0.55)', fontStyle:'italic' }}>Not the same standards of care.</span>
                  </div>
                </div>
                {/* France side */}
                <div style={{
                  flex: 1, padding: '20px 24px',
                  background:'rgba(217,97,58,0.12)',
                  border:'1px solid #D9613A',
                  position:'relative',
                }}>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 10,
                    color:'#D9613A', letterSpacing:'0.28em',
                    textTransform:'uppercase',
                  }}>France · OCC</div>
                  <div style={{
                    marginTop: 10,
                    fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 500,
                    color:'#F4EFE6', letterSpacing:'-0.01em',
                    lineHeight: 1.25,
                  }}>European standards.<br/>
                    <span style={{ color:'#F4EFE6', fontStyle:'italic' }}>Same care as a French citizen.</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* ELSAN / Bouchard partnership card */}
      <Sprite start={3} end={45}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.7, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              right: 96, top: 130, width: 560,
              opacity: op,
              transform:`translateX(${(1-t)*30}px)`,
              zIndex: 25,
            }}>
              <div style={{
                background:'#F4EFE6', color:'#0E1B2C',
                borderLeft:'4px solid #D9613A',
                overflow:'hidden',
              }}>
                <div style={{ width:'100%', height: 220, overflow:'hidden', background:'#0a1422' }}>
                  <img src={"assets/nedelcu.png"}
                    alt="Dr Marius Nedelcu"
                    style={{
                      width:'100%', height:'100%', objectFit:'cover',
                      objectPosition:'center 25%',
                      filter:'contrast(1.05) saturate(0.95)',
                    }}/>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 11, letterSpacing:'0.25em',
                    color:'#A6431F', textTransform:'uppercase',
                  }}>An established collaboration</div>
                  <div style={{
                    marginTop: 8,
                    fontFamily: FONT_DISPLAY, fontSize: 30,
                    fontWeight: 500, letterSpacing:'-0.02em',
                    lineHeight: 1.05,
                  }}>ELSAN · Bouchard<br/>Private Hospital</div>
                  <div style={{
                    marginTop: 4, fontFamily: FONT_SANS, fontSize: 14,
                    color:'rgba(14,27,44,0.6)', letterSpacing:'0.02em',
                  }}>Marseille, France</div>
                  <div style={{
                    marginTop: 16, paddingTop: 14,
                    borderTop: '1px solid rgba(14,27,44,0.15)',
                    fontFamily: FONT_SANS, fontSize: 14, lineHeight: 1.55,
                    color:'#1B2D45',
                  }}>
                    Coordinated by <strong>Dr Marius Nedelcu</strong> —<br/>
                    one of Europe's leading bariatric surgeons.
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Sprite>

      {/* Why France: identical surgical standard, S2-eligible */}
      <Sprite start={5} end={45}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.7, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              left: 96, top: 130, width: 720,
              opacity: op,
              transform:`translateX(${(1-t)*-20}px)`,
              zIndex: 25,
            }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 11,
                color:'#D9613A', letterSpacing:'0.3em',
                textTransform:'uppercase',
              }}>Why France</div>
              <div style={{
                marginTop: 14,
                fontFamily: FONT_DISPLAY, fontSize: 56,
                fontStyle:'italic', color:'#F4EFE6',
                letterSpacing:'-0.025em', lineHeight: 1.05,
                fontWeight: 400,
              }}>The same surgery.<br/>The same care pathway.<br/>French standards.</div>
              <div style={{
                marginTop: 28, paddingTop: 20,
                borderTop:'1px solid rgba(244,239,230,0.2)',
                fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.55,
                color:'rgba(244,239,230,0.85)',
                maxWidth: 600,
              }}>
                Malta's health system did not allow the S2 pathway.<br/>
                <span style={{ color:'#F4EFE6' }}>France did.</span>
              </div>
              <div style={{
                marginTop: 24,
                fontFamily: FONT_DISPLAY, fontSize: 22,
                fontStyle:'italic',
                color:'rgba(244,239,230,0.7)',
                letterSpacing:'-0.005em',
                lineHeight: 1.35,
                maxWidth: 560,
              }}>Identical to what every French citizen receives —<br/>nothing less.</div>
            </div>
          );
        }}
      </Sprite>

      <ShotChrome scene="04 / FRANCE · LATE 2025" shot="C022"/>
    </div>
  );
}

window.Scene3 = Scene3;

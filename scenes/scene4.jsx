// scene4.jsx — The S2 Revelation (1:00 – 1:25)
// Dramatic centerpiece: legal docs, UK + EU flags, S2 form

function FormDocument() {
  const { localTime } = useSprite();
  const fillProgress = clamp((localTime - 2) / 5, 0, 1);
  const stamp = clamp((localTime - 7) / 0.5, 0, 1);

  // Animated check rows
  const rows = [
    { label: 'Patient nationality', value: 'UNITED KINGDOM', t: 0.05 },
    { label: 'Authority', value: 'NHS — National Health Service', t: 0.18 },
    { label: 'Treatment country', value: 'FRANCE — Clinique Bouchard', t: 0.32 },
    { label: 'Procedure', value: 'Bariatric Surgery (sleeve / bypass)', t: 0.46 },
    { label: 'Funding source', value: 'Fully funded by NHS', t: 0.62, highlight: true },
    { label: 'Legal basis', value: 'TCA · Art. SSC.18  (Brexit, 2020)', t: 0.78 },
  ];

  return (
    <div style={{
      width: 700,
      background:'#F4EFE6',
      color:'#0E1B2C',
      padding: '36px 44px 44px',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(14,27,44,0.1)',
      position:'relative',
    }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 11, letterSpacing:'0.3em',
            color:'#A6431F', textTransform:'uppercase',
          }}>Form</div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 56, lineHeight: 1,
            fontWeight: 400, letterSpacing:'-0.03em', marginTop: 4,
          }}>S2</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{
            fontFamily: FONT_SANS, fontSize: 11, letterSpacing:'0.18em',
            color:'rgba(14,27,44,0.5)', textTransform:'uppercase',
          }}>Cross-border healthcare</div>
          <div style={{
            fontFamily: FONT_SANS, fontSize: 11,
            color:'rgba(14,27,44,0.5)', marginTop: 2,
          }}>UK ⇄ EU · post-Brexit</div>
        </div>
      </div>

      <div style={{
        marginTop: 18, height: 1,
        background:'rgba(14,27,44,0.2)',
      }}/>

      {/* Rows */}
      <div style={{ marginTop: 18, display:'flex', flexDirection:'column', gap: 12 }}>
        {rows.map((r, i) => {
          const visible = fillProgress > r.t;
          const localT = clamp((fillProgress - r.t) / 0.08, 0, 1);
          return (
            <div key={i} style={{
              display:'flex', alignItems:'baseline', justifyContent:'space-between',
              gap: 24,
              opacity: visible ? localT : 0,
              transform: `translateX(${(1-localT)*-12}px)`,
            }}>
              <span style={{
                fontFamily: FONT_SANS, fontSize: 13, letterSpacing:'0.04em',
                color:'rgba(14,27,44,0.55)', textTransform:'uppercase',
                width: 200,
              }}>{r.label}</span>
              <span style={{
                flex: 1,
                borderBottom:'1px dashed rgba(14,27,44,0.25)',
                paddingBottom: 4,
                fontFamily: r.highlight ? FONT_DISPLAY : FONT_SANS,
                fontSize: r.highlight ? 22 : 16,
                fontWeight: r.highlight ? 500 : 500,
                color: r.highlight ? '#A6431F' : '#0E1B2C',
                fontStyle: r.highlight ? 'italic' : 'normal',
              }}>{r.value}</span>
            </div>
          );
        })}
      </div>

      {/* Approval stamp */}
      <div style={{
        position:'absolute',
        right: 50, bottom: 30,
        transform: `rotate(-12deg) scale(${0.7 + stamp*0.5})`,
        opacity: stamp,
        border:'4px solid #A6431F',
        color:'#A6431F',
        padding:'10px 22px',
        fontFamily: FONT_DISPLAY,
        fontSize: 32,
        fontWeight: 600,
        letterSpacing:'0.06em',
        textTransform:'uppercase',
        fontStyle:'italic',
      }}>
        Legal · A right
      </div>
    </div>
  );
}

function FlagBlock({ side, label, sub }) {
  const isUK = side === 'left';
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems: isUK ? 'flex-start' : 'flex-end',
      gap: 14,
    }}>
      <div style={{
        width: 96, height: 64,
        background: isUK ? '#012169' : '#003399',
        position:'relative',
        boxShadow:'0 8px 24px rgba(0,0,0,0.4)',
        overflow:'hidden',
      }}>
        {isUK ? (
          <svg viewBox="0 0 60 40" width="100%" height="100%">
            <rect width="60" height="40" fill="#012169"/>
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3"/>
            <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6"/>
          </svg>
        ) : (
          <svg viewBox="0 0 60 40" width="100%" height="100%">
            <rect width="60" height="40" fill="#003399"/>
            {Array.from({length:12}).map((_,i)=>{
              const a = (i/12)*Math.PI*2 - Math.PI/2;
              const cx = 30 + Math.cos(a)*12;
              const cy = 20 + Math.sin(a)*8;
              return <text key={i} x={cx} y={cy+1.5} textAnchor="middle" fontSize="4" fill="#FFCC00">★</text>
            })}
          </svg>
        )}
      </div>
      <div style={{ textAlign: isUK ? 'left' : 'right' }}>
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, letterSpacing:'0.25em',
          color:'rgba(244,239,230,0.55)', textTransform:'uppercase',
        }}>{sub}</div>
        <div style={{
          fontFamily: FONT_DISPLAY, fontSize: 28, color:'#F4EFE6',
          letterSpacing:'-0.02em', marginTop: 4, fontWeight: 500,
        }}>{label}</div>
      </div>
    </div>
  );
}

function FlagBridge({ ltime }) {
  // Animated dotted line connecting UK <-> EU through the document
  const dash = clamp(ltime / 1.5, 0, 1);
  return (
    <svg width="100%" height="100" style={{ position:'absolute', top: 92, left: 0, zIndex: 5 }}
      viewBox="0 0 1920 100" preserveAspectRatio="none">
      <line x1="220" y1="50" x2="1700" y2="50"
        stroke="#D9613A" strokeWidth="1.5"
        strokeDasharray="4 8"
        strokeDashoffset={(1-dash)*1480}
        opacity="0.8"/>
      <circle cx={220 + dash*1480} cy="50" r="5" fill="#D9613A" opacity={dash > 0.05 ? 1 : 0}/>
    </svg>
  );
}

function Scene4() {
  const { localTime, duration } = useSprite();

  return (
    <div style={{
      position:'absolute', inset:0,
      background:'radial-gradient(ellipse at 50% 60%, #1B2D45 0%, #0E1B2C 70%, #050a14 100%)',
    }}>
      {/* Subtle paper grain bg */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`repeating-linear-gradient(0deg, transparent 0 39px, rgba(244,239,230,0.025) 39px 40px)`,
      }}/>

      <Vignette strength={0.5}/>
      <FilmGrain opacity={0.07}/>

      {/* Top: chapter marker */}
      <Sprite start={0.3} end={5}>
        <div style={{ position:'absolute', top: 110, left: 96, zIndex: 30 }}>
          <ChapterMarker chapter="04" year="THE REVELATION" title="A forgotten right." />
        </div>
      </Sprite>

      {/* Two flags top */}
      <Sprite start={1.5} end={24}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.8, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <React.Fragment>
              <div style={{
                position:'absolute',
                left: 96, top: 110,
                opacity: op,
                transform:`translateY(${(1-t)*-20}px)`,
                zIndex: 20,
              }}>
                <FlagBlock side="left" label="United Kingdom" sub="NHS · Patient"/>
              </div>
              <div style={{
                position:'absolute',
                right: 96, top: 110,
                opacity: op,
                transform:`translateY(${(1-t)*-20}px)`,
                zIndex: 20,
              }}>
                <FlagBlock side="right" label="European Union" sub="Treatment · France"/>
              </div>
            </React.Fragment>
          );
        }}
      </Sprite>

      {/* Bridge line */}
      <Sprite start={3} end={24}>
        {({ localTime: lt }) => <FlagBridge ltime={lt}/>}
      </Sprite>

      {/* The form, centerpiece */}
      <Sprite start={4} end={24}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutBack(clamp(lt / 0.9, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          // Slight Ken Burns
          const kb = clamp((lt - 0.9) / (d - 1.4), 0, 1);
          const scale = (0.92 + 0.08 * t) + Easing.easeInOutQuad(kb) * 0.04;
          return (
            <div style={{
              position:'absolute',
              left:'50%', top:'52%',
              transform:`translate(-50%, -50%) scale(${scale}) rotate(${(1-t)*-2}deg)`,
              opacity: op,
              zIndex: 25,
            }}>
              <FormDocument/>
            </div>
          );
        }}
      </Sprite>

      {/* Bottom kicker */}
      <Sprite start={18} end={24}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.6, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              left:'50%', bottom: 130,
              transform:`translateX(-50%) translateY(${(1-t)*16}px)`,
              opacity: op,
              zIndex: 30,
              textAlign:'center',
            }}>
              <div style={{
                fontFamily: FONT_DISPLAY, fontSize: 36,
                fontStyle:'italic', color:'#F4EFE6',
                letterSpacing:'-0.02em', lineHeight: 1.2,
              }}>
                "But no one activates it.<br/>
                <span style={{ color:'#D9613A' }}>We made it the heart of our model.</span>"
              </div>
            </div>
          );
        }}
      </Sprite>

      <ShotChrome scene="04 / S2 · TCA 2020" shot="D004"/>
    </div>
  );
}

window.Scene4 = Scene4;

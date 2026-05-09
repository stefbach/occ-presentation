// scene6.jsx — What Comes Next (1:50 – 2:00)
// Closing piece-to-camera + tagline + logo

function OCCLogo({ size = 1, glow = 0 }) {
  // Custom OCC monogram
  return (
    <svg width={420 * size} height={120 * size} viewBox="0 0 420 120">
      <defs>
        <linearGradient id="logogold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9613A"/>
          <stop offset="100%" stopColor="#C8A45C"/>
        </linearGradient>
      </defs>
      {/* O */}
      <circle cx="60" cy="60" r="40" stroke="#F4EFE6" strokeWidth="3" fill="none"/>
      <circle cx="60" cy="60" r="40" stroke="#D9613A" strokeWidth="3" fill="none"
        strokeDasharray="251" strokeDashoffset={251 * (1 - glow)} opacity={glow}/>
      {/* C */}
      <path d="M 200 30 A 40 40 0 1 0 200 90" stroke="#F4EFE6" strokeWidth="3" fill="none"/>
      {/* C */}
      <path d="M 320 30 A 40 40 0 1 0 320 90" stroke="#F4EFE6" strokeWidth="3" fill="none"/>
      {/* Wordmark */}
      <text x="210" y="115" textAnchor="middle"
        fontFamily={FONT_MONO} fontSize="11" letterSpacing="0.45em"
        fill="rgba(244,239,230,0.7)">
        OBESITY · CARE · CLINIC
      </text>
    </svg>
  );
}

function PortraitFinal() {
  return (
    <div style={{
      position:'absolute', inset:0,
      background:'#0a1422',
      overflow:'hidden',
    }}>
      <img src={"assets/bach.png"}
        alt="Dr Stéphane Bach"
        style={{
          position:'absolute', inset:0,
          width:'100%', height:'100%',
          objectFit:'cover',
          objectPosition:'center 25%',
          filter:'contrast(1.08) saturate(0.95) brightness(1.05)',
        }}/>
      {/* Subtle right-side gradient so text on right reads cleanly */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(14,27,44,0.55) 78%, rgba(14,27,44,0.85) 100%)',
      }}/>
    </div>
  );
}

function Scene6() {
  const { localTime, duration } = useSprite();
  const kb = Easing.easeInOutQuad(clamp(localTime / duration, 0, 1));

  return (
    <div style={{ position:'absolute', inset:0, background:'#000' }}>
      {/* Portrait — kept fully visible nearly to the end */}
      <div style={{
        position:'absolute', inset:0,
        opacity: 1 - Easing.easeInCubic(clamp((localTime - 12) / 4, 0, 1)) * 0.4,
        transform:`scale(${1.0 + 0.04*kb})`,
        transformOrigin:'40% 50%',
      }}>
        <PortraitFinal/>
      </div>

      <Vignette strength={0.4}/>
      <FilmGrain opacity={0.06}/>

      {/* Mantra: anchored on the right where the portrait fades into navy */}
      <Sprite start={0.625} end={7.5}>
        {({ localTime: lt }) => {
          const lines = [
            { text: 'Three years.', t: 0.0 },
            { text: 'Three steps.', t: 0.7 },
            { text: 'One conviction.', t: 1.4, italic: true, color: '#D9613A' },
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
                return (
                  <div key={i} style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 76,
                    fontWeight: 400,
                    color: l.color || '#F4EFE6',
                    letterSpacing:'-0.03em',
                    lineHeight: 1.05,
                    opacity: t,
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

      {/* The conviction sentence */}
      <Sprite start={6.25} end={11}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.8, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              left:'50%', top:'38%',
              transform:`translate(-50%, -50%) translateY(${(1-t)*16}px)`,
              opacity: op,
              zIndex: 30,
              textAlign:'center',
              maxWidth: 1300,
            }}>
              <div style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 56,
                fontStyle:'italic',
                color:'#F4EFE6',
                letterSpacing:'-0.025em',
                lineHeight: 1.15,
                fontWeight: 400,
              }}>
                "Helping patients suffer less<br/>
                from obesity and its<br/>
                <span style={{ color:'#D9613A' }}>associated complications.</span>"
              </div>
              <div style={{
                marginTop: 56,
                fontFamily: FONT_MONO,
                fontSize: 12,
                letterSpacing:'0.3em',
                color:'rgba(244,239,230,0.55)',
                textTransform:'uppercase',
              }}>— Dr Stéphane Bach</div>
            </div>
          );
        }}
      </Sprite>

      {/* Trio of doctors before the logo */}
      <Sprite start={7.75} end={13.75}>
        {({ localTime: lt, duration: d }) => {
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const opAll = 1 - Easing.easeInCubic(exit);
          const docs = [
            { src: "assets/bach.png", name: 'Dr Stéphane Bach', role: 'Co-founder' },
            { src: "assets/manos.png", name: 'Dr Thierry Manos', role: 'Co-founder' },
            { src: "assets/nedelcu.png", name: 'Dr Marius Nedelcu', role: 'Surgical Coordinator' },
          ];
          return (
            <div style={{
              position:'absolute',
              left:'50%', top:'50%',
              transform:'translate(-50%, -50%)',
              display:'flex', gap: 40,
              zIndex: 36,
              opacity: opAll,
            }}>
              {docs.map((d, i) => {
                const t = Easing.easeOutCubic(clamp((lt - i*0.25) / 0.7, 0, 1));
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
          );
        }}
      </Sprite>

      {/* Logo + tagline lockup at end */}
      <Sprite start={14} end={25}>
        {({ localTime: lt }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.5, 0, 1));
          const glow = clamp((lt - 0.3) / 1.2, 0, 1);
          return (
            <div style={{
              position:'absolute',
              left:'50%', top:'50%',
              transform:`translate(-50%, -50%) translateY(${(1-t)*16}px)`,
              opacity: t,
              zIndex: 35,
              textAlign:'center',
            }}>
              <OCCLogo size={1.1} glow={glow}/>
              <div style={{
                marginTop: 36,
                fontFamily: FONT_DISPLAY,
                fontSize: 28,
                fontStyle:'italic',
                color:'rgba(244,239,230,0.75)',
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
                fontFamily: FONT_MONO,
                fontSize: 11,
                letterSpacing:'0.4em',
                color:'rgba(244,239,230,0.5)',
                textTransform:'uppercase',
              }}>Malta · France · United Kingdom</div>
            </div>
          );
        }}
      </Sprite>

      <ShotChrome scene="06 / WHAT COMES NEXT" shot="F001"/>
    </div>
  );
}

window.Scene6 = Scene6;

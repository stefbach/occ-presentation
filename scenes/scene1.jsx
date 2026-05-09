// scene1.jsx — Founding Friendship (0:00 – 0:18)
// Bach + Manos co-equal, with real photos

const PHOTO_BACH    = "assets/bach.png";
const PHOTO_MANOS   = "assets/manos.png";
const PHOTO_NEDELCU = "assets/nedelcu.png";

function PortraitCard({ src, name, role, side = 'left', delay = 0 }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp((localTime - delay) / 0.9, 0, 1));
  const isLeft = side === 'left';
  return (
    <div style={{
      position:'absolute',
      top: 130, bottom: 130,
      width: 760,
      [isLeft ? 'left' : 'right']: 96,
      opacity: t,
      transform:`translateY(${(1-t)*30}px)`,
    }}>
      <div style={{
        width:'100%', height:'100%',
        background:`#0a1422`,
        overflow:'hidden',
        position:'relative',
        boxShadow:'0 30px 80px rgba(0,0,0,0.5)',
      }}>
        <img src={src} alt={name} style={{
          width:'100%', height:'100%', objectFit:'cover',
          objectPosition:'center 30%',
          filter:'contrast(1.05) saturate(0.9)',
        }}/>
        {/* Bottom gradient */}
        <div style={{
          position:'absolute', left:0, right:0, bottom:0, height:'45%',
          background:'linear-gradient(180deg, transparent 0%, rgba(14,27,44,0.95) 100%)',
        }}/>
        {/* Caption */}
        <div style={{ position:'absolute', left:32, right:32, bottom:32 }}>
          <div style={{ width:36, height:2, background:'#D9613A', marginBottom: 14 }}/>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 500,
            color:'#F4EFE6', letterSpacing:'-0.02em', lineHeight: 1.05,
          }}>{name}</div>
          <div style={{
            marginTop: 6,
            fontFamily: FONT_SANS, fontSize: 14, fontWeight: 400,
            color:'rgba(244,239,230,0.7)',
            letterSpacing:'0.18em', textTransform:'uppercase',
          }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

function Scene1() {
  const { localTime, duration } = useSprite();

  return (
    <div style={{ position:'absolute', inset:0, background:'#000' }}>
      {/* Backdrop */}
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse at center, #1B2D45 0%, #0E1B2C 60%, #050a14 100%)',
      }}/>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`linear-gradient(rgba(244,239,230,0.025) 1px, transparent 1px)`,
        backgroundSize:'80px 80px',
      }}/>

      {/* Two co-equal portraits */}
      <Sprite start={0.5} end={39.5}>
        <PortraitCard
          src={PHOTO_BACH}
          name="Dr Stéphane Bach"
          role="Co-founder · Public Health Physician"
          side="left"
          delay={0.0}
        />
      </Sprite>
      <Sprite start={0.5} end={39.5}>
        <PortraitCard
          src={PHOTO_MANOS}
          name="Dr Thierry Manos"
          role="Co-founder · Gastroenterologist"
          side="right"
          delay={0.4}
        />
      </Sprite>

      {/* Center connector */}
      <Sprite start={2.5} end={39.5}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 1.0, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              left:'50%', top:'50%',
              transform:`translate(-50%, -50%)`,
              opacity: op,
              zIndex: 25,
              textAlign:'center',
              width: 280,
            }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 11,
                color:'#D9613A', letterSpacing:'0.3em',
                textTransform:'uppercase',
              }}>30 years</div>
              <div style={{
                marginTop: 14,
                fontFamily: FONT_DISPLAY, fontSize: 38,
                fontStyle:'italic', color:'#F4EFE6',
                letterSpacing:'-0.02em', lineHeight: 1.1,
                fontWeight: 400,
              }}>A friendship<br/>between<br/>two doctors.</div>
              <div style={{
                marginTop: 22,
                width: 1, height: 60,
                background:'rgba(244,239,230,0.4)',
                margin:'22px auto 0',
                transform:`scaleY(${t})`,
                transformOrigin:'top',
              }}/>
              <div style={{
                marginTop: 18,
                fontFamily: FONT_SANS, fontSize: 14,
                color:'rgba(244,239,230,0.65)',
                letterSpacing:'0.04em', textTransform:'uppercase',
              }}>One observation</div>
              <div style={{
                marginTop: 8,
                fontFamily: FONT_DISPLAY, fontSize: 22,
                color:'#F4EFE6',
                letterSpacing:'-0.01em', lineHeight: 1.3,
                fontStyle:'italic',
              }}>Obesity kills.<br/>No one treats it<br/>at scale.</div>

              <div style={{
                marginTop: 28, paddingTop: 18,
                borderTop:'1px solid rgba(244,239,230,0.18)',
              }}>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: 10,
                  color:'rgba(244,239,230,0.55)', letterSpacing:'0.28em',
                  textTransform:'uppercase',
                }}>From day one</div>
                <div style={{
                  marginTop: 6,
                  fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 500,
                  color:'#F4EFE6', letterSpacing:'-0.01em', lineHeight: 1.25,
                }}>An established<br/>collaboration with <span style={{ color:'#D9613A' }}>ELSAN</span>.</div>
              </div>
            </div>
          );
        }}
      </Sprite>

      <Vignette strength={0.45}/>
      <FilmGrain opacity={0.06}/>

      <ShotChrome scene="01 / FOUNDING" shot="A001" />
    </div>
  );
}

window.Scene1 = Scene1;

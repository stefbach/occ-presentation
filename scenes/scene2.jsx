// scene2.jsx — Malta, the starting point (0:18 – 0:40)
// Aerial of Valletta, founding moment

function MaltaPlate() {
  // Stylized aerial of Valletta-like harbour (placeholder)
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style={{ width:'100%', height:'100%' }}>
        <defs>
          <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c89a"/>
            <stop offset="50%" stopColor="#d9a26a"/>
            <stop offset="100%" stopColor="#a86b3f"/>
          </linearGradient>
          <linearGradient id="sea2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c4257"/>
            <stop offset="100%" stopColor="#0e2535"/>
          </linearGradient>
          <linearGradient id="city2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6c08a"/>
            <stop offset="60%" stopColor="#b6864e"/>
            <stop offset="100%" stopColor="#5a3a22"/>
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width="1920" height="540" fill="url(#sky2)"/>
        {/* Sun */}
        <circle cx="1300" cy="380" r="60" fill="#f4d8a2" opacity="0.9"/>
        {/* Distant haze line */}
        <rect x="0" y="510" width="1920" height="40" fill="#8a5a36" opacity="0.4"/>
        {/* Sea */}
        <rect y="540" width="1920" height="540" fill="url(#sea2)"/>
        {/* Sea ripples */}
        {Array.from({length: 24}).map((_,i)=>(
          <line key={i} x1={Math.random()*1920} y1={560 + i*20} x2={Math.random()*1920} y2={560 + i*20}
            stroke="rgba(244,239,230,0.06)" strokeWidth="1"/>
        ))}
        {/* Valletta peninsula silhouette */}
        <path d="M 0 540 L 0 460 L 180 455 L 320 440 L 480 445 L 640 430 L 760 435 L 880 440 L 1000 460 L 1100 540 Z" fill="url(#city2)"/>
        {/* Stylized buildings on peninsula */}
        {Array.from({length: 38}).map((_,i)=>{
          const x = 30 + i*28;
          const h = 18 + ((i*7)%5)*8;
          const y = 460 - h + ((i%3)*4);
          return <rect key={i} x={x} y={y} width="14" height={h+80} fill="#8a5a36" opacity={0.85 - (i%4)*0.1}/>
        })}
        {/* Domes */}
        <ellipse cx="280" cy="430" rx="22" ry="18" fill="#c89a5e"/>
        <rect x="276" y="420" width="8" height="22" fill="#a87a3a"/>
        <ellipse cx="560" cy="430" rx="28" ry="20" fill="#d9a96a"/>
        {/* Fortifications waterline */}
        <path d="M 0 542 L 1100 542 L 1100 560 L 0 560 Z" fill="#3a1f10" opacity="0.7"/>
        {/* Far shore */}
        <path d="M 1100 542 L 1400 530 L 1700 540 L 1920 538 L 1920 580 L 1100 580 Z" fill="#7a4f2e" opacity="0.55"/>
        {/* Boats */}
        <rect x="1280" y="700" width="24" height="6" fill="#F4EFE6" opacity="0.6"/>
        <rect x="1490" y="780" width="36" height="8" fill="#F4EFE6" opacity="0.7"/>
        <rect x="900" y="850" width="20" height="5" fill="#F4EFE6" opacity="0.5"/>
      </svg>
    </div>
  );
}

function MaltaPin() {
  const { localTime } = useSprite();
  const drop = Easing.easeOutBack(clamp((localTime - 1.5) / 0.6, 0, 1));
  const ping = clamp((localTime - 2.0) / 1.5, 0, 1);
  return (
    <div style={{
      position:'absolute',
      left: 380, top: 360,
      transform: `translateY(${(1-drop)*-40}px)`,
      opacity: drop,
      zIndex: 25,
    }}>
      {/* Ping ring */}
      <div style={{
        position:'absolute', left:'50%', top:'100%',
        width: 16, height: 16, marginLeft:-8, marginTop:-8,
        borderRadius:'50%', border:'2px solid #D9613A',
        transform:`scale(${1 + ping*4})`,
        opacity: 1 - ping,
      }}/>
      <svg width="36" height="48" viewBox="0 0 36 48">
        <path d="M 18 0 C 8 0, 0 8, 0 18 C 0 30, 18 48, 18 48 C 18 48, 36 30, 36 18 C 36 8, 28 0, 18 0 Z" fill="#D9613A"/>
        <circle cx="18" cy="18" r="6" fill="#F4EFE6"/>
      </svg>
      <div style={{
        marginTop: 8, marginLeft: -20,
        fontFamily: FONT_MONO, fontSize: 12, letterSpacing:'0.2em',
        color:'#F4EFE6', textShadow:'0 2px 6px #000',
        textTransform:'uppercase',
      }}>VALLETTA · MT</div>
    </div>
  );
}

function Scene2() {
  const { localTime, duration } = useSprite();
  const kb = Easing.easeInOutQuad(clamp(localTime / duration, 0, 1));
  const scale = 1.0 + 0.08 * kb;

  return (
    <div style={{ position:'absolute', inset:0, background:'#0a1422' }}>
      <div style={{
        position:'absolute', inset:0,
        transform:`scale(${scale}) translate(${-30*kb}px, ${-10*kb}px)`,
        transformOrigin:'40% 60%',
      }}>
        <MaltaPlate/>
      </div>

      <Vignette strength={0.45}/>
      <FilmGrain opacity={0.07}/>

      <MaltaPin/>

      {/* Chapter marker */}
      <Sprite start={0.4} end={6}>
        <ChapterMarker chapter="02" year="MARCH 2023" title={"The starting point.\nMalta."} />
      </Sprite>

      {/* Stat reveal in second half */}
      <Sprite start={9} end={20}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.8, 0, 1));
          const exit = clamp((lt - (d - 0.6)) / 0.6, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute', right: 96, bottom: 200,
              opacity: op,
              transform:`translateX(${(1-t)*20}px)`,
              zIndex: 30,
              textAlign:'right',
            }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 12,
                color:'#D9613A', letterSpacing:'0.3em',
                textTransform:'uppercase',
              }}>The intuition</div>
              <div style={{
                marginTop: 14,
                fontFamily: FONT_DISPLAY, fontSize: 44,
                fontWeight: 400, color:'#F4EFE6',
                letterSpacing:'-0.02em', lineHeight: 1.1,
                maxWidth: 620,
              }}>The Mediterranean platform<br/>for bariatric medical tourism.</div>
              <div style={{
                marginTop: 22, display:'flex', gap: 32, justifyContent:'flex-end',
                fontFamily: FONT_SANS, fontSize: 14,
                color:'rgba(244,239,230,0.7)', letterSpacing:'0.04em',
                textTransform:'uppercase',
              }}>
                <span>· English-speaking</span>
                <span>· European</span>
                <span>· Crossroads</span>
              </div>
            </div>
          );
        }}
      </Sprite>

      <ShotChrome scene="02 / MALTA · 2023" shot="B014"/>
    </div>
  );
}

window.Scene2 = Scene2;

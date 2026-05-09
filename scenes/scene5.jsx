// scene5.jsx — Today's Model & Real Numbers (1:25 – 1:50)
// Big numbers count up; map showing flow

function CountUp({ to, duration: animDur = 1.4, delay = 0, format = (v) => Math.round(v) }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp((localTime - delay) / animDur, 0, 1));
  return <React.Fragment>{format(to * t)}</React.Fragment>;
}

function BigStat({ value, label, sublabel, delay = 0, accent = '#F4EFE6' }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp((localTime - delay) / 0.6, 0, 1));
  return (
    <div style={{
      flex: 1,
      borderTop: `2px solid ${accent === '#F4EFE6' ? 'rgba(244,239,230,0.4)' : accent}`,
      paddingTop: 28,
      opacity: t,
      transform:`translateY(${(1-t)*30}px)`,
    }}>
      <div style={{
        fontFamily: FONT_MONO, fontSize: 12,
        color: accent === '#D9613A' ? '#D9613A' : 'rgba(244,239,230,0.6)',
        letterSpacing:'0.3em', textTransform:'uppercase',
        marginBottom: 18,
      }}>{label}</div>
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 200, lineHeight: 0.9,
        fontWeight: 400, color: accent,
        letterSpacing:'-0.05em',
        fontVariantNumeric:'tabular-nums',
      }}>
        <CountUp to={value} delay={delay} />
      </div>
      <div style={{
        marginTop: 14,
        fontFamily: FONT_DISPLAY, fontSize: 24, fontStyle:'italic',
        color: 'rgba(244,239,230,0.85)',
        letterSpacing:'-0.01em', lineHeight: 1.2,
      }}>{sublabel}</div>
    </div>
  );
}

function FlowMap() {
  const { localTime } = useSprite();
  // Animated arc UK → France → Malta
  const t1 = Easing.easeOutCubic(clamp((localTime - 0.5) / 1.2, 0, 1));
  const t2 = Easing.easeOutCubic(clamp((localTime - 1.5) / 1.2, 0, 1));
  const t3 = Easing.easeOutCubic(clamp((localTime - 2.5) / 1.2, 0, 1));
  return (
    <svg viewBox="0 0 1700 700" style={{ width:'100%', height:'100%' }}>
      <defs>
        <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(244,239,230,0.12)"/>
        </pattern>
      </defs>
      {/* Grid background */}
      <rect width="1700" height="700" fill="url(#dotgrid)"/>

      {/* Stylized continents */}
      <g opacity="0.18">
        {/* UK */}
        <path d="M 320 180 Q 340 140, 360 160 Q 380 200, 360 240 Q 340 270, 310 260 Q 290 230, 320 180 Z" fill="#F4EFE6"/>
        {/* France */}
        <path d="M 540 280 Q 600 260, 660 290 Q 700 340, 690 400 Q 650 450, 580 440 Q 530 410, 510 360 Q 510 310, 540 280 Z" fill="#F4EFE6"/>
        {/* Italy */}
        <path d="M 760 360 Q 790 380, 810 430 Q 820 480, 800 510 Q 780 510, 770 480 Q 760 420, 760 360 Z" fill="#F4EFE6"/>
        {/* Spain */}
        <path d="M 380 400 Q 460 380, 510 410 Q 530 450, 500 470 Q 430 480, 380 460 Q 360 430, 380 400 Z" fill="#F4EFE6"/>
        {/* North Africa */}
        <path d="M 360 520 Q 600 510, 850 530 Q 950 560, 900 600 Q 700 620, 400 600 Q 340 570, 360 520 Z" fill="#F4EFE6"/>
      </g>

      {/* Cities */}
      {[
        { x: 340, y: 195, name: 'LONDON', accent: false, r: 6 },
        { x: 600, y: 360, name: 'MARSEILLE', accent: false, r: 6 },
        { x: 800, y: 530, name: 'MALTA', accent: false, r: 6 },
        { x: 540, y: 320, name: 'MARTIGUES', accent: true, r: 7 },
      ].map((c, i) => {
        const t = i === 3 ? clamp((localTime - 3.5) / 0.6, 0, 1) : 1;
        return (
          <g key={c.name} opacity={t}>
            <circle cx={c.x} cy={c.y} r={c.r + 4} fill={c.accent ? '#D9613A' : '#F4EFE6'} opacity="0.2"/>
            <circle cx={c.x} cy={c.y} r={c.r} fill={c.accent ? '#D9613A' : '#F4EFE6'}/>
            <text x={c.x + 14} y={c.y + 5}
              fontFamily={FONT_MONO} fontSize="14" letterSpacing="0.18em"
              fill={c.accent ? '#D9613A' : '#F4EFE6'}>
              {c.name}{c.accent && <tspan fontSize="11" dx="8" opacity="0.7">→ joining</tspan>}
            </text>
          </g>
        );
      })}

      {/* Arc UK → Marseille */}
      <path d="M 340 195 Q 470 100, 600 360"
        stroke="#D9613A" strokeWidth="2" fill="none"
        strokeDasharray="1500"
        strokeDashoffset={(1-t1)*1500}/>
      {/* Arc Marseille → Malta */}
      <path d="M 600 360 Q 720 480, 800 530"
        stroke="rgba(244,239,230,0.5)" strokeWidth="1.5" fill="none"
        strokeDasharray="800"
        strokeDashoffset={(1-t2)*800}/>
      {/* Arc to Martigues */}
      <path d="M 600 360 Q 570 340, 540 320"
        stroke="#D9613A" strokeWidth="1.5" fill="none"
        strokeDasharray="200" strokeDashoffset={(1-t3)*200}/>

      {/* Flow chips */}
      <g opacity={t1}>
        <rect x="430" y="115" width="74" height="22" rx="11" fill="#D9613A"/>
        <text x="467" y="130" textAnchor="middle"
          fontFamily={FONT_MONO} fontSize="11" letterSpacing="0.15em"
          fill="#F4EFE6">NHS · S2</text>
      </g>
    </svg>
  );
}

function Scene5() {
  return (
    <div style={{
      position:'absolute', inset:0,
      background:'linear-gradient(180deg, #0E1B2C 0%, #050a14 100%)',
    }}>
      {/* Grid texture */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`linear-gradient(rgba(244,239,230,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,230,0.04) 1px, transparent 1px)`,
        backgroundSize:'80px 80px',
      }}/>

      <Vignette strength={0.4}/>
      <FilmGrain opacity={0.06}/>

      {/* Chapter */}
      <Sprite start={0.3} end={6}>
        <div style={{ position:'absolute', top: 110, left: 96, zIndex: 30 }}>
          <ChapterMarker chapter="05" year="2026 · TODAY" title="The operational flow." />
        </div>
      </Sprite>

      {/* Map — top right */}
      <Sprite start={1} end={42.5}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.7, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              right: 96, top: 110,
              width: 900, height: 380,
              opacity: op,
              transform:`scale(${0.95 + t*0.05})`,
              transformOrigin:'top right',
              zIndex: 20,
            }}>
              <FlowMap/>
            </div>
          );
        }}
      </Sprite>

      {/* Big stats row */}
      <Sprite start={6} end={42.5}>
        <div style={{
          position:'absolute',
          left: 96, right: 96, bottom: 200,
          display:'flex', gap: 56,
          zIndex: 25,
        }}>
          <BigStat value={55} label="British patients" sublabel="have placed their trust in us." delay={0.0} accent="#F4EFE6"/>
          <BigStat value={7} label="Procedures" sublabel="completed since January." delay={0.5} accent="#D9613A"/>
          <BigStat value={35} label="NHS files" sublabel="pending validation." delay={1.0} accent="#F4EFE6"
            />
        </div>
      </Sprite>

      {/* Caption */}
      <Sprite start={9} end={42.5}>
        {({ localTime: lt, duration: d }) => {
          const t = Easing.easeOutCubic(clamp(lt / 0.6, 0, 1));
          const exit = clamp((lt - (d - 0.5)) / 0.5, 0, 1);
          const op = t * (1 - Easing.easeInCubic(exit));
          return (
            <div style={{
              position:'absolute',
              left: 96, bottom: 110,
              opacity: op,
              transform:`translateX(${(1-t)*-20}px)`,
              zIndex: 25,
            }}>
              <div style={{
                fontFamily: FONT_MONO, fontSize: 11,
                color:'#D9613A', letterSpacing:'0.3em',
                textTransform:'uppercase',
              }}>The operational flow has begun</div>
            </div>
          );
        }}
      </Sprite>

      <ShotChrome scene="05 / NUMBERS · 2026" shot="E007"/>
    </div>
  );
}

window.Scene5 = Scene5;

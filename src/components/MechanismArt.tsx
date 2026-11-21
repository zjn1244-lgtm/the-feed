export function MechanismArt({variant=0, hero=false}:{variant?:number;hero?:boolean}) {
 return <svg className={hero?'mechanism-art hero-art':'mechanism-art'} viewBox="0 0 600 380" role="img" aria-label="Original conceptual diagram of information passing through distribution and selection mechanisms">
 <defs><pattern id={`grid-${variant}-${hero}`} width="22" height="22" patternUnits="userSpaceOnUse"><path d="M 22 0 L 0 0 0 22" fill="none" stroke="currentColor" strokeWidth=".4" opacity=".16"/></pattern></defs>
 <rect width="600" height="380" fill={`url(#grid-${variant}-${hero})`}/>
 {(hero?[0,1,2,3,4,5,6]:[0,1,2,3,4]).map((n)=><g key={n} transform={`translate(${70+n*9} ${65+n*22})`}><path d="M0 0 135 -30 135 53 0 83Z" fill="var(--paper)" stroke="currentColor" strokeWidth="1"/><path d="M15 15 118 -8 M15 25 118 2 M15 35 83 20" fill="none" stroke="currentColor" opacity=".5"/></g>)}
 <g stroke="currentColor" fill="none" strokeWidth="1"><path d="M220 120 320 120 370 75M220 190 320 190 370 175M220 260 320 260 370 275"/><path d="M320 120V260" strokeDasharray="3 5"/>{[75,175,275].map((y,i)=><g key={y}><path d={`M370 ${y} l75 -20 v48 l-75 20Z`} fill={i===(variant%3)?'var(--accent)':'var(--paper)'}/><path d={`M385 ${y+10} l40 -11 M385 ${y+20} l25 -7`} stroke={i===(variant%3)?'var(--paper)':'currentColor'}/><path d={`M445 ${y+5} H510`}/><circle cx="518" cy={y+5} r="5" fill={i===(variant%3)?'var(--accent)':'var(--paper)'}/></g>)}</g>
 <text x="45" y="348" className="svg-label">PRODUCE</text><text x="260" y="348" className="svg-label">SELECT</text><text x="460" y="348" className="svg-label">DISTRIBUTE</text>
 </svg>;
}

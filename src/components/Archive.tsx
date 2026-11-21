import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { archiveItems } from '../data/archive-items';
import { historicalStages } from '../data/historical-stages';
import type { ArchiveItem } from '../data/types';
import { MechanismArt } from './MechanismArt';
export function Archive({onOpen}:{onOpen:(item:ArchiveItem)=>void}) {
 const location=useLocation(); const [params,setParams]=useSearchParams();
 const [stage,setStage]=useState(params.get('stage')||location.state?.stage||'all'); const [medium,setMedium]=useState(params.get('medium')||'all'); const [query,setQuery]=useState(params.get('q')||'');
 useEffect(()=>{const next=new URLSearchParams();if(stage!=='all')next.set('stage',stage);if(medium!=='all')next.set('medium',medium);if(query)next.set('q',query);setParams(next,{replace:true});},[stage,medium,query,setParams]);
 const visible=archiveItems.filter(i=>(stage==='all'||i.historicalPeriod===stage)&&(medium==='all'||i.medium===medium)&&`${i.title} ${i.context}`.toLowerCase().includes(query.toLowerCase()));
 return <section className="section" id="archive"><div className="section-heading"><div><span className="eyebrow">THE RESEARCH COLLECTION</span><h1>Digital archive<span className="accent">.</span></h1></div><p>Browse records by period, medium, or keyword. Each entry is a research placeholder until its evidence is verified.</p></div>
 <div className="filters"><label>Historical stage<select value={stage} onChange={e=>setStage(e.target.value)}><option value="all">All six stages</option>{historicalStages.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select></label><label>Medium<select value={medium} onChange={e=>setMedium(e.target.value)}><option value="all">All media</option>{archiveItems.map(i=><option key={i.id}>{i.medium}</option>)}</select></label><label className="search-label">Search collection<div className="search-input"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find an object or mechanism"/></div></label></div>
 <p className="small muted" aria-live="polite">{visible.length} research slots · Primary evidence pending</p><ol className="archive-list">{visible.map(i=><li key={i.id}><Link className="archive-row" to={`/archive/${i.id}`} state={{background:location,archiveState:location.state,scrollY:window.scrollY}}><span className="archive-row-title">{i.title}</span><span>{i.date}</span><span>{i.medium}</span><span>{historicalStages.find(s=>s.id===i.historicalPeriod)?.title}</span><span className="archive-row-summary">{i.context}</span><span className="list-open">Details</span></Link></li>)}</ol>{!visible.length&&<div className="empty-state">No research slots match these filters. Try another stage or medium.</div>}</section>;
}
export function ArchiveDialog({item,onClose}:{item:ArchiveItem|null;onClose:()=>void}) {
 const ref=useRef<HTMLDialogElement>(null);
 // Dialog is mounted only when an item exists; native modal manages focus and inert background.
 return item?<dialog aria-labelledby="archive-record-title" ref={el=>{ref.current=el;if(el&&!el.open)el.showModal();}} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="dialog-top"><span className="eyebrow">UNVERIFIED RESEARCH SLOT</span><button className="icon-button" onClick={onClose} aria-label="Close archive record"><X/></button></div><h2 id="archive-record-title">{item.title}</h2><dl className="metadata"><div><dt>Date</dt><dd>{item.date}</dd></div><div><dt>Medium</dt><dd>{item.medium}</dd></div><div><dt>Institution</dt><dd>{item.institution}</dd></div></dl>{[['Historical context',item.context],['Evidence',item.evidence],['Research interpretation',item.interpretation],['Limitations',item.limitations],['Image & rights',item.imageRights]].map(([title,text])=><div key={title} className="record-section"><h3>{title}</h3><p>{text}</p></div>)}{item.sourceUrl?<a href={item.sourceUrl} target="_blank" rel="noreferrer">Original source</a>:<p className="notice">Original source link: pending. This entry is not historical evidence.</p>}</dialog>:null;
}

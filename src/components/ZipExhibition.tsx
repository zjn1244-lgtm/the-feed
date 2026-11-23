import { useState } from 'react';
import { Link } from 'react-router-dom';
import { historicalStages } from '../data/historical-stages';
import { archiveItems } from '../data/archive-items';
import { researchChapters } from '../data/research-chapters';

const chapterIds = ['chapter-1','chapter-2','chapter-3','chapter-4','chapter-5','chapter-6'];
const copy = [
  'Writing and copying depended on material surfaces, skilled labor, custodians and the limited reach of physical circulation.',
  'Printing expanded reproduction, while institutions, labor, money and distribution networks still shaped who could receive copies.',
  'Cooperative news gathering and syndication lowered acquisition costs while introducing intermediaries with influence over supply.',
  'Early Web channels were competing arrangements for following updates, not a single direct ancestor of RSS.',
  'Subscription expanded source choice, while interfaces and service infrastructures still distributed control.',
  'Platform feeds combine following, recommendations and ranking; user-selected views persist inside platform-governed environments.',
];
export function ZipExhibition() {
  const [chosen,setChosen]=useState(4);
  const stage=historicalStages[chosen], chapter=researchChapters.find(c=>c.id===chapterIds[chosen]);
  const record=archiveItems.find(i=>i.historicalPeriod===stage.id);
  return <section className="exhibition" id="exhibition"><div className="wrap">
    <div className="chapter-heading"><div><div className="eyebrow earth">01 / EXHIBITION · TIMELINE &amp; ARCHIVE</div><h2>The history of<br/>the <i>selected</i> feed.</h2></div><aside>Six chapters, six arrangements of information. Move through the timeline to uncover the documents, infrastructures and competing systems behind what becomes visible.</aside></div>
    <div className="museum-layout"><div><div className="timeline-heading"><span>HISTORICAL CHAPTERS / 01—06</span><span>HOVER TO READ · CLICK TO ENTER LAB</span></div><div aria-label="Six historical chapters" className="stage-list">{historicalStages.map((s,i)=><button className={'stage-item '+(i===chosen?'active':'')} type="button" key={s.id} onMouseEnter={()=>setChosen(i)} onFocus={()=>setChosen(i)} onClick={()=>setChosen(i)}><span className="idx">{String(i+1).padStart(2,'0')}</span><span><span className="stage-title">{s.title}</span><span className="stage-years">{s.period}</span></span><span className="stage-cta">↗</span></button>)}</div></div>
      <aside aria-live="polite" className="hover-panel"><div className="panel-top"><span className="panel-stage">CHAPTER {String(chosen+1).padStart(2,'0')}</span><span className="panel-year">{stage.period}</span></div><h3>{stage.title}</h3><blockquote>{chapter?.paragraphs?.[0] ?? copy[chosen]}</blockquote><p className="panel-note">AUTHOR-SUPPLIED ESSAY TEXT · SOURCE INTERPRETATION, NOT A VERBATIM ARCHIVAL QUOTATION</p><div className="panel-actions"><Link className="panel-link" to={'/lab?stage='+stage.id}>EXPLORE IN THE LAB <span className="arrow">↗</span></Link><span className="panel-hint">SELECT A CHAPTER ↖</span></div></aside></div>
    <div className="objects"><div className="objects-head"><div><div className="eyebrow earth">COLLECTION / DOCUMENTED MATERIALS</div><h3>Selected objects</h3></div><div className="objects-switch">CHAPTER {String(chosen+1).padStart(2,'0')} · {record?'1 SOURCE':'NO SOURCE RECORD'}</div></div><div className="artifact-grid">{record&&<article className="artifact"><div className={'artifact-art '+(record.imageUrl?'paper':'ink')} data-kind={record.medium}><span className="art-glyph">{record.imageUrl?'✧':'⊙'}</span></div><div className="artifact-body"><div className="artifact-meta">OBJECT {String(chosen+1).padStart(2,'0')}.1 / {record.institution}</div><h4>{record.title}</h4><p>{record.context}</p><div className="artifact-bottom"><a href={record.sourceUrl ?? '#'} target="_blank" rel="noreferrer">SOURCE RECORD ↗</a><Link to={'/lab?stage='+stage.id}>IN THE LAB →</Link></div></div></article>}</div><p className="objects-disclaimer">Archive links lead to institutional documents or collection pages. Graphic panels are interpretive placeholders, not reproductions of historical objects.</p></div>
    </div></section>;
}

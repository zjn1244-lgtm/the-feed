import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { archiveItems } from '../data/archive-items';
import { historicalConnections } from '../data/historical-events';
import { historicalStages } from '../data/historical-stages';
import { researchChapters } from '../data/research-chapters';

const chapterForStage = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6'];

export function Exhibition() {
  const [activeId, setActiveId] = useState(historicalStages[0].id);
  const activeIndex = historicalStages.findIndex((stage) => stage.id === activeId);
  const activeStage = historicalStages[activeIndex];
  const record = useMemo(() => archiveItems.find((item) => item.historicalPeriod === activeId), [activeId]);

  return <section className="section exhibition-section">
    <header className="section-heading exhibition-heading">
      <div><span className="eyebrow">THE EXHIBITION · SIX CHAPTERS</span><h1>Six routes through a history of selection<span className="accent">.</span></h1></div>
      <p>Move across six media situations. Their order is a reading aid: shared problems, parallel experiments, and discontinuities matter as much as chronology.</p>
    </header>
    <div className="exhibition-layout">
      <div className="exhibition-stage-column">
        <div className="stage-map-label"><span className="eyebrow">A NON-LINEAR INDEX</span><span className="small muted">Focus, hover, or select a stage to preview its essay.</span></div>
        <div className="exhibition-stage-list">
          {historicalStages.map((stage, index) => {
            const entry = researchChapters.find((item) => item.id === chapterForStage[index]);
            const excerpt = entry?.paragraphs?.[0] ?? entry?.body ?? '';
            return <article className={activeId === stage.id ? 'exhibition-stage is-active' : 'exhibition-stage'} key={stage.id} onMouseEnter={() => setActiveId(stage.id)}>
              <button type="button" className="stage-select" aria-pressed={activeId === stage.id} aria-controls={activeId === stage.id ? 'stage-preview' : undefined} onFocus={() => setActiveId(stage.id)} onClick={() => setActiveId(stage.id)}>
                <span className="stage-index">{String(index + 1).padStart(2, '0')}</span><span className="stage-main"><strong>{stage.title}</strong><small>{stage.period}</small></span><span className="stage-mechanism">{stage.mechanism}</span>
              </button>
              <div className="stage-excerpt" id={activeId === stage.id ? 'stage-preview' : undefined} aria-hidden={activeId !== stage.id}>
                <p>{excerpt}</p><Link to={'/lab?stage=' + stage.id}>Enter this stage in the Lab <span aria-hidden="true">↗</span></Link>
              </div>
            </article>;
          })}
        </div>
        <div className="exhibition-comparisons"><span className="eyebrow">CROSS-PERIOD QUESTIONS</span>{historicalConnections.map((connection) => {
          const from = historicalStages.find((stage) => stage.id === connection.from);
          const to = historicalStages.find((stage) => stage.id === connection.to);
          return <button type="button" key={connection.from + connection.to} onClick={() => setActiveId(connection.from)} aria-label={'Compare ' + from?.title + ' with ' + to?.title + ': ' + connection.label}><span>{from?.title}</span><b aria-hidden="true">↔</b><span>{to?.title}</span><small>{connection.label}</small></button>;
        })}</div>
        <div className="exhibition-relationship-key"><span className="relationship-line" aria-hidden="true"/><span><strong>Conceptual comparison</strong> · a researcher's cross-period question, not proof of direct influence.</span></div>
        <Link className="text-link" to="/timeline">Open the event timeline and relationship notes <span aria-hidden="true">↗</span></Link>
        <Link className="text-link exhibition-path-link" to="/distribution-paths">Explore the distribution path diagrams <span aria-hidden="true">↗</span></Link>
      </div>
      <aside className="exhibition-preview" aria-live="polite">
        <span className="eyebrow">SELECTED MATERIAL · {String(activeIndex + 1).padStart(2, '0')}</span>
        <h2>{activeStage?.title}</h2>
        {record ? <>
          {record.imageUrl ? <Link className="exhibition-image" to={'/archive/' + record.id} aria-label={'Open archive record: ' + record.title}><img src={record.imageUrl} alt="Printing press on view at the Gutenberg Museum, photographed in 2019" loading="lazy"/></Link> : <div className="exhibition-image exhibition-image-empty" aria-label="No image supplied for this record"><span aria-hidden="true">∅</span><span>Source record, no image supplied</span></div>}
          <p className="exhibition-record-title">{record.title}</p><p className="small muted">{record.date} · {record.medium}</p>
          <Link className="record-link" to={'/archive/' + record.id}>View archive record <ArrowUpRight size={15}/></Link>
        </> : <p>No archive item has been supplied for this stage yet.</p>}
        <Link className="exhibition-all-records" to="/archive">Browse the complete digital archive <span aria-hidden="true">→</span></Link>
      </aside>
    </div>
  </section>;
}

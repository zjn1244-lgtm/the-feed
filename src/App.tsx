import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { Menu, X, Asterisk } from 'lucide-react';
import { Archive } from './components/Archive';
import { Timeline } from './components/Timeline';
import { DistributionPaths } from './components/DistributionPaths';
import { FeedLab } from './components/FeedLab';
import { Exhibition } from './components/Exhibition';
import { StageLab } from './components/StageLab';
import { historicalStages } from './data/historical-stages';
import { archiveItems } from './data/archive-items';
import { researchChapters } from './data/research-chapters';
import { references } from './data/references';
import type { ArchiveItem } from './data/types';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Exhibition', to: '/exhibition' },
  { label: 'Lab', to: '/lab' },
  { label: 'Reflections', to: '/reflections' },
];

const positions = new Map<string, number>();

function ScrollManager() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP' && positions.has(key)) {
      window.scrollTo(0, positions.get(key) ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [key, navigationType, pathname]);

  useEffect(() => {
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  return null;
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return <>
    <ScrollManager />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="The Feed We Didn't Choose home">
        <Asterisk size={30} strokeWidth={1.5}/><span>THE FEED<br/>WE DIDN'T CHOOSE</span>
      </Link>
      <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav aria-label="Catalogue" className={menuOpen ? 'open' : ''}>
        {navigation.map(item => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>)}
      </nav>
      <span className="header-tag">SM5335 · CITYUHK</span>
    </header>
    <main id="main"><Outlet /></main>
    <footer className="site-footer">
      <div><Asterisk size={35}/><h2>The feed is a choice.<br/><em>Whose choice?</em></h2></div>
      <div><span className="eyebrow">THE FEED WE DIDN'T CHOOSE</span><p>A Media Archaeology of Information Distribution</p><span className="small">SM5335 · School of Creative Media · CityUHK</span></div>
      <Link to="/">Back to the beginning ↑</Link>
    </footer>
  </>;
}

function OverviewPage() {
  const opening = researchChapters.find((chapter) => chapter.id === 'opening');
  const press = archiveItems.find((item) => item.id === 'archive-early-mass');
  return <>
    <section className="home-title-block"><span className="eyebrow">SM5335 · MULTIMEDIA RESEARCH ESSAY · CITYUHK</span><h1>The Feed We Didn't <em>Choose</em></h1><p>A Media Archaeology of Information Distribution</p></section>
    <section className="home-opening">
      <div className="home-opening-copy"><span className="eyebrow">OPENING · WHO CHOOSES WHAT WE SEE?</span>{opening?.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<Link className="text-link" to="/research#chapter-opening">Read the full opening and source notes <span aria-hidden="true">↗</span></Link></div>
      <figure className="home-opening-image">{press?.imageUrl ? <img src={press.imageUrl} alt="A printing press displayed at the Gutenberg Museum in Mainz; the photograph was made in 2019"/> : <div className="exhibition-image-empty">Image awaiting source review</div>}<figcaption><span className="eyebrow">A LATER VIEW OF PRINT HISTORY</span><br/>Printing press on display at the Gutenberg Museum, photographed in 2019. This is a contemporary museum photograph, not a fifteenth-century image. <Link to="/archive/archive-early-mass">Open source record ↗</Link></figcaption></figure>
    </section>
    <section className="home-question"><span className="eyebrow">THE RESEARCH QUESTION</span><h2>Who chooses what circulates, what appears first, and what remains visible?</h2><p>The essay follows recurring decisions across different media arrangements without treating them as steps in an inevitable technical evolution.</p></section>
    <section className="section home-stage-index"><div className="section-heading"><div><span className="eyebrow">EXHIBITION GUIDE · 01—06</span><h2>Six media situations<span className="accent">.</span></h2></div><p>Explore the essays as overlapping histories, or move directly to a stage experiment.</p></div><ol className="stage-list">{historicalStages.map((stage, index) => <li key={stage.id}><Link to={'/lab?stage=' + stage.id}><span className="stage-index">{String(index + 1).padStart(2, '0')}</span><span className="stage-title">{stage.title}</span><span className="stage-period">{stage.period}</span><span className="stage-mechanism">{stage.mechanism}</span><span className="list-open">Enter lab ↗</span></Link></li>)}</ol><Link className="text-link" to="/exhibition">Explore the Exhibition index and archive materials <span aria-hidden="true">→</span></Link></section>
    <section className="home-source-notes"><span className="eyebrow">OPENING · FIGURE CAPTIONS FROM THE ESSAY</span><ul>{opening?.mediaCaptions?.map((caption, index) => <li key={index}>{caption}</li>)}</ul><p className="small muted">The document supplied figure captions and source references, but not the corresponding original image files. Images are not recreated here.</p></section>
  </>;
}

function ArchivePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const detailId = location.pathname.split('/')[2];
  const item = archiveItems.find(record => record.id === detailId) ?? null;
  const background = (location.state as { background?: Location; archiveState?: unknown; scrollY?: number } | null)?.background;
  const close = () => { if (background) navigate(-1); else navigate('/archive'); };
  return <>{detailId && item ? <ArchiveDetail item={item} onClose={close}/> : <Archive onOpen={() => {}}/>}</>;
}

function ArchiveDetail({item,onClose}:{item:ArchiveItem;onClose:()=>void}) {
  const stage = historicalStages.find(candidate => candidate.id === item.historicalPeriod);
  return <article className="section archive-detail"><button type="button" onClick={onClose} className="back-link">← Back to archive</button><span className="eyebrow">{item.verificationStatus==='verified'?'SOURCE METADATA CHECKED':'SOURCE METADATA PENDING'}</span><h1>{item.title}</h1><p className="archive-detail-deck">This record separates the source's description from the project's interpretation. Verification applies to the cited source metadata; it does not establish every historical claim or the authenticity of a depicted object.</p>
    {item.imageUrl ? <figure className="archive-detail-figure"><a href={item.imageUrl} target="_blank" rel="noreferrer" aria-label={`Open full image for ${item.title} in a new tab`}><img src={item.imageUrl} alt={item.title} /></a><figcaption>{item.imageRights || 'Image rights information pending.'}{item.imageRightsUrl&&<> <a href={item.imageRightsUrl} target="_blank" rel="noreferrer">View license terms ↗</a></>}</figcaption></figure> : <figure className="archive-detail-figure archive-detail-image-empty"><div><span className="archive-thumb-mark" aria-hidden="true">∅</span><span>No image attached to this record</span></div><figcaption>{item.imageRights}</figcaption></figure>}
    <dl className="metadata archive-detail-metadata"><div><dt>Date / period</dt><dd>{item.date}</dd></div><div><dt>Historical stage</dt><dd>{stage?.title ?? 'Period pending'}</dd></div><div><dt>Medium</dt><dd>{item.medium}</dd></div><div><dt>Institution / source institution</dt><dd>{item.institution}</dd></div><div><dt>Verification</dt><dd>{item.verificationStatus}</dd></div><div><dt>Citation</dt><dd>{item.citation || 'Citation details pending verification.'}</dd></div></dl>
    <section className="record-section"><span className="eyebrow">RECORD DESCRIPTION</span><h2>Historical context</h2><p>{item.context}</p></section><section className="record-section"><span className="eyebrow">EVIDENCE REGISTER</span><h2>Evidence</h2><p>{item.evidence}</p></section><section className="record-section"><span className="eyebrow">PROJECT ANALYSIS</span><h2>Research interpretation</h2><p>{item.interpretation}</p></section><section className="record-section"><span className="eyebrow">SCOPE & PROVENANCE</span><h2>Limitations</h2><p>{item.limitations}</p><h3>Image rights</h3><p>{item.imageRights}</p></section>
    <div className="archive-detail-source"><span className="eyebrow">ORIGINAL SOURCE</span>{item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer">Open source record <span aria-hidden="true">↗</span></a> : <p>Source URL pending. This placeholder is not a citable historical record.</p>}</div></article>;
}

function TimelinePage() { return <Timeline/>; }
function DistributionPage() { return <DistributionPaths/>; }
function FeedLabPage() { return <><StageLab/><FeedLab/></>; }

function ReflectionsPage() {
  const chapters = researchChapters.filter((chapter) => chapter.id === 'chapter-7' || chapter.id === 'conclusion');
  return <section className="section reflections-page"><header className="section-heading"><div><span className="eyebrow">REFLECTIONS · CHAPTER 7 + CONCLUSION</span><h1>Who controls the feed?<span className="accent">.</span></h1></div><p>The closing argument returns to questions of selection, defaults, portability, and institutional power.</p></header>
    <div className="reflections-reading">{chapters.map((chapter) => <article className="essay-chapter" id={'chapter-' + chapter.id} key={chapter.id}><span className="eyebrow">{chapter.id === 'chapter-7' ? 'SYNTHESIS' : 'CONCLUSION'}</span><h2>{chapter.title}</h2>{chapter.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<CitationList citations={chapter.citations ?? []}/></article>)}</div>
    <Link className="text-link" to="/research">Read the complete essay and references <span aria-hidden="true">↗</span></Link>
  </section>;
}

function CitationList({ citations }: { citations: string[] }) {
  if (!citations.length) return null;
  return <details className="citation-list"><summary>Chapter references ({citations.length})</summary><ol>{citations.map((citation, index) => {const url = citation.match(/https?:\/\/\S+/)?.[0];const text = url ? citation.replace(url, '').trim() : citation;return <li key={index}>{text}{url && <> <a href={url} target="_blank" rel="noreferrer">Open source ↗</a></>}</li>;})}</ol></details>;
}

function ResearchPage() {
  const wordCount = researchChapters.flatMap((chapter) => chapter.paragraphs ?? []).join(' ').trim().split(/\s+/).filter(Boolean).length;
  return <section className="section research-section">
    <div className="section-heading"><div><span className="eyebrow">THE COMPLETE ESSAY · AUTHOR-SUPPLIED DRAFT</span><h1>Research essay<span className="accent">.</span></h1></div><p>SM5335 Multimedia Research Essay<br/>School of Creative Media, CityUHK</p></div>
    <p className="research-import-note">Transcribed from the supplied Google Doc. Essay text: approximately {wordCount.toLocaleString()} words, excluding captions and references. Bibliography entries are included as supplied and have not been independently verified in this interface.</p>
    <div className="research-layout"><aside><span className="eyebrow">ESSAY CONTENTS</span>{researchChapters.map(chapter => <a key={chapter.id} href={'#chapter-' + chapter.id}>{chapter.title}</a>)}<a href="#references">References</a></aside>
      <div>{researchChapters.map(chapter => <article className="essay-chapter" id={'chapter-' + chapter.id} key={chapter.id}><span className="eyebrow">{chapter.id === 'opening' ? 'OPENING' : chapter.id === 'chapter-7' || chapter.id === 'conclusion' ? 'CLOSING ARGUMENT' : 'CHAPTER'}</span><h2>{chapter.title}</h2>{chapter.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{chapter.mediaCaptions?.length ? <details className="caption-register"><summary>Figure and media captions ({chapter.mediaCaptions.length})</summary><ol>{chapter.mediaCaptions.map((caption, index) => <li key={index}>{caption}</li>)}</ol><p className="small muted">Only image files already present in the project are displayed. Other figure and video assets were not transferred from the document.</p></details> : null}<CitationList citations={chapter.citations ?? []}/></article>)}
        <article className="essay-chapter" id="references"><span className="eyebrow">SOURCE REGISTER · {references.length} UNIQUE LINKS</span><h2>References</h2><ol className="full-reference-list">{references.map(reference => <li key={reference.id}>{reference.citation?.replace(reference.url, '').trim() ?? reference.title} <a href={reference.url} target="_blank" rel="noreferrer">Open source ↗</a></li>)}</ol></article>
      </div>
    </div>
  </section>;
}

function NotFoundPage() { return <section className="section"><h1>Page not found</h1><Link to="/">Return to Overview</Link></section>; }

export default function App() {
  return <Routes><Route element={<SiteLayout/>}>
    <Route path="/" element={<OverviewPage/>}/>
    <Route path="/exhibition" element={<Exhibition/>}/>
    <Route path="/archive" element={<ArchivePage/>}/>
    <Route path="/archive/:recordId" element={<ArchivePage/>}/>
    <Route path="/timeline" element={<TimelinePage/>}/>
    <Route path="/distribution-paths" element={<DistributionPage/>}/>
    <Route path="/feed-lab" element={<FeedLabPage/>}/>
    <Route path="/lab" element={<FeedLabPage/>}/>
    <Route path="/reflections" element={<ReflectionsPage/>}/>
    <Route path="/research" element={<ResearchPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route></Routes>;
}

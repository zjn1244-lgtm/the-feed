import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { Menu, X, Asterisk } from 'lucide-react';
import { Archive } from './components/Archive';
import { Timeline } from './components/Timeline';
import { DistributionPaths } from './components/DistributionPaths';
import { FeedLab } from './components/FeedLab';
import { MechanismArt } from './components/MechanismArt';
import { historicalStages } from './data/historical-stages';
import { archiveItems } from './data/archive-items';
import { researchChapters } from './data/research-chapters';
import { references } from './data/references';
import type { ArchiveItem } from './data/types';

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Archive', to: '/archive' },
  { label: 'Timeline', to: '/timeline' },
  { label: 'Distribution Paths', to: '/distribution-paths' },
  { label: 'Feed Lab', to: '/feed-lab' },
  { label: 'Research', to: '/research' },
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
  return <>
    <section className="overview-editorial">
      <div className="overview-copy">
        <span className="eyebrow"><span className="red-square"/> MEDIA ARCHAEOLOGY / INFORMATION DISTRIBUTION</span>
        <h1>The Feed We Didn't<br/><em>Choose.</em></h1>
        <p className="hero-subtitle">A Media Archaeology of Information Distribution</p>
        <p className="hero-description">How have material systems, institutions, and intermediaries shaped what gets copied, circulated, and made visible?</p>
        <Link to="/archive" className="overview-entry-link">Explore the research collection <span aria-hidden="true">↗</span></Link>
        <p className="small muted">A qualitative research project · School of Creative Media, City University of Hong Kong</p>
      </div>
      <figure className="overview-figure"><div className="overview-figure-heading"><span className="eyebrow">EXHIBITION GUIDE · 01—06</span><span className="mono small">PRODUCE / SELECT / CIRCULATE</span></div><MechanismArt hero/><figcaption>Researcher's conceptual model of production, selection, and distribution. It is an original diagram, not archival evidence.</figcaption></figure>
    </section>
    <section className="section overview-index">
      <div className="section-heading"><div><span className="eyebrow">CATALOGUE</span><h2>Six routes through the research<span className="accent">.</span></h2></div><p>Enter by period or follow a mechanism across overlapping histories.</p></div>
      <ol className="stage-list">{historicalStages.map((stage, index) => <li key={stage.id}><Link to="/archive" state={{ stage: stage.id }}><span className="stage-index">{String(index + 1).padStart(2, '0')}</span><span className="stage-title">{stage.title}</span><span className="stage-period">{stage.period}</span><span className="stage-mechanism">{stage.mechanism}</span><span className="list-open">Open</span></Link></li>)}</ol>
    </section>
    <section className="research-question"><span className="eyebrow">RESEARCH QUESTION</span><h2>Who controls information's circulation and visibility, under which conditions?</h2><Link to="/research" className="text-link">Read the research framing <span>＋</span></Link></section>
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
function FeedLabPage() { return <FeedLab/>; }

function ResearchPage() {
  return <section className="section research-section">
    <div className="section-heading"><div><span className="eyebrow">THE ARGUMENT, IN PROGRESS</span><h1>Research notebook<span className="accent">.</span></h1></div><p>SM5335 Multimedia Research Essay<br/>School of Creative Media, CityUHK</p></div>
    <div className="research-layout"><aside><span className="eyebrow">ESSAY CONTENTS</span>{researchChapters.map(chapter => <a key={chapter.id} href={`#chapter-${chapter.id}`}>{chapter.title}</a>)}<a href="#references">References</a><p className="notice">Full essay pending. Target: at least 3,000 English words. Interface copy and placeholders do not count as essay text.</p></aside>
      <div>{researchChapters.map(chapter => <article className="chapter" id={`chapter-${chapter.id}`} key={chapter.id}><span className="eyebrow">{chapter.status === 'pending' ? 'CONTENT TO BE SUPPLIED' : 'PROJECT FRAMING · DRAFT'}</span><h2>{chapter.title}</h2><p>{chapter.body}</p></article>)}
        <article className="chapter" id="references"><span className="eyebrow">SOURCE REGISTER</span><h2>References</h2>{references.length ? references.map(reference => <p key={reference.id}>{reference.author} ({reference.year}). <a href={reference.url}>{reference.title}</a> · {reference.status}</p>) : <p>Bibliography to be supplied and verified. No references have been invented. Future entries will link to the evidence they support and include complete bibliographic details.</p>}</article>
      </div>
    </div>
  </section>;
}

function NotFoundPage() { return <section className="section"><h1>Page not found</h1><Link to="/">Return to Overview</Link></section>; }

export default function App() {
  return <Routes><Route element={<SiteLayout/>}>
    <Route path="/" element={<OverviewPage/>}/>
    <Route path="/archive" element={<ArchivePage/>}/>
    <Route path="/archive/:recordId" element={<ArchivePage/>}/>
    <Route path="/timeline" element={<TimelinePage/>}/>
    <Route path="/distribution-paths" element={<DistributionPage/>}/>
    <Route path="/feed-lab" element={<FeedLabPage/>}/>
    <Route path="/research" element={<ResearchPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route></Routes>;
}

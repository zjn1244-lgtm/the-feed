import { useState } from 'react';
import { mediaAssets, pendingMedia, type MediaAsset } from '../data/media-assets';

function ObjectMedia({ item }: { item: MediaAsset }) {
  const [failed, setFailed] = useState(false);
  const src = item.mediaUrl ?? item.embedUrl;
  return (
    <article className="museum-object" id={`media-${item.id.replace(/[^a-zA-Z0-9-]/g, '-')}`}>
      <div className="museum-object-visual">
        {item.kind === 'image' && src && !failed ? (
          <img src={src} alt={item.title} loading="lazy" onError={() => setFailed(true)} />
        ) : item.kind === 'video' && item.embedUrl ? (
          <iframe src={item.embedUrl} title={item.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        ) : item.kind === 'interactive' && item.embedUrl ? (
          <iframe src={item.embedUrl} title={item.title} loading="lazy" className="interactive-source" />
        ) : item.kind === 'audio' && item.mediaUrl && !failed ? (
          <audio controls preload="none" src={item.mediaUrl} onError={() => setFailed(true)}>Your browser does not support audio playback.</audio>
        ) : (
          <div className="museum-source-note">
            <span className="eyebrow gold">{item.status === 'pending' || failed ? 'MEDIA PENDING' : item.kind === 'record' ? 'SOURCE RECORD' : 'SOURCE LINK'}</span>
            <p>{failed ? 'The remote media did not load in this preview. Open the original source to inspect it.' : item.caption}</p>
            {item.kind === 'video' && <a className="panel-link" href={item.sourceUrl} target="_blank" rel="noreferrer">OPEN ORIGINAL PLAYER ↗</a>}
          </div>
        )}
      </div>
      <div className="museum-object-copy">
        <div className="museum-object-meta"><span>{item.id}</span><span>{item.date}</span></div>
        <h4>{item.title}</h4>
        <p className="museum-caption">{item.caption}</p>
        <p className="museum-credit">{item.credit}</p>
        <p className="museum-rights">{item.rights}</p>
        <a className="museum-source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">OPEN ORIGINAL SOURCE ↗</a>
      </div>
    </article>
  );
}

export function MediaCollection({ chapterId, stageId, includePending = false }: { chapterId?: string; stageId?: string; includePending?: boolean }) {
  const items = [...mediaAssets, ...(includePending ? pendingMedia : [])].filter((item) =>
    (chapterId ? item.chapterId === chapterId || item.additionalChapterIds?.includes(chapterId) : true) && (stageId ? item.stageId === stageId : true)
  );
  if (!items.length) return null;
  return <div className="museum-object-list">{items.map((item, index) => <ObjectMedia key={`${item.id}-${index}`} item={item} />)}</div>;
}

export function PendingMediaNote() {
  return <aside className="pending-media-note">
    <div className="eyebrow gold">MEDIA TO LOCATE</div>
    <p>Audio catalogue entries MM008, MM009 and MM017 do not identify a specific playable recording. They remain pending until a recording, access path and reuse conditions can be confirmed.</p>
    <a href="https://guides.loc.gov/recorded-sound-research/collections" target="_blank" rel="noreferrer">OPEN THE SOURCE CATALOGUE ↗</a>
  </aside>;
}

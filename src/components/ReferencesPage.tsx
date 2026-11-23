import { references } from '../data/references';

const journals = [
  'The Journal of Economic History',
  'Business History Review',
  'Digital Journalism',
  'Nordicom Review',
  'Annals of the International Communication Association',
];
const academicPublishers = [
  'University of California Press',
  'University of Chicago Press',
  'Yale University Press',
  'Oxford University Press',
  'MIT Press',
  'Polity',
];

function APAReference({ citation }: { citation: string }) {
  const date = /\(((?:19|20)\d{2}[a-z]?(?:, [^)]+)?|n\.d\.(?:-[a-z])?)\)\.\s*/i.exec(citation);
  const journal = journals.find((name) => citation.includes(`${name},`));
  if (journal) {
    const start = citation.indexOf(journal);
    const tail = citation.slice(start + journal.length);
    const volume = /^,\s*(\d+)(\([^)]+\))?/.exec(tail);
    return <>{citation.slice(0, start)}<em>{journal}</em>{volume ? <>{', '}<em>{volume[1]}</em>{volume[2] ?? ''}{tail.slice(volume[0].length)}</> : tail}</>;
  }

  if (date) {
    const dateEnd = date.index + date[0].length;
    const remainder = citation.slice(dateEnd);
    const editedVolume = /\(Eds?\.\),\s*(.+?)\s+\(pp?\./i.exec(remainder);
    if (editedVolume) {
      const start = dateEnd + editedVolume.index + editedVolume[0].indexOf(editedVolume[1]);
      return <>{citation.slice(0, start)}<em>{editedVolume[1]}</em>{citation.slice(start + editedVolume[1].length)}</>;
    }
    if (remainder.startsWith('In ')) {
      const publisher = academicPublishers.find((name) => citation.includes(name));
      const end = publisher ? citation.indexOf(publisher) : citation.length;
      return <>{citation.slice(0, dateEnd)}<em>{citation.slice(dateEnd, end).trim()}</em>{citation.slice(end)}</>;
    }
    const publisher = academicPublishers.find((name) => citation.includes(name));
    if (publisher) {
      const start = citation.indexOf(publisher);
      const before = citation.slice(dateEnd, start).trimEnd();
      const titleStart = dateEnd + (citation.slice(dateEnd, start).length - before.length);
      return <>{citation.slice(0, titleStart)}<em>{before.trim()}</em>{citation.slice(start)}</>;
    }
  }
  return <>{citation}</>;
}

function ReferenceList({ items }: { items: typeof references }) {
  return <ol className="reference-list">{items.map((reference) => (
    <li id={reference.id} key={reference.id}>
      <p><APAReference citation={reference.citation ?? ''}/></p>
      {reference.url && <a href={reference.url} target="_blank" rel="noreferrer">OPEN DOI / ORIGINAL SOURCE ↗</a>}
    </li>
  ))}</ol>;
}

export function ReferencesPage() {
  const alphabetize = (items: typeof references) => [...items].sort((a, b) => a.author.localeCompare(b.author) || a.citation!.localeCompare(b.citation!));
  const academic = alphabetize(references.filter((item) => item.category === 'academic'));
  const media = alphabetize(references.filter((item) => item.category !== 'academic'));
  return <section className="references-page">
    <div className="wrap">
      <div className="chapter-heading">
        <div><div className="eyebrow earth">SOURCE INDEX / APA 7</div><h2>References.</h2></div>
        <aside>References gathered from the essay’s chapter bibliographies. Citations retain the author-supplied bibliographic details; each source opens at its DOI or original URL.</aside>
      </div>
      <div className="references-count">{references.length} UNIQUE SOURCES · {academic.length} ACADEMIC · {media.length} MEDIA &amp; ARCHIVAL</div>
      <section className="reference-group">
        <div className="eyebrow earth">01 / SCHOLARSHIP</div><h3>Academic References</h3>
        <ReferenceList items={academic} />
      </section>
      <section className="reference-group">
        <div className="eyebrow earth">02 / PRIMARY AND MEDIA SOURCES</div><h3>Media &amp; Archival Sources</h3>
        <ReferenceList items={media} />
      </section>
      <p className="reference-editorial-note">Bibliographic data is transcribed from the supplied essay and its chapter lists. Entries with incomplete publication details are not supplemented by guesswork.</p>
    </div>
  </section>;
}

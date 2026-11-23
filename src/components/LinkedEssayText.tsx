import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { referenceIdForCitation } from '../data/references';

const authorYear = /^(.+?),\s*((?:19|20)\d{2}[a-z]?|n\.d\.(?:-[a-z])?)$/i;
const narrativeAuthorYear = /([A-Z][\p{L}\d.'’\-]*(?:\s+(?:(?:of|the|and|for|&)|[A-Z][\p{L}\d.'’\-]*)){0,4})\s+\(((?:19|20)\d{2}[a-z]?|n\.d\.(?:-[a-z])?)\)/gu;

function linkedCitation(label: string, authorYearText: string, key: string) {
  const match = authorYearText.trim().match(authorYear);
  const id = match ? referenceIdForCitation(`${match[1]}, ${match[2]}`) : undefined;
  return id ? <Link className="citation-link" key={key} to={`/references#${id}`}>{label}</Link> : <Fragment key={key}>{label}</Fragment>;
}

function inlineGroup(group: string) {
  const citations = group.split(/;\s*/);
  return citations.map((citation, index) => <Fragment key={index}>{index > 0 ? '; ' : ''}{linkedCitation(citation.trim(), citation.trim(), String(index))}</Fragment>);
}

function linkNarrative(text: string) {
  const parts: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(narrativeAuthorYear)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    parts.push(text.slice(last, start));
    parts.push(linkedCitation(match[0], `${match[1]}, ${match[2]}`, `n-${index++}`));
    last = end;
  }
  parts.push(text.slice(last));
  return parts;
}

export function LinkedEssayText({ text }: { text: string }) {
  const segments = text.split(/(\([^()]*\))/g);
  return <>{segments.map((segment, index) => {
    if (segment.startsWith('(') && segment.endsWith(')')) {
      return <Fragment key={index}>({inlineGroup(segment.slice(1, -1))})</Fragment>;
    }
    return <Fragment key={index}>{linkNarrative(segment)}</Fragment>;
  })}</>;
}

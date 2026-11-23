import type { Reference } from './types';
import { researchChapters } from './research-chapters';

const sourceLines = researchChapters.flatMap((chapter) => chapter.citations ?? []);
const uniqueSources = [...new Map(sourceLines.map((citation) => {
  const url = citation.match(/https?:\/\/\S+/)?.[0]?.replace(/[),.]$/, '') ?? '';
  return [url || citation, { citation, url }];
})).values()];

function authorOf(citation: string) {
  const dateStart = citation.search(/\s\((?:19|20)\d{2}[a-z]?|\s\(n\.d\.(?:-[a-z])?/i);
  return (dateStart >= 0 ? citation.slice(0, dateStart) : citation).trim().replace(/[.,]$/, '') || 'Source';
}
function yearOf(citation: string) {
  return citation.match(/\(((?:19|20)\d{2}[a-z]?|n\.d\.(?:-[a-z])?)/)?.[1] ?? 'n.d.';
}
function isAcademic(citation: string) {
  const academicPublisher = /(?:University of California Press|University of Chicago Press|Yale University Press|Oxford University Press|MIT Press|Polity)/i.test(citation);
  const scholarlyVenue = /(?:Business History Review|Journal of Economic History|Digital Journalism|Nordicom Review|Annals of the International Communication Association|USENIX|ACM SIGCOMM|Proceedings of the|\b\d+\(\d+\),\s*\d)/i.test(citation);
  return (academicPublisher || scholarlyVenue)
    && !/(?:specification|\[(illustration|photograph|video|digital image|collection record|system documentation|software review|documentary film|web page|screenshot))/i.test(citation);
}

const parsed = uniqueSources.map(({ citation, url }) => ({ citation, url, author: authorOf(citation), year: yearOf(citation) }));
const baseYear = (year: string) => year.replace(/-[a-z]$/i, '').replace(/^((?:19|20)\d{2})[a-z]$/i, '$1');
const grouped = parsed.reduce((map, item) => {
  const key = `${item.author.toLowerCase()}|${baseYear(item.year)}`;
  map.set(key, [...(map.get(key) ?? []), item]);
  return map;
}, new Map<string, typeof parsed>());
for (const items of grouped.values()) {
  if (items.length < 2 || items.every((item) => /(?:19|20)\d{2}[a-z]$|n\.d\.-[a-z]$/i.test(item.year))) continue;
  const titlePart = (citation: string) => citation.replace(/^.*?\((?:(?:19|20)\d{2}[a-z]?|n\.d\.(?:-[a-z])?)\)\.\s*/i, '');
  const ordered = [...items].sort((a, b) => titlePart(a.citation).localeCompare(titlePart(b.citation)));
  for (const [index, item] of ordered.entries()) {
    const suffix = String.fromCharCode(97 + index);
    const previousYear = item.year;
    item.year = `${baseYear(previousYear)}-${suffix}`;
    item.citation = item.citation.replace(`(${previousYear})`, `(${item.year})`);
  }
}

export const references: Reference[] = parsed.map((item, index) => ({
  id: `ref-${String(index + 1).padStart(3, '0')}`,
  author: item.author,
  title: item.citation,
  year: item.year,
  url: item.url,
  status: 'pending',
  category: isAcademic(item.citation) ? 'academic' : 'media',
  citation: item.citation,
}));

export function referenceIdForCitation(authorYear: string): string | undefined {
  const match = authorYear.trim().match(/^(.+?),\s*((?:19|20)\d{2}[a-z]?|n\.d\.(?:-[a-z])?)$/i);
  if (!match) return;
  const author = match[1].trim().replace(/\s*\[[^\]]+\]/g, '').replace(/[’']s$/i, '').toLowerCase();
  const year = match[2].toLowerCase();
  const aliases: Record<string, string> = { 'rss advisory board|2003': 'winer|2003' };
  const sourceKey = `${author}|${year}`;
  const alias = aliases[sourceKey];
  const [matchAuthor, matchYear] = alias ? alias.split('|') : [author, year];
  const tokens = matchAuthor.split(/[\s,&]+/).filter((token) => token.length > 2);
  return references.find((item) => {
    const itemYear = item.year.toLowerCase();
    const yearMatches = /(?:[0-9]{4}[a-z]|n\.d\.-[a-z])$/i.test(matchYear) ? itemYear === matchYear : itemYear === matchYear || itemYear === `${matchYear}-a`;
    if (!yearMatches) return false;
    const citation = item.citation?.toLowerCase() ?? '';
    const authorToken = matchAuthor.split(/[\s,&]+/).find((token) => token.length > 2) ?? '';
    return citation.startsWith(authorToken) && tokens.some((token) => citation.startsWith(token) || citation.includes(`& ${token}`));
  })?.id;
}

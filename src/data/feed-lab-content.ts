import type { FeedItem } from './types';
export const feedItems: FeedItem[] = [
 {id:'a',title:'Who gets to decide what travels?',source:'The Public Record',topic:'Institutions',publishedAt:'2026-01-01T09:00:00Z',editorialPriority:5,relevance:2,excerpt:'An invented dispatch about the power of intermediaries.'},
 {id:'b',title:'A small history of making copies',source:'Material Matters',topic:'Technology',publishedAt:'2026-01-01T12:00:00Z',editorialPriority:2,relevance:5,excerpt:'An invented dispatch about the material conditions of reproduction.'},
 {id:'c',title:'The stories outside the frame',source:'The Public Record',topic:'Culture',publishedAt:'2026-01-01T14:00:00Z',editorialPriority:3,relevance:3,excerpt:'An invented dispatch about selection and absence.'},
 {id:'d',title:'Reading together, differently',source:'Open Notebook',topic:'Culture',publishedAt:'2026-01-01T11:00:00Z',editorialPriority:4,relevance:1,excerpt:'An invented dispatch about collective reading practices.'},
 {id:'e',title:'When the channel closes',source:'Open Notebook',topic:'Technology',publishedAt:'2026-01-01T08:00:00Z',editorialPriority:1,relevance:4,excerpt:'An invented dispatch about dependence on distribution infrastructure.'}
];
export const feedSources = [...new Set(feedItems.map(i=>i.source))];

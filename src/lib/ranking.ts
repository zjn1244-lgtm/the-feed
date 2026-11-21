import type { FeedItem } from '../data/types';
export type RankingMode = 'chronological' | 'editorial' | 'personalized';
export function score(item:FeedItem, topic:string, weight:number) { return item.relevance + (item.topic === topic ? weight : 0); }
export function rankFeed(items:FeedItem[], mode:RankingMode, sources:string[], topic:string, weight:number) {
 return items.filter(i=>sources.includes(i.source)).sort((a,b)=>{
 const delta = mode==='chronological' ? Date.parse(b.publishedAt)-Date.parse(a.publishedAt) : mode==='editorial' ? b.editorialPriority-a.editorialPriority : score(b,topic,weight)-score(a,topic,weight);
 return delta || a.id.localeCompare(b.id);
 });
}

export type StageId = 'pre-mass' | 'early-mass' | 'syndication' | 'early-web' | 'rss' | 'algorithmic';
export interface HistoricalStage { id: StageId; title: string; subtitle: string; period: string; mechanism: string; topics: string[] }
export interface ArchiveItem { id: string; title: string; date: string; historicalPeriod: StageId; medium: string; institution: string; context: string; evidence: string; interpretation: string; limitations: string; sourceUrl: string | null; imageUrl: string | null; imageRights: string; imageRightsUrl?: string | null; citation?: string | null; verificationStatus: 'placeholder' | 'pending' | 'verified' }
export interface HistoricalEvent { id: string; stageId: StageId; title: string; date: string | null; archiveId: string; status: 'placeholder' | 'verified' }
export interface HistoricalConnection { from: StageId; to: StageId; kind: 'documented-inheritance' | 'conceptual-comparison'; label: string; referenceIds: string[] }
export interface DistributionPath { stageId: StageId; nodes: { role: string; description: string }[]; note: string }
export interface FeedItem { id: string; title: string; source: string; topic: string; publishedAt: string; editorialPriority: number; relevance: number; excerpt: string }
export interface ResearchChapter { id: string; title: string; status: 'pending' | 'draft' | 'reviewed'; body: string; referenceIds: string[] }
export interface Reference { id: string; author: string; title: string; year: string; url: string; status: 'pending' | 'verified' }

import { archiveItems } from './archive-items';
import type { HistoricalEvent, HistoricalConnection } from './types';

// The timeline indexes source records by the historical stage they illuminate.
// A catalogue or announcement is not presented as the event it documents.
export const historicalEvents: HistoricalEvent[] = archiveItems.map(item => ({
  id: `event-${item.id}`,
  stageId: item.historicalPeriod,
  title: item.title,
  date: item.date,
  archiveId: item.id,
  status: item.verificationStatus === 'verified' ? 'verified' : 'placeholder',
}));

export const historicalConnections: HistoricalConnection[] = [
  {from:'pre-mass',to:'rss',kind:'conceptual-comparison',label:'Selection through trusted sources',referenceIds:[]},
  {from:'syndication',to:'algorithmic',kind:'conceptual-comparison',label:'Intermediaries and the allocation of visibility',referenceIds:[]},
  {from:'early-web',to:'algorithmic',kind:'conceptual-comparison',label:'Delivery defaults and user control',referenceIds:[]}
];

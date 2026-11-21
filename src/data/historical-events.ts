import { historicalStages } from './historical-stages';
import type { HistoricalEvent, HistoricalConnection } from './types';
export const historicalEvents: HistoricalEvent[] = historicalStages.map(s=>({id:`event-${s.id}`,stageId:s.id,title:`${s.topics[0]} — evidence slot`,date:null,archiveId:`archive-${s.id}`,status:'placeholder'}));
export const historicalConnections: HistoricalConnection[] = [
 {from:'pre-mass',to:'rss',kind:'conceptual-comparison',label:'Selection through trusted sources',referenceIds:[]},
 {from:'syndication',to:'algorithmic',kind:'conceptual-comparison',label:'Intermediaries and the allocation of visibility',referenceIds:[]},
 {from:'early-web',to:'algorithmic',kind:'conceptual-comparison',label:'Delivery defaults and user control',referenceIds:[]}
];

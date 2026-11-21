import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankFeed } from './ranking';
import { feedItems, feedSources } from '../data/feed-lab-content';
test('three mechanisms produce transparent, distinct first items',()=>{
 assert.equal(rankFeed(feedItems,'chronological',feedSources,'Culture',5)[0].id,'c');
 assert.equal(rankFeed(feedItems,'editorial',feedSources,'Culture',5)[0].id,'a');
 assert.equal(rankFeed(feedItems,'personalized',feedSources,'Culture',5)[0].id,'c');
 assert.equal(rankFeed(feedItems,'personalized',feedSources,'Technology',5)[0].id,'b');
});
test('source exclusion and empty input are respected',()=>{
 assert.ok(rankFeed(feedItems,'editorial',['Open Notebook'],'Culture',5).every(i=>i.source==='Open Notebook'));
 assert.deepEqual(rankFeed(feedItems,'editorial',[],'Culture',5),[]);
});

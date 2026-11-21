# The Feed We Didn't Choose

**A Media Archaeology of Information Distribution**

Phase 1 interactive research prototype for SM5335 Multimedia Research Essay, School of Creative Media, City University of Hong Kong. English interface; React + TypeScript + Vite; browser-local interactions. No account, backend, tracking, recommendation API, or ML model.

## Run locally

Requires Node.js 20.19+ (or Node.js 22+) and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite (normally http://localhost:5173).

```sh
npm run build
npm run preview
npm test
```

`build` type-checks and creates `dist/`. Deploy that directory to a static host. Hash-based section navigation needs no server route rewrites.

## Structure

```text
public/                        Reserved for licensed archival assets
src/
  App.tsx                      Homepage, navigation, essay and references sections
  main.tsx                     React entry
  styles.css                   Design tokens, layout, responsive and motion rules
  components/
    Archive.tsx                Filtering, search, native modal record viewer
    Timeline.tsx               Stage nodes and cross-period conceptual links
    DistributionPaths.tsx      Interactive SVG, two-model comparison
    FeedLab.tsx                Source controls, three mechanisms, rule disclosure
    MechanismArt.tsx           Original SVG artwork; never historical evidence
  data/
    types.ts                   Shared typed interfaces
    historical-stages.ts       Six research scopes and topics
    archive-items.ts           Research slots, metadata, evidence and rights
    historical-events.ts       Placeholder event slots and typed connections
    distribution-paths.ts      Conceptual roles and descriptions
    feed-lab-content.ts        Clearly fictional demonstration stories
    research-chapters.ts       Essay structure and editorial status
    references.ts              Empty, awaiting verified bibliography
  lib/
    ranking.ts                 Pure deterministic source filter and ranker
    ranking.test.ts            Meaningful ranking and source-exclusion tests
index.html                     English metadata and document title
vite.config.ts
package.json
package-lock.json
```

## Implemented

- Editorial museum homepage, original SVG visual identity, six stage entry points.
- Anchor navigation, active section indicator, mobile navigation.
- Archive stage/medium filters, text search, result count, empty state and detailed modal.
- Typed records include all required metadata, source, image rights and verification fields.
- Nonlinear timeline foundation: clickable research slots and selectable conceptual connections.
- Dashed conceptual comparison legend distinct from documented inheritance; none asserted as established.
- Six selectable distribution models, simultaneous comparison, mouse and keyboard role inspection.
- Feed Lab: chronological, editorial and simplified personalized order; source exclusion, topic preference, bonus slider, reset, visible rule and item-score disclosure.
- Research findings, discussion and references sections ready for author content.
- Responsive layouts; semantic controls, focus indicators, skip link, native modal focus containment, live announcements and reduced-motion support.

## Academic content boundary

This is the interface foundation, **not a completed 3,000-word essay**. No historical events, dates, citations, archival screenshots or research findings have been invented. All archive entries are structural placeholders; event dates and source/image URLs are null. Stage topics come from the project brief, not independent archival verification. Original diagrams are conceptual interface artwork. Fictional Feed Lab stories and scores are not research evidence.

`verificationStatus: 'verified'` must only be used after checking a real source. Supply context, evidence (including page/section or archival identifier), interpretation, limitations, date, institution and sourceUrl. Add licensed images with imageUrl and explicit imageRights; the present visual component intentionally uses diagrams until real assets are reviewed. Current archive cards carry placeholder labels; adapt those labels and image rendering when introducing verified entries.

References use a typed bibliography with stable IDs. Chapters and historical connections have `referenceIds`; connect them to checked references when the essay is supplied. Historical inheritance needs documentary evidence and citations before assigning `documented-inheritance`. Current timeline arcs are conceptual comparisons only. Dated event positioning, citation backlinks and verified-event rendering are next-phase work.

## Transparent Feed Lab

All fixture timestamps share a fictional date and are displayed in UTC. Scores are fixed, not inferred from behavior.

- Chronological: publication timestamp descending.
- Editorial: `editorialPriority` descending (1–5).
- Personalized: `relevance + (topic matches preferred topic ? topicBonus : 0)`, descending.
- Ties: item ID alphabetically. Source eligibility is applied first; excluded sources never appear.
- Topic bonus and preference only affect personalized mode. Hiding item scores does not hide the rule or simulation notice.

**Conceptual Simulation — Not a reconstruction of proprietary platform algorithms.**

## Next phase / not yet implemented

1. Supply and edit the 3,000+ word English argument, methodology, findings, geographic scope and limitations.
2. Verify primary-source records and bibliographic references; review image licenses and accessibility descriptions.
3. Add real dated events, source-backed inheritance links and evidence-specific historical links from Feed Lab.
4. Build full per-stage essay sections, citation backlinks, richer many-to-many SVG networks and print/export formatting.
5. Perform browser/device QA and a manual accessibility audit with real content; add integration checks for filters, keyboard modals and SVG controls.

Phase 1 uses sections within one document, not separate routed pages. Data is TypeScript and edited in source; no CMS or data import validation is included. Font files load optionally from Google Fonts; Georgia/Arial/monospace fallbacks keep the site usable offline. Build dependencies require an initial network install. No deployment is included in this local-first phase.

## Phase 1 validation

- TypeScript check and production Vite build: passed.
- Ranking tests (three mechanisms, topic changes, source exclusion and empty-source state): passed.
- Managed browser preview: unavailable. The preview relay timed out on port 4173, and `sites-preview status` reported stopped. Visual browser/device QA remains outstanding; no claim of browser acceptance is made.

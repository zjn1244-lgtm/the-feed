import type { StageId } from './types';

export type MediaKind = 'image' | 'video' | 'interactive' | 'record' | 'audio';
export interface MediaAsset {
  id: string;
  title: string;
  kind: MediaKind;
  stageId: StageId | 'opening' | 'unassigned';
  chapterId: string;
  additionalChapterIds?: string[];
  date: string;
  sourceUrl: string;
  mediaUrl?: string;
  embedUrl?: string;
  caption: string;
  credit: string;
  rights: string;
  status: 'available' | 'pending';
}

// Resource IDs and notes follow the author's SM5335 media sheet and essay captions.
// Withdrawn analytic/re-typeset figures (MM026, MM027, MM029, MM030, MM032, MM033)
// are intentionally excluded. Source-page links remain the authority for each record.
export const mediaAssets: MediaAsset[] = [
  {
    id: 'MM036', title: 'Following & Favorites — Meta launch image', kind: 'image', stageId: 'algorithmic', chapterId: 'opening', additionalChapterIds: ['chapter-6'], date: '2022-03-23',
    sourceUrl: 'https://about.fb.com/news/2022/03/two-new-ways-to-control-your-instagram-feed/',
    mediaUrl: 'https://about.fb.com/wp-content/uploads/2022/03/Control-your-Instagram-Feed-with-Favorites-and-Following_Header.jpg',
    caption: 'Figure 1. Instagram’s Following and Favorites options in Meta’s March 23, 2022 announcement. Official product imagery; it documents available controls, not user behaviour.',
    credit: 'Meta Newsroom; © Meta. Research index R43 / MM036.',
    rights: 'Meta copyright. Public reuse permission is not established; shown from the source host for research review.',
    status: 'available',
  },
  {
    id: 'MM031', title: 'Google Reader sorting and read-item controls', kind: 'image', stageId: 'rss', chapterId: 'opening', additionalChapterIds: ['chapter-5'], date: '2006-07-19',
    sourceUrl: 'https://googlereader.blogspot.com/2006/07/your-wish-is-our-command.html',
    mediaUrl: 'https://googlereader.blogspot.com/uploaded_images/reading-list-controls.png',
    caption: 'Figure 2. Google Reader’s 2006 sorting and read-item visibility controls, including “auto” and “date”. This is the original interface screenshot reused later as Figure 12.',
    credit: 'Parparita, Official Google Reader Blog. Research index R36 / MM031.',
    rights: 'Official product screenshot; reproduction terms are not stated in the supplied source notes.',
    status: 'available',
  },
  {
    id: 'R31 · Figure 3', title: 'RSS 0.90 specification — Mozilla Dot Org channel preview', kind: 'record', stageId: 'opening', chapterId: 'opening', date: '1999',
    sourceUrl: 'https://www.rssboard.org/rss-0-9-0',
    caption: 'Figure 3. The channel preview reproduced in Netscape’s RSS 0.90 specification. A source page is linked; a separately verified image file is not available.',
    credit: 'Netscape Communications Corporation, RSS Advisory Board. Research index R31.',
    rights: 'Use the original specification page; no screenshot has been copied into the site.',
    status: 'available',
  },
  {
    id: 'R33 · Figure 4', title: 'RSS 2.0 specification (version 2.0.1)', kind: 'record', stageId: 'opening', chapterId: 'opening', date: 'Original specification 2003; later web view',
    sourceUrl: 'https://www.rssboard.org/rss-2-0-1',
    caption: 'Figure 4. The essay describes a later web view of the archived specification. The source is linked; no standalone screenshot is available in the supplied materials.',
    credit: 'Dave Winer, RSS Advisory Board. Research index R33.',
    rights: 'Original specification page; no copied screenshot.',
    status: 'available',
  },
  {
    id: 'MM001', title: 'Dunhuang Star Chart, British Library Or.8210/S.3326', kind: 'image', stageId: 'pre-mass', chapterId: 'chapter-1', date: '649–684 CE (catalogued)',
    sourceUrl: 'https://idp.bl.uk/collection/7861395E5F814419BA05483EAB254832/',
    mediaUrl: '/media/MM001-dunhuang-star-chart.jpg',
    caption: 'Figure 5. North circumpolar section of the hand-drawn Dunhuang Star Chart, ink on paper. The image is a digitized record of the manuscript, not a contemporary photograph.',
    credit: 'International Dunhuang Programme / British Library; Wikimedia Commons CC0 1.0. Research index R08 / MM001.',
    rights: 'CC0 1.0 as stated in the supplied essay caption; verify the item page before reuse.',
    status: 'available',
  },
  {
    id: 'MM019', title: 'The Dunhuang Celestial Chart', kind: 'video', stageId: 'pre-mass', chapterId: 'chapter-1', date: '2009',
    sourceUrl: 'https://www.youtube.com/watch?v=gOy6x6CfL7M',
    embedUrl: 'https://www.youtube-nocookie.com/embed/gOy6x6CfL7M?start=380&end=410',
    caption: 'Video 1. Modern documentary excerpt (06:20–06:50) showing the manuscript’s material form and hand-drawn details; not historical footage.',
    credit: 'Directed by Jérôme Blumberg; produced by CNRS Images. Research index MM019.',
    rights: 'Original YouTube player; excerpt timestamps identify the selected passage, not a separately hosted clip.',
    status: 'available',
  },
  {
    id: 'MM020', title: 'Tripitaka Koreana woodblocks at Haeinsa', kind: 'image', stageId: 'early-mass', chapterId: 'chapter-2', date: 'Photographed 2022-10-07; blocks are 13th century',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tripitaka_Koreana_03.jpg',
    mediaUrl: '/media/MM020-tripitaka-koreana.jpg',
    caption: 'Figure 6. The Tripitaka Koreana woodblocks stored at Haeinsa Temple. This is a 2022 photograph of 13th-century objects, not a historical photograph.',
    credit: 'Bernard Gagnon, Wikimedia Commons, CC0 1.0. Research index R10 / MM020.',
    rights: 'CC0 1.0 as identified in the supplied resource sheet.',
    status: 'available',
  },
  {
    id: 'MM021', title: 'Haeinsa Temple woodblock depositories', kind: 'video', stageId: 'early-mass', chapterId: 'chapter-2', date: '2013-09-20',
    sourceUrl: 'https://www.youtube.com/watch?v=V3cXFdaxdb4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/V3cXFdaxdb4?start=58&end=88',
    caption: 'Video 2. Contemporary footage excerpt (00:58–01:28) of the depositories, corridors, and woodblocks; it does not establish 13th-century circulation.',
    credit: 'UNESCO / NHK. Research index MM021.',
    rights: '© NHK Nippon Hoso Kyokai, all rights reserved. Original player only; no copying or editing.',
    status: 'available',
  },
  {
    id: 'MM002', title: 'Printing press at the Gutenberg Museum, Mainz', kind: 'image', stageId: 'early-mass', chapterId: 'chapter-2', date: 'Photographed 2019',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gutenberg%27s_vintage_printing_press_in_the_Gutenberg_Museum_in_Mainz,_Germany_(48988497077).jpg',
    mediaUrl: '/media/MM002-gutenberg-press.jpg',
    caption: 'Figure 7. A press exhibited at the Gutenberg Museum, photographed in 2019; this is not a 15th-century image.',
    credit: 'dronepicr, Wikimedia Commons, CC BY 2.0. Research index MM002.',
    rights: 'CC BY 2.0; attribute the photographer and link to the file page.',
    status: 'available',
  },
  {
    id: 'MM035', title: 'Hoe double-octuple newspaper press (1903 model)', kind: 'image', stageId: 'early-mass', chapterId: 'chapter-2', date: 'Illustration published 1905',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:NIE_1905_Printing_-_Hoe_double_octuple_press.jpg',
    mediaUrl: '/media/MM035-hoe-press-1905.jpg',
    caption: 'Figure 8. A 1905 encyclopaedia illustration of a Hoe press model from 1903; not William Bullock’s 1865 press.',
    credit: 'The New International Encyclopædia (1905), digitized via Wikimedia Commons. Research index R55 / MM035.',
    rights: 'Public domain in the United States according to the supplied source record; other jurisdictions may differ.',
    status: 'available',
  },
  {
    id: 'MM022', title: 'Printing and binding a book', kind: 'video', stageId: 'early-mass', chapterId: 'chapter-2', date: 'V&A page updated 2024; video date not confirmed',
    sourceUrl: 'https://www.vam.ac.uk/articles/how-was-it-made-printing-and-binding-a-book',
    embedUrl: 'https://www.youtube-nocookie.com/embed/k4j_McrUmqM?start=12&end=45',
    caption: 'Video 3. Modern demonstration excerpt (00:12–00:45) of type, inking, and pressing; not footage of 15th-century work.',
    credit: 'Victoria and Albert Museum. Research index MM022.',
    rights: 'Use the original player; public redistribution or editing permission is not established.',
    status: 'available',
  },
  {
    id: 'MM023', title: 'Morse telegraph receiver, Patent No. 4,453', kind: 'record', stageId: 'syndication', chapterId: 'chapter-3', date: 'Patent 1846-04-11; photo date not confirmed',
    sourceUrl: 'https://www.si.edu/object/pieces-morses-telegraph-apparatus-us-patent-4453%3Anmah_706503',
    caption: 'The essay’s Figure 9 identifies a Smithsonian photograph of this receiver. The supplied delivery URL returned an HTML page rather than an image in preview; no image is substituted here.',
    credit: 'Smithsonian National Museum of American History. Research index R50 / MM023.',
    rights: 'Image rights require confirmation; linked from the Smithsonian record.',
    status: 'pending',
  },
  {
    id: 'MM004', title: 'The First Telegraphic Instrument', kind: 'image', stageId: 'syndication', chapterId: 'chapter-3', date: 'Instrument 1844; image 1870; reproduction photograph 1945',
    sourceUrl: 'https://www.loc.gov/item/2001700117/',
    mediaUrl: 'https://tile.loc.gov/storage-services/service/pnp/cph/3a00000/3a05000/3a05200/3a05220_150px.jpg',
    caption: 'A Library of Congress thumbnail for the historical image depicting the 1844 telegraph instrument. The image dates to 1870, and its reproduction photograph to 1945; these dates describe different layers of the source.',
    credit: 'Library of Congress, item 2001700117. Research index MM004.',
    rights: 'The supplied research sheet does not confirm image reuse rights; the image is remotely served from LOC and is not copied into project files.',
    status: 'available',
  },
  {
    id: 'MM024', title: 'Associated Press Washington Bureau bulletin on the Lusitania', kind: 'image', stageId: 'syndication', chapterId: 'chapter-3', date: '1915-05-07; reproduced by LOC in 2019',
    sourceUrl: 'https://blogs.loc.gov/loc/2019/05/the-ap-washington-bureau-1915-1930-now-online/',
    mediaUrl: 'https://blogs.loc.gov/loc/files/2019/05/Screen-Shot-2019-05-11-at-7.37.00-PM.png',
    caption: 'Figure 10. A reproduced May 7, 1915 AP Washington Bureau wire bulletin at 2:09 p.m.; it is not an 1846 founding record.',
    credit: 'Tucker (2019), Library of Congress. Research indexes R17 / R51 / MM024.',
    rights: 'AP rights may apply; image is linked from the LOC-hosted source page.',
    status: 'available',
  },
  {
    id: 'MM025', title: 'Evening Star, Washington, D.C., front page', kind: 'record', stageId: 'syndication', chapterId: 'chapter-3', date: '1922-06-26',
    sourceUrl: 'https://www.loc.gov/item/sn83045462/1922-06-26/ed-1/',
    caption: 'A Library of Congress newspaper issue with AP membership and wire attribution. It does not by itself prove that an identical story was reused across newspapers.',
    credit: 'Library of Congress Chronicling America. Research indexes R24 / R52 / MM025.',
    rights: 'Institutional item page; page-level image permissions should be checked with LOC.',
    status: 'available',
  },
  {
    id: 'MM039', title: 'Computer Chronicles: Push Technology', kind: 'video', stageId: 'early-web', chapterId: 'chapter-4', date: 'First broadcast 1997',
    sourceUrl: 'https://archive.org/details/Pushtech98',
    embedUrl: 'https://archive.org/embed/Pushtech98?start=1257',
    caption: 'Video 4a. Netcaster demonstration excerpt (20:57–21:22) from a 1997 broadcast, showing “My Channels” and channel discovery. A second excerpt (10:16–10:43) shows PointCast; both are contemporary historical footage.',
    credit: 'Computer Chronicles, archived by Internet Archive. Research index R57 / MM039.',
    rights: 'Internet Archive identifies CC BY-NC-ND. Player links to the original programme; timestamps are based on the supplied research record.',
    status: 'available',
  },
  {
    id: 'MM028', title: 'PointCast Network Japan 2.0 Beta 1 interface', kind: 'image', stageId: 'early-web', chapterId: 'chapter-4', date: 'Review dated 1997-10-17',
    sourceUrl: 'https://forest.watch.impress.co.jp/obsolete/rev/pointcast.html',
    mediaUrl: 'https://forest.watch.impress.co.jp/window/pointcast_l.gif',
    caption: 'Figure 11. Original full interface screenshot reproduced in a contemporary Japanese software review; it shows PointCast’s integrated presentation, not a reconstructed screen.',
    credit: 'Higuchi & Kobayashi (1997), Mado no Mori (Impress). Research indexes R54 / MM028.',
    rights: '© Impress; permission for public reuse is not established.',
    status: 'available',
  },
  {
    id: 'MM039', title: 'Computer Chronicles: PointCast screensaver and channel viewer', kind: 'video', stageId: 'early-web', chapterId: 'chapter-4', date: 'First broadcast 1997',
    sourceUrl: 'https://archive.org/details/Pushtech98',
    embedUrl: 'https://archive.org/embed/Pushtech98?start=616',
    caption: 'Video 4b. Original 1997 demonstration excerpt (10:16–10:43), showing a headline in the PointCast screensaver opening a channel viewer.',
    credit: 'Computer Chronicles, archived by Internet Archive. Research index R57 / MM039.',
    rights: 'Internet Archive identifies CC BY-NC-ND. This is a second excerpt of the same numbered source.',
    status: 'available',
  },
  {
    id: 'MM040', title: 'Getting Started with Google Reader', kind: 'video', stageId: 'rss', chapterId: 'chapter-5', date: '2008-12-09',
    sourceUrl: 'https://www.youtube.com/watch?v=PvKFP67GwSY',
    embedUrl: 'https://www.youtube-nocookie.com/embed/PvKFP67GwSY',
    caption: 'Video 5. A 2008 tutorial on creating a Google Reader account and adding a first subscription. Full original video; exact duration was not independently verified.',
    credit: 'GoogleReaderHelp. Research indexes R58 / MM040.',
    rights: 'Original YouTube player; do not download or edit.',
    status: 'available',
  },
  {
    id: 'MM034', title: 'Google Reader redesign and Google+ sharing', kind: 'image', stageId: 'rss', chapterId: 'chapter-5', date: '2011-10-31',
    sourceUrl: 'https://googlereader.blogspot.com/2011/10/new-in-reader-fresh-design-and-google.html',
    mediaUrl: 'https://3.bp.blogspot.com/-w870M3tidIU/UdzkKXs7vtI/AAAAAAAAAWk/fRm0aqtPyFE/s400/greader_1000.png',
    caption: 'Figure 13. Official 2011 announcement screenshots of the redesigned Reader and Google+ sharing interface.',
    credit: 'Green, Official Google Reader Blog. Research indexes R38 / MM034.',
    rights: 'Official product screenshots; terms for public reuse are not stated in the supplied source notes.',
    status: 'available',
  },
  {
    id: 'MM034', title: 'Google Reader sharing dialog with Google+ Circles', kind: 'image', stageId: 'rss', chapterId: 'chapter-5', date: '2011-10-31',
    sourceUrl: 'https://googlereader.blogspot.com/2011/10/new-in-reader-fresh-design-and-google.html',
    mediaUrl: 'https://4.bp.blogspot.com/-0ioPfrxNhLA/UdzjjFB-CaI/AAAAAAAAAWI/oT3VSNh2Ih0/s320/Screen%2520shot%25202011-10-28%2520at%25202.01.30%2520PM.png',
    caption: 'Official announcement image showing the Google+ sharing dialog. Together with the redesign screenshot, it records a 2011 interface change.',
    credit: 'Green, Official Google Reader Blog. Research index R38 / MM034.',
    rights: 'Official product screenshot; terms for public reuse are not stated in the supplied source notes.',
    status: 'available',
  },
  {
    id: 'MM037', title: 'Meta Instagram Feed Ranking System Card', kind: 'interactive', stageId: 'algorithmic', chapterId: 'chapter-6', date: 'Last updated 2022-02-23',
    sourceUrl: 'https://ai.meta.com/tools/system-cards/instagram-feed-ranking/',
    embedUrl: 'https://ai.meta.com/tools/system-cards/instagram-feed-ranking/',
    caption: 'Official system card describing a particular version of Instagram Feed ranking. It is a partial, company-authored explanation, not disclosure of all parameters.',
    credit: 'Meta AI. Research indexes R44 / MM037.',
    rights: 'Embedded official page; the interactive explanation remains hosted by Meta.',
    status: 'available',
  },
  {
    id: 'MM038', title: 'Google Reader shutdown warning', kind: 'image', stageId: 'rss', chapterId: 'chapter-7', date: '2013-03-25',
    sourceUrl: 'https://www.latimes.com/business/la-xpm-2013-mar-25-la-fi-tn-google-reader-privacy-20130325-story.html',
    mediaUrl: 'https://ca-times.brightspotcdn.com/dims4/default/7ae2d9a/2147483647/strip/true/crop/1274x596%2B0%2B0/resize/1200x561%21/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F3f%2F30%2Fa0e45a294bb95ef199aec423eb3d%2Fla-xpm-photo-2013-mar-25-la-fi-tn-google-reader-privacy-20130325',
    caption: 'Figure 15. Contemporary screenshot of Google Reader’s shutdown warning. It records the interface notice, not Google’s internal reasons for closing the service.',
    credit: 'Salvador Rodriguez / Los Angeles Times. Research indexes R56 / MM038.',
    rights: '© Los Angeles Times; reuse permission is not established.',
    status: 'available',
  },
  {
    id: 'MM041', title: 'Adam Mosseri announces Following and Favorites', kind: 'video', stageId: 'algorithmic', chapterId: 'chapter-6', date: '2022-03-23',
    sourceUrl: 'https://www.instagram.com/reel/CbdD0MCJyZ0/',
    embedUrl: 'https://www.instagram.com/reel/CbdD0MCJyZ0/embed',
    caption: 'Video 6. Contemporary Instagram Reel presenting Following and Favorites as optional chronological views. It documents platform framing, not user behaviour; full video duration is unverified.',
    credit: 'Adam Mosseri / Instagram. Research indexes R59 / MM041.',
    rights: 'Original Instagram embed; playback may require Instagram access.',
    status: 'available',
  },
];

export const pendingMedia: MediaAsset[] = [
  {
    id: 'MM008 / MM009 / MM017', title: 'Playable historical audio recording', kind: 'audio', stageId: 'unassigned', chapterId: 'research-index', date: 'Not specified',
    sourceUrl: 'https://guides.loc.gov/recorded-sound-research/collections',
    caption: 'The supplied audio references are collection guides, not identified playable recordings. No audio is assigned to a research chapter until a specific item and access rights are confirmed.',
    credit: 'Library of Congress catalogue guides; indexes MM008, MM009, MM017.',
    rights: 'Pending: select a specific recording, confirm online playback and rights.',
    status: 'pending',
  },
  {
    id: 'MM003', title: 'Gutenberg and the Art of Printing — page-level scan', kind: 'record', stageId: 'early-mass', chapterId: 'research-index', date: 'Publication date/page not yet selected',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gutenberg,_and_the_art_of_printing_(IA_gutenbergartofpr00pear_0).pdf',
    caption: 'A digitized publication is located, but no specific page or illustration is selected in the essay.',
    credit: 'Wikimedia Commons file page; index MM003.',
    rights: 'Pending: identify original publication date and the page to cite.',
    status: 'pending',
  },
];

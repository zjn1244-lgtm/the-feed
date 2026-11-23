import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import { distributionPaths } from '../data/distribution-paths';
import { historicalStages } from '../data/historical-stages';
import { researchChapters } from '../data/research-chapters';

const chapterForStage = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6'];

export function StageLab() {
  const [params, setParams] = useSearchParams();
  const requestedStage = params.get('stage') ?? historicalStages[0].id;
  const stage = historicalStages.find((item) => item.id === requestedStage) ?? historicalStages[0];
  const stageIndex = historicalStages.findIndex((item) => item.id === stage.id);
  const path = distributionPaths.find((item) => item.stageId === stage.id)!;
  const chapter = researchChapters.find((item) => item.id === chapterForStage[stageIndex]);
  const passages = chapter?.paragraphs ?? [];
  const [passageIndex, setPassageIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState(0);

  useEffect(() => { setPassageIndex(0); setSelectedRole(0); }, [stage.id]);
  const selectStage = (id: string) => setParams({ stage: id }, { replace: true });

  return <section className="section stage-lab">
    <header className="section-heading">
      <div><span className="eyebrow"><ArrowLeftRight size={15}/> STAGE LAB · {String(stageIndex + 1).padStart(2, '0')}</span><h1>Follow the work between sender and reader<span className="accent">.</span></h1></div>
      <p>Choose a historical stage, then inspect the roles in its distribution model. These diagrams are conceptual reading tools, not reconstructions of a specific historical workflow.</p>
    </header>
    <nav className="lab-stage-nav" aria-label="Choose a historical stage">
      {historicalStages.map((item, index) => <button type="button" key={item.id} aria-current={item.id === stage.id ? 'step' : undefined} onClick={() => selectStage(item.id)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button>)}
    </nav>
    <div className="stage-lab-feature">
      <div className="stage-lab-reading">
        <span className="eyebrow">ESSAY EXCERPT · {stage.title}</span>
        <p className="stage-lab-quote">{passages[passageIndex] ?? 'Essay text for this stage is pending.'}</p>
        <div className="stage-lab-reading-footer"><span className="small muted">Author-supplied research text · not a manuscript facsimile</span><button type="button" className="text-button" disabled={passages.length < 2} onClick={() => setPassageIndex((passageIndex + 1) % passages.length)}>Turn to next passage <span aria-hidden="true">↗</span></button></div>
        {chapter && <Link className="small" to={'/research#chapter-' + chapter.id}>Read full chapter ↗</Link>}
      </div>
      <div className="stage-lab-network">
        <div className="eyebrow">DISTRIBUTION ROLES · SELECT A NODE</div>
        <ol className="stage-role-flow">
          {path.nodes.map((node, index) => <li key={node.role} className={index === selectedRole ? 'selected' : ''}>
            <button type="button" aria-pressed={index === selectedRole} onClick={() => setSelectedRole(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{node.role}</strong></button>
          </li>)}
        </ol>
        <p className="stage-role-description" aria-live="polite">{path.nodes[selectedRole]?.description}</p>
        <p className="small muted">{path.note}</p>
      </div>
    </div>
    <p className="simulation-notice">Conceptual model — roles are selected from the project's research framework and are not claims of universal practice.</p>
  </section>;
}

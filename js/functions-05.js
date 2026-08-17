function renderInc03Visual(inc){
  const trace=!!state.flags.traceability, second=!!state.flags.secondarySupplier, recovery=!!state.flags.recoveryProgram;
  return `<section class="scenario-visual sourcing-visual">
    <div class="visual-head"><div><span class="visual-kicker">INC-03 · SOURCING DEPENDENCY MAP</span><h3>Biodiversity-related pressure enters the game as a supply dependency</h3><p>The ecosystem issue is not turned into a marketing claim. It appears because permitting, traceability and concentration can change lead time and therefore affect operational resilience.</p></div><div class="route-status ${trace||second||recovery?'active':''}"><span>TRACEABILITY</span><strong>${trace?'DEEPER MAPPING ACTIVE':'PARTIAL'}</strong></div></div>
    <div class="sourcing-chain">
      <div class="source-node sensitive"><span>UPSTREAM REGION</span><strong>Ecosystem-sensitive sourcing context</strong><small>New permitting constraints</small></div><div class="source-link ${trace?'known':'unknown'}">${trace?'TRACEABLE':'?'} →</div>
      <div class="source-node"><span>UPSTREAM SUPPLY</span><strong>${trace?'Mapped beyond Tier 1':'Limited visibility'}</strong><small>${trace?'Risk triggers available':'Traceability gap remains'}</small></div><div class="source-link">→</div>
      <div class="source-node"><span>TIER 1</span><strong>Qualified source 1</strong><small>Lead time 16 → 28 weeks</small></div><div class="source-link">→</div>
      <div class="source-node"><span>IN-SERVICE SYSTEM</span><strong>${recovery?'Repair + recovery expanded':'5-month serviceable buffer'}</strong><small>${second?'Second qualified route adds optionality':'Single-source dependency remains'}</small></div>
    </div>
    <div class="dependency-actions"><div class="dep-pill ${second?'on':''}"><b>SECOND SOURCE</b><span>${second?'QUALIFIED':'NOT AVAILABLE'}</span></div><div class="dep-pill ${trace?'on':''}"><b>TRACEABILITY</b><span>${trace?'DEEPER':'PARTIAL'}</span></div><div class="dep-pill ${recovery?'on':''}"><b>RECOVERY</b><span>${recovery?'EXPANDED':'BASELINE'}</span></div></div>
  </section>`;
}

function renderInc04Visual(inc){
  const design=!!state.flags.designReview, analytics=!!state.flags.conditionData, repair=!!state.flags.repairability;
  return `<section class="scenario-visual feedback-visual">
    <div class="visual-head"><div><span class="visual-kicker">INC-04 · DESIGN ↔ IN-SERVICE FEEDBACK LOOP</span><h3>When repeated events become an engineering signal</h3><p>Case-by-case recovery keeps aircraft moving, but recurring demand should eventually cross a trigger and become structured evidence for engineering review.</p></div><div class="route-status ${design||analytics||repair?'active':''}"><span>FEEDBACK LOOP</span><strong>${design?'DESIGN REVIEW OPEN':analytics?'EVIDENCE STRENGTHENED':'GAP VISIBLE'}</strong></div></div>
    <div class="feedback-loop-map">
      <div class="loop-node"><span>IN-SERVICE</span><strong>Repeated removals</strong><small>Operational evidence accumulates</small></div><div class="loop-arrow">→</div>
      <div class="loop-node"><span>SUPPORT</span><strong>${repair?'Improved repairability':'Repair / replacement'}</strong><small>Immediate cases are recovered</small></div><div class="loop-arrow">→</div>
      <div class="loop-node"><span>DATA</span><strong>${analytics?'Pattern analytics active':'Events closed individually'}</strong><small>${analytics?'Trend evidence consolidated':'Pattern can remain fragmented'}</small></div><div class="loop-arrow ${design?'connected':'broken'}">${design?'→':'×'}</div>
      <div class="loop-node engineering ${design?'connected':''}"><span>ENGINEERING</span><strong>${design?'Structured review':'Feedback trigger missing'}</strong><small>Reliability · modularity · accessibility · repairability</small></div>
    </div>
    <div class="loop-return ${design?'connected':''}"><span>${design?'ENGINEERING LEARNING CAN RETURN TO THE SUPPORT SOLUTION':'WITHOUT A FORMAL TRIGGER, THE LOOP STOPS BEFORE DESIGN LEARNING'}</span></div>
  </section>`;
}

function renderInc05Visual(inc){
  const caps=[
    ["Repair",!!(state.flags.repairCapability||state.flags.recoveryProgram||state.flags.repairability)],
    ["Stock logic",!!state.flags.stockLogic],
    ["Process",!!(state.flags.processOwnership||state.flags.processVisibility||state.flags.dispositionStandard)],
    ["Sourcing",!!(state.flags.secondarySupplier||state.flags.traceability)],
    ["Design feedback",!!(state.flags.designReview||state.flags.conditionData)]
  ];
  const active=caps.filter(x=>x[1]).length;
  return `<section class="scenario-visual stress-visual">
    <div class="visual-head"><div><span class="visual-kicker">INC-05 · RESILIENCE STRESS TEST</span><h3>The final event tests the options you built before the shock</h3><p>Two AOGs, constrained supply and high repair workload arrive together. The question is no longer which single action is best, but how many independent recovery routes remain credible.</p></div><div class="route-status ${active>=3?'active':''}"><span>STRUCTURAL OPTIONALITY</span><strong>${active} / ${caps.length} CAPABILITY AREAS</strong></div></div>
    <div class="stress-layout"><div class="stress-core"><span>COMBINED SHOCK</span><strong>2 AOG + constrained supplier + high repair load</strong><small>Mission window: 5 days</small></div><div class="stress-capabilities">${caps.map(([n,on])=>`<div class="stress-cap ${on?'on':'off'}"><i></i><b>${n}</b><span>${on?'AVAILABLE':'GAP'}</span></div>`).join('')}</div></div>
    <div class="stress-message ${active>=3?'good':''}"><b>${active>=4?'MULTIPLE RECOVERY ROUTES AVAILABLE':active>=2?'SOME OPTIONALITY — GAPS REMAIN':'EMERGENCY ACTION DOMINATES'}</b><span>${active>=3?'Earlier investments give the team more than one way to absorb the shock.':'The final event is exposing reliance on a small number of buffers and workarounds.'}</span></div>
  </section>`;
}

function renderScenarioVisual(inc){
  if(inc.id==="INC-01"){
    if(state.phase==="operational") return renderInc01OperationalMap();
    if(state.phase==="investigation") return renderInc01InvestigationMap();
    return renderInc01InvestmentMap();
  }
  if(inc.id==="INC-02") return renderInc02Visual(inc);
  if(inc.id==="INC-03") return renderInc03Visual(inc);
  if(inc.id==="INC-04") return renderInc04Visual(inc);
  if(inc.id==="INC-05") return renderInc05Visual(inc);
  return "";
}

function renderIncidentHeroVisual(inc){
  if(inc.id!=='INC-01' || state.phase!=='operational') return '';
  return `<section class="incident-visual-hero" aria-label="Illustrated incident summary">
    <div class="airpower-illustration">
      <svg viewBox="0 0 560 220" role="img" aria-label="Illustrative four-engine Air Power transport aircraft with one component highlighted">
        <defs><linearGradient id="skyGrid" x1="0" x2="1"><stop offset="0%" stop-color="#0d2338"/><stop offset="100%" stop-color="#0a1726"/></linearGradient></defs>
        <rect width="560" height="220" rx="18" fill="url(#skyGrid)"/>
        <g opacity=".12" stroke="#9ddff1" stroke-width="1"><path d="M0 44h560M0 88h560M0 132h560M0 176h560"/><path d="M70 0v220M140 0v220M210 0v220M280 0v220M350 0v220M420 0v220M490 0v220"/></g>
        <g transform="translate(56 45)" fill="none" stroke="#b8d9e7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M39 91h77l73-42 22 1-30 41h97l50-28h22l-20 28h59l27-15h15l-9 22 9 22h-15l-27-15h-59l20 28h-22l-50-28h-97l30 41-22 1-73-42H39L8 120V76z"/>
          <circle cx="147" cy="93" r="13"/><circle cx="196" cy="93" r="13"/><circle cx="291" cy="93" r="13"/><circle cx="340" cy="93" r="13"/>
          <path d="M147 80v26M134 93h26M196 80v26M183 93h26M291 80v26M278 93h26M340 80v26M327 93h26" opacity=".6"/>
        </g>
        <g transform="translate(420 25)"><rect width="112" height="58" rx="12" fill="rgba(255,124,124,.08)" stroke="rgba(255,124,124,.55)"/><circle cx="25" cy="29" r="8" fill="#ff7c7c"/><text x="42" y="25" fill="#ffaaaa" font-size="10" font-family="monospace" font-weight="700">AOG</text><text x="42" y="40" fill="#d7e5ed" font-size="9" font-family="monospace">ACTUATOR REMOVED</text></g>
        <g transform="translate(420 142)"><rect width="112" height="52" rx="12" fill="rgba(244,201,107,.07)" stroke="rgba(244,201,107,.45)"/><text x="14" y="20" fill="#f4c96b" font-size="9" font-family="monospace" font-weight="700">MISSION WINDOW</text><text x="14" y="39" fill="#fff0bf" font-size="18" font-family="monospace" font-weight="700">96 HOURS</text></g>
        <path d="M391 96C424 95 438 88 446 80" stroke="#ff7c7c" stroke-width="2" stroke-dasharray="5 5" fill="none"/>
      </svg>
    </div>
    <div class="incident-visual-caption"><span>INCIDENT AT A GLANCE</span><strong>One aircraft is unavailable. A critical actuator has been removed. You have 96 hours to restore capability.</strong><p>Your first task is not to solve sustainability in general. It is to choose a credible recovery route — then learn the lifecycle consequence of that choice.</p></div>
  </section>`;
}

function missionObjective(inc){
  return ({
    'INC-01':{objective:'Restore one aircraft within 96 hours',challenge:'Recover capability without simply transferring the problem into stock, repair or future maintenance.'},
    'INC-02':{objective:'Unblock the repair flow',challenge:'Return recoverable units to service safely without defaulting to unnecessary replacement.'},
    'INC-03':{objective:'Protect supply continuity',challenge:'Manage a biodiversity-related sourcing disruption while reducing single-source and traceability exposure.'},
    'INC-04':{objective:'Break the recurring-failure cycle',challenge:'Protect current readiness while turning repeated In-Service evidence into structured design learning.'},
    'INC-05':{objective:'Absorb the combined shock',challenge:'Recover capability while preserving enough optionality for the system to keep responding.'}
  })[inc.id] || {objective:inc.constraints[0],challenge:inc.lens};
}

function nextMissionLearningTeaser(inc){
  return ({
    'INC-02':'You will see why a repairable component can still be wasted when process flow is weak.',
    'INC-03':'You will connect biodiversity-related sourcing conditions to traceability, concentration and supply continuity.',
    'INC-04':'You will connect recurring In-Service evidence to reliability, repairability and design decisions.',
    'INC-05':'You will test whether the capabilities built across 18 months created real system resilience.'
  })[inc?.id] || 'A new pressure point will test the system you have built.';
}

function renderGame(root){
  const inc=incidents[state.incidentIndex];
  const phaseMeta={
    operational:{num:'01',label:'RESPOND',verb:'Make the call',question:'What do you do now?',guide:'Choose one immediate response. Your goal is to protect readiness without ignoring the lifecycle consequence.'},
    investigation:{num:'02',label:'INVESTIGATE',verb:'Find the hidden cause',question:'Why was the system exposed?',guide:'The event is not the root cause. Find the process, planning or support condition that made the disruption harder to absorb.'},
    investment:{num:'03',label:'IMPROVE',verb:'Build the future',question:'What do you improve next?',guide:'Spend limited budget on one capability that will still matter in later missions.'}
  }[state.phase];
  const learning=(sustainabilityLearning(inc).chips||[]).slice(0,3);
  const stageVisual = renderIncidentHeroVisual(inc) || renderScenarioVisual(inc);
  const mission=missionObjective(inc);
  root.innerHTML=`
    <section class="mission-game-shell">
      <header class="mission-hud">
        <div class="hud-id"><span>MISSION</span><b>${String(state.incidentIndex+1).padStart(2,'0')} / ${String(incidents.length).padStart(2,'0')}</b></div>
        <div class="hud-title"><span>MONTH ${inc.month} OF 18</span><strong>${inc.title}</strong></div>
        <div class="hud-resources"><div><span>PHASE</span><b>${phaseMeta.num} · ${phaseMeta.label}</b></div><div><span>BUDGET</span><b>${fmtBudget(state.metrics.budget)}</b></div><button id="systemDetailsBtn" class="hud-details">SYSTEM DATA</button></div>
      </header>

      <div class="mission-phase-rail">
        ${['operational','investigation','investment'].map((ph,i)=>{const current=['operational','investigation','investment'].indexOf(state.phase);return `<div class="phase-node ${i<current?'done':''} ${i===current?'current':''}"><i>${i+1}</i><span>${['RESPOND','INVESTIGATE','IMPROVE'][i]}</span></div>${i<2?'<div class="phase-line"></div>':''}`}).join('')}
      </div>

      <section class="mission-stage">
        <div class="mission-stage-visual">
          <div class="stage-badge"><span class="live-dot"></span> LIVE MISSION</div>
          ${stageVisual}
          <div class="stage-overlay-copy"><span>MISSION OBJECTIVE</span><strong>${mission.objective}</strong><p>${mission.challenge}</p></div>
        </div>
        <aside class="mission-brief-panel">
          <div class="brief-label">${phaseMeta.verb}</div>
          <h3>${phaseMeta.question}</h3>
          <p>${phaseMeta.guide}</p>
          <div class="mission-facts">${inc.data.slice(1,4).map(d=>`<div><span>${d[0]}</span><b>${d[1]}</b></div>`).join('')}</div>
          <div class="learning-unlock-preview"><span>SUSTAINABILITY LENS</span>${learning.map(c=>`<b>${c}</b>`).join('')}</div>
          <div id="coachMount" class="mission-coach-mount">${renderCoachWidget()}</div>
        </aside>
      </section>

      <section class="mission-choice-arena">
        <div class="arena-head"><div><span>YOUR MOVE</span><h3>${phaseMeta.question}</h3></div><div class="arena-hint">Choose → confirm → see the consequence</div></div>
        ${renderSimplePhaseContent(inc)}
      </section>
    </section>`;
  document.getElementById('systemDetailsBtn').onclick=()=>openSystemDetails(inc);
  bindPhaseHandlers(inc); bindCoachControls();
}

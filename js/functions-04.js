function metricCard(label, value, hint, cls="", suffix="/100", width=value){
  return `<div class="metric-card ${cls}"><div class="metric-label">${label}</div><div class="metric-value"><strong>${value}</strong><small>${suffix}</small></div><div class="meter"><span style="width:${clamp(width)}%"></span></div><div class="metric-hint">${hint}</div></div>`;
}
function renderDashboard(){
  const m=state.metrics;
  return `<div class="dashboard-grid">
    ${metricCard("Mission Readiness",m.readiness,"Higher is better")}
    ${metricCard("Supply Resilience",m.resilience,"Higher is better")}
    ${metricCard("Lifecycle Strategy",m.lifecycle,"Higher is better")}
    ${metricCard("Process Maturity",m.process,"Higher is better")}
    ${metricCard("Material & Biodiversity Exposure",riskLabel(m.exposure),"Lower is better","exposure","",m.exposure)}
    ${metricCard("Improvement Budget",fmtBudget(m.budget),"Finite across 18 months","budget","",(m.budget/state.maxBudget)*100)}
  </div>`;
}
function phaseIndex(){ return state.phase === "operational" ? 0 : state.phase === "investigation" ? 1 : 2; }
function renderProgress(){
  return `<div class="incident-timeline" aria-label="Simulation timeline">${incidents.map((incident,i)=>{
    const cls=i < state.incidentIndex ? "complete" : i === state.incidentIndex ? "active" : "future";
    return `<div class="timeline-stop ${cls}"><span class="timeline-dot"></span><div><b>M${incident.month}</b><small>${incident.id}</small></div></div>`;
  }).join("")}</div>`;
}

function aircraftIcon(){
  return `<svg viewBox="0 0 64 28" aria-hidden="true"><path d="M3 14h18L31 2h5l-5 12h18l7-5h4l-4 5 4 5h-4l-7-5H31l5 12h-5L21 14H3l-3 3v-6l3 3Z"/></svg>`;
}

function renderFleetStrip(inc){
  const total=12;
  const readyTarget=Math.max(5,Math.min(total-1,Math.round(state.metrics.readiness/100*total)));
  const currentAog=Math.min(state.incidentIndex+1,total-1);
  let readyAssigned=0;
  const tiles=Array.from({length:total},(_,i)=>{
    let cls;
    if(i===currentAog) cls="aog";
    else if(readyAssigned<readyTarget){ cls="available"; readyAssigned++; }
    else cls="maintenance";
    return `<div class="aircraft-tile ${cls}" title="Aircraft ${String(i+1).padStart(2,'0')} · ${i===currentAog?'current incident':cls}"><span class="aircraft-id">AC ${String(i+1).padStart(2,'0')}</span>${aircraftIcon()}<span class="aircraft-state">${i===currentAog?'AOG':cls==='available'?'READY':'MAINT'}</span></div>`;
  }).join("");
  return `<section class="fleet-board" aria-label="Fictional fleet status">
    <div class="fleet-board-head">
      <div><p class="eyebrow">FLEET STATUS · FICTIONAL</p><h3>${readyAssigned} ready · 1 current AOG · ${total-readyAssigned-1} in maintenance / unavailable state</h3></div>
      <div class="fleet-legend"><span><i class="dot available"></i> Available</span><span><i class="dot maintenance"></i> Maintenance</span><span><i class="dot aog"></i> Current AOG</span></div>
    </div>
    <div class="fleet-strip">${tiles}</div>
  </section>`;
}

function renderSupportNetwork(inc){
  const repairActive=!!(state.flags.repairCapability || state.flags.crossSkill || state.flags.recoveryProgram || state.flags.repairability);
  const sourceActive=!!(state.flags.secondarySupplier || state.flags.traceability || state.flags.supplyStressTests);
  const processActive=!!(state.flags.processOwnership || state.flags.processVisibility || state.flags.dispositionStandard || state.flags.conditionData || state.flags.resilienceOperatingModel);
  return `<section class="network-board">
    <div class="network-card ${sourceActive?'active':''}"><span class="network-label">SUPPLY</span><strong>${sourceActive?'MULTI-ROUTE':'CONSTRAINED'}</strong><small>${sourceActive?'Earlier investment provides sourcing optionality.':'Current system has limited sourcing optionality.'}</small></div>
    <div class="network-link"><span></span><b>→</b></div>
    <div class="network-card ${repairActive?'active':''}"><span class="network-label">REPAIR LOOP</span><strong>${repairActive?'ENHANCED':'BASELINE'}</strong><small>${repairActive?'Repair capability has been strengthened.':'Repair exists but has limited recovery depth.'}</small></div>
    <div class="network-link"><span></span><b>→</b></div>
    <div class="network-card ${processActive?'active':''}"><span class="network-label">DECISION FLOW</span><strong>${processActive?'STRUCTURED':'FRAGMENTED'}</strong><small>${processActive?'Ownership and visibility are improving.':'Handovers remain a potential weakness.'}</small></div>
    <div class="network-link"><span></span><b>→</b></div>
    <div class="network-card incident-node"><span class="network-label">CURRENT EVENT</span><strong>${inc.id}</strong><small>${inc.title}</small></div>
  </section>`;
}

function renderMissionClock(inc){
  const req=(inc.data.find(d=>d[0].toLowerCase().includes('mission'))||[])[1] || `Month ${inc.month}`;
  return `<div class="mission-clock"><span>DECISION WINDOW</span><strong>${req}</strong><small>Read constraints before committing an option.</small></div>`;
}

function componentIcon(){
  return `<svg class="component-svg" viewBox="0 0 120 70" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="3"><rect x="24" y="20" width="55" height="30" rx="7"/><path d="M79 27h19l11 8-11 8H79M24 28H13v14h11M40 20V10h24v10M41 50v10h22V50"/><circle cx="50" cy="35" r="8"/><path d="M45 35h10"/></g></svg>`;
}

function routeLabel(optionId){
  return ({A:"CENTRAL STOCK",B:"REPAIR LOOP",C:"DONOR AIRCRAFT",D:"NEW SUPPLY"})[optionId] || "SELECT A ROUTE";
}

function renderInc01OperationalMap(){
  const selected=state.selectedOption;
  const resolved=state.operationalResolved;
  const route=(id)=>selected===id ? `selected-route ${resolved?'resolved-route':''}` : '';
  const outcome={
    A:["CENTRAL BUFFER USED","1 of 2 shared units allocated","readiness gain / resilience drawdown"],
    B:["REPAIR ROUTE ACTIVATED","Removed unit enters inspection & repair","stock protected / recovery is more complex"],
    C:["CONTROLLED TRANSFER","Serviceable unit moves from maintenance aircraft","fast recovery / burden moves to maintenance plan"],
    D:["STANDARD SUPPLY ROUTE","14-week lead time remains unchanged","96-hour mission window is not met"]
  }[selected];
  return `<section class="scenario-visual ops-visual" aria-label="Scenario 1 recovery route map">
    <div class="visual-head"><div><span class="visual-kicker">INC-01 · RECOVERY ROUTE MAP</span><h3>Where can a serviceable actuator come from?</h3><p>Follow the physical support routes before choosing. Selecting an option highlights the route; confirming it applies the system consequence.</p></div><div class="route-status ${selected?'active':''}"><span>${resolved?'ROUTE EXECUTED':selected?'ROUTE SELECTED':'AWAITING DECISION'}</span><strong>${routeLabel(selected)}</strong></div></div>
    <div class="ops-map">
      <div class="ops-origin">
        <div class="aircraft-focus"><span class="status-chip red">AOG</span>${aircraftIcon()}<strong>AC 02</strong><small>Actuator removed after fault indication</small></div>
        <div class="component-focus">${componentIcon()}<span>REMOVED UNIT</span><strong>Inspection possible</strong></div>
      </div>
      <div class="route-rail" aria-hidden="true"><span></span><b>RECOVERY OPTIONS</b><span></span></div>
      <div class="route-grid">
        <button type="button" class="route-card ${route('A')}" data-route-preview="A" ${resolved?'disabled':''}><div class="route-top"><span class="route-code">A</span><b>CENTRAL STOCK</b></div><strong>2 serviceable units</strong><small>Shared across multiple locations</small><div class="route-path">CENTRAL HUB <i>→</i> AFFECTED LOCATION <i>→</i> AC 02</div></button>
        <button type="button" class="route-card ${route('B')}" data-route-preview="B" ${resolved?'disabled':''}><div class="route-top"><span class="route-code">B</span><b>REPAIR CENTRE</b></div><strong>Inspection available</strong><small>Repair route exists but is not optimised</small><div class="route-path">REMOVED UNIT <i>→</i> INSPECT / REPAIR <i>→</i> RETURN</div></button>
        <button type="button" class="route-card ${route('C')}" data-route-preview="C" ${resolved?'disabled':''}><div class="route-top"><span class="route-code">C</span><b>DONOR AIRCRAFT</b></div><strong>Scheduled maintenance</strong><small>Approved transfer possible with configuration control</small><div class="route-path">MAINT AC <i>→</i> CONTROLLED TRANSFER <i>→</i> AC 02</div></button>
        <button type="button" class="route-card ${route('D')}" data-route-preview="D" ${resolved?'disabled':''}><div class="route-top"><span class="route-code">D</span><b>NEW SUPPLY</b></div><strong>14-week lead time</strong><small>Standard procurement route</small><div class="route-path">SUPPLIER <i>→</i> REPLENISHMENT <i>→</i> LOCAL STOCK</div></button>
      </div>
    </div>
    ${outcome?`<div class="system-effect ${resolved?'executed':''}"><span>${resolved?'SYSTEM EFFECT':'PREVIEW — NOT YET APPLIED'}</span><strong>${outcome[0]}</strong><p>${outcome[1]} · ${outcome[2]}.</p></div>`:`<div class="visual-tip"><b>How to use this map</b><span>Compare the four recovery routes with the 96-hour mission window. A route can recover the aircraft quickly and still weaken the wider support system.</span></div>`}
  </section>`;
}

function renderInc01InvestigationMap(){
  const sel=state.selectedEvidence;
  const resolved=state.investigationResolved;
  const hypothesis=sel ? incidents[0].investigation.find(x=>x.id===sel) : null;
  return `<section class="scenario-visual evidence-visual" aria-label="Scenario 1 root cause evidence board">
    <div class="visual-head"><div><span class="visual-kicker">INC-01 · ROOT-CAUSE BOARD</span><h3>Move from the visible symptom to the controllable system condition</h3><p>The actuator failure triggered the event. Your diagnosis must explain why the support system could not absorb one failure without entering a stock emergency.</p></div><div class="route-status ${resolved?'active':''}"><span>${resolved?'DIAGNOSIS REVIEWED':'EVIDENCE STATUS'}</span><strong>${resolved?(hypothesis?.correct?'SYSTEMIC CAUSE FOUND':'REVISION REQUIRED'):'4 FACTS AVAILABLE'}</strong></div></div>
    <div class="cause-chain">
      <div class="cause-card symptom"><span>VISIBLE EVENT</span><strong>Actuator fault</strong><small>Creates an AOG and a demand for one serviceable unit.</small></div>
      <div class="cause-arrow">→</div>
      <div class="cause-card evidence"><span>SUPPORT CONDITION</span><strong>Local stock = 0</strong><small>The event immediately exposes the location to another recovery route.</small></div>
      <div class="cause-arrow">→</div>
      <div class="cause-card evidence"><span>CHANGED CONTEXT</span><strong>Supplier lead time increased</strong><small>Replenishment takes longer than the planning environment originally assumed.</small></div>
      <div class="cause-arrow">→</div>
      <div class="cause-card root"><span>CONTROL GAP TO TEST</span><strong>Planning + repair controls</strong><small>Were stock parameters and repair recovery adapted when the supply context changed?</small></div>
    </div>
    <div class="evidence-strip"><div><b>Evidence 01</b><span>Central stock is limited and shared.</span></div><div><b>Evidence 02</b><span>A repair route exists, so replacement is not the only recovery mechanism.</span></div><div><b>Evidence 03</b><span>Repair is not yet optimised as a planned control.</span></div><div><b>Evidence 04</b><span>The current lead time is 14 weeks.</span></div></div>
    ${hypothesis?`<div class="hypothesis-preview ${resolved?(hypothesis.correct?'good':'bad'):''}"><span>${resolved?'DIAGNOSIS RESULT':'SELECTED HYPOTHESIS'}</span><strong>${hypothesis.title}</strong><p>${resolved?hypothesis.feedback:'Confirm only if this hypothesis explains the system exposure, not merely the initiating event.'}</p></div>`:''}
  </section>`;
}

function renderInc01InvestmentMap(){
  const sel=state.selectedInvestment;
  const resolved=state.investmentResolved;
  const previews={
    repairCapability:["REPAIR LOOP","Ad-hoc route","Planned triage + reserved capacity + turnaround target","Makes repair a deliberate resilience option instead of an emergency workaround."],
    stockLogic:["STOCK CONTROL","Static / outdated assumptions","Lead time + demand + repair + criticality logic","Changes how much buffer is held and when the system reacts to changing supply conditions."],
    processOwnership:["DECISION FLOW","Several functional handovers","Named end-to-end component owner","Creates accountability for supply, repair, engineering escalation and recurring-problem closure."]
  };
  const preview=sel?previews[sel]:null;
  return `<section class="scenario-visual capability-visual" aria-label="Scenario 1 system improvement preview">
    <div class="visual-head"><div><span class="visual-kicker">INC-01 · FUTURE SYSTEM PREVIEW</span><h3>Do not buy a score. Change one part of the operating system.</h3><p>Each investment persists into later months. Select a capability below to preview which control it changes before you spend budget.</p></div><div class="route-status ${resolved?'active':''}"><span>${resolved?'CAPABILITY FUNDED':'IMPROVEMENT BUDGET'}</span><strong>${resolved?(previews[sel]?.[0] || 'CAPABILITY ACTIVE'):`${fmtBudget(state.metrics.budget)} REMAINING`}</strong></div></div>
    <div class="before-after-grid">
      <div class="system-state current"><span>CURRENT STATE</span><div class="state-row"><b>Supply planning</b><small>Lead-time change not fully reflected</small></div><div class="state-row"><b>Repair</b><small>Available, but not a planned resilience loop</small></div><div class="state-row"><b>Ownership</b><small>Cross-functional handovers</small></div></div>
      <div class="transform-arrow">→</div>
      <div class="system-state future ${preview?'previewing':''}"><span>${resolved?'FUNDED FUTURE STATE':'SELECT A CAPABILITY'}</span>${preview?`<div class="future-focus"><b>${preview[0]}</b><strong>${preview[1]} <i>→</i> ${preview[2]}</strong><p>${preview[3]}</p></div>`:`<div class="empty-preview">Choose one of the three improvement cards below. This panel will show what changes in the system — not just which metric moves.</div>`}</div>
    </div>
  </section>`;
}

function selectedTitle(inc){
  if(state.phase==="operational") return inc.operational.find(x=>x.id===state.selectedOption)?.title || "No route selected";
  if(state.phase==="investigation") return inc.investigation.find(x=>x.id===state.selectedEvidence)?.title || "No hypothesis selected";
  return inc.investments.find(x=>x.id===state.selectedInvestment)?.title || "No capability selected";
}

function renderInc02Visual(inc){
  const bottleneck=state.phase==="investigation" ? "diagnose" : state.selectedOption;
  return `<section class="scenario-visual queue-visual">
    <div class="visual-head"><div><span class="visual-kicker">INC-02 · REPAIR FLOW</span><h3>The queue is visible. Where is work actually waiting?</h3><p>Four removed units are in the system, but available bench capacity does not automatically mean the flow is healthy. Track where decisions stop moving.</p></div><div class="route-status ${state.operationalResolved||state.investigationResolved?'active':''}"><span>${state.phase.toUpperCase()}</span><strong>${selectedTitle(inc)}</strong></div></div>
    <div class="repair-pipeline">
      <div class="pipeline-node"><span>01</span><b>REMOVED UNIT</b><strong>4 units</strong><small>Incoming demand continues</small></div><div class="pipe-arrow">→</div>
      <div class="pipeline-node bottleneck ${bottleneck==='B'||bottleneck==='diagnose'?'focus':''}"><span>02</span><b>TECHNICAL DISPOSITION</b><strong>11-day oldest wait</strong><small>Missing inputs / authority / owner</small><i>BOTTLENECK</i></div><div class="pipe-arrow">→</div>
      <div class="pipeline-node"><span>03</span><b>REPAIR BENCH</b><strong>Capacity available</strong><small>Two units likely quick repairs</small></div><div class="pipe-arrow">→</div>
      <div class="pipeline-node"><span>04</span><b>RETURN TO SERVICE</b><strong>Potential recovery</strong><small>Flow depends on disposition</small></div>
    </div>
    <div class="queue-units">${[1,2,3,4].map((n,i)=>`<div class="queue-unit ${i<2?'recoverable':''}"><b>UNIT ${String(n).padStart(2,'0')}</b><span>${i<2?'LIKELY QUICK REPAIR':'AWAITING EVIDENCE'}</span></div>`).join('')}</div>
    <div class="visual-tip"><b>Learning point</b><span>A queue can be caused by decision latency rather than physical repair capacity. Adding people or ordering replacements may bypass the visible backlog without fixing the flow.</span></div>
  </section>`;
}

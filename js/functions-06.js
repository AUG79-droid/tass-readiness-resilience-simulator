function renderSimplePhaseContent(inc){
  if(state.phase==='operational'){
    const sel=state.selectedOption; const selected=inc.operational.find(o=>o.id===sel);
    return `<div class="game-choice-grid">${inc.operational.map((o,idx)=>`<button type="button" class="game-choice-card c${idx+1} ${sel===o.id?'selected':''}" data-opt="${o.id}" ${state.operationalResolved?'disabled':''}><div class="choice-top"><i>${o.id}</i><span>${sel===o.id?'SELECTED':'OPTION'}</span></div><h4>${o.title}</h4><p>${o.desc}</p><div class="choice-tags">${o.tags.map(t=>`<b>${t}</b>`).join('')}</div><div class="choice-cta">${sel===o.id?'Ready to confirm':'Choose this route'} <span>→</span></div></button>`).join('')}</div>
      ${state.operationalResolved?`<div class="mission-reward"><div class="reward-icon">✓</div><div><span>DECISION CONSEQUENCE</span><h4>${selected.title}</h4><p>${selected.feedback}</p><div class="delta-row">${renderDeltas(selected.delta)}</div></div></div><div class="insight-unlocked"><span>INSIGHT UNLOCKED</span><strong>Why this matters for sustainability</strong>${sustainabilityOutcome(inc)}</div>`:''}
      <div class="mission-action-dock">${state.operationalResolved?`<button class="game-next-btn" id="nextPhase"><span>NEXT PHASE</span><strong>Investigate why this happened</strong><i>→</i></button>`:`<button class="game-confirm-btn" id="confirmOperational" ${!sel?'disabled':''}><span>LOCK IN DECISION</span><strong>Confirm response</strong></button>`}</div>`;
  }
  if(state.phase==='investigation'){
    const sel=state.selectedEvidence; const selected=inc.investigation.find(x=>x.id===sel);
    return `<div class="game-choice-grid investigation-grid">${inc.investigation.map((o,idx)=>`<button type="button" class="game-choice-card c${idx+1} ${sel===o.id?'selected':''}" data-evidence="${o.id}" ${state.investigationResolved?'disabled':''}><div class="choice-top"><i>${o.id}</i><span>HYPOTHESIS</span></div><h4>${o.title}</h4><p>${o.desc}</p><div class="choice-cta">${sel===o.id?'Ready to test':'Test this explanation'} <span>→</span></div></button>`).join('')}</div>
      ${state.investigationResolved?`<div class="mission-reward ${selected.correct?'correct':'learning'}"><div class="reward-icon">${selected.correct?'★':'!'}</div><div><span>${selected.correct?'ROOT CAUSE FOUND':'LEARNING CHECKPOINT'}</span><h4>${selected.correct?'System insight unlocked':'Not the strongest systemic cause'}</h4><p>${selected.feedback}</p></div></div>${investigationSustainabilityOutcome(inc,selected)}`:''}
      <div class="mission-action-dock">${state.investigationResolved?`<button class="game-next-btn" id="nextPhase"><span>NEXT PHASE</span><strong>Improve the system</strong><i>→</i></button>`:`<button class="game-confirm-btn" id="confirmInvestigation" ${!sel?'disabled':''}><span>TEST HYPOTHESIS</span><strong>Confirm diagnosis</strong></button>`}</div>`;
  }
  const sel=state.selectedInvestment; const selected=inc.investments.find(x=>x.id===sel);
  return `<div class="game-choice-grid investment-grid">${inc.investments.map((o,idx)=>{const unaffordable=o.cost>state.metrics.budget;return `<button type="button" class="game-choice-card c${idx+1} investment ${sel===o.id?'selected':''}" data-invest="${o.id}" ${state.investmentResolved||unaffordable?'disabled':''}><div class="choice-top"><i>€${o.cost}k</i><span>${unaffordable?'LOCKED':'CAPABILITY'}</span></div><h4>${o.title}</h4><p>${o.desc}</p><div class="choice-tags">${o.tags.map(t=>`<b>${t}</b>`).join('')}</div><div class="choice-cta">${unaffordable?'Not enough budget':sel===o.id?'Ready to fund':'Build this capability'} <span>→</span></div></button>`}).join('')}</div>
    ${state.investmentResolved?`<div class="mission-reward capability"><div class="reward-icon">◆</div><div><span>CAPABILITY UNLOCKED</span><h4>${selected.title}</h4><p>${selected.feedback}</p><div class="delta-row">${renderDeltas(selected.delta)}<span class="delta down">Budget −€${selected.cost}k</span></div></div></div>${investmentSustainabilityOutcome(inc,selected)}`:''}
    <div class="mission-action-dock">${state.investmentResolved?`<button class="game-next-btn" id="nextIncident"><span>${state.incidentIndex===incidents.length-1?'FINAL':'ADVANCE'}</span><strong>${state.incidentIndex===incidents.length-1?'Complete simulation':'Continue to Month '+incidents[state.incidentIndex+1].month}</strong><i>→</i></button>`:`<button class="game-confirm-btn" id="confirmInvestment" ${!sel?'disabled':''}><span>COMMIT BUDGET</span><strong>Fund this capability</strong></button>`}</div>`;
}

function openSystemDetails(inc){
  const root=document.getElementById('modalRoot');
  root.innerHTML=`<div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Optional system details"><div class="modal system-details-modal">
    <div class="modal-head"><div><p class="eyebrow">OPTIONAL DETAIL</p><h2>System status</h2></div><button class="close-btn" id="closeSystemDetails" aria-label="Close">×</button></div>
    <div class="modal-body">
      <p class="optional-details-intro">You do <strong>not</strong> need to memorise this dashboard. Open it only when you want more context for your decision.</p>
      ${renderDashboard()}
      ${renderFleetStrip(inc)}
      ${renderSupportNetwork(inc)}
      <div class="optional-details-grid"><article><span>CONSTRAINTS</span><ul>${inc.constraints.map(c=>`<li>${c}</li>`).join('')}</ul></article><article><span>DECISION LENS</span><p>${inc.lens}</p></article>${inc.broader?`<article><span>BROADER CONTEXT · NOT SCORED</span><p>${inc.broader}</p></article>`:''}</div>
    </div>
    <div class="modal-foot"><span class="microcopy">Close this panel to return to your decision.</span><button class="primary-btn" id="closeSystemDetails2">Back to my decision</button></div>
  </div></div>`;
  const close=()=>root.innerHTML='';
  document.getElementById('closeSystemDetails').onclick=close;
  document.getElementById('closeSystemDetails2').onclick=close;
}

function renderDeltas(delta){
  const labels={readiness:"Readiness",resilience:"Resilience",lifecycle:"Lifecycle",process:"Process",exposure:"Exposure"};
  return Object.entries(delta).filter(([k,v])=>labels[k] && v!==0).map(([k,v])=>{
    const beneficial = k === "exposure" ? v < 0 : v > 0;
    return `<span class="delta ${beneficial?"up":"down"}">${labels[k]} ${v>0?"+":""}${v}</span>`;
  }).join("");
}
function renderStepChecklist(){
  const guides={
    operational:[
      ["1","Read the constraint","Identify the real mission window, stock position and available support routes."],
      ["2","Compare trade-offs","Look at readiness, resilience and lifecycle consequences — not only speed."],
      ["3","Commit one response","Select an option, then confirm it. The decision becomes part of your 18-month history."]
    ],
    investigation:[
      ["1","Separate event from cause","The failure or disruption is the trigger; ask why the support system could not absorb it."],
      ["2","Test the hypotheses","Use the facts shown in the scenario. Avoid explanations that merely restate the symptom."],
      ["3","Confirm a controllable cause","Choose the system condition that could realistically be changed by process, supply or engineering action."]
    ],
    investment:[
      ["1","Check remaining budget","You can fund only one improvement in this incident. Unspent budget remains available later."],
      ["2","Preview the future state","Compare what capability each investment adds and which later risks it could reduce."],
      ["3","Build optionality","Fund one persistent capability. Later incidents will test whether it created another credible recovery route."]
    ]
  }[state.phase];
  return `<section class="step-checklist" aria-label="What to do in this step"><div class="step-checklist-head"><span>WHAT TO DO NOW</span><strong>${state.phase==='operational'?'Stabilise the operation':state.phase==='investigation'?'Diagnose the system':'Improve the future state'}</strong></div><div class="step-checklist-grid">${guides.map(g=>`<div class="step-guide"><b>${g[0]}</b><span><strong>${g[1]}</strong><small>${g[2]}</small></span></div>`).join('')}</div></section>`;
}

function impactPlaybackMeta(inc){
  return ({
    "INC-01":["AOG + removed actuator","Recovery route executed","Fleet-support balance changes"],
    "INC-02":["Repair queue stalls","Disposition response executed","Flow and queue pressure change"],
    "INC-03":["Lead-time shock reaches supply chain","Sourcing / recovery response executed","Dependency profile changes"],
    "INC-04":["Recurring removals accumulate","Support response executed","Learning loop changes"],
    "INC-05":["Combined readiness shock","Recovery strategy executed","System resilience is exposed"]
  })[inc.id] || ["Incident detected","Decision executed","System effect"];
}

function renderImpactPlayback(inc){
  if(!state.operationalResolved) return "";
  const option=inc.operational.find(o=>o.id===state.selectedOption);
  const [eventLabel,actionLabel,outcomeLabel]=impactPlaybackMeta(inc);
  const memory=conditionalDelta(inc);
  return `<section class="impact-playback ${inc.id.toLowerCase()}" aria-label="Operational consequence playback">
    <div class="playback-head"><div><span>DECISION PLAYBACK</span><strong>See what your confirmed action changed</strong></div><small>Illustrative system logic · not operational data</small></div>
    <div class="playback-track">
      <div class="playback-node event"><i>01</i><span>${eventLabel}</span></div>
      <div class="playback-line"><em></em></div>
      <div class="playback-node action"><i>02</i><span>${actionLabel}</span><strong>${option.title}</strong></div>
      <div class="playback-line"><em></em></div>
      <div class="playback-node outcome"><i>03</i><span>${outcomeLabel}</span><div class="playback-deltas">${renderDeltas(option.delta)}</div></div>
    </div>
    ${memory.notes.length?`<div class="memory-effect"><b>EARLIER DECISIONS ARE ACTIVE</b><span>${memory.notes.join(' ')}</span></div>`:""}
  </section>`;
}

function renderPhaseContent(inc){
  if(state.phase === "operational"){
    const sel=state.selectedOption;
    return `<h3>Choose the immediate operational response</h3>
      <div class="option-grid">${inc.operational.map(o=>`<button type="button" class="option-card ${sel===o.id?"selected":""}" data-opt="${o.id}" ${state.operationalResolved?"disabled":""}><span class="option-code">OPTION ${o.id}</span><h4>${o.title}</h4><p>${o.desc}</p><div class="option-tags">${o.tags.map(t=>`<span class="mini-tag">${t}</span>`).join("")}</div></button>`).join("")}</div>
      ${state.operationalResolved ? `${renderImpactPlayback(inc)}${renderResolution(inc.operational.find(o=>o.id===sel),"Operational consequence")}` : ""}
      <div class="action-row"><span class="microcopy">Once confirmed, this decision cannot be changed without resetting the simulation. That is intentional: later events depend on your history.</span>${state.operationalResolved?`<button class="primary-btn" id="nextPhase">Continue to root-cause investigation</button>`:`<button class="primary-btn" id="confirmOperational" ${!sel?"disabled":""}>Confirm operational decision</button>`}</div>`;
  }
  if(state.phase === "investigation"){
    const sel=state.selectedEvidence;
    const selected=inc.investigation.find(x=>x.id===sel);
    return `<h3>Which explanation best identifies the systemic root cause?</h3>
      <div class="evidence-grid">${inc.investigation.map(o=>`<button type="button" class="evidence-card ${sel===o.id?"selected":""}" data-evidence="${o.id}" ${state.investigationResolved?"disabled":""}><span class="option-code">HYPOTHESIS ${o.id}</span><h4>${o.title}</h4><p>${o.desc}</p></button>`).join("")}</div>
      ${state.investigationResolved?`<div class="consequence"><h4>${selected.correct?"Root cause identified":"Diagnosis reviewed"}</h4><p>${selected.feedback}</p><div class="delta-row"><span class="delta ${selected.correct?"up":"down"}">Process ${selected.correct?"+4":"-2"}</span></div></div>`:""}
      <div class="action-row"><span class="microcopy">A good root cause describes a controllable system condition, not merely the event that triggered the incident.</span>${state.investigationResolved?`<button class="primary-btn" id="nextPhase">Continue to system improvement</button>`:`<button class="primary-btn" id="confirmInvestigation" ${!sel?"disabled":""}>Confirm diagnosis</button>`}</div>`;
  }
  const sel=state.selectedInvestment;
  const selected=inc.investments.find(x=>x.id===sel);
  return `<h3>Choose one systemic improvement to fund</h3>
    <div class="invest-grid">${inc.investments.map(o=>{
      const unaffordable=o.cost>state.metrics.budget;
      return `<button type="button" class="invest-card ${sel===o.id?"selected":""}" data-invest="${o.id}" ${state.investmentResolved||unaffordable?"disabled":""} style="${unaffordable?"opacity:.38;cursor:not-allowed":""}"><span class="option-code">CAPABILITY</span><span class="cost-tag">€${o.cost}k</span><h4>${o.title}</h4><p>${o.desc}</p><div class="option-tags">${o.tags.map(t=>`<span class="mini-tag">${t}</span>`).join("")}</div>${unaffordable?`<div class="mini-tag" style="margin-top:10px;display:inline-block;color:#ffaaaa">Insufficient budget</div>`:""}</button>`}).join("")}</div>
    ${state.investmentResolved?`<div class="consequence"><h4>Capability added to your operating system</h4><p>${selected.feedback}</p><div class="delta-row">${renderDeltas(selected.delta)}<span class="delta down">Budget −€${selected.cost}k</span></div></div>`:""}
    <div class="action-row"><span class="microcopy">Investments persist. The final incident will check how much operational optionality your earlier choices created.</span>${state.investmentResolved?`<button class="primary-btn" id="nextIncident">${state.incidentIndex===incidents.length-1?"Complete simulation":"Advance to Month "+incidents[state.incidentIndex+1].month}</button>`:`<button class="primary-btn" id="confirmInvestment" ${!sel?"disabled":""}>Fund selected improvement</button>`}</div>`;
}
function renderResolution(option, heading){
  return `<div class="consequence"><h4>${heading}</h4><p>${option.feedback}</p><div class="delta-row">${renderDeltas(option.delta)}</div></div>`;
}

function bindPhaseHandlers(inc){
  if(state.phase === "operational"){
    const chooseOperational=(id)=>{ state.selectedOption=id; saveState(); render(); };
    document.querySelectorAll("[data-opt]").forEach(btn=>btn.onclick=()=>chooseOperational(btn.dataset.opt));
    document.querySelectorAll("[data-route-preview]").forEach(btn=>btn.onclick=()=>chooseOperational(btn.dataset.routePreview));
    const confirm=document.getElementById("confirmOperational");
    if(confirm) confirm.onclick=()=>{
      const o=inc.operational.find(x=>x.id===state.selectedOption); applyDelta(o.delta);
      const conditional=conditionalDelta(inc); applyDelta(conditional.bonus);
      state.operationalResolved=true;
      addHistory("operational",`${inc.id}: ${o.title}`);
      if(conditional.notes.length){ conditional.notes.forEach(n=>addHistory("memory",`Earlier decision effect: ${n}`)); showToast(conditional.notes[0]); }
      saveState(); render();
    };
  } else if(state.phase === "investigation"){
    document.querySelectorAll("[data-evidence]").forEach(btn=>btn.onclick=()=>{ state.selectedEvidence=btn.dataset.evidence; saveState(); render(); });
    const confirm=document.getElementById("confirmInvestigation");
    if(confirm) confirm.onclick=()=>{
      const e=inc.investigation.find(x=>x.id===state.selectedEvidence); state.metrics.process=clamp(state.metrics.process+(e.correct?4:-2)); state.investigationResolved=true;
      addHistory("investigation",`${inc.id}: ${e.correct?"Systemic root cause identified":"Diagnosis revised after evidence review"}`);
      saveState(); render();
    };
  } else {
    document.querySelectorAll("[data-invest]").forEach(btn=>btn.onclick=()=>{ state.selectedInvestment=btn.dataset.invest; saveState(); render(); });
    const confirm=document.getElementById("confirmInvestment");
    if(confirm) confirm.onclick=()=>{
      const inv=inc.investments.find(x=>x.id===state.selectedInvestment); if(inv.cost>state.metrics.budget) return;
      state.metrics.budget-=inv.cost; applyDelta(inv.delta); state.flags[inv.id]=true; state.investmentResolved=true;
      addHistory("investment",`${inc.id}: funded ${inv.title} (€${inv.cost}k)`); saveState(); render();
    };
  }
  const next=document.getElementById("nextPhase");
  if(next) next.onclick=()=>{
    if(state.phase==="operational") state.phase="investigation"; else state.phase="investment";
    saveState(); render(); window.scrollTo({top:0,behavior:"smooth"});
  };
  const nextIncident=document.getElementById("nextIncident");
  if(nextIncident) nextIncident.onclick=()=>openMissionDebrief(inc);
}

function missionBadge(inc){
  return ({
    "INC-01":["LIFECYCLE SCOUT","Repairability · stock · useful life","◈"],
    "INC-02":["FLOW BREAKER","Process flow · queues · ownership","↯"],
    "INC-03":["SOURCE MAPPER","Traceability · biodiversity · resilience","◎"],
    "INC-04":["FEEDBACK BUILDER","In-Service learning · design loop","∞"],
    "INC-05":["RESILIENCE STRATEGIST","Systems thinking · combined shocks","◆"]
  })[inc.id] || ["MISSION COMPLETE","Sustainability learning unlocked","◆"];
}

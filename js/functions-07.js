function advanceFromMission(inc){
  if(!state.journey.some(j=>j.id===inc.id)){
    const op=inc.operational.find(x=>x.id===state.selectedOption);
    const ev=inc.investigation.find(x=>x.id===state.selectedEvidence);
    const inv=inc.investments.find(x=>x.id===state.selectedInvestment);
    state.journey.push({id:inc.id,month:inc.month,title:inc.title,operational:op?.title||"—",diagnosis:ev?.title||"—",diagnosisCorrect:!!ev?.correct,investment:inv?.title||"—",investmentCost:inv?.cost||0});
  }
  if(!state.completedIncidents.includes(inc.id)) state.completedIncidents.push(inc.id);
  state.incidentIndex++;
  state.phase="operational"; state.selectedOption=null; state.selectedEvidence=null; state.selectedInvestment=null;
  state.operationalResolved=false; state.investigationResolved=false; state.investmentResolved=false;
  saveState(); render(); window.scrollTo({top:0,behavior:"smooth"});
}

function openMissionDebrief(inc){
  const root=document.getElementById("modalRoot");
  const badge=missionBadge(inc);
  const inv=inc.investments.find(x=>x.id===state.selectedInvestment);
  const learning=sustainabilityLearning(inc);
  const isFinal=state.incidentIndex===incidents.length-1;
  const next=isFinal?null:incidents[state.incidentIndex+1];
  root.innerHTML=`<div class="modal-backdrop mission-complete-backdrop" role="dialog" aria-modal="true" aria-label="Mission complete"><div class="mission-complete-modal">
    <div class="mission-complete-burst" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="mission-complete-icon">${badge[2]}</div>
    <span class="mission-complete-kicker">MISSION ${String(state.incidentIndex+1).padStart(2,'0')} COMPLETE</span>
    <h2>${badge[0]}</h2>
    <p class="mission-complete-sub">${badge[1]}</p>
    <div class="mission-complete-grid">
      <article><span>INSIGHT UNLOCKED</span><strong>${learning.title || 'Sustainability under operational constraints'}</strong><p>${learning.copy || 'Sustainability in aerospace is shaped by lifecycle, process, sourcing and operational decisions — not by a single indicator.'}</p></article>
      <article><span>CAPABILITY BUILT</span><strong>${inv?.title || 'System improvement'}</strong><p>${inv?.feedback || 'Your improvement remains active and can influence later missions.'}</p></article>
    </div>
    ${next?`<div class="next-mission-teaser"><span>NEXT MISSION · MONTH ${next.month}</span><strong>${next.title}</strong><p>${nextMissionLearningTeaser(next)}</p></div>`:`<div class="next-mission-teaser final"><span>ALL MISSIONS COMPLETE</span><strong>Your Sustainability &amp; Readiness Review is ready</strong><p>See the pattern created by your five connected decisions.</p></div>`}
    <button class="game-next-btn mission-complete-next" id="missionDebriefNext"><span>${isFinal?'FINAL REVIEW':'CONTINUE'}</span><strong>${isFinal?'See my strategy':'Enter Mission '+String(state.incidentIndex+2).padStart(2,'0')}</strong><i>→</i></button>
  </div></div>`;
  document.getElementById('missionDebriefNext').onclick=()=>{root.innerHTML='';advanceFromMission(inc);};
}

function strategyProfile(){
  const m=state.metrics;
  const structural=Object.keys(state.flags).length;
  if(m.resilience>=75 && m.lifecycle>=72 && m.process>=70 && m.exposure<=48) return ["Integrated resilience builder","You maintained credible operational performance while building multiple structural recovery routes across repair, process, sourcing and lifecycle decisions."];
  if(m.readiness>=85 && (m.resilience<62 || m.lifecycle<60)) return ["Readiness-first responder","You protected short-term availability strongly, but several decisions consumed buffers or deferred structural changes. The system remains more dependent on emergency action than it could be."];
  if(m.lifecycle>=75 && m.readiness<70) return ["Lifecycle-focused improver","You invested heavily in recovery and lifecycle capability, but short-term operational performance absorbed more disruption than a balanced support strategy would normally accept."];
  if(m.process>=78) return ["Process-led stabiliser","You created strong ownership and decision flow. The next maturity step is to ensure process capability is matched by enough sourcing, repair and lifecycle optionality."];
  if(structural<=3) return ["Reactive support model","You solved several incidents at the event level but built relatively few persistent capabilities. The final system remains vulnerable when disruptions overlap."];
  return ["Balanced but incomplete system","You created useful capability across several areas, with remaining gaps that still require trade-offs under pressure. The strategy is credible but not yet robust across every dimension."];
}
function renderFinal(root){
  const [profile,copy]=strategyProfile(); const m=state.metrics;
  const strengths=[]; const watch=[];
  if(m.resilience>=70) strengths.push("Supply resilience remained credible under combined pressure."); else watch.push("Supply resilience still relies on a limited number of buffers or recovery routes.");
  if(m.lifecycle>=70) strengths.push("Repair, recovery and lifecycle thinking became a meaningful part of the support strategy."); else watch.push("Lifecycle decisions remained too dependent on replacement or short-term workarounds.");
  if(m.process>=70) strengths.push("Process ownership and root-cause learning improved across the simulation."); else watch.push("Process maturity leaves recurring risk in handovers, visibility or systemic closure.");
  if(m.exposure<=50) strengths.push("Material and biodiversity-related sourcing exposure was reduced through more informed optionality."); else watch.push("Material and biodiversity-related sourcing exposure remains elevated and deserves further traceability or sourcing action.");
  root.innerHTML=`
    <section class="section-heading"><div><p class="eyebrow">SIMULATION COMPLETE · MONTH 18</p><h2>Sustainability &amp; Readiness Review</h2><p>Review how your decisions shaped lifecycle performance, operational resilience, process maturity and material-related exposure across five connected incidents.</p></div></section>
    <div class="final-grid">
      <section class="final-card">
        <span class="profile-badge">STRATEGY PROFILE</span>
        <h3 class="final-title">${profile}</h3>
        <p class="final-copy">${copy}</p>
        <div class="final-insights">
          ${strengths.map(s=>`<div class="insight"><strong>Strength:</strong> ${s}</div>`).join("")}
          ${watch.map(s=>`<div class="insight"><strong>Watch point:</strong> ${s}</div>`).join("")}
        </div>
        <div class="badge-wall"><span>MISSION BADGES</span><div>${state.journey.map(j=>{const inc=incidents.find(x=>x.id===j.id);const b=missionBadge(inc);return `<article><i>${b[2]}</i><b>${b[0]}</b><small>${b[1]}</small></article>`}).join('')}</div></div>
        <div class="action-row"><span class="microcopy">Replay with a different strategy to see how early investments change later constraints.</span><div class="final-actions"><button class="secondary-btn" id="printReviewBtn">Print / save review</button><button class="primary-btn" id="replayBtn">Replay simulation</button></div></div>
      </section>
      <section class="final-card">
        <h3>Final operating position</h3>
        ${reviewRow("Mission Readiness",m.readiness,false)}
        ${reviewRow("Supply Resilience",m.resilience,false)}
        ${reviewRow("Lifecycle Strategy",m.lifecycle,false)}
        ${reviewRow("Process Maturity",m.process,false)}
        ${reviewRow("Material & Biodiversity Exposure",m.exposure,true)}
        <div class="side-section" style="margin-top:18px"><h4>Remaining improvement budget</h4><p style="font:700 26px var(--mono);color:#eaf2f8">${fmtBudget(m.budget)}</p></div>
        <div class="side-section"><h4>Capabilities funded</h4><p>${Object.keys(state.flags).length} persistent improvement${Object.keys(state.flags).length===1?"":"s"} across the 18-month simulation.</p></div>
      </section>
    </div>
    <section class="final-learning-recap">
      <div class="final-learning-head"><div><p class="eyebrow">SUSTAINABILITY TOOLKIT UNLOCKED</p><h3>Five ideas to take back to real aerospace work</h3></div><span>5 / 5 concepts</span></div>
      <div class="final-learning-grid">
        <article><i>01</i><strong>Lifecycle thinking</strong><p>A recovery decision should consider useful life, repairability, material demand and the resilience left for the next event.</p></article>
        <article><i>02</i><strong>Operational circularity</strong><p>Repair only creates value when information, ownership, disposition and capacity allow a safe return to service.</p></article>
        <article><i>03</i><strong>Responsible sourcing</strong><p>Traceability, concentration and biodiversity-related upstream conditions can become real supply-continuity constraints.</p></article>
        <article><i>04</i><strong>Design ↔ In-Service learning</strong><p>Recurring field evidence should influence reliability, maintainability and repairability instead of being closed case by case forever.</p></article>
        <article><i>05</i><strong>System resilience</strong><p>Sustainability under pressure means retaining several credible options and improving the system before the next disruption.</p></article>
      </div>
    </section>
    <section class="journey-review">
      <div class="journey-head"><div><p class="eyebrow">YOUR 18-MONTH DECISION JOURNEY</p><h3>What you did, what you diagnosed, what you changed</h3></div><span>${state.journey.length} / ${incidents.length} incidents recorded</span></div>
      <div class="journey-grid">${state.journey.map(j=>`<article class="journey-card"><div class="journey-card-head"><b>M${j.month}</b><span>${j.id}</span></div><h4>${j.title}</h4><div class="journey-line"><span>OPERATE</span><p>${j.operational}</p></div><div class="journey-line ${j.diagnosisCorrect?'good':'warn'}"><span>INVESTIGATE</span><p>${j.diagnosis}</p></div><div class="journey-line"><span>IMPROVE</span><p>${j.investment} <small>€${j.investmentCost}k</small></p></div></article>`).join('')}</div>
      <div class="review-disclaimer"><strong>Review note</strong><span>This simulator uses fictional scenarios and simplified learning logic. It is designed to support discussion about trade-offs, process maturity, lifecycle thinking, sourcing dependency and biodiversity-related supply risk. Water, waste, energy, CO2 and VOC considerations may be mentioned where relevant, but they are secondary context rather than standalone objectives. This is not an operational decision-support tool.</span></div>
    </section>`;
  document.getElementById("replayBtn").onclick=()=>resetSimulation(true);
  document.getElementById("printReviewBtn").onclick=()=>window.print();
}
function reviewRow(label,value,exposure){ return `<div class="review-row"><div class="review-row-head"><span>${label}</span><span>${exposure?riskLabel(value):value+" / 100"}</span></div><div class="review-meter ${exposure?"exposure":""}"><span style="width:${value}%"></span></div></div>`; }

function openTutorial(step=0, startAfter=false){
  tutorialStep=step;
  let practiceChoice=null;
  let practiceReviewed=false;
  const root=document.getElementById("modalRoot");
  const draw=()=>{
    const t=tutorials[tutorialStep];
    const practiceMarkup=t.practice?`
      <div class="practice-shell">
        <div class="practice-alert"><span>TRAINING EVENT · NOT SCORED</span><strong>One aircraft is unavailable. A local serviceable spare can recover it inside the 6-hour mission window.</strong><p>Repair would take 36 hours. Central stock is available, but using it would consume a shared buffer.</p></div>
        <div class="practice-question"><strong>What is your immediate operational move?</strong><span>Select one option. The purpose is to learn how the simulator explains trade-offs — not to find a magic “green” answer.</span></div>
        <div class="practice-options">
          <button class="practice-option ${practiceChoice==='A'?'selected':''}" data-practice="A"><b>A</b><span><strong>Use the local serviceable spare</strong><small>Recover the aircraft quickly, but consume the local buffer.</small></span></button>
          <button class="practice-option ${practiceChoice==='B'?'selected':''}" data-practice="B"><b>B</b><span><strong>Wait for repair completion</strong><small>Preserve stock, but miss the 6-hour mission window.</small></span></button>
          <button class="practice-option ${practiceChoice==='C'?'selected':''}" data-practice="C"><b>C</b><span><strong>Request central stock immediately</strong><small>Protect local stock, but draw down a shared fleet buffer.</small></span></button>
        </div>
        ${practiceReviewed?practiceFeedback(practiceChoice):''}
      </div>`:(t.extra||"");
    root.innerHTML=`<div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="How to play"><div class="modal">
      <div class="modal-head"><div><p class="eyebrow">HOW TO PLAY · GUIDED BRIEFING</p><h2>${t.practice?"Practice before Month 1":"Read this before your first decision"}</h2></div><button class="close-btn" id="closeTutorial" aria-label="Close tutorial">×</button></div>
      <div class="modal-body"><div class="tutorial-progress">${tutorials.map((_,i)=>`<span class="${i<tutorialStep?"done":i===tutorialStep?"active":""}"></span>`).join("")}</div>
        <div class="tutorial-slide ${t.practice?'practice-slide':''}"><div class="step">STEP ${tutorialStep+1} OF ${tutorials.length}</div><h3>${t.title}</h3><p>${t.body}</p>${practiceMarkup}</div>
      </div>
      <div class="modal-foot"><button class="secondary-btn" id="prevTutorial" ${tutorialStep===0?"disabled":""}>Previous</button>${t.practice && !practiceReviewed?`<button class="primary-btn" id="reviewPractice" ${!practiceChoice?'disabled':''}>Review consequence</button>`:`<button class="primary-btn" id="nextTutorial">${tutorialStep===tutorials.length-1?(startAfter?"Enter control room":"Close briefing"):"Next"}</button>`}</div>
    </div></div>`;
    document.getElementById("closeTutorial").onclick=()=>{ root.innerHTML=""; };
    document.getElementById("prevTutorial").onclick=()=>{ if(tutorialStep>0){tutorialStep--; practiceReviewed=false; practiceChoice=null; draw();} };
    document.querySelectorAll('[data-practice]').forEach(btn=>btn.onclick=()=>{practiceChoice=btn.dataset.practice;practiceReviewed=false;draw();});
    const review=document.getElementById('reviewPractice');
    if(review) review.onclick=()=>{practiceReviewed=true;draw();};
    const next=document.getElementById("nextTutorial");
    if(next) next.onclick=()=>{
      if(tutorialStep<tutorials.length-1){ tutorialStep++; practiceReviewed=false; practiceChoice=null; draw(); }
      else { root.innerHTML=""; state.tutorialSeen=true; if(startAfter){state.started=true;} saveState(); render(); window.scrollTo({top:0,behavior:"smooth"}); }
    };
  }; draw();
}

function practiceFeedback(choice){
  const feedback={
    A:{title:"Fast recovery — but you consumed resilience",copy:"Using the local spare is operationally credible inside the six-hour window. Readiness improves immediately, while the local buffer becomes thinner. In the real simulation, the next question would be: why was only one spare available, and what systemic action should prevent repeated exposure?",deltas:[["Readiness","+"],["Local buffer","−"]]},
    B:{title:"Lifecycle preservation — but the mission window is missed",copy:"Waiting for repair preserves stock and uses an existing recovery route, but it does not meet the immediate operational constraint. The simulator will not reward lifecycle logic if it ignores mission readiness. Sustainability and operational credibility must be considered together.",deltas:[["Stock resilience","+"],["Readiness","−"]]},
    C:{title:"You moved the pressure to the central buffer",copy:"Requesting central stock can recover the aircraft quickly, but it transfers scarcity from one location to the wider support network. The simulator treats this as a trade-off, not a free solution. Later incidents may expose the buffer you consumed today.",deltas:[["Readiness","+"],["Shared buffer","−"]]}
  }[choice];
  return `<div class="practice-feedback"><span>CONSEQUENCE REVIEW</span><h4>${feedback.title}</h4><p>${feedback.copy}</p><div class="practice-deltas">${feedback.deltas.map(d=>`<b>${d[0]} ${d[1]}</b>`).join('')}</div><div class="practice-next"><strong>What you have just learned</strong><p>1. Read the operational constraint. 2. Choose an action. 3. Accept the trade-off. 4. Investigate why the system was exposed. 5. Invest to change the future state.</p></div></div>`;
}
function resetSimulation(startImmediately=false){
  const seen=state.tutorialSeen; state=initialState(); state.tutorialSeen=seen; state.started=startImmediately; saveState(); render(); window.scrollTo({top:0,behavior:"smooth"});
}
function showToast(text){
  const root=document.getElementById("toastRoot"); root.innerHTML=`<div class="toast"><strong>Earlier decision effect</strong><br>${text}</div>`; setTimeout(()=>root.innerHTML="",4200);
}

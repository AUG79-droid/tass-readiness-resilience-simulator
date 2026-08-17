function openQuickHelp(){
  const root=document.getElementById("modalRoot");
  const phase = !state.started ? "before-start" : state.completedIncidents.length >= incidents.length ? "review" : state.phase;
  const contextual = {
    "before-start": {label:"BEFORE YOU START", title:"Choose how much guidance you need", body:"Use Start simulation now if you want to enter the control room immediately. Use Start guided briefing if you want the full tutorial and practice round. Explore the decision loop is only a short concept overview."},
    operational: {label:"CURRENT PHASE · OPERATE", title:"Stabilise the immediate situation", body:"Read the mission window and available support routes. Choose a credible operational response. You are not trying to maximise every indicator at once; you are accepting a trade-off under real constraints."},
    investigation: {label:"CURRENT PHASE · INVESTIGATE", title:"Look behind the symptom", body:"The aircraft may already be recovered, but the system can still be exposed. Use the evidence provided to identify the process, support or sourcing condition that made the incident possible."},
    investment: {label:"CURRENT PHASE · IMPROVE", title:"Change the future state", body:"Spend limited budget only after you understand the exposure. Improvements remain active in later incidents, so this is where short-term recovery becomes long-term resilience."},
    review: {label:"SIMULATION COMPLETE", title:"Read the pattern, not a single score", body:"Use the Performance Review and Decision Journey to see the operating pattern created by your choices. Replay only if you want to test a different strategy."}
  }[phase];
  root.innerHTML=`<div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Quick help"><div class="modal quick-help-modal">
    <div class="modal-head"><div><p class="eyebrow">QUICK HELP · DOES NOT RESTART THE BRIEFING</p><h2>How to play</h2></div><button class="close-btn" id="closeQuickHelp" aria-label="Close help">×</button></div>
    <div class="modal-body">
      <div class="quick-help-context"><span>${contextual.label}</span><h3>${contextual.title}</h3><p>${contextual.body}</p></div>
      <div class="quick-help-grid">
        <article><b>1</b><h3>OPERATE</h3><p>Protect mission readiness with an immediate response that is credible under the time, stock and support constraints shown.</p></article>
        <article><b>2</b><h3>INVESTIGATE</h3><p>Do not confuse recovery with resolution. Identify the systemic condition behind the event: process, repair loop, sourcing, data, stock logic or design feedback.</p></article>
        <article><b>3</b><h3>IMPROVE</h3><p>Invest finite budget in capabilities that stay active. Your later incidents remember what you funded and what you left unresolved.</p></article>
        <article><b>4</b><h3>READ THE DASHBOARD</h3><p>Higher is better for Readiness, Supply Resilience, Lifecycle Strategy and Process Maturity. Lower is better for Material &amp; Biodiversity Exposure.</p></article>
      </div>
      <div class="quick-help-rules"><strong>Three rules to remember</strong><p>There is no single “sustainable” answer. Immediate operational needs matter. Water, waste, energy, CO2 and VOCs may appear as secondary context, but they are not standalone objectives or score axes.</p></div>
    </div>
    <div class="modal-foot"><span class="microcopy">Closing this panel returns you to exactly where you were.</span><button class="primary-btn" id="closeQuickHelp2">Return to simulation</button></div>
  </div></div>`;
  const close=()=>{root.innerHTML="";};
  document.getElementById("closeQuickHelp").onclick=close;
  document.getElementById("closeQuickHelp2").onclick=close;
}

document.getElementById("helpBtn").onclick=()=>openQuickHelp();
document.getElementById("resetBtn").onclick=()=>{
  if(confirm("Reset the full 18-month simulation and erase saved progress on this device?")) resetSimulation(false);
};
render();

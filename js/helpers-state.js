function loadState(){
  if(!persistenceAvailable) return initialState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return initialState();
    return {...initialState(), ...JSON.parse(raw)};
  } catch { return initialState(); }
}
function saveState(){ if(!persistenceAvailable) return; try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Continue without persistence when browser policy blocks local storage. */ } }
function clamp(n,min=0,max=100){ return Math.max(min, Math.min(max, n)); }
function fmtBudget(v){ return `€${(v/1000).toFixed(v >= 1000 ? 1 : 2)}M`; }
function riskLabel(v){ return v <= 30 ? "LOW" : v <= 55 ? "MEDIUM" : v <= 75 ? "HIGH" : "VERY HIGH"; }
function addHistory(type, text){ state.history.unshift({type,text,month: incidents[state.incidentIndex]?.month ?? 18}); state.history = state.history.slice(0,18); }
function applyDelta(delta={}){
  ["readiness","resilience","lifecycle","process","exposure"].forEach(k => {
    if(typeof delta[k] === "number") state.metrics[k] = clamp(state.metrics[k] + delta[k]);
  });
}
function investmentReserve(index=state.incidentIndex){return incidents.slice(index+1).reduce((sum,inc)=>sum+Math.min(...inc.investments.map(x=>x.cost)),0);}
function canFund(inv){return !!inv&&inv.cost+investmentReserve()<=state.metrics.budget;}
function conditionalDelta(incident){
  const bonus = {readiness:0,resilience:0,lifecycle:0,process:0,exposure:0};
  const notes=[];
  if(incident.id === "INC-02"){
    if(state.flags.processOwnership){ bonus.process += 3; bonus.resilience += 2; notes.push("Earlier end-to-end ownership reduces handover ambiguity."); }
    if(state.flags.repairCapability){ bonus.lifecycle += 2; notes.push("Earlier repair-loop investment gives the team a stronger recovery baseline."); }
  }
  if(incident.id === "INC-03"){
    if(state.flags.repairCapability){ bonus.resilience += 3; bonus.lifecycle += 3; bonus.exposure -= 2; notes.push("Your local repair loop reduces dependence on new supply during the sourcing disruption."); }
    if(state.flags.stockLogic){ bonus.resilience += 2; notes.push("Updated stock logic gives more warning before the lead-time shock becomes critical."); }
  }
  if(incident.id === "INC-04"){
    if(state.flags.processVisibility || state.flags.dispositionStandard){ bonus.process += 3; bonus.resilience += 2; notes.push("Improved repair-flow control makes the recurring pattern easier to see."); }
    if(state.flags.recoveryProgram){ bonus.lifecycle += 3; notes.push("The recovery programme absorbs part of the repeated component demand."); }
  }
  if(incident.id === "INC-05"){
    const capabilityGroups = [["repairCapability","recoveryProgram","repairability","crossSkill"],["stockLogic","secondarySupplier","traceability"],["processOwnership","processVisibility","dispositionStandard","crossSkill"],["designReview","conditionData","repairability"]];
    const count = capabilityGroups.filter(group=>group.some(f=>state.flags[f])).length;
    const es = document.documentElement.lang === "es";
    if(count >= 4){ bonus.readiness += 7; bonus.resilience += 9; bonus.process += 4; bonus.exposure -= 4; notes.push(es?"Las cuatro áreas de capacidad (reparación, suministro, procesos e ingeniería) activan la bonificación superior del juego. Su independencia y eficacia real requieren evidencia.":"All four capability areas (repair, supply, process and engineering) trigger the higher game bonus. Independence and actual effectiveness require evidence."); }
    else if(count >= 2){ bonus.readiness += 4; bonus.resilience += 5; bonus.process += 2; notes.push(es?"Dos o tres áreas de capacidad activan la bonificación intermedia del juego.":"Two or three capability areas trigger the intermediate game bonus."); }
    else { bonus.readiness -= 3; bonus.resilience -= 5; notes.push(es?"Menos de dos áreas de capacidad activan una penalización del juego.":"Fewer than two capability areas trigger a game penalty."); }
    if(state.flags.secondarySupplier){ bonus.exposure -= 4; bonus.resilience += 3; notes.push("Second-source qualification reduces the severity of the supplier constraint."); }
    if(state.flags.designReview){ bonus.lifecycle += 4; notes.push("Structured design feedback has reduced part of the recurring lifecycle burden."); }
  }
  return {bonus,notes};
}


let state = loadState();
// Always open on the landing page. Saved progress remains available and can be resumed explicitly.
// This prevents a previous session from dropping the learner straight into an incident on reopen/refresh.
state.started = false;
let tutorialStep = 0;
let coachMinimized = false;
let coachTipIndex = 0;

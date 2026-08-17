function sustainabilityLearning(inc){
  const map={
    'INC-01':{
      operational:{label:'SUSTAINABILITY CONCEPT · LIFECYCLE THINKING',title:'Look beyond the immediate AOG',copy:'Compare operational recovery with component life, repairability, stock resilience and dependence on newly supplied material.',chips:['Lifecycle','Repair vs replacement','Supply resilience']},
      investigation:{label:'SUSTAINABILITY CONCEPT · PREVENTION',title:'A recurring problem is a sustainability problem',copy:'Move from “what failed?” to “what system condition made the failure difficult to absorb?”. Prevention can reduce repeated interventions and avoidable demand.',chips:['Prevention','Systems thinking','Process quality']},
      investment:{label:'SUSTAINABILITY CONCEPT · CIRCULARITY & RESILIENCE',title:'Build capabilities that keep assets useful',copy:'Repair capability, smarter stock logic and clear ownership can extend useful life while making the support system more resilient.',chips:['Circularity','Life extension','Resilience']}
    },
    'INC-02':{
      operational:{label:'SUSTAINABILITY CONCEPT · OPERATIONAL CIRCULARITY',title:'Repair only creates value when the process flows',copy:'A component can be technically repairable and still be replaced unnecessarily if it waits for information, ownership or disposition.',chips:['Repair loop','Flow efficiency','Avoided replacement']},
      investigation:{label:'SUSTAINABILITY CONCEPT · PROCESS EFFICIENCY',title:'Waiting and rework consume capability',copy:'Sustainable operations improve the flow of existing assets through safe, controlled processes instead of compensating for weak handovers with more hardware.',chips:['Process flow','Ownership','First-time-right']},
      investment:{label:'SUSTAINABILITY CONCEPT · ENABLE CIRCULARITY',title:'Circularity needs infrastructure and governance',copy:'Visibility, decision standards and flexible repair capacity turn repair from an ad-hoc option into a repeatable lifecycle capability.',chips:['Repairability','Process maturity','Resource efficiency']}
    },
    'INC-03':{
      operational:{label:'SUSTAINABILITY CONCEPT · RESPONSIBLE SOURCING',title:'Upstream conditions can become operational constraints',copy:'Material sourcing, ecosystem sensitivity, permitting and traceability can affect lead time and continuity. Sustainability and supply resilience are linked.',chips:['Biodiversity','Supply resilience','Responsible sourcing']},
      investigation:{label:'SUSTAINABILITY CONCEPT · DEPENDENCY & TRACEABILITY',title:'Separate the external hazard from your vulnerability',copy:'The permitting change is external. Single-source concentration and incomplete traceability determine how exposed your support system is to that change.',chips:['Traceability','Concentration risk','Upstream visibility']},
      investment:{label:'SUSTAINABILITY CONCEPT · SOURCING OPTIONALITY',title:'Reduce dependency with qualified alternatives and recovery',copy:'Second sources, deeper traceability and component recovery reduce different parts of upstream dependency while keeping technical qualification intact.',chips:['Optionality','Recovery','Qualified sourcing']}
    },
    'INC-04':{
      operational:{label:'SUSTAINABILITY CONCEPT · DESIGN FOR THE LIFECYCLE',title:'Repeated In-Service demand should feed design learning',copy:'Recurring removals consume repair capacity, material and planning effort. Sustainable lifecycle management turns field evidence into engineering action.',chips:['Design feedback','Reliability','Life extension']},
      investigation:{label:'SUSTAINABILITY CONCEPT · CLOSED-LOOP LEARNING',title:'Operation and design cannot learn in isolation',copy:'A feedback trigger converts recurring operational evidence into structured reliability, maintainability and repairability review.',chips:['Closed loop','Evidence','Design for In-Service']},
      investment:{label:'SUSTAINABILITY CONCEPT · ECO-DESIGN IN PRACTICE',title:'Design choices shape future support impacts',copy:'Reliability, modularity, accessibility and repairability influence how often components are removed, replaced, transported, tested and recovered over their life.',chips:['Ecodesign','Repairability','Maintainability']}
    },
    'INC-05':{
      operational:{label:'SUSTAINABILITY CONCEPT · SYSTEM RESILIENCE',title:'Sustainability must survive simultaneous pressure',copy:'The final mission tests whether repair, stock, sourcing, process and design choices created enough optionality to protect capability without exhausting every buffer.',chips:['Resilience','Trade-offs','Optionality']},
      investigation:{label:'SUSTAINABILITY CONCEPT · SYSTEMS THINKING',title:'Resilience is a property of the whole support system',copy:'No single stock level or supplier can absorb every shock. Resilience comes from multiple credible routes, information and coordinated decisions.',chips:['Systems thinking','Adaptability','Risk prevention']},
      investment:{label:'SUSTAINABILITY CONCEPT · CONTINUOUS IMPROVEMENT',title:'Turn lessons into a repeatable management system',copy:'Stress tests, lifecycle portfolios and resilience governance keep assumptions visible and convert incident learning into future prevention.',chips:['Continuous improvement','Governance','Lifecycle portfolio']}
    }
  };
  return map[inc.id]?.[state.phase] || {label:'SUSTAINABILITY LEARNING',title:'Connect the operational choice to its lifecycle consequence',copy:'Look for the relationship between readiness, repair, materials, supply-chain dependency, process quality and long-term system resilience.',chips:['Lifecycle','Resilience','Systems thinking']};
}

function renderLearningLens(inc){
  const l=sustainabilityLearning(inc);
  return `<section class="learning-lens"><div><span>${l.label}</span><strong>${l.title}</strong><p>${l.copy}</p></div><div class="learning-chips">${l.chips.map(c=>`<b>${c}</b>`).join('')}</div></section>`;
}

function sustainabilityOutcome(inc){
  if(!state.operationalResolved) return '';
  const outcomes={
    'INC-01':{
      A:['Resilience is part of lifecycle sustainability','You recover the aircraft with an existing serviceable unit, but consume a scarce shared buffer. Reuse can preserve material value while still weakening network resilience.'],
      B:['Repair can preserve lifecycle value','You prioritise an existing repair route and protect scarce stock. Safe repair can extend useful component life and reduce dependence on new supply when the mission can still be supported.'],
      C:['Reuse can move rather than remove a problem','You keep an existing component in productive use, but transfer the constraint into another maintenance plan. Circularity only works well when configuration and planning debt remain controlled.'],
      D:['New supply is not impact-free','Waiting for a new unit increases dependence on fresh material and supplier capacity and misses the mission window. Sustainability must remain operationally credible.']
    },
    'INC-02':{
      A:['Replacement can hide process waste','Buying new units may restore availability, but it bypasses recoverable assets and leaves the stalled repair process untouched. Circularity needs functioning flow, not just repairable hardware.'],
      B:['Process improvement can unlock existing assets','A focused disposition cell helps recover units already in the system. Better coordination can reduce avoidable waiting, replacement demand and repair-loop congestion.'],
      C:['A quick win is not a flow solution','Moving one easy case does not change the ageing queue. Sustainable process improvement looks at the whole flow and prevents backlog from rebuilding.'],
      D:['Local optimisation can transfer the impact','Stopping intake controls work-in-progress at the repair centre but pushes the burden back to fleet support. Systems thinking checks where the problem goes next.']
    },
    'INC-03':{
      A:['Buffers buy time, not resilience','Using stock protects the short term but increases exposure if the underlying single-source and traceability gaps remain.'],
      B:['Recovery reduces pressure on new supply','Repairing and recovering existing units can preserve stock and reduce immediate demand for newly supplied material while qualified sourcing actions are developed.'],
      C:['Sustainability never bypasses qualification','An environmental or supply concern does not justify using an unqualified material. Technical assurance remains a boundary condition.'],
      D:['More of the same source is still concentration','A forward order can increase coverage, but it does not reduce dependency on the same upstream route or improve traceability.']
    },
    'INC-04':{
      A:['Repeated replacement can lock in recurring demand','Case-by-case replacement keeps the fleet moving but fails to convert repeated removals into lifecycle learning.'],
      B:['Field evidence can become design improvement','Aggregating failures while protecting repair capacity creates a bridge from operational evidence to engineering action.'],
      C:['Stock buffers consequences, not causes','More spares can protect readiness but do not improve reliability, repairability or the reason demand keeps recurring.'],
      D:['Long-term improvement cannot abandon today’s support','Design action may reduce future burden, but current approved support routes still need to protect readiness during the transition.']
    },
    'INC-05':{
      A:['Integrated resilience preserves options','Combining repair, controlled stock and coordinated engineering avoids exhausting one buffer and uses capabilities built across the whole simulation.'],
      B:['Maximum speed can consume future resilience','Using every spare immediately improves readiness today but leaves few options for the next disruption. Sustainability considers the resilience you leave behind.'],
      C:['Dependence becomes visible under stress','Waiting for a constrained supplier shows the cost of relying on one recovery route when several pressures overlap.'],
      D:['Protecting optionality is a sustainability strategy','Recovering one aircraft while preserving a repair path for the second balances immediate readiness with the ability to keep responding tomorrow.']
    }
  };
  const entry=outcomes[inc.id]?.[state.selectedOption];
  if(!entry) return '';
  return `<section class="sustainability-outcome"><span>WHY THIS MATTERS FOR SUSTAINABILITY</span><h4>${entry[0]}</h4><p>${entry[1]}</p><div class="concept-definition"><b>Key idea</b><span>${missionKeyIdea(inc.id)}</span></div></section>`;
}

function missionKeyIdea(id){
  return ({
    'INC-01':'In aerospace, sustainability includes how effectively existing assets, materials and support capabilities are used across their lifecycle while maintaining safety and readiness.',
    'INC-02':'Circularity is operational only when safe repair, information and decision flow allow recoverable assets to return to service.',
    'INC-03':'Responsible sourcing combines traceability, qualified alternatives, recovery and awareness of upstream environmental dependencies.',
    'INC-04':'Design decisions and In-Service evidence are part of the same lifecycle; closed-loop learning can improve reliability, maintainability and repairability.',
    'INC-05':'A sustainable support system retains credible options under pressure and improves continuously rather than relying on a single buffer or metric.'
  })[id] || 'Sustainability in aerospace is a lifecycle and systems property, not a single environmental metric.';
}

function investigationSustainabilityOutcome(inc, selected){
  if(!state.investigationResolved || !selected) return '';
  const concepts={
    'INC-01':['PREVENTION','Better stock logic and repair controls can prevent one failure from repeatedly triggering emergency demand.'],
    'INC-02':['PROCESS EFFICIENCY','Waiting, unclear ownership and incomplete inputs can destroy the lifecycle value of repairable assets.'],
    'INC-03':['UPSTREAM RESILIENCE','Biodiversity-related disruption becomes a business risk when sourcing is concentrated and upstream visibility is weak.'],
    'INC-04':['CLOSED-LOOP LIFECYCLE','Recurring field evidence creates more value when it triggers structured engineering learning instead of repeated local fixes.'],
    'INC-05':['OPTIONALITY','Resilience comes from multiple credible routes across repair, supply, process and engineering — not from predicting every event.']
  }[inc.id];
  return `<div class="learning-checkpoint"><span>SUSTAINABILITY CHECKPOINT · ${concepts[0]}</span><p>${concepts[1]}</p></div>`;
}

function investmentSustainabilityOutcome(inc, selected){
  if(!state.investmentResolved || !selected) return '';
  return `<div class="learning-checkpoint capability-checkpoint"><span>WHY THIS CAPABILITY MATTERS</span><p>${selected.feedback} <strong>It stays active in later missions and changes the system rather than only the current event.</strong></p></div>`;
}

function openLearningOverview(){
  const root=document.getElementById('modalRoot');
  root.innerHTML=`<div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="What you will learn"><div class="modal learning-overview-modal">
    <div class="modal-head"><div><p class="eyebrow">AEROSPACE SUSTAINABILITY · LEARNING MAP</p><h2>What sustainability means in this simulator</h2></div><button class="close-btn" id="closeLearningOverview" aria-label="Close">×</button></div>
    <div class="modal-body"><p class="learning-overview-intro">The simulation teaches sustainability as a <strong>system property</strong>: the ability to maintain operational capability while improving lifecycle use, resilience, sourcing awareness and process quality over time.</p>
      <div class="learning-overview-grid">
        <article><b>LIFECYCLE</b><h3>Use the whole life of an asset</h3><p>Repair, recovery, useful-life extension, modularity and design feedback influence how much value is extracted from components already in the system.</p></article>
        <article><b>SUPPLY</b><h3>Build resilience, not just stock</h3><p>Supplier concentration, critical materials, lead time, repair routes and qualified alternatives determine how the system absorbs disruption.</p></article>
        <article><b>BIODIVERSITY</b><h3>Understand upstream dependencies</h3><p>Ecosystem-sensitive sourcing can affect permitting, traceability and supply continuity. The game treats this as a decision-relevant risk, not a decorative nature claim.</p></article>
        <article><b>PROCESS & DESIGN</b><h3>Prevent recurrence</h3><p>Good ownership, root-cause closure and feedback to engineering can reduce repeated interventions and improve long-term performance.</p></article>
      </div>
      <div class="learning-overview-note"><strong>And what about CO₂, energy, water, waste or VOCs?</strong><span>They can appear when relevant to a decision, but no level is dedicated exclusively to one of them. The simulator keeps the learning cross-functional and lifecycle-based.</span></div>
    </div><div class="modal-foot"><button class="primary-btn" id="closeLearningOverview2">Got it</button></div></div></div>`;
  const close=()=>root.innerHTML='';
  document.getElementById('closeLearningOverview').onclick=close;
  document.getElementById('closeLearningOverview2').onclick=close;
}

function openDecisionLoopOverview(){
  const root=document.getElementById("modalRoot");
  root.innerHTML=`<div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="Decision loop overview"><div class="modal decision-loop-modal">
    <div class="modal-head"><div><p class="eyebrow">EXPLORE THE DECISION LOOP</p><h2>See how one incident becomes a system decision</h2></div><button class="close-btn" id="closeDecisionLoop" aria-label="Close decision loop overview">×</button></div>
    <div class="modal-body">
      <div class="decision-loop-intro"><p>This is a quick orientation, not the guided briefing. It shows the logic you will repeat during every simulated incident.</p></div>
      <div class="decision-loop-overview">
        <article><b>01</b><span>OPERATE</span><h3>Stabilise the situation</h3><p>Read the mission constraint, available support routes and immediate trade-offs. Choose a credible response.</p></article>
        <div class="decision-loop-arrow" aria-hidden="true">→</div>
        <article><b>02</b><span>INVESTIGATE</span><h3>Look behind the symptom</h3><p>Use process and support information to identify why the system became exposed. A fast recovery is not automatically a root-cause fix.</p></article>
        <div class="decision-loop-arrow" aria-hidden="true">→</div>
        <article><b>03</b><span>IMPROVE</span><h3>Change the future state</h3><p>Spend limited improvement budget on capabilities such as repair, stock logic, process ownership, sourcing resilience or design feedback.</p></article>
      </div>
      <div class="decision-memory-note"><strong>Then the simulator remembers.</strong><span>Your later incidents are affected by the capabilities you funded — and by the gaps you left unresolved.</span></div>
    </div>
    <div class="modal-foot"><button class="secondary-btn" id="closeDecisionLoop2">Back to landing page</button><div class="modal-foot-actions"><button class="ghost-btn" id="decisionLoopStartNow" type="button">Start simulation now</button><button class="primary-btn" id="decisionLoopStartBriefing">Start guided briefing</button></div></div>
  </div></div>`;
  const close=()=>{root.innerHTML="";};
  document.getElementById("closeDecisionLoop").onclick=close;
  document.getElementById("closeDecisionLoop2").onclick=close;
  document.getElementById("decisionLoopStartBriefing").onclick=()=>{close();openTutorial(0,true);};
  document.getElementById("decisionLoopStartNow").onclick=()=>{close(); state.started=true; saveState(); render();};
}

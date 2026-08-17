const STORAGE_KEY = "tass-readiness-resilience-simulator-v4";
const persistenceAvailable = (() => {
  try {
    const key = `${STORAGE_KEY}-test`;
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch { return false; }
})();

const initialState = () => ({
  started: false,
  tutorialSeen: false,
  incidentIndex: 0,
  phase: "operational",
  selectedOption: null,
  selectedEvidence: null,
  selectedInvestment: null,
  operationalResolved: false,
  investigationResolved: false,
  investmentResolved: false,
  metrics: {
    readiness: 78,
    resilience: 54,
    lifecycle: 48,
    process: 46,
    exposure: 62,
    budget: 3200
  },
  maxBudget: 3200,
  flags: {},
  history: [],
  completedIncidents: [],
  journey: [],
});

const tutorials = [
  {
    title: "Welcome to Sustainability Under Pressure",
    body: "You will manage a fictional In-Service support system across five connected missions. Your job is to keep capability ready while learning how lifecycle, repair, process, sourcing, biodiversity and design decisions shape sustainability over time.",
    extra: `<div class="tutorial-grid">
      <div class="tutorial-box"><strong>Your role</strong><p>Make operational decisions, investigate why the system became exposed, then invest in a better future state.</p></div>
      <div class="tutorial-box"><strong>One rule</strong><p>Safety, airworthiness and approved technical configuration always remain boundary conditions.</p></div>
    </div>`
  },
  {
    title: "What does sustainability mean here?",
    body: "Not just emissions. In aerospace, sustainability also includes how long assets remain useful, whether components can be repaired, how resilient the supply chain is, how processes avoid repeated work, how materials are sourced and how In-Service evidence feeds back into design.",
    extra: `<div class="tutorial-grid">
      <div class="tutorial-box"><div class="metric-example">LIFECYCLE</div><strong>Use existing value well</strong><p>Repair, recovery, life extension, maintainability and design feedback.</p></div>
      <div class="tutorial-box"><div class="metric-example">RESILIENCE</div><strong>Keep credible options</strong><p>Repair routes, stock logic, qualified suppliers, traceability and coordinated decisions.</p></div>
      <div class="tutorial-box"><div class="metric-example">PROCESS</div><strong>Prevent recurrence</strong><p>Ownership, flow, root cause, first-time-right decisions and learning loops.</p></div>
      <div class="tutorial-box"><div class="metric-example">SOURCING</div><strong>See upstream dependencies</strong><p>Critical materials, supplier concentration, traceability and biodiversity-related sourcing risk.</p></div>
    </div>`
  },
  {
    title: "Every mission uses the same three moves",
    body: "You do not need to memorise a manual. ORA will stay with you and explain each phase while you play.",
    extra: `<div class="tutorial-flow">
      <div class="flow-step"><b>01 — RESPOND</b><span>Protect the immediate mission under real constraints.</span></div><div class="arrow">→</div>
      <div class="flow-step"><b>02 — INVESTIGATE</b><span>Find the system condition behind the visible event.</span></div><div class="arrow">→</div>
      <div class="flow-step"><b>03 — IMPROVE</b><span>Spend limited budget on a capability that remains active later.</span></div>
    </div>`
  },
  {
    title: "Read trade-offs, not a single score",
    body: "A fast action can improve readiness and weaken resilience at the same time. That is intentional. The final review keeps the dimensions separate so you can see the strategy you created.",
    extra: `<div class="tutorial-grid">
      <div class="tutorial-box"><strong>Higher is better</strong><p>Mission Readiness, Supply Resilience, Lifecycle Strategy and Process Maturity.</p></div>
      <div class="tutorial-box"><strong>Lower is better</strong><p>Material & Biodiversity Exposure — dependency created by concentration, weak traceability and sensitive sourcing conditions.</p></div>
      <div class="tutorial-box"><strong>Budget is finite</strong><p>You cannot fund every improvement. Prioritisation is part of the game.</p></div>
      <div class="tutorial-box"><strong>System data is optional</strong><p>Use the SYSTEM DATA button when you want deeper context; you do not need it to understand the basic task.</p></div>
    </div>`
  },
  {
    title: "Environmental topics can appear without taking over the game",
    body: "Water, waste, energy, CO₂ and VOCs may appear when they genuinely matter to a decision. No mission is dedicated exclusively to one of them. The simulator stays focused on lifecycle, process, supply, biodiversity, design and resilience.",
    extra: `<div class="tutorial-grid">
      <div class="tutorial-box"><strong>Example</strong><p>An urgent logistics choice may have CO₂ and energy implications, but the mission is still about readiness, lifecycle and resilience.</p></div>
      <div class="tutorial-box"><strong>Anti-greenwashing rule</strong><p>No vague “green” claims, no invented nature benefits and no assumption that one option is automatically sustainable.</p></div>
    </div>`
  },
  {
    title: "Practice once — then start Mission 01",
    body: "This rehearsal does not affect your budget or final review. Make one decision and see how the game explains the trade-off.",
    practice: true
  }
];

const incidents = [];

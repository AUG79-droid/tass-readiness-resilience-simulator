function render(){
  const saveBadge=document.querySelector(".save-status");
  if(saveBadge){
    saveBadge.innerHTML=persistenceAvailable?`<i></i> Local autosave`:`<i class="off"></i> Session only`;
    saveBadge.title=persistenceAvailable?"Progress is stored only in this browser on this device":"This browser policy blocks local storage; progress will last only for the current session.";
  }
  const root = document.getElementById("mainContent");
  if(!state.started){ renderLanding(root); return; }
  if(state.completedIncidents.length >= incidents.length){ renderFinal(root); return; }
  renderGame(root);
}

function renderLanding(root){
  const hasProgress = state.tutorialSeen && (state.incidentIndex > 0 || state.operationalResolved || state.investigationResolved || state.investmentResolved);
  const missions=[
    ['01','AOG RECOVERY','Lifecycle thinking','Repair vs replace'],
    ['02','REPAIR BOTTLENECK','Process flow','Circularity'],
    ['03','SUPPLY SHOCK','Biodiversity sourcing','Resilience'],
    ['04','DESIGN FEEDBACK','Life extension','Engineering loop'],
    ['05','SYSTEM STRESS TEST','Integrated thinking','Trade-offs']
  ];
  root.innerHTML = `
    <section class="game-landing">
      <div class="game-landing-glow glow-a"></div><div class="game-landing-glow glow-b"></div>
      <div class="landing-main-card">
        <div class="game-kicker"><span class="live-dot"></span> SUSTAINABILITY OPS // MISSION SIMULATOR</div>
        <div class="game-title-row">
          <div>
            <h2>SUSTAINABILITY<br><span>UNDER PRESSURE</span></h2>
            <p>Learn aerospace sustainability by making the decisions that shape readiness, lifecycle, repair, supply resilience, biodiversity-related sourcing and design.</p>
          </div>
          <div class="game-stats">
            <div><b>5</b><span>MISSIONS</span></div><div><b>18</b><span>MONTHS</span></div><div><b>3</b><span>DECISION PHASES</span></div>
          </div>
        </div>
        <div class="landing-cta-row">
          <button class="game-start-btn" id="playNowBtn"><span>${hasProgress ? 'RESUME' : 'ENTER'}</span><strong>${hasProgress ? 'Continue your mission' : 'Start Mission 01'}</strong><i>→</i></button>
          <button class="game-side-btn" id="briefingBtn"><span>Need a tour?</span><b>Guided briefing</b></button>
          <button class="game-side-btn alt" id="conceptBtn"><span>Before you play</span><b>See what you’ll learn</b></button>
        </div>
        <div class="mission-deck" aria-label="Mission map">
          ${missions.map((m,i)=>`<article class="mission-deck-card m${i+1}"><div class="mission-deck-number">${m[0]}</div><div><span>MISSION ${m[0]}</span><strong>${m[1]}</strong><p>${m[2]} · ${m[3]}</p></div><i>${i===0?'▶':'◆'}</i></article>`).join('')}
        </div>
        <div class="landing-learning-ribbon"><span>YOU WILL LEARN</span><b>Lifecycle</b><b>Repairability</b><b>Supply resilience</b><b>Biodiversity sourcing</b><b>Process improvement</b><b>Design feedback</b></div>
      </div>
      <aside class="landing-orbit-card">
        <div class="orbit-radar"><div class="orbit-ring r1"></div><div class="orbit-ring r2"></div><div class="orbit-ring r3"></div><span class="orbit-core">TASS</span><i class="orbit-blip b1"></i><i class="orbit-blip b2"></i><i class="orbit-blip b3"></i></div>
        <div class="orbit-copy"><span>YOUR CHALLENGE</span><h3>Keep capability ready without creating the next problem.</h3><p>Every fast fix has a lifecycle consequence. Every investment changes what happens months later.</p></div>
        <div class="orbit-rule"><b>NO PERFECT ANSWER</b><span>Read the trade-off. Learn the sustainability concept. Build a more resilient system.</span></div>
      </aside>
    </section>
    ${renderLandingCoach()}`;
  document.getElementById("playNowBtn").onclick = () => { state.started = true; coachTipIndex=0; coachMinimized=false; saveState(); render(); };
  document.getElementById("briefingBtn").onclick = () => openTutorial(0, true);
  document.getElementById("conceptBtn").onclick = () => openLearningOverview();
  bindCoachControls();
}

function renderGuideAvatar(context='default', mood='idle'){
  return `<div class="coach-character ${mood}" aria-hidden="true">
    <svg class="coach-svg" viewBox="0 0 220 280" role="img" focusable="false">
      <defs>
        <linearGradient id="coachSuit" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1b4264"/><stop offset="55%" stop-color="#102a44"/><stop offset="100%" stop-color="#071726"/></linearGradient>
        <linearGradient id="coachSkin" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f0c9af"/><stop offset="100%" stop-color="#c98f77"/></linearGradient>
        <linearGradient id="coachGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#72dcf6"/><stop offset="100%" stop-color="#4ca0e8"/></linearGradient>
        <filter id="softGlow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse class="coach-shadow" cx="110" cy="260" rx="60" ry="12" fill="rgba(0,0,0,.28)"/>
      <g class="coach-body">
        <path d="M48 260c2-53 18-92 62-92s60 39 62 92" fill="url(#coachSuit)" stroke="rgba(122,218,246,.35)" stroke-width="2"/>
        <path d="M82 177l28 31 28-31" fill="none" stroke="#82dff5" stroke-width="5" stroke-linejoin="round" opacity=".85"/>
        <rect x="96" y="203" width="28" height="18" rx="5" fill="#0b1725" stroke="#66d9f3" stroke-width="2"/>
        <circle cx="110" cy="212" r="4" fill="#66d9f3" filter="url(#softGlow)"/>
      </g>
      <g class="coach-neck"><path d="M92 166v26c8 10 28 10 36 0v-26" fill="url(#coachSkin)"/></g>
      <g class="coach-head">
        <path d="M67 84c4-37 26-61 53-58 32 3 47 32 40 70l-8 48c-5 29-24 43-43 43-22 0-41-17-45-46z" fill="url(#coachSkin)"/>
        <path d="M69 94c-6-32 7-65 38-73 29-7 56 12 61 43-15-12-37-17-54-11-14 5-22 13-30 29z" fill="#172638"/>
        <path d="M69 96c-11 1-14 10-11 21 3 10 8 16 17 14" fill="url(#coachSkin)"/>
        <path d="M157 96c11 1 14 10 11 21-3 10-8 16-17 14" fill="url(#coachSkin)"/>
        <g class="coach-eyes">
          <path d="M81 101c8-7 18-7 26 0" stroke="#513a35" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M119 101c8-7 18-7 26 0" stroke="#513a35" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="94" cy="106" rx="4.5" ry="6" fill="#20384a"/><ellipse cx="132" cy="106" rx="4.5" ry="6" fill="#20384a"/>
          <circle cx="95" cy="104" r="1.5" fill="#eafaff"/><circle cx="133" cy="104" r="1.5" fill="#eafaff"/>
        </g>
        <path class="coach-mouth" d="M99 143c8 5 17 5 25 0" stroke="#8a4d4a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
        <g class="coach-headset">
          <path d="M66 82c-2-25 16-48 43-53 31-5 55 16 57 45" stroke="#69dff7" stroke-width="5" fill="none" stroke-linecap="round"/>
          <rect x="58" y="84" width="10" height="35" rx="5" fill="#153b59" stroke="#69dff7" stroke-width="2"/>
          <rect x="157" y="84" width="10" height="35" rx="5" fill="#153b59" stroke="#69dff7" stroke-width="2"/>
          <path d="M162 116c-2 15-14 23-26 25" stroke="#69dff7" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="134" cy="141" r="4" fill="#69dff7"/>
        </g>
      </g>
      <g class="coach-hand">
        <path d="M151 202c17 2 31 15 34 33" stroke="#173855" stroke-width="15" fill="none" stroke-linecap="round"/>
        <path d="M183 232c4-14 13-25 22-33" stroke="url(#coachSkin)" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="205" cy="197" r="8" fill="url(#coachSkin)"/>
      </g>
      <circle class="coach-status-light" cx="183" cy="44" r="7" fill="url(#coachGlow)" filter="url(#softGlow)"/>
    </svg>
  </div>`;
}

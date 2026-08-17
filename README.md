# TASS Readiness & Resilience Simulator

**Status: V2.3 published candidate — English version**

A browser-based **serious game / mission simulator** that teaches sustainability in aerospace through fictional In-Service decisions.

## Learning objective

The learner manages a fictional support system over **18 simulated months** and completes five connected missions. Sustainability is taught as a lifecycle and systems topic, not as a separate environmental quiz.

The five missions cover:

1. **Lifecycle thinking** — AOG recovery, repair vs replacement, stock resilience and useful life.
2. **Operational circularity** — repair flow, waiting, ownership and process bottlenecks.
3. **Responsible sourcing & biodiversity** — traceability, concentration, qualified alternatives and upstream ecosystem-related sourcing risk.
4. **Design ↔ In-Service feedback** — recurring failures, reliability evidence, repairability and lifecycle learning.
5. **System resilience** — simultaneous disruption, optionality, trade-offs and continuous improvement.

Each mission follows:

**RESPOND → INVESTIGATE → IMPROVE**

The learner first protects the immediate mission, then diagnoses the systemic exposure, then invests limited budget in a capability that remains active later.

## V2.3 learning design

- Game-like landing screen with **5 missions / 18 months / 3 decision phases**.
- Animated interactive coach **ORA** with mission- and phase-specific tips.
- Six-step optional guided briefing plus a practice decision.
- One clear mission objective per scenario.
- Mission-specific sustainability concepts in every phase.
- **Why this matters for sustainability** feedback after operational decisions in all five missions.
- Sustainability checkpoints after root-cause diagnosis.
- Capability-learning feedback after improvement investment.
- Mission-complete reward screens with badges and learning unlocks.
- Final **Sustainability & Readiness Review** with strategy profile, five mission badges, five takeaway concepts and the learner's 18-month decision journey.
- Optional deeper **SYSTEM DATA** view; the main game remains playable without reading a dense dashboard.

## Environmental scope and anti-greenwashing guardrails

- All events, values, component situations and performance figures are **fictional and illustrative**.
- The game does not contain or represent real Airbus fleet, supplier, technical or operational data.
- Safety, airworthiness and approved technical configuration remain explicit boundary conditions.
- Biodiversity appears where relevant to sourcing mechanisms such as ecosystem-sensitive regions, permitting, traceability, source concentration and qualification.
- Water, waste, energy, CO₂ and VOCs may appear as **secondary decision context**. No mission or scoring axis is dedicated exclusively to any of them.
- No generic “green”, “eco-friendly”, “zero impact” or equivalent claims are used.
- The final result is multidimensional; it does not reduce sustainability to one composite score.

## Technical characteristics

- Static HTML/CSS/JavaScript.
- No framework or build step.
- No CDN, Google Fonts or runtime web dependency.
- Local autosave where browser policy permits; session-only fallback otherwise.
- Responsive layout and reduced-motion support.
- Prepared for GitHub Pages from the repository root.

## Validation performed for V2.3

- JavaScript syntax validation passes with `node --check`.
- Structural test confirms **5 missions**, each with **4 operational options, 4 root-cause hypotheses, exactly 1 intended systemic diagnosis and 3 investment choices**.
- Guided briefing reduced and validated at **6 steps**.
- Source review confirms mission-specific sustainability learning for all five missions.
- Source scan confirms no common unsupported claims such as “zero emissions”, “eco-friendly”, “green aircraft” or “carbon neutral”.
- Water, waste, energy, CO₂ and VOC references remain contextual rather than standalone mission themes.

## Run locally

Open `index.html` directly in Chrome/Edge. If local browser policy prefers a server, run:

```bash
python -m http.server 8080
```

and open `http://localhost:8080`.

## GitHub Pages readiness

- Repository: `tass-readiness-resilience-simulator`
- Branch: `main`
- Pages source: **Deploy from a branch**
- Folder: `/ (root)`

## Before internal deployment

Before wider internal deployment, appropriate subject-matter validation of terminology/scenario realism and any required branding, information-security or communication approvals should be completed.

V2.3 also ensures the landing page is always shown when the application is opened; any locally saved run can be resumed explicitly from the landing screen rather than opening directly inside a mission.

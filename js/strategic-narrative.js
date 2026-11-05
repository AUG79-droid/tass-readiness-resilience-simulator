(function () {
  'use strict';

  // A learning layer on top of the original five missions. No mission, score,
  // engineering rule or saved progress is changed by this module.
  var copy = {
    en: {
      kicker: 'FROM SUSTAINABILITY TO OPERATIONAL RESILIENCE',
      landingTitle: 'One decision. Two dimensions of value.',
      landingIntro: 'Explore how repair, lifecycle and responsible sourcing choices can also influence the ability to keep a support system operational under pressure.',
      envHeading: 'Sustainability perspective',
      strategyHeading: 'Operational resilience perspective',
      landingEnv: 'Use existing components responsibly, avoid unnecessary replacement and understand upstream environmental dependencies.',
      landingStrategy: 'Preserve mission readiness, reduce critical material dependencies and retain qualified recovery options.',
      materials: 'Material sovereignty',
      materialsShort: 'Reduce dependence on a single supplier, component or critical material.',
      effectiveness: 'Operational effectiveness',
      effectivenessShort: 'Keep credible, technically authorised response routes available.',
      fuelScope: 'Fuel sovereignty is part of the broader resilience narrative, but fuel supply is not simulated in these five missions.',
      partners: 'Complements official Airbus knowledge resources, including the Sustainability Knowledge Platform and Ecobox. No internal links or integrations are active.',
      missionKicker: 'STRATEGIC LEARNING LENS',
      missionQuestion: 'What changes when we look beyond environmental impact?',
      missionContext: 'This mission connects an existing sustainability concept to an operational vulnerability.',
      check: 'Question to test in your decision',
      afterChoice: 'Your fictional simulation indicators after this decision',
      readiness: 'Mission readiness',
      supply: 'Supply resilience',
      exposure: 'Material & biodiversity exposure',
      mockData: 'Simplified learning scores, not real fleet or customer performance data.',
      debriefKicker: 'STRATEGIC TAKEAWAY',
      endKicker: 'STRATEGIC NARRATIVE · 18-MONTH REVIEW',
      endTitle: 'Translate environmental knowledge into operational judgement',
      endIntro: 'Your choices illustrate how sustainability, material sovereignty and operational effectiveness can interact. The results are fictional training indicators, not evidence of real-world performance.',
      materialStrong: 'Your scenario retained stronger recovery options and contained exposure to material-related sourcing risks.',
      materialWeak: 'The scenario remains exposed to constrained sourcing or limited recovery options; improving qualified alternatives could increase resilience.',
      operationStrong: 'Your simulated operating model supported readiness while strengthening process continuity.',
      operationWeak: 'Your simulated operating model still faces readiness or process-continuity constraints under combined stress.',
      lifecycleStrong: 'Repair and lifecycle decisions contributed to a more repeatable, less replacement-dependent support system.',
      lifecycleWeak: 'Further improvement in repair flow, lifecycle use and engineering feedback would strengthen the support system.',
      scopeTitle: 'What the app does not claim',
      scopeText: 'No actual aircraft maintenance procedure, Airbus internal approval, customer requirement or corporate resilience narrative is represented here. The exercise is designed for learning and requires technical and corporate validation before any operational use.'
    },
    es: {
      kicker: 'DE LA SOSTENIBILIDAD A LA RESILIENCIA OPERATIVA',
      landingTitle: 'Una decisión. Dos dimensiones de valor.',
      landingIntro: 'Explora cómo las decisiones sobre reparación, ciclo de vida y cadena de suministro responsable pueden influir también en la continuidad operativa cuando surgen dificultades.',
      envHeading: 'Perspectiva de sostenibilidad',
      strategyHeading: 'Perspectiva de resiliencia operativa',
      landingEnv: 'Aprovechar los componentes existentes, evitar sustituciones innecesarias y comprender las dependencias ambientales aguas arriba.',
      landingStrategy: 'Preservar la disponibilidad, reducir dependencias de materiales críticos y conservar alternativas de recuperación autorizadas.',
      materials: 'Soberanía de materiales',
      materialsShort: 'Reducir la dependencia de un único proveedor, componente o material crítico.',
      effectiveness: 'Efectividad operativa',
      effectivenessShort: 'Mantener alternativas de respuesta técnicamente autorizadas.',
      fuelScope: 'La soberanía de combustible forma parte de la narrativa general de resiliencia, pero estas cinco misiones no simulan el abastecimiento de combustible.',
      partners: 'Complementa recursos oficiales de conocimiento de Airbus, como Sustainability Knowledge Platform y Ecobox. No existen enlaces ni integraciones internas activas.',
      missionKicker: 'PERSPECTIVA DE APRENDIZAJE ESTRATÉGICO',
      missionQuestion: '¿Qué cambia cuando miramos más allá del impacto ambiental?',
      missionContext: 'Esta misión conecta un concepto de sostenibilidad con una vulnerabilidad operativa.',
      check: 'Pregunta para evaluar tu decisión',
      afterChoice: 'Indicadores ficticios del simulador tras esta decisión',
      readiness: 'Disponibilidad operativa',
      supply: 'Resiliencia del suministro',
      exposure: 'Exposición a materiales y biodiversidad',
      mockData: 'Puntuaciones didácticas simplificadas, no datos reales de flotas ni clientes.',
      debriefKicker: 'CONCLUSIÓN ESTRATÉGICA',
      endKicker: 'NARRATIVA ESTRATÉGICA · REVISIÓN DE 18 MESES',
      endTitle: 'Traducir el conocimiento ambiental en criterio operativo',
      endIntro: 'Tus decisiones muestran cómo pueden interactuar la sostenibilidad, la soberanía de materiales y la efectividad operativa. Los resultados son indicadores didácticos ficticios, no evidencias de desempeño real.',
      materialStrong: 'El escenario conserva mejores alternativas de recuperación y contiene la exposición a riesgos de suministro de materiales.',
      materialWeak: 'El escenario sigue expuesto a restricciones de suministro o a pocas alternativas; ampliar las opciones cualificadas podría reforzar la resiliencia.',
      operationStrong: 'El modelo simulado mantiene la disponibilidad y refuerza la continuidad de los procesos.',
      operationWeak: 'El modelo simulado todavía afronta limitaciones de disponibilidad o continuidad de procesos bajo presión.',
      lifecycleStrong: 'Las decisiones de reparación y ciclo de vida contribuyen a un sistema de soporte más repetible y menos dependiente de sustituciones.',
      lifecycleWeak: 'Mejorar el flujo de reparación, el aprovechamiento del ciclo de vida y la retroalimentación a ingeniería reforzaría el sistema.',
      scopeTitle: 'Lo que esta aplicación no afirma',
      scopeText: 'No representa procedimientos reales de mantenimiento, aprobaciones internas de Airbus, requisitos de clientes ni una narrativa corporativa de resiliencia ya aprobada. Es un ejercicio formativo que necesitaría validaciones técnicas y corporativas antes de cualquier uso operativo.'
    }
  };

  var missions = {
    en: {
      'INC-01': {title:'Recovery under time pressure', env:'Repair and reuse can preserve component life and limit new-material demand.', strategy:'Operational effectiveness: recover readiness without exhausting the only credible spare or repair route.', question:'Which authorised option supports today’s mission while retaining choices for the next disruption?'},
      'INC-02': {title:'Keep the repair loop moving', env:'Recovering serviceable components can avoid unnecessary replacement and resource demand.', strategy:'Operational effectiveness: clear ownership and faster disposition help prevent a repairable component from becoming a readiness bottleneck.', question:'Are you removing the real bottleneck or simply shifting the pressure to stock and suppliers?'},
      'INC-03': {title:'Reduce upstream dependency', env:'Traceability and responsible sourcing make environmental and biodiversity-related dependencies visible.', strategy:'Material sovereignty: qualified alternative sources, repair and recovery can reduce single-source exposure.', question:'Does your response reduce structural dependence, or only consume the existing buffer?'},
      'INC-04': {title:'Use In-Service evidence to improve design', env:'Learning from recurring removals can improve useful life, reliability and repairability.', strategy:'Operational effectiveness: engineering feedback can reduce recurring disruption rather than only funding more replacement stock.', question:'What prevents the same failure pattern from creating the next support crisis?'},
      'INC-05': {title:'Retain options when disruptions overlap', env:'Lifecycle, repair, sourcing and process decisions interact across the support system.', strategy:'Operational resilience: combined recovery routes can preserve availability and reduce dependence when several constraints appear together.', question:'Which earlier capability still helps when stock, suppliers and repair flow are constrained at the same time?'}
    },
    es: {
      'INC-01': {title:'Recuperación bajo presión de tiempo', env:'La reparación y la reutilización pueden prolongar la vida útil de componentes y limitar la demanda de materiales nuevos.', strategy:'Efectividad operativa: recuperar la disponibilidad sin agotar la única alternativa viable de repuesto o reparación.', question:'¿Qué alternativa autorizada atiende la misión actual y conserva opciones para la siguiente interrupción?'},
      'INC-02': {title:'Mantener el flujo de reparaciones', env:'Recuperar componentes aprovechables puede evitar sustituciones innecesarias y consumo adicional de recursos.', strategy:'Efectividad operativa: una responsabilidad clara y decisiones rápidas evitan que una pieza reparable se convierta en un cuello de botella.', question:'¿Eliminas el verdadero bloqueo o trasladas la presión al inventario y a los proveedores?'},
      'INC-03': {title:'Reducir la dependencia aguas arriba', env:'La trazabilidad y el aprovisionamiento responsable hacen visibles las dependencias ambientales y relacionadas con la biodiversidad.', strategy:'Soberanía de materiales: proveedores alternativos cualificados, reparación y recuperación pueden reducir la dependencia de una única fuente.', question:'¿Tu respuesta reduce la dependencia estructural o solo consume el margen de seguridad disponible?'},
      'INC-04': {title:'Convertir la experiencia en servicio en mejora del diseño', env:'Aprender de fallos repetidos puede mejorar la vida útil, la fiabilidad y la reparabilidad.', strategy:'Efectividad operativa: trasladar datos a ingeniería puede reducir interrupciones recurrentes en lugar de limitarse a comprar repuestos.', question:'¿Qué impide que el mismo patrón de fallos provoque otra crisis de soporte?'},
      'INC-05': {title:'Conservar alternativas ante problemas simultáneos', env:'Las decisiones sobre ciclo de vida, reparación, suministro y procesos interactúan en todo el sistema de soporte.', strategy:'Resiliencia operativa: combinar vías de recuperación puede preservar la disponibilidad y reducir dependencias bajo presión.', question:'¿Qué capacidad desarrollada antes sigue siendo útil cuando fallan simultáneamente inventario, proveedores y reparaciones?'}
    }
  };

  function language() {
    var query = new URLSearchParams(window.location.search);
    var l = query.get('hubLang') || query.get('lang');
    if (l === 'es' || l === 'en') return l;
    try { l = localStorage.getItem('tass-language'); } catch (err) {}
    if (l === 'es' || l === 'en') return l;
    return document.documentElement.lang === 'es' ? 'es' : 'en';
  }

  function card(cls, heading, content) {
    return '<div class="strategic-card '+cls+'"><h4>'+heading+'</h4><p>'+content+'</p></div>';
  }

  function landing() {
    var mount = document.querySelector('.landing-main-card .landing-learning-ribbon');
    if (!mount || document.getElementById('strategicLanding')) return;
    var t = copy[language()];
    var section = document.createElement('section');
    section.id = 'strategicLanding';
    section.className = 'strategic-landing';
    section.setAttribute('aria-label', t.kicker);
    section.innerHTML =
      '<p class="strategic-kicker">'+t.kicker+'</p>'+
      '<h3>'+t.landingTitle+'</h3><p class="strategic-intro">'+t.landingIntro+'</p>'+
      '<div class="strategic-pair">'+
      card('environmental', t.envHeading, t.landingEnv)+
      card('operational', t.strategyHeading, t.landingStrategy)+
      '</div><div class="strategic-chips">'+
      '<span><strong>'+t.materials+'</strong> · '+t.materialsShort+'</span>'+
      '<span><strong>'+t.effectiveness+'</strong> · '+t.effectivenessShort+'</span></div>'+
      '<p class="strategic-scope">'+t.fuelScope+'</p>'+
      '<p class="strategic-scope strategic-resources">'+t.partners+'</p>';
    mount.insertAdjacentElement('afterend', section);
  }

  function metric(label, value) {
    return '<div class="strategic-metric"><span>'+label+'</span><strong>'+value+'</strong></div>';
  }

  function inMission() {
    var arena = document.querySelector('.mission-choice-arena');
    if (!arena || document.getElementById('strategicMission')) return;
    var lang = language();
    var t = copy[lang];
    var inc = incidents[state.incidentIndex];
    if (!inc) return;
    var m = missions[lang][inc.id];
    if (!m) return;
    var section = document.createElement('section');
    section.id = 'strategicMission';
    section.className = 'strategic-mission';
    section.setAttribute('aria-label', t.missionKicker);
    var metrics = '';
    if (state.operationalResolved) {
      metrics = '<div class="strategic-after-choice"><p>'+t.afterChoice+'</p><div class="strategic-metric-grid">'+
        metric(t.readiness, state.metrics.readiness+'/100')+
        metric(t.supply, state.metrics.resilience+'/100')+
        metric(t.exposure, state.metrics.exposure+'/100')+
        '</div><small>'+t.mockData+'</small></div>';
    }
    section.innerHTML =
      '<div class="strategic-section-head"><span>'+t.missionKicker+'</span><h3>'+m.title+'</h3><p>'+t.missionContext+'</p></div>'+
      '<div class="strategic-pair">'+card('environmental',t.envHeading,m.env)+card('operational',t.strategyHeading,m.strategy)+'</div>'+
      '<p class="strategic-question"><strong>'+t.check+':</strong> '+m.question+'</p>'+
      metrics;
    arena.insertAdjacentElement('beforebegin', section);
  }

  function finalReview() {
    var recap = document.querySelector('.final-learning-recap');
    if (!recap || document.getElementById('strategicFinal')) return;
    var t = copy[language()];
    var m = state.metrics;
    var material = m.resilience >= 70 && m.exposure <= 55 ? t.materialStrong : t.materialWeak;
    var operation = m.readiness >= 75 && m.process >= 65 ? t.operationStrong : t.operationWeak;
    var lifecycle = m.lifecycle >= 70 && m.process >= 60 ? t.lifecycleStrong : t.lifecycleWeak;
    var sec = document.createElement('section');
    sec.id = 'strategicFinal';
    sec.className = 'strategic-final';
    sec.innerHTML = '<p class="strategic-kicker">'+t.endKicker+'</p><h3>'+t.endTitle+'</h3>'+
      '<p class="strategic-intro">'+t.endIntro+'</p>'+
      '<div class="strategic-final-grid">'+
      card('operational',t.materials,material)+
      card('operational',t.effectiveness,operation)+
      card('environmental',t.envHeading,lifecycle)+
      '</div><p class="strategic-scope">'+t.fuelScope+'</p>'+
      '<div class="strategic-limits"><strong>'+t.scopeTitle+'</strong><p>'+t.scopeText+'</p></div>';
    recap.insertAdjacentElement('afterend',sec);
  }

  function debrief() {
    var grid = document.querySelector('#modalRoot .mission-complete-grid');
    if (!grid || document.getElementById('strategicDebrief')) return;
    var inc = incidents[state.incidentIndex];
    if (!inc) return;
    var t = copy[language()];
    var m = missions[language()][inc.id];
    if (!m) return;
    var article = document.createElement('div');
    article.id = 'strategicDebrief';
    article.className = 'strategic-debrief';
    article.innerHTML = '<span>'+t.debriefKicker+'</span><strong>'+m.title+'</strong>'+
      '<p>'+m.strategy+'</p>';
    grid.insertAdjacentElement('afterend',article);
  }

  function enhance() {
    landing();
    inMission();
    finalReview();
    debrief();
  }

  if (typeof render === 'function') {
    var previousRender = render;
    render = function () {
      var response = previousRender.apply(this, arguments);
      enhance();
      return response;
    };
  }
  var modal = document.getElementById('modalRoot');
  if (modal) new MutationObserver(debrief).observe(modal,{childList:true,subtree:true});
  enhance();
})();
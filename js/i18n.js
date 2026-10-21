(function(){
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("hubLang") || params.get("lang");
  let lang = queryLang || localStorage.getItem("tass-language") || ((navigator.language||"").toLowerCase().startsWith("es") ? "es" : "en");
  if(!["es","en"].includes(lang)) lang="en";
  try { localStorage.setItem("tass-language", lang); } catch(e) {}
  document.documentElement.lang = lang;

  const ES = lang === "es";
  document.title = ES ? "Simulador de Disponibilidad y Resiliencia" : "Readiness & Resilience Simulator";
  const metaDescription=document.querySelector('meta[name="description"]');
  if(metaDescription && ES) metaDescription.content="Simulador formativo sobre disponibilidad, resiliencia, ciclo de vida, reparación, suministro responsable y mejora de procesos en soporte In-Service.";

  const exact = {
    "Readiness & Resilience Simulator":"Simulador de Disponibilidad y Resiliencia",
    "IN-SERVICE LEARNING SIMULATION":"SIMULACIÓN DE APRENDIZAJE IN-SERVICE",
    "Local autosave":"Autoguardado local",
    "Session only":"Solo esta sesión",
    "Progress is stored only in this browser on this device":"El progreso se guarda únicamente en este navegador y dispositivo",
    "This browser policy blocks local storage; progress will last only for the current session.":"La política de este navegador bloquea el almacenamiento local; el progreso solo durará durante esta sesión.",
    "How to play":"Cómo jugar",
    "Reset":"Reiniciar",
    "SUSTAINABILITY OPS // MISSION SIMULATOR":"SUSTAINABILITY OPS // SIMULADOR DE MISIONES",
    "SUSTAINABILITY":"SOSTENIBILIDAD",
    "UNDER PRESSURE":"BAJO PRESIÓN",
    "Learn aerospace sustainability by making the decisions that shape readiness, lifecycle, repair, supply resilience, biodiversity-related sourcing and design.":"Aprende sostenibilidad aeroespacial tomando decisiones que influyen en la disponibilidad, el ciclo de vida, la reparación, la resiliencia del suministro, el aprovisionamiento relacionado con biodiversidad y el diseño.",
    "MISSIONS":"MISIONES",
    "MONTHS":"MESES",
    "DECISION PHASES":"FASES DE DECISIÓN",
    "RESUME":"CONTINUAR",
    "ENTER":"ENTRAR",
    "Continue your mission":"Continúa tu misión",
    "Start Mission 01":"Iniciar Misión 01",
    "Need a tour?":"¿Necesitas una guía?",
    "Guided briefing":"Introducción guiada",
    "Before you play":"Antes de jugar",
    "See what you’ll learn":"Descubre qué aprenderás",
    "Mission map":"Mapa de misiones",
    "MISSION":"MISIÓN",
    "AOG RECOVERY":"RECUPERACIÓN AOG",
    "Lifecycle thinking":"Pensamiento de ciclo de vida",
    "Repair vs replace":"Reparar o sustituir",
    "REPAIR BOTTLENECK":"CUELLO DE BOTELLA EN REPARACIÓN",
    "Process flow":"Flujo del proceso",
    "Circularity":"Circularidad",
    "SUPPLY SHOCK":"TENSIÓN DE SUMINISTRO",
    "Biodiversity sourcing":"Aprovisionamiento y biodiversidad",
    "Resilience":"Resiliencia",
    "DESIGN FEEDBACK":"RETORNO AL DISEÑO",
    "Life extension":"Extensión de vida útil",
    "Engineering loop":"Bucle de ingeniería",
    "SYSTEM STRESS TEST":"PRUEBA DE ESTRÉS DEL SISTEMA",
    "Integrated thinking":"Pensamiento integrado",
    "Trade-offs":"Compromisos",
    "YOU WILL LEARN":"APRENDERÁS",
    "Lifecycle":"Ciclo de vida",
    "Repairability":"Reparabilidad",
    "Supply resilience":"Resiliencia del suministro",
    "Process improvement":"Mejora de procesos",
    "Design feedback":"Retorno al diseño",
    "YOUR CHALLENGE":"TU RETO",
    "Keep capability ready without creating the next problem.":"Mantén la capacidad disponible sin crear el siguiente problema.",
    "Every fast fix has a lifecycle consequence. Every investment changes what happens months later.":"Cada solución rápida tiene una consecuencia en el ciclo de vida. Cada inversión cambia lo que ocurre meses después.",
    "NO PERFECT ANSWER":"NO HAY UNA RESPUESTA PERFECTA",
    "Read the trade-off. Learn the sustainability concept. Build a more resilient system.":"Comprende el compromiso. Aprende el concepto de sostenibilidad. Construye un sistema más resiliente.",
    "Mission Readiness":"Disponibilidad de misión",
    "Supply Resilience":"Resiliencia del suministro",
    "Lifecycle Strategy":"Estrategia de ciclo de vida",
    "Process Maturity":"Madurez del proceso",
    "Material & Biodiversity Exposure":"Exposición de materiales y biodiversidad",
    "Improvement Budget":"Presupuesto de mejora",
    "Higher is better":"Cuanto más alto, mejor",
    "Lower is better":"Cuanto más bajo, mejor",
    "Finite across 18 months":"Limitado durante 18 meses",
    "FLEET STATUS · FICTIONAL":"ESTADO DE FLOTA · FICTICIO",
    "Available":"Disponible",
    "Maintenance":"Mantenimiento",
    "Current AOG":"AOG actual",
    "SUPPLY":"SUMINISTRO",
    "MULTI-ROUTE":"MÚLTIPLES RUTAS",
    "CONSTRAINED":"LIMITADO",
    "Earlier investment provides sourcing optionality.":"Una inversión anterior aporta alternativas de suministro.",
    "Current system has limited sourcing optionality.":"El sistema actual tiene pocas alternativas de suministro.",
    "REPAIR LOOP":"BUCLE DE REPARACIÓN",
    "ENHANCED":"REFORZADO",
    "BASELINE":"BASE",
    "Repair capability has been strengthened.":"La capacidad de reparación se ha reforzado.",
    "Repair exists but has limited recovery depth.":"Existe reparación, pero con capacidad de recuperación limitada.",
    "DECISION FLOW":"FLUJO DE DECISIÓN",
    "STRUCTURED":"ESTRUCTURADO",
    "FRAGMENTED":"FRAGMENTADO",
    "Ownership and visibility are improving.":"La responsabilidad y la visibilidad están mejorando.",
    "Handovers remain a potential weakness.":"Los traspasos siguen siendo una posible debilidad.",
    "CURRENT EVENT":"EVENTO ACTUAL",
    "DECISION WINDOW":"VENTANA DE DECISIÓN",
    "Read constraints before committing an option.":"Lee las restricciones antes de confirmar una opción.",
    "CENTRAL STOCK":"STOCK CENTRAL",
    "REPAIR LOOP":"BUCLE DE REPARACIÓN",
    "DONOR AIRCRAFT":"AERONAVE DONANTE",
    "NEW SUPPLY":"NUEVO SUMINISTRO",
    "SELECT A ROUTE":"SELECCIONA UNA RUTA",
    "ROUTE EXECUTED":"RUTA EJECUTADA",
    "ROUTE SELECTED":"RUTA SELECCIONADA",
    "AWAITING DECISION":"ESPERANDO DECISIÓN",
    "INC-01 · RECOVERY ROUTE MAP":"INC-01 · MAPA DE RUTAS DE RECUPERACIÓN",
    "Where can a serviceable actuator come from?":"¿De dónde puede proceder un actuador apto para servicio?",
    "Follow the physical support routes before choosing. Selecting an option highlights the route; confirming it applies the system consequence.":"Sigue las rutas físicas de soporte antes de elegir. Seleccionar una opción resalta la ruta; confirmarla aplica la consecuencia al sistema.",
    "CENTRAL BUFFER USED":"RESERVA CENTRAL UTILIZADA",
    "REPAIR ROUTE ACTIVATED":"RUTA DE REPARACIÓN ACTIVADA",
    "CONTROLLED TRANSFER":"TRANSFERENCIA CONTROLADA",
    "STANDARD SUPPLY ROUTE":"RUTA DE SUMINISTRO ESTÁNDAR",
    "SYSTEM EFFECT":"EFECTO EN EL SISTEMA",
    "PREVIEW — NOT YET APPLIED":"VISTA PREVIA — AÚN NO APLICADA",
    "How to use this map":"Cómo usar este mapa",
    "Compare the four recovery routes with the 96-hour mission window. A route can recover the aircraft quickly and still weaken the wider support system.":"Compara las cuatro rutas de recuperación con la ventana de misión de 96 horas. Una ruta puede recuperar rápidamente la aeronave y, aun así, debilitar el sistema de soporte global.",
    "ROOT-CAUSE BOARD":"TABLERO DE CAUSA RAÍZ",
    "Move from the visible symptom to the controllable system condition":"Pasa del síntoma visible a la condición del sistema que sí puedes controlar",
    "VISIBLE EVENT":"EVENTO VISIBLE",
    "SUPPORT CONDITION":"CONDICIÓN DE SOPORTE",
    "CHANGED CONTEXT":"CONTEXTO MODIFICADO",
    "CONTROL GAP TO TEST":"BRECHA DE CONTROL A COMPROBAR",
    "DIAGNOSIS REVIEWED":"DIAGNÓSTICO REVISADO",
    "EVIDENCE STATUS":"ESTADO DE LA EVIDENCIA",
    "SYSTEMIC CAUSE FOUND":"CAUSA SISTÉMICA IDENTIFICADA",
    "REVISION REQUIRED":"REQUIERE REVISIÓN",
    "4 FACTS AVAILABLE":"4 DATOS DISPONIBLES",
    "DIAGNOSIS RESULT":"RESULTADO DEL DIAGNÓSTICO",
    "SELECTED HYPOTHESIS":"HIPÓTESIS SELECCIONADA",
    "FUTURE SYSTEM PREVIEW":"VISTA PREVIA DEL SISTEMA FUTURO",
    "Do not buy a score. Change one part of the operating system.":"No compres una puntuación. Cambia una parte del sistema operativo.",
    "CAPABILITY FUNDED":"CAPACIDAD FINANCIADA",
    "IMPROVEMENT BUDGET":"PRESUPUESTO DE MEJORA",
    "CURRENT STATE":"ESTADO ACTUAL",
    "FUNDED FUTURE STATE":"ESTADO FUTURO FINANCIADO",
    "SELECT A CAPABILITY":"SELECCIONA UNA CAPACIDAD",
    "No route selected":"Ninguna ruta seleccionada",
    "No hypothesis selected":"Ninguna hipótesis seleccionada",
    "No capability selected":"Ninguna capacidad seleccionada",
    "WHAT TO DO NOW":"QUÉ HACER AHORA",
    "Stabilise the operation":"Estabiliza la operación",
    "Diagnose the system":"Diagnostica el sistema",
    "Improve the future state":"Mejora el estado futuro",
    "Read the constraint":"Lee la restricción",
    "Compare trade-offs":"Compara los compromisos",
    "Commit one response":"Confirma una respuesta",
    "Separate event from cause":"Separa el evento de la causa",
    "Test the hypotheses":"Contrasta las hipótesis",
    "Confirm a controllable cause":"Confirma una causa controlable",
    "Check remaining budget":"Comprueba el presupuesto restante",
    "Preview the future state":"Previsualiza el estado futuro",
    "Build optionality":"Construye alternativas",
    "DECISION PLAYBACK":"REPRODUCCIÓN DE LA DECISIÓN",
    "See what your confirmed action changed":"Comprueba qué cambió tu acción confirmada",
    "Illustrative system logic · not operational data":"Lógica ilustrativa del sistema · no son datos operativos",
    "EARLIER DECISIONS ARE ACTIVE":"LAS DECISIONES ANTERIORES SIGUEN ACTIVAS",
    "OPTIONAL DETAIL":"DETALLE OPCIONAL",
    "System status":"Estado del sistema",
    "You do not need to memorise this dashboard. Open it only when you want more context for your decision.":"No necesitas memorizar este panel. Ábrelo solo cuando quieras más contexto para tu decisión.",
    "CONSTRAINTS":"RESTRICCIONES",
    "DECISION LENS":"ENFOQUE DE DECISIÓN",
    "BROADER CONTEXT · NOT SCORED":"CONTEXTO AMPLIADO · NO PUNTÚA",
    "Close this panel to return to your decision.":"Cierra este panel para volver a tu decisión.",
    "Back to my decision":"Volver a mi decisión",
    "MISSION COMPLETE":"MISIÓN COMPLETADA",
    "INSIGHT UNLOCKED":"APRENDIZAJE DESBLOQUEADO",
    "CAPABILITY BUILT":"CAPACIDAD DESARROLLADA",
    "NEXT MISSION":"SIGUIENTE MISIÓN",
    "ALL MISSIONS COMPLETE":"TODAS LAS MISIONES COMPLETADAS",
    "Your Sustainability & Readiness Review is ready":"Tu revisión de Sostenibilidad y Disponibilidad está lista",
    "See the pattern created by your five connected decisions.":"Observa el patrón creado por tus cinco decisiones conectadas.",
    "FINAL REVIEW":"REVISIÓN FINAL",
    "CONTINUE":"CONTINUAR",
    "See my strategy":"Ver mi estrategia",
    "SIMULATION COMPLETE · MONTH 18":"SIMULACIÓN COMPLETADA · MES 18",
    "Sustainability & Readiness Review":"Revisión de Sostenibilidad y Disponibilidad",
    "Review how your decisions shaped lifecycle performance, operational resilience, process maturity and material-related exposure across five connected incidents.":"Revisa cómo tus decisiones influyeron en el ciclo de vida, la resiliencia operativa, la madurez del proceso y la exposición asociada a materiales a lo largo de cinco incidentes conectados.",
    "STRATEGY PROFILE":"PERFIL DE ESTRATEGIA",
    "Strength:":"Fortaleza:",
    "Watch point:":"Punto de atención:",
    "MISSION BADGES":"INSIGNIAS DE MISIÓN",
    "Replay with a different strategy to see how early investments change later constraints.":"Repite con otra estrategia para comprobar cómo las inversiones tempranas cambian las restricciones posteriores.",
    "Print / save review":"Imprimir / guardar revisión",
    "Replay simulation":"Repetir simulación",
    "Final operating position":"Posición operativa final",
    "Remaining improvement budget":"Presupuesto de mejora restante",
    "Capabilities funded":"Capacidades financiadas",
    "SUSTAINABILITY TOOLKIT UNLOCKED":"HERRAMIENTAS DE SOSTENIBILIDAD DESBLOQUEADAS",
    "Five ideas to take back to real aerospace work":"Cinco ideas para llevar al trabajo aeroespacial real",
    "Lifecycle thinking":"Pensamiento de ciclo de vida",
    "Operational circularity":"Circularidad operativa",
    "Responsible sourcing":"Aprovisionamiento responsable",
    "Design ↔ In-Service learning":"Aprendizaje Diseño ↔ In-Service",
    "System resilience":"Resiliencia del sistema",
    "YOUR 18-MONTH DECISION JOURNEY":"TU RECORRIDO DE DECISIONES DE 18 MESES",
    "What you did, what you diagnosed, what you changed":"Qué hiciste, qué diagnosticastes y qué cambiaste",
    "QUICK HELP · DOES NOT RESTART THE BRIEFING":"AYUDA RÁPIDA · NO REINICIA LA INTRODUCCIÓN",
    "BEFORE YOU START":"ANTES DE EMPEZAR",
    "Choose how much guidance you need":"Elige cuánta orientación necesitas",
    "CURRENT PHASE · OPERATE":"FASE ACTUAL · OPERAR",
    "Stabilise the immediate situation":"Estabiliza la situación inmediata",
    "CURRENT PHASE · INVESTIGATE":"FASE ACTUAL · INVESTIGAR",
    "Look behind the symptom":"Mira más allá del síntoma",
    "CURRENT PHASE · IMPROVE":"FASE ACTUAL · MEJORAR",
    "Change the future state":"Cambia el estado futuro",
    "SIMULATION COMPLETE":"SIMULACIÓN COMPLETADA",
    "Read the pattern, not a single score":"Lee el patrón, no una única puntuación",
    "OPERATE":"OPERAR",
    "INVESTIGATE":"INVESTIGAR",
    "IMPROVE":"MEJORAR",
    "READ THE DASHBOARD":"LEE EL PANEL",
    "Three rules to remember":"Tres reglas que recordar",
    "Closing this panel returns you to exactly where you were.":"Cerrar este panel te devuelve exactamente al punto en el que estabas.",
    "Return to simulation":"Volver a la simulación",
    "Reset the full 18-month simulation and erase saved progress on this device?":"¿Reiniciar toda la simulación de 18 meses y borrar el progreso guardado en este dispositivo?"
  };

  Object.assign(exact,{
    "ORA · AEROSPACE SUSTAINABILITY COACH":"ORA · GUÍA DE SOSTENIBILIDAD AEROESPACIAL",
    "Next tip →":"Siguiente consejo →",
    "WHY THIS MATTERS FOR SUSTAINABILITY":"POR QUÉ ESTO IMPORTA PARA LA SOSTENIBILIDAD",
    "Key idea":"Idea clave",
    "WHY THIS CAPABILITY MATTERS":"POR QUÉ IMPORTA ESTA CAPACIDAD",
    "It stays active in later missions and changes the system rather than only the current event.":"Permanece activa en misiones posteriores y cambia el sistema, no solo el evento actual.",
    "AEROSPACE SUSTAINABILITY · LEARNING MAP":"SOSTENIBILIDAD AEROESPACIAL · MAPA DE APRENDIZAJE",
    "What sustainability means in this simulator":"Qué significa sostenibilidad en este simulador",
    "The simulation teaches sustainability as a system property":"La simulación enseña la sostenibilidad como una propiedad del sistema",
    "Use the whole life of an asset":"Aprovecha toda la vida de un activo",
    "Repair, recovery, useful-life extension, modularity and design feedback influence how much value is extracted from components already in the system.":"La reparación, recuperación, extensión de vida útil, modularidad y retorno al diseño influyen en cuánto valor se obtiene de los componentes que ya están en el sistema.",
    "Build resilience, not just stock":"Construye resiliencia, no solo stock",
    "Supplier concentration, critical materials, lead time, repair routes and qualified alternatives determine how the system absorbs disruption.":"La concentración de proveedores, los materiales críticos, los plazos, las rutas de reparación y las alternativas cualificadas determinan cómo absorbe el sistema las interrupciones.",
    "Understand upstream dependencies":"Comprende las dependencias aguas arriba",
    "Ecosystem-sensitive sourcing can affect permitting, traceability and supply continuity. The game treats this as a decision-relevant risk, not a decorative nature claim.":"El aprovisionamiento sensible a ecosistemas puede afectar a permisos, trazabilidad y continuidad del suministro. El juego lo trata como un riesgo relevante para la decisión, no como una afirmación decorativa sobre naturaleza.",
    "PROCESS & DESIGN":"PROCESO Y DISEÑO",
    "Prevent recurrence":"Evita la repetición",
    "Good ownership, root-cause closure and feedback to engineering can reduce repeated interventions and improve long-term performance.":"Una responsabilidad clara, el cierre de causa raíz y el retorno a ingeniería pueden reducir intervenciones repetidas y mejorar el rendimiento a largo plazo.",
    "And what about CO₂, energy, water, waste or VOCs?":"¿Y qué ocurre con CO₂, energía, agua, residuos o COV?",
    "They can appear when relevant to a decision, but no level is dedicated exclusively to one of them. The simulator keeps the learning cross-functional and lifecycle-based.":"Pueden aparecer cuando sean relevantes para una decisión, pero ningún nivel está dedicado exclusivamente a uno de ellos. El simulador mantiene un aprendizaje transversal y basado en ciclo de vida.",
    "Got it":"Entendido",
    "EXPLORE THE DECISION LOOP":"EXPLORA EL BUCLE DE DECISIÓN",
    "See how one incident becomes a system decision":"Comprueba cómo un incidente se convierte en una decisión de sistema",
    "This is a quick orientation, not the guided briefing. It shows the logic you will repeat during every simulated incident.":"Esta es una orientación rápida, no la introducción guiada. Muestra la lógica que repetirás en cada incidente simulado.",
    "Stabilise the situation":"Estabiliza la situación",
    "Read the mission constraint, available support routes and immediate trade-offs. Choose a credible response.":"Lee la restricción de misión, las rutas de soporte disponibles y los compromisos inmediatos. Elige una respuesta creíble.",
    "Use process and support information to identify why the system became exposed. A fast recovery is not automatically a root-cause fix.":"Usa la información de proceso y soporte para identificar por qué quedó expuesto el sistema. Una recuperación rápida no resuelve automáticamente la causa raíz.",
    "Spend limited improvement budget on capabilities such as repair, stock logic, process ownership, sourcing resilience or design feedback.":"Invierte el presupuesto de mejora limitado en capacidades como reparación, lógica de stock, responsabilidad de proceso, resiliencia de aprovisionamiento o retorno al diseño.",
    "Then the simulator remembers.":"Después, el simulador lo recuerda.",
    "Your later incidents are affected by the capabilities you funded — and by the gaps you left unresolved.":"Los incidentes posteriores se ven afectados por las capacidades que financiaste y por las brechas que dejaste sin resolver.",
    "Back to landing page":"Volver a la portada",
    "Start simulation now":"Iniciar simulación ahora",
    "Start guided briefing":"Iniciar introducción guiada",
    "INC-02 · REPAIR FLOW":"INC-02 · FLUJO DE REPARACIÓN",
    "The queue is visible. Where is work actually waiting?":"La cola es visible. ¿Dónde está esperando realmente el trabajo?",
    "Four removed units are in the system, but available bench capacity does not automatically mean the flow is healthy. Track where decisions stop moving.":"Hay cuatro unidades retiradas en el sistema, pero disponer de capacidad en banco no significa que el flujo sea saludable. Localiza dónde dejan de avanzar las decisiones.",
    "REMOVED UNIT":"UNIDAD RETIRADA",
    "4 units":"4 unidades",
    "Incoming demand continues":"La demanda entrante continúa",
    "TECHNICAL DISPOSITION":"DECISIÓN TÉCNICA",
    "11-day oldest wait":"La espera más antigua es de 11 días",
    "Missing inputs / authority / owner":"Faltan entradas / autoridad / responsable",
    "BOTTLENECK":"CUELLO DE BOTELLA",
    "REPAIR BENCH":"BANCO DE REPARACIÓN",
    "Capacity available":"Capacidad disponible",
    "Two units likely quick repairs":"Dos unidades probablemente de reparación rápida",
    "RETURN TO SERVICE":"RETORNO AL SERVICIO",
    "Potential recovery":"Recuperación potencial",
    "Flow depends on disposition":"El flujo depende de la decisión técnica",
    "Learning point":"Punto de aprendizaje",
    "A queue can be caused by decision latency rather than physical repair capacity. Adding people or ordering replacements may bypass the visible backlog without fixing the flow.":"Una cola puede deberse a la latencia de decisión y no a la capacidad física de reparación. Añadir personas o pedir repuestos puede evitar la cola visible sin arreglar el flujo.",
    "AWAITING EVIDENCE":"ESPERANDO EVIDENCIA",
    "INC-03 · SOURCING DEPENDENCY MAP":"INC-03 · MAPA DE DEPENDENCIA DE APROVISIONAMIENTO",
    "Biodiversity-related pressure enters the game as a supply dependency":"La presión relacionada con biodiversidad entra en el juego como una dependencia de suministro",
    "The ecosystem issue is not turned into a marketing claim. It appears because permitting, traceability and concentration can change lead time and therefore affect operational resilience.":"La cuestión de ecosistemas no se convierte en una afirmación de marketing. Aparece porque permisos, trazabilidad y concentración pueden cambiar el plazo y afectar a la resiliencia operativa.",
    "TRACEABILITY":"TRAZABILIDAD",
    "UPSTREAM REGION":"REGIÓN AGUAS ARRIBA",
    "Ecosystem-sensitive sourcing context":"Contexto de aprovisionamiento sensible a ecosistemas",
    "New permitting constraints":"Nuevas restricciones de permisos",
    "UPSTREAM SUPPLY":"SUMINISTRO AGUAS ARRIBA",
    "Qualified source 1":"1 fuente cualificada",
    "Lead time 16 → 28 weeks":"Plazo 16 → 28 semanas",
    "IN-SERVICE SYSTEM":"SISTEMA IN-SERVICE",
    "SECOND SOURCE":"SEGUNDA FUENTE",
    "RECOVERY":"RECUPERACIÓN",
    "INC-04 · DESIGN ↔ IN-SERVICE FEEDBACK LOOP":"INC-04 · BUCLE DE RETORNO DISEÑO ↔ IN-SERVICE",
    "When repeated events become an engineering signal":"Cuando los eventos repetidos se convierten en una señal para ingeniería",
    "Case-by-case recovery keeps aircraft moving, but recurring demand should eventually cross a trigger and become structured evidence for engineering review.":"La recuperación caso por caso mantiene las aeronaves operativas, pero la demanda recurrente debe terminar activando evidencia estructurada para revisión de ingeniería.",
    "FEEDBACK LOOP":"BUCLE DE RETORNO",
    "IN-SERVICE":"IN-SERVICE",
    "Repeated removals":"Retiradas repetidas",
    "Operational evidence accumulates":"Se acumula evidencia operacional",
    "SUPPORT":"SOPORTE",
    "Immediate cases are recovered":"Se recuperan los casos inmediatos",
    "DATA":"DATOS",
    "ENGINEERING":"INGENIERÍA",
    "Reliability · modularity · accessibility · repairability":"Fiabilidad · modularidad · accesibilidad · reparabilidad",
    "INC-05 · RESILIENCE STRESS TEST":"INC-05 · PRUEBA DE ESTRÉS DE RESILIENCIA",
    "The final event tests the options you built before the shock":"El evento final pone a prueba las opciones que construiste antes del impacto",
    "Two AOGs, constrained supply and high repair workload arrive together. The question is no longer which single action is best, but how many independent recovery routes remain credible.":"Llegan a la vez dos AOG, suministro limitado y alta carga de reparación. La pregunta ya no es qué única acción es mejor, sino cuántas rutas independientes de recuperación siguen siendo creíbles.",
    "STRUCTURAL OPTIONALITY":"ALTERNATIVAS ESTRUCTURALES",
    "COMBINED SHOCK":"IMPACTO COMBINADO",
    "2 AOG + constrained supplier + high repair load":"2 AOG + proveedor limitado + alta carga de reparación",
    "Mission window: 5 days":"Ventana de misión: 5 días",
    "ACTUATOR REMOVED":"ACTUADOR RETIRADO",
    "MISSION WINDOW":"VENTANA DE MISIÓN",
    "96 HOURS":"96 HORAS",
    "INCIDENT AT A GLANCE":"INCIDENTE DE UN VISTAZO",
    "One aircraft is unavailable. A critical actuator has been removed. You have 96 hours to restore capability.":"Una aeronave no está disponible. Se ha retirado un actuador crítico. Tienes 96 horas para recuperar la capacidad.",
    "Your first task is not to solve sustainability in general. It is to choose a credible recovery route — then learn the lifecycle consequence of that choice.":"Tu primera tarea no es resolver la sostenibilidad en general. Es elegir una ruta de recuperación creíble y después aprender la consecuencia de ciclo de vida de esa elección.",
    "PHASE":"FASE",
    "BUDGET":"PRESUPUESTO",
    "SYSTEM DATA":"DATOS DEL SISTEMA",
    "LIVE MISSION":"MISIÓN ACTIVA",
    "MISSION OBJECTIVE":"OBJETIVO DE MISIÓN",
    "SUSTAINABILITY LENS":"ENFOQUE DE SOSTENIBILIDAD",
    "YOUR MOVE":"TU DECISIÓN",
    "Choose → confirm → see the consequence":"Elige → confirma → observa la consecuencia",
    "MAKE THE CALL":"TOMA LA DECISIÓN",
    "Make the call":"Toma la decisión",
    "What do you do now?":"¿Qué haces ahora?",
    "Choose one immediate response. Your goal is to protect readiness without ignoring the lifecycle consequence.":"Elige una respuesta inmediata. Tu objetivo es proteger la disponibilidad sin ignorar la consecuencia de ciclo de vida.",
    "FIND THE HIDDEN CAUSE":"ENCUENTRA LA CAUSA OCULTA",
    "Find the hidden cause":"Encuentra la causa oculta",
    "Why was the system exposed?":"¿Por qué quedó expuesto el sistema?",
    "The event is not the root cause. Find the process, planning or support condition that made the disruption harder to absorb.":"El evento no es la causa raíz. Identifica la condición de proceso, planificación o soporte que hizo más difícil absorber la interrupción.",
    "BUILD THE FUTURE":"CONSTRUYE EL FUTURO",
    "Build the future":"Construye el futuro",
    "What do you improve next?":"¿Qué mejoras ahora?",
    "Spend limited budget on one capability that will still matter in later missions.":"Invierte el presupuesto limitado en una capacidad que siga siendo útil en misiones posteriores.",
    "RESPOND":"RESPONDER",
    "INVESTIGATE":"INVESTIGAR",
    "IMPROVE":"MEJORAR",
    "CURRENT PHASE · RESPOND":"FASE ACTUAL · RESPONDER",
    "CURRENT PHASE · INVESTIGATE":"FASE ACTUAL · INVESTIGAR",
    "CURRENT PHASE · IMPROVE":"FASE ACTUAL · MEJORAR",
    "MISSION SCENE":"ESCENA DE MISIÓN",
    "Mission scene":"Escena de misión",
    "96-HOUR WINDOW":"VENTANA DE 96 HORAS",
    "REPAIR FLOW":"FLUJO DE REPARACIÓN",
    "QUEUE PRESSURE":"PRESIÓN EN LA COLA",
    "SUPPLY CONTINUITY":"CONTINUIDAD DEL SUMINISTRO",
    "SOURCE CONSTRAINT":"RESTRICCIÓN DE SUMINISTRO",
    "RECURRING SIGNAL":"SEÑAL RECURRENTE",
    "SYSTEM RESILIENCE":"RESILIENCIA DEL SISTEMA",
    "Maintenance team evaluating an AOG recovery route in a hangar":"Equipo de mantenimiento evaluando una ruta de recuperación AOG en un hangar",
    "Aerospace repair centre coordinating a component repair flow":"Centro de reparación aeronáutica coordinando el flujo de reparación de un componente",
    "Procurement and engineering specialists assessing material traceability":"Especialistas de compras e ingeniería evaluando la trazabilidad de materiales",
    "Engineering and maintenance specialists reviewing recurring failure evidence":"Especialistas de ingeniería y mantenimiento revisando evidencias de fallos recurrentes",
    "Operations team coordinating two aircraft during a resilience stress test":"Equipo de operaciones coordinando dos aeronaves durante una prueba de resiliencia",
    "ORA, your aerospace sustainability guide":"ORA, tu guía de sostenibilidad aeroespacial",
    "ORA, aerospace sustainability guide":"ORA, guía de sostenibilidad aeroespacial",
    "1. Read the operational constraint. 2. Choose an action. 3. Accept the trade-off. 4. Investigate why the system was exposed. 5. Invest to change the future state.":"1. Lee la restricción operativa. 2. Elige una acción. 3. Acepta el compromiso. 4. Investiga por qué quedó expuesto el sistema. 5. Invierte para cambiar el estado futuro.",
    "14-week lead time":"Plazo de 14 semanas",
    "2 serviceable units":"2 unidades aptas para servicio",
    "5 / 5 concepts":"5 / 5 conceptos",
    ": the ability to maintain operational capability while improving lifecycle use, resilience, sourcing awareness and process quality over time.":": la capacidad de mantener la operatividad mientras se mejora con el tiempo el uso del ciclo de vida, la resiliencia, el conocimiento del aprovisionamiento y la calidad de los procesos.",
    "A component can be technically repairable and still be replaced unnecessarily if it waits for information, ownership or disposition.":"Un componente puede ser técnicamente reparable y, aun así, sustituirse innecesariamente si queda esperando información, responsabilidad o una decisión técnica.",
    "A feedback trigger converts recurring operational evidence into structured reliability, maintainability and repairability review.":"Un criterio de activación convierte la evidencia operativa recurrente en una revisión estructurada de fiabilidad, mantenibilidad y reparabilidad.",
    "A recurring problem is a sustainability problem":"Un problema recurrente es un problema de sostenibilidad",
    "A repair route exists, so replacement is not the only recovery mechanism.":"Existe una ruta de reparación, por lo que la sustitución no es el único mecanismo de recuperación.",
    "AC 02":"AC 02",
    "AFFECTED LOCATION":"UBICACIÓN AFECTADA",
    "AOG":"AOG",
    "Actuator fault":"Fallo del actuador",
    "Actuator removed after fault indication":"Actuador retirado tras la indicación de fallo",
    "Approved transfer possible with configuration control":"Transferencia aprobada posible con control de configuración",
    "Available, but not a planned resilience loop":"Disponible, pero no como circuito de resiliencia planificado",
    "BIODIVERSITY":"BIODIVERSIDAD",
    "Build capabilities that keep assets useful":"Desarrolla capacidades que mantengan útiles los activos",
    "CENTRAL HUB":"CENTRO LOGÍSTICO",
    "Central stock is limited and shared.":"El stock central es limitado y compartido.",
    "Circularity needs infrastructure and governance":"La circularidad necesita infraestructura y gobernanza",
    "Compare operational recovery with component life, repairability, stock resilience and dependence on newly supplied material.":"Compara la recuperación operativa con la vida del componente, la reparabilidad, la resiliencia del stock y la dependencia de material nuevo.",
    "Connect the operational choice to its lifecycle consequence":"Relaciona la decisión operativa con su consecuencia de ciclo de vida",
    "Creates an AOG and a demand for one serviceable unit.":"Genera un AOG y la demanda de una unidad apta para servicio.",
    "Cross-functional handovers":"Traspasos entre funciones",
    "Design choices shape future support impacts":"Las decisiones de diseño condicionan los impactos futuros del soporte",
    "Each investment persists into later months. Select a capability below to preview which control it changes before you spend budget.":"Cada inversión permanece activa durante los meses siguientes. Selecciona una capacidad para ver qué control modifica antes de gastar presupuesto.",
    "Earlier decision effect":"Efecto de una decisión anterior",
    "Evidence 01":"Evidencia 01",
    "Evidence 02":"Evidencia 02",
    "Evidence 03":"Evidencia 03",
    "Evidence 04":"Evidencia 04",
    "Fast recovery — but you consumed resilience":"Recuperación rápida, pero consumiste resiliencia",
    "Hi, I’m ORA":"Hola, soy ORA",
    "INC-01 · FUTURE SYSTEM PREVIEW":"INC-01 · VISTA PREVIA DEL SISTEMA FUTURO",
    "INC-01 · ROOT-CAUSE BOARD":"INC-01 · TABLERO DE CAUSA RAÍZ",
    "INSPECT / REPAIR":"INSPECCIONAR / REPARAR",
    "Inspection available":"Inspección disponible",
    "Inspection possible":"Inspección posible",
    "LIFECYCLE":"CICLO DE VIDA",
    "LOCAL STOCK":"STOCK LOCAL",
    "Lead-time change not fully reflected":"Cambio de plazo aún no reflejado por completo",
    "Lifecycle preservation — but the mission window is missed":"Preservas el ciclo de vida, pero incumples la ventana de misión",
    "Look beyond the immediate AOG":"Mira más allá del AOG inmediato",
    "Look for the relationship between readiness, repair, materials, supply-chain dependency, process quality and long-term system resilience.":"Busca la relación entre disponibilidad, reparación, materiales, dependencia de la cadena de suministro, calidad de los procesos y resiliencia del sistema a largo plazo.",
    "MAINT AC":"AERONAVE EN MANTENIMIENTO",
    "Material sourcing, ecosystem sensitivity, permitting and traceability can affect lead time and continuity. Sustainability and supply resilience are linked.":"El origen de los materiales, la sensibilidad de los ecosistemas, los permisos y la trazabilidad pueden afectar al plazo y a la continuidad. La sostenibilidad y la resiliencia del suministro están conectadas.",
    "Move from “what failed?” to “what system condition made the failure difficult to absorb?”. Prevention can reduce repeated interventions and avoidable demand.":"Pasa de «¿qué falló?» a «¿qué condición del sistema hizo difícil absorber el fallo?». La prevención puede reducir intervenciones repetidas y demanda evitable.",
    "No single stock level or supplier can absorb every shock. Resilience comes from multiple credible routes, information and coordinated decisions.":"Ningún nivel de stock ni proveedor único puede absorber todos los impactos. La resiliencia nace de múltiples rutas creíbles, información y decisiones coordinadas.",
    "ORA":"ORA",
    "One aircraft is unavailable. A local serviceable spare can recover it inside the 6-hour mission window.":"Una aeronave no está disponible. Un repuesto local apto puede recuperarla dentro de la ventana de misión de 6 horas.",
    "Operation and design cannot learn in isolation":"Operación y diseño no pueden aprender de forma aislada",
    "Ownership":"Responsabilidad",
    "Planning + repair controls":"Controles de planificación y reparación",
    "Preserve stock, but miss the 6-hour mission window.":"Conserva el stock, pero incumple la ventana de misión de 6 horas.",
    "Protect local stock, but draw down a shared fleet buffer.":"Protege el stock local, pero consume una reserva compartida de flota.",
    "RECOVERY OPTIONS":"OPCIONES DE RECUPERACIÓN",
    "REPAIR CENTRE":"CENTRO DE REPARACIÓN",
    "REPLENISHMENT":"REPOSICIÓN",
    "RETURN":"RETORNO",
    "Recover the aircraft quickly, but consume the local buffer.":"Recupera la aeronave rápidamente, pero consume la reserva local.",
    "Recurring removals consume repair capacity, material and planning effort. Sustainable lifecycle management turns field evidence into engineering action.":"Las retiradas recurrentes consumen capacidad de reparación, material y esfuerzo de planificación. La gestión sostenible del ciclo de vida convierte la evidencia de campo en acción de ingeniería.",
    "Reduce dependency with qualified alternatives and recovery":"Reduce la dependencia con alternativas cualificadas y recuperación",
    "Reliability, modularity, accessibility and repairability influence how often components are removed, replaced, transported, tested and recovered over their life.":"La fiabilidad, la modularidad, la accesibilidad y la reparabilidad influyen en la frecuencia con que los componentes se retiran, sustituyen, transportan, prueban y recuperan durante su vida útil.",
    "Repair":"Reparación",
    "Repair capability, smarter stock logic and clear ownership can extend useful life while making the support system more resilient.":"La capacidad de reparación, una lógica de stock más inteligente y una responsabilidad clara pueden prolongar la vida útil y hacer más resiliente el sistema de soporte.",
    "Repair is not yet optimised as a planned control.":"La reparación aún no está optimizada como control planificado.",
    "Repair only creates value when the process flows":"La reparación solo crea valor cuando el proceso fluye",
    "Repair route exists but is not optimised":"Existe una ruta de reparación, pero no está optimizada",
    "Repair would take 36 hours. Central stock is available, but using it would consume a shared buffer.":"La reparación tardaría 36 horas. Hay stock central disponible, pero usarlo consumiría una reserva compartida.",
    "Repeated In-Service demand should feed design learning":"La demanda In-Service repetida debe alimentar el aprendizaje de diseño",
    "Replenishment takes longer than the planning environment originally assumed.":"La reposición tarda más de lo que asumía originalmente la planificación.",
    "Request central stock immediately":"Solicitar stock central de inmediato",
    "Requesting central stock can recover the aircraft quickly, but it transfers scarcity from one location to the wider support network. The simulator treats this as a trade-off, not a free solution. Later incidents may expose the buffer you consumed today.":"Solicitar stock central puede recuperar la aeronave rápidamente, pero traslada la escasez de una ubicación a toda la red de soporte. El simulador lo trata como un compromiso, no como una solución gratuita. Incidentes posteriores pueden dejar al descubierto la reserva que consumes hoy.",
    "Resilience is a property of the whole support system":"La resiliencia es una propiedad de todo el sistema de soporte",
    "SUPPLIER":"PROVEEDOR",
    "SUSTAINABILITY CONCEPT · CIRCULARITY & RESILIENCE":"CONCEPTO DE SOSTENIBILIDAD · CIRCULARIDAD Y RESILIENCIA",
    "SUSTAINABILITY CONCEPT · CLOSED-LOOP LEARNING":"CONCEPTO DE SOSTENIBILIDAD · APRENDIZAJE EN BUCLE CERRADO",
    "SUSTAINABILITY CONCEPT · CONTINUOUS IMPROVEMENT":"CONCEPTO DE SOSTENIBILIDAD · MEJORA CONTINUA",
    "SUSTAINABILITY CONCEPT · DEPENDENCY & TRACEABILITY":"CONCEPTO DE SOSTENIBILIDAD · DEPENDENCIA Y TRAZABILIDAD",
    "SUSTAINABILITY CONCEPT · DESIGN FOR THE LIFECYCLE":"CONCEPTO DE SOSTENIBILIDAD · DISEÑO PARA EL CICLO DE VIDA",
    "SUSTAINABILITY CONCEPT · ECO-DESIGN IN PRACTICE":"CONCEPTO DE SOSTENIBILIDAD · ECODISEÑO EN LA PRÁCTICA",
    "SUSTAINABILITY CONCEPT · ENABLE CIRCULARITY":"CONCEPTO DE SOSTENIBILIDAD · HABILITAR LA CIRCULARIDAD",
    "SUSTAINABILITY CONCEPT · LIFECYCLE THINKING":"CONCEPTO DE SOSTENIBILIDAD · PENSAMIENTO DE CICLO DE VIDA",
    "SUSTAINABILITY CONCEPT · OPERATIONAL CIRCULARITY":"CONCEPTO DE SOSTENIBILIDAD · CIRCULARIDAD OPERATIVA",
    "SUSTAINABILITY CONCEPT · PREVENTION":"CONCEPTO DE SOSTENIBILIDAD · PREVENCIÓN",
    "SUSTAINABILITY CONCEPT · PROCESS EFFICIENCY":"CONCEPTO DE SOSTENIBILIDAD · EFICIENCIA DE PROCESOS",
    "SUSTAINABILITY CONCEPT · RESPONSIBLE SOURCING":"CONCEPTO DE SOSTENIBILIDAD · APROVISIONAMIENTO RESPONSABLE",
    "SUSTAINABILITY CONCEPT · SOURCING OPTIONALITY":"CONCEPTO DE SOSTENIBILIDAD · ALTERNATIVAS DE APROVISIONAMIENTO",
    "SUSTAINABILITY CONCEPT · SYSTEM RESILIENCE":"CONCEPTO DE SOSTENIBILIDAD · RESILIENCIA DEL SISTEMA",
    "SUSTAINABILITY CONCEPT · SYSTEMS THINKING":"CONCEPTO DE SOSTENIBILIDAD · PENSAMIENTO SISTÉMICO",
    "SUSTAINABILITY LEARNING":"APRENDIZAJE DE SOSTENIBILIDAD",
    "Scheduled maintenance":"Mantenimiento programado",
    "Second sources, deeper traceability and component recovery reduce different parts of upstream dependency while keeping technical qualification intact.":"Las segundas fuentes, una trazabilidad más profunda y la recuperación de componentes reducen distintas partes de la dependencia aguas arriba manteniendo intacta la cualificación técnica.",
    "Select one option. The purpose is to learn how the simulator explains trade-offs — not to find a magic “green” answer.":"Selecciona una opción. El objetivo es aprender cómo explica el simulador los compromisos, no encontrar una respuesta «verde» mágica.",
    "Separate the external hazard from your vulnerability":"Distingue el peligro externo de tu vulnerabilidad",
    "Shared across multiple locations":"Compartido entre varias ubicaciones",
    "Standard procurement route":"Ruta estándar de adquisición",
    "Stress tests, lifecycle portfolios and resilience governance keep assumptions visible and convert incident learning into future prevention.":"Las pruebas de estrés, las carteras de ciclo de vida y la gobernanza de la resiliencia mantienen visibles las hipótesis y convierten el aprendizaje de los incidentes en prevención futura.",
    "Supplier lead time increased":"Ha aumentado el plazo del proveedor",
    "Supply planning":"Planificación del suministro",
    "Sustainability coach":"Guía de sostenibilidad",
    "Sustainability must survive simultaneous pressure":"La sostenibilidad debe resistir presiones simultáneas",
    "Sustainable operations improve the flow of existing assets through safe, controlled processes instead of compensating for weak handovers with more hardware.":"Las operaciones sostenibles mejoran el flujo de los activos existentes mediante procesos seguros y controlados, en lugar de compensar traspasos deficientes con más equipos.",
    "TIER 1":"NIVEL 1",
    "The actuator failure triggered the event. Your diagnosis must explain why the support system could not absorb one failure without entering a stock emergency.":"El fallo del actuador desencadenó el evento. Tu diagnóstico debe explicar por qué el sistema de soporte no pudo absorber un fallo sin entrar en una emergencia de stock.",
    "The aircraft may already be recovered, but the system can still be exposed. Use the evidence provided to identify the process, support or sourcing condition that made the incident possible.":"Puede que la aeronave ya esté recuperada, pero el sistema puede seguir expuesto. Usa la evidencia disponible para identificar la condición de proceso, soporte o aprovisionamiento que hizo posible el incidente.",
    "The current lead time is 14 weeks.":"El plazo actual es de 14 semanas.",
    "The event immediately exposes the location to another recovery route.":"El evento obliga inmediatamente a la ubicación a recurrir a otra ruta de recuperación.",
    "The final mission tests whether repair, stock, sourcing, process and design choices created enough optionality to protect capability without exhausting every buffer.":"La misión final comprueba si las decisiones de reparación, stock, aprovisionamiento, proceso y diseño crearon suficientes alternativas para proteger la capacidad sin agotar todas las reservas.",
    "The permitting change is external. Single-source concentration and incomplete traceability determine how exposed your support system is to that change.":"El cambio de permisos es externo. La concentración en una única fuente y la trazabilidad incompleta determinan hasta qué punto queda expuesto tu sistema de soporte.",
    "The simulation teaches sustainability as a":"El simulador presenta la sostenibilidad como una",
    "This simulator uses fictional scenarios and simplified learning logic. It is designed to support discussion about trade-offs, process maturity, lifecycle thinking, sourcing dependency and biodiversity-related supply risk. Water, waste, energy, CO2 and VOC considerations may be mentioned where relevant, but they are secondary context rather than standalone objectives. This is not an operational decision-support tool.":"Este simulador utiliza escenarios ficticios y una lógica de aprendizaje simplificada. Está diseñado para apoyar el debate sobre compromisos, madurez de procesos, pensamiento de ciclo de vida, dependencia del aprovisionamiento y riesgos de suministro relacionados con la biodiversidad. Las consideraciones sobre agua, residuos, energía, CO2 y COV pueden aparecer cuando sean relevantes, pero actúan como contexto secundario y no como objetivos independientes. No es una herramienta operativa de apoyo a decisiones.",
    "Turn lessons into a repeatable management system":"Convierte las lecciones en un sistema de gestión repetible",
    "Upstream conditions can become operational constraints":"Las condiciones aguas arriba pueden convertirse en restricciones operativas",
    "Use Start simulation now if you want to enter the control room immediately. Use Start guided briefing if you want the full tutorial and practice round. Explore the decision loop is only a short concept overview.":"Usa «Iniciar simulación ahora» si quieres entrar directamente en la sala de control. Usa «Iniciar introducción guiada» si prefieres el tutorial completo y una ronda de práctica. «Explorar el ciclo de decisión» ofrece solo una breve vista conceptual.",
    "Use the local serviceable spare":"Usar el repuesto local apto",
    "Using the local spare is operationally credible inside the six-hour window. Readiness improves immediately, while the local buffer becomes thinner. In the real simulation, the next question would be: why was only one spare available, and what systemic action should prevent repeated exposure?":"Usar el repuesto local es operativamente viable dentro de la ventana de seis horas. La disponibilidad mejora de inmediato, mientras se reduce la reserva local. En la simulación real, la siguiente pregunta sería: ¿por qué solo había un repuesto disponible y qué acción sistémica debe evitar que se repita la exposición?",
    "Visibility, decision standards and flexible repair capacity turn repair from an ad-hoc option into a repeatable lifecycle capability.":"La visibilidad, los criterios de decisión y una capacidad de reparación flexible convierten la reparación de una opción improvisada en una capacidad repetible de ciclo de vida.",
    "Wait for repair completion":"Esperar a que termine la reparación",
    "Waiting and rework consume capability":"Las esperas y los retrabajos consumen capacidad",
    "Waiting for repair preserves stock and uses an existing recovery route, but it does not meet the immediate operational constraint. The simulator will not reward lifecycle logic if it ignores mission readiness. Sustainability and operational credibility must be considered together.":"Esperar a la reparación conserva el stock y utiliza una ruta de recuperación existente, pero no cumple la restricción operativa inmediata. El simulador no premiará una lógica de ciclo de vida que ignore la disponibilidad de misión. La sostenibilidad y la credibilidad operativa deben evaluarse juntas.",
    "Were stock parameters and repair recovery adapted when the supply context changed?":"¿Se adaptaron los parámetros de stock y la recuperación por reparación cuando cambió el contexto de suministro?",
    "What is your immediate operational move?":"¿Cuál es tu respuesta operativa inmediata?",
    "You do":"No",
    "You moved the pressure to the central buffer":"Trasladaste la presión a la reserva central",
    "need to memorise this dashboard. Open it only when you want more context for your decision.":"necesitas memorizar este panel. Ábrelo solo cuando quieras más contexto para tu decisión.",
    "not":" ",
    "system property":"propiedad del sistema",
    "tip":"consejo",
    "Restore one aircraft within 96 hours":"Recupera una aeronave en 96 horas",
    "Recover capability without simply transferring the problem into stock, repair or future maintenance.":"Recupera la capacidad sin limitarte a trasladar el problema al stock, la reparación o el mantenimiento futuro.",
    "Unblock the repair flow":"Desbloquea el flujo de reparación",
    "Return recoverable units to service safely without defaulting to unnecessary replacement.":"Devuelve al servicio de forma segura las unidades recuperables sin recurrir por defecto a sustituciones innecesarias.",
    "Protect supply continuity":"Protege la continuidad del suministro",
    "Manage a biodiversity-related sourcing disruption while reducing single-source and traceability exposure.":"Gestiona una interrupción de aprovisionamiento relacionada con biodiversidad reduciendo la exposición a fuente única y falta de trazabilidad.",
    "Break the recurring-failure cycle":"Rompe el ciclo de fallos recurrentes",
    "Protect current readiness while turning repeated In-Service evidence into structured design learning.":"Protege la disponibilidad actual mientras conviertes evidencia In-Service repetida en aprendizaje estructurado de diseño.",
    "Absorb the combined shock":"Absorbe el impacto combinado",
    "Recover capability while preserving enough optionality for the system to keep responding.":"Recupera capacidad manteniendo suficientes alternativas para que el sistema siga respondiendo.",
    "DECISION CONSEQUENCE":"CONSECUENCIA DE LA DECISIÓN",
    "Why this matters for sustainability":"Por qué esto importa para la sostenibilidad",
    "NEXT PHASE":"SIGUIENTE FASE",
    "Investigate why this happened":"Investiga por qué ocurrió",
    "LOCK IN DECISION":"CONFIRMAR DECISIÓN",
    "Confirm response":"Confirmar respuesta",
    "HYPOTHESIS":"HIPÓTESIS",
    "Improve the system":"Mejorar el sistema",
    "TEST HYPOTHESIS":"COMPROBAR HIPÓTESIS",
    "Confirm diagnosis":"Confirmar diagnóstico",
    "CAPABILITY UNLOCKED":"CAPACIDAD DESBLOQUEADA",
    "COMMIT BUDGET":"COMPROMETER PRESUPUESTO",
    "Fund this capability":"Financiar esta capacidad",
    "Choose the immediate operational response":"Elige la respuesta operativa inmediata",
    "Once confirmed, this decision cannot be changed without resetting the simulation. That is intentional: later events depend on your history.":"Una vez confirmada, esta decisión no puede cambiarse sin reiniciar la simulación. Es intencionado: los eventos posteriores dependen de tu historial.",
    "Continue to root-cause investigation":"Continuar a la investigación de causa raíz",
    "Confirm operational decision":"Confirmar decisión operativa",
    "Which explanation best identifies the systemic root cause?":"¿Qué explicación identifica mejor la causa raíz sistémica?",
    "A good root cause describes a controllable system condition, not merely the event that triggered the incident.":"Una buena causa raíz describe una condición controlable del sistema, no solo el evento que desencadenó el incidente.",
    "Continue to system improvement":"Continuar a la mejora del sistema",
    "Choose one systemic improvement to fund":"Elige una mejora sistémica que financiar",
    "CAPABILITY":"CAPACIDAD",
    "Insufficient budget":"Presupuesto insuficiente",
    "Capability added to your operating system":"Capacidad añadida a tu sistema operativo",
    "Investments persist. The final incident will check how much operational optionality your earlier choices created.":"Las inversiones permanecen. El incidente final comprobará cuántas alternativas operativas crearon tus decisiones anteriores.",
    "Fund selected improvement":"Financiar mejora seleccionada",
    "Choose this route":"Elegir esta ruta",
    "Test this explanation":"Comprobar esta explicación",
    "LEARNING CHECKPOINT":"PUNTO DE APRENDIZAJE",
    "System insight unlocked":"Aprendizaje del sistema desbloqueado",
    "Not the strongest systemic cause":"No es la causa sistémica más sólida",
    "Build this capability":"Desarrollar esta capacidad",
    "Complete simulation":"Completar simulación",
    "Optional system details":"Detalles opcionales del sistema",
    "Identify the real mission window, stock position and available support routes.":"Identifica la ventana real de misión, la posición de stock y las rutas de soporte disponibles.",
    "Look at readiness, resilience and lifecycle consequences — not only speed.":"Observa las consecuencias sobre disponibilidad, resiliencia y ciclo de vida, no solo la velocidad.",
    "Select an option, then confirm it. The decision becomes part of your 18-month history.":"Selecciona una opción y confírmala. La decisión pasa a formar parte de tu historial de 18 meses.",
    "Use the facts shown in the scenario. Avoid explanations that merely restate the symptom.":"Usa los datos del escenario. Evita explicaciones que se limiten a repetir el síntoma.",
    "Choose the system condition that could realistically be changed by process, supply or engineering action.":"Elige la condición del sistema que podría modificarse de forma realista mediante procesos, suministro o ingeniería.",
    "You can fund only one improvement in this incident. Unspent budget remains available later.":"Solo puedes financiar una mejora en este incidente. El presupuesto no utilizado seguirá disponible después.",
    "Compare what capability each investment adds and which later risks it could reduce.":"Compara qué capacidad añade cada inversión y qué riesgos posteriores podría reducir.",
    "Fund one persistent capability. Later incidents will test whether it created another credible recovery route.":"Financia una capacidad persistente. Los incidentes posteriores comprobarán si creó otra ruta de recuperación creíble.",
    "AOG + removed actuator":"AOG + actuador retirado",
    "Recovery route executed":"Ruta de recuperación ejecutada",
    "Fleet-support balance changes":"Cambia el equilibrio de soporte de flota",
    "Repair queue stalls":"La cola de reparación se bloquea",
    "Disposition response executed":"Respuesta de decisión ejecutada",
    "Flow and queue pressure change":"Cambian el flujo y la presión de la cola",
    "Lead-time shock reaches supply chain":"El aumento de plazo alcanza la cadena de suministro",
    "Sourcing / recovery response executed":"Respuesta de aprovisionamiento / recuperación ejecutada",
    "Dependency profile changes":"Cambia el perfil de dependencia",
    "Recurring removals accumulate":"Se acumulan retiradas recurrentes",
    "Support response executed":"Respuesta de soporte ejecutada",
    "Learning loop changes":"Cambia el bucle de aprendizaje",
    "Combined readiness shock":"Impacto combinado sobre disponibilidad",
    "Recovery strategy executed":"Estrategia de recuperación ejecutada",
    "System resilience is exposed":"La resiliencia del sistema queda expuesta",
    "Incident detected":"Incidente detectado",
    "Decision executed":"Decisión ejecutada",
    "System effect":"Efecto en el sistema",
    "Operational consequence":"Consecuencia operativa",
    "Root cause identified":"Causa raíz identificada",
    "Diagnosis reviewed":"Diagnóstico revisado",
    "Systemic root cause identified":"Causa raíz sistémica identificada",
    "Diagnosis revised after evidence review":"Diagnóstico revisado tras analizar la evidencia",
    "LIFECYCLE SCOUT":"EXPLORADOR DE CICLO DE VIDA",
    "Repairability · stock · useful life":"Reparabilidad · stock · vida útil",
    "FLOW BREAKER":"DESBLOQUEADOR DE FLUJO",
    "Process flow · queues · ownership":"Flujo de proceso · colas · responsabilidad",
    "SOURCE MAPPER":"MAPEADOR DE FUENTES",
    "Traceability · biodiversity · resilience":"Trazabilidad · biodiversidad · resiliencia",
    "FEEDBACK BUILDER":"CONSTRUCTOR DE RETORNO",
    "In-Service learning · design loop":"Aprendizaje In-Service · bucle de diseño",
    "RESILIENCE STRATEGIST":"ESTRATEGA DE RESILIENCIA",
    "Systems thinking · combined shocks":"Pensamiento sistémico · impactos combinados",
    "Sustainability learning unlocked":"Aprendizaje de sostenibilidad desbloqueado",
    "A recovery decision should consider useful life, repairability, material demand and the resilience left for the next event.":"Una decisión de recuperación debe considerar vida útil, reparabilidad, demanda de material y la resiliencia que queda para el siguiente evento.",
    "Repair only creates value when information, ownership, disposition and capacity allow a safe return to service.":"La reparación solo crea valor cuando la información, la responsabilidad, la decisión técnica y la capacidad permiten un retorno seguro al servicio.",
    "Traceability, concentration and biodiversity-related upstream conditions can become real supply-continuity constraints.":"La trazabilidad, la concentración y las condiciones aguas arriba relacionadas con biodiversidad pueden convertirse en restricciones reales de continuidad del suministro.",
    "Recurring field evidence should influence reliability, maintainability and repairability instead of being closed case by case forever.":"La evidencia recurrente de campo debe influir en fiabilidad, mantenibilidad y reparabilidad en lugar de cerrarse indefinidamente caso por caso.",
    "Sustainability under pressure means retaining several credible options and improving the system before the next disruption.":"Sostenibilidad bajo presión significa conservar varias opciones creíbles y mejorar el sistema antes de la siguiente interrupción.",
    "Review note":"Nota de revisión",
    "TRAINING EVENT · NOT SCORED":"EVENTO DE ENTRENAMIENTO · NO PUNTÚA",
    "HOW TO PLAY · GUIDED BRIEFING":"CÓMO JUGAR · INTRODUCCIÓN GUIADA",
    "Previous":"Anterior",
    "Review consequence":"Revisar consecuencia",
    "CONSEQUENCE REVIEW":"REVISIÓN DE CONSECUENCIAS",
    "What you have just learned":"Lo que acabas de aprender",
    "Practice before Month 1":"Practica antes del Mes 1",
    "Read this before your first decision":"Lee esto antes de tu primera decisión",
    "Close tutorial":"Cerrar tutorial",
    "Close briefing":"Cerrar introducción",
    "Protect mission readiness with an immediate response that is credible under the time, stock and support constraints shown.":"Protege la disponibilidad de misión con una respuesta inmediata creíble dadas las restricciones de tiempo, stock y soporte mostradas.",
    "Do not confuse recovery with resolution. Identify the systemic condition behind the event: process, repair loop, sourcing, data, stock logic or design feedback.":"No confundas recuperación con resolución. Identifica la condición sistémica detrás del evento: proceso, bucle de reparación, aprovisionamiento, datos, lógica de stock o retorno al diseño.",
    "Invest finite budget in capabilities that stay active. Your later incidents remember what you funded and what you left unresolved.":"Invierte un presupuesto limitado en capacidades que permanezcan activas. Los incidentes posteriores recuerdan lo que financiaste y lo que dejaste sin resolver.",
    "There is no single “sustainable” answer. Immediate operational needs matter. Water, waste, energy, CO2 and VOCs may appear as secondary context, but they are not standalone objectives or score axes.":"No existe una única respuesta “sostenible”. Las necesidades operativas inmediatas importan. Agua, residuos, energía, CO₂ y COV pueden aparecer como contexto secundario, pero no son objetivos independientes ni ejes de puntuación.",
    "Spend limited budget only after you understand the exposure. Improvements remain active in later incidents, so this is where short-term recovery becomes long-term resilience.":"Invierte el presupuesto limitado solo después de comprender la exposición. Las mejoras siguen activas en incidentes posteriores; aquí la recuperación a corto plazo se convierte en resiliencia a largo plazo.",
    "Use the Performance Review and Decision Journey to see the operating pattern created by your choices. Replay only if you want to test a different strategy.":"Usa la Revisión de Rendimiento y el Recorrido de Decisiones para ver el patrón operativo creado por tus elecciones. Repite solo si quieres probar otra estrategia."
  });

  const tutorialsEs = [
    {
      title:"Bienvenido a Sustainability Under Pressure",
      body:"Gestionarás un sistema ficticio de soporte In-Service a lo largo de cinco misiones conectadas. Tu objetivo es mantener la capacidad disponible mientras aprendes cómo las decisiones sobre ciclo de vida, reparación, procesos, suministro, biodiversidad y diseño afectan a la sostenibilidad con el tiempo.",
      extra:'<div class="tutorial-grid"><div class="tutorial-box"><strong>Tu papel</strong><p>Toma decisiones operativas, investiga por qué el sistema quedó expuesto y después invierte en un estado futuro mejor.</p></div><div class="tutorial-box"><strong>Una regla</strong><p>La seguridad, la aeronavegabilidad y la configuración técnica aprobada siguen siendo siempre condiciones de contorno.</p></div></div>'
    },
    {
      title:"¿Qué significa sostenibilidad aquí?",
      body:"No son solo emisiones. En aeronáutica, la sostenibilidad también incluye cuánto tiempo siguen siendo útiles los activos, si los componentes pueden repararse, la resiliencia de la cadena de suministro, cómo los procesos evitan trabajo repetido, cómo se obtienen los materiales y cómo la evidencia In-Service vuelve al diseño.",
      extra:'<div class="tutorial-grid"><div class="tutorial-box"><div class="metric-example">CICLO DE VIDA</div><strong>Aprovechar bien el valor existente</strong><p>Reparación, recuperación, extensión de vida, mantenibilidad y retorno al diseño.</p></div><div class="tutorial-box"><div class="metric-example">RESILIENCIA</div><strong>Mantener opciones creíbles</strong><p>Rutas de reparación, lógica de stock, proveedores cualificados, trazabilidad y decisiones coordinadas.</p></div><div class="tutorial-box"><div class="metric-example">PROCESO</div><strong>Evitar la repetición</strong><p>Responsabilidad, flujo, causa raíz, decisiones correctas a la primera y bucles de aprendizaje.</p></div><div class="tutorial-box"><div class="metric-example">APROVISIONAMIENTO</div><strong>Ver las dependencias aguas arriba</strong><p>Materiales críticos, concentración de proveedores, trazabilidad y riesgo de aprovisionamiento relacionado con biodiversidad.</p></div></div>'
    },
    {
      title:"Cada misión utiliza los mismos tres movimientos",
      body:"No necesitas memorizar un manual. ORA permanecerá contigo y explicará cada fase mientras juegas.",
      extra:'<div class="tutorial-flow"><div class="flow-step"><b>01 — RESPONDER</b><span>Protege la misión inmediata bajo restricciones reales.</span></div><div class="arrow">→</div><div class="flow-step"><b>02 — INVESTIGAR</b><span>Encuentra la condición del sistema detrás del evento visible.</span></div><div class="arrow">→</div><div class="flow-step"><b>03 — MEJORAR</b><span>Invierte un presupuesto limitado en una capacidad que siga activa después.</span></div></div>'
    },
    {
      title:"Lee los compromisos, no una única puntuación",
      body:"Una acción rápida puede mejorar la disponibilidad y debilitar la resiliencia al mismo tiempo. Es intencionado. La revisión final mantiene las dimensiones separadas para que veas la estrategia que has creado.",
      extra:'<div class="tutorial-grid"><div class="tutorial-box"><strong>Más alto es mejor</strong><p>Disponibilidad de misión, resiliencia del suministro, estrategia de ciclo de vida y madurez del proceso.</p></div><div class="tutorial-box"><strong>Más bajo es mejor</strong><p>Exposición de materiales y biodiversidad: dependencia creada por concentración, trazabilidad débil y condiciones sensibles de aprovisionamiento.</p></div><div class="tutorial-box"><strong>El presupuesto es limitado</strong><p>No puedes financiar todas las mejoras. Priorizar forma parte del juego.</p></div><div class="tutorial-box"><strong>Los datos del sistema son opcionales</strong><p>Usa el botón DATOS DEL SISTEMA cuando quieras más contexto; no lo necesitas para comprender la tarea básica.</p></div></div>'
    },
    {
      title:"Los temas ambientales pueden aparecer sin dominar el juego",
      body:"Agua, residuos, energía, CO₂ y COV pueden aparecer cuando sean relevantes para una decisión. Ninguna misión está dedicada exclusivamente a uno de ellos. El simulador sigue centrado en ciclo de vida, procesos, suministro, biodiversidad, diseño y resiliencia.",
      extra:'<div class="tutorial-grid"><div class="tutorial-box"><strong>Ejemplo</strong><p>Una decisión logística urgente puede tener implicaciones de CO₂ y energía, pero la misión sigue tratando de disponibilidad, ciclo de vida y resiliencia.</p></div><div class="tutorial-box"><strong>Regla anti-greenwashing</strong><p>Sin afirmaciones verdes vagas, sin beneficios para la naturaleza inventados y sin asumir que una opción es automáticamente sostenible.</p></div></div>'
    },
    {title:"Practica una vez y empieza la Misión 01",body:"Este ensayo no afecta a tu presupuesto ni a la revisión final. Toma una decisión y comprueba cómo el juego explica el compromiso.",practice:true}
  ];

  const incidentsEs = {
    "INC-01":{
      title:"AOG — Actuador crítico no disponible localmente",
      summary:"Una aeronave soportada queda no disponible tras retirar un actuador de control de vuelo por una indicación de fallo. La necesidad de misión es en 96 horas. El stock local apto para servicio es cero, el stock central es limitado y existe una ruta de reparación, aunque todavía no está optimizada.",
      data:[["Necesidad de misión","96 HORAS"],["Stock local","0 APTOS"],["Stock central","2 UNIDADES"],["Plazo del proveedor","14 SEMANAS"]],
      constraints:["Recuperar una aeronave en 96 horas","No crear una configuración técnica no aprobada","El stock central da soporte a varias ubicaciones","El centro de reparación puede inspeccionar la unidad retirada"],
      lens:"Separa la recuperación inmediata de la aeronave de la pregunta a largo plazo: ¿por qué el fallo de un componente expuso a la flota a una emergencia de stock?",
      broader:"La logística urgente o depender de un repuesto de nueva fabricación también puede tener implicaciones de consumo energético y CO₂. Aquí se reconocen de forma cualitativa, pero no son el eje principal de decisión ni se puntúan por separado.",
      operational:[
        ["Solicitar una unidad del stock central","Usar una unidad apta existente y priorizar su transporte a la ubicación afectada.",["Recuperación rápida","Consume stock escaso"],"Recuperas la disponibilidad rápidamente, pero reduces el margen disponible para el resto de la red de soporte. El problema inmediato se resuelve consumiendo resiliencia que ya existía en otro lugar."],
        ["Iniciar la reparación y proteger la misión de 96 horas con una reasignación temporal de flota","Usar la ruta de reparación mientras se replantea la disponibilidad de la flota soportada.",["Ruta de reparación","Compromiso operativo"],"Aceptas una recuperación operativa más compleja, pero conservas el stock central y aprendes más sobre el bucle de reparación. Mejora el aprovechamiento del ciclo de vida, aunque la ganancia de disponibilidad a corto plazo es menor."],
        ["Transferir una unidad apta desde una aeronave ya en mantenimiento programado","Usar una transferencia temporal aprobada del componente y registrar el cambio de configuración.",["Muy rápido","Desplaza carga futura"],"Recuperas la aeronave prioritaria, pero trasladas la restricción al plan de mantenimiento programado. Es una contingencia controlada creíble, aunque su uso repetido generaría deuda de configuración y planificación."],
        ["Realizar un nuevo pedido al proveedor y esperar","No tocar la flota ni el stock central y depender de la ruta estándar de aprovisionamiento.",["Baja complejidad","Incumple el plazo"],"La ruta estándar evita esfuerzo de coordinación a corto plazo, pero no satisface la necesidad operativa y aumenta la dependencia del nuevo suministro."]
      ],
      investigation:[
        ["El actuador falló de forma inesperada","El fallo del componente es la causa raíz porque sin él no habría AOG",false,"Esto describe el evento iniciador, no la razón sistémica por la que el sistema de soporte no pudo absorberlo."],
        ["La lógica de stock mínimo no se actualizó cuando aumentó el plazo del proveedor","Los parámetros de planificación no cambiaron aunque aumentó el tiempo de reposición y el plazo de reparación no se utilizó como control compensatorio.",true,"Correcto. El fallo se convirtió en una crisis de disponibilidad porque las hipótesis de planificación y el bucle de reparación no se adaptaron al nuevo contexto de suministro."],
        ["La ruta de transporte es demasiado lenta","El proveedor logístico es la causa sistémica principal del problema de disponibilidad.",false,"La velocidad del transporte afecta al tiempo de recuperación, pero no explica la ausencia de reserva local ni de una respuesta madura de reparación."],
        ["El equipo local debería almacenar más de cada repuesto","La causa raíz es un inventario insuficiente en todas las familias de componentes.",false,"Aumentar todos los niveles de stock no es un diagnóstico de causa raíz. Puede inmovilizar recursos sin cambiar la lógica de planificación."]
      ],
      investments:[
        ["Desarrollar un bucle de reparación local más rápido","Crear un triaje de reparación definido, reserva de capacidad y objetivos de plazo para esta familia de componentes.",["Capacidad persistente","Afecta a incidentes posteriores"],"Conviertes la reparación de una ruta ad hoc en una capacidad planificada de resiliencia."],
        ["Rediseñar la lógica de dimensionamiento de stock","Vincular el stock mínimo al plazo, la demanda por fallos, el tiempo de reparación y la criticidad de red.",["Control de planificación","Menor coste"],"Mejoras la lógica de decisión del stock en lugar de limitarte a aumentar inventario."],
        ["Asignar responsabilidad integral sobre el soporte del componente","Aclarar quién es responsable de suministro, reparación, escalado de ingeniería y cierre de problemas recurrentes.",["Madurez de proceso","Transversal"],"Refuerzas la responsabilidad entre funciones. Esto puede reducir retrasos de traspaso en incidentes posteriores."]
      ]
    },
    "INC-02":{
      title:"Cola de reparación — Cuatro unidades pendientes de decisión",
      summary:"Un centro de reparación tiene cuatro unidades reemplazables en línea retiradas y pendientes de decisión técnica. Dos podrían volver al servicio rápidamente, pero el traspaso con ingeniería está incompleto. Mientras tanto llega nueva demanda de la flota.",
      data:[["Unidades en cola","4"],["Mayor tiempo de espera","11 DÍAS"],["Reparaciones rápidas probables","2 UNIDADES"],["Nuevas retiradas previstas","2 / MES"]],
      constraints:["Las decisiones técnicas de aeronavegabilidad siguen siendo obligatorias","El stock nuevo de sustitución es limitado","Hay capacidad disponible en el centro de reparación","La información está fragmentada en tres traspasos"],
      lens:"Busca la diferencia entre falta de capacidad física y un cuello de botella en el flujo de decisión. Más bancos de reparación no ayudan si las unidades esperan información o autoridad.",
      broader:"Las decisiones de reparar o sustituir también pueden influir en residuos, energía y procesos aprobados de limpieza o recubrimiento que pueden implicar COV. En este escenario son secundarios frente al problema de flujo.",
      operational:[
        ["Pedir cuatro unidades de sustitución","Resolver la preocupación operativa sustituyendo la cola de reparación por nuevo suministro.",["Simple","Nueva dependencia"],"Evitas la cola en vez de mejorarla. La disponibilidad mejora, pero el proceso sin resolver continúa y aumenta la demanda de nuevo suministro."],
        ["Crear una célula transversal de decisión durante 48 horas","Reunir temporalmente reparación, ingeniería y suministro para cerrar los cuatro casos con evidencias y responsables definidos.",["Coordinación rápida","Ataca el cuello de botella"],"Utilizas mejor la capacidad existente y aceleras las unidades recuperables. La célula temporal funciona, pero todavía necesitas una mejora permanente del proceso."],
        ["Priorizar solo la unidad más reciente","Concentrar el esfuerzo en el caso más sencillo y dejar sin cambios la cola antigua.",["Resultado rápido","La cola continúa"],"Un caso puede avanzar más deprisa, pero la lógica de la cola y la responsabilidad siguen igual."],
        ["Pausar nuevas reparaciones hasta eliminar la cola","Proteger al equipo actual de la sobrecarga deteniendo temporalmente nuevas entradas.",["Controla trabajo en curso","Traslada el problema"],"El trabajo en curso se controla localmente, pero la restricción se traslada al soporte de flota y a la disponibilidad."]
      ],
      investigation:[
        ["Al centro de reparación le faltan técnicos","La cola visible demuestra capacidad física insuficiente.",false,"Hay capacidad disponible. La cola se forma antes de que empiece la reparación física."],
        ["La decisión de ingeniería no tiene responsable claro ni estándar de respuesta","Los casos pasan por varios traspasos y esperan información incompleta o autoridad.",true,"Correcto. El cuello de botella está en el flujo de decisión: responsabilidad poco clara, entradas incompletas y ausencia de un estándar de tiempo de respuesta."],
        ["Fallan demasiadas unidades en servicio","La demanda por fallos explica por sí sola la cola de reparación.",false,"La demanda importa, pero la evidencia muestra unidades esperando sin reparación porque el proceso de decisión está bloqueado."],
        ["La documentación de reparación es demasiado detallada","Reducir la documentación técnica es la principal solución.",false,"El problema no es que exista evidencia, sino que entradas, responsabilidad y tiempos de decisión no están controlados de extremo a extremo."]
      ],
      investments:[
        ["Introducir un tablero integral de estado de reparación","Hacer visibles entre funciones la antigüedad de la cola, responsable, información faltante, siguiente decisión y objetivo de plazo.",["Visibilidad de flujo","Capacidad persistente"],"Haces que la espera sea visible y accionable. Los problemas posteriores son más fáciles de coordinar."],
        ["Definir una RACI y un estándar de respuesta para la decisión técnica","Aclarar entradas necesarias, autoridad de decisión, ruta de escalado y tiempo máximo de respuesta.",["Responsabilidad","Bajo coste"],"Atacas la cola en el nivel de traspaso y autoridad, donde la evidencia indica que se forma el cuello de botella."],
        ["Capacitar transversalmente a más personal de reparación","Aumentar la capacidad práctica flexible entre varias familias de componentes.",["Resiliencia de capacidad","Útil pero indirecto"],"Aumentas la resiliencia de capacidad, aunque sin control del proceso algunas unidades pueden seguir esperando antes de llegar al banco."]
      ]
    },
    "INC-03":{
      title:"Alerta de suministro — Una restricción de aprovisionamiento amplía el plazo",
      summary:"Un proveedor informa de que un material utilizado en una familia de componentes se ve afectado por nuevas restricciones de permisos en una región de aprovisionamiento con ecosistemas sensibles. Se espera un fuerte aumento del plazo. La trazabilidad más allá del proveedor de primer nivel es incompleta.",
      data:[["Plazo actual","16 SEMANAS"],["Plazo previsto","28 SEMANAS"],["Fuentes cualificadas","1"],["Trazabilidad","PARCIAL"]],
      constraints:["No sustituir por material no cualificado","El stock apto existente cubre aproximadamente cinco meses","La recuperación mediante reparación es técnicamente viable","La interrupción puede durar más de un ciclo de planificación"],
      lens:"Trata la presión de aprovisionamiento relacionada con biodiversidad como una dependencia de cadena de suministro e ingeniería. La respuesta adecuada no es una afirmación ambiental genérica, sino mejor trazabilidad, recuperación, diversificación o rediseño cualificado.",
      broader:"La producción de materias primas también puede asociarse a agua, energía, residuos y CO₂. El simulador solo los trata como contexto cuando existiría evidencia trazable; no inventa beneficios ni penalizaciones ambientales.",
      operational:[
        ["Consumir el stock disponible y volver a evaluar más adelante","Usar la reserva de cinco meses para evitar una interrupción inmediata del programa.",["Sin coste inmediato","Aplaza la decisión"],"Ganas tiempo consumiendo la reserva existente, pero aumenta la exposición porque la dependencia de aprovisionamiento permanece sin cambios."],
        ["Priorizar la reparación y recuperación de unidades existentes","Proteger el stock nuevo acelerando rutas aprobadas de recuperación mientras se evalúa la situación de suministro.",["Conserva stock","Usa activos existentes"],"Reduces la demanda inmediata de nuevo suministro y preservas stock escaso, creando tiempo para una respuesta estructural de aprovisionamiento."],
        ["Solicitar un material alternativo no cualificado","Pedir al proveedor una sustitución inmediata de material para recuperar el plazo anterior.",["Rápido en teoría","No aceptable técnicamente"],"La simulación rechaza atajos que eluden la cualificación. La presión de suministro no elimina los requisitos de aseguramiento técnico."],
        ["Realizar un gran pedido anticipado a la misma fuente","Aumentar cobertura comprando mucho más material antes de que se endurezcan las restricciones.",["Aumenta reserva","Mantiene concentración"],"Puedes crear una reserva temporal, pero profundizas la dependencia de la misma fuente y comprometes más material con el diseño existente."]
      ],
      investigation:[
        ["La nueva restricción de permisos es la única causa raíz","Una restricción externa relacionada con biodiversidad queda fuera del control de la organización de soporte.",false,"La restricción externa desencadenó el evento, pero la exposición controlable procede de la concentración, la trazabilidad limitada y la falta de alternativas."],
        ["Dependencia de una sola fuente y trazabilidad aguas arriba incompleta","El sistema tiene poca visibilidad o alternativas cualificadas cuando cambian las condiciones aguas arriba.",true,"Correcto. El evento revela una brecha de resiliencia: concentración más trazabilidad incompleta dejan pocas rutas de respuesta informadas."],
        ["El proveedor debería haber mantenido más inventario","El proveedor de primer nivel es el único responsable de evitar la interrupción.",false,"El inventario del proveedor puede ayudar, pero no elimina la concentración estructural ni las brechas de trazabilidad."],
        ["La actividad de reparación es demasiado alta","La recuperación de unidades es la razón por la que el suministro de material se ha limitado.",false,"La reparación reduce la demanda de material nuevo en este escenario; forma parte de la respuesta de resiliencia, no de la causa."]
      ],
      investments:[
        ["Cualificar una segunda ruta de suministro","Iniciar la cualificación técnica y de compras de una fuente alternativa para reducir el riesgo de concentración.",["Coste alto","Gran efecto en resiliencia"],"Creas alternativas cualificadas. No eliminas todos los impactos aguas arriba, pero reduces de forma material la exposición a una única fuente."],
        ["Desarrollar una trazabilidad de materiales más profunda","Extender el mapa de proveedores más allá del primer nivel e integrar señales de riesgo en las revisiones de aprovisionamiento.",["Visibilidad","Relevante para biodiversidad"],"Mejoras la capacidad de detectar e interpretar riesgos de aprovisionamiento relacionados con ecosistemas antes de que se conviertan en crisis de disponibilidad."],
        ["Ampliar el programa de recuperación de componentes","Aumentar rutas de inspección, reparación y recertificación para unidades retornadas y reducir la dependencia de material de nuevo suministro.",["Ciclo de vida","Reduce demanda"],"Reduces la presión sobre el nuevo suministro aprovechando más vida útil de componentes ya presentes en el sistema de soporte."]
      ]
    },
    "INC-04":{
      title:"Fallo recurrente — Las soluciones operativas ya no son suficientes",
      summary:"La misma familia de componentes ha generado retiradas repetidas durante varios meses. Cada evento individual se ha gestionado, pero el patrón ya consume capacidad de reparación y atención de planificación. El retorno a ingeniería ha sido informal en lugar de estructurado.",
      data:[["Retiradas repetidas","7 EN 6 MESES"],["Casos sin fallo encontrado","2"],["Acciones de ingeniería","INFORMALES"],["Revisión de diseño","NO ABIERTA"]],
      constraints:["La configuración actual sigue aprobada","Un rediseño requeriría tiempo y cualificación","La capacidad de reparación es limitada","La demanda recurrente empieza a afectar a otras familias de componentes"],
      lens:"Pregunta cuándo un problema In-Service debe dejar de tratarse como una serie de eventos aislados y convertirse en retorno estructurado hacia ingeniería y diseño.",
      broader:"El diseño para reparabilidad y las decisiones de mantenimiento pueden influir en materiales, residuos, energía y procesos con COV. Pueden ser relevantes en una evaluación real, pero este escenario se centra en el bucle Diseño ↔ In-Service.",
      operational:[
        ["Continuar con sustituciones caso por caso","Usar la respuesta establecida para cada retirada y evitar una intervención más amplia de ingeniería.",["Familiar","Carga recurrente"],"Cada evento sigue siendo manejable, pero el sistema continúa pagando la misma penalización. El patrón recurrente no se convierte en aprendizaje."],
        ["Crear un equipo para problemas recurrentes y proteger la capacidad de reparación","Agrupar evidencias de fallo, priorizar recuperación de unidades aptas y abrir retorno formal a ingeniería.",["Visión sistémica","Transversal"],"Proteges el soporte a corto plazo mientras conviertes eventos repetidos en un planteamiento de problema para ingeniería."],
        ["Aumentar el stock de seguridad de esta familia de componentes","Proteger la flota frente a retiradas repetidas manteniendo más repuestos.",["Reserva de disponibilidad","No reduce demanda"],"El stock protege temporalmente la disponibilidad, pero no cambia la demanda recurrente por fallos ni la carga de reparación."],
        ["Pausar todas las reparaciones y esperar una acción de diseño","Evitar esfuerzo sobre la configuración actual mientras ingeniería investiga.",["Foco en diseño","Riesgo de disponibilidad"],"El aprendizaje de diseño es importante, pero el soporte operativo no puede abandonarse mientras se investiga un cambio futuro."]
      ],
      investigation:[
        ["Los técnicos de reparación deben trabajar más rápido","La carga recurrente existe porque el plazo de reparación es insuficiente.",false,"Una reparación más rápida puede reducir colas, pero no explica por qué la demanda sigue repitiéndose en toda la familia."],
        ["La evidencia recurrente In-Service no está conectada formalmente con la revisión de ingeniería","Los eventos se cierran individualmente sin un disparador que convierta el patrón repetido en una acción de diseño o fiabilidad.",true,"Correcto. La causa raíz es una brecha en el bucle de retorno: la evidencia operacional repetida no se convierte sistemáticamente en aprendizaje de ingeniería."],
        ["La flota opera con demasiada intensidad","El nivel de uso explica por sí solo las retiradas repetidas.",false,"El uso puede influir en la demanda por fallos, pero la evidencia no justifica detenerse ahí; sigue faltando gobernanza del patrón recurrente."],
        ["No hay suficiente stock central","Más unidades de repuesto eliminarían el problema recurrente.",false,"Más stock puede amortiguar las consecuencias, pero no eliminar la demanda repetida por fallos."]
      ],
      investments:[
        ["Abrir una revisión estructurada de diseño para In-Service","Usar evidencias de fallos, reparación y mantenimiento para evaluar mejoras de fiabilidad, modularidad, accesibilidad y reparabilidad.",["Retorno al diseño","Alto impacto"],"Conectas la evidencia In-Service de nuevo con ingeniería. Los beneficios son más lentos que una solución operativa, pero abordan estructuralmente el mecanismo recurrente."],
        ["Reforzar el análisis de condición y patrones de fallo","Mejorar la detección de tendencias y la calidad de evidencias para analizar conjuntamente retiradas, casos sin fallo encontrado y precursores.",["Predicción","Calidad de evidencia"],"Mejoras la detección temprana y la calidad de las decisiones de ingeniería, reduciendo un soporte puramente reactivo."],
        ["Mejorar la reparabilidad dentro de la solución de soporte aprobada","Estandarizar acceso, prueba y recuperación donde sea técnicamente viable sin esperar a un rediseño completo.",["Más cercano en el tiempo","Ciclo de vida"],"Mejoras el sistema de soporte actual mientras siguen abiertas las cuestiones de diseño a largo plazo."]
      ]
    },
    "INC-05":{
      title:"Impacto de disponibilidad — Dos AOG, un proveedor limitado y una cola de reparación",
      summary:"El escenario final combina presiones de los 18 meses anteriores. Dos aeronaves están no disponibles, la fuente de material limitada ha ampliado fechas de entrega y el centro de reparación recibe más trabajo. Las opciones disponibles dependen en parte de las capacidades que decidiste desarrollar antes.",
      data:[["Aeronaves AOG","2"],["Ventana de misión","5 DÍAS"],["Estado del proveedor","LIMITADO"],["Carga de reparación","ALTA"]],
      constraints:["Recuperar al menos una aeronave en cinco días","Evitar que la segunda aeronave se convierta en un AOG de larga duración","Las rutas de aprobación técnica siguen siendo obligatorias","Usa las capacidades construidas o compensa las que no construiste"],
      lens:"Es una prueba del sistema. La pregunta no es si una acción de emergencia es ingeniosa, sino si las decisiones anteriores de planificación, reparación, suministro, proceso y diseño crearon suficientes alternativas para absorber presiones simultáneas.",
      broader:"Una revisión transversal real también podría considerar evidencia sobre CO₂ del transporte, energía, agua, residuos o COV. En esta prueba de estrés son consideraciones de apoyo junto con disponibilidad, ciclo de vida, suministro y resiliencia de procesos; nunca el único objetivo.",
      operational:[
        ["Usar el plan de resiliencia: reparar, priorizar stock y coordinar ingeniería","Combinar reparación aprobada, asignación controlada de stock y un único plan transversal de recuperación.",["Respuesta integrada","Se beneficia de inversiones previas"],"Una respuesta integrada utiliza varias rutas de recuperación en lugar de agotar una sola reserva. Su eficacia aumenta con las capacidades construidas anteriormente."],
        ["Usar inmediatamente todo el stock apto restante","Recuperar ambas aeronaves lo antes posible consumiendo la reserva restante de sustitución.",["Máxima velocidad a corto plazo","Exposición futura"],"Maximizas la disponibilidad inmediata, pero dejas el sistema muy expuesto al siguiente evento."],
        ["Esperar nuevas entregas del proveedor","Evitar más complejidad de reparación y coordinación y confiar en la reposición.",["Gobernanza simple","Riesgo de AOG prolongado"],"El proveedor limitado no puede absorber la ventana de cinco días. Las opciones de resiliencia anteriores serían especialmente valiosas aquí."],
        ["Recuperar una aeronave y proteger deliberadamente la ruta de reparación de la segunda","Priorizar la misión de cinco días reservando capacidad de reparación y stock para evitar que el segundo AOG se cronifique.",["Recuperación equilibrada","Protege alternativas"],"Evitas consumir todas las reservas a la vez y mantienes una ruta para la segunda aeronave. Es un compromiso controlado, no un intento de maximizar una sola métrica."]
      ],
      investigation:[
        ["El impacto final se debe a mala suerte","Varias interrupciones ocurrieron al mismo tiempo y no puede extraerse ninguna lección sistémica.",false,"Los eventos simultáneos son inciertos, pero la resiliencia existe precisamente para reducir la dependencia de que todo ocurra en el momento favorable."],
        ["La debilidad dominante es la falta de alternativas entre reparación, suministro y flujo de decisión","Donde no se construyeron capacidades antes, el impacto final revela dependencia de pocas rutas de recuperación.",true,"Correcto. La resiliencia es la capacidad de mantener opciones creíbles bajo presión. El incidente final revela qué opciones creó tu estrategia y cuáles dejó ausentes."],
        ["El único problema es la falta de stock","Si se hubieran comprado más componentes, el evento final estaría resuelto.",false,"El stock es una reserva, pero el escenario combina restricciones de reparación, suministro y proceso. El inventario por sí solo no crea un sistema resiliente."],
        ["La organización de soporte debería eliminar toda variabilidad","La causa raíz es la existencia de eventos inciertos y plazos cambiantes.",false,"La variabilidad no puede eliminarse. El objetivo controlable es diseñar procesos y capacidades capaces de absorberla."]
      ],
      investments:[
        ["Institucionalizar un modelo operativo de resiliencia","Definir disparadores, roles transversales de recuperación, revisiones de criticidad de componentes y pruebas periódicas de estrés.",["Gobernanza del sistema","Visión de cartera"],"Conviertes las lecciones de eventos individuales en un sistema de gestión recurrente."],
        ["Crear una cartera de mejora del ciclo de vida","Priorizar reparabilidad, recuperación, obsolescencia y dependencia de materiales con evidencias compartidas entre familias de componentes.",["Gobernanza de ciclo de vida","Diseño + In-Service"],"Creas una ruta estructurada desde la evidencia operacional hasta las decisiones de inversión de ciclo de vida."],
        ["Realizar pruebas recurrentes de estrés de la cadena de suministro","Probar componentes críticos frente a aumentos de plazo, pérdida de fuentes, colas de reparación y brechas de trazabilidad antes de que ocurra una interrupción.",["Anticipación","Menor coste"],"Haces proactiva la resiliencia cuestionando hipótesis antes de la siguiente interrupción."]
      ]
    }
  };

  function applyIncidentTranslations(){
    if(!ES || !Array.isArray(window.incidents || incidents)) return;
    incidents.forEach(inc=>{
      const src=incidentsEs[inc.id]; if(!src) return;
      inc.title=src.title; inc.summary=src.summary; inc.data=src.data; inc.constraints=src.constraints; inc.lens=src.lens; inc.broader=src.broader;
      src.operational.forEach((x,i)=>{if(inc.operational[i]){inc.operational[i].title=x[0];inc.operational[i].desc=x[1];inc.operational[i].tags=x[2];inc.operational[i].feedback=x[3];}});
      src.investigation.forEach((x,i)=>{if(inc.investigation[i]){inc.investigation[i].title=x[0];inc.investigation[i].desc=x[1];inc.investigation[i].feedback=x[3];}});
      src.investments.forEach((x,i)=>{if(inc.investments[i]){inc.investments[i].title=x[0];inc.investments[i].desc=x[1];inc.investments[i].tags=x[2];inc.investments[i].feedback=x[3];}});
    });
  }

  function patchTutorials(){
    if(!ES || typeof tutorials==="undefined") return;
    tutorials.splice(0,tutorials.length,...tutorialsEs);
  }

  function patchCoach(){
    if(!ES || typeof coachContext!=="function") return;
    coachContext=function(){
      if(!state.started) return {mood:"idle",title:"Hola, soy ORA",tips:[
        "Te acompañaré durante toda la simulación. Puedes minimizarme cuando quieras.",
        "Aprenderás sostenibilidad resolviendo problemas In-Service sobre ciclo de vida, reparación, procesos, suministro, biodiversidad y diseño.",
        "Si prefieres aprender haciendo, empieza la Misión 01. Después de cada decisión te explicaré su significado de sostenibilidad."
      ]};
      const phase=state.phase;
      const sets={
        operational:["Empieza por la restricción operativa y compara qué consume o preserva cada ruta.","No busques una opción “verde”: compara disponibilidad, resiliencia y ciclo de vida entre alternativas técnicamente válidas.","Puedes cambiar tu selección hasta confirmarla."],
        investigation:["El evento visible no siempre es la causa raíz. Busca qué condición del sistema permitió que el problema creciera.","Contrasta cada hipótesis con la evidencia del escenario.","Una buena causa raíz apunta a algo que el sistema puede mejorar de forma realista."],
        investment:["Elige una capacidad persistente, no otro parche de emergencia.","Tu presupuesto es limitado y las inversiones seguirán activas en misiones posteriores.","Piensa en prevención, ciclo de vida y resiliencia de forma conjunta."]
      };
      return {mood:"thinking",title:phase==="operational"?"ORA · Responde":phase==="investigation"?"ORA · Investiga":"ORA · Mejora",tips:sets[phase]||sets.operational};
    };
  }

  const dynamicRules = [
    [/^MISSION (\d+) COMPLETE$/,"MISIÓN $1 COMPLETADA"],
    [/^MISSION (\d+)$/,"MISIÓN $1"],
    [/^Mission (\d+)$/,"Misión $1"],
    [/^Continue to Month (\d+)$/,"Continuar al Mes $1"],
    [/^Enter Mission (\d+)$/,"Entrar en Misión $1"],
    [/^NEXT MISSION · MONTH (\d+)$/,"SIGUIENTE MISIÓN · MES $1"],
    [/^MONTH (\d+) OF 18$/,"MES $1 DE 18"],
    [/^(\d+) ready · 1 current AOG · (\d+) in maintenance \/ unavailable state$/,"$1 disponibles · 1 AOG actual · $2 en mantenimiento / no disponibles"],
    [/^(\d+) persistent improvement(s?) across the 18-month simulation\.$/,"$1 mejoras persistentes a lo largo de la simulación de 18 meses."],
    [/^(\d+) \/ (\d+) incidents recorded$/,"$1 / $2 incidentes registrados"],
    [/^Aircraft (\d+) · current incident$/,"Aeronave $1 · incidente actual"],
    [/^Aircraft (\d+) · available$/,"Aeronave $1 · disponible"],
    [/^Aircraft (\d+) · maintenance$/,"Aeronave $1 · mantenimiento"]
  ];

  function trText(raw){
    if(!ES || !raw) return raw;
    const lead=(raw.match(/^\s*/)||[""])[0], trail=(raw.match(/\s*$/)||[""])[0];
    const s=raw.trim();
    if(!s) return raw;
    if(exact[s]) return lead+exact[s]+trail;
    for(const [re,rep] of dynamicRules) if(re.test(s)) return lead+s.replace(re,rep)+trail;
    return raw;
  }

  function translateTree(root){
    if(!ES || !root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{const v=trText(n.nodeValue); if(v!==n.nodeValue) n.nodeValue=v;});
    root.querySelectorAll?.("[aria-label],[title],[placeholder]").forEach(el=>{
      ["aria-label","title","placeholder"].forEach(a=>{if(el.hasAttribute(a)){const v=trText(el.getAttribute(a)); if(v!==el.getAttribute(a)) el.setAttribute(a,v);}});
    });
  }

  function installLanguageToggle(){
    const host=document.querySelector(".top-actions"); if(!host || document.getElementById("languageToggle")) return;
    const wrap=document.createElement("div"); wrap.id="languageToggle"; wrap.className="language-toggle";
    wrap.setAttribute("role","group"); wrap.setAttribute("aria-label",ES?"Seleccionar idioma":"Select language");
    wrap.innerHTML='<button type="button" class="ghost-btn lang-btn" data-lang="es" aria-label="Español">ES</button><button type="button" class="ghost-btn lang-btn" data-lang="en" aria-label="English">EN</button>';
    host.prepend(wrap);
    wrap.querySelectorAll("button").forEach(b=>{
      b.classList.toggle("active",b.dataset.lang===lang);
      b.onclick=()=>{const next=b.dataset.lang; try{localStorage.setItem("tass-language",next);}catch(e){} const u=new URL(location.href);u.searchParams.set("hubLang",next);u.searchParams.delete("lang");location.href=u.toString();};
    });
    if(!document.getElementById("i18nStyle")){
      const st=document.createElement("style");st.id="i18nStyle";st.textContent='.language-toggle{display:flex;gap:4px;align-items:center}.language-toggle .lang-btn{min-width:42px;padding:8px 10px}.language-toggle .lang-btn.active{background:#1f8fb8;color:#fff;border-color:#62cbe8}';document.head.appendChild(st);
    }
  }

  if(ES){
    patchTutorials();
    applyIncidentTranslations();
    patchCoach();
    const originalConfirm=window.confirm.bind(window);
    window.confirm=(msg)=>originalConfirm(trText(msg));
  }

  const observer=new MutationObserver(mutations=>{
    if(ES) mutations.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1) translateTree(n); else if(n.nodeType===3){const v=trText(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;}}));
    installLanguageToggle();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});

  /* Translate every application render synchronously. MutationObserver remains as
     a safety net for dialogs and coach updates inserted outside the main render. */
  if(typeof render === "function"){
    const renderBase=render;
    render=function(){
      renderBase();
      installLanguageToggle();
      if(ES) translateTree(document.body);
    };
  }

  installLanguageToggle();
  if(ES && typeof render==="function"){
    render();
    translateTree(document.body);
  } else if(ES) {
    translateTree(document.body);
  }
})();

incidents.push({
    id:"INC-04",
    month:12,
    title:"Recurring failure — Operational fixes are no longer enough",
    summary:"The same component family has generated repeated removals across several months. Each individual event has been managed, but the pattern is now consuming repair capacity and planning attention. Engineering feedback has been informal rather than structured.",
    data:[["Repeat removals","7 IN 6 MONTHS"],["No-fault-found cases","2"],["Engineering actions","INFORMAL"],["Design review","NOT OPEN"]],
    constraints:["Current configuration remains approved","A redesign would require time and qualification","Repair capacity is finite","Recurring demand is beginning to affect other component families"],
    lens:"Ask when an In-Service problem should stop being treated as a sequence of isolated events and become structured feedback into engineering and design.",
    broader:"Design-for-repairability and maintenance choices can influence material use, waste, energy demand and VOC-related processes. Those effects may be relevant in a real assessment, but this scenario remains centred on the Design ↔ In-Service feedback loop.",
    operational:[
      {id:"A",title:"Continue case-by-case replacement",desc:"Use the established response for each removal and avoid a wider engineering intervention.",tags:["Familiar","Recurring burden"],delta:{readiness:3,resilience:-6,lifecycle:-6,process:-5,exposure:4},feedback:"Each event remains manageable, but the system continues paying the same penalty. The recurring pattern is not converted into learning."},
      {id:"B",title:"Create a recurring-problem task force and protect repair capacity",desc:"Aggregate failure evidence, prioritise serviceable recovery and open formal engineering feedback.",tags:["System view","Cross-functional"],delta:{readiness:4,resilience:6,lifecycle:6,process:8,exposure:-2},feedback:"You preserve near-term support while turning repeated events into an engineering problem statement."},
      {id:"C",title:"Increase safety stock for this component family",desc:"Buffer the fleet against repeated removals by holding more replacements.",tags:["Readiness buffer","Does not reduce demand"],delta:{readiness:7,resilience:1,lifecycle:-4,process:-2,exposure:5},feedback:"Stock protects readiness temporarily but does not change the recurring failure demand or repair burden."},
      {id:"D",title:"Pause all repairs and wait for design action",desc:"Avoid spending effort on the current configuration while engineering investigates.",tags:["Design focus","Readiness risk"],delta:{readiness:-9,resilience:-5,lifecycle:1,process:1,exposure:0},feedback:"Design learning is important, but operational support cannot be abandoned while a future change is investigated."}
    ],
    investigation:[
      {id:"A",title:"Repair technicians need to work faster",desc:"The recurring burden exists because turnaround is insufficient.",correct:false,feedback:"Faster repair may reduce queue time, but does not explain why demand keeps recurring across the component family."},
      {id:"B",title:"Recurring In-Service evidence is not formally connected to engineering review",desc:"Events are closed individually without a trigger that converts a repeated pattern into design or reliability action.",correct:true,feedback:"Correct. The root cause is a feedback-loop gap: repeated operational evidence is not systematically converted into engineering learning."},
      {id:"C",title:"The fleet is operating too intensively",desc:"Usage level alone explains the repeated removals.",correct:false,feedback:"Usage can influence failure demand, but the evidence presented does not justify stopping at that explanation; recurring-pattern governance is still missing."},
      {id:"D",title:"There is not enough central stock",desc:"More spare units would eliminate the recurring issue.",correct:false,feedback:"More stock can buffer consequences but cannot eliminate repeated failure demand."}
    ],
    investments:[
      {id:"designReview",title:"Open a structured design-for-In-Service review",cost:720,desc:"Use failure, repair and maintenance evidence to assess reliability, modularity, accessibility and repairability improvements.",tags:["Design feedback","High leverage"],delta:{resilience:9,lifecycle:13,process:7,exposure:-5},feedback:"You connect In-Service evidence back into engineering. Benefits are slower than an operational fix but address the recurring mechanism structurally."},
      {id:"conditionData",title:"Strengthen condition and failure-pattern analytics",cost:360,desc:"Improve trend detection and evidence quality so removals, no-fault-found cases and precursors are analysed together.",tags:["Prediction","Evidence quality"],delta:{readiness:3,resilience:8,process:9,lifecycle:4,exposure:-1},feedback:"You improve earlier detection and the quality of engineering decisions, reducing purely reactive support."},
      {id:"repairability",title:"Improve repairability within the approved support solution",cost:410,desc:"Standardise access, test and recovery steps where technically feasible without waiting for a full redesign.",tags:["Nearer-term","Lifecycle"],delta:{resilience:7,lifecycle:10,process:5,exposure:-3},feedback:"You improve the current support system while longer-term design questions remain open."}
    ]
  });

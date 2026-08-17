incidents.push({
    id: "INC-01",
    month: 1,
    title: "AOG — Critical actuator unavailable locally",
    summary: "A supported aircraft is unavailable after a flight-control actuator is removed following a fault indication. The mission requirement is in 96 hours. Local serviceable stock is zero, central stock is limited, and a repair route exists but is not yet optimised.",
    data: [
      ["Mission requirement", "96 HOURS"], ["Local stock", "0 SERVICEABLE"], ["Central stock", "2 UNITS"], ["Supplier lead time", "14 WEEKS"]
    ],
    constraints: ["Recover one aircraft within 96 hours", "Do not create an unapproved technical configuration", "Central stock supports multiple locations", "Repair centre can inspect the removed unit"],
    lens: "Separate immediate aircraft recovery from the longer-term question: why did one component failure expose the fleet to a stock emergency?",
    broader:"Expedited logistics or reliance on a newly manufactured replacement can also have energy-use and CO2 implications. They are acknowledged qualitatively here, but they are not the primary decision axis and are not scored independently.",
    operational: [
      { id:"A", title:"Request one unit from central stock", desc:"Use an existing serviceable unit and prioritise transport to the affected location.", tags:["Fast recovery","Consumes scarce stock"], delta:{readiness:8,resilience:-7,lifecycle:-1,process:0,exposure:2}, feedback:"You restore availability quickly, but reduce the buffer available to the wider support network. The immediate problem is solved by consuming resilience that already existed elsewhere." },
      { id:"B", title:"Start repair and protect the 96-hour mission with temporary fleet reallocation", desc:"Use the repair route while re-planning availability across the supported fleet.", tags:["Repair route","Operational trade-off"], delta:{readiness:3,resilience:4,lifecycle:7,process:2,exposure:-3}, feedback:"You accept a more complex operational recovery but preserve central stock and learn more about the repair loop. This improves lifecycle utilisation, though the short-term readiness gain is smaller." },
      { id:"C", title:"Transfer a serviceable unit from an aircraft already in scheduled maintenance", desc:"Use an approved temporary component transfer and record the configuration change.", tags:["Very fast","Moves future burden"], delta:{readiness:7,resilience:-2,lifecycle:1,process:-4,exposure:0}, feedback:"You recover the priority aircraft but transfer the constraint into the scheduled-maintenance plan. This is credible as a controlled contingency, but repeated use would create configuration and planning debt." },
      { id:"D", title:"Place a new supplier order and wait", desc:"Avoid touching fleet or central stock and rely on the standard procurement route.", tags:["Low complexity","Misses deadline"], delta:{readiness:-10,resilience:-3,lifecycle:-5,process:-1,exposure:5}, feedback:"The standard route avoids short-term coordination effort but does not satisfy the operational requirement and increases dependence on new supply." }
    ],
    investigation: [
      { id:"A", title:"The actuator failed unexpectedly", desc:"Component failure is the root cause because without the failure there would be no AOG.", correct:false, feedback:"This describes the initiating event, not the systemic reason the support system could not absorb it." },
      { id:"B", title:"Minimum-stock logic was not updated after supplier lead time increased", desc:"Planning parameters remained unchanged while replenishment time grew and repair turnaround was not used as a compensating control.", correct:true, feedback:"Correct. The failure became an availability crisis because planning assumptions and the repair loop were not adapted when the supply context changed." },
      { id:"C", title:"The transport route is too slow", desc:"The logistics provider is the primary systemic cause of the availability problem.", correct:false, feedback:"Transport speed affects recovery time but does not explain why there was no local buffer or mature repair response." },
      { id:"D", title:"The local team should hold more of every spare", desc:"The root cause is insufficient inventory across all component families.", correct:false, feedback:"Increasing every stock level is not a root-cause diagnosis. It can immobilise resources while leaving planning logic unchanged." }
    ],
    investments: [
      { id:"repairCapability", title:"Develop a faster local repair loop", cost:450, desc:"Create defined repair triage, capacity reservation and turnaround targets for this component family.", tags:["Persistent capability","Later incidents affected"], delta:{resilience:8,lifecycle:9,process:5,exposure:-5}, feedback:"You convert repair from an ad-hoc route into a planned resilience capability." },
      { id:"stockLogic", title:"Rebuild stock-setting logic", cost:220, desc:"Link minimum stock to lead time, failure demand, repair turnaround and network criticality.", tags:["Planning control","Lower cost"], delta:{resilience:7,process:7,lifecycle:2,exposure:-1}, feedback:"You improve the decision logic behind stock instead of simply increasing inventory." },
      { id:"processOwnership", title:"Assign end-to-end component support ownership", cost:140, desc:"Clarify who owns supply, repair, engineering escalation and recurring-problem closure.", tags:["Process maturity","Cross-functional"], delta:{process:10,resilience:3,lifecycle:2,exposure:0}, feedback:"You strengthen accountability across functions. This can reduce handover delay in later incidents." }
    ]
  });

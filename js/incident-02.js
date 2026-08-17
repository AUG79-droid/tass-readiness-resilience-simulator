incidents.push({
    id:"INC-02",
    month:4,
    title:"Repair queue — Four units waiting for disposition",
    summary:"A repair centre has four removed line-replaceable units waiting for technical disposition. Two could likely be returned to service quickly, but the engineering handover is incomplete. Meanwhile, new demand is arriving from the fleet.",
    data:[["Units in queue","4"],["Oldest waiting time","11 DAYS"],["Likely quick repairs","2 UNITS"],["New removals expected","2 / MONTH"]],
    constraints:["Technical airworthiness decisions remain mandatory","New replacement stock is limited","Repair centre capacity is available","Information is fragmented across three handovers"],
    lens:"Look for the difference between a physical capacity shortage and a decision-flow bottleneck. More repair benches do not help if units are waiting for information or authority.",
    broader:"Repair and replacement choices can also influence waste generation, energy demand and the use of approved cleaning, coating or other processes that may involve VOCs. These aspects remain secondary to the process-flow problem in this scenario.",
    operational:[
      {id:"A",title:"Order four replacement units",desc:"Clear the operational concern by substituting the repair queue with new supply.",tags:["Simple","New dependency"],delta:{readiness:5,resilience:-5,lifecycle:-8,process:-2,exposure:5},feedback:"You bypass the queue rather than improving it. Availability improves, but the unresolved process continues and demand for new supply rises."},
      {id:"B",title:"Create a 48-hour cross-functional disposition cell",desc:"Bring repair, engineering and supply together temporarily to close the four cases with defined evidence and owners.",tags:["Fast coordination","Targets bottleneck"],delta:{readiness:6,resilience:4,lifecycle:5,process:7,exposure:-2},feedback:"You use existing capability more effectively and accelerate recoverable units. The temporary cell works, but you still need a permanent process improvement."},
      {id:"C",title:"Prioritise only the newest unit",desc:"Focus effort on the easiest case and leave the older queue unchanged.",tags:["Quick win","Queue remains"],delta:{readiness:3,resilience:-1,lifecycle:1,process:-3,exposure:0},feedback:"One case may move faster, but the underlying backlog logic and ownership remain unchanged."},
      {id:"D",title:"Pause incoming repairs until the queue is cleared",desc:"Protect the current team from overload by temporarily stopping new intake.",tags:["Controls WIP","Transfers problem"],delta:{readiness:-6,resilience:-4,lifecycle:2,process:2,exposure:0},feedback:"Work-in-progress is controlled locally, but the constraint is pushed back to fleet support and availability."}
    ],
    investigation:[
      {id:"A",title:"The repair centre lacks technicians",desc:"The visible queue proves insufficient physical capacity.",correct:false,feedback:"Capacity is available. The queue is forming before hands-on repair starts."},
      {id:"B",title:"Engineering disposition has no clear owner or response standard",desc:"Cases move through multiple handovers and wait for incomplete information or authority.",correct:true,feedback:"Correct. The bottleneck is decision flow: unclear ownership, incomplete inputs and no response-time standard."},
      {id:"C",title:"Too many units fail in service",desc:"Failure demand alone explains the repair queue.",correct:false,feedback:"Demand matters, but the evidence shows units waiting without repair work because the disposition process is stalled."},
      {id:"D",title:"The repair documentation is too detailed",desc:"Reducing technical documentation is the main solution.",correct:false,feedback:"The issue is not that evidence exists; it is that required evidence, ownership and decision timing are not controlled end to end."}
    ],
    investments:[
      {id:"processVisibility",title:"Introduce an end-to-end repair status board",cost:180,desc:"Make queue age, owner, missing input, next decision and turnaround target visible across functions.",tags:["Flow visibility","Persistent capability"],delta:{process:10,resilience:4,lifecycle:3,exposure:0},feedback:"You make waiting visible and actionable. Later shocks are easier to coordinate."},
      {id:"dispositionStandard",title:"Define a disposition RACI and response standard",cost:120,desc:"Clarify required inputs, decision authority, escalation path and maximum response time.",tags:["Ownership","Low cost"],delta:{process:12,resilience:4,lifecycle:2,exposure:0},feedback:"You attack the queue at the handover and authority level, where the evidence indicated the bottleneck was forming."},
      {id:"crossSkill",title:"Cross-skill additional repair staff",cost:260,desc:"Increase flexible hands-on capacity across several component families.",tags:["Capacity resilience","Useful but indirect"],delta:{resilience:6,lifecycle:4,process:2,exposure:-1},feedback:"This adds capacity resilience, but without process control some units may still wait before reaching the bench."}
    ]
  });

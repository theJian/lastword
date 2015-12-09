// day 12.07.2015 by zhe13
//      an email-verifier with node.
// day 12.08.2015 by zhe13
//      require a verify module.
  
// A Verify process should meet these requirements following:
// 1.time limitatiom:[5min-10min]
// 2.frequence limitation
// 3.IP limitted visitation 
// 4.cross-domain principle
// 5.

// DATABASE DESIGN.
// 

require("./express.js")

var ip="127.0.0.1",
now = Date.now();



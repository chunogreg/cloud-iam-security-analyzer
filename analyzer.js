const fs = require("fs");

let critical = 0;
let high = 0;
let medium = 0;

const file = process.argv[2];

if (!file) {
  console.log("Usage: node analyze.js <policy-file>");
  process.exit(1);
}
const policy = JSON.parse(fs.readFileSync(file));
const rules = JSON.parse(fs.readFileSync("rules/iam-rules.json"));

console.log("Cloud IAM Security Report");
console.log("========================");

policy.Statement.forEach((statement) => {
  let actions = statement.Action;
  if (!Array.isArray(actions)) {
    actions = [actions];
  }

  actions.forEach((action) => {
    if (rules.critical.includes(action)) {
      console.log("CRITICAL: Administrator level access detected ->", action);
      critical++;
    }
    if (rules.high.includes(action)) {
      console.log("HIGH: Privilege escalation risk ->", action);
      high++;
    }

    if (rules.medium.includes(action)) {
      console.log("MEDIUM: overly permisive service access ->", action);
      medium++;
    }
    if (action.endsWith(":*")) {
      console.log("MEDIUM: Wildcard permission detected ->", action);
      medium++;
    }
  });

  // if (statement.Action === "*") {
  //   console.log("CRITICAL Administrator access detected");
  // }
});
console.log("");
console.log("Security Fidings Summary");
console.log("---------------------------");
console.log("CRITICAL", critical);
console.log("HIGH", high);
console.log("MEDIUM", medium);

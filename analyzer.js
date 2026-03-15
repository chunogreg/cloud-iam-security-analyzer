const fs = require("fs");

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
    }
    if (rules.high.includes(action)) {
      console.log("HIGH: Privilege escalation risk ->", action);
    }

    if (rules.medium.includes(action)) {
      console.log("MEDIUM: overly permisive service access ->", action);
    }
  });

  // if (statement.Action === "*") {
  //   console.log("CRITICAL Administrator access detected");
  // }
});

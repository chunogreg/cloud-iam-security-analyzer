const fs = require("fs");

const file = process.argv[2];

if (!file) {
  console.log("Usage: node analyze.js <policy-file>");
  process.exit(1);
}
const policy = JSON.parse(fs.readFileSync(file));

console.log("Cloud IAM Security Report");
console.log("========================");

policy.Statement.forEach((statement) => {
  if (statement.Action === "*") {
    console.log("CRITICAL Administrator access detected");
  }
});

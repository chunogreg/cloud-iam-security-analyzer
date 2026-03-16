# Cloud IAM Security Analyzer

## Overview

Cloud IAM Security Analyzer is a lightweight security tool that analyzes Identity Access Management (IAM) policies to detect dangerous permissions and potential previledge escalation risks.

The tool scan IAM policy files and reports security fidings based on predefined security rules. It helps security engineers identify overly permissive policies that violate the principle of least privilege.

The project simulates how cloud security teams analyze policies used in cloud environments such as Amazon Web Services

---

## Security Risk Detected

The analyzer detects several common IAM misconfigurations:

### Administrative Access

Detects policies that grant full administrative privileges.

#### Example:

"Action": "\*"

### Priviledge Escalation

Detects dangerous actions that attackers can use to gain higher privileges.

#### Examples:

iam: CreateUser  
iam: AttachUserPolicy  
iam: CreateAccessKey  
iam: PutRolePolicy

### Wildcard Permissions

Detects overly permissive service level permissions.

#### Examples:

s3:_  
ec2:_  
lamda:\*

---

## Example Security Report

Running the analyzer against a risky policy produces a report such as:

Cloud IAM Security Report  
\============================

MEDIUM: Overly permissive service access -> s3:\_
MEDIUM: Wildcard permission detected -> s3:\_
HIGH: Privilege escalation risk -> iam:CreateAccessKey

---

Security Fidings Summary  
\----------------------------  
CRITICAL: 0  
HIGH: 1  
MEDIUM: 2

---

## Project Struction

```
cloud-iam-security-analyzer
│
├── analyzer.js
├── package.json
│
├── policies
│    ├── admin-policy.json
│    ├── developer-policy.json
│    └── risky-policy.json
│
├── rules
│    └── iam-rules.json
│
└── .github/workflows
      └── iam-security-scan.yml
```

## Installation

Clone the repository: ---

      git clone https://github.com/chunogreg/cloud-iam-security-analyzer.git

Navigate into the project directory:

      cd cloud-iam-security-analyzer

Install dependencies

      npm install

---

## Usage

Run the analyzer against a policy file:

      node analyzer.js policies/risky-policy.json

The tool will scan the policy and generate a security report.

---

## CI Security Automation

The project integrates automated security scanning using GitHub Actions.

Every push triggers a pipeline that automatically analyzes IAM policies and prints the security report in the CI logs.

---

## Security Concepts Demonstrated

- Cloud identity security
- IAM policy analysis
- Privilege escalation detection
- Least privilege enforcement
- DevSecOps automation
- Security scanning in CI/CD pipelines

---

## Technologies Used

Node.js  
GitHub Actions  
JSON policy analysis

---

## Author

DevSecOps Security Portfolio Project

---

Threat Landscape Domain Template

Domain-specific configuration for the Deep Investigation workflow applied to cybersecurity threat analysis.

---

Entity Categories

| Category | Description | Target Count |
|----------|-------------|-------------|
| Threat Actors| APT groups, cybercrime organizations, hacktivists, nation-state actors | -|
| Campaigns| Named operations, attack waves, ongoing exploitation campaigns | -|
| TTPs| Tactics, techniques, and procedures — MITRE ATT&CK mapped | -|
| Vulnerabilities| CVEs, vulnerability classes, exploit chains being actively used | -|
| Tools| Malware families, Cframeworks, exploit kits, offensive tools | -|
| Defenders| Security vendors, researchers, CERTs responding to threats | -|

---

Evaluation Criteria (What Makes Something CRITICAL?)

Threat Actors:- CRITICAL: Active APTs targeting your industry, nation-state groups with demonstrated capability
- HIGH: Prolific ransomware groups, actors with recent high-profile breaches
- MEDIUM: Known groups with limited recent activity
- LOW: Low-capability actors, script kiddies, inactive groups

Campaigns:- CRITICAL: Actively exploiting, widespread targeting, zero-day usage
- HIGH: Recent campaigns with significant impact or novel techniques
- MEDIUM: Historical campaigns with relevant lessons
- LOW: Contained or resolved campaigns

TTPs:- CRITICAL: Techniques used in active campaigns against your sector
- HIGH: Commonly used techniques with high success rate
- MEDIUM: Known techniques with available mitigations
- LOW: Theoretical or rarely observed techniques

Vulnerabilities:- CRITICAL: Actively exploited (CISA KEV), network-accessible, no patch available
- HIGH: Actively exploited with patch available, or pre-auth RCE
- MEDIUM: High CVSS but limited exploitation
- LOW: Low CVSS or highly specific preconditions

---

Search Strategies

For landscape (Step ):- "[sector] threat landscape "
- "APT groups targeting [industry]"
- "MITRE ATT&CK [sector] techniques"
- "ransomware trends [year]"
- "CISA advisories [sector] recent"

For entity discovery (Step ):- "[threat actor name] IOC report"
- "CVE [year] actively exploited [technology]"
- "[malware family] analysis report"
- "threat intelligence [sector] annual report"

For deep investigation (Step ):- "[actor/campaign] MITRE ATT&CK mapping"
- "[actor] mandiant|crowdstrike|recorded future report"
- "[CVE] exploit analysis proof of concept"
- "[malware] reverse engineering analysis"
- "[actor] attribution evidence indicators"

---

Profile Templates

Threat Actor Profile

```markdown
{Actor Name / Designation}

Overview
- Also Known As:{aliases across vendors}
- Type:{APT/Cybercrime/Hacktivist/Nation-State}
- Suspected Origin:{country/region, confidence level}
- Active Since:{year}
- Current Status:{Active/Dormant/Disbanded}

Attribution
[What evidence supports attribution? Confidence level? Disputed?]

Targeting
- Industries:{targeted sectors}
- Geographies:{targeted regions}
- Motivation:{espionage/financial/disruption/ideology}

TTPs (MITRE ATT&CK Mapped)
| Tactic | Technique | ID | Notes |
|--------|-----------|-----|-------|
| Initial Access | {technique} | T{XXXX} | {how they use it} |
| Execution | {technique} | T{XXXX} | {details} |

Tools & Malware
- {tool/malware }: {description} [link to tool profile]
- {tool/malware }: {description}

Notable Operations
- {date}: {campaign/operation} [link to campaign profile]
- {date}: {campaign/operation}

Indicators of Compromise
[Representative IOCs — domains, IPs, hashes, patterns]

Defensive Recommendations
- {recommendation }
- {recommendation }

Sources
[Verified URLs — vendor reports, government advisories, academic research]
```

Campaign Profile

```markdown
{Campaign Name / Designation}

Overview
- Actor:[link to actor profile]
- Timeframe:{start date — end date or ongoing}
- Status:{Active/Contained/Resolved}
- Impact:{scope and severity}

Targeting
- Victims:{who was targeted}
- Geography:{where}
- Scale:{number of known victims}

Attack Chain
. Initial Access:{how they got in}
. Execution:{what they ran}
. Persistence:{how they stayed}
. Impact:{what they achieved}

Vulnerabilities Exploited
- {CVE-XXXX-XXXXX}: {description} [link to vuln profile]

Tools Used
- {tool}: {role in campaign} [link to tool profile]

Detection Opportunities
- {detection }
- {detection }

Lessons Learned
[What can defenders learn from this campaign?]

Sources
[Verified URLs]
```

TTP Profile

```markdown
{Technique Name}

MITRE ATT&CK
- ID:T{XXXX}
- Tactic:{tactic}
- Sub-techniques:{list if applicable}
- Platforms:{Windows/Linux/macOS/Cloud}

Description
[How this technique works. -paragraphs.]

Real-World Usage
- {Actor }: {how they used it} [link to actor profile]
- {Actor }: {how they used it}

Detection
- Log Sources:{what to monitor}
- Detection Logic:{sigma rules, KQL, SPL concepts}
- Difficulty:{Easy/Medium/Hard to detect}

Mitigation
- {mitigation }
- {mitigation }

Sources
[Verified URLs]
```

Vulnerability Profile

```markdown
{CVE ID}: {Short Description}

Overview
- CVE:{CVE-XXXX-XXXXX}
- CVSS:{score} ({severity})
- Affected:{product/version}
- Discovered:{date}
- Patch Available:{yes/no, date}

Exploitation Status
- CISA KEV:{yes/no}
- Active Exploitation:{confirmed/suspected/none}
- Exploit Availability:{public PoC/private/none}

Technical Details
[How the vulnerability works. What's the root cause?]

Impact
[What can an attacker achieve by exploiting this?]

Used By
- {Actor/Campaign}: [link to profile]

Remediation
- Patch:{version/link}
- Workaround:{if no patch}
- Detection:{how to detect exploitation}

Sources
[Verified URLs — NVD, vendor advisory, researcher writeups]
```

Tool / Malware Profile

```markdown
{Tool/Malware Name}

Overview
- Type:{RAT/Ransomware/Loader/CFramework/Exploit Kit/Offensive Tool}
- First Seen:{date}
- Current Status:{Active/Deprecated/Evolving}
- Availability:{Open source/Commercial/Private/Leaked}

Capabilities
- {capability }
- {capability }
- {capability }

Used By
- {Actor }: {context} [link to actor profile]
- {Actor }: {context}

Technical Analysis
[How it works. Key features. Evasion techniques.]

Detection
- Signatures:{AV detection names}
- Behavioral:{what to look for}
- Network:{Cpatterns, protocols}

Sources
[Verified URLs]
```

Defender Profile

```markdown
{Vendor/Team/Researcher Name}

Overview
- Type:{Security Vendor/CERT/Research Group/Individual Researcher}
- Focus:{what they specialize in}

Key Contributions
- {contribution — report, tool, disclosure}
- {contribution }

Threat Coverage
[What threats do they track? What intelligence do they produce?]

Notable Reports
- {report title}: {summary} {verified URL}

Sources
[Verified URLs]
```

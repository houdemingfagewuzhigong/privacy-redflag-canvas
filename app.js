const rules = [
  {
    category: "Sensitive data",
    severity: "high",
    patterns: ["biometric", "face", "precise location", "health", "financial", "government id"],
    why: "Sensitive data can create higher privacy, discrimination, and security risks.",
    question: "Why is this data necessary, and can the service work without it?"
  },
  {
    category: "Third-party sharing",
    severity: "high",
    patterns: ["third parties", "partners", "affiliates", "advertising partners", "data brokers"],
    why: "Broad sharing makes it harder to know who controls the data later.",
    question: "Who receives the data, and can users opt out?"
  },
  {
    category: "Long retention",
    severity: "medium",
    patterns: ["retain indefinitely", "as long as necessary", "for business purposes", "backup copies"],
    why: "Vague retention language can keep data alive after users leave.",
    question: "What is the maximum retention period for each data category?"
  },
  {
    category: "Automated decisions",
    severity: "medium",
    patterns: ["automated decision", "profiling", "score", "personalized ranking", "eligibility"],
    why: "Automated decisions can affect access, visibility, pricing, or treatment.",
    question: "Can users contest or understand automated decisions?"
  },
  {
    category: "Weak consent",
    severity: "medium",
    patterns: ["by using", "deemed consent", "continued use", "implied consent"],
    why: "Consent hidden in continued use may not be meaningful.",
    question: "Is there a clear opt-in, opt-out, and withdrawal path?"
  },
  {
    category: "Cross-border transfer",
    severity: "low",
    patterns: ["cross-border", "outside your country", "international transfer", "servers located"],
    why: "Cross-border processing changes applicable safeguards and remedies.",
    question: "Which jurisdictions receive the data and under what safeguards?"
  }
];

const sample = `We collect your precise location, face data, device identifiers, and usage activity.
We may share information with affiliates, advertising partners, analytics providers, and selected third parties.
We retain data as long as necessary for business purposes, including backup copies after account deletion.
Some rankings, recommendations, and eligibility checks may use automated decision systems or profiling.
By using the service, you consent to these practices and continued use means acceptance of updates.
Information may be processed on servers located outside your country.`;

const policyText = document.querySelector("#policyText");
const riskScore = document.querySelector("#riskScore");
const heroScore = document.querySelector("#heroScore");
const flagCount = document.querySelector("#flagCount");
const evidenceCount = document.querySelector("#evidenceCount");
const flags = document.querySelector("#flags");
const chart = document.querySelector("#chart");
const evidenceRows = document.querySelector("#evidenceRows");

let latest = [];

function analyze() {
  const text = policyText.value.toLowerCase();
  latest = rules.map(rule => {
    const hits = rule.patterns.filter(pattern => text.includes(pattern));
    return { ...rule, hits, score: hits.length * (rule.severity === "high" ? 25 : rule.severity === "medium" ? 16 : 9) };
  }).filter(rule => rule.hits.length);

  const score = Math.min(100, latest.reduce((sum, item) => sum + item.score, 0));
  riskScore.textContent = score;
  heroScore.textContent = score;
  flagCount.textContent = latest.length;
  evidenceCount.textContent = latest.reduce((sum, item) => sum + item.hits.length, 0);

  renderFlags();
  renderChart();
  renderEvidence();
}

function renderFlags() {
  flags.innerHTML = latest.length
    ? latest.map(item => `
      <article class="flag ${item.severity}">
        <strong>${item.category}</strong>
        <span>${item.why}</span>
      </article>
    `).join("")
    : `<article class="flag low"><strong>No obvious red flags</strong><span>Try the sample policy or paste a longer document.</span></article>`;
}

function renderChart() {
  const max = Math.max(1, ...latest.map(item => item.score));
  chart.innerHTML = latest.map(item => `
    <div class="bar-row">
      <span>${item.category}</span>
      <span class="bar-track"><span class="bar" style="width:${Math.round(item.score / max * 100)}%"></span></span>
      <span>${item.score}</span>
    </div>
  `).join("");
}

function renderEvidence() {
  evidenceRows.innerHTML = latest.length ? latest.flatMap(item =>
    item.hits.map(hit => `
      <tr>
        <td>${item.category}</td>
        <td>${item.why}</td>
        <td>${hit}</td>
        <td>${item.question}</td>
      </tr>
    `)
  ).join("") : `<tr><td colspan="4">Analyze a policy to create an evidence table.</td></tr>`;
}

function exportJson() {
  const blob = new Blob([JSON.stringify({ generatedAt: new Date().toISOString(), findings: latest }, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "privacy-redflags.json";
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelector("#loadSample").addEventListener("click", () => {
  policyText.value = sample;
  analyze();
});
document.querySelector("#analyze").addEventListener("click", analyze);
document.querySelector("#exportJson").addEventListener("click", exportJson);
document.querySelector("#printReport").addEventListener("click", () => window.print());

policyText.value = sample;
analyze();

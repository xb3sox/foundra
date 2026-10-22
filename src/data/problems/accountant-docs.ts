import type { Problem } from "../../types";

export const problem: Problem = {
  id: "accountant-docs",
  industry: "Accounting",
  title: "Accountants drown in client document requests.",
  pain: "Every tax season means chasing the same PDFs over email, one client at a time.",
  summary:
    "Small accounting firms send dozens of document requests per client and track what's missing in spreadsheets and memory.",
  signal: "Strong signal",
  score: 80,
  scoreReasons: [
    "Painful every single cycle",
    "Clear paying buyer",
    "Spreadsheet workaround everywhere",
    "Narrow first solution",
  ],
  counts: { feel: 14, build: 5, know: 3 },
  whoFeels: "Solo CPAs and accounting firms with 2–10 staff.",
  problemDetail:
    "To close a client's books or file a return, an accountant needs bank statements, receipts, payroll reports, and a dozen other documents. Requests go out by email, clients reply with half of them, and the firm tracks what's still missing in a spreadsheet. Staff spend hours per client re-asking for the same files, and deadlines slip when one PDF arrives late.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/Accounting",
      date: "2 days ago",
      text: "I sent the same 'still missing your bank statements' email 11 times this week. It's 80% of my job in March.",
      strength: "Strong",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "G2 · 2★ portal software",
      date: "1 week ago",
      text: "Clients can't figure out the portal login, so they email the files anyway. Now I track two places instead of one.",
      strength: "Strong",
    },
    {
      source: "Job post",
      platform: "Upwork",
      origin: "Upwork job post",
      date: "4 days ago",
      text: "CPA firm hiring a VA to 'follow up with clients on outstanding documents and update our tracking sheet daily'.",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Bookkeepers community",
      date: "1 week ago",
      text: "What does everyone use to track missing client docs? My checklist spreadsheet has 40 tabs.",
      strength: "Medium",
    },
  ],
  whatTheyDoToday:
    "Email threads per client, a shared spreadsheet of missing documents, and manual reminder emails written from scratch each time.",
  whyToolsFail:
    "Client portals require logins that clients refuse to use. Practice management suites bury document requests inside heavy workflows. Nothing chases the client automatically.",
  firstVersion: {
    firstFeature:
      "A per-client document request list with a no-login upload link and automatic polite reminders until everything is in.",
    forWho: "Solo CPAs and small firms handling 30–200 clients per season.",
    avoid:
      "Avoid building bookkeeping, e-signatures, or a full practice suite. Stay on collecting documents.",
    findUsers:
      "Accounting subreddits, bookkeeper Facebook groups, and state CPA society newsletters.",
    pricing: "$39–129/month per firm.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 86 },
    { name: "Clarity of user", value: 84 },
    { name: "Workaround exists", value: 82 },
    { name: "Signs of payment", value: 78 },
    { name: "Urgency", value: 76 },
    { name: "Build simplicity", value: 74 },
  ],
  people: [
    { name: "Mona G.", role: "Has this", detail: "Solo CPA, 90 tax clients", commitment: "I have this problem" },
    { name: "Idris V.", role: "Builder", detail: "Full-stack, doc workflows", commitment: "I can build this" },
    { name: "Salma J.", role: "Market Expert", detail: "Ex-partner at a 12-person firm", commitment: "I know this market" },
  ],
  roomStatus: "Building",
  checklist: [
    { id: "c1", label: "5 people confirmed the pain", done: true },
    { id: "c2", label: "3 explained their workaround", done: true },
    { id: "c3", label: "2 said they would pay", done: true },
    { id: "c4", label: "First solution sketched", done: true },
    { id: "c5", label: "First interview scheduled", done: false },
  ],
  activity: [
    { id: "a1", text: "Mona shared her 40-tab tracking spreadsheet", time: "1h ago" },
    { id: "a2", text: "Idris joined as builder", time: "4h ago" },
    { id: "a3", text: "Salma added firm-size pricing context", time: "Yesterday" },
    { id: "a4", text: "First solution drafted", time: "2 days ago" },
  ],
  pipeline: {
    signalCount: 41,
    clusters: 5,
    confidence: "Strong",
    sources: [
      { platform: "Reddit", count: 18 },
      { platform: "Product reviews", count: 10 },
      { platform: "Upwork", count: 8 },
      { platform: "Forum", count: 5 },
    ],
    lastUpdated: "Today",
  },
};

import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "warehouse-inventory",
  industry: "Logistics",
  title: "Small warehouses lose stock to paper counts.",
  pain: "Inventory lives in clipboards and a manager's memory, not a system.",
  summary:
    "Manual stock counts cause mismatches between what's on the shelf and what the books say.",
  signal: "Promising",
  score: 68,
  scoreReasons: [
    "Real money lost",
    "Strong workaround signal",
    "Harder build",
    "Slower distribution",
  ],
  counts: { feel: 6, build: 3, know: 2 },
  whoFeels: "Owners of small distribution and e-commerce warehouses.",
  problemDetail:
    "When inventory is tracked on paper or in a basic spreadsheet, the numbers drift. Items get picked but not logged, returns sit unrecorded, and once a quarter someone spends a weekend recounting everything. Mismatches lead to oversells and angry customers.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/ecommerce",
      date: "1 week ago",
      text: "We do a full physical count every quarter because we never trust the spreadsheet.",
      strength: "Strong",
    },
    {
      source: "Job post",
      platform: "Fiverr",
      origin: "Fiverr gig request",
      date: "4 days ago",
      text: "Need someone to reconcile stock discrepancies daily and clean up our spreadsheet.",
      strength: "Medium",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "Capterra · 1★ WMS",
      date: "3 weeks ago",
      text: "Quotes start at five figures. We have 4 staff. Makes no sense for us.",
      strength: "Medium",
    },
  ],
  whatTheyDoToday:
    "Clipboards, barcode guns that export to Excel, and periodic full physical counts.",
  whyToolsFail:
    "Warehouse management systems are priced and built for large operations. Spreadsheets don't handle real-time movement.",
  firstVersion: {
    firstFeature:
      "A phone-based stock-in / stock-out logger with a live count and low-stock alerts.",
    forWho: "Warehouses with 2–10 staff and under 2,000 SKUs.",
    avoid:
      "Avoid integrations with every shipping carrier on day one. Avoid forecasting features.",
    findUsers:
      "E-commerce operator communities, 3PL forums, and barcode hardware resellers.",
    pricing: "$79–199/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 70 },
    { name: "Clarity of user", value: 72 },
    { name: "Workaround exists", value: 80 },
    { name: "Signs of payment", value: 66 },
    { name: "Urgency", value: 64 },
    { name: "Build simplicity", value: 54 },
  ],
  people: [
    { name: "Hassan F.", role: "Has this", detail: "Runs an e-com warehouse", commitment: "I have this problem" },
    { name: "Nadia S.", role: "Builder", detail: "Mobile + barcode", commitment: "I can build this" },
    { name: "Tariq Z.", role: "Market Expert", detail: "Supply chain consultant", commitment: "I know this market" },
  ],
  roomStatus: "Building",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 24,
    clusters: 4,
    confidence: "Medium",
    sources: [
      { platform: "Reddit", count: 11 },
      { platform: "Fiverr", count: 6 },
      { platform: "Product reviews", count: 7 },
    ],
    lastUpdated: "2 days ago",
  },
};

import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "freelance-invoices",
  industry: "Freelancing",
  title: "Freelancers waste days reconciling unpaid invoices.",
  pain: "Late payments are tracked in a spreadsheet and chased by awkward emails.",
  summary:
    "Solo freelancers manually track who paid, who's late, and when to send the uncomfortable follow-up.",
  signal: "Promising",
  score: 71,
  scoreReasons: [
    "Frequent recurring pain",
    "Emotional friction",
    "Clear workaround",
    "Crowded but fragmented market",
  ],
  counts: { feel: 8, build: 1, know: 1 },
  whoFeels: "Solo freelancers and 2–3 person creative shops.",
  problemDetail:
    "Sending the invoice is easy. Getting paid is the hard part. Freelancers track due dates in a spreadsheet, forget to chase, then send an anxious 'just following up' email weeks late. Cash flow suffers and the relationship gets tense.",
  proof: [
    {
      source: "Expert note",
      platform: "Report",
      origin: "QuickBooks · 2025 Late Payments Report",
      date: "2025",
      text: "56% of small businesses are owed money from unpaid invoices, averaging $17.5K each.",
      strength: "Strong",
      url: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/",
    },
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/freelance",
      date: "2 days ago",
      text: "I hate chasing payments more than the actual work. I always forget who owes me.",
      strength: "Strong",
      url: "https://www.reddit.com/r/freelance/",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "G2 · 2★ accounting app",
      date: "2 weeks ago",
      text: "Assumes you're a business with a bookkeeper. I just want to know who's late.",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/smallbusiness",
      date: "5 days ago",
      text: "Lost a month of cash flow because three clients quietly went past due and I didn't notice.",
      strength: "Strong",
      url: "https://www.reddit.com/r/smallbusiness/",
    },
  ],
  whatTheyDoToday:
    "A spreadsheet of invoices, calendar reminders, and manually written follow-up emails that feel awkward to send.",
  whyToolsFail:
    "Full accounting suites are too heavy and built for businesses with finance teams. Payment links don't handle the chasing.",
  firstVersion: {
    firstFeature:
      "An invoice tracker that auto-sends polite, scheduled payment reminders and shows a simple who-owes-what view.",
    forWho: "Solo freelancers who send 5–30 invoices a month.",
    avoid:
      "Avoid full bookkeeping, taxes, and expense tracking. Stay on getting paid.",
    findUsers:
      "Freelance subreddits, design Twitter, and creator newsletters.",
    pricing: "$9–25/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 80 },
    { name: "Clarity of user", value: 74 },
    { name: "Workaround exists", value: 72 },
    { name: "Signs of payment", value: 58 },
    { name: "Urgency", value: 78 },
    { name: "Build simplicity", value: 82 },
  ],
  people: [
    { name: "Maya T.", role: "Has this", detail: "Freelance copywriter", commitment: "I have this problem" },
    { name: "Ali R.", role: "Builder", detail: "SaaS, payments", commitment: "I can build this" },
  ],
  roomStatus: "Proving",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 31,
    clusters: 4,
    confidence: "Medium",
    sources: [
      { platform: "Reddit", count: 18 },
      { platform: "Product reviews", count: 8 },
      { platform: "Social", count: 5 },
    ],
    lastUpdated: "Yesterday",
  },
};

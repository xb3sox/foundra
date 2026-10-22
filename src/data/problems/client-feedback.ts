import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "client-feedback",
  industry: "Interior Design",
  title: "Designers lose hours chasing client feedback.",
  pain: "Client notes are scattered across WhatsApp, PDFs, and screenshots.",
  summary:
    "Client notes are scattered across WhatsApp, PDFs, moodboards, screenshots, and voice notes.",
  signal: "Strong signal",
  score: 82,
  scoreReasons: [
    "Specific user",
    "Repeated pain",
    "Manual workaround",
    "Small first solution possible",
  ],
  counts: { feel: 12, build: 4, know: 2 },
  whoFeels: "Freelance interior designers and small studios.",
  problemDetail:
    "Designers send mockups and moodboards to clients, then receive feedback in five different places. A WhatsApp voice note here, a marked-up PDF there, a screenshot with a red circle, an email thread, and a comment on a shared drive. Pulling it all together before the next revision takes hours and mistakes slip through.",
  proof: [
    {
      source: "Expert note",
      platform: "Report",
      origin: "Programa · industry guide",
      date: "2025",
      text: "Remember that sofa your client loved? The one buried somewhere in email thread #47? Or was it a text? Maybe WhatsApp?",
      strength: "Strong",
      url: "https://programa.design/features/interior-design-approvals",
    },
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/interiordesign",
      date: "3 days ago",
      text: "I spend my Friday afternoons just collecting feedback from six chats before I can start working again.",
      strength: "Strong",
      url: "https://www.reddit.com/r/InteriorDesign/",
    },
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/freelance",
      date: "1 week ago",
      text: "Clients refuse to use 'a tool'. They just send voice notes. I lose track of what was approved.",
      strength: "Strong",
      url: "https://www.reddit.com/r/freelance/",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "G2 · 2★ project tool",
      date: "2 weeks ago",
      text: "Too generic for design approvals. My clients never log in, so revisions live in my inbox.",
      strength: "Medium",
    },
    {
      source: "Job post",
      platform: "Upwork",
      origin: "Upwork job post",
      date: "5 days ago",
      text: "Studio hiring a part-time assistant 'to organise client revisions and approvals'.",
      strength: "Medium",
    },
  ],
  whatTheyDoToday:
    "Screenshots, Google Drive folders, PDF markups, and manual WhatsApp follow-ups. Approval status lives in the designer's head.",
  whyToolsFail:
    "Project tools are too generic and intimidating for clients. Design tools are not client-friendly. Approval history is unclear, so nobody knows what was actually signed off.",
  firstVersion: {
    firstFeature:
      "A client approval workspace with visual comments, a clear status per image, and an approval log.",
    forWho: "Freelance interior designers managing 3–10 active clients.",
    avoid:
      "Avoid asking clients to create accounts or learn a new tool. Avoid building a full project manager.",
    findUsers:
      "Instagram interior designers, design communities, and small interior design agencies.",
    pricing: "$29–99/month per studio.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 88 },
    { name: "Clarity of user", value: 84 },
    { name: "Workaround exists", value: 90 },
    { name: "Signs of payment", value: 72 },
    { name: "Urgency", value: 80 },
    { name: "Build simplicity", value: 78 },
  ],
  people: [
    { name: "Sara K.", role: "Has this", detail: "Freelance designer, 6 clients", commitment: "I have this problem" },
    { name: "Omar D.", role: "Builder", detail: "Full-stack, ex-SaaS", commitment: "I can build this" },
    { name: "Lina M.", role: "Market Expert", detail: "Ran a design studio for 8 years", commitment: "I know this market" },
  ],
  roomStatus: "Building",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 47,
    clusters: 6,
    confidence: "Strong",
    sources: [
      { platform: "Reddit", count: 21 },
      { platform: "Product reviews", count: 12 },
      { platform: "Upwork", count: 9 },
      { platform: "Forum", count: 5 },
    ],
    lastUpdated: "Today",
  },
};

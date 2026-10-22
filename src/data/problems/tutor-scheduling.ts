import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "tutor-scheduling",
  industry: "Education",
  title: "Private tutors juggle scheduling chaos every week.",
  pain: "Lessons, reschedules, and payments are tracked across chat and memory.",
  summary:
    "Independent tutors lose time to rescheduling messages and forget who has paid for which session.",
  signal: "Promising",
  score: 70,
  scoreReasons: [
    "Specific recurring pain",
    "Clear workaround",
    "Modest signs of payment",
    "Easy to start small",
  ],
  counts: { feel: 7, build: 2, know: 1 },
  whoFeels: "Independent tutors and small tutoring centres.",
  problemDetail:
    "A tutor with 15 students manages a web of recurring lessons, last-minute reschedules, and prepaid packages. It all happens over WhatsApp. Tracking who has lessons left, who needs to pay, and which slot is free becomes a part-time admin job on top of teaching.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/tutor",
      date: "3 days ago",
      text: "Half my evening is spent confirming tomorrow's lessons and figuring out who still owes me.",
      strength: "Strong",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Tutoring community",
      date: "1 week ago",
      text: "Booking apps charge too much and aren't built for prepaid lesson packs.",
      strength: "Medium",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "G2 · 2★ scheduler",
      date: "2 weeks ago",
      text: "Doesn't understand prepaid packages. I still track lessons in a notebook.",
      strength: "Medium",
    },
  ],
  whatTheyDoToday:
    "WhatsApp threads, a paper or spreadsheet grid of lessons, and manual payment tracking.",
  whyToolsFail:
    "General booking tools don't model prepaid lesson packages. Education platforms are built for institutions, not solo tutors.",
  firstVersion: {
    firstFeature:
      "A lesson scheduler with prepaid lesson-pack tracking and automatic next-lesson reminders.",
    forWho: "Solo tutors with 5–30 recurring students.",
    avoid:
      "Avoid building a full learning platform or video classroom. Stay on scheduling and packs.",
    findUsers:
      "Tutor Facebook groups, education subreddits, and tutoring marketplaces.",
    pricing: "$12–29/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 78 },
    { name: "Clarity of user", value: 70 },
    { name: "Workaround exists", value: 74 },
    { name: "Signs of payment", value: 56 },
    { name: "Urgency", value: 72 },
    { name: "Build simplicity", value: 80 },
  ],
  people: [
    { name: "Dana W.", role: "Has this", detail: "Maths tutor, 18 students", commitment: "I have this problem" },
    { name: "Sami L.", role: "Builder", detail: "SaaS, scheduling", commitment: "I can build this" },
  ],
  roomStatus: "Proving",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 22,
    clusters: 3,
    confidence: "Medium",
    sources: [
      { platform: "Reddit", count: 12 },
      { platform: "Forum", count: 6 },
      { platform: "Product reviews", count: 4 },
    ],
    lastUpdated: "Yesterday",
  },
};

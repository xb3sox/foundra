import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "clinic-noshows",
  industry: "Healthcare",
  title: "Small clinics bleed revenue from no-shows.",
  pain: "Reminders are sent by hand and patients still forget appointments.",
  summary:
    "Front-desk staff manually call and text patients, yet 1 in 5 appointments is missed.",
  signal: "Strong signal",
  score: 79,
  scoreReasons: [
    "Clear buyer",
    "Money lost every week",
    "Manual reminder process",
    "Narrow first solution",
  ],
  counts: { feel: 9, build: 3, know: 3 },
  whoFeels: "Independent dental and physiotherapy clinics with 1–4 practitioners.",
  problemDetail:
    "A missed appointment is a slot that can't be sold again. Front desk staff try to prevent it by calling each patient the day before, but they're busy with walk-ins and forget. No-shows quietly cost a small clinic thousands a month.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/Dentistry",
      date: "4 days ago",
      text: "Every empty chair is money gone. We tried texting manually but the receptionist can't keep up.",
      strength: "Strong",
      url: "https://www.reddit.com/r/Dentistry/",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "Capterra · appointment reminders",
      date: "1 week ago",
      text: "Charges per SMS and the reminders look spammy to patients. Cancelled after a month.",
      strength: "Medium",
      url: "https://www.capterra.com/p/154255/Appointment-Reminder/reviews/",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Clinic owners forum",
      date: "6 days ago",
      text: "How do you handle no-shows without paying for an enterprise system?",
      strength: "Strong",
    },
  ],
  whatTheyDoToday:
    "Receptionists call patients the day before, keep a paper list, and sometimes charge a no-show fee that's hard to enforce.",
  whyToolsFail:
    "Enterprise practice software is expensive and overbuilt. Generic schedulers don't understand clinic flows or local SMS rules.",
  firstVersion: {
    firstFeature:
      "Automated, friendly two-way reminders with one-tap confirm or reschedule and a no-show tracker.",
    forWho: "Single-location clinics with under 5 practitioners.",
    avoid:
      "Avoid becoming a full records system. Avoid complex insurance billing. Stay focused on attendance.",
    findUsers:
      "Local clinic owner groups, dental supply reps, and physiotherapy associations.",
    pricing: "$49–149/month per clinic.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 82 },
    { name: "Clarity of user", value: 88 },
    { name: "Workaround exists", value: 76 },
    { name: "Signs of payment", value: 80 },
    { name: "Urgency", value: 85 },
    { name: "Build simplicity", value: 70 },
  ],
  people: [
    { name: "Dr. Reem A.", role: "Has this", detail: "Owns a 3-chair dental clinic", commitment: "I have this problem" },
    { name: "Karim B.", role: "Builder", detail: "Mobile + automation", commitment: "I can build this" },
    { name: "Yousef H.", role: "Market Expert", detail: "Healthcare SaaS sales", commitment: "I know this market" },
  ],
  roomStatus: "Proving",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 38,
    clusters: 5,
    confidence: "Strong",
    sources: [
      { platform: "Reddit", count: 16 },
      { platform: "Product reviews", count: 11 },
      { platform: "Forum", count: 8 },
      { platform: "Social", count: 3 },
    ],
    lastUpdated: "Today",
  },
};

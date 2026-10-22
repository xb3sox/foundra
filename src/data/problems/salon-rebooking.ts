import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "salon-rebooking",
  industry: "Beauty & Wellness",
  title: "Salons lose repeat clients who forget to rebook.",
  pain: "Rebooking depends on the client remembering, not on any system.",
  summary:
    "Independent stylists rely on clients to come back, with no reminder when it's time for the next visit.",
  signal: "Needs more proof",
  score: 63,
  scoreReasons: [
    "Recurring revenue at stake",
    "Workaround is informal",
    "Lower signs of payment",
    "Easy build",
  ],
  counts: { feel: 6, build: 2, know: 1 },
  whoFeels: "Independent hair stylists and small salons.",
  problemDetail:
    "A client's color fades in six weeks, but nothing reminds them to rebook. The stylist relies on people remembering or stumbling back. A simple, well-timed nudge could turn one-off visits into a predictable schedule, but stylists have no easy way to do it.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/Hairstylist",
      date: "5 days ago",
      text: "My best clients disappear for months then come back saying 'I should come more often!'",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Forum",
      origin: "Salon pros forum",
      date: "2 weeks ago",
      text: "Booking systems don't nudge clients to rebook at the right interval for their service.",
      strength: "Medium",
    },
    {
      source: "Expert note",
      platform: "Social",
      origin: "Instagram · salon coach",
      date: "3 weeks ago",
      text: "Timed rebooking reminders measurably lift repeat visits in salons.",
      strength: "Medium",
    },
  ],
  whatTheyDoToday:
    "A paper appointment book, occasional manual texts, and hoping clients return on their own.",
  whyToolsFail:
    "Booking apps focus on filling open slots, not on bringing past clients back at the right time. Marketing tools are too generic.",
  firstVersion: {
    firstFeature:
      "Service-aware rebooking reminders that text past clients when it's time to come back.",
    forWho: "Solo stylists and chairs with a loyal client base.",
    avoid:
      "Avoid building a full booking calendar or POS first. Focus on the rebooking nudge.",
    findUsers:
      "Stylist Instagram, beauty pro groups, and salon supplier networks.",
    pricing: "$15–39/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 64 },
    { name: "Clarity of user", value: 66 },
    { name: "Workaround exists", value: 58 },
    { name: "Signs of payment", value: 54 },
    { name: "Urgency", value: 60 },
    { name: "Build simplicity", value: 82 },
  ],
  people: [
    { name: "Noor A.", role: "Has this", detail: "Independent stylist", commitment: "I have this problem" },
    { name: "Zaid R.", role: "Builder", detail: "Automation + SMS", commitment: "I can build this" },
  ],
  roomStatus: "Proving",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 14,
    clusters: 3,
    confidence: "Weak",
    sources: [
      { platform: "Reddit", count: 7 },
      { platform: "Forum", count: 4 },
      { platform: "Social", count: 3 },
    ],
    lastUpdated: "4 days ago",
  },
};

import type { Problem } from "../../types";
import { baseActivity, baseChecklist } from "./base";

export const problem: Problem = {
  id: "property-maintenance",
  industry: "Real Estate",
  title: "Small landlords lose track of maintenance requests.",
  pain: "Tenant issues come in by call and text and slip through the cracks.",
  summary:
    "Landlords with a handful of units manage repairs across calls, texts, and memory, leading to angry tenants.",
  signal: "Promising",
  score: 69,
  scoreReasons: [
    "Recurring frustration",
    "Clear workaround",
    "Two-sided value",
    "Modest pricing",
  ],
  counts: { feel: 7, build: 3, know: 2 },
  whoFeels: "Independent landlords managing 3–20 units.",
  problemDetail:
    "A tenant reports a leak by text at 9pm. The landlord means to call a plumber but forgets. Two days later the tenant is furious. With several units, requests pile up with no single place to see what's open, who's handling it, and what it cost.",
  proof: [
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/Landlord",
      date: "4 days ago",
      text: "I manage 9 units from my phone. Requests come in everywhere and I drop the ball constantly.",
      strength: "Strong",
    },
    {
      source: "Review",
      platform: "Product reviews",
      origin: "Capterra · 2★ PM software",
      date: "2 weeks ago",
      text: "Built for 500-unit firms. I have nine doors and pay per unit for features I never use.",
      strength: "Medium",
    },
    {
      source: "Forum complaint",
      platform: "Reddit",
      origin: "r/realestateinvesting",
      date: "1 week ago",
      text: "A simple way to log tenant repair requests, that's all I want.",
      strength: "Strong",
    },
  ],
  whatTheyDoToday:
    "Texts and calls from tenants, a personal to-do list, and saved contractor numbers in the phone.",
  whyToolsFail:
    "Property management platforms are built for large portfolios and priced per unit. Generic to-do apps don't give tenants a way to report.",
  firstVersion: {
    firstFeature:
      "A simple tenant request inbox with status, photos, and a log of what was fixed and what it cost.",
    forWho: "Small landlords with under 20 units.",
    avoid:
      "Avoid full accounting, leases, and rent collection on day one. Stay on maintenance.",
    findUsers:
      "Landlord subreddits, real estate investing groups, and property meetups.",
    pricing: "$19–59/month.",
  },
  scoreBreakdown: [
    { name: "Repetition", value: 74 },
    { name: "Clarity of user", value: 72 },
    { name: "Workaround exists", value: 70 },
    { name: "Signs of payment", value: 60 },
    { name: "Urgency", value: 68 },
    { name: "Build simplicity", value: 76 },
  ],
  people: [
    { name: "Rana E.", role: "Has this", detail: "Owns 9 rental units", commitment: "I have this problem" },
    { name: "Bilal K.", role: "Builder", detail: "Full-stack", commitment: "I can build this" },
    { name: "Hala M.", role: "Market Expert", detail: "Property manager, 12 yrs", commitment: "I know this market" },
  ],
  roomStatus: "Proving",
  checklist: baseChecklist(),
  activity: baseActivity(),
  pipeline: {
    signalCount: 27,
    clusters: 4,
    confidence: "Medium",
    sources: [
      { platform: "Reddit", count: 15 },
      { platform: "Product reviews", count: 8 },
      { platform: "Forum", count: 4 },
    ],
    lastUpdated: "Today",
  },
};
